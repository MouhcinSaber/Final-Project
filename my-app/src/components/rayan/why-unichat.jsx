"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Lock, Users, Send, Bell, Zap } from "lucide-react"

export function WhyUniChat() {
    const [isVisible, setIsVisible] = useState(false)

    const features = [
        {
            icon: MessageSquare,
            title: "Fast and smooth messaging",
            description: "Experience lightning-fast real-time communication with zero latency",
            color: "from-[#F23D7F]/20 to-[#F23D7F]/5",
        },
        {
            icon: Lock,
            title: "Verified and safe academic networks",
            description: "Every user is verified through institutional email accounts",
            color: "from-[#3D9DF2]/20 to-[#3D9DF2]/5",
        },
        {
            icon: Users,
            title: "Support for every field of study",
            description: "Connect with people in your specific academic discipline",
            color: "from-[#27F293]/20 to-[#27F293]/5",
        },
        {
            icon: Send,
            title: "Easy communication with teachers",
            description: "Direct messaging channels with faculty and mentors",
            color: "from-[#F23D7F]/20 to-[#3D9DF2]/5",
        },
        {
            icon: Bell,
            title: "University announcements & events",
            description: "Never miss important campus updates and events",
            color: "from-[#3D9DF2]/20 to-[#27F293]/5",
        },
        {
            icon: Zap,
            title: "Friendly and secure environment",
            description: "Moderated spaces with community guidelines",
            color: "from-[#27F293]/20 to-[#F23D7F]/5",
        },
    ]

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section id="why" className="py-20 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F23D7F]/5 via-transparent to-[#3D9DF2]/5 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Why You Must Use{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2]">UniChat</span>
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        UniChat connects students, teachers, and universities into one smart communication platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isVisible ? "opacity-100" : "opacity-0"
                                    }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="mb-4 inline-block p-3 bg-white/60 rounded-lg group-hover:scale-110 transition-transform">
                                    <Icon size={24} className="text-neutral-900" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-neutral-900">{feature.title}</h3>
                                <p className="text-neutral-600 text-sm">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 p-8 bg-gradient-to-r from-[#F23D7F]/10 via-[#3D9DF2]/10 to-[#27F293]/10 rounded-2xl border border-white/40 text-center">
                    <p className="text-lg text-neutral-800 font-semibold">
                        UniChat isn't just a chat — it's your whole campus in one place.
                    </p>
                </div>
            </div>
        </section>
    )
}
