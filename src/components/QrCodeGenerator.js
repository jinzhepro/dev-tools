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
import { QrCode, Download, Trash2, AlertCircle } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">二维码生成器</h1>
        <p className="text-muted-foreground">
          将链接或文本转换为二维码
        </p>
      </div>

      {/* 主要工作区 */}
      <Card>
        <CardHeader>
          <CardTitle>二维码生成工具</CardTitle>
          <CardDescription>输入内容，设置大小，实时预览二维码</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>输入内容</Label>
                <Textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="输入链接或文本..."
                  className="min-h-32 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>二维码大小</Label>
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

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>二维码预览</Label>
                {text && !error && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadQR}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    下载
                  </Button>
                )}
              </div>
              <div className="flex justify-center items-center min-h-64 border-2 border-dashed border-muted rounded-md">
                {text && !error ? (
                  <div className="space-y-4 p-4">
                    <QRCodeCanvas
                      value={text}
                      size={parseInt(size)}
                      level="M"
                      includeMargin={true}
                      className="border border-gray-200 rounded-md"
                    />
                    <Button onClick={downloadQR} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
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

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant="outline"
              onClick={clearAll}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清空
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">支持内容类型</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 网址链接 (http/https)</li>
                <li>• 纯文本内容</li>
                <li>• 联系方式</li>
                <li>• WiFi 信息</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">使用场景</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 分享网站链接</li>
                <li>• 添加 WiFi 网络</li>
                <li>• 存储联系方式</li>
                <li>• 产品信息展示</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
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
