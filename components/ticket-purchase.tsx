"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TicketPurchaseProps {
    price: number
    raffleId: string
    raffleName: string
}

export function TicketPurchase({ price, raffleId, raffleName }: TicketPurchaseProps) {
    const [quantity, setQuantity] = useState(1)
    const { toast } = useToast()

    const increment = () => setQuantity(q => Math.min(q + 1, 100)) // Max 100 tickets
    const decrement = () => setQuantity(q => Math.max(q - 1, 1))

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            toast({
                title: "Enlace copiado",
                description: "El enlace de la rifa ha sido copiado al portapapeles.",
            })
        } catch (err) {
            console.error("Failed to copy: ", err)
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Cantidad de tickets</span>
                    <div className="flex items-center gap-3 bg-background/50 rounded-lg p-1 border border-white/10">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white/10 hover:text-white cursor-pointer"
                            onClick={decrement}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white/10 hover:text-white cursor-pointer"
                            onClick={increment}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-medium">Total a pagar</span>
                    <span className="text-2xl font-bold text-primary">
                        $ {(price * quantity).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                </div>

                <Button size="lg" className="w-full text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all py-6 cursor-pointer">
                    Comprar {quantity} Ticket{quantity > 1 ? 's' : ''}
                </Button>
            </div>

            <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-white hover:bg-white/5 gap-2 cursor-pointer"
                onClick={handleShare}
            >
                <Share2 className="h-4 w-4" />
                Compartir esta rifa
            </Button>
        </div>
    )
}
