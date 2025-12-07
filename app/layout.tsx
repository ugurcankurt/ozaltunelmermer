import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ozaltunelmermer.com"),
  title: {
    default: "İstanbul Mermer | Mermer Tezgah & Mutfak Tezgahı - Özaltunel Mermer",
    template: "%s | İstanbul Mermer - Özaltunel",
  },
  description:
    "İstanbul mermer ve İstanbul mermer tezgah imalatı. Profesyonel mutfak tezgahı, merdiven basamağı, granit tezgah, cam altı denizlik. 20+ yıl deneyim, ücretsiz keşif. Küçükçekmece mermer ustası.",
  keywords: [
    "İstanbul mermer",
    "İstanbul mermer tezgah",
    "İstanbul mermer mutfak tezgahı",
    "İstanbul granit",
    "mermer tezgah İstanbul",
    "mermer mutfak tezgahı",
    "mermer merdiven basamağı",
    "cam altı denizlik",
    "granit mutfak tezgahı",
    "mermer tezgah fiyatları",
    "Küçükçekmece mermer",
    "mermer ustası İstanbul",
  ],
  authors: [{ name: "Özaltunel Mermer" }],
  creator: "Özaltunel Mermer",
  publisher: "Özaltunel Mermer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://ozaltunelmermer.com",
    siteName: "Özaltunel Mermer",
    title: "Özaltunel Mermer | İstanbul Mermer Mutfak Tezgahı & Merdiven Basamağı",
    description:
      "Küçükçekmece'de profesyonel mermer mutfak tezgahı, mermer merdiven basamağı ve cam altı denizlik imalatı. Ücretsiz keşif için arayın!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Özaltunel Mermer - Kaliteli Mermer İşçiliği",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Özaltunel Mermer | İstanbul Mermer Mutfak Tezgahı",
    description:
      "Küçükçekmece'de profesyonel mermer işçiliği. Mutfak tezgahı, merdiven basamağı, cam altı denizlik.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ozaltunelmermer.com",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

// Schema.org LocalBusiness JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ozaltunelmermer.com",
  name: "Özaltunel Mermer",
  description:
    "Küçükçekmece'de profesyonel mermer mutfak tezgahı, mermer merdiven basamağı ve cam altı denizlik imalatı ve montajı.",
  url: "https://ozaltunelmermer.com",
  telephone: "+90 532 394 42 57",
  email: "info@ozaltunelmermer.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "İnönü Mahallesi Alageyik Caddesi 3, Yayla Sk. 3/a",
    addressLocality: "Küçükçekmece",
    addressRegion: "İstanbul",
    postalCode: "34041",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.0261,
    longitude: 28.7714,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  priceRange: "₺₺",
  image: "https://ozaltunelmermer.com/og-image.jpg",
  sameAs: [],
  areaServed: {
    "@type": "City",
    name: "İstanbul",
  },
  serviceType: [
    "Mermer Mutfak Tezgahı İmalatı",
    "Mermer Merdiven Basamağı",
    "Cam Altı Denizlik",
    "Doğal Taş Kaplama",
  ],
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "İstanbul'da mermer tezgah fiyatları ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "İstanbul mermer tezgah fiyatları malzeme türüne, boyuta ve işçiliğe göre değişir. Ücretsiz keşif için 0532 394 42 57 numarasını arayabilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "İstanbul'da en iyi mermer firması hangisi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Özaltunel Mermer, İstanbul Küçükçekmece'de 20+ yıllık deneyimi ile mermer mutfak tezgahı, merdiven basamağı ve cam altı denizlik hizmetleri sunmaktadır.",
      },
    },
    {
      "@type": "Question",
      name: "İstanbul mermer mutfak tezgahı montajı nasıl yapılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Profesyonel ekibimiz ücretsiz keşif sonrası ölçü alır, atölyemizde özel üretim yapar ve yerinizde montaj gerçekleştirir. Tüm işlemler 10 yıl garantilidir.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
