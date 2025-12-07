import { Award, Users, Clock, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Award,
        title: "Kalite Garantisi",
        description: "En kaliteli doğal taşlar ve profesyonel işçilik",
    },
    {
        icon: Users,
        title: "Uzman Ekip",
        description: "Alanında uzman ve deneyimli mermer ustaları",
    },
    {
        icon: Clock,
        title: "Zamanında Teslimat",
        description: "Projeleriniz söz verilen sürede tamamlanır",
    },
    {
        icon: ShieldCheck,
        title: "10 Yıl Garanti",
        description: "Tüm işlerimizde 10 yıla kadar garanti",
    },
];

export default function About() {
    return (
        <section id="hakkimizda" className="section-padding">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                            Hakkımızda
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mt-3 mb-6">
                            İstanbul&apos;da 20+ Yıllık
                            <span className="text-gradient"> Mermer Deneyimi</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            <strong className="text-foreground">Özaltunel Mermer</strong> olarak İstanbul mermer
                            sektöründe 1998 yılından bu yana Küçükçekmece&apos;de mermer, granit ve doğal taş işçiliğinde hizmet vermekteyiz.
                        </p>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            İstanbul mermer tezgah, merdiven basamağından cam altı denizliğe
                            kadar geniş ürün yelpazemizle müşterilerimizin ihtiyaçlarına en uygun çözümleri
                            sunuyoruz. Modern makinelerimiz ve uzman ekibimizle kaliteden ödün vermeden
                            uygun fiyatlı hizmet anlayışımızla sektörde öncü olmaya devam ediyoruz.
                        </p>

                        {/* CTA */}
                        <a href="#iletisim" className="btn-gold">
                            Bizimle İletişime Geçin
                        </a>
                    </div>

                    {/* Right Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors group"
                            >
                                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-gold" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
