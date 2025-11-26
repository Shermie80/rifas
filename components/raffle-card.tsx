import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface RaffleCardProps {
    id: string
    title: string
    price: number
    totalTickets: number
    soldTickets: number
    imageUrl: string
    endDate: string
}

export function RaffleCard({ id, title, price, totalTickets, soldTickets, imageUrl, endDate }: RaffleCardProps) {
    const progress = (soldTickets / totalTickets) * 100

    return (
        <Card className="overflow-hidden flex flex-col h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
            <div className="relative aspect-video w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">Precio del boleto:</span>
                    <span className="font-bold text-xl text-primary">${price.toFixed(2)}</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-medium">
                        <span>{soldTickets} / {totalTickets} vendidos</span>
                        <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/rifas/${id}`} className="w-full">
                    <Button className="w-full font-semibold" size="lg">Participar ahora</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
