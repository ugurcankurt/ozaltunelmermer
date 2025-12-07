import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
    {
        icon: Phone,
        title: "Telefon",
        value: "0532 394 42 57",
        href: "tel:+905323944257",
    },
    {
        icon: Mail,
        title: "E-posta",
        value: "info@ozaltunelmermer.com",
        href: "mailto:info@ozaltunelmermer.com",
    },
    {
        icon: MapPin,
        title: "Adres",
        value: "İnönü Mah. Alageyik Cad. Yayla Sk. 3/a, Küçükçekmece/İstanbul",
        href: "https://maps.google.com/?cid=660719068979917614",
    },
    {
        icon: Clock,
        title: "Çalışma Saatleri",
        value: "Pzt-Cmt: 08:00 - 18:00",
        href: null,
    },
];

export default function Contact() {
    return (
        <section id="iletisim" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                        İletişim
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mt-3 mb-6">
                        Bize Ulaşın
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Projeniz için ücretsiz keşif ve fiyat teklifi almak için hemen iletişime geçin.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <div className="order-2 lg:order-1">
                        <h3 className="text-2xl font-bold text-primary mb-8">
                            İletişim Bilgileri
                        </h3>
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                                        <item.icon className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-muted-foreground mb-1">
                                            {item.title}
                                        </h4>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="text-lg font-semibold text-primary hover:text-gold transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <span className="text-lg font-semibold text-primary">
                                                {item.value}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <a
                            href="tel:+905323944257"
                            className="btn-gold mt-8 inline-flex"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Hemen Ara
                        </a>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="order-1 lg:order-2">
                        <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 h-80 lg:h-full min-h-[320px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.234!2d28.7714!3d41.0261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa5500ac5054f%3A0x92c25cab153c12e!2s%C3%96z%20Altunel%20Granite!5e0!3m2!1str!2str!4v1701900000000!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Öz Altunel Granite Konum"
                                className="w-full h-full"
                            />
                        </div>
                        <a
                            href="https://maps.google.com/?cid=660719068979917614"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-gold hover:underline text-sm"
                        >
                            <MapPin className="w-4 h-4" />
                            Google Maps&apos;te Yol Tarifi Al
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
