"use client";

import { useState, useEffect } from "react";
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
import {
  Copy,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Hash,
  Binary,
  Octagon,
  Hexagon,
} from "lucide-react";
import { toast } from "sonner";

export default function NumberBaseConverter() {
  const [input, setInput] = useState("10");
  const [inputBase, setInputBase] = useState("10");
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  // 验证输入是否符合指定进制
  const validateInput = (value, base) => {
    if (!value.trim()) return false;

    try {
      const parsedValue = parseInt(value, parseInt(base));
      if (isNaN(parsedValue)) return false;

      const validChars = getValidChars(parseInt(base));
      const regex = new RegExp(`^[${validChars}]+$`, "i");
      return regex.test(value);
    } catch (e) {
      return false;
    }
  };

  // 获取指定进制的有效字符
  const getValidChars = (base) => {
    switch (base) {
      case 2:
        return "01";
      case 8:
        return "01234567";
      case 10:
        return "0123456789";
      case 16:
        return "0123456789abcdef";
      default:
        return "";
    }
  };

  // 进制转换
  const convertNumber = () => {
    if (!input.trim()) {
      setError("请输入数值");
      setResults({});
      return;
    }

    if (!validateInput(input, parseInt(inputBase))) {
      setError(`无效的${getBaseName(parseInt(inputBase))}格式`);
      setResults({});
      return;
    }

    try {
      const decimalValue = parseInt(input, parseInt(inputBase));

      if (isNaN(decimalValue)) {
        setError("数值转换失败");
        setResults({});
        return;
      }

      if (decimalValue > Number.MAX_SAFE_INTEGER) {
        setError("数值超出安全范围");
        setResults({});
        return;
      }

      setResults({
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
      });
      setError("");
    } catch (err) {
      setError("转换失败：" + err.message);
      setResults({});
    }
  };

  // 获取进制名称
  const getBaseName = (base) => {
    switch (base) {
      case 2:
        return "二进制";
      case 8:
        return "八进制";
      case 10:
        return "十进制";
      case 16:
        return "十六进制";
      default:
        return "";
    }
  };

  // 获取进制示例
  const getBaseExample = (base) => {
    switch (base) {
      case 2:
        return "1010";
      case 8:
        return "12";
      case 10:
        return "10";
      case 16:
        return "A";
      default:
        return "";
    }
  };

  // 复制到剪贴板
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`已复制 ${label} 到剪贴板`);
  };

  // 示例数值
  const exampleNumbers = [
    { name: "十进制 10", value: "10", base: "10" },
    { name: "十进制 255", value: "255", base: "10" },
    { name: "十进制 1024", value: "1024", base: "10" },
    { name: "二进制 1010", value: "1010", base: "2" },
    { name: "八进制 12", value: "12", base: "8" },
    { name: "十六进制 FF", value: "FF", base: "16" },
    { name: "十六进制 100", value: "100", base: "16" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) {
        convertNumber();
      } else {
        setResults({});
        setError("");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [input, inputBase]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 标题区域 */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            进制转换器
          </CardTitle>
          <CardDescription>
            二进制、八进制、十进制、十六进制相互转换
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要输入区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              输入数值
            </CardTitle>
            <CardDescription>输入要转换的数值</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number-input">数值</Label>
              <Input
                id="number-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入数值..."
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label>输入进制</Label>
              <RadioGroup
                value={inputBase}
                onValueChange={setInputBase}
                className="grid grid-cols-2 gap-3"
              >
                {[
                  {
                    value: "2",
                    label: "二进制",
                    icon: Binary,
                    example: "1010",
                  },
                  { value: "8", label: "八进制", icon: Octagon, example: "12" },
                  { value: "10", label: "十进制", icon: Hash, example: "10" },
                  {
                    value: "16",
                    label: "十六进制",
                    icon: Hexagon,
                    example: "A",
                  },
                ].map((base) => (
                  <div key={base.value} className="relative">
                    <RadioGroupItem
                      value={base.value}
                      id={`base-${base.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`base-${base.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                    >
                      <base.icon className="w-6 h-6 mb-2" />
                      <span className="font-medium">{base.label}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        例: {base.example}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* 结果预览卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              转换结果
            </CardTitle>
            <CardDescription>实时预览转换结果</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : Object.keys(results).length > 0 ? (
              <div className="space-y-2">
                {[
                  { key: "binary", label: "二进制", icon: Binary },
                  { key: "octal", label: "八进制", icon: Octagon },
                  { key: "decimal", label: "十进制", icon: Hash },
                  { key: "hexadecimal", label: "十六进制", icon: Hexagon },
                ].map((format) => (
                  <div
                    key={format.key}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <format.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-sm">
                        {format.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="font-mono text-sm font-semibold">
                        {results[format.key]}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(results[format.key], format.label)
                        }
                        className="h-7 w-7 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Hash className="w-8 h-8 mb-2 opacity-50" />
                <p>输入数值查看转换结果</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 示例数值 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            示例数值
          </CardTitle>
          <CardDescription>点击快速填充示例</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {exampleNumbers.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(example.value);
                  setInputBase(example.base);
                }}
                className="gap-1"
              >
                {example.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 详细说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Binary className="w-4 h-4" /> 支持进制
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>二进制：</strong>0, 1 (例: 1010)
                </li>
                <li>
                  • <strong>八进制：</strong>0-7 (例: 12)
                </li>
                <li>
                  • <strong>十进制：</strong>0-9 (例: 10)
                </li>
                <li>
                  • <strong>十六进制：</strong>0-9, A-F (例: A)
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 使用方法
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1. 选择输入数值的进制类型</li>
                <li>2. 在输入框中输入数值</li>
                <li>3. 自动显示其他进制的转换结果</li>
                <li>4. 点击复制按钮复制结果</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Terminal className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              十六进制中的字母不区分大小写，支持 A-F 和 a-f。数值转换范围受
              JavaScript 安全整数限制。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
