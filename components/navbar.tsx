import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                    <div className="bg-gradient-to-br from-primary to-primary/70 p-1.5 rounded-lg shadow-lg shadow-primary/20">
                        <Ticket className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">RifasOnline</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary relative group">
                        Inicio
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/rifas" className="transition-colors hover:text-primary relative group">
                        Rifas
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/ganadores" className="transition-colors hover:text-primary relative group">
                        Ganadores
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/como-funciona" className="transition-colors hover:text-primary relative group">
                        Cómo funciona
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </Link>
                </nav>
                <div className="flex items-center gap-3">
                    <Link href="/login">
                        <Button variant="ghost" className="hidden sm:inline-flex">Iniciar sesión</Button>
                    </Link>
                    <Link href="/register">
                        <Button className="shadow-md shadow-primary/10 hover:shadow-primary/20 transition-shadow">Crear cuenta</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
