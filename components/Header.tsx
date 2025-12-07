"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Sparkles } from "lucide-react";

const navLinks = [
    { href: "#hizmetler", label: "Hizmetler" },
    { href: "#hakkimizda", label: "Hakkımızda" },
    { href: "#galeri", label: "Galeri" },
    { href: "/yapay-zeka", label: "AI Görselleştirici" },
    { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-lg"
                : "bg-transparent"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20 px-4 md:px-8">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-3 group">
                        <img
                            src="/logo.png"
                            alt="Özaltunel Mermer Logo"
                            className="w-12 h-12 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-primary leading-tight tracking-wide">
                                ÖZALTUNEL
                            </span>
                            <span className="text-xs text-muted-foreground tracking-widest uppercase">
                                Mermer
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full ${link.href === "/yapay-zeka"
                                    ? "text-purple-600 hover:text-purple-700 font-bold flex items-center gap-1"
                                    : "text-foreground/80 hover:text-gold"
                                    }`}
                            >
                                {link.href === "/yapay-zeka" && <Sparkles className="w-3 h-3" />}
                                {link.label}
                                {link.href === "/yapay-zeka" && (
                                    <span className="absolute -top-3 -right-6 text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse">
                                        YENİ
                                    </span>
                                )}
                            </a>
                        ))}
                    </nav>

                    {/* Phone CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="tel:+905323944257"
                            className="btn-gold flex items-center gap-2 text-sm !py-3 !px-6"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Hemen Ara</span>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-foreground hover:text-gold transition-colors"
                        aria-label="Menü"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                <nav className="flex flex-col p-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="py-3 px-4 text-foreground hover:text-gold hover:bg-secondary/50 rounded-lg transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="tel:+905323944257"
                        className="btn-gold mt-4 flex items-center justify-center gap-2"
                    >
                        <Phone className="w-4 h-4" />
                        <span>Hemen Ara</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
