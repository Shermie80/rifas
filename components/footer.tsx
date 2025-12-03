import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
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
                        <div className="flex space-x-1 pt-4">
                            <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200">
                                <Link href="#">
                                    <Facebook className="h-5 w-5" />
                                    <span className="sr-only">Facebook</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200">
                                <Link href="#">
                                    <Instagram className="h-5 w-5" />
                                    <span className="sr-only">Instagram</span>
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200">
                                <Link href="#">
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Navegación</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/rifas">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Rifas Activas
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/ganadores">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Ganadores
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/como-funciona">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Cómo funciona
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/terminos">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Términos y condiciones
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidad">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Política de privacidad
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold text-white">Atención al cliente</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link href="/transparencia">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Transparencia
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Preguntas frecuentes
                                    </Button>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto">
                                    <Button variant="ghost" className="justify-start h-auto py-2 px-3 -ml-3 text-muted-foreground hover:text-primary font-normal">
                                        Contacto
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RifasYa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
