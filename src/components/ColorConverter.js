"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Palette, Eye, Hash, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function ColorConverter() {
  const [input, setInput] = useState("#ff0000");
  const [inputType, setInputType] = useState("hex");
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();

  // 颜色转换函数
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: 1,
        }
      : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const parseRgb = (rgbString) => {
    // 支持RGBA格式
    const rgbaMatch = rgbString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/i
    );
    if (rgbaMatch) {
      return {
        r: parseInt(rgbaMatch[1]),
        g: parseInt(rgbaMatch[2]),
        b: parseInt(rgbaMatch[3]),
        a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
      };
    }
    return null;
  };

  const parseHsl = (hslString) => {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/i);
    return match
      ? {
          h: parseInt(match[1]),
          s: parseInt(match[2]),
          l: parseInt(match[3]),
        }
      : null;
  };

  const convertColor = useCallback(() => {
    if (!input.trim()) {
      setError("请输入颜色值");
      setResults({});
      return;
    }

    try {
      let rgb = null;

      switch (inputType) {
        case "hex":
          rgb = hexToRgb(input);
          if (!rgb) throw new Error("无效的HEX颜色格式");
          break;
        case "rgb":
          rgb = parseRgb(input);
          if (!rgb) throw new Error("无效的RGB/RGBA颜色格式");
          break;
        case "hsl":
          const hsl = parseHsl(input);
          if (!hsl) throw new Error("无效的HSL颜色格式");
          rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
          rgb.a = 1; // HSL不支持alpha
          break;
      }

      if (!rgb) throw new Error("颜色转换失败");

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      setResults({
        hex: hex,
        rgb:
          rgb.a < 1
            ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
            : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        rgbValues: rgb,
        hslValues: hsl,
      });
      setError("");
      toast.success("颜色转换成功");
    } catch (err) {
      setError(err.message);
      setResults({});
    }
  }, [input, inputType]);


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            颜色转换
          </CardTitle>
          <CardDescription className="text-lg">
            HEX、RGB/RGBA、HSL颜色格式互转
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要工作区域 - 整合输入、控制、预览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            颜色转换工作台
          </CardTitle>
          <CardDescription>输入颜色值，选择格式，实时查看转换结果</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入格式选择 - 置顶 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">输入格式</Label>
            <RadioGroup
              value={inputType}
              onValueChange={setInputType}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { value: "hex", label: "HEX", example: "#ff0000" },
                {
                  value: "rgb",
                  label: "RGB/RGBA",
                  example: "rgb(255, 0, 0)",
                },
                { value: "hsl", label: "HSL", example: "hsl(0, 100%, 50%)" },
              ].map((type) => (
                <div key={type.value} className="relative">
                  <RadioGroupItem
                    value={type.value}
                    id={`type-${type.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`type-${type.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                  >
                    <span className="font-medium text-sm">{type.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {type.example}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 输入区域 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">颜色值</Label>
                              </div>
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入颜色值..."
                className="font-mono"
              />
            </div>

            {/* 预览区域 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">颜色预览</Label>
              <div
                className="flex justify-center items-center h-32 rounded-xl border-2 border-border"
                style={{
                  backgroundColor: results.hex || "#f3f4f6",
                  opacity: results.rgbValues?.a || 1,
                }}
              >
                <div className="text-center">
                  <Eye className="w-8 h-8 mb-2 mx-auto text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    {results.hex ? `HEX: ${results.hex}` : "输入颜色值查看预览"}
                    {results.rgbValues?.a < 1 && (
                      <div className="text-xs mt-1">
                        Alpha: {results.rgbValues.a}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 转换结果 */}
          {Object.keys(results).length > 0 && !error && (
            <div className="space-y-4">
              <Label className="text-sm font-medium">转换结果</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "hex", label: "HEX", value: results.hex },
                  { key: "rgb", label: "RGB/RGBA", value: results.rgb },
                  { key: "hsl", label: "HSL", value: results.hsl },
                ].map((format) => (
                  <Card key={format.key} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium">{format.label}</div>
                        <Badge variant="secondary">{format.label}</Badge>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg mb-3">
                        <code className="font-mono text-sm break-all">
                          {format.value}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() =>
                          copy(format.value, format.label)
                        }
                        className="w-full gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        复制
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 错误信息 */}
          {error && (
            <Alert variant="destructive">
              <Palette className="w-4 h-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Hash className="w-4 h-4" /> 支持格式
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>HEX：</strong>#ff0000, #3366cc
                </li>
                <li>
                  • <strong>RGB：</strong>rgb(255, 0, 0)
                </li>
                <li>
                  • <strong>RGBA：</strong>rgba(255, 0, 0, 0.5)
                </li>
                <li>
                  • <strong>HSL：</strong>hsl(0, 100%, 50%)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" /> 应用场景
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Web开发颜色调试</li>
                <li>• 设计稿颜色转换</li>
                <li>• CSS样式调整</li>
                <li>• 颜色值标准化</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Palette className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              RGBA格式包含透明度(alpha)值，HEX和HSL格式会忽略透明度信息。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
