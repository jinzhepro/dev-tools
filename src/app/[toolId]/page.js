import { tools } from "@/data/tools";
import JsonConverter from "@/components/JsonConverter";
import TimestampGenerator from "@/components/TimestampGenerator";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import Base64EncoderDecoder from "@/components/Base64EncoderDecoder";
import UrlEncoderDecoder from "@/components/UrlEncoderDecoder";
import HashGenerator from "@/components/HashGenerator";
import ColorConverter from "@/components/ColorConverter";
import UuidGenerator from "@/components/UuidGenerator";
import IpInfoChecker from "@/components/IpInfoChecker";
import Geocoder from "@/components/Geocoder";
import NumberBaseConverter from "@/components/NumberBaseConverter";
import PasswordStrengthChecker from "@/components/PasswordStrengthChecker";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const componentMap = {
  JsonConverter,
  TimestampGenerator,
  QrCodeGenerator,
  Base64EncoderDecoder,
  UrlEncoderDecoder,
  HashGenerator,
  ColorConverter,
  UuidGenerator,
  IpInfoChecker,
  Geocoder,
  NumberBaseConverter,
  PasswordStrengthChecker,
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
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回工具集
            </Button>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 工具内容 */}
      <main className="container mx-auto px-4 py-8">
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
