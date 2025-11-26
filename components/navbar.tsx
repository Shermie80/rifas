import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="bg-primary p-1 rounded-md">
                        <Ticket className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span>RifasOnline</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Inicio
                    </Link>
                    <Link href="/rifas" className="transition-colors hover:text-primary">
                        Rifas
                    </Link>
                    <Link href="/ganadores" className="transition-colors hover:text-primary">
                        Ganadores
                    </Link>
                    <Link href="/como-funciona" className="transition-colors hover:text-primary">
                        Cómo funciona
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost">Iniciar sesión</Button>
                    </Link>
                    <Link href="/register">
                        <Button>Crear cuenta</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
