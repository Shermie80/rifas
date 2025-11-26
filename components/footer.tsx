import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">RifasOnline</h3>
                        <p className="text-sm text-muted-foreground">
                            La forma más fácil y segura de participar en rifas online y ganar premios increíbles.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Navegación</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-primary">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/rifas" className="hover:text-primary">
                                    Rifas Activas
                                </Link>
                            </li>
                            <li>
                                <Link href="/ganadores" className="hover:text-primary">
                                    Ganadores
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terminos" className="hover:text-primary">
                                    Términos y condiciones
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidad" className="hover:text-primary">
                                    Política de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Síguenos</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RifasOnline. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
