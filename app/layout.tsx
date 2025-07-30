import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { SupabaseProvider } from "@/components/SupabaseProvider"; // ✅ import provider
import PostHogWrapper from "@/components/PostHogWrapper";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fasdeem AI - AI Tool for eCommerce Sellers",
  description: "Generate high-converting product descriptions instantly with Fasdeem AI.",
  keywords: "AI, Ecommerce, Product Descriptions, Fasdeem AI",
  openGraph: {
    title: "Fasdeem AI - AI Tool for eCommerce",
    description: "Generate optimized product content for your ecommerce store in seconds.",
    url: "https://fasdeem-ai.vercel.app",
    siteName: "Fasdeem AI",
    images: [
      {
        url: "/og-image.webp", // Place this in public/ folder
        width: 1200,
        height: 630,
        alt: "Fasdeem AI Preview",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // favicon path from public/
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <PostHogWrapper /> {/* ✅ PostHog wrapper for analytics */}

        <SupabaseProvider>
          <div className="flex min-h-screen flex-col sm:flex-row">
            {/* Sidebar */}
            {/* <Sidebar /> */}

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
              <Navbar />
              <main className="">{children}</main>
              <Footer />
            </div>
          </div>

          <Toaster position="top-right" />
        </SupabaseProvider>
      </body>
    </html>
  );
}
