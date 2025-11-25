"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, categories } from "@/data/tools";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            开发工具集
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            常用开发工具，一站式解决
          </p>
        </header>

        {/* 搜索框 */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* 分类按钮 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 工具网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/${tool.id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 border border-white/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    {tool.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-blue-500 group-hover:text-purple-500 transition-colors">
                <span className="text-sm font-medium mr-2">开始使用</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              没有找到匹配的工具
            </h3>
            <p className="text-gray-500">尝试调整搜索关键词或分类</p>
          </div>
        )}
      </div>
    </div>
  );
}
