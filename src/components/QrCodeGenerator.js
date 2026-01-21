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
import { Label } from "@/components/ui/label";
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
import { useSimpleClearForm } from "@/hooks/useClearForm";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [error, setError] = useState("");

  const clearAll = useSimpleClearForm(setText, setError);

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

  
  const sizeOptions = [
    { value: "128", label: "小 (128x128)" },
    { value: "256", label: "中 (256x256)" },
    { value: "512", label: "大 (512x512)" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            二维码生成器
          </CardTitle>
          <CardDescription className="text-lg">
            将链接或文本转换为二维码
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要工作区域 - 整合输入、控制、预览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            二维码生成工作台
          </CardTitle>
          <CardDescription>输入内容，设置大小，实时预览二维码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 输入区域 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">输入内容</Label>
                <div className="flex gap-2">

                </div>
              </div>
              <Textarea
                value={text}
                onChange={handleTextChange}
                placeholder="输入链接或文本..."
                className="min-h-32 resize-none"
              />

              {/* 大小设置 */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">二维码大小</Label>
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
            </div>

            {/* 预览区域 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">二维码预览</Label>
                {text && !error && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadQR}
                    className="gap-1"
                  >
                    <Download className="w-3 h-3" />
                    下载
                  </Button>
                )}
              </div>
              <div className="flex justify-center items-center min-h-64 border-2 border-dashed border-muted rounded-lg">
                {text && !error ? (
                  <div className="space-y-4 p-4">
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
                  <div className="text-center text-muted-foreground p-8">
                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>输入内容后二维码将显示在这里</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              onClick={clearAll}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </Button>
          </div>

          {/* 错误信息 */}
          {error && (
            <Alert variant="destructive">
              <QrCode className="w-4 h-4" />
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
              <h4 className="font-semibold">使用场景</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 分享网站链接</li>
                <li>• 添加WiFi网络</li>
                <li>• 存储联系方式</li>
                <li>• 产品信息展示</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <QrCode className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              二维码内容越长，生成的二维码越复杂。建议保持内容简洁以提高扫描成功率。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
