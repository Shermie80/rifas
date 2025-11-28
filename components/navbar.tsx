import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut, Settings, Bell, Ticket } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import Image from "next/image"
import logo from "@/assets/logo.png"
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
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                    <Image src={logo} alt="RifasYa Logo" width={50} height={50} className="w-12 h-12 object-contain" />
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {["Inicio", "Rifas", "Ganadores", "Cómo funciona"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Inicio" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                            className="text-muted-foreground hover:text-primary transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"></span>
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative cursor-pointer text-muted-foreground hover:text-primary transition-colors">
                                        <Bell className="h-5 w-5" />
                                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background"></span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 border-white/10 bg-black/80 backdrop-blur-xl text-white">
                                    <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem className="text-muted-foreground justify-center py-4">
                                        Sin notificaciones
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-blue-200 text-sm font-medium">
                                <span>$ {profile?.balance?.toFixed(2) || "0.00"}</span>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative cursor-pointer h-10 w-10 rounded-full ring-2 ring-white/10 hover:ring-primary/50 transition-all p-0 overflow-hidden">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage src={profile?.avatar_url || "/assets/avatar_default.jpg"} alt={profile?.full_name || "Usuario"} className="object-cover" />
                                            <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                                {profile?.full_name?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 border-white/10 bg-black/80 backdrop-blur-xl text-white" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{profile?.full_name || "Usuario"}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                                        <Link href="/account">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Mi Cuenta</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    {profile?.role === 'admin' && (
                                        <>
                                            <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                                                <Link href="/admin/create-raffle">
                                                    <Ticket className="mr-2 h-4 w-4" />
                                                    <span>Crear rifa</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-white/10" />
                                        </>
                                    )}
                                    <form action="/auth/signout" method="post">
                                        <button className="w-full flex items-center">
                                            <DropdownMenuItem className="w-full cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-500/10">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Cerrar sesión</span>
                                            </DropdownMenuItem>
                                        </button>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="hidden sm:inline-flex cursor-pointer hover:bg-white/5 hover:text-white">Iniciar sesión</Button>
                            </Link>
                            <Link href="/register">
                                <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer active:scale-95 bg-primary text-primary-foreground border-none">Crear cuenta</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
