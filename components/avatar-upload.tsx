"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AvatarUploadProps {
    defaultValue?: string | null
    name: string
}

export function AvatarUpload({ defaultValue, name }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(defaultValue || null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

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
                .from('avatars')
                .upload(filePath, optimizedBlob)

            if (uploadError) {
                throw uploadError
            }

            // 3. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            setAvatarUrl(publicUrl)
            toast({
                title: "Avatar actualizado",
                description: "La imagen se ha subido correctamente.",
            })

        } catch (error: any) {
            console.error("Error uploading avatar:", error)
            toast({
                title: "Error",
                description: "No se pudo subir la imagen. Inténtalo de nuevo.",
                variant: "destructive",
            })
        } finally {
            setUploading(false)
        }
    }

    const optimizeImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const MAX_WIDTH = 500
                    const MAX_HEIGHT = 500
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
                    }, 'image/webp', 0.8)
                }
                img.onerror = (err) => reject(err)
            }
            reader.onerror = (err) => reject(err)
        })
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                type="hidden"
                name={name}
                value={avatarUrl || ""}
            />
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
            />

            <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-muted">
                    <AvatarImage src={avatarUrl || "/assets/avatar_default.jpg"} className="object-cover" />
                    <AvatarFallback className="text-4xl">U</AvatarFallback>
                </Avatar>

                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={() => !uploading && fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                    ) : (
                        <Camera className="h-8 w-8 text-white" />
                    )}
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
            >
                {uploading ? "Subiendo..." : "Cambiar foto"}
            </Button>
        </div>
    )
}
