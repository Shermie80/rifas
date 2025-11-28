"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface RaffleGalleryProps {
    images: string[]
    title: string
}

export function RaffleGallery({ images, title }: RaffleGalleryProps) {
    const [mainImage, setMainImage] = useState(images[0])

    return (
        <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-black/20">
                <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-500"
                    priority
                />
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={cn(
                                "relative aspect-video w-full overflow-hidden rounded-lg border cursor-pointer transition-all duration-300",
                                mainImage === img
                                    ? "border-primary ring-2 ring-primary/20 opacity-100"
                                    : "border-white/10 opacity-60 hover:opacity-100"
                            )}
                            onClick={() => setMainImage(img)}
                        >
                            <Image
                                src={img}
                                alt={`${title} preview ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
