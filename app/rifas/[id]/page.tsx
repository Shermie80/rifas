import Image from "next/image"
import { notFound } from "next/navigation"
import { RAFFLES } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Ticket, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function RafflePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const raffle = RAFFLES.find((r) => r.id === id)

    if (!raffle) {
        notFound()
    }

    const progress = (raffle.soldTickets / raffle.totalTickets) * 100

    return (
        <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
                        <Image
                            src={raffle.imageUrl}
                            alt={raffle.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {raffle.images.map((img, index) => (
                            <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted cursor-pointer hover:ring-2 ring-primary transition-all">
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
                        <Badge className="mb-4">Rifa Activa</Badge>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{raffle.title}</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {raffle.description}
                        </p>
                    </div>

                    <div className="p-6 rounded-xl bg-card border shadow-sm space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Precio del boleto</p>
                                <p className="text-4xl font-bold text-primary">${raffle.price.toFixed(2)} <span className="text-lg text-muted-foreground font-normal">USD</span></p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 text-destructive font-bold mb-1">
                                    <Clock className="h-5 w-5" />
                                    <span>12 : 08 : 45 : 22</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Tiempo restante</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span>Boletos Vendidos</span>
                                <span>{raffle.soldTickets} / {raffle.totalTickets}</span>
                            </div>
                            <Progress value={progress} className="h-3" />
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="w-full text-lg h-14">
                                Participar Ahora
                            </Button>
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
