import { Utensils, Footprints, Square } from "lucide-react";

const services = [
    {
        icon: Utensils,
        title: "Mermer Mutfak Tezgahı",
        description:
            "Mutfağınıza şıklık ve dayanıklılık katın. Doğal mermer ve granit tezgahlarımız ile mutfağınızı yeniden tasarlayın.",
        features: [
            "Özel ölçü üretim",
            "Profesyonel montaj",
            "10 yıl garanti",
            "Geniş renk seçeneği",
        ],
    },
    {
        icon: Footprints,
        title: "Mermer Merdiven Basamağı",
        description:
            "Evinize ve iş yerinize prestij katın. İç ve dış mekan için dayanıklı ve estetik merdiven basamakları.",
        features: [
            "Kaymaz yüzey",
            "İç ve dış mekan",
            "Uzun ömürlü",
            "Kolay temizlik",
        ],
    },
    {
        icon: Square,
        title: "Cam Altı Denizlik",
        description:
            "Pencere ve kapı altı denizlikleriniz için şık ve dayanıklı çözümler. Su ve nem geçirmez.",
        features: [
            "Su yalıtımlı",
            "UV dayanıklı",
            "Kolay bakım",
            "Estetik görünüm",
        ],
    },
];

export default function Services() {
    return (
        <section id="hizmetler" className="section-padding bg-secondary/30">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                        Hizmetlerimiz
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mt-3 mb-6">
                        İstanbul Mermer Hizmetleri
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        İstanbul&apos;un her köşesine İstanbul mermer tezgah ve doğal taş hizmeti veren
                        uzman ekibimizle, projelerinizi en kaliteli malzemeler ve işçilikle hayata geçiriyoruz.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <service.icon className="w-8 h-8 text-gold" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-primary mb-4">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2">
                                {service.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-center gap-2 text-sm text-foreground/80"
                                    >
                                        <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Link */}
                            <a
                                href="#iletisim"
                                className="inline-flex items-center gap-2 mt-6 text-gold font-semibold hover:gap-3 transition-all"
                            >
                                Teklif Alın
                                <span>→</span>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-muted-foreground mb-6">
                        Projeniz için özel fiyat teklifi almak ister misiniz?
                    </p>
                    <a href="tel:+905323944257" className="btn-primary">
                        Hemen Arayın: 0532 394 42 57
                    </a>
                </div>
            </div>
        </section>
    );
}
