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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Copy, Shield, Key, FileText, Hash, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import MD5 from "crypto-js/md5";
import SHA256 from "crypto-js/sha256";
import SHA1 from "crypto-js/sha1";
import SHA512 from "crypto-js/sha512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([
    "MD5",
    "SHA256",
  ]);

  const algorithms = [
    {
      name: "MD5",
      description: "128位哈希，常用于文件校验",
      color: "text-red-500",
      bgColor: "bg-red-50",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      name: "SHA1",
      description: "160位哈希，已被弃用但仍常用",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "SHA256",
      description: "256位哈希，安全性高",
      color: "text-green-500",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      name: "SHA512",
      description: "512位哈希，最高安全性",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ];

  const generateHashes = () => {
    if (!input.trim()) {
      setResults({});
      toast.error("请输入要生成哈希的文本");
      return;
    }

    const newResults = {};

    selectedAlgorithms.forEach((algo) => {
      switch (algo) {
        case "MD5":
          newResults.MD5 = MD5(input).toString();
          break;
        case "SHA1":
          newResults.SHA1 = SHA1(input).toString();
          break;
        case "SHA256":
          newResults.SHA256 = SHA256(input).toString();
          break;
        case "SHA512":
          newResults.SHA512 = SHA512(input).toString();
          break;
        default:
          break;
      }
    });

    setResults(newResults);
    toast.success("哈希生成成功");
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithm)
        ? prev.filter((a) => a !== algorithm)
        : [...prev, algorithm]
    );
  };

  const clearAll = () => {
    setInput("");
    setResults({});
    toast.success("已清空");
  };

  const copyToClipboard = (hash, algorithm) => {
    navigator.clipboard.writeText(hash);
    toast.success(`已复制${algorithm}到剪贴板`);
  };

  const exampleTexts = [
    {
      label: "Hello World",
      text: "Hello World",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "密码示例",
      text: "MySecurePassword123!",
      icon: Lock,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      label: "邮箱地址",
      text: "user@example.com",
      icon: Key,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "JSON数据",
      text: '{"user":"admin","pass":"secret"}',
      icon: Hash,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hash生成器
          </CardTitle>
          <CardDescription className="text-lg">
            生成MD5、SHA1、SHA256、SHA512哈希值
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要输入区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 输入卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              输入文本
            </CardTitle>
            <CardDescription>输入要生成哈希的文本</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入要生成哈希的文本..."
              className="min-h-32 resize-none"
            />
          </CardContent>
        </Card>

        {/* 哈希算法选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              选择算法
            </CardTitle>
            <CardDescription>选择要生成的哈希算法</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {algorithms.map((algo) => (
                <div key={algo.name} className="flex items-start space-x-3">
                  <Checkbox
                    id={algo.name}
                    checked={selectedAlgorithms.includes(algo.name)}
                    onCheckedChange={() => handleAlgorithmChange(algo.name)}
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <Label
                      htmlFor={algo.name}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <div className={`p-1 rounded ${algo.bgColor}`}>
                        <Shield className={`w-4 h-4 ${algo.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{algo.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {algo.description}
                        </div>
                      </div>
                    </Label>
                    <Badge variant="secondary" className={algo.badgeColor}>
                      {algo.name}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 示例文本 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            示例文本
          </CardTitle>
          <CardDescription>点击快速填充示例文本</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {exampleTexts.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => setInput(example.text)}
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
              >
                <div className={`p-2 rounded-lg ${example.bgColor}`}>
                  <example.icon className={`w-5 h-5 ${example.color}`} />
                </div>
                <span className="text-sm font-medium">{example.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={generateHashes} size="lg" className="gap-2">
          <Shield className="w-4 h-4" />
          生成哈希
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

      {/* 结果显示 */}
      {Object.keys(results).length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                哈希结果
              </CardTitle>
              <CardDescription>生成的哈希值</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results).map(([algorithm, hash]) => {
                const algoInfo = algorithms.find((a) => a.name === algorithm);
                return (
                  <Card key={algorithm} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${algoInfo.bgColor}`}>
                            <Shield className={`w-4 h-4 ${algoInfo.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {algorithm}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {algoInfo.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={algoInfo.badgeColor}
                        >
                          {algorithm}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="bg-muted/50 p-4 rounded-xl">
                        <code className="font-mono text-sm break-all">
                          {hash}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(hash, algorithm)}
                        className="w-full gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        复制{algorithm}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4" /> 哈希算法
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800 mt-0.5"
                  >
                    MD5
                  </Badge>
                  <span>快速但安全性较低</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 mt-0.5"
                  >
                    SHA1
                  </Badge>
                  <span>已被弃用，不推荐使用</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 mt-0.5"
                  >
                    SHA256
                  </Badge>
                  <span>安全性高，推荐使用</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 mt-0.5"
                  >
                    SHA512
                  </Badge>
                  <span>最高安全性，计算较慢</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Key className="w-4 h-4" /> 应用场景
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 文件完整性校验</li>
                <li>• 密码存储（加盐）</li>
                <li>• 数字签名</li>
                <li>• 数据完整性验证</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Lock className="w-4 h-4" />
            <AlertTitle>安全提醒</AlertTitle>
            <AlertDescription>
              哈希函数是单向的，无法从哈希值还原原始数据。密码存储时请使用加盐哈希，不要直接存储明文密码。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
