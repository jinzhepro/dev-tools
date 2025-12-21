"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  QrCode,
  Download,
  Trash2,
  Globe,
  Github,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [error, setError] = useState("");

  const validateInput = (input) => {
    if (!input.trim()) {
      setError("请输入要生成二维码的内容");
      return false;
    }
    if (input.length > 1000) {
      setError("内容长度不能超过1000个字符");
      return false;
    }
    setError("");
    return true;
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value) {
      validateInput(value);
    } else {
      setError("");
    }
  };

  const clearAll = () => {
    setText("");
    setError("");
  };

  const downloadQR = () => {
    if (!validateInput(text)) return;

    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL();
      link.click();
      toast.success("二维码已下载");
    }
  };

  const exampleUrls = [
    { label: "百度", url: "https://www.baidu.com", icon: Globe },
    { label: "GitHub", url: "https://github.com", icon: Github },
    { label: "微信", url: "https://weixin.qq.com", icon: MessageCircle },
    { label: "淘宝", url: "https://www.taobao.com", icon: ShoppingBag },
  ];

  const sizeOptions = [
    { value: "128", label: "小 (128x128)" },
    { value: "256", label: "中 (256x256)" },
    { value: "512", label: "大 (512x512)" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 标题区域 */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            二维码生成器
          </CardTitle>
          <CardDescription>将链接或文本转换为二维码</CardDescription>
        </CardHeader>
      </Card>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              输入内容
            </CardTitle>
            <CardDescription>输入要生成二维码的文本或链接</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={text}
              onChange={handleTextChange}
              placeholder="输入链接或文本..."
              className="min-h-32 resize-none"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">二维码大小</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 预览卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              二维码预览
            </CardTitle>
            <CardDescription>实时预览生成的二维码</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center min-h-64">
              {text && !error ? (
                <div className="space-y-4">
                  <QRCodeCanvas
                    value={text}
                    size={parseInt(size)}
                    level="M"
                    includeMargin={true}
                    className="border border-gray-200 rounded-lg"
                  />
                  <Button onClick={downloadQR} className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    下载二维码
                  </Button>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>输入内容后二维码将显示在这里</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 示例链接 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            示例链接
          </CardTitle>
          <CardDescription>点击快速填充示例链接</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {exampleUrls.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setText(example.url)}
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
              >
                <example.icon className="w-6 h-6" />
                <span className="text-sm">{example.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 错误信息 */}
      {error && (
        <Alert variant="destructive">
          <QrCode className="w-4 h-4" />
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={clearAll} className="gap-2">
          <Trash2 className="w-4 h-4" />
          清空
        </Button>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">支持内容类型</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 网址链接 (http/https)</li>
                <li>• 纯文本内容</li>
                <li>• 联系方式</li>
                <li>• WiFi信息</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">功能特性</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 实时预览</li>
                <li>• 可调节大小</li>
                <li>• 高质量下载</li>
                <li>• 错误容错</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <QrCode className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              二维码支持多种内容格式，包括网址、文本、联系方式等。生成的二维码可以直接扫描使用。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
