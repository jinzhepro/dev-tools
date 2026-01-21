"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories } from "@/data/tools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Wrench, Sparkles, Zap, Code, Palette, Shield, Globe, Key, Image, Lock } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 根据分类返回对应的图标组件
  const getCategoryIcon = (category) => {
    const iconMap = {
      "编码/解码": Code,
      "生成器": Zap,
      "转换": Palette,
      "网络": Globe,
      "安全": Shield,
      "工具": Wrench,
    };
    const Icon = iconMap[category] || Key;
    return <Icon className="w-4 h-4" />;
  };

  // 根据分类返回对应的颜色
  const getCategoryColor = (category) => {
    const colorMap = {
      "编码/解码": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "生成器": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "转换": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "网络": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "安全": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "工具": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };
    return colorMap[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "全部" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10">
        {/* 标题区域 - 增强视觉层次 */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <Sparkles className="relative w-10 h-10 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              开发工具集
            </h1>
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
              <Sparkles className="relative w-10 h-10 text-purple-600 animate-pulse delay-75" />
            </div>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
            常用开发工具，一站式解决
            <span className="block mt-2 text-lg text-muted-foreground/70">
              让开发更高效，让生活更美好
            </span>
          </p>
        </div>

        {/* 搜索框 - 增强交互体验 */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="搜索工具... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-2 border-border/50 focus:border-primary rounded-xl shadow-lg group-focus-within:shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* 分类按钮 - 增强视觉反馈 */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="lg"
              className={`
                transition-all duration-300 px-6 py-3 text-base font-medium rounded-full
                ${selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                  : "hover:bg-accent hover:scale-105 hover:shadow-md"
                }
              `}
            >
              {category !== "全部" && getCategoryIcon(category)}
              <span className={selectedCategory === category ? "ml-1" : "ml-1"}>{category}</span>
            </Button>
          ))}
        </div>

        {/* 工具网格 - 增强视觉效果 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary/20"
            >
              {/* 装饰性背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* 顶部装饰条 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-start justify-between mb-3">
                  {/* 分类标签 */}
                  <Badge className={`${getCategoryColor(tool.category)} text-xs px-2 py-1 rounded-full`}>
                    {getCategoryIcon(tool.category)}
                    <span className="ml-1">{tool.category}</span>
                  </Badge>
                  {/* 功能图标 */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-600/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-purple-600/20 transition-all duration-300 group-hover:scale-110">
                    {getCategoryIcon(tool.category)}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center gap-2">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 relative z-10">
                <Link href={`/${tool.id}`}>
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-xl py-3 text-base font-medium shadow-lg shadow-primary/10"
                  >
                    <Wrench className="w-5 h-5 mr-2" />
                    开始使用
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态 - 增强视觉体验 */}
        {filteredTools.length === 0 && (
          <Card className="text-center py-20 border-2 border-dashed border-muted-foreground/20">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-muted/50 blur-xl rounded-full" />
                  <Search className="relative w-20 h-20 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-foreground">
                没有找到匹配的工具
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
                尝试调整搜索关键词或选择不同的分类筛选
              </CardDescription>
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("全部");
                }}
                className="px-8 py-3 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                重置筛选
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 底部装饰 */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground/60">
            精心打造 · 持续更新 · 开源免费
          </p>
        </div>
      </div>
    </div>
  );
}
