"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [error, setError] = useState("");

  const validateInput = (input) => {
    if (!input.trim()) {
      setError("请输入要生成二维码的内容");
      return false;
    }
    if (input.length > 1000) {
      setError("内容长度不能超过1000个字符");
      return false;
    }
    setError("");
    return true;
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value) {
      validateInput(value);
    } else {
      setError("");
    }
  };

  const clearAll = () => {
    setText("");
    setError("");
  };

  const downloadQR = () => {
    if (!validateInput(text)) return;

    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const exampleUrls = [
    { label: "百度", url: "https://www.baidu.com" },
    { label: "GitHub", url: "https://github.com" },
    { label: "微信", url: "https://weixin.qq.com" },
    { label: "淘宝", url: "https://www.taobao.com" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          二维码生成
        </h2>
        <p className="text-gray-600">将链接或文本转换为二维码</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 输入区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            输入内容
          </label>
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="输入链接或文本..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
          />

          {/* 大小选择 */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              二维码大小
            </label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-200 rounded-lg bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={128}>小 (128x128)</option>
              <option value={256}>中 (256x256)</option>
              <option value={512}>大 (512x512)</option>
            </select>
          </div>
        </div>

        {/* 输出区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            二维码预览
          </label>
          <div className="flex justify-center items-center min-h-64">
            {text && !error ? (
              <QRCodeCanvas
                value={text}
                size={size}
                level="M"
                includeMargin={true}
                className="border border-gray-200 rounded-lg"
              />
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">📱</div>
                <p>输入内容后二维码将显示在这里</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 示例按钮 */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          示例链接
        </label>
        <div className="flex flex-wrap gap-3">
          {exampleUrls.map((example, index) => (
            <button
              key={index}
              onClick={() => setText(example.url)}
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
          onClick={clearAll}
          className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🗑️ 清空
        </button>
        {text && !error && (
          <button
            onClick={downloadQR}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            📥 下载二维码
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
            <h4 className="font-semibold mb-2">支持内容类型</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 网址链接 (http/https)</li>
              <li>• 纯文本内容</li>
              <li>• 联系方式</li>
              <li>• WiFi信息</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">功能特性</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 实时预览</li>
              <li>• 可调节大小</li>
              <li>• 高质量下载</li>
              <li>• 错误容错</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
