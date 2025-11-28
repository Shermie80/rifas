"use client"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Camera, Loader2, Image as ImageIcon, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface ImageUploadProps {
    value?: string | null
    onChange?: (url: string) => void
    name: string
    bucket?: string
    aspectRatio?: "square" | "video"
}

export function ImageUpload({
    value,
    onChange,
    name,
    bucket = "raffles",
    aspectRatio = "video"
}: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(value || null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        if (value !== undefined) {
            setImageUrl(value)
        }
    }, [value])

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0]
        setUploading(true)

        try {
            // 1. Optimize Image
            const optimizedBlob = await optimizeImage(file)

            // 2. Upload to Supabase
            const supabase = createClient()
            const fileExt = 'webp'
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, optimizedBlob)

            if (uploadError) {
                // If bucket doesn't exist or other error
                throw uploadError
            }

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            setImageUrl(publicUrl)
            if (onChange) {
                onChange(publicUrl)
            }

            toast({
                title: "Imagen subida",
                description: "La imagen se ha cargado correctamente.",
            })

        } catch (error: any) {
            console.error("Error uploading image:", error)
            toast({
                title: "Error",
                description: "No se pudo subir la imagen. Verifica que el bucket exista.",
                variant: "destructive",
            })
        } finally {
            setUploading(false)
        }
    }

    const removeImage = () => {
        setImageUrl(null)
        if (onChange) {
            onChange("")
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const optimizeImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new window.Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    // Max dimensions for raffle banners
                    const MAX_WIDTH = 1200
                    const MAX_HEIGHT = 800
                    let width = img.width
                    let height = img.height

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width
                            width = MAX_WIDTH
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height
                            height = MAX_HEIGHT
                        }
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob)
                        } else {
                            reject(new Error("Canvas to Blob failed"))
                        }
                    }, 'image/webp', 0.85)
                }
                img.onerror = (err) => reject(err)
            }
            reader.onerror = (err) => reject(err)
        })
    }

    return (
        <div className="space-y-4">
            <input
                type="hidden"
                name={name}
                value={imageUrl || ""}
            />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
            />

            {!imageUrl ? (
                <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className={`
                        border-2 border-dashed border-muted-foreground/25 rounded-lg 
                        flex flex-col items-center justify-center cursor-pointer 
                        hover:bg-muted/50 transition-colors
                        ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'}
                        w-full max-w-md bg-muted/10
                    `}
                >
                    {uploading ? (
                        <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                    ) : (
                        <>
                            <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground font-medium">
                                Click para subir imagen
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                                JPG, PNG, WEBP (Max 1200px)
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="relative w-full max-w-md group">
                    <div className={`relative ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'} w-full rounded-lg overflow-hidden border border-border`}>
                        <Image
                            src={imageUrl}
                            alt="Uploaded image"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={removeImage}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}
