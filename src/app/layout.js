import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "开发工具集",
  description: "现代化开发工具集",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="mt-4 flex justify-center items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">🚀</span>
                  <span className="text-xs text-gray-400">© 2025</span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">开源项目</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">MIT License</span>
                <span className="text-xs text-gray-400">•</span>
                <a
                  href="https://github.com/jinzhepro/dev-tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center space-x-1"
                >
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
