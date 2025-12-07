"use client";

import { useState } from "react";
import Image from "next/image";

const galleryItems = [
    {
        id: 1,
        title: "Modern Mutfak Tezgahı",
        category: "Mutfak Tezgahı",
        description: "Beyaz mermer mutfak tezgahı uygulaması",
        image: "/images/countertop.png",
    },
    {
        id: 2,
        title: "Villa Merdiveni",
        category: "Merdiven Basamağı",
        description: "Lüks villa için özel merdiven basamakları",
        image: "/images/stairs.png",
    },
    {
        id: 3,
        title: "Cam Altı Denizlik",
        category: "Denizlik",
        description: "Dayanıklı ve estetik pencere denizliği",
        image: "/images/window-sill.png",
    },
    {
        id: 4,
        title: "Granit Tezgah",
        category: "Mutfak Tezgahı",
        description: "Siyah granit mutfak tezgahı",
        image: "/images/granite.png",
    },
    {
        id: 5,
        title: "Apartman Merdiveni",
        category: "Merdiven Basamağı",
        description: "Apartman iç mekan merdiven uygulaması",
        image: "/images/apartment-stairs.png",
    },
    {
        id: 6,
        title: "Ada Mutfak",
        category: "Mutfak Tezgahı",
        description: "Ada tipi mutfak tezgahı tasarımı",
        image: "/images/island.png",
    },
    {
        id: 7,
        title: "Beyaz Mermer Denizlik",
        category: "Denizlik",
        description: "Modern beyaz mermer pencere denizliği",
        image: "/images/window-sill-2.png",
    },
    {
        id: 8,
        title: "Marmara Muğla Denizlik",
        category: "Denizlik",
        description: "Marmara Muğla mermeri pencere denizliği",
        image: "/images/window-sill-3.png",
    },
    {
        id: 9,
        title: "Belenco Tezgah",
        category: "Mutfak Tezgahı",
        description: "Belenco Angel White kuvars tezgah",
        image: "/images/belenco.png",
    },
    {
        id: 10,
        title: "Çimstone Tezgah",
        category: "Mutfak Tezgahı",
        description: "Çimstone Arcadia beyaz kuvars tezgah",
        image: "/images/cimstone.png",
    },
    {
        id: 11,
        title: "Quartz Tezgah",
        category: "Mutfak Tezgahı",
        description: "Damarlı beyaz quartz mutfak tezgahı",
        image: "/images/quartz.png",
    },
    {
        id: 12,
        title: "Gri Granit Merdiven",
        category: "Merdiven Basamağı",
        description: "Apartman giriş merdiveni granit uygulama",
        image: "/images/granite-stairs-1.png",
    },
    {
        id: 13,
        title: "Siyah Granit Merdiven",
        category: "Merdiven Basamağı",
        description: "Modern bina granit merdiven basamakları",
        image: "/images/granite-stairs-2.png",
    },
];

const categories = ["Tümü", "Mutfak Tezgahı", "Merdiven Basamağı", "Denizlik"];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("Tümü");

    const filteredItems =
        activeCategory === "Tümü"
            ? galleryItems
            : galleryItems.filter((item) => item.category === activeCategory);

    return (
        <section id="galeri" className="section-padding bg-secondary/30">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                        Galeri
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mt-3 mb-6">
                        İstanbul Mermer Projelerimiz
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        İstanbul mermer tezgah ve doğal taş projelerimizden örnekleri inceleyerek kalitemizi görün.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                                ? "bg-gold text-white shadow-lg"
                                : "bg-white text-foreground hover:bg-gold/10 border border-border"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-lg"
                        >
                            {/* Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-gold text-sm font-medium mb-1">
                                    {item.category}
                                </span>
                                <h3 className="text-white text-xl font-bold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-white/80 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Daha fazla proje görmek veya ücretsiz keşif için
                    </p>
                    <a href="#iletisim" className="btn-secondary">
                        Bize Ulaşın
                    </a>
                </div>
            </div>
        </section >
    );
}

