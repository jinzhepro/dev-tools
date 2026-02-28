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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  RefreshCw,
  Hash,
  Trash2,
  Key,
  FileText,
  Layers,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";
import { useSimpleClearForm } from "@/hooks/useClearForm";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [bulkUuids, setBulkUuids] = useState([]);
  const [count, setCount] = useState(5);
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();
  const clearAll = useSimpleClearForm(setUuid, setBulkUuids, setError);

  // 生成单个UUID
  const generateUuid = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      const newUuid = crypto.randomUUID();
      setUuid(newUuid);
      setError("");
      toast.success("UUID生成成功");
    } else {
      // 降级到手动实现（浏览器兼容）
      const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      setUuid(newUuid);
      setError("");
      toast.success("UUID生成成功");
    }
  };

  // 批量生成UUID
  const generateBulkUuids = () => {
    if (count < 1 || count > 100) {
      setError("数量必须在1-100之间");
      return;
    }

    const newUuids = [];
    for (let i = 0; i < count; i++) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        newUuids.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setBulkUuids(newUuids);
    setError("");
    toast.success(`成功生成${count}个UUID`);
  };

  // 复制到剪贴板
  const copyToClipboard = (text, label) => {
    copy(text, label);
  };

  // 复制所有UUID
  const copyAllUuids = () => {
    const allUuids = [uuid, ...bulkUuids].filter(Boolean).join("\n");
    copyToClipboard(allUuids, "所有UUID");
  };

  const getUuidVersion = (uuidString) => {
    if (!uuidString) return "";
    // UUID v4 的版本信息在第13位
    const version = uuidString.charAt(14);
    return `v${version}`;
  };

  const getUuidVariant = (uuidString) => {
    if (!uuidString) return "";
    // 变体在第19位
    const variant = uuidString.charAt(19);
    if (
      variant === "8" ||
      variant === "9" ||
      variant === "a" ||
      variant === "b"
    ) {
      return "RFC 4122";
    }
    return "Unknown";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">UUID 生成器</h1>
        <p className="text-muted-foreground">
          生成通用唯一标识符（UUID），支持批量生成
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* UUID 生成 */}
      <Card>
        <CardHeader>
          <CardTitle>生成 UUID</CardTitle>
          <CardDescription>生成单个或批量 UUID 标识符</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">单个 UUID</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={generateUuid} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  生成 UUID
                </Button>

                {uuid && (
                  <>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <code className="font-mono text-sm break-all">
                        {uuid}
                      </code>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(uuid, "UUID")}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        复制
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(uuid.replace(/-/g, ""), "无连字符 UUID")
                        }
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        无连字符
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">批量生成</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-sm">数量 (1-100)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="font-mono"
                  />
                </div>

                <Button
                  onClick={generateBulkUuids}
                  className="w-full"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  批量生成 ({count}个)
                </Button>

                {bulkUuids.length > 0 && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        已生成 {bulkUuids.length} 个
                      </span>
                      <Button
                        variant="outline"
                        onClick={copyAllUuids}
                        size="sm"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        复制全部
                      </Button>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md max-h-32 overflow-y-auto">
                      <div className="space-y-1">
                        {bulkUuids.slice(0, 3).map((uuidItem, index) => (
                          <div
                            key={index}
                            className="font-mono text-xs break-all"
                          >
                            {uuidItem}
                          </div>
                        ))}
                        {bulkUuids.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            ...还有 {bulkUuids.length - 3} 个
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 批量结果详情 */}
      {bulkUuids.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>批量结果详情</CardTitle>
            <CardDescription>查看和管理批量生成的 UUID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {bulkUuids.map((uuidItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between group hover:bg-muted/50 rounded-md p-2 transition-colors"
                >
                  <span className="flex-1 font-mono text-sm break-all mr-2">
                    {uuidItem}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(uuidItem, `UUID ${index + 1}`)
                    }
                    className="h-7 w-7 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          onClick={clearAll}
          size="lg"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          清空全部
        </Button>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">UUID 格式</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>标准格式：</strong>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</li>
                <li>• <strong>无连字符：</strong>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</li>
                <li>• <strong>版本：</strong>当前生成 UUID v4</li>
                <li>• <strong>变体：</strong>RFC 4122 标准</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">应用场景</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 数据库主键</li>
                <li>• API 请求标识</li>
                <li>• 会话 ID</li>
                <li>• 文件名唯一标识</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <AlertTitle>技术说明</AlertTitle>
            <AlertDescription>
              UUID 是 128 位全局唯一标识符，即使在分布式系统中也能保证极高的唯一性。当前生成的是标准 UUID v4 版本，使用加密安全的随机数生成器。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
