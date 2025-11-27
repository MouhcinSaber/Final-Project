"use client"
//fields-of-study
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-300 py-12 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F23D7F]/5 via-transparent to-[#3D9DF2]/5 pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="text-2xl font-bold mb-4 block">
                            <span className="text-[#F23D7F]">Uni</span>
                            <span className="text-[#3D9DF2]">Chat</span>
                        </Link>
                        <p className="text-neutral-400 mb-6">
                            Connecting students, teachers, and universities into one smart communication platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="#home" className="text-neutral-400 hover:text-[#3D9DF2] transition-colors">
                                Home
                            </Link>
                            <Link href="#why" className="text-neutral-400 hover:text-[#3D9DF2] transition-colors">
                                Why UniChat
                            </Link>
                            <Link href="#fields" className="text-neutral-400 hover:text-[#3D9DF2] transition-colors">
                                Fields of Study
                            </Link>
                            <Link href="#vip" className="text-neutral-400 hover:text-[#3D9DF2] transition-colors">
                                VIP Teachers
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-8"></div>

                {/* Social and Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center gap-6 mb-6 sm:mb-0">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-800 rounded-full hover:bg-[#F23D7F] transition-colors group"
                        >
                            <Facebook size={18} className="text-neutral-300 group-hover:text-white" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-800 rounded-full hover:bg-[#3D9DF2] transition-colors group"
                        >
                            <Instagram size={18} className="text-neutral-300 group-hover:text-white" />
                        </a>
                        <a
                            href="https://tiktok.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-800 rounded-full hover:bg-[#27F293] transition-colors group"
                        >
                            <svg
                                size={18}
                                className="text-neutral-300 group-hover:text-white w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.525.02C7.1.02 2.75 4.35 2.75 9.9v.01C2.75 15.5 7.1 19.9 12.525 19.9s9.775-4.35 9.775-9.9c0-.01 0-.01 0-.02C22.3 4.35 17.9.02 12.525.02zm4.582 6.98c.881.66 1.537 1.685 1.537 2.84 0 2.14-1.737 3.87-3.88 3.87-1.21 0-2.27-.55-3.013-1.42-.743.87-1.803 1.42-3.013 1.42-2.143 0-3.88-1.73-3.88-3.87 0-1.155.656-2.18 1.537-2.84-.05-.46-.08-.93-.08-1.41 0-1.98.786-3.88 2.36-5.25.18.09.345.21.5.35 1.26.88 2.1 2.38 2.1 4.05h.01c0 .66.54 1.2 1.2 1.2.66 0 1.2-.54 1.2-1.2 0-1.67.84-3.17 2.1-4.05.155-.14.32-.26.5-.35 1.574 1.37 2.36 3.27 2.36 5.25 0 .48-.03.95-.08 1.41z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-neutral-800 rounded-full hover:bg-[#F23D7F] transition-colors group"
                        >
                            <Linkedin size={18} className="text-neutral-300 group-hover:text-white" />
                        </a>
                        <a
                            href="mailto:contact@unichat.com"
                            className="p-2 bg-neutral-800 rounded-full hover:bg-[#3D9DF2] transition-colors group"
                        >
                            <Mail size={18} className="text-neutral-300 group-hover:text-white" />
                        </a>
                    </div>

                    <p className="text-neutral-500 text-sm text-center sm:text-right">
                        © {new Date().getFullYear()} UniChat. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
