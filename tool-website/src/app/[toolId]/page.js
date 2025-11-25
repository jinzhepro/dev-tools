import { tools } from "@/data/tools";
import JsonConverter from "@/components/JsonConverter";
import TimestampGenerator from "@/components/TimestampGenerator";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import Base64EncoderDecoder from "@/components/Base64EncoderDecoder";
import HashGenerator from "@/components/HashGenerator";
import ColorConverter from "@/components/ColorConverter";
import Link from "next/link";
import { notFound } from "next/navigation";

const componentMap = {
  JsonConverter,
  TimestampGenerator,
  QrCodeGenerator,
  Base64EncoderDecoder,
  HashGenerator,
  ColorConverter,
};

export default async function ToolPage({ params }) {
  const { toolId } = await params;
  const tool = tools.find((t) => t.id === toolId);

  if (!tool) {
    notFound();
  }

  const ToolComponent = componentMap[tool.component];

  if (!ToolComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-purple-600 font-medium transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回工具集
          </Link>
        </div>
      </nav>

      {/* 工具内容 */}
      <main className="py-12">
        <ToolComponent />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    toolId: tool.id,
  }));
}
