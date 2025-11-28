import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Calendar, Ticket } from "lucide-react"
import { RaffleGallery } from "@/components/raffle-gallery"
import { TicketPurchase } from "@/components/ticket-purchase"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: raffle } = await supabase.from('raffles').select('name').eq('id', id).single()

    return {
        title: raffle ? `${raffle.name} | RifasOnline` : 'Rifa no encontrada',
    }
}

export default async function RaffleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()

    const { data: raffle, error } = await supabase
        .from('raffles')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !raffle) {
        notFound()
    }

    const images = raffle.images && raffle.images.length > 0
        ? raffle.images
        : [raffle.image_url || "/assets/banner.webp"]

    return (
        <div className="container py-10 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image Gallery */}
                <div>
                    <RaffleGallery images={images} title={raffle.name} />
                </div>

                {/* Right Column: Info & Purchase */}
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/10 px-3 py-1">
                                {raffle.status === 'active' ? 'En curso' : 'Finalizada'}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                Sortea el {new Date(raffle.end_date).toLocaleDateString()}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                            {raffle.name}
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
                            {raffle.description}
                        </p>

                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-3xl font-bold text-white">
                                $ {raffle.price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                            <span className="text-muted-foreground font-medium">
                                por ticket
                            </span>
                        </div>
                    </div>

                    <TicketPurchase
                        price={raffle.price}
                        raffleId={raffle.id}
                        raffleName={raffle.name}
                    />
                </div>
            </div>
        </div>
    )
}
