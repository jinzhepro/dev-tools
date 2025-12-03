"use client";

import { useState, useEffect } from "react";

export default function TimestampGenerator() {
  const [isClient, setIsClient] = useState(typeof window !== 'undefined');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formats = [
    {
      name: "Unix时间戳（秒）",
      value: isClient ? Math.floor(currentTime.getTime() / 1000) : 0,
      description: "从1970-01-01 00:00:00 UTC开始的秒数",
      icon: "⏰",
    },
    {
      name: "Unix时间戳（毫秒）",
      value: isClient ? currentTime.getTime() : 0,
      description: "从1970-01-01 00:00:00 UTC开始的毫秒数",
      icon: "⚡",
    },
    {
      name: "ISO 8601",
      value: isClient ? currentTime.toISOString() : "",
      description: "国际标准时间格式",
      icon: "🌍",
    },
    {
      name: "本地时间",
      value: isClient ? currentTime.toLocaleString("zh-CN") : "",
      description: "本地化时间显示",
      icon: "🏠",
    },
    {
      name: "UTC时间",
      value: isClient ? currentTime.toUTCString() : "",
      description: "UTC标准时间",
      icon: "🕐",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          时间戳生成
        </h2>
        <p className="text-gray-600">实时生成多种格式的时间戳</p>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={updateTime}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🔄 刷新时间
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formats.map((format, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-white/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{format.icon}</span>
              <h3 className="text-lg font-bold text-gray-900">{format.name}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {format.description}
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl font-mono text-sm break-all border border-gray-200">
              {isClient ? format.value : "加载中..."}
            </div>
            {isClient && (
              <button
                onClick={() => navigator.clipboard.writeText(format.value)}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md font-medium"
              >
                📋 复制
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Unix时间戳</h4>
              <p className="text-sm text-gray-600">编程和API调用常用格式</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">ISO 8601</h4>
              <p className="text-sm text-gray-600">数据库存储的理想格式</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">本地时间</h4>
              <p className="text-sm text-gray-600">用户界面显示的友好格式</p>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>提示：</strong>
            时间戳会每秒自动更新，您也可以手动点击刷新按钮获取最新时间。
          </p>
        </div>
      </div>
    </div>
  );
}
