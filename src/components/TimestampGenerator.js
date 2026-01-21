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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10 relative z-10">
        {/* 标题区域 - 增强视觉层次 */}
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center px-0 space-y-6">
            {/* 装饰性图标 */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg shadow-green-500/25 animate-float">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                时间戳生成器
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                实时生成多种格式的时间戳，支持一键复制
              </p>
            </div>
            
            {/* 刷新按钮 */}
            <div className="flex justify-center">
              <Button 
                onClick={updateTime} 
                size="lg" 
                className="px-8 rounded-full shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5 mr-2 animate-spin-slow" />
                刷新时间
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* 时间戳工作台 - 增强视觉效果 */}
        <Card className="relative overflow-hidden border-2 border-transparent hover:border-green-500/20 transition-all duration-500">
          {/* 装饰性顶部条 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-600" />
          
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-50" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-600/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <span>时间戳生成工作台</span>
            </CardTitle>
            <CardDescription className="text-base">
              实时生成多种格式的时间戳，支持一键复制
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8 relative z-10">
            {/* 时间格式结果 - 增强卡片设计 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formats.map((format, index) => (
                <Card 
                  key={index} 
                  className="group border-2 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${format.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <format.icon className={`w-6 h-6 ${format.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-base">{format.name}</div>
                          <div className="text-xs text-muted-foreground">{format.description}</div>
                        </div>
                      </div>
                      <Badge className={`${format.badgeColor} text-xs`}>
                        {format.name.split('（')[0]}
                      </Badge>
                    </div>
                    
                    <div className="bg-gradient-to-br from-muted/50 to-muted rounded-xl p-4 mb-4 group-hover:from-muted group-hover:to-muted/70 transition-all duration-300">
                      <code className="font-mono text-sm break-all leading-relaxed">
                        {isClient ? format.value : (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            加载中...
                          </span>
                        )}
                      </code>
                    </div>
                    
                    {isClient && (
                      <Button
                        variant="outline"
                        onClick={() => copy(format.value, format.name)}
                        className="w-full gap-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Copy className="w-4 h-4" />
                        复制{format.name.split('（')[0]}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 自动刷新说明 */}
            <Alert className="bg-green-500/5 border-2 border-green-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <AlertTitle className="text-lg font-semibold">⏱️ 自动更新</AlertTitle>
                  <AlertDescription className="text-base mt-1">
                    时间戳每秒自动更新，您也可以手动点击刷新按钮获取最新时间。
                    当前时间: <code className="font-mono text-primary">{isClient ? currentTime.toLocaleString("zh-CN") : "加载中..."}</code>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </CardContent>
        </Card>

        {/* 使用说明 - 增强设计感 */}
        <Card className="relative overflow-hidden border-2 border-border/50 hover:border-green-500/20 transition-all duration-500">
          {/* 装饰性背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-transparent to-transparent" />
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-blue-600/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <span>使用说明</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8 relative z-10">
            {/* 功能说明网格 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-green-500/5 transition-all duration-300 hover:shadow-md group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Unix时间戳</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      编程和API调用常用格式，精确到秒或毫秒
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-green-500/5 transition-all duration-300 hover:shadow-md group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">ISO 8601</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      国际标准时间格式，数据库存储的理想选择
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-border/50 bg-background/50 hover:bg-purple-500/5 transition-all duration-300 hover:shadow-md group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors">
                    <Home className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">本地时间</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      用户界面显示的友好格式，直观易懂
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* 提示信息 */}
            <Alert className="bg-primary/5 border-2 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <AlertTitle className="text-lg font-semibold">💡 使用提示</AlertTitle>
                  <AlertDescription className="text-base mt-2 space-y-2">
                    <p>• Unix时间戳（秒）适用于大多数编程语言和API</p>
                    <p>• Unix时间戳（毫秒）适用于JavaScript和Java等语言</p>
                    <p>• ISO 8601格式被国际标准组织推荐用于数据交换</p>
                    <p>• 所有时间戳都会实时自动更新，保持与服务器时间同步</p>
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </CardContent>
        </Card>

        {/* 底部装饰 */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground/60">
            实时更新 · 多格式支持 · 一键复制
          </p>
        </div>
      </div>
    </div>
  );
}
