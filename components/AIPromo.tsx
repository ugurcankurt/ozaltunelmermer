"use client";

import { Sparkles, ArrowRight, Smartphone, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Changed to Link for SPA navigation

export default function AIPromo() {
    return (
        <section className="relative py-20 overflow-hidden bg-secondary/20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 skew-x-12" />

            <div className="container-custom px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8 animate-fade-in-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-medium text-purple-800">Yapay Zeka Destekli Tasarım</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-primary leading-tight">
                            Mutfağınızı Değiştirmeden <br />
                            <span className="text-gradient">Önce Sonucu Görün!</span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Türkiye'de bir ilk! Telefonunuzla mutfağınızın fotoğrafını çekin,
                            taş koleksiyonumuzdan dilediğinizi seçin ve yapay zeka saniyeler içinde
                            tezgahınızı değiştirsin.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                                <div className="p-2 bg-gold/10 rounded-lg">
                                    <Smartphone className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <div className="font-semibold text-primary">Mobil Uyumlu</div>
                                    <div className="text-xs text-muted-foreground">Telefondan Yükle</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-border/50">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Zap className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-primary">Anında Sonuç</div>
                                    <div className="text-xs text-muted-foreground">Saniyeler İçinde</div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/yapay-zeka"
                            className="inline-flex items-center gap-3 btn-gold text-lg px-8 py-4 !rounded-2xl shadow-xl shadow-gold/20 hover:shadow-gold/30 transform hover:-translate-y-1 transition-all"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Hemen Tasarlamaya Başla</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Right: Visual */}
                    <div className="relative lg:ml-auto animate-fade-in-right mt-8 lg:mt-0">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                            <Image
                                src="/images/hero.png"
                                alt="AI Mutfak Tasarımı"
                                width={600}
                                height={400}
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay UI Mockup */}
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-lg transform scale-110">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-semibold text-primary">AI İşleniyor...</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background blob */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-50 -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold/30 rounded-full blur-3xl opacity-50 -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
