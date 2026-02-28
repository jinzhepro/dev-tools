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
  FileJson,
  Minimize2,
  Maximize2,
  Shield,
  ShieldOff,
  Trash2,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { useSimpleClearForm } from "@/hooks/useClearForm";

export default function JsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversionType, setConversionType] = useState("compress");
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();
  const clearAll = useSimpleClearForm(setInput, setOutput, setError);

  const convertJson = () => {
    try {
      let result = "";

      switch (conversionType) {
        case "compress":
          const parsed = JSON.parse(input);
          result = JSON.stringify(parsed);
          break;

        case "escape":
          result = JSON.stringify(input);
          break;

        case "unescape":
          result = JSON.parse(input);
          break;

        case "format":
          const formatted = JSON.parse(input);
          result = JSON.stringify(formatted, null, 2);
          break;

        default:
          throw new Error("未知的转换类型");
      }

      setOutput(result);
      setError("");
      toast.success("转换成功");
    } catch (err) {
      setError("转换失败：" + err.message);
      setOutput("");
    }
  };

  
  const conversionTypes = [
    {
      value: "compress",
      label: "压缩JSON",
      desc: "移除空格和换行",
      icon: Minimize2,
    },
    {
      value: "format",
      label: "格式化JSON",
      desc: "美化显示",
      icon: Maximize2,
    },
    {
      value: "escape",
      label: "转义字符串",
      desc: "JSON.stringify",
      icon: Shield,
    },
    {
      value: "unescape",
      label: "反转义字符串",
      desc: "JSON.parse",
      icon: ShieldOff,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">JSON 转换器</h1>
        <p className="text-muted-foreground">
          JSON 压缩、格式化、转义和反转义工具
        </p>
      </div>

      {/* 主要工作区 */}
      <Card>
        <CardHeader>
          <CardTitle>转换类型</CardTitle>
          <CardDescription>选择要执行的 JSON 转换操作</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={conversionType}
            onValueChange={setConversionType}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {conversionTypes.map((type) => (
              <div key={type.value}>
                <RadioGroupItem
                  value={type.value}
                  id={`type-${type.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`type-${type.value}`}
                  className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-border hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer"
                >
                  <type.icon className="w-6 h-6 mb-2" />
                  <span className="font-medium">{type.label}</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">
                    {type.desc}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* 输入输出区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>输入内容</Label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="在此输入 JSON 内容..."
                className="min-h-80 font-mono text-sm resize-none"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{input.length} 字符</span>
                <span>{input.split('\n').length} 行</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>输出结果</Label>
                {output && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copy(output)}
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    复制
                  </Button>
                )}
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="转换结果将显示在这里..."
                className="min-h-80 font-mono text-sm resize-none bg-muted/50"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{output.length} 字符</span>
                <span>{output.split('\n').length} 行</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center pt-4">
            <Button onClick={convertJson} size="lg">
              <Zap className="w-4 h-4 mr-2" />
              执行转换
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              size="lg"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清空重置
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>转换失败</AlertTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conversionTypes.map((type) => (
              <div 
                key={type.value}
                className="p-4 rounded-md border"
              >
                <h4 className="font-semibold mb-2">{type.label}</h4>
                <p className="text-muted-foreground text-sm">
                  {getTypeDescription(type.value)}
                </p>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <Alert>
            <AlertTitle>使用提示</AlertTitle>
            <AlertDescription className="mt-2 space-y-1">
              <p>• JSON 格式要求数据使用双引号，不支持单引号</p>
              <p>• 确保输入的 JSON 格式正确，否则转换会失败</p>
              <p>• 格式化功能会自动添加缩进，提高可读性</p>
              <p>• 压缩功能会移除所有空格和换行，减小文件大小</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

// 辅助函数：获取转换类型描述
function getTypeDescription(type) {
  const descriptions = {
    compress: "移除所有空格和换行，生成最紧凑的JSON格式，适合生产环境和网络传输",
    format: "添加缩进和换行，生成格式化的JSON，提高可读性，方便开发调试和代码审查",
    escape: "将字符串转换为JSON安全的转义格式，处理特殊字符如换行、引号等",
    unescape: "从JSON转义字符串还原原始内容，处理转义字符恢复正常字符串",
  };
  return descriptions[type] || "";
}
