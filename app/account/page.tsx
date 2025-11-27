import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { revalidatePath } from "next/cache"

export default async function AccountPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    async function updateProfile(formData: FormData) {
        "use server"
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const fullName = formData.get("fullName") as string
        const dni = formData.get("dni") as string
        const phone = formData.get("phone") as string
        const address = formData.get("address") as string
        const avatarUrl = formData.get("avatarUrl") as string

        await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                dni,
                phone,
                address,
                avatar_url: avatarUrl,
            })
            .eq('id', user.id)

        revalidatePath("/account")
        revalidatePath("/") // Update navbar avatar
    }

    return (
        <div className="container py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Mi Cuenta</CardTitle>
                    <CardDescription>Administra tu información personal</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={updateProfile} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input id="email" value={user.email} disabled className="bg-muted" />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nombre completo</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                defaultValue={profile?.full_name || ""}
                                placeholder="Tu nombre completo"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dni">DNI / Identificación</Label>
                                <Input
                                    id="dni"
                                    name="dni"
                                    defaultValue={profile?.dni || ""}
                                    placeholder="12345678"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono / Celular</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    defaultValue={profile?.phone || ""}
                                    placeholder="+54 9 11 1234 5678"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                name="address"
                                defaultValue={profile?.address || ""}
                                placeholder="Calle Falsa 123"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="avatarUrl">URL del Avatar (Opcional)</Label>
                            <Input
                                id="avatarUrl"
                                name="avatarUrl"
                                defaultValue={profile?.avatar_url || ""}
                                placeholder="https://ejemplo.com/avatar.jpg"
                            />
                            <p className="text-xs text-muted-foreground">
                                Por ahora puedes pegar una URL de imagen. Próximamente subida de archivos.
                            </p>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button type="submit">Guardar cambios</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
