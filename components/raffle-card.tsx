import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Ticket, Trash } from "lucide-react"
import { DeleteRaffleButton } from "./delete-raffle-button"

interface RaffleCardProps {
    id: string
    title: string
    price: number
    totalTickets: number
    soldTickets: number
    imageUrl: string
    endDate: string
    isAdmin?: boolean
}

export function RaffleCard({ id, title, price, totalTickets, soldTickets, imageUrl, endDate, isAdmin }: RaffleCardProps) {
    const progress = (soldTickets / totalTickets) * 100

    return (
        <Card className="group overflow-hidden flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Admin Delete Button */}
                {isAdmin && <DeleteRaffleButton id={id} />}
            </div>
            <CardHeader className="p-5">
                <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 flex-1">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-muted-foreground font-medium">Precio del boleto</span>
                    <div className="flex items-center gap-1 text-primary font-bold">
                        <Ticket className="h-4 w-4" />
                        <span>$ {price.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        <span>{soldTickets} / {totalTickets} vendidos</span>
                        <span>{progress.toFixed(0)}%</span>
                    </div>
                    <Progress value={progress} className="h-2.5 bg-secondary" />
                </div>
            </CardContent>
            <CardFooter className="p-5 pt-0">
                <Link href={`/rifas/${id}`} className="w-full">
                    <Button className="w-full font-bold shadow-md shadow-primary/10 group-hover:shadow-primary/30 transition-all" size="lg">
                        Participar ahora
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
