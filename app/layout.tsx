import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="min-h-screen flex flex-col sm:flex-row">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 sm:p-6">{children}</main>
          </div>
        </div>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
