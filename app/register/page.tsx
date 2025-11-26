import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from "lucide-react"

export default function RegisterPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link href="/" className="mb-8 flex items-center gap-2 font-bold text-2xl">
                <div className="bg-primary p-1 rounded-md">
                    <Ticket className="h-8 w-8 text-primary-foreground" />
                </div>
                <span>RifasOnline</span>
            </Link>
            <Card className="w-full max-w-[350px]">
                <CardHeader>
                    <CardTitle>Crear cuenta</CardTitle>
                    <CardDescription>Ingresa tus datos para crear una cuenta nueva.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input id="name" placeholder="Nombre completo" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="email" placeholder="nombre@ejemplo.com" type="email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input id="password" placeholder="Contraseña" type="password" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full">Registrarse</Button>
                    <div className="text-center text-sm text-muted-foreground">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                            Inicia sesión
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
