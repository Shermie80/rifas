import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, User, LogOut, Settings } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch profile if user exists to get avatar
    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
        profile = data
    }

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
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                                        <AvatarImage src={profile?.avatar_url || "/assets/avatar_default.jpg"} alt={profile?.full_name || "Usuario"} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {profile?.full_name?.charAt(0).toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{profile?.full_name || "Usuario"}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/account" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Mi Cuenta</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/account/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Ajustes</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <form action="/auth/signout" method="post">
                                    <button className="w-full flex items-center">
                                        <DropdownMenuItem className="w-full cursor-pointer text-destructive focus:text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Cerrar sesión</span>
                                        </DropdownMenuItem>
                                    </button>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer">Iniciar sesión</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="shadow-md cursor-pointer shadow-primary/10 hover:shadow-primary/20 transition-shadow">Crear cuenta</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
