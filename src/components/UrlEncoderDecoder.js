"use client";

import { useState } from "react";

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState("encode"); // 'encode' or 'decode'
  const [error, setError] = useState("");

  const encodeToUrl = (text) => {
    try {
      return encodeURIComponent(text);
    } catch (err) {
      throw new Error("编码失败：" + err.message);
    }
  };

  const decodeFromUrl = (urlText) => {
    try {
      return decodeURIComponent(urlText);
    } catch (err) {
      throw new Error("解码失败：无效的URL编码格式");
    }
  };

  const processText = () => {
    if (!input.trim()) {
      setError("请输入要处理的内容");
      setOutput("");
      return;
    }

    try {
      let result = "";
      if (operation === "encode") {
        result = encodeToUrl(input);
      } else {
        result = decodeFromUrl(input);
      }
      setOutput(result);
      setError("");
    } catch (err) {
      setError(err.message);
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

  const exampleTexts = [
    { label: "普通文本", text: "Hello World" },
    { label: "中文内容", text: "你好，世界！这是一个中文测试。" },
    { label: "URL参数", text: "name=张三&age=25&city=北京" },
    { label: "特殊字符", text: "Special chars: @#$%^&*()_+{}|:<>?[]\\;',./" },
    { label: "带空格文本", text: "Hello World! 这是一个带空格的测试。" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          URL编码/解码
        </h2>
        <p className="text-gray-600">将文本转换为URL编码格式或从URL编码解码</p>
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
            placeholder="输入要编码或解码的文本..."
            className="w-full h-40 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
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
            className="w-full h-40 p-4 border border-gray-200 rounded-xl bg-gray-50/50 backdrop-blur-sm font-mono text-sm resize-none"
          />
        </div>
      </div>

      {/* 操作选择 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          操作类型
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="encode"
              checked={operation === "encode"}
              onChange={(e) => setOperation(e.target.value)}
              className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
            />
            <span className="text-gray-700 font-medium">编码为URL</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="decode"
              checked={operation === "decode"}
              onChange={(e) => setOperation(e.target.value)}
              className="mr-3 w-4 h-4 text-green-600 focus:ring-green-500"
            />
            <span className="text-gray-700 font-medium">从URL解码</span>
          </label>
        </div>
      </div>

      {/* 示例按钮 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          示例文本
        </label>
        <div className="flex flex-wrap gap-3">
          {exampleTexts.map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example.text)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              {example.label}
            </button>
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
          onClick={processText}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🚀 {operation === "encode" ? "编码" : "解码"}
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
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">URL编码</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 将特殊字符转换为%开头的编码</li>
              <li>• 支持中文和Unicode字符</li>
              <li>• 确保URL参数的安全性</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">URL解码</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 将URL编码格式还原为原始文本</li>
              <li>• 处理各种特殊字符和中文</li>
              <li>• 验证URL编码格式有效性</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <p className="text-sm text-gray-700">
            <strong>提示：</strong>
            URL编码是Web开发中的常用技术，确保特殊字符在URL中正确传输，如空格、中文、符号等。
          </p>
        </div>
      </div>
    </div>
  );
}