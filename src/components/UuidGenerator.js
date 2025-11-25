"use client";

import { useState } from "react";

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("");
  const [bulkUuids, setBulkUuids] = useState([]);
  const [count, setCount] = useState(5);
  const [error, setError] = useState("");

  // 生成单个UUID
  const generateUuid = () => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      const newUuid = crypto.randomUUID();
      setUuid(newUuid);
      setError("");
    } else {
      // 降级到手动实现（浏览器兼容）
      const newUuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      setUuid(newUuid);
      setError("");
    }
  };

  // 批量生成UUID
  const generateBulkUuids = () => {
    if (count < 1 || count > 100) {
      setError("数量必须在1-100之间");
      return;
    }

    const newUuids = [];
    for (let i = 0; i < count; i++) {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        newUuids.push(
          "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setBulkUuids(newUuids);
    setError("");
  };

  // 复制到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // 可以添加一个简单的提示
    });
  };

  // 清空所有
  const clearAll = () => {
    setUuid("");
    setBulkUuids([]);
    setError("");
  };

  // 复制所有UUID
  const copyAllUuids = () => {
    const allUuids = [uuid, ...bulkUuids].filter(Boolean).join("\n");
    copyToClipboard(allUuids);
  };

  const getUuidVersion = (uuidString) => {
    if (!uuidString) return "";
    // UUID v4 的版本信息在第13位
    const version = uuidString.charAt(14);
    return `v${version}`;
  };

  const getUuidVariant = (uuidString) => {
    if (!uuidString) return "";
    // 变体在第19位
    const variant = uuidString.charAt(19);
    if (
      variant === "8" ||
      variant === "9" ||
      variant === "a" ||
      variant === "b"
    ) {
      return "RFC 4122";
    }
    return "Unknown";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          UUID生成器
        </h2>
        <p className="text-gray-600">
          生成通用唯一标识符（UUID），支持批量生成
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 单个UUID生成 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">单个UUID</h3>
          <button
            onClick={generateUuid}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium mb-4"
          >
            🎲 生成UUID
          </button>

          {uuid && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    标准格式
                  </span>
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    📋 复制
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-gray-900">
                  {uuid}
                </div>
              </div>

              {/* UUID信息 */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800">版本</div>
                  <div className="text-blue-600">{getUuidVersion(uuid)}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-800">变体</div>
                  <div className="text-green-600">{getUuidVariant(uuid)}</div>
                </div>
              </div>

              {/* 无连字符格式 */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    无连字符
                  </span>
                  <button
                    onClick={() => copyToClipboard(uuid.replace(/-/g, ""))}
                    className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    📋 复制
                  </button>
                </div>
                <div className="font-mono text-sm break-all text-gray-900">
                  {uuid.replace(/-/g, "")}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 批量UUID生成 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">批量生成</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生成数量 (1-100)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={generateBulkUuids}
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium mb-4"
          >
            🔢 批量生成 ({count}个)
          </button>

          {bulkUuids.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  批量结果 ({bulkUuids.length}个)
                </span>
                <button
                  onClick={copyAllUuids}
                  className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  📋 复制全部
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                <div className="font-mono text-xs space-y-1">
                  {bulkUuids.map((uuidItem, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between group hover:bg-white/50 rounded p-1"
                    >
                      <span className="flex-1 break-all">{uuidItem}</span>
                      <button
                        onClick={() => copyToClipboard(uuidItem)}
                        className="opacity-0 group-hover:opacity-100 px-2 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500 transition-all"
                      >
                        📋
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button
          onClick={clearAll}
          className="px-8 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
        >
          🗑️ 清空全部
        </button>
      </div>

      {/* 使用说明 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">📖</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">UUID格式</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>标准格式：</strong>
                xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
              </li>
              <li>
                • <strong>无连字符：</strong>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
              </li>
              <li>
                • <strong>版本：</strong>当前生成UUID v4
              </li>
              <li>
                • <strong>变体：</strong>RFC 4122标准
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">应用场景</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 数据库主键</li>
              <li>• API请求标识</li>
              <li>• 会话ID</li>
              <li>• 文件名唯一标识</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 提示：</strong>
            UUID是128位全局唯一标识符，即使在分布式系统中也能保证极高的唯一性。当前生成的是标准UUID
            v4版本。
          </p>
        </div>
      </div>
    </div>
  );
}
