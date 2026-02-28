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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, RefreshCw, Clock, Zap, Globe, Home, Server } from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function TimestampGenerator() {
  const [isClient, setIsClient] = useState(typeof window !== "undefined");
  const [currentTime, setCurrentTime] = useState(new Date());

  const { copy } = useCopyClipboard();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formats = [
    {
      name: "Unix时间戳（秒）",
      value: isClient ? Math.floor(currentTime.getTime() / 1000) : 0,
      description: "从1970-01-01 00:00:00 UTC开始的秒数",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Unix时间戳（毫秒）",
      value: isClient ? currentTime.getTime() : 0,
      description: "从1970-01-01 00:00:00 UTC开始的毫秒数",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      name: "ISO 8601",
      value: isClient ? currentTime.toISOString() : "",
      description: "国际标准时间格式",
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-50",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      name: "本地时间",
      value: isClient ? currentTime.toLocaleString("zh-CN") : "",
      description: "本地化时间显示",
      icon: Home,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      badgeColor: "bg-purple-100 text-purple-800",
    },
    {
      name: "UTC时间",
      value: isClient ? currentTime.toUTCString() : "",
      description: "UTC标准时间",
      icon: Server,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      badgeColor: "bg-orange-100 text-orange-800",
    },
  ];

  const updateTime = () => {
    setCurrentTime(new Date());
    toast.success("时间已刷新");
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">时间戳生成器</h1>
        <p className="text-muted-foreground">
          实时生成多种格式的时间戳，支持一键复制
        </p>
      </div>

      {/* 主要工作区 */}
      <Card>
        <CardHeader>
          <CardTitle>时间戳格式</CardTitle>
          <CardDescription>实时生成多种格式的时间戳</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formats.map((format, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-md ${format.bgColor} flex items-center justify-center`}>
                        <format.icon className={`w-5 h-5 ${format.color}`} />
                      </div>
                      <div>
                        <div className="font-semibold">{format.name}</div>
                        <div className="text-xs text-muted-foreground">{format.description}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-md mb-3">
                    <code className="font-mono text-sm break-all">
                      {isClient ? format.value : "加载中..."}
                    </code>
                  </div>
                  
                  {isClient && (
                    <Button
                      variant="outline"
                      onClick={() => copy(format.value, format.name)}
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      复制
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <AlertTitle>自动更新</AlertTitle>
            <AlertDescription>
              时间戳每秒自动更新。当前时间：{isClient ? currentTime.toLocaleString("zh-CN") : "加载中..."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-md border">
              <h4 className="font-semibold mb-2">Unix 时间戳</h4>
              <p className="text-muted-foreground text-sm">
                编程和 API 调用常用格式，精确到秒或毫秒
              </p>
            </div>
            
            <div className="p-4 rounded-md border">
              <h4 className="font-semibold mb-2">ISO 8601</h4>
              <p className="text-muted-foreground text-sm">
                国际标准时间格式，数据库存储的理想选择
              </p>
            </div>
            
            <div className="p-4 rounded-md border">
              <h4 className="font-semibold mb-2">本地时间</h4>
              <p className="text-muted-foreground text-sm">
                用户界面显示的友好格式，直观易懂
              </p>
            </div>
          </div>
          
          <Alert>
            <AlertTitle>使用提示</AlertTitle>
            <AlertDescription className="mt-2 space-y-1">
              <p>• Unix 时间戳（秒）适用于大多数编程语言和 API</p>
              <p>• Unix 时间戳（毫秒）适用于 JavaScript 和 Java 等语言</p>
              <p>• ISO 8601 格式被国际标准组织推荐用于数据交换</p>
              <p>• 所有时间戳都会实时自动更新，保持与服务器时间同步</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
