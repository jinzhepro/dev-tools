"use client";

import { useState } from "react";

export default function JsonConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [conversionType, setConversionType] = useState("compress");
  const [error, setError] = useState("");

  const convertJson = () => {
    try {
      let result = "";

      switch (conversionType) {
        case "compress":
          const parsed = JSON.parse(input);
          result = JSON.stringify(parsed);
          break;

        case "escape":
          result = JSON.stringify(input);
          break;

        case "unescape":
          result = JSON.parse(input);
          break;

        case "format":
          const formatted = JSON.parse(input);
          result = JSON.stringify(formatted, null, 2);
          break;

        default:
          throw new Error("未知的转换类型");
      }

      setOutput(result);
      setError("");
    } catch (err) {
      setError("转换失败：" + err.message);
      setOutput("");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          JSON转换
        </h2>
        <p className="text-gray-600">JSON压缩、格式化、转义和反转义工具</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 输入区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            输入内容
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入JSON内容..."
            className="w-full h-80 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none transition-all duration-200"
          />
        </div>

        {/* 输出区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            输出结果
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 p-4 border border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm font-mono text-sm resize-none"
          />
        </div>
      </div>

      {/* 示例按钮 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          示例数据
        </label>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              setInput(
                '{"name":"张三","age":25,"city":"北京","hobbies":["阅读","编程","旅行"]}'
              )
            }
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            JSON对象
          </button>
          <button
            onClick={() =>
              setInput(
                '{\n  "name": "张三",\n  "age": 25,\n  "city": "北京",\n  "hobbies": ["阅读", "编程", "旅行"]\n}'
              )
            }
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            格式化JSON
          </button>
          <button
            onClick={() => setInput("Hello \"World\" & 'Test'")}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            字符串
          </button>
          <button
            onClick={() => setInput('"Hello \\"World\\" & \'Test\'"')}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            转义字符串
          </button>
        </div>
      </div>

      {/* 转换类型选择 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          转换类型
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "compress", label: "压缩JSON", desc: "移除空格和换行" },
            { value: "format", label: "格式化JSON", desc: "美化显示" },
            { value: "escape", label: "转义字符串", desc: "JSON.stringify" },
            { value: "unescape", label: "反转义字符串", desc: "JSON.parse" },
          ].map((type) => (
            <label key={type.value} className="relative">
              <input
                type="radio"
                value={type.value}
                checked={conversionType === type.value}
                onChange={(e) => setConversionType(e.target.value)}
                className="sr-only peer"
              />
              <div className="p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-lg hover:shadow-md">
                <div className="font-semibold text-gray-900 mb-1">
                  {type.label}
                </div>
                <div className="text-sm text-gray-600">{type.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* 按钮 */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={convertJson}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🚀 转换
        </button>
        <button
          onClick={clearAll}
          className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🗑️ 清空
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            📋 复制结果
          </button>
        )}
      </div>

      <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          💡 使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">压缩JSON</h4>
            <p className="text-sm">
              移除所有空格和换行，减小文件大小，适合生产环境
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">格式化JSON</h4>
            <p className="text-sm">添加缩进和换行，提高可读性，方便开发调试</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">转义字符串</h4>
            <p className="text-sm">将字符串转换为JSON格式，处理特殊字符</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">反转义字符串</h4>
            <p className="text-sm">从JSON字符串还原原始内容</p>
          </div>
        </div>
      </div>
    </div>
  );
}
