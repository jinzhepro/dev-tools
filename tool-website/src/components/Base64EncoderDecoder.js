"use client";

import { useState } from "react";

export default function Base64EncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [operation, setOperation] = useState("encode"); // 'encode' or 'decode'
  const [error, setError] = useState("");

  const encodeToBase64 = (text) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (err) {
      throw new Error("编码失败：" + err.message);
    }
  };

  const decodeFromBase64 = (base64Text) => {
    try {
      return decodeURIComponent(escape(atob(base64Text)));
    } catch (err) {
      throw new Error("解码失败：无效的Base64格式");
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
        result = encodeToBase64(input);
      } else {
        result = decodeFromBase64(input);
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
    { label: "Hello World", text: "Hello World" },
    { label: "中文测试", text: "你好，世界！这是一个中文测试。" },
    { label: "JSON数据", text: '{"name":"张三","age":25,"city":"北京"}' },
    { label: "特殊字符", text: "Special chars: @#$%^&*()_+{}|:<>?[]\\;',./" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Base64编码/解码
        </h2>
        <p className="text-gray-600">将文本转换为Base64格式或从Base64解码</p>
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
            className="w-full h-40 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
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
              className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">编码为Base64</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="decode"
              checked={operation === "decode"}
              onChange={(e) => setOperation(e.target.value)}
              className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">从Base64解码</span>
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
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md"
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
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
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
            <h4 className="font-semibold mb-2">Base64编码</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 将文本转换为Base64格式</li>
              <li>• 支持中文和特殊字符</li>
              <li>• 常用于数据传输和存储</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Base64解码</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 将Base64格式还原为原始文本</li>
              <li>• 自动处理UTF-8编码</li>
              <li>• 验证Base64格式有效性</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>提示：</strong>
            Base64编码常用于在不支持二进制数据的环境中传输数据，如电子邮件附件、HTTP请求等。
          </p>
        </div>
      </div>
    </div>
  );
}
