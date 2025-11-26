import { Button } from "@/components/ui/button"
import { RaffleCard } from "@/components/raffle-card"
import Link from "next/link"
import { RAFFLES } from "@/lib/data"

const FEATURED_RAFFLES = RAFFLES

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            La forma más fácil de ganar <br className="hidden md:block" />
            premios increíbles
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl mb-8">
            Participa en nuestras rifas exclusivas y sé el próximo ganador. La suerte está a solo un clic de distancia.
          </p>
          <Link href="/rifas">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              Ver todas las rifas
            </Button>
          </Link>
        </div>
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />
      </section>

      {/* Featured Raffles */}
      <section className="py-16 md:py-24 bg-secondary/5">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">Rifas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_RAFFLES.map((raffle) => (
              <RaffleCard key={raffle.id} {...raffle} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
