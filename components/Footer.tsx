import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const quickLinks = [
    { label: "Ana Sayfa", href: "#" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Hakkımızda", href: "#hakkimizda" },
    { label: "Galeri", href: "#galeri" },
    { label: "İletişim", href: "#iletisim" },
];

const services = [
    "Mermer Mutfak Tezgahı",
    "Mermer Merdiven Basamağı",
    "Cam Altı Denizlik",
    "Granit Uygulamalar",
    "Doğal Taş Kaplama",
];

export default function Footer() {
    // Using static year to avoid hydration mismatch
    const currentYear = 2024;

    return (
        <footer className="bg-[#3d3229] text-white">
            {/* Main Footer */}
            <div className="container-custom section-padding pb-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <a href="#" className="flex items-center gap-3 mb-6">
                            <img
                                src="/logo.png"
                                alt="Özaltunel Mermer Logo"
                                className="w-12 h-12"
                            />
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-white leading-tight tracking-wide">
                                    ÖZALTUNEL
                                </span>
                                <span className="text-xs text-white/60 tracking-widest uppercase">
                                    Mermer
                                </span>
                            </div>
                        </a>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            20 yılı aşkın tecrübemizle Küçükçekmece&apos;de mermer ve doğal taş
                            işçiliğinde güvenilir çözüm ortağınız.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="tel:+905323944257"
                                className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:info@ozaltunelmermer.com"
                                className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com/ozaltunelmermer"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-gold rounded-lg flex items-center justify-center transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Hızlı Bağlantılar</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-gold transition-colors text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Hizmetlerimiz</h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href="#hizmetler"
                                        className="text-white/70 hover:text-gold transition-colors text-sm"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <a
                                        href="tel:+905323944257"
                                        className="text-white hover:text-gold transition-colors"
                                    >
                                        0532 394 42 57
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                <div>
                                    <a
                                        href="mailto:info@ozaltunelmermer.com"
                                        className="text-white hover:text-gold transition-colors text-sm"
                                    >
                                        info@ozaltunelmermer.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                <div className="text-white/70 text-sm">
                                    İnönü Mah. Alageyik Cad.
                                    <br />
                                    Yayla Sk. 3/a, Küçükçekmece
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-6 px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/50 text-sm text-center md:text-left">
                            © {currentYear} Özaltunel Mermer. Tüm hakları saklıdır.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="text-white/50 hover:text-white text-sm transition-colors"
                            >
                                Gizlilik Politikası
                            </a>
                            <a
                                href="#"
                                className="text-white/50 hover:text-white text-sm transition-colors"
                            >
                                Kullanım Şartları
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
