import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "../../../components/ui/textarea"
import { revalidatePath } from "next/cache"
import { MultiImageUpload } from "@/components/multi-image-upload"

export default async function CreateRafflePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        redirect("/")
    }

    async function createRaffle(formData: FormData) {
        "use server"
        const supabase = await createClient()

        const name = formData.get("name") as string
        const description = formData.get("description") as string
        const price = parseFloat(formData.get("price") as string)
        const endDate = formData.get("endDate") as string
        const imagesJson = formData.get("images") as string

        let images: string[] = []
        try {
            images = JSON.parse(imagesJson || "[]")
        } catch (e) {
            console.error("Error parsing images:", e)
        }

        if (!name || !price || !endDate) {
            // Basic validation
            return
        }

        const { error } = await supabase
            .from('raffles')
            .insert({
                name,
                description,
                price,
                end_date: new Date(endDate).toISOString(),
                image_url: images.length > 0 ? images[0] : null, // Main image for backward compatibility
                images: images, // Store all images
                status: 'active'
            })

        if (error) {
            console.error("Error creating raffle:", error)
            console.error("Check if 'images' column exists in 'raffles' table. Run the SQL from supabase_schema_update.md")
            // In a real app, we'd return the error to display it
            return
        }

        revalidatePath("/")
        revalidatePath("/rifas")
        redirect("/")
    }

    return (
        <div className="container py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Crear Nueva Rifa</CardTitle>
                    <CardDescription>Completa los detalles para publicar una nueva rifa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createRaffle} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre de la rifa</Label>
                            <Input id="name" name="name" placeholder="Ej: iPhone 15 Pro Max" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Detalles sobre el premio y el sorteo..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Precio del ticket ($)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="1000.00"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endDate">Fecha del sorteo</Label>
                                <Input
                                    id="endDate"
                                    name="endDate"
                                    type="datetime-local"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Imágenes de la rifa (Máx. 3)</Label>
                            <MultiImageUpload name="images" bucket="raffles" maxImages={3} />
                        </div>

                        <div className="pt-4 flex justify-end gap-4">
                            <Button variant="outline" type="button">Cancelar</Button>
                            <Button type="submit">Crear Rifa</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
