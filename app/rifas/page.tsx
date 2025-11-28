import { createClient } from "@/lib/supabase/server"
import { RaffleCard } from "@/components/raffle-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const metadata = {
    title: "Rifas Activas | RifasOnline",
    description: "Explora todas nuestras rifas activas y participa para ganar premios increíbles.",
}

const ITEMS_PER_PAGE = 9

export default async function RifasPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient()
    const params = await searchParams
    const page = Number(params.page) || 1
    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    // Fetch raffles with pagination
    const { data: raffles, count, error } = await supabase
        .from("raffles")
        .select("*", { count: "exact" })
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .range(from, to)

    const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 0

    return (
        <div className="container py-12 md:py-20">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Rifas Activas</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Descubre todas las oportunidades disponibles para ganar. Selecciona tu rifa favorita y participa hoy mismo.
                </p>
            </div>

            {raffles && raffles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {raffles.map((raffle) => (
                            <RaffleCard
                                key={raffle.id}
                                id={raffle.id}
                                title={raffle.name}
                                price={raffle.price}
                                imageUrl={raffle.image_url || "/assets/banner.webp"} // Fallback image
                                endDate={raffle.end_date}
                                // Mock data for now as these fields don't exist in DB yet
                                totalTickets={100}
                                soldTickets={0}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4">
                            <Link href={`/rifas?page=${page - 1}`} className={page <= 1 ? "pointer-events-none opacity-50" : ""}>
                                <Button variant="outline" size="icon" disabled={page <= 1}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                            </Link>
                            <span className="text-sm font-medium">
                                Página {page} de {totalPages}
                            </span>
                            <Link href={`/rifas?page=${page + 1}`} className={page >= totalPages ? "pointer-events-none opacity-50" : ""}>
                                <Button variant="outline" size="icon" disabled={page >= totalPages}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 bg-muted/10 rounded-xl border border-dashed border-muted-foreground/20">
                    <p className="text-xl text-muted-foreground">No hay rifas activas en este momento.</p>
                    <p className="text-sm text-muted-foreground mt-2">¡Vuelve pronto para ver nuevas oportunidades!</p>
                </div>
            )}
        </div>
    )
}
