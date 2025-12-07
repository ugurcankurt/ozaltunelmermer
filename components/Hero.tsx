import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero.png"
                    alt="Lüks mermer mutfak tezgahı"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-gold/10 to-transparent rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative z-10 container-custom px-4 md:px-8 text-center">
                <div className="max-w-4xl mx-auto animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full mb-8">
                        <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gold">
                            İstanbul&apos;un #1 Mermer Firması
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
                        İstanbul Mermer Tezgah
                        <span className="block text-gradient">Profesyonel Mermer İşçiliği</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        İstanbul mermer mutfak tezgahı, merdiven basamağı ve cam altı denizlik imalatında
                        <strong className="text-foreground"> uzman ekibimizle</strong> hayallerinizdeki mekanları gerçeğe dönüştürüyoruz.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#iletisim" className="btn-gold text-lg">
                            Ücretsiz Keşif İsteyin
                        </a>
                        <a href="#hizmetler" className="btn-secondary text-lg">
                            Hizmetlerimizi İnceleyin
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-16 pb-20 border-t border-border/50">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">20+</div>
                            <div className="text-sm text-muted-foreground">Yıllık Deneyim</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-muted-foreground">Müşteri Memnuniyeti</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <a
                href="#hizmetler"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-gold transition-colors group z-20"
            >
                <span className="text-sm font-medium">Keşfedin</span>
                <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-gold" />
            </a>
        </section>
    );
}
