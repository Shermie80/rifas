"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteRaffle } from "@/lib/actions/raffle"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function DeleteRaffleButton({ id }: { id: string }) {
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation if inside a Link
        e.stopPropagation()

        if (!confirm("¿Estás seguro de que quieres eliminar esta rifa?")) return

        setIsDeleting(true)
        const result = await deleteRaffle(id)
        setIsDeleting(false)

        if (result.error) {
            toast({
                title: "Error",
                description: "No se pudo eliminar la rifa: " + result.error,
                variant: "destructive",
            })
        } else {
            toast({
                title: "Rifa eliminada",
                description: "La rifa ha sido eliminada correctamente.",
            })
        }
    }

    return (
        <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash className="h-4 w-4" />
        </Button>
    )
}
