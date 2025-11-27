"use client"
//vip-teachers
import { useState } from "react"
import { Star, MessageCircle } from "lucide-react"

export function VIPTeachers() {
    const [selectedTeacher, setSelectedTeacher] = useState(null)

    const teachers = [
        {
            name: "Dr. Elena Martins",
            field: "Artificial Intelligence",
            price: "$19.99/month",
            bio: "Machine learning and data analytics expert with 12+ years of experience.",
            rating: 4.9,
            color: "from-[#F23D7F]",
        },
        {
            name: "Prof. Adam Khaled",
            field: "Medicine",
            price: "$24.99/month",
            bio: "Specialist in physiology and academic research mentoring.",
            rating: 4.8,
            color: "from-[#3D9DF2]",
        },
        {
            name: "Ms. Laura Ben",
            field: "Business & Finance",
            price: "$14.99/month",
            bio: "Helps students master marketing, economics, and business strategy.",
            rating: 4.7,
            color: "from-[#27F293]",
        },
    ]

    return (
        <section id="vip" className="py-20 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-[#3D9DF2]/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-[#F23D7F]/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        VIP{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2]">
                            Teacher Cards
                        </span>
                    </h2>
                    <p className="text-lg text-neutral-600">Learn from industry experts and experienced academics</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {teachers.map((teacher, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedTeacher(selectedTeacher === index ? null : index)}
                            className="group relative cursor-pointer"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F23D7F] via-[#3D9DF2] to-[#27F293] rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-300"></div>

                            <div className="relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
                                {/* Header with gradient dot */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <div
                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${teacher.color} to-white opacity-80 mb-4`}
                                        ></div>
                                        <h3 className="text-xl font-bold text-neutral-900">{teacher.name}</h3>
                                        <p className="text-sm text-[#3D9DF2] font-semibold">{teacher.field}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-neutral-100 px-3 py-1 rounded-full">
                                        <Star size={16} className="fill-[#F23D7F] text-[#F23D7F]" />
                                        <span className="text-sm font-semibold text-neutral-900">{teacher.rating}</span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-neutral-600 text-sm mb-6 leading-relaxed">{teacher.bio}</p>

                                {/* Price */}
                                <div className="mb-6 pb-6 border-b border-neutral-200">
                                    <p className="text-2xl font-bold text-neutral-900">{teacher.price}</p>
                                </div>

                                {/* Button */}
                                <button className="w-full py-3 bg-gradient-to-r from-[#F23D7F] to-[#3D9DF2] text-white rounded-lg font-semibold hover:shadow-lg transform group-hover:scale-105 transition-all flex items-center justify-center gap-2">
                                    <MessageCircle size={18} />
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
