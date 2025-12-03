"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CountdownTimerProps {
    targetDate: string
    className?: string
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <div className="relative">
                <div className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/60 font-mono tabular-nums tracking-tighter drop-shadow-sm">
                    {value.toString().padStart(2, "0")}
                </div>
                {/* Reflection/Glow effect */}
                <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-full opacity-20" />
            </div>
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">
                {label}
            </span>
        </div>
    )

    return (
        <div className={cn("flex flex-wrap justify-center items-center py-6 md:py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000", className)}>
            <TimeUnit value={timeLeft.days} label="Días" />
            <div className="text-2xl md:text-4xl font-bold text-muted-foreground/30 mb-6">:</div>
            <TimeUnit value={timeLeft.hours} label="Hs" />
            <div className="text-2xl md:text-4xl font-bold text-muted-foreground/30 mb-6">:</div>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <div className="text-2xl md:text-4xl font-bold text-muted-foreground/30 mb-6">:</div>
            <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>
    )
}
