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
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function IpInfoChecker() {
  const [currentIpInfo, setCurrentIpInfo] = useState(null);
  const [searchIp, setSearchIp] = useState("");
  const [searchedIpInfo, setSearchedIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState("");

  const { copy } = useCopyClipboard();

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

      {/* IP查询工作台 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            IP地址查询工作台
          </CardTitle>
          <CardDescription>查询当前IP信息或指定IP地址的详细信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 错误信息 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>错误</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 查询控制区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 当前IP查询 */}
            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    当前IP
                  </CardTitle>
                  <Button
                    onClick={fetchCurrentIpInfo}
                    disabled={loading}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${loading ? "animate-spin" : ""}`}
                    />
                    刷新
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentIpInfo ? (
                  <>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-mono text-sm text-center">
                        {currentIpInfo.ip}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">国家:</span> {currentIpInfo.country_name || currentIpInfo.country}
                      </div>
                      <div>
                        <span className="text-muted-foreground">城市:</span> {currentIpInfo.city}
                      </div>
                      <div>
                        <span className="text-muted-foreground">ISP:</span> {currentIpInfo.org}
                      </div>
                      <div>
                        <span className="text-muted-foreground">时区:</span> {currentIpInfo.timezone}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">正在获取IP信息...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 指定IP查询 */}
            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  指定IP查询
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  type="text"
                  value={searchIp}
                  onChange={(e) => setSearchIp(e.target.value)}
                  placeholder="输入IP地址，如：8.8.8.8"
                  className="font-mono text-sm"
                  onKeyPress={(e) => e.key === "Enter" && searchIpInfo()}
                />
                <Button
                  onClick={searchIpInfo}
                  disabled={loadingSearch || !searchIp.trim()}
                  className="w-full gap-2"
                >
                  <Search
                    className={`w-4 h-4 ${loadingSearch ? "animate-spin" : ""}`}
                  />
                  {loadingSearch ? "查询中..." : "查询"}
                </Button>

                {searchedIpInfo && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="font-mono text-xs text-center">
                      {searchedIpInfo.ip} - {searchedIpInfo.country_name || searchedIpInfo.country}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 详细信息展示 */}
          {(currentIpInfo || searchedIpInfo) && (
            <div className="space-y-4">
              <div className="text-sm font-medium">
                {currentIpInfo ? "当前IP详细信息" : "查询结果详细信息"}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(currentIpInfo || searchedIpInfo) && Object.entries(currentIpInfo || searchedIpInfo)
                  .filter(([key]) => ['ip', 'country_name', 'country', 'city', 'org', 'latitude', 'longitude', 'timezone', 'postal'].includes(key))
                  .map(([key, value]) => (
                    <Card key={key} className="border">
                      <CardContent className="p-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          {key === 'ip' ? 'IP地址' :
                           key === 'country_name' || key === 'country' ? '国家/地区' :
                           key === 'org' ? 'ISP' :
                           key === 'latitude' ? '纬度' :
                           key === 'longitude' ? '经度' :
                           key === 'timezone' ? '时区' :
                           key === 'postal' ? '邮编' :
                           key === 'city' ? '城市' : key}
                        </div>
                        <div className="text-sm font-semibold break-all">
                          {String(value)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
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
