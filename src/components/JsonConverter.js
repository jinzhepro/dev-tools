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
import {
  Copy,
  AlertCircle,
  Code,
  FileJson,
  Minimize2,
  Maximize2,
  Shield,
  ShieldOff,
} from "lucide-react";
import { toast } from "sonner";

export default function JsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversionType, setConversionType] = useState("compress");
  const [error, setError] = useState("");

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

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    toast.success("已清空");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("已复制到剪贴板");
  };

  const exampleData = [
    {
      name: "JSON对象",
      data: '{"name":"张三","age":25,"city":"北京","hobbies":["阅读","编程","旅行"]}',
      icon: FileJson,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "格式化JSON",
      data: '{\n  "name": "张三",\n  "age": 25,\n  "city": "北京",\n  "hobbies": ["阅读", "编程", "旅行"]\n}',
      icon: Code,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "字符串",
      data: "Hello \"World\" & 'Test'",
      icon: Shield,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "转义字符串",
      data: '"Hello \\"World\\" & \'Test\'"',
      icon: ShieldOff,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

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
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JSON转换器
          </CardTitle>
          <CardDescription className="text-lg">
            JSON压缩、格式化、转义和反转义工具
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要输入区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="w-5 h-5" />
              输入内容
            </CardTitle>
            <CardDescription>输入要转换的JSON内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入JSON内容..."
              className="min-h-80 font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* 输出卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              输出结果
            </CardTitle>
            <CardDescription>转换后的JSON内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              placeholder="转换结果将显示在这里..."
              className="min-h-80 font-mono text-sm resize-none bg-muted/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* 示例数据 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="w-5 h-5" />
            示例数据
          </CardTitle>
          <CardDescription>点击快速填充示例数据</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {exampleData.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setInput(example.data)}
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
              >
                <div className={`p-2 rounded-lg ${example.bgColor}`}>
                  <example.icon className={`w-6 h-6 ${example.color}`} />
                </div>
                <span className="text-sm font-medium">{example.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 转换类型选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            转换类型
          </CardTitle>
          <CardDescription>选择要执行的转换操作</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={conversionType}
            onValueChange={setConversionType}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {conversionTypes.map((type) => (
              <div key={type.value} className="relative">
                <RadioGroupItem
                  value={type.value}
                  id={`type-${type.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`type-${type.value}`}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <type.icon className="w-6 h-6 mb-2" />
                  <span className="font-medium text-sm">{type.label}</span>
                  <span className="text-xs text-muted-foreground mt-1 text-center">
                    {type.desc}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* 错误信息 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>转换失败</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={convertJson} size="lg" className="gap-2">
          <Code className="w-4 h-4" />
          转换
        </Button>
        <Button
          variant="outline"
          onClick={clearAll}
          size="lg"
          className="gap-2"
        >
          清空
        </Button>
        {output && (
          <Button
            variant="outline"
            onClick={copyToClipboard}
            size="lg"
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            复制结果
          </Button>
        )}
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Minimize2 className="w-4 h-4" /> 压缩JSON
              </h4>
              <p className="text-sm text-muted-foreground">
                移除所有空格和换行，减小文件大小，适合生产环境
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Maximize2 className="w-4 h-4" /> 格式化JSON
              </h4>
              <p className="text-sm text-muted-foreground">
                添加缩进和换行，提高可读性，方便开发调试
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" /> 转义字符串
              </h4>
              <p className="text-sm text-muted-foreground">
                将字符串转换为JSON格式，处理特殊字符
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ShieldOff className="w-4 h-4" /> 反转义字符串
              </h4>
              <p className="text-sm text-muted-foreground">
                从JSON字符串还原原始内容
              </p>
            </div>
          </div>
          <Separator />
          <Alert>
            <FileJson className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              JSON格式要求数据使用双引号，不支持单引号。确保输入的JSON格式正确，否则转换会失败。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
