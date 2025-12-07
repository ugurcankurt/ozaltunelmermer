"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon, Sparkles, AlertCircle, Info, Download, RefreshCw, ArrowRight, Camera } from "lucide-react";

// Belenco taş koleksiyonları - gerçek görsellerle
const stoneCollections = [
    {
        id: "pure",
        name: "Belenco Pure",
        folder: "Belenco-Pure",
        stones: [
            { id: "iceberg", name: "Iceberg", image: "1110_iceberg_c5769.jpg" },
            { id: "perla", name: "Perla", image: "1123_perla_185bf.jpg" },
            { id: "teos", name: "Teos", image: "2214_teos_63f7a.jpg" },
            { id: "daphne-crack", name: "Daphne Crack", image: "3113_daphne_crack_cd949.jpg" },
            { id: "kashmera-white", name: "Kashmera White", image: "4123_kashmera_white_44c18.jpg" },
            { id: "laluna", name: "LaLuna", image: "4524_laluna_97f40.jpg" },
            { id: "carola", name: "Carola", image: "5114_carola_bf850.jpg" },
            { id: "pandora", name: "Pandora", image: "pandorarender_ba2e4.jpg" },
            { id: "patara", name: "Patara", image: "patararender_1fb96.jpg" },
            { id: "pixie-wings", name: "Pixie Wings", image: "pixiewingsplaka_9d21a.jpg" },
            { id: "premium-white", name: "Premium White", image: "premiumwhite_38510.jpg" },
        ]
    },
    {
        id: "classic",
        name: "Belenco Classic",
        folder: "Belenco-Classic",
        stones: [
            { id: "boletus", name: "Boletus", image: "3333_boletus_1b2d0.jpg" },
            { id: "olympos", name: "Olympos", image: "3618_olympos_6332c.jpg" },
            { id: "rapture", name: "Rapture", image: "4217_rapture_2f2d5.jpeg" },
            { id: "fairy-white", name: "Fairy White", image: "4227_fairy_white_0b87e.jpg" },
            { id: "sahara-beige", name: "Sahara Beige", image: "4444_sahara_beige_40a57.jpg" },
            { id: "chakra-beige", name: "Chakra Beige", image: "4458_chakra_beige_c1427.jpg" },
            { id: "mocca-mousse", name: "Mocca Mousse", image: "5329_mocca_mousse_82144.jpg" },
            { id: "anemon", name: "Anemon", image: "8113_anemon_e3d61.jpg" },
            { id: "alinda", name: "Alinda", image: "9113_alinda_2415b.jpg" },
            { id: "polaris", name: "Polaris", image: "polaris_ff9a5.jpg" },
        ]
    },
    {
        id: "loft",
        name: "Belenco Loft",
        folder: "Belenco-Loft",
        stones: [
            { id: "aizano", name: "Aizano", image: "4043_aizano_196a3.jpg" },
            { id: "babilon", name: "Babilon", image: "4558_babilon_8ab99.jpg" },
            { id: "forza-fume", name: "Forza Fume", image: "5050_forza_fume_1c3bf.jpg" },
            { id: "metropol-grey", name: "Metropol Grey", image: "7537_metropol_grey_df033.jpg" },
            { id: "montana", name: "Montana", image: "7543_montana_faf79.jpg" },
            { id: "spa-black", name: "Spa Black", image: "8727_spa_black_6e809.jpg" },
            { id: "ashen", name: "Ashen", image: "ashenplaka_4ea2b.jpg" },
        ]
    },
    {
        id: "prestige",
        name: "Belenco Prestige",
        folder: "Belenco-Prestige",
        stones: [
            { id: "statuario-volga", name: "Statuario Volga", image: "4242statuariovolgarender_345cc.jpg" },
            { id: "pantheon", name: "Pantheon", image: "7220_pantheon_fbf13.jpg" },
            { id: "statuario-venetian", name: "Statuario Venetian", image: "8210statuariovenetianrender_c0d3b.jpg" },
            { id: "marquina-tierra", name: "Marquina Tierra", image: "9219_marquina_tierra_bea66.jpg" },
            { id: "alluring", name: "Alluring", image: "alluringplaka_06bcf.jpg" },
            { id: "aurica", name: "Aurica", image: "auricamain_23897.jpg" },
            { id: "calacatta-garda", name: "Calacatta Garda", image: "calacattagarda_bbe68.jpg" },
            { id: "calacatta-paletino", name: "Calacatta Paletino", image: "calacattapaletino_67b70.jpg" },
            { id: "calacatta-sky", name: "Calacatta Sky", image: "calacattaskyplaka_6503d.jpg" },
            { id: "calacatta-valencia", name: "Calacatta Valencia", image: "calacattavalenciarender_69669.jpg" },
            { id: "stardust", name: "Stardust", image: "stardustplaka_fa9ea.jpg" },
        ]
    },
];

export default function AIVisualizer() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedStone, setSelectedStone] = useState<string | null>(null);
    const [selectedStoneName, setSelectedStoneName] = useState<string>("");
    const [selectedStoneImage, setSelectedStoneImage] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [aiDescription, setAiDescription] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [activeCollection, setActiveCollection] = useState("pure");
    const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Modal state
    const [remainingCredits, setRemainingCredits] = useState<number | null>(null); // Daily usage limit (null until loaded)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null); // Ref for camera input

    const DAILY_LIMIT = 5;

    // Load credits from local storage on mount
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storageKey = `ai_credits_${today}`;
        const stored = localStorage.getItem(storageKey);

        if (stored) {
            setRemainingCredits(parseInt(stored));
        } else {
            // New day or first visit
            setRemainingCredits(DAILY_LIMIT);
            localStorage.setItem(storageKey, DAILY_LIMIT.toString());
        }
    }, []);

    // Helper to decrement credits
    const decrementCredits = () => {
        if (remainingCredits === null) return;
        const newValue = Math.max(0, remainingCredits - 1);
        setRemainingCredits(newValue);
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem(`ai_credits_${today}`, newValue.toString());
    };

    // Handles both gallery uploads and camera captures. 
    // Automatically sets the image state upon selection/capture, so no extra "Upload" button is needed.
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError("Dosya boyutu çok büyük (Max 10MB)");
                return;
            }

            // HEIC/HEIF Conversion
            if (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
                setIsProcessing(true); // Show loading state
                setAiDescription("HEIC dosyası dönüştürülüyor... Lütfen bekleyin.");

                try {
                    // Dynamic import to avoid SSR issues
                    const heic2any = (await import('heic2any')).default;

                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: "image/jpeg",
                        quality: 0.8
                    });

                    // Handle if result is array or single blob
                    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

                    // Convert converted blob to base64
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        setUploadedImage(event.target?.result as string);
                        setResultImage(null);
                        setAiDescription("");
                        setError("");
                        setIsProcessing(false);
                    };
                    reader.readAsDataURL(blob);
                } catch (err) {
                    console.error("HEIC conversion error:", err);
                    setError("HEIC dosyası dönüştürülemedi. Lütfen JPG/PNG deneyin.");
                    setIsProcessing(false);
                    setAiDescription("");
                }
                return;
            }

            // Standard Image Handling (JPG, PNG, WEBP)
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target?.result as string);
                setResultImage(null);
                setAiDescription("");
                setError("");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStoneSelect = (stoneId: string, stoneName: string, stoneImage: string, folder: string) => {
        setSelectedStone(stoneId);
        setSelectedStoneName(stoneName);
        setSelectedStoneImage(`/stones/${folder}/${stoneImage}`);
        setAiDescription("");
        setError("");
    };

    // Helper to resize/compress image before sending to API
    // Vercel Serverless Functions have a 4.5MB body limit
    const resizeImage = (base64Str: string, maxWidth = 1024): Promise<string> => {
        return new Promise((resolve) => {
            const img = document.createElement('img');
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                // Compress to JPEG with 0.8 quality
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
        });
    };

    const resultRef = useRef<HTMLDivElement>(null); // Ref for scrolling to result

    const handleProcess = async () => {
        if (!uploadedImage || !selectedStone) return;

        // Credit Check
        if (remainingCredits !== null && remainingCredits <= 0) {
            setError("Günlük işlem limitiniz (5) dolmuştur. Lütfen yarın tekrar deneyiniz.");
            return;
        }

        setIsProcessing(true);
        setError("");
        setAiDescription("");

        try {
            // Resize image to avoid Vercel 4.5MB limit (413 Error)
            const compressedImage = await resizeImage(uploadedImage);

            // Convert selected stone image path to base64
            let stoneImageBase64 = null;
            if (selectedStoneImage) {
                try {
                    const stoneResponse = await fetch(selectedStoneImage);
                    const stoneBlob = await stoneResponse.blob();
                    stoneImageBase64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(stoneBlob);
                    });
                } catch (e) {
                    console.error("Error converting stone image to base64:", e);
                }
            }

            const response = await fetch("/api/visualize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imageBase64: compressedImage, // Send compressed image
                    stoneName: selectedStoneName,
                    stoneImageBase64: stoneImageBase64
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "İşlem sırasında hata oluştu");
            }

            // Success - Decrement credits
            decrementCredits();

            if (data.generatedImage) {
                setResultImage(data.generatedImage);
                // Scroll to result on mobile
                setTimeout(() => {
                    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
            } else {
                setResultImage(uploadedImage); // Fallback to original if no new image
            }

            setAiDescription(data.description || "");

        } catch (err) {
            setError(err instanceof Error ? err.message : "Bir hata oluştu");
        } finally {
            setIsProcessing(false);
        }
    };

    // Reset inputs but keep credits
    const handleReset = () => {
        setUploadedImage(null);
        setSelectedStone(null);
        setSelectedStoneName("");
        setSelectedStoneImage("");
        setResultImage(null);
        setAiDescription("");
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const currentCollection = stoneCollections.find(c => c.id === activeCollection);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-primary text-white py-16 px-4">
                <div className="container-custom text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
                        <Sparkles className="w-5 h-5 text-gold" />
                        <span className="text-sm font-medium">Yapay Zeka ile Görselleştirme</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        AI Mutfak Görselleştirici
                    </h1>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Mutfağınızın fotoğrafını yükleyin, istediğiniz taşı seçin ve
                        yapay zeka ile tezgahınızın nasıl görüneceğini anında görün.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-custom py-12 px-4">
                {/* API Info */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-green-800 font-medium">AI Görselleştirici Aktif</p>
                            <p className="text-green-700 text-sm">
                                Gemini AI entegrasyonu hazır.
                            </p>
                        </div>
                    </div>

                    {/* Credit Counter */}
                    <div className={`flex-1 rounded-xl p-4 flex items-center gap-3 border ${(remainingCredits ?? 5) > 0
                            ? "bg-blue-50 border-blue-200"
                            : "bg-red-50 border-red-200"
                        }`}>
                        <div className={`p-2 rounded-full ${(remainingCredits ?? 5) > 0 ? "bg-blue-100" : "bg-red-100"
                            }`}>
                            <Info className={`w-5 h-5 ${(remainingCredits ?? 5) > 0 ? "text-blue-600" : "text-red-600"
                                }`} />
                        </div>
                        <div>
                            <p className={`font-medium ${(remainingCredits ?? 5) > 0 ? "text-blue-800" : "text-red-800"
                                }`}>
                                Kalan Hakkınız: <span className="font-bold">{remainingCredits ?? "..."}</span> / {DAILY_LIMIT}
                            </p>
                            <p className={`text-sm ${(remainingCredits ?? 5) > 0 ? "text-blue-700" : "text-red-700"
                                }`}>
                                {(remainingCredits ?? 5) > 0
                                    ? "Bugün kullanabileceğiniz işlem sayısı."
                                    : "Günlük limitiniz doldu. Yarın tekrar bekleriz!"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Panel - Upload & Preview */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
                            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-gold font-bold">1</span>
                                Mutfak Fotoğrafı Yükleyin
                            </h2>
                            {/* Upload Area */}
                            {!uploadedImage ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {/* Gallery Upload Option */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="bg-secondary/30 border-2 border-dashed border-border hover:border-gold hover:bg-gold/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-gold" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 text-foreground">Fotoğraf Yükle</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                            Galerinizden mutfak fotoğrafı seçin
                                            <br />
                                            <span className="text-xs opacity-70">(JPG, PNG, WEBP, HEIC)</span>
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                                            onChange={handleImageUpload}
                                        />
                                    </div>

                                    {/* Camera Capture Option */}
                                    <div
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="bg-secondary/30 border-2 border-dashed border-border hover:border-gold hover:bg-gold/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                            <Camera className="w-8 h-8 text-gold" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 text-foreground">Fotoğraf Çek</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                            Kameranızı kullanarak yeni fotoğraf çekin
                                            <br />
                                            <span className="text-xs opacity-70">(Mobil cihazlar için)</span>
                                        </p>
                                        <input
                                            ref={cameraInputRef}
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border mb-8 group">
                                    <div className="aspect-video relative bg-black/5">
                                        <Image
                                            src={uploadedImage}
                                            alt="Yüklenen Mutfak"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => setUploadedImage(null)}
                                            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Görseli Kaldır
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Stone Preview */}
                        {selectedStoneImage && (
                            <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
                                <h2 className="text-xl font-bold text-primary mb-4">
                                    Seçilen Taş: {selectedStoneName}
                                </h2>
                                <div className="aspect-video relative rounded-xl overflow-hidden bg-secondary">
                                    <Image
                                        src={selectedStoneImage}
                                        alt={selectedStoneName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Result Preview */}
                        {resultImage && (
                            <div
                                ref={resultRef}
                                className="bg-white rounded-2xl shadow-lg border border-border p-6 scroll-mt-24"
                            >
                                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-gold" />
                                    AI Analizi - {selectedStoneName}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Mutfağınız</p>
                                        <div className="aspect-video relative rounded-xl overflow-hidden bg-secondary">
                                            <Image
                                                src={uploadedImage || ""}
                                                alt="Mutfak"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">AI Tarafından Oluşturulan</p>
                                        <div
                                            className="aspect-video relative rounded-xl overflow-hidden bg-secondary cursor-pointer group"
                                            onClick={() => setIsLightboxOpen(true)}
                                        >
                                            <Image
                                                src={resultImage}
                                                alt={`AI tasarımı - ${selectedStoneName}`}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Watermark */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
                                                <p className="text-white text-xl font-bold rotate-[-15deg] drop-shadow-lg whitespace-nowrap">
                                                    ÖZALTUNEL MERMER
                                                </p>
                                            </div>
                                            <div
                                                className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/70"
                                            >
                                                <Download className="w-4 h-4" />
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                                <span className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                                                    <Sparkles className="w-3 h-3" />
                                                    Büyütmek için tıkla
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 mt-4">
                                            <button
                                                onClick={async () => {
                                                    if (!resultImage) return;

                                                    try {
                                                        // Load AI result image
                                                        const resultImg = document.createElement('img');
                                                        resultImg.crossOrigin = "anonymous";
                                                        resultImg.src = resultImage;
                                                        await new Promise((resolve, reject) => {
                                                            resultImg.onload = resolve;
                                                            resultImg.onerror = reject;
                                                        });

                                                        // Create canvas with AI RESULT image dimensions
                                                        // This preserves the exact output from AI without stretching/distortion
                                                        const canvas = document.createElement('canvas');
                                                        canvas.width = resultImg.naturalWidth;
                                                        canvas.height = resultImg.naturalHeight;

                                                        const ctx = canvas.getContext('2d');
                                                        if (!ctx) return;

                                                        // Draw AI image 1:1
                                                        ctx.drawImage(resultImg, 0, 0);

                                                        // Draw Watermark
                                                        // Calculate font size relative to image width (5% of width)
                                                        const fontSize = Math.max(24, Math.floor(canvas.width * 0.05));
                                                        ctx.font = `bold ${fontSize}px Arial`;
                                                        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
                                                        ctx.textAlign = "center";
                                                        ctx.textBaseline = "middle";

                                                        // Rotate context for diagonal watermark
                                                        ctx.save();
                                                        ctx.translate(canvas.width / 2, canvas.height / 2);
                                                        ctx.rotate(-15 * Math.PI / 180);

                                                        // Add drop shadow for better visibility
                                                        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
                                                        ctx.shadowBlur = 4;
                                                        ctx.shadowOffsetX = 2;
                                                        ctx.shadowOffsetY = 2;

                                                        ctx.fillText("ÖZALTUNEL MERMER", 0, 0);
                                                        ctx.restore();

                                                        // Trigger download
                                                        const link = document.createElement('a');
                                                        link.download = `ozaltunel-ai-${selectedStoneName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
                                                        link.href = canvas.toDataURL('image/jpeg', 0.95);
                                                        link.click();
                                                    } catch (e) {
                                                        console.error("Download failed:", e);
                                                        alert("Görsel indirilirken bir hata oluştu.");
                                                    }
                                                }}
                                                className="flex-1 bg-gold hover:bg-gold/90 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Download className="w-4 h-4" />
                                                Görseli İndir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {aiDescription && !aiDescription.startsWith("Debug") && (
                                    <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 mt-4">
                                        <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-gold" />
                                            AI Önerisi
                                        </h3>
                                        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                                            {aiDescription}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Lightbox Modal */}
                        {isLightboxOpen && resultImage && (
                            <div
                                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                                onClick={() => setIsLightboxOpen(false)}
                            >
                                <div className="absolute top-4 right-4 z-50 flex gap-4">
                                    <button
                                        className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Trigger download logic using the hidden canvas button logic
                                            const mainDownloadBtn = document.querySelector('button[class*="bg-gold"]') as HTMLButtonElement | null;
                                            if (mainDownloadBtn) mainDownloadBtn.click();
                                        }}
                                    >
                                        <Download className="w-6 h-6" />
                                    </button>
                                    <button
                                        className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md"
                                        onClick={() => setIsLightboxOpen(false)}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div
                                    className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={resultImage}
                                        alt="AI Result Fullscreen"
                                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                    />
                                    {/* Watermark overlay in lightbox */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 select-none">
                                        <p className="text-white text-[5vw] font-bold rotate-[-15deg] drop-shadow-2xl whitespace-nowrap">
                                            ÖZALTUNEL MERMER
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-red-800 font-medium">Hata</p>
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Stone Selection */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-border p-6">
                            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center text-gold font-bold">2</span>
                                Taş Seçin
                            </h2>

                            {/* Collection Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {stoneCollections.map((collection) => (
                                    <button
                                        key={collection.id}
                                        onClick={() => setActiveCollection(collection.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCollection === collection.id
                                            ? "bg-gold text-white"
                                            : "bg-secondary text-foreground hover:bg-secondary/80"
                                            }`}
                                    >
                                        {collection.name}
                                    </button>
                                ))}
                            </div>

                            {/* Stone Grid with Real Images */}
                            <div className="grid grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
                                {currentCollection?.stones.map((stone) => (
                                    <button
                                        key={stone.id}
                                        onClick={() => handleStoneSelect(stone.id, stone.name, stone.image, currentCollection.folder)}
                                        className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedStone === stone.id
                                            ? "border-gold ring-2 ring-gold/30"
                                            : "border-border hover:border-gold/50"
                                            }`}
                                    >
                                        <Image
                                            src={`/stones/${currentCollection.folder}/${stone.image}`}
                                            alt={stone.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 33vw, 150px"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <span className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white truncate">
                                            {stone.name}
                                        </span>
                                        {selectedStone === stone.id && (
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleProcess}
                            disabled={!uploadedImage || !selectedStone || isProcessing}
                            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${uploadedImage && selectedStone && !isProcessing
                                ? "bg-gold hover:bg-gold/90 text-white shadow-lg hover:shadow-xl"
                                : "bg-secondary text-muted-foreground cursor-not-allowed"
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    İşleniyor...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Görselleştir
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Info */}
                        <div className="bg-secondary/50 rounded-xl p-4">
                            <h3 className="font-semibold text-primary mb-2">Nasıl Çalışır?</h3>
                            <ol className="text-sm text-muted-foreground space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">1</span>
                                    Mutfağınızın fotoğrafını yükleyin
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">2</span>
                                    Beğendiğiniz taş modelini seçin
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-5 h-5 bg-gold/10 rounded-full flex items-center justify-center text-xs font-bold text-gold flex-shrink-0">3</span>
                                    AI tezgahınıza seçtiğiniz taşı uygulasın
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
