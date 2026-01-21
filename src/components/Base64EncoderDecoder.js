"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  AlertCircle,
  Code,
  FileText,
  Globe,
  Hash,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { useSimpleClearForm } from "@/hooks/useClearForm";

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState("encode");
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();
  const clearAll = useSimpleClearForm(setInput, setOutput, setError);

  const encodeToBase64 = (text) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (err) {
      throw new Error("编码失败：" + err.message);
    }
  };

  const decodeFromBase64 = (base64Text) => {
    try {
      return decodeURIComponent(escape(atob(base64Text)));
    } catch (err) {
      throw new Error("解码失败：无效的Base64格式");
    }
  };

  const processText = () => {
    if (!input.trim()) {
      setError("请输入要处理的内容");
      setOutput("");
      return;
    }

    try {
      let result = "";
      if (operation === "encode") {
        result = encodeToBase64(input);
      } else {
        result = decodeFromBase64(input);
      }
      setOutput(result);
      setError("");
      toast.success(`${operation === "encode" ? "编码" : "解码"}成功`);
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  const copyToClipboard = () => {
    copy(output);
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Base64编码/解码
          </CardTitle>
          <CardDescription className="text-lg">
            将文本转换为Base64格式或从Base64解码
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要工作区域 - 整合输入、控制、输出 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Base64转换工作台
          </CardTitle>
          <CardDescription>输入文本，选择操作类型，立即查看结果</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 操作类型选择 - 置顶 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">操作类型</Label>
            <RadioGroup
              value={operation}
              onValueChange={setOperation}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem
                  value="encode"
                  id="encode"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="encode"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5" />
                    <span className="font-medium">编码为Base64</span>
                  </div>
                  <span className="text-sm text-muted-foreground text-center">
                    将文本转换为Base64格式
                  </span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem
                  value="decode"
                  id="decode"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="decode"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">从Base64解码</span>
                  </div>
                  <span className="text-sm text-muted-foreground text-center">
                    将Base64格式还原为文本
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 输入区域 */}
            <div className="space-y-3">

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入要编码或解码的文本..."
                className="min-h-48 resize-none"
              />
            </div>

            {/* 输出区域 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">输出结果</Label>
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    复制
                  </Button>
                )}
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="处理结果将显示在这里..."
                className="min-h-48 resize-none bg-muted/50 font-mono text-sm"
              />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={processText} size="lg" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {operation === "encode" ? "编码" : "解码"}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              size="lg"
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </Button>
          </div>

          {/* 错误信息 */}
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
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  <Code className="w-3 h-3 mr-1" />
                  编码
                </Badge>
                <h4 className="font-semibold">Base64编码</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• 将文本转换为Base64格式</li>
                <li>• 支持中文和特殊字符</li>
                <li>• 常用于数据传输和存储</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  解码
                </Badge>
                <h4 className="font-semibold">Base64解码</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• 将Base64格式还原为原始文本</li>
                <li>• 自动处理UTF-8编码</li>
                <li>• 验证Base64格式有效性</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <FileText className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              Base64编码常用于在不支持二进制数据的环境中传输数据，如电子邮件附件、HTTP请求等。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
