import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { SupabaseProvider } from "@/components/SupabaseProvider"; // ✅ import provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <SupabaseProvider>
          <div className="flex min-h-screen flex-col sm:flex-row">
            {/* Sidebar */}
            <Sidebar />

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
