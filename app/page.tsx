import { Button } from "@/components/ui/button"
import { RaffleCard } from "@/components/raffle-card"
import Link from "next/link"
import { RAFFLES } from "@/lib/data"

const FEATURED_RAFFLES = RAFFLES

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            🎉 La plataforma #1 de rifas online
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-sm">
            Gana premios <br className="hidden md:block" />
            <span className="text-primary">exclusivos</span> hoy
          </h1>
          <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Participa en nuestras rifas verificadas y sé el próximo ganador.
            Tecnología, viajes y experiencias únicas te esperan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/rifas">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
                Ver rifas activas
              </Button>
            </Link>
            <Link href="/como-funciona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full border-primary/20 hover:bg-primary/5 transition-all">
                Cómo funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Raffles */}
      <section className="py-20 md:py-32 bg-secondary/30 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Rifas Destacadas</h2>
              <p className="text-muted-foreground text-lg">No te pierdas las oportunidades más populares del momento.</p>
            </div>
            <Link href="/rifas">
              <Button variant="ghost" className="group">
                Ver todas
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_RAFFLES.map((raffle) => (
              <RaffleCard key={raffle.id} {...raffle} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
