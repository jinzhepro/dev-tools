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
import { Search, ArrowRight, Wrench, Code, Palette, Shield, Globe, Key, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* 标题 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">
            开发工具集
          </h1>
          <p className="text-lg text-muted-foreground">
            常用开发工具，一站式解决
          </p>
        </div>

        {/* 搜索框 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        {/* 分类按钮 */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              className="rounded-md"
            >
              {category !== "全部" && getCategoryIcon(category)}
              <span className="ml-1">{category}</span>
            </Button>
          ))}
        </div>

        {/* 工具网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={`${getCategoryColor(tool.category)} text-xs`}>
                    {tool.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {tool.name}
                </CardTitle>
                <CardDescription className="text-sm">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Link href={`/${tool.id}`}>
                  <Button 
                    variant="outline"
                    className="w-full"
                  >
                    开始使用
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTools.length === 0 && (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <Search className="w-12 h-12 text-muted-foreground mx-auto" />
              <CardTitle className="text-xl">
                没有找到匹配的工具
              </CardTitle>
              <CardDescription>
                尝试调整搜索关键词或选择不同的分类
              </CardDescription>
              <Button
                variant="default"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("全部");
                }}
              >
                重置筛选
              </Button>
            </CardContent>
          </Card>
        )}

        {/* 底部 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            开源免费
          </p>
        </div>
      </div>
    </div>
  );
}
