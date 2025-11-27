"use client"

import { useState, use } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { RAFFLES } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Share2, Minus, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RafflePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const raffle = RAFFLES.find((r) => r.id === id)
    const [quantity, setQuantity] = useState(1)

    if (!raffle) {
        notFound()
    }

    const progress = (raffle.soldTickets / raffle.totalTickets) * 100
    const availableTickets = raffle.totalTickets - raffle.soldTickets
    const winChance = ((quantity / raffle.totalTickets) * 100).toFixed(2)

    const handleIncrement = () => {
        if (quantity < availableTickets) {
            setQuantity(quantity + 1)
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-border/50 bg-muted shadow-xl">
                        <Image
                            src={raffle.imageUrl}
                            alt={raffle.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {raffle.images.map((img, index) => (
                            <div key={index} className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-border/50 bg-muted cursor-pointer hover:ring-2 ring-primary transition-all hover:scale-105">
                                <Image
                                    src={img}
                                    alt={`${raffle.title} thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <Badge className="mb-4 text-sm px-4 py-1">🔥 Rifa Activa</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{raffle.title}</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {raffle.description}
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border-2 border-border/50 shadow-xl space-y-6">
                        <div className="flex justify-between items-end pb-6 border-b border-border/50">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2 font-medium">Precio por boleto</p>
                                <p className="text-5xl font-bold text-primary">${raffle.price.toFixed(2)} <span className="text-xl text-muted-foreground font-normal">USD</span></p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 text-destructive font-bold mb-1 text-lg">
                                    <Clock className="h-6 w-6" />
                                    <span>12 : 08 : 45 : 22</span>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium">Tiempo restante</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm font-semibold">
                                <span>Boletos Vendidos</span>
                                <span className="text-primary">{raffle.soldTickets} / {raffle.totalTickets}</span>
                            </div>
                            <Progress value={progress} className="h-3 bg-secondary" />
                        </div>

                        {/* Quantity Selector */}
                        <div className="space-y-4 pt-4">
                            <label className="text-sm font-semibold">Cantidad de boletos</label>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12 rounded-xl border-2"
                                    onClick={handleDecrement}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-5 w-5" />
                                </Button>
                                <div className="flex-1 text-center">
                                    <span className="text-4xl font-bold text-primary">{quantity}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12 rounded-xl border-2"
                                    onClick={handleIncrement}
                                    disabled={quantity >= availableTickets}
                                >
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    Total: <span className="text-xl font-bold text-foreground">${(raffle.price * quantity).toFixed(2)}</span> USD
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="w-full text-lg h-16 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-[1.02]">
                                Comprar número
                            </Button>

                            {/* Win Chance Bar */}
                            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-primary">Probabilidad de ganar</span>
                                    <span className="text-lg font-bold text-primary">{winChance}%</span>
                                </div>
                                <Progress value={parseFloat(winChance)} className="h-2 bg-primary/20" />
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Con {quantity} {quantity === 1 ? 'boleto' : 'boletos'} de {raffle.totalTickets} disponibles
                                </p>
                            </div>

                            <p className="text-center text-xs text-muted-foreground mt-4">
                                Al participar aceptas nuestros términos y condiciones.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                            <Share2 className="h-4 w-4" />
                            Compartir esta rifa
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
