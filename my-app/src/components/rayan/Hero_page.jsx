import React from "react";
import { useState, useEffect } from 'react'
import { Paperclip, X } from 'lucide-react'
import { MessageSquare, Lock, Users, Send, Bell, Zap } from 'lucide-react'


export function ChatInput() {
    const [input, setInput] = useState('')
    const [displayedText, setDisplayedText] = useState('')
    const [sentenceIndex, setSentenceIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    const sentences = [
        'Hi,',
        'Goodbye,',
        'How are you?',
        'Welcome to UniChat!',
        'Type your message…',
        'Ask anything, we\'re here!',
        'Start chatting now…',
        'Say hello to your campus!',
        'Connect with your classmates…',
        'Share your ideas…',
        'Send a message…',
        'Ready to chat?',
    ]

    const currentSentence = sentences[sentenceIndex]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (input.trim() !== '' || !isMounted) return

        let timeout

        if (isTyping) {
            if (displayedText.length < currentSentence.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(currentSentence.slice(0, displayedText.length + 1))
                }, 100)
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false)
                }, 2000)
            }
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(displayedText.slice(0, -1))
                }, 50)
            } else {
                setSentenceIndex((prev) => (prev + 1) % sentences.length)
                setIsTyping(true)
            }
        }

        return () => clearTimeout(timeout)
    }, [displayedText, isTyping, currentSentence, input, sentences, isMounted])

    const handleSend = () => {
        if (input.trim()) {
            console.log('Message sent:', input)
            setInput('')
        }
    }

    const handleClear = () => {
        setInput('')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!isMounted) return null

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 border border-neutral-200 hover:border-[#3D9DF2] transition-colors">
                <button className="text-neutral-400 hover:text-[#3D9DF2] transition-colors flex-shrink-0">
                    <Paperclip size={20} />
                </button>

                <div className="flex-1 relative">
                    {input.trim() === '' && (
                        <span className="absolute inset-0 text-neutral-400 text-sm pointer-events-none flex items-center">
                            {displayedText}
                            {isTyping && <span className="animate-pulse">|</span>}
                        </span>
                    )}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder=""
                        className="w-full bg-transparent outline-none text-neutral-900 text-sm relative z-10"
                    />
                </div>

                {input.trim() ? (
                    <>
                        <button
                            onClick={handleClear}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors flex-shrink-0"
                        >
                            <X size={18} />
                        </button>
                        <button
                            onClick={handleSend}
                            className="bg-gradient-to-r from-[#3D9DF2] to-[#27F293] text-white rounded-full p-2 hover:shadow-lg hover:scale-110 transition-all flex-shrink-0"
                        >
                            <Send size={18} />
                        </button>
                    </>
                ) : (
                    <button className="text-neutral-400 flex-shrink-0">
                        <Send size={18} />
                    </button>
                )}
            </div>
        </div>
    )
}

export function FieldsOfStudy() {
    const [showAll, setShowAll] = useState(false)

    const fields = [
        'Computer Science',
        'Medicine',
        'Business & Management',
        'Engineering',
        'Law',
        'Psychology',
        'Economics',
        'Architecture',
        'Biology',
        'Chemistry',
        'Mathematics',
        'Art & Design'
    ]

    const displayedFields = showAll ? fields : fields.slice(0, 8)

    return (
        <section id="fields" className="py-20 sm:py-32 bg-gradient-to-r from-[#F23D7F]/5 via-transparent to-[#3D9DF2]/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Most Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D9DF2] to-[#27F293]">Fields of Study</span>
                    </h2>
                    <p className="text-lg text-neutral-600">Connect with peers in your academic discipline</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedFields.map((field, index) => (
                        <div
                            key={index}
                            className="group relative p-6 rounded-xl bg-white border border-neutral-200 hover:border-[#3D9DF2] hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F23D7F]/0 via-[#3D9DF2]/0 to-[#27F293]/0 group-hover:from-[#F23D7F]/10 group-hover:via-[#3D9DF2]/10 group-hover:to-[#27F293]/10 transition-all"></div>
                            <p className="relative text-center font-semibold text-neutral-900 group-hover:text-[#3D9DF2] transition-colors">
                                {field}
                            </p>
                        </div>
                    ))}
                </div>

                {!showAll && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 bg-gradient-to-r from-[#3D9DF2] to-[#27F293] text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                            Show More Fields
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
export function WhyUniChat() {
    const [isVisible, setIsVisible] = useState(false)

    const features = [
        {
            icon: MessageSquare,
            title: 'Fast and smooth messaging',
            description: 'Experience lightning-fast real-time communication with zero latency',
            color: 'from-[#F23D7F]/20 to-[#F23D7F]/5'
        },
        {
            icon: Lock,
            title: 'Verified and safe academic networks',
            description: 'Every user is verified through institutional email accounts',
            color: 'from-[#3D9DF2]/20 to-[#3D9DF2]/5'
        },
        {
            icon: Users,
            title: 'Support for every field of study',
            description: 'Connect with people in your specific academic discipline',
            color: 'from-[#27F293]/20 to-[#27F293]/5'
        },
        {
            icon: Send,
            title: 'Easy communication with teachers',
            description: 'Direct messaging channels with faculty and mentors',
            color: 'from-[#F23D7F]/20 to-[#3D9DF2]/5'
        },
        {
            icon: Bell,
            title: 'University announcements & events',
            description: 'Never miss important campus updates and events',
            color: 'from-[#3D9DF2]/20 to-[#27F293]/5'
        },
        {
            icon: Zap,
            title: 'Friendly and secure environment',
            description: 'Moderated spaces with community guidelines',
            color: 'from-[#27F293]/20 to-[#F23D7F]/5'
        }
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
                        Why You Must Use <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2]">UniChat</span>
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
                                className={`group p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-white/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
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
export default function HeroPage() {
    return (
        <div className="hero-block">
            {/* Navbar */}
            <nav className="hero-block">
                <h1 className="hero-block">UniChat</h1>

                <div className="hero-block">
                    <a href="#home" className="hero-block">Home</a>
                    <a href="#why" className="hero-block">Why UniChat</a>
                    <a href="#university" className="hero-block">University</a>
                    <a href="#vip" className="hero-block">VIP</a>
                </div>

                <div className="hero-block">
                    <a href="#login" className="hero-block">Login</a>
                    <a href="#register" className="hero-block">
                        Register
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-block">
                <div>
                    <h1 className="hero-block">UniChat</h1>
                    <p className="hero-block">One Campus. One Chat.</p>
                </div>

                <img
                    src="https://via.placeholder.com/500x350.png?text=UniChat+Image"
                    alt="UniChat visual"
                    className="hero-block"
                />
            </section>
        </div>
    );
}
