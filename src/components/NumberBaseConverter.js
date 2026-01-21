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
import {
  Copy,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Hash,
  Binary,
  Octagon,
  Hexagon,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function NumberBaseConverter() {
  const [input, setInput] = useState("10");
  const [inputBase, setInputBase] = useState("10");
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();

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

  // 验证输入是否符合指定进制
  const validateInput = useCallback((value, base) => {
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
  }, []);

  // 进制转换
  const convertNumber = useCallback(() => {
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
  }, [input, inputBase, validateInput]);

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
  }, [input, inputBase, convertNumber]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            进制转换器
          </CardTitle>
          <CardDescription className="text-lg">
            二进制、八进制、十进制、十六进制相互转换
          </CardDescription>
        </CardHeader>
      </Card>

{/* 进制转换工作台 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            进制转换工作台
          </CardTitle>
          <CardDescription>二进制、八进制、十进制、十六进制相互转换</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 输入控制区域 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">输入数值</Label>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入数值..."
                className="font-mono"
              />
            </div>

            {/* 进制选择 */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">输入进制</Label>
              <RadioGroup
                value={inputBase}
                onValueChange={setInputBase}
                className="grid grid-cols-4 gap-2"
              >
                {[
                  { value: "2", label: "二进制", example: "1010" },
                  { value: "8", label: "八进制", example: "12" },
                  { value: "10", label: "十进制", example: "10" },
                  { value: "16", label: "十六进制", example: "A" },
                ].map((base) => (
                  <div key={base.value} className="relative">
                    <RadioGroupItem
                      value={base.value}
                      id={`base-${base.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`base-${base.value}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                    >
                      <span className="font-medium text-sm">{base.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {base.example}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            
          </div>

          {/* 转换结果 */}
          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <div className="text-sm font-medium">转换结果</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(results).map(([base, value]) => (
                  <Card key={base} className="border">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">
                          {getBaseName(base)}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {base}进制
                        </Badge>
                      </div>
                      <div className="bg-muted/50 p-2 rounded mb-2">
                        <code className="font-mono text-xs break-all">
                          {value}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => copy(value, `${base}进制`)}
                        className="w-full gap-2 text-xs"
                      >
                        <Copy className="w-3 h-3" />
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
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 空状态 */}
          {!input && (
            <div className="text-center py-4">
              <Hash className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">输入数值查看转换结果</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => {
            setInput("");
            setResults({});
            setError("");
            toast.success("已清空");
          }}
          size="lg"
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          清空
        </Button>
      </div>



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
