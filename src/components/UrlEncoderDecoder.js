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
  Link,
  FileText,
  Globe,
  Hash,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { useSimpleClearForm } from "@/hooks/useClearForm";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState("encode");
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();
  const clearAll = useSimpleClearForm(setInput, setOutput, setError);

  const encodeToUrl = (text) => {
    try {
      return encodeURIComponent(text);
    } catch (err) {
      throw new Error("编码失败：" + err.message);
    }
  };

  const decodeFromUrl = (urlText) => {
    try {
      return decodeURIComponent(urlText);
    } catch (err) {
      throw new Error("解码失败：无效的URL编码格式");
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
        result = encodeToUrl(input);
      } else {
        result = decodeFromUrl(input);
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
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">URL 编码/解码</h1>
        <p className="text-muted-foreground">
          将文本转换为 URL 编码格式或从 URL 编码解码
        </p>
      </div>

      {/* 主要工作区 */}
      <Card>
        <CardHeader>
          <CardTitle>操作类型</CardTitle>
          <CardDescription>选择编码或解码操作</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={operation}
            onValueChange={setOperation}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="encode"
                id="encode"
                className="peer sr-only"
              />
              <Label
                htmlFor="encode"
                className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-muted hover:bg-accent peer-data-[state=checked]:border-primary cursor-pointer transition-all"
              >
                <Link className="w-6 h-6 mb-2" />
                <span className="font-medium">编码为 URL</span>
                <span className="text-sm text-muted-foreground text-center mt-1">
                  将文本转换为 URL 编码格式
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="decode"
                id="decode"
                className="peer sr-only"
              />
              <Label
                htmlFor="decode"
                className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-muted hover:bg-accent peer-data-[state=checked]:border-primary cursor-pointer transition-all"
              >
                <FileText className="w-6 h-6 mb-2" />
                <span className="font-medium">从 URL 解码</span>
                <span className="text-sm text-muted-foreground text-center mt-1">
                  将 URL 编码格式还原为文本
                </span>
              </Label>
            </div>
          </RadioGroup>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>输入内容</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入要编码或解码的文本..."
                className="min-h-48 resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>输出结果</Label>
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy className="w-3 h-3 mr-1" />
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

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={processText} size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              {operation === "encode" ? "编码" : "解码"}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              size="lg"
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
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">URL 编码</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• 将特殊字符转换为%开头的编码</li>
                <li>• 支持中文和 Unicode 字符</li>
                <li>• 确保 URL 参数的安全性</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">URL 解码</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• 将 URL 编码格式还原为原始文本</li>
                <li>• 处理各种特殊字符和中文</li>
                <li>• 验证 URL 编码格式有效性</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              URL 编码是 Web 开发中的常用技术，确保特殊字符在 URL 中正确传输，如空格、中文、符号等。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
