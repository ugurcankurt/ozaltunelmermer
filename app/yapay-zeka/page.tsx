import AIVisualizer from "@/components/AIVisualizer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function YapayZekaPage() {
    return (
        <>
            {/* Back to Home Link */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Ana Sayfaya Dön
                </Link>
            </div>

            <AIVisualizer />
        </>
    );
}
