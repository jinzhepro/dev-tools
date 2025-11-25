"use client";

import { useState, useEffect, useMemo } from "react";

export default function Geocoder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reverseLat, setReverseLat] = useState("");
  const [reverseLon, setReverseLon] = useState("");
  const [reverseResult, setReverseResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  // 示例地址
  const exampleAddresses = [
    { label: "北京天安门", query: "天安门,北京" },
    { label: "纽约时代广场", query: "Times Square, New York" },
    { label: "埃菲尔铁塔", query: "Eiffel Tower, Paris" },
    { label: "长城", query: "Great Wall, China" },
    { label: "故宫博物院", query: "故宫博物院,北京" },
  ];

  // 地理编码搜索
  const searchGeocoding = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Nominatim Search API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=10&q=${encodeURIComponent(
          query
        )}`
      );

      if (!response.ok) {
        throw new Error("地理编码请求失败");
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 反向地理编码
  const reverseGeocoding = async (lat, lon) => {
    if (!lat || !lon) {
      setReverseResult(null);
      return;
    }

    setReverseLoading(true);
    setError("");

    try {
      // 验证坐标范围
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);

      if (latNum < -90 || latNum > 90) {
        throw new Error("纬度必须在-90到90之间");
      }
      if (lonNum < -180 || lonNum > 180) {
        throw new Error("经度必须在-180到180之间");
      }

      // Nominatim Reverse API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error("反向地理编码请求失败");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setReverseResult(data);
    } catch (err) {
      setError(err.message);
      setReverseResult(null);
    } finally {
      setReverseLoading(false);
    }
  };

  // 使用防抖的搜索
  const debouncedSearch = useMemo(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchGeocoding(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 处理反向地理编码
  useEffect(() => {
    if (reverseLat && reverseLon) {
      const timer = setTimeout(() => {
        reverseGeocoding(reverseLat, reverseLon);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setReverseResult(null);
    }
  }, [reverseLat, reverseLon]);

  // 复制坐标到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // 在地图中打开（使用Google Maps）
  const openInMap = (lat, lon, address = "") => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}${
      address ? `&queryplace=${encodeURIComponent(address)}` : ""
    }`;
    window.open(url, "_blank");
  };

  // 格式化地址
  const formatAddress = (address) => {
    if (!address) return "";

    const parts = [];
    if (address.house_number) parts.push(address.house_number);
    if (address.road) parts.push(address.road);
    if (address.neighbourhood) parts.push(address.neighbourhood);
    if (address.city || address.town || address.village) {
      parts.push(address.city || address.town || address.village);
    }
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);

    return parts.join(", ");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          地理地址查询
        </h2>
        <p className="text-gray-600">
          基于OpenStreetMap的Nominatim服务，提供地理编码和地址查询
        </p>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* 标签页 */}
      <div className="mb-8">
        <div className="flex justify-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-white/50">
            <button
              onClick={() => setActiveTab("search")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "search"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              📍 地址搜索
            </button>
            <button
              onClick={() => setActiveTab("reverse")}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === "reverse"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              🔄 坐标查询
            </button>
          </div>
        </div>
      </div>

      {/* 地址搜索标签页 */}
      {activeTab === "search" && (
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">地址搜索</h3>
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="输入地址、地名或地标..."
                className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
                  <span className="text-gray-600">搜索中...</span>
                </div>
              </div>
            )}
          </div>

          {/* 示例地址 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              示例地址
            </h4>
            <div className="flex flex-wrap gap-3">
              {exampleAddresses.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(example.query)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>

          {/* 搜索结果 */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                搜索结果 ({searchResults.length})
              </h3>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {formatAddress(result.address) || result.display_name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {result.display_name}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <div className="font-medium text-blue-600">类型</div>
                          <div className="text-blue-800">{result.type}</div>
                        </div>
                        <div className="bg-green-50 p-2 rounded-lg">
                          <div className="font-medium text-green-600">
                            重要性
                          </div>
                          <div className="text-green-800">
                            {result.importance?.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-purple-50 p-2 rounded-lg">
                          <div className="font-medium text-purple-600">
                            纬度
                          </div>
                          <div className="text-purple-800">
                            {parseFloat(result.lat).toFixed(6)}
                          </div>
                        </div>
                        <div className="bg-orange-50 p-2 rounded-lg">
                          <div className="font-medium text-orange-600">
                            经度
                          </div>
                          <div className="text-orange-800">
                            {parseFloat(result.lon).toFixed(6)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() =>
                        copyToClipboard(`${result.lat}, ${result.lon}`)
                      }
                      className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      📋 复制坐标
                    </button>
                    <button
                      onClick={() =>
                        openInMap(result.lat, result.lon, result.display_name)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      🗺️ 在地图中查看
                    </button>
                    <button
                      onClick={() => {
                        setReverseLat(result.lat);
                        setReverseLon(result.lon);
                        setActiveTab("reverse");
                      }}
                      className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                    >
                      🔄 反向查询
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 坐标查询标签页 */}
      {activeTab === "reverse" && (
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              坐标反向查询
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  纬度 (-90 到 90)
                </label>
                <input
                  type="number"
                  step="any"
                  value={reverseLat}
                  onChange={(e) => setReverseLat(e.target.value)}
                  placeholder="例: 39.9042"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  经度 (-180 到 180)
                </label>
                <input
                  type="number"
                  step="any"
                  value={reverseLon}
                  onChange={(e) => setReverseLon(e.target.value)}
                  placeholder="例: 116.4074"
                  className="w-full p-3 border border-gray-200 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {reverseLoading && (
              <div className="text-center py-4">
                <div className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mr-3"></div>
                  <span className="text-gray-600">查询中...</span>
                </div>
              </div>
            )}
          </div>

          {/* 反向查询结果 */}
          {reverseResult && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">地址信息</h3>
                <button
                  onClick={() =>
                    openInMap(
                      reverseLat,
                      reverseLon,
                      reverseResult.display_name
                    )
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  🗺️ 在地图中查看
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                  <div className="font-medium text-gray-700 mb-2">完整地址</div>
                  <div className="text-gray-900">
                    {reverseResult.display_name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {reverseResult.address && (
                      <>
                        {reverseResult.address.house_number && (
                          <div className="flex justify-between bg-blue-50 p-2 rounded-lg">
                            <span className="font-medium text-blue-700">
                              门牌号
                            </span>
                            <span className="text-blue-800">
                              {reverseResult.address.house_number}
                            </span>
                          </div>
                        )}
                        {reverseResult.address.road && (
                          <div className="flex justify-between bg-green-50 p-2 rounded-lg">
                            <span className="font-medium text-green-700">
                              道路
                            </span>
                            <span className="text-green-800">
                              {reverseResult.address.road}
                            </span>
                          </div>
                        )}
                        {reverseResult.address.neighbourhood && (
                          <div className="flex justify-between bg-purple-50 p-2 rounded-lg">
                            <span className="font-medium text-purple-700">
                              街道
                            </span>
                            <span className="text-purple-800">
                              {reverseResult.address.neighbourhood}
                            </span>
                          </div>
                        )}
                        {(reverseResult.address.city ||
                          reverseResult.address.town ||
                          reverseResult.address.village) && (
                          <div className="flex justify-between bg-orange-50 p-2 rounded-lg">
                            <span className="font-medium text-orange-700">
                              城市
                            </span>
                            <span className="text-orange-800">
                              {reverseResult.address.city ||
                                reverseResult.address.town ||
                                reverseResult.address.village}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    {reverseResult.address && (
                      <>
                        {reverseResult.address.state && (
                          <div className="flex justify-between bg-red-50 p-2 rounded-lg">
                            <span className="font-medium text-red-700">
                              州/省
                            </span>
                            <span className="text-red-800">
                              {reverseResult.address.state}
                            </span>
                          </div>
                        )}
                        {reverseResult.address.country && (
                          <div className="flex justify-between bg-yellow-50 p-2 rounded-lg">
                            <span className="font-medium text-yellow-700">
                              国家
                            </span>
                            <span className="text-yellow-800">
                              {reverseResult.address.country}
                            </span>
                          </div>
                        )}
                        {reverseResult.address.postcode && (
                          <div className="flex justify-between bg-indigo-50 p-2 rounded-lg">
                            <span className="font-medium text-indigo-700">
                              邮编
                            </span>
                            <span className="text-indigo-800">
                              {reverseResult.address.postcode}
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    <div className="flex justify-between bg-gray-100 p-2 rounded-lg">
                      <span className="font-medium text-gray-700">坐标</span>
                      <span className="text-gray-800">
                        {reverseLat}, {reverseLon}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      copyToClipboard(`${reverseLat}, ${reverseLon}`)
                    }
                    className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    📋 复制坐标
                  </button>
                  <button
                    onClick={() => copyToClipboard(reverseResult.display_name)}
                    className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    📋 复制地址
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
              <li>
                • <strong>地址搜索：</strong>根据地址、地名或地标查询坐标
              </li>
              <li>
                • <strong>坐标查询：</strong>根据坐标查询详细地址信息
              </li>
              <li>
                • <strong>全球覆盖：</strong>基于OpenStreetMap的全球数据
              </li>
              <li>
                • <strong>实时结果：</strong>直接查询，无需缓存
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">应用场景</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 地址验证和标准化</li>
              <li>• 地图应用开发</li>
              <li>• 物流配送地址解析</li>
              <li>• 地理信息数据处理</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>💡 提示：</strong>
            Nominatim是OpenStreetMap的官方地理编码服务，免费提供全球地址查询服务。请合理使用，避免过于频繁的请求。
          </p>
        </div>
      </div>
    </div>
  );
}
