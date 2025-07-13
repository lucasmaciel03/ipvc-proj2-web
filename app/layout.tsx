import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoodDoctor - Sistema de Gestão Médica",
  description:
    "Conectando pacientes e médicos de forma simples e eficiente. Agende consultas, acesse seu histórico médico e gerencie sua saúde em um só lugar.",
  keywords: [
    "saúde",
    "médico",
    "consulta",
    "hospital",
    "clínica",
    "paciente",
    "agendamento",
  ],
  authors: [{ name: "GoodDoctor Team" }],
  creator: "GoodDoctor",
  publisher: "GoodDoctor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gooddoctor.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GoodDoctor - Sistema de Gestão Médica",
    description: "Conectando pacientes e médicos de forma simples e eficiente",
    url: "https://gooddoctor.app",
    siteName: "GoodDoctor",
    images: [
      {
        url: "/assets/logos/web/og-image.png",
        width: 1200,
        height: 630,
        alt: "GoodDoctor - Sistema de Gestão Médica",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodDoctor - Sistema de Gestão Médica",
    description: "Conectando pacientes e médicos de forma simples e eficiente",
    images: ["/assets/logos/web/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/assets/logos/web/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/logos/web/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/logos/ios/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/assets/logos/web/safari-pinned-tab.svg",
        color: "#3b82f6",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GoodDoctor",
  },
  applicationName: "GoodDoctor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
