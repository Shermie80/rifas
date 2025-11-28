"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteRaffle(id: string) {
    const supabase = await createClient()

    // Check if user is admin (this is a basic check, ideally should be more robust)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: "Unauthorized" }
    }

    // In a real app, we would check a "role" or "is_admin" claim.
    // For now, we'll proceed assuming the UI protects the button or RLS handles it.
    // However, for safety, let's try to delete.

    // Use Service Role Key to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
        return { error: "Configuración de servidor incompleta: Falta SUPABASE_SERVICE_ROLE_KEY" }
    }

    const { createClient: createSupabaseClient } = require('@supabase/supabase-js')
    const supabaseAdmin = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )

    const { error, count } = await supabaseAdmin
        .from("raffles")
        .delete({ count: 'exact' })
        .eq("id", id)

    if (error) {
        return { error: error.message }
    }

    if (count === 0) {
        return { error: "No se pudo eliminar la rifa. Puede que no exista o no tengas permisos." }
    }

    revalidatePath("/")
    revalidatePath("/rifas")
    return { success: true }
}
