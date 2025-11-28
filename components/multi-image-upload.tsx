"use client"

import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Camera, Loader2, Image as ImageIcon, X, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface MultiImageUploadProps {
    defaultValues?: string[]
    onChange?: (urls: string[]) => void
    name: string
    bucket?: string
    maxImages?: number
}

export function MultiImageUpload({
    defaultValues = [],
    onChange,
    name,
    bucket = "raffles",
    maxImages = 3
}: MultiImageUploadProps) {
    const [imageUrls, setImageUrls] = useState<string[]>(defaultValues)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    useEffect(() => {
        if (defaultValues.length > 0 && imageUrls.length === 0) {
            setImageUrls(defaultValues)
        }
    }, [defaultValues])

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        if (imageUrls.length >= maxImages) {
            toast({
                title: "Límite alcanzado",
                description: `Solo puedes subir hasta ${maxImages} imágenes.`,
                variant: "destructive",
            })
            return
        }

        const file = e.target.files[0]
        setUploading(true)

        try {
            const optimizedBlob = await optimizeImage(file)
            const supabase = createClient()
            const fileExt = 'webp'
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, optimizedBlob)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            const newUrls = [...imageUrls, publicUrl]
            setImageUrls(newUrls)

            if (onChange) {
                onChange(newUrls)
            }

            toast({
                title: "Imagen subida",
                description: "La imagen se ha agregado correctamente.",
            })

        } catch (error: any) {
            console.error("Error uploading image:", error)
            toast({
                title: "Error",
                description: "No se pudo subir la imagen.",
                variant: "destructive",
            })
        } finally {
            setUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const removeImage = (indexToRemove: number) => {
        const newUrls = imageUrls.filter((_, index) => index !== indexToRemove)
        setImageUrls(newUrls)
        if (onChange) {
            onChange(newUrls)
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
            {/* Hidden input to submit the array as a JSON string */}
            <input
                type="hidden"
                name={name}
                value={JSON.stringify(imageUrls)}
            />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageUrls.map((url, index) => (
                    <div key={index} className="relative aspect-video group rounded-lg overflow-hidden border border-border">
                        <Image
                            src={url}
                            alt={`Raffle image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 text-center">
                                Principal
                            </div>
                        )}
                    </div>
                ))}

                {imageUrls.length < maxImages && (
                    <div
                        onClick={() => !uploading && fileInputRef.current?.click()}
                        className="
                            border-2 border-dashed border-muted-foreground/25 rounded-lg 
                            aspect-video flex flex-col items-center justify-center cursor-pointer 
                            hover:bg-muted/50 transition-colors bg-muted/10
                        "
                    >
                        {uploading ? (
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                        ) : (
                            <>
                                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                                <span className="text-xs text-muted-foreground font-medium">
                                    Agregar imagen
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <p className="text-xs text-muted-foreground">
                {imageUrls.length} de {maxImages} imágenes subidas. La primera será la portada.
            </p>
        </div>
    )
}
