"use client"
//hero-section
import { useEffect, useState } from "react"
import { ChatInput } from "./chat-input"

export function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <section id="home" className="relative overflow-hidden pt-12 pb-20 sm:pt-24 sm:pb-32">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-br from-[#F23D7F]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gradient-to-tr from-[#3D9DF2]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-br from-[#27F293]/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div
                        className={`transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                            }`}
                    >
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-[#F23D7F]/10 text-[#F23D7F] rounded-full text-sm font-medium">
                                🎓 Smart Campus Communication
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="text-[#3D9DF2]">One Campus.</span>
                            <span className="block text-neutral-900">One Chat.</span>
                        </h1>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            UniChat is an intelligent messaging platform that connects students, teachers, and universities into one
                            smart communication hub. Share prospects directly to real people. Nothing to download. Just real,
                            meaningful connections for truly friction-less collaboration.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                                Get Started
                            </button>
                            <button className="px-8 py-4 border-2 border-neutral-300 text-neutral-900 rounded-lg font-semibold hover:border-[#3D9DF2] hover:text-[#3D9DF2] transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div
                        className={`transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                            }`}
                    >
                        <div className="relative flex flex-col items-center justify-center">
                            {/* Decorative Shapes */}
                            <div className="absolute top-0 right-20 w-32 h-32 bg-[#3D9DF2] rounded-lg transform -rotate-12 opacity-80 animate-float"></div>
                            <div
                                className="absolute bottom-20 left-0 w-40 h-40 bg-[#27F293] rounded-2xl transform rotate-6 opacity-70 animate-float"
                                style={{ animationDelay: "1s" }}
                            ></div>
                            <div className="absolute top-20 left-10 w-24 h-24 bg-[#F23D7F] rounded-full opacity-90 animate-pulse"></div>

                            {/* Hero Image Placeholder */}
                            <div className="relative z-10 w-full flex flex-col items-center">
                                <div className="w-64 h-80 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/50">
                                    <img
                                        src="/happy-student-wearing-graduation-cap-holding-smart.jpg"
                                        alt="Student using UniChat"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="mt-8 w-full flex justify-center">
                                    <ChatInput />
                                </div>
                            </div>

                            {/* Chat Bubbles */}
                            <div className="absolute top-20 right-0 bg-white rounded-2xl shadow-xl p-4 max-w-xs transform animate-bounce">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#F23D7F] to-[#3D9DF2] rounded-full flex-shrink-0"></div>
                                    <div>
                                        <p className="font-semibold text-sm text-neutral-900">Hey! Nice to meet you</p>
                                        <p className="text-xs text-neutral-500">Hope you're doing fine.</p>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-32 left-10 bg-[#3D9DF2] text-white rounded-2xl p-3 max-w-xs transform animate-bounce"
                                style={{ animationDelay: "0.5s" }}
                            >
                                <p className="text-sm font-medium">How can I help you today?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    )
}
