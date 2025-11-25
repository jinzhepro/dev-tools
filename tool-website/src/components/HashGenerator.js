"use client";

import { useState } from "react";
import MD5 from "crypto-js/md5";
import SHA256 from "crypto-js/sha256";
import SHA1 from "crypto-js/sha1";
import SHA512 from "crypto-js/sha512";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({});
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([
    "MD5",
    "SHA256",
  ]);

  const algorithms = [
    { name: "MD5", description: "128位哈希，常用于文件校验" },
    { name: "SHA1", description: "160位哈希，已被弃用但仍常用" },
    { name: "SHA256", description: "256位哈希，安全性高" },
    { name: "SHA512", description: "512位哈希，最高安全性" },
  ];

  const generateHashes = () => {
    if (!input.trim()) {
      setResults({});
      return;
    }

    const newResults = {};

    selectedAlgorithms.forEach((algo) => {
      switch (algo) {
        case "MD5":
          newResults.MD5 = MD5(input).toString();
          break;
        case "SHA1":
          newResults.SHA1 = SHA1(input).toString();
          break;
        case "SHA256":
          newResults.SHA256 = SHA256(input).toString();
          break;
        case "SHA512":
          newResults.SHA512 = SHA512(input).toString();
          break;
        default:
          break;
      }
    });

    setResults(newResults);
  };

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithms((prev) =>
      prev.includes(algorithm)
        ? prev.filter((a) => a !== algorithm)
        : [...prev, algorithm]
    );
  };

  const clearAll = () => {
    setInput("");
    setResults({});
  };

  const copyToClipboard = (hash) => {
    navigator.clipboard.writeText(hash);
  };

  const exampleTexts = [
    { label: "Hello World", text: "Hello World" },
    { label: "密码示例", text: "MySecurePassword123!" },
    { label: "邮箱地址", text: "user@example.com" },
    { label: "JSON数据", text: '{"user":"admin","pass":"secret"}' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Hash生成器
        </h2>
        <p className="text-gray-600">生成MD5、SHA1、SHA256、SHA512哈希值</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 输入区域 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            输入文本
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入要生成哈希的文本..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
          />
        </div>

        {/* 哈希算法选择 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            选择算法
          </label>
          <div className="space-y-3">
            {algorithms.map((algo) => (
              <label key={algo.name} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedAlgorithms.includes(algo.name)}
                  onChange={() => handleAlgorithmChange(algo.name)}
                  className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                />
                <div>
                  <div className="font-medium text-gray-900">{algo.name}</div>
                  <div className="text-sm text-gray-600">
                    {algo.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
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

      {/* 按钮 */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={generateHashes}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🔐 生成哈希
        </button>
        <button
          onClick={clearAll}
          className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🗑️ 清空
        </button>
      </div>

      {/* 结果显示 */}
      {Object.keys(results).length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">哈希结果</h3>
          {Object.entries(results).map(([algorithm, hash]) => (
            <div
              key={algorithm}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-900">{algorithm}</h4>
                <button
                  onClick={() => copyToClipboard(hash)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  📋 复制
                </button>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl font-mono text-sm break-all border border-gray-200">
                {hash}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">🔒</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">哈希算法</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>MD5：</strong>快速但安全性较低
              </li>
              <li>
                • <strong>SHA1：</strong>已被弃用，不推荐使用
              </li>
              <li>
                • <strong>SHA256：</strong>安全性高，推荐使用
              </li>
              <li>
                • <strong>SHA512：</strong>最高安全性，计算较慢
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">应用场景</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 文件完整性校验</li>
              <li>• 密码存储（加盐）</li>
              <li>• 数字签名</li>
              <li>• 数据完整性验证</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>⚠️ 安全提醒：</strong>
            哈希函数是单向的，无法从哈希值还原原始数据。密码存储时请使用加盐哈希，不要直接存储明文密码。
          </p>
        </div>
      </div>
    </div>
  );
}
