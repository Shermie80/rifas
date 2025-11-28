import { Button } from "@/components/ui/button"
import { RaffleCard } from "@/components/raffle-card"
import { StatsSection } from "@/components/stats-section"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { createClient } from "@/lib/supabase/server"

export const revalidate = 60

export default async function Home() {
  const supabase = await createClient()

  // Fetch user profile to check for admin role
  const { data: { user } } = await supabase.auth.getUser()
  let isAdmin = false

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    isAdmin = profile?.role === 'admin'
  }

  // Fetch top 3 active raffles
  const { data: featuredRaffles } = await supabase
    .from("raffles")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />

        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-30 mix-blend-screen pointer-events-none" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-blue-200 mb-6 backdrop-blur-sm">
            🎉 La plataforma #1 de rifas online
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-sm pb-2 font-sans">
            Gana premios <br className="hidden md:block" />
            <span className="text-primary">exclusivos</span> hoy
          </h1>
          <p className="max-w-[600px] text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
            Participa en nuestras rifas verificadas y sé el próximo ganador.
            Tecnología, premios en efectivo y experiencias únicas te esperan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/rifas">
              <Button size="lg" className="w-full sm:w-auto cursor-pointer text-lg px-8 py-6 rounded-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group">
                Ver rifas activas
                <ArrowRight className="ml-2 mt-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/como-funciona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer text-lg px-8 py-6 rounded-lg border-primary/20 hover:bg-primary/5 transition-all group">
                Cómo funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Raffles */}
      <section className="py-20 md:py-32 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Rifas recientes</h2>
              <p className="text-muted-foreground text-lg">No te pierdas las oportunidades más populares del momento.</p>
            </div>
            <Link href="/rifas">
              <Button variant="ghost" className="group cursor-pointer">
                Ver todas
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRaffles && featuredRaffles.length > 0 ? (
              featuredRaffles.map((raffle) => (
                <RaffleCard
                  key={raffle.id}
                  id={raffle.id}
                  title={raffle.name}
                  price={raffle.price}
                  imageUrl={raffle.image_url || "/assets/banner.webp"}
                  endDate={raffle.end_date}
                  totalTickets={100}
                  soldTickets={0}
                  isAdmin={isAdmin}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No hay rifas destacadas por el momento.
              </div>
            )}
          </div>
        </div>
      </section>

      <StatsSection />
    </div>
  )
}
