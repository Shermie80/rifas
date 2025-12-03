"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface NotificationsMenuProps {
    user: any // using any for now to avoid complex type imports, but ideally User from supabase
}

interface Notification {
    id: string
    title: string
    message: string
    date: string
    read: boolean
    type: 'welcome' | 'info' | 'success'
}

export function NotificationsMenu({ user }: NotificationsMenuProps) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (user) {
            // Simulate fetching notifications
            // For now, we only have the "Welcome" notification for new users
            // We'll use the user's creation date as the notification date
            const welcomeNotification: Notification = {
                id: 'welcome-1',
                title: '¡Bienvenido a RifasYa!',
                message: 'Gracias por unirte a la mejor plataforma de rifas.',
                date: new Date(user.created_at).toLocaleDateString(),
                read: false,
                type: 'welcome'
            }

            // Check if we have stored read state in localStorage to persist dismissal/read status locally
            const readStatus = localStorage.getItem(`notification-${welcomeNotification.id}-${user.id}`)
            const isDeleted = localStorage.getItem(`notification-deleted-${welcomeNotification.id}-${user.id}`)

            if (readStatus === 'read') {
                welcomeNotification.read = true
            }

            if (isDeleted !== 'true') {
                setNotifications([welcomeNotification])
            }
        }
    }, [user])

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
        // Persist to localStorage
        localStorage.setItem(`notification-${id}-${user.id}`, 'read')
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        notifications.forEach(n => {
            localStorage.setItem(`notification-${n.id}-${user.id}`, 'read')
        })
    }

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
        // Persist deletion (simulated)
        localStorage.setItem(`notification-deleted-${id}-${user.id}`, 'true')
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative cursor-pointer text-muted-foreground hover:text-primary transition-colors">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background animate-pulse"></span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[90vw] sm:w-80 border-white/10 bg-black/60 backdrop-blur-md text-white p-0 overflow-hidden shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                    <DropdownMenuLabel className="p-0 text-sm font-semibold">Notificaciones</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto px-2 py-1 text-xs text-primary hover:text-primary/80 hover:bg-primary/10"
                            onClick={(e) => {
                                e.preventDefault()
                                markAllAsRead()
                            }}
                        >
                            Marcar todo como leído
                        </Button>
                    )}
                </div>

                <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "flex flex-col gap-1 p-4 border-b border-white/5 hover:bg-white/5 transition-colors relative group",
                                    !notification.read && "bg-primary/5"
                                )}
                            >
                                <div className="flex justify-between items-start gap-2">
                                    <h4 className={cn("text-sm font-medium", !notification.read ? "text-white" : "text-muted-foreground")}>
                                        {notification.title}
                                    </h4>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notification.read && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-muted-foreground hover:text-primary"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    markAsRead(notification.id)
                                                }}
                                                title="Marcar como leída"
                                            >
                                                <Eye className="h-3 w-3" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-muted-foreground hover:text-red-500"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                deleteNotification(notification.id)
                                            }}
                                            title="Eliminar notificación"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {notification.message}
                                </p>
                                <span className="text-[10px] text-white/30 mt-1">
                                    {notification.date}
                                </span>
                                {!notification.read && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center text-muted-foreground text-sm">
                            No tienes notificaciones
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
