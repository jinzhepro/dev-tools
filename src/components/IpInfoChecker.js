"use client";

import { useState, useEffect } from "react";

export default function IpInfoChecker() {
  const [currentIpInfo, setCurrentIpInfo] = useState(null);
  const [searchIp, setSearchIp] = useState("");
  const [searchedIpInfo, setSearchedIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState("");

  // 获取当前IP信息
  const fetchCurrentIpInfo = async () => {
    setLoading(true);
    setError("");
    try {
      // 使用免费的IP信息API服务
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) {
        throw new Error("无法获取IP信息");
      }
      const data = await response.json();
      setCurrentIpInfo(data);
    } catch (err) {
      setError(err.message);
      console.error("获取IP信息失败:", err);
    } finally {
      setLoading(false);
    }
  };

  // 搜索指定IP信息
  const searchIpInfo = async () => {
    if (!searchIp.trim()) {
      setError("请输入IP地址");
      return;
    }

    // 简单的IP格式验证
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(searchIp)) {
      setError("请输入有效的IP地址");
      return;
    }

    setLoadingSearch(true);
    setError("");
    setSearchedIpInfo(null);

    try {
      const response = await fetch(`https://ipapi.co/${searchIp}/json/`);
      if (!response.ok) {
        throw new Error("无法获取该IP的信息");
      }
      const data = await response.json();

      // 检查API是否返回错误信息
      if (data.error) {
        throw new Error(data.reason || "无法获取该IP的信息");
      }

      setSearchedIpInfo(data);
    } catch (err) {
      setError(err.message);
      console.error("搜索IP信息失败:", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  // 复制IP信息到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // 获取示例IP
  const exampleIps = [
    { label: "Google DNS", ip: "8.8.8.8", desc: "Google公共DNS" },
    { label: "Cloudflare", ip: "1.1.1.1", desc: "Cloudflare公共DNS" },
    { label: "百度", ip: "180.76.76.76", desc: "百度DNS" },
  ];

  useEffect(() => {
    // 页面加载时自动获取当前IP信息
    fetchCurrentIpInfo();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          IP地址查询
        </h2>
        <p className="text-gray-600">查询IP地址信息和地理位置</p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 当前IP信息 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">当前IP信息</h3>
            <button
              onClick={fetchCurrentIpInfo}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-md disabled:opacity-50"
            >
              {loading ? "🔄 查询中..." : "🔍 刷新"}
            </button>
          </div>

          {currentIpInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-blue-600">
                    IP地址
                  </div>
                  <div className="font-mono text-sm text-blue-800">
                    {currentIpInfo.ip}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-green-600">
                    国家/地区
                  </div>
                  <div className="text-sm text-green-800">
                    {currentIpInfo.country_name || currentIpInfo.country}
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-purple-600">
                    城市
                  </div>
                  <div className="text-sm text-purple-800">
                    {currentIpInfo.city}
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-xs font-medium text-orange-600">ISP</div>
                  <div className="text-sm text-orange-800">
                    {currentIpInfo.org}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    经纬度
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${currentIpInfo.latitude}, ${currentIpInfo.longitude}`
                      )
                    }
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    📋 复制
                  </button>
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  {currentIpInfo.latitude}, {currentIpInfo.longitude}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-700">时区</div>
                  <div className="text-gray-600">{currentIpInfo.timezone}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-medium text-gray-700">邮编</div>
                  <div className="text-gray-600">{currentIpInfo.postal}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* IP搜索 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
          <h3 className="text-xl font-bold text-gray-900 mb-4">查询指定IP</h3>

          <div className="mb-4">
            <input
              type="text"
              value={searchIp}
              onChange={(e) => setSearchIp(e.target.value)}
              placeholder="输入IP地址，如：8.8.8.8"
              className="w-full p-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && searchIpInfo()}
            />
          </div>

          <button
            onClick={searchIpInfo}
            disabled={loadingSearch || !searchIp.trim()}
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium disabled:opacity-50"
          >
            {loadingSearch ? "🔄 查询中..." : "🔍 查询IP信息"}
          </button>

          {searchedIpInfo && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  查询结果
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(searchedIpInfo, null, 2))
                  }
                  className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  📋 复制JSON
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Object.entries(searchedIpInfo).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm"
                      >
                        <div className="flex-1">
                          <span className="font-medium text-gray-700 mr-2">
                            {key}:
                          </span>
                          <span className="text-gray-600">{String(value)}</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(String(value))}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          📋
                        </button>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 示例IP */}
      <div className="mb-8">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          示例IP地址
        </label>
        <div className="flex flex-wrap gap-3">
          {exampleIps.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setSearchIp(example.ip);
                setSearchedIpInfo(null);
                setError("");
              }}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              {example.label}: {example.ip}
              <div className="text-xs opacity-80">{example.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 使用说明 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-2xl mr-2">📖</span>
          使用说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">功能特点</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 查询当前公网IP地址信息</li>
              <li>• 支持查询任意IP地址详情</li>
              <li>• 显示地理位置和网络信息</li>
              <li>• 一键复制IP地址数据</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">网络诊断</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 网络连通性测试</li>
              <li>• 网络位置分析</li>
              <li>• ISP信息查询</li>
              <li>• 地理定位服务</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
          <p className="text-sm text-gray-700">
            <strong>⚠️ 隐私说明：</strong>
            IP信息查询会向第三方API服务发送请求来获取地理位置和ISP信息。请注意保护您的隐私。
          </p>
        </div>
      </div>
    </div>
  );
}
