"use client"

import { useState } from "react"

import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            <span className="text-[#F23D7F]">Uni</span>
                            <span className="text-[#3D9DF2]">Chat</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#home" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                            Home
                        </Link>
                        <Link href="#why" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                            Why UniChat
                        </Link>
                        <Link href="#fields" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                            Field of Study
                        </Link>
                        <Link href="#vip" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                            VIP
                        </Link>
                    </div>

                    {/* Right Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors">Log in</button>
                        <button className="px-6 py-2 bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2] text-white rounded-full hover:shadow-lg transition-shadow">
                            Register
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2 animate-in fade-in">
                        <Link
                            href="#home"
                            className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="#why"
                            className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Why UniChat
                        </Link>
                        <Link
                            href="#fields"
                            className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Field of Study
                        </Link>
                        <Link
                            href="#vip"
                            className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            VIP
                        </Link>
                        <div className="pt-2 flex gap-2">
                            <button className="flex-1 px-4 py-2 text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-100 transition-colors">
                                Log in
                            </button>
                            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2] text-white rounded-lg hover:shadow-lg transition-shadow">
                                Register
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
