import React from "react";

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
