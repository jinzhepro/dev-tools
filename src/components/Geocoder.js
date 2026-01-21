"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  MapPin,
  Search,
  Globe,
  Navigation,
  AlertCircle,
  Map,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function Geocoder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [reverseLat, setReverseLat] = useState("");
  const [reverseLon, setReverseLon] = useState("");
  const [reverseResult, setReverseResult] = useState(null);

  const { copy } = useCopyClipboard();
  const [loading, setLoading] = useState(false);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("search");

  

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
      if (data.length === 0) {
        toast.info("未找到匹配的地址");
      } else {
        toast.success(`找到${data.length}个结果`);
      }
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
      toast.error("搜索失败");
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
      toast.success("地址查询成功");
    } catch (err) {
      setError(err.message);
      setReverseResult(null);
      toast.error("反向查询失败");
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
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            地理地址查询
          </CardTitle>
          <CardDescription className="text-lg">
            基于OpenStreetMap的Nominatim服务，提供地理编码和地址查询
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 地理编码工作台 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            地理编码工作台
          </CardTitle>
          <CardDescription>地址搜索和坐标反向查询，基于OpenStreetMap数据</CardDescription>
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

          {/* 操作选择标签页 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="search" className="gap-2">
                <Search className="w-4 h-4" />
                地址搜索
              </TabsTrigger>
              <TabsTrigger value="reverse" className="gap-2">
                <Navigation className="w-4 h-4" />
                坐标查询
              </TabsTrigger>
            </TabsList>

            {/* 地址搜索 */}
            <TabsContent value="search" className="space-y-4 mt-4">
              <div className="space-y-3">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="输入地址、地名或地标..."
                  className="text-lg"
                />
                
                

                {loading && (
                  <div className="text-center py-2">
                    <RefreshCw className="animate-spin w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">搜索中...</span>
                  </div>
                )}
              </div>

              {/* 搜索结果预览 */}
              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">
                    找到 {searchResults.length} 个结果
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {searchResults.slice(0, 3).map((result, index) => (
                      <Card key={index} className="border">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm truncate flex-1 mr-2">
                              {formatAddress(result.address) || result.display_name}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">
                            {parseFloat(result.lat).toFixed(6)}, {parseFloat(result.lon).toFixed(6)}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copy(
                                  `${result.lat}, ${result.lon}`,
                                  "坐标"
                                )
                              }
                              className="text-xs gap-1"
                            >
                              <Copy className="w-3 h-3" />
                              复制
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReverseLat(result.lat);
                                setReverseLon(result.lon);
                                setActiveTab("reverse");
                              }}
                              className="text-xs gap-1"
                            >
                              <Navigation className="w-3 h-3" />
                              反查
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {searchResults.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        还有 {searchResults.length - 3} 个结果...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 坐标查询 */}
            <TabsContent value="reverse" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-sm">纬度 (-90 到 90)</Label>
                  <Input
                    type="number"
                    step="any"
                    value={reverseLat}
                    onChange={(e) => setReverseLat(e.target.value)}
                    placeholder="例: 39.9042"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">经度 (-180 到 180)</Label>
                  <Input
                    type="number"
                    step="any"
                    value={reverseLon}
                    onChange={(e) => setReverseLon(e.target.value)}
                    placeholder="例: 116.4074"
                    className="font-mono text-sm"
                  />
                </div>
              </div>

              {reverseLoading && (
                <div className="text-center py-2">
                  <RefreshCw className="animate-spin w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">查询中...</span>
                </div>
              )}

              {/* 反向查询结果预览 */}
              {reverseResult && (
                <div className="space-y-3">
                  <div className="text-sm font-medium">地址信息</div>
                  <Card className="border">
                    <CardContent className="p-3">
                      <div className="text-sm mb-2">
                        {reverseResult.display_name}
                      </div>
                      <div className="text-xs text-muted-foreground mb-3">
                        坐标: {reverseLat}, {reverseLon}
                      </div>
                      <div className="flex gap-2">
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copy(`${reverseLat}, ${reverseLon}`, "坐标")
                        }
                        className="text-xs gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          复制坐标
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openInMap(
                              reverseLat,
                              reverseLon,
                              reverseResult.display_name
                            )
                          }
                          className="text-xs gap-1"
                        >
                          <Map className="w-3 h-3" />
                          地图
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
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
                <Search className="w-4 h-4" /> 功能特点
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
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
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 应用场景
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 地址验证和标准化</li>
                <li>• 地图应用开发</li>
                <li>• 物流配送地址解析</li>
                <li>• 地理信息数据处理</li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Globe className="w-4 h-4" />
            <AlertTitle>服务说明</AlertTitle>
            <AlertDescription>
              Nominatim是OpenStreetMap的官方地理编码服务，免费提供全球地址查询服务。请合理使用，避免过于频繁的请求，以保护服务资源。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
