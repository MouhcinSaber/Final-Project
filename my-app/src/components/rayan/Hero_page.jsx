import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
import { VIPTeachers } from "./vip-teachers";
import { WhyUniChat } from "./why-unichat";


export default function Heropage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <WhyUniChat />
            <VIPTeachers />
            <Footer />
        </main>
    )
}
