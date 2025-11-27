"use client"
//chat-input.jsx
import { useState, useEffect } from "react"
import { Paperclip, Send, X } from "lucide-react"

export function ChatInput() {
    const [input, setInput] = useState("")
    const [displayedText, setDisplayedText] = useState("")
    const [sentenceIndex, setSentenceIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    const sentences = [
        "Hi,",
        "Goodbye,",
        "How are you?",
        "Welcome to UniChat!",
        "Type your message…",
        "Ask anything, we're here!",
        "Start chatting now…",
        "Say hello to your campus!",
        "Connect with your classmates…",
        "Share your ideas…",
        "Send a message…",
        "Ready to chat?",
    ]

    const currentSentence = sentences[sentenceIndex]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (input.trim() !== "" || !isMounted) return

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
            console.log("Message sent:", input)
            setInput("")
        }
    }

    const handleClear = () => {
        setInput("")
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    if (!isMounted) return null

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3 border border-neutral-200 hover:border-[#3D9DF2] transition-colors">
                {/* Attachment Icon */}
                <button className="text-neutral-400 hover:text-[#3D9DF2] transition-colors flex-shrink-0">
                    <Paperclip size={20} />
                </button>

                {/* Input Field */}
                <div className="flex-1 relative">
                    {input.trim() === "" && (
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

                {/* Clear or Send Button */}
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
