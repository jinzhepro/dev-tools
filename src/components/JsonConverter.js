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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10 relative z-10">
        {/* 标题区域 - 增强视觉层次 */}
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center px-0 space-y-6">
            {/* 装饰性图标 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
                  <FileJson className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                JSON转换器
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                JSON压缩、格式化、转义和反转义工具
              </p>
            </div>
            
            {/* 快捷操作 */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setInput("");
                  setOutput("");
                  setError("");
                }}
                className="rounded-full"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                清空
              </Button>
              {output && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copy(output)}
                  className="rounded-full"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  复制结果
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* 主要工作区域 - 增强视觉设计 */}
        <Card className="relative overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-500">
          {/* 装饰性顶部条 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600" />
          
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <span>JSON转换工作台</span>
            </CardTitle>
            <CardDescription className="text-base">
              输入JSON内容，选择转换类型，立即查看结果
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 relative z-10">
            {/* 转换类型选择 - 增强视觉效果 */}
            <div className="space-y-4">
              <Label className="text-base font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                转换类型
              </Label>
              <RadioGroup
                value={conversionType}
                onValueChange={setConversionType}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {conversionTypes.map((type) => (
                  <div key={type.value} className="relative group">
                    <RadioGroupItem
                      value={type.value}
                      id={`type-${type.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`type-${type.value}`}
                      className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border/50 bg-background/80 backdrop-blur-sm hover:bg-accent hover:border-primary/30 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all duration-300 cursor-pointer group-hover:shadow-md"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center mb-3 group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all duration-300">
                        <type.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-medium">{type.label}</span>
                      <span className="text-xs text-muted-foreground mt-1 text-center">
                        {type.desc}
                      </span>
                    </Label>
                    {/* 选中指示器 */}
                    <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* 输入输出区域 - 增强分隔视觉效果 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 输入区域 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    输入内容
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    JSON
                  </Badge>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="在此输入JSON内容..."
                    className="min-h-80 font-mono text-sm resize-none bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary rounded-xl transition-all duration-300"
                  />
                </div>
                {/* 输入统计 */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{input.length} 字符</span>
                  <span>{input.split('\n').length} 行</span>
                </div>
              </div>

              {/* 输出区域 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    输出结果
                  </Label>
                  {output && (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      ✓ 转换成功
                    </Badge>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <Textarea
                    value={output}
                    readOnly
                    placeholder="转换结果将显示在这里..."
                    className="min-h-80 font-mono text-sm resize-none bg-muted/50 border-2 border-border/50 rounded-xl transition-all duration-300"
                  />
                </div>
                {/* 输出统计 */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{output.length} 字符</span>
                  <span>{output.split('\n').length} 行</span>
                </div>
              </div>
            </div>

            {/* 操作按钮 - 增强视觉反馈 */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                onClick={convertJson} 
                size="lg" 
                className="px-8 py-3 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                执行转换
              </Button>
              <Button
                variant="outline"
                onClick={clearAll}
                size="lg"
                className="px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                清空重置
              </Button>
            </div>

            {/* 错误信息 - 增强视觉效果 */}
            {error && (
              <Alert variant="destructive" className="border-2 border-destructive/50 shadow-lg shadow-destructive/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <AlertTitle className="text-lg font-semibold">转换失败</AlertTitle>
                    <AlertDescription className="text-base">{error}</AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 使用说明 - 增强设计感 */}
        <Card className="relative overflow-hidden border-2 border-border/50 hover:border-primary/20 transition-all duration-500">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-transparent to-transparent" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center">
                <FileJson className="w-5 h-5 text-primary" />
              </div>
              <span>使用说明</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 relative z-10">
            {/* 功能说明网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conversionTypes.map((type) => (
                <div 
                  key={type.value}
                  className="p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 transition-all duration-300 hover:shadow-md group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all duration-300 shrink-0">
                      <type.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{type.label}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {getTypeDescription(type.value)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-8" />
            
            {/* 提示信息 */}
            <Alert className="bg-primary/5 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileJson className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <AlertTitle className="text-lg font-semibold">💡 使用提示</AlertTitle>
                  <AlertDescription className="text-base mt-2 space-y-2">
                    <p>• JSON格式要求数据使用双引号，不支持单引号</p>
                    <p>• 确保输入的JSON格式正确，否则转换会失败</p>
                    <p>• 格式化功能会自动添加缩进，提高可读性</p>
                    <p>• 压缩功能会移除所有空格和换行，减小文件大小</p>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </CardContent>
        </Card>

        {/* 底部装饰 */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground/60">
            支持多种JSON转换模式 · 实时预览转换结果
          </p>
        </div>
      </div>
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
