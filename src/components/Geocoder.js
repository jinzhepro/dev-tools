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
    {
      label: "北京天安门",
      query: "天安门,北京",
      icon: MapPin,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      label: "纽约时代广场",
      query: "Times Square, New York",
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "埃菲尔铁塔",
      query: "Eiffel Tower, Paris",
      icon: MapPin,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "长城",
      query: "Great Wall, China",
      icon: Navigation,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      label: "故宫博物院",
      query: "故宫博物院,北京",
      icon: MapPin,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
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

  // 复制坐标到剪贴板
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`已复制${label}到剪贴板`);
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

      {/* 错误提示 */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>错误</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* 标签页 */}
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

        {/* 地址搜索标签页 */}
        <TabsContent value="search" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                地址搜索
              </CardTitle>
              <CardDescription>输入地址、地名或地标进行搜索</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="输入地址、地名或地标..."
                  className="text-lg"
                />
                {loading && (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center">
                      <RefreshCw className="animate-spin w-5 h-5 mr-3 text-muted-foreground" />
                      <span className="text-muted-foreground">搜索中...</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 示例地址 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                示例地址
              </CardTitle>
              <CardDescription>点击快速填充示例地址</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {exampleAddresses.map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setSearchQuery(example.query)}
                    className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
                  >
                    <div className={`p-2 rounded-lg ${example.bgColor}`}>
                      <example.icon className={`w-5 h-5 ${example.color}`} />
                    </div>
                    <span className="text-sm font-medium">{example.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 搜索结果 */}
          {searchResults.length > 0 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    搜索结果
                  </CardTitle>
                  <CardDescription>
                    找到 {searchResults.length} 个结果
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <Card key={index} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">
                                {formatAddress(result.address) ||
                                  result.display_name}
                              </CardTitle>
                              <CardDescription className="text-sm line-clamp-2">
                                {result.display_name}
                              </CardDescription>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-800"
                                  >
                                    {result.type}
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  重要性: {result.importance?.toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  纬度: {parseFloat(result.lat).toFixed(6)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  经度: {parseFloat(result.lon).toFixed(6)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  `${result.lat}, ${result.lon}`,
                                  "坐标"
                                )
                              }
                              className="gap-2"
                            >
                              <Copy className="w-3 h-3" />
                              复制坐标
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openInMap(
                                  result.lat,
                                  result.lon,
                                  result.display_name
                                )
                              }
                              className="gap-2"
                            >
                              <Map className="w-3 h-3" />
                              地图查看
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReverseLat(result.lat);
                                setReverseLon(result.lon);
                                setActiveTab("reverse");
                              }}
                              className="gap-2"
                            >
                              <Navigation className="w-3 h-3" />
                              反向查询
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* 坐标查询标签页 */}
        <TabsContent value="reverse" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                坐标反向查询
              </CardTitle>
              <CardDescription>输入经纬度查询详细地址信息</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">纬度 (-90 到 90)</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={reverseLat}
                    onChange={(e) => setReverseLat(e.target.value)}
                    placeholder="例: 39.9042"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">经度 (-180 到 180)</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={reverseLon}
                    onChange={(e) => setReverseLon(e.target.value)}
                    placeholder="例: 116.4074"
                    className="font-mono"
                  />
                </div>
              </div>

              {reverseLoading && (
                <div className="text-center py-4">
                  <div className="inline-flex items-center">
                    <RefreshCw className="animate-spin w-5 h-5 mr-3 text-muted-foreground" />
                    <span className="text-muted-foreground">查询中...</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 反向查询结果 */}
          {reverseResult && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    地址信息
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() =>
                      openInMap(
                        reverseLat,
                        reverseLon,
                        reverseResult.display_name
                      )
                    }
                    className="gap-2"
                  >
                    <Map className="w-4 h-4" />
                    在地图中查看
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="border">
                  <CardContent className="p-4">
                    <div className="font-medium text-muted-foreground mb-2">
                      完整地址
                    </div>
                    <div className="text-foreground">
                      {reverseResult.display_name}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {reverseResult.address && (
                      <>
                        {reverseResult.address.house_number && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                门牌号
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.house_number}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {reverseResult.address.road && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                道路
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.road}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {reverseResult.address.neighbourhood && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                街道
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.neighbourhood}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {(reverseResult.address.city ||
                          reverseResult.address.town ||
                          reverseResult.address.village) && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                城市
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.city ||
                                  reverseResult.address.town ||
                                  reverseResult.address.village}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-2">
                    {reverseResult.address && (
                      <>
                        {reverseResult.address.state && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                州/省
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.state}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {reverseResult.address.country && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                国家
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.country}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {reverseResult.address.postcode && (
                          <Card className="border">
                            <CardContent className="p-3">
                              <div className="text-sm font-medium text-muted-foreground">
                                邮编
                              </div>
                              <div className="text-sm font-semibold">
                                {reverseResult.address.postcode}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </>
                    )}

                    <Card className="border">
                      <CardContent className="p-3">
                        <div className="text-sm font-medium text-muted-foreground">
                          坐标
                        </div>
                        <div className="text-sm font-semibold">
                          {reverseLat}, {reverseLon}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(`${reverseLat}, ${reverseLon}`, "坐标")
                    }
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    复制坐标
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(reverseResult.display_name, "地址")
                    }
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    复制地址
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

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
