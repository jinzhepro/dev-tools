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

export default function TimestampGenerator() {
  const [isClient, setIsClient] = useState(typeof window !== "undefined");
  const [currentTime, setCurrentTime] = useState(new Date());

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
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      badgeColor: "bg-yellow-100 text-yellow-800",
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

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`已复制 ${label} 到剪贴板`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            时间戳生成器
          </CardTitle>
          <CardDescription className="text-lg">
            实时生成多种格式的时间戳
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 刷新按钮 */}
      <div className="text-center">
        <Button onClick={updateTime} size="lg" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          刷新时间
        </Button>
      </div>

      {/* 时间格式卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formats.map((format, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${format.bgColor}`}>
                    <format.icon className={`w-5 h-5 ${format.color}`} />
                  </div>
                  <CardTitle className="text-lg">{format.name}</CardTitle>
                </div>
                <Badge variant="secondary" className={format.badgeColor}>
                  {format.icon.name}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {format.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-xl">
                <code className="font-mono text-sm break-all">
                  {isClient ? format.value : "加载中..."}
                </code>
              </div>
              {isClient && (
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(format.value, format.name)}
                  className="w-full gap-2"
                >
                  <Copy className="w-4 h-4" />
                  复制
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">
                  Unix时间戳
                </h4>
                <p className="text-sm text-muted-foreground">
                  编程和API调用常用格式
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">ISO 8601</h4>
                <p className="text-sm text-muted-foreground">
                  数据库存储的理想格式
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">本地时间</h4>
                <p className="text-sm text-muted-foreground">
                  用户界面显示的友好格式
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <Alert>
            <Clock className="w-4 h-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>
              时间戳会每秒自动更新，您也可以手动点击刷新按钮获取最新时间。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
