import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATVDEV — We Turn Ideas Into Websites",
  description:
    "ATVDEV is a web development studio creating thoughtful, modern websites for brands, businesses and ideas.",
  metadataBase: new URL("https://atvdev.com"),
  keywords: [
    "Web Development Studio",
    "Creative Web Studio",
    "Digital Studio Portfolio",
    "Bespoke Website Development",
    "Next.js Developer Studio",
    "ATVDEV"
  ],
  authors: [{ name: "ATVDEV Studio" }],
  openGraph: {
    title: "ATVDEV — We Turn Ideas Into Websites",
    description:
      "ATVDEV is a web development studio creating thoughtful, modern websites for brands, businesses and ideas.",
    url: "https://atvdev.com",
    siteName: "ATVDEV Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATVDEV — We Turn Ideas Into Websites",
    description:
      "ATVDEV is a web development studio creating thoughtful, modern websites for brands, businesses and ideas.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F3EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F3EE] text-[#111111] font-sans relative selection:bg-[#111111] selection:text-[#F5F3EE]">
        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Global Studio Navigation */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 w-full">{children}</main>

        {/* Global Studio Footer */}
        <Footer />
      </body>
    </html>
  );
}
