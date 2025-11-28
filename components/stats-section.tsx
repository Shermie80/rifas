import { Users, Ticket, Activity, Wifi } from "lucide-react"

const stats = [
    {
        label: "Conectados",
        value: "287",
        icon: Wifi,
        color: "text-green-500",
    },
    {
        label: "Usuarios",
        value: "89.910",
        icon: Users,
        color: "text-blue-500",
    },
    {
        label: "Rifas jugadas",
        value: "119.202",
        icon: Ticket,
        color: "text-purple-500",
    },
    {
        label: "Rifas activas",
        value: "21",
        icon: Activity,
        color: "text-orange-500",
    },
]

export function StatsSection() {
    return (
        <section className="px-8">
            <div className="container py-12 my-12 bg-gradient-to-b from-primary/10 via-background to-background rounded-3xl border border-white/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-2 group">
                            <div className={`p-3 rounded-lg bg-white/5 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
