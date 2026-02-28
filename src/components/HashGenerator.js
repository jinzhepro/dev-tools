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
import { Copy, Shield, Key, FileText, AlertCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import MD5 from "crypto-js/md5";
import SHA256 from "crypto-js/sha256";
import SHA1 from "crypto-js/sha1";
import SHA512 from "crypto-js/sha512";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { useSimpleClearForm } from "@/hooks/useClearForm";

/**
 * Hash 生成器组件 - 生成多种哈希算法的哈希值
 */
export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([
    "MD5",
    "SHA256",
  ]);

  const { copy } = useCopyClipboard();
  const clearAll = useSimpleClearForm(setInput, setResults);

  const algorithms = [
    {
      name: "MD5",
      description: "128 位哈希，常用于文件校验",
      color: "text-red-500",
      bgColor: "bg-red-50",
      badgeColor: "bg-red-100 text-red-800",
    },
    {
      name: "SHA1",
      description: "160 位哈希，已被弃用但仍常用",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "SHA256",
      description: "256 位哈希，安全性高",
      color: "text-green-500",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      name: "SHA512",
      description: "512 位哈希，最高安全性",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ];

  /**
   * 生成哈希值
   */
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
      }
    });

    setResults(newResults);
    toast.success("哈希生成成功");
  };

  /**
   * 切换选择的算法
   */
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithm)
        ? prev.filter((a) => a !== algorithm)
        : [...prev, algorithm]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Hash 生成器</h1>
        <p className="text-muted-foreground">
          生成 MD5、SHA1、SHA256、SHA512 哈希值
        </p>
      </div>

      {/* 主要工作区 */}
      <Card>
        <CardHeader>
          <CardTitle>选择哈希算法</CardTitle>
          <CardDescription>选择要生成的哈希算法</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {algorithms.map((algo) => (
              <div key={algo.name} className="flex items-start space-x-3">
                <Checkbox
                  id={algo.name}
                  checked={selectedAlgorithms.includes(algo.name)}
                  onCheckedChange={() => handleAlgorithmChange(algo.name)}
                />
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
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label>输入文本</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入要生成哈希的文本..."
              className="min-h-32 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={generateHashes} size="lg">
              <Shield className="w-4 h-4 mr-2" />
              生成哈希
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

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <Label>哈希结果</Label>
              <div className="space-y-3">
                {Object.entries(results).map(([algorithm, hash]) => {
                  const algoInfo = algorithms.find((a) => a.name === algorithm);
                  return (
                    <Card key={algorithm}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-md ${algoInfo.bgColor}`}>
                              <Shield className={`w-4 h-4 ${algoInfo.color}`} />
                            </div>
                            <div>
                              <div className="font-medium">{algorithm}</div>
                              <div className="text-sm text-muted-foreground">
                                {algoInfo.description}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md mb-3">
                          <code className="font-mono text-sm break-all">
                            {hash}
                          </code>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => copy(hash, algorithm)}
                          className="w-full"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          复制{algorithm}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
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
              <h4 className="font-semibold">哈希算法</h4>
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
              <h4 className="font-semibold">应用场景</h4>
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
