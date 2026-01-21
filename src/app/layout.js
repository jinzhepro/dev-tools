import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Github, Heart, Zap } from "lucide-react";
import Link from "next/link";

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
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        
        {/* 改进的页脚 */}
        <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border/50 mt-20 relative overflow-hidden">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* 品牌信息 */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg">开发工具集</span>
                </div>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
                  现代化开发工具集，让开发更高效
                </p>
              </div>
              
              {/* 链接 */}
              <div className="text-center">
                <h4 className="font-semibold mb-4">快速链接</h4>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    首页
                  </Link>
                  <a
                    href="https://github.com/jinzhepro/dev-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
              
              {/* 技术栈 */}
              <div className="text-center md:text-right">
                <h4 className="font-semibold mb-4">技术栈</h4>
                <div className="flex flex-wrap justify-center md:justify-end gap-2">
                  <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">Next.js 16</span>
                  <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">React 19</span>
                  <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">Tailwind 4</span>
                  <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">shadcn/ui</span>
                </div>
              </div>
            </div>
            
            {/* 版权信息 */}
            <div className="border-t border-border/50 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>© 2025 开发工具集</span>
                  <span className="text-border">•</span>
                  <span>开源项目</span>
                  <span className="text-border">•</span>
                  <span>MIT License</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>by</span>
                  <a
                    href="https://github.com/jinzhepro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-colors"
                  >
                    jinzhepro
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
