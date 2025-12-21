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
import { Search, ArrowRight, Wrench, Sparkles } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("全部");

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
        {/* 标题区域 */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              开发工具集
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            常用开发工具，一站式解决
          </p>
        </div>

        {/* 搜索框 */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* 分类按钮 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* 工具网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                      {tool.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="shrink-0 ml-2">
                    {tool.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={`/${tool.id}`}>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    <Wrench className="w-4 h-4 mr-2" />
                    开始使用
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空状态 */}
        {filteredTools.length === 0 && (
          <Card className="text-center py-16">
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Search className="w-16 h-16 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">
                没有找到匹配的工具
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                尝试调整搜索关键词或分类
              </CardDescription>
              <Button
                variant="outline"
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
      </div>
    </div>
  );
}
