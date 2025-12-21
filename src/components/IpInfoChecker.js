"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Globe,
  MapPin,
  Wifi,
  RefreshCw,
  Search,
  AlertCircle,
  Clock,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

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
      toast.success("IP信息获取成功");
    } catch (err) {
      setError(err.message);
      toast.error("获取IP信息失败");
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
      toast.success("IP信息查询成功");
    } catch (err) {
      setError(err.message);
      toast.error("搜索IP信息失败");
      console.error("搜索IP信息失败:", err);
    } finally {
      setLoadingSearch(false);
    }
  };

  // 复制IP信息到剪贴板
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`已复制${label}到剪贴板`);
  };

  // 获取示例IP
  const exampleIps = [
    {
      label: "Google DNS",
      ip: "8.8.8.8",
      desc: "Google公共DNS",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Cloudflare",
      ip: "1.1.1.1",
      desc: "Cloudflare公共DNS",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "百度",
      ip: "180.76.76.76",
      desc: "百度DNS",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  useEffect(() => {
    // 页面加载时自动获取当前IP信息
    fetchCurrentIpInfo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IP地址查询
          </CardTitle>
          <CardDescription className="text-lg">
            查询IP地址信息和地理位置
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 当前IP信息 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                当前IP信息
              </CardTitle>
              <Button
                onClick={fetchCurrentIpInfo}
                disabled={loading}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                刷新
              </Button>
            </div>
            <CardDescription>显示您当前的公网IP信息</CardDescription>
          </CardHeader>
          <CardContent>
            {currentIpInfo ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        IP地址
                      </div>
                      <div className="font-mono text-sm font-semibold">
                        {currentIpInfo.ip}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        国家/地区
                      </div>
                      <div className="text-sm font-semibold">
                        {currentIpInfo.country_name || currentIpInfo.country}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        城市
                      </div>
                      <div className="text-sm font-semibold">
                        {currentIpInfo.city}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        ISP
                      </div>
                      <div className="text-sm font-semibold">
                        {currentIpInfo.org}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        经纬度
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(
                            `${currentIpInfo.latitude}, ${currentIpInfo.longitude}`,
                            "经纬度"
                          )
                        }
                        className="h-7 w-7 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="font-mono text-sm">
                      {currentIpInfo.latitude}, {currentIpInfo.longitude}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        时区
                      </div>
                      <div className="text-sm font-semibold">
                        {currentIpInfo.timezone}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        邮编
                      </div>
                      <div className="text-sm font-semibold">
                        {currentIpInfo.postal}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Globe className="w-12 h-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">正在获取IP信息...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* IP搜索 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              查询指定IP
            </CardTitle>
            <CardDescription>输入IP地址查询详细信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                value={searchIp}
                onChange={(e) => setSearchIp(e.target.value)}
                placeholder="输入IP地址，如：8.8.8.8"
                className="font-mono"
                onKeyPress={(e) => e.key === "Enter" && searchIpInfo()}
              />
            </div>

            <Button
              onClick={searchIpInfo}
              disabled={loadingSearch || !searchIp.trim()}
              className="w-full gap-2"
            >
              <Search
                className={`w-4 h-4 ${loadingSearch ? "animate-spin" : ""}`}
              />
              {loadingSearch ? "查询中..." : "查询IP信息"}
            </Button>

            {searchedIpInfo && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    查询结果
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(searchedIpInfo, null, 2),
                        "JSON数据"
                      )
                    }
                    className="gap-2"
                  >
                    <Copy className="w-3 h-3" />
                    复制JSON
                  </Button>
                </div>

                <Card className="border">
                  <CardContent className="p-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {Object.entries(searchedIpInfo).map(
                        ([key, value]) =>
                          value && (
                            <div
                              key={key}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex-1">
                                <span className="font-medium text-sm text-muted-foreground mr-2">
                                  {key}:
                                </span>
                                <span className="text-sm">{String(value)}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  copyToClipboard(String(value), key)
                                }
                                className="h-7 w-7 p-0"
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 示例IP */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            示例IP地址
          </CardTitle>
          <CardDescription>点击快速填充示例IP地址</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {exampleIps.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => {
                  setSearchIp(example.ip);
                  setSearchedIpInfo(null);
                  setError("");
                }}
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
              >
                <div className={`p-2 rounded-lg ${example.bgColor}`}>
                  <Globe className={`w-5 h-5 ${example.color}`} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium">{example.label}</span>
                  <div className="text-xs text-muted-foreground">
                    {example.ip}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {example.desc}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Wifi className="w-4 h-4" /> 功能特点
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 查询当前公网IP地址信息</li>
                <li>• 支持查询任意IP地址详情</li>
                <li>• 显示地理位置和网络信息</li>
                <li>• 一键复制IP地址数据</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 网络诊断
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 网络连通性测试</li>
                <li>• 网络位置分析</li>
                <li>• ISP信息查询</li>
                <li>• 地理定位服务</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Mail className="w-4 h-4" />
            <AlertTitle>隐私说明</AlertTitle>
            <AlertDescription>
              IP信息查询会向第三方API服务发送请求来获取地理位置和ISP信息。请注意保护您的隐私，我们不会存储您的查询记录。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
