import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"
import logo from "@/assets/logo.png"

export function Footer() {
    return (
        <footer className="relative border-t border-white/10 bg-gradient-to-b from-primary/20 via-background/60 to-background/40 backdrop-blur-lg">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image src={logo} alt="RifasYa Logo" width={150} height={40} className="h-20 w-auto object-contain" />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            La forma más fácil y segura de participar en rifas online y ganar premios increíbles.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Navegación</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/rifas" className="hover:text-primary transition-colors">
                                    Rifas Activas
                                </Link>
                            </li>
                            <li>
                                <Link href="/ganadores" className="hover:text-primary transition-colors">
                                    Ganadores
                                </Link>
                            </li>
                            <li>
                                <Link href="/como-funciona" className="hover:text-primary transition-colors">
                                    Cómo funciona
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terminos" className="hover:text-primary transition-colors">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidad" className="hover:text-primary transition-colors">
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Síguenos</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RifasYa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
