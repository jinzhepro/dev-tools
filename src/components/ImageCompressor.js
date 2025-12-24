"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  Settings,
  FileImage,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ImageCompressor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState([55]);
  const [format, setFormat] = useState("auto");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [compressedImageUrl, setCompressedImageUrl] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const fileInputRef = useRef(null);

  const formatOptions = [
    { value: "auto", label: "保持原格式" },
    { value: "jpeg", label: "JPEG" },
    { value: "png", label: "PNG" },
    { value: "webp", label: "WebP" },
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith("image/")) {
      toast.error("请选择图片文件");
      return;
    }

    // 检查文件大小 (限制为 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error("图片大小不能超过 50MB");
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    setCompressedFile(null);
    setCompressedSize(0);

    // 创建原始图片预览 URL
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
    setCompressedImageUrl("");
    setShowComparison(false);

    toast.success("图片已选择");
  };

  const compressImage = async () => {
    if (!selectedFile) return;

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // 设置进度
        setCompressionProgress(30);

        // 计算新尺寸（如果需要）
        let { width, height } = img;

        // 如果图片过大，进行缩放
        const maxSize = 4096;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // 绘制图片
        ctx.drawImage(img, 0, 0, width, height);
        setCompressionProgress(60);

        // 确定输出格式
        let outputFormat = selectedFile.type;
        if (format !== "auto") {
          outputFormat = `image/${format}`;
        }

        // 智能压缩策略
        const originalFormat = selectedFile.type;
        let targetQuality = quality[0] / 100;

        // 如果原始是PNG且选择自动格式，转换为JPEG以获得更好的压缩
        if (format === "auto" && originalFormat === "image/png") {
          outputFormat = "image/jpeg";
          // PNG转JPEG时降低质量以获得更好的压缩效果
          targetQuality = Math.min(targetQuality, 0.8);
        }

        // 如果用户明确选择PNG格式，保持PNG格式但调整质量策略
        if (format === "png") {
          outputFormat = "image/png";
          // PNG格式压缩时，如果质量过高可能导致文件变大，适当降低
          if (targetQuality > 0.9) {
            targetQuality = 0.9;
          }
        }

        // 如果原始是高质量JPEG且质量设置很高，适当降低质量
        if (originalFormat === "image/jpeg" && targetQuality > 0.9) {
          targetQuality = 0.9;
        }

        // 转换为 Blob
        canvas.toBlob(
          (blob) => {
            setCompressionProgress(90);

            if (blob) {
              // 如果压缩后文件更大，尝试更激进的压缩
              if (blob.size >= selectedFile.size && targetQuality > 0.3) {
                const retryQuality = Math.max(0.3, targetQuality - 0.2);
                canvas.toBlob(
                  (retryBlob) => {
                    if (retryBlob && retryBlob.size < selectedFile.size) {
                      setCompressedFile(retryBlob);
                      setCompressedSize(retryBlob.size);
                      setCompressionProgress(100);

                      const compressedUrl = URL.createObjectURL(retryBlob);
                      setCompressedImageUrl(compressedUrl);
                      setShowComparison(true);

                      const compressionRatio = (
                        (1 - retryBlob.size / selectedFile.size) *
                        100
                      ).toFixed(1);
                      toast.success(`压缩完成！减少了 ${compressionRatio}%`);
                    } else {
                      // 即使压缩后仍然更大，也显示结果但给出提示
                      setCompressedFile(blob);
                      setCompressedSize(blob.size);
                      setCompressionProgress(100);

                      const compressedUrl = URL.createObjectURL(blob);
                      setCompressedImageUrl(compressedUrl);
                      setShowComparison(true);

                      const compressionRatio = (
                        (1 - blob.size / selectedFile.size) *
                        100
                      ).toFixed(1);
                      if (parseFloat(compressionRatio) < 0) {
                        toast.warning(
                          `压缩完成，但文件增大了 ${Math.abs(
                            parseFloat(compressionRatio)
                          )}%。原始图片可能已经高度压缩。`
                        );
                      } else {
                        toast.success(`压缩完成！减少了 ${compressionRatio}%`);
                      }
                    }

                    setIsCompressing(false);
                    setTimeout(() => setCompressionProgress(0), 1000);
                  },
                  outputFormat,
                  retryQuality
                );
              } else {
                setCompressedFile(blob);
                setCompressedSize(blob.size);
                setCompressionProgress(100);

                // 创建压缩后的图片预览 URL
                const compressedUrl = URL.createObjectURL(blob);
                setCompressedImageUrl(compressedUrl);
                setShowComparison(true);

                const compressionRatio = (
                  (1 - blob.size / selectedFile.size) *
                  100
                ).toFixed(1);

                if (parseFloat(compressionRatio) < 0) {
                  toast.warning(
                    `压缩完成，但文件增大了 ${Math.abs(
                      parseFloat(compressionRatio)
                    )}%。原始图片可能已经高度压缩。`
                  );
                } else {
                  toast.success(`压缩完成！减少了 ${compressionRatio}%`);
                }
              }

              setIsCompressing(false);
              setTimeout(() => setCompressionProgress(0), 1000);
            } else {
              toast.error("压缩失败");
              setIsCompressing(false);
              setTimeout(() => setCompressionProgress(0), 1000);
            }
          },
          outputFormat,
          targetQuality
        );
      };

      img.onerror = () => {
        toast.error("图片加载失败");
        setIsCompressing(false);
        setCompressionProgress(0);
      };

      img.src = URL.createObjectURL(selectedFile);
    } catch (error) {
      console.error("压缩错误:", error);
      toast.error("压缩过程中出现错误");
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const downloadCompressedImage = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;

    // 生成文件名
    const originalName = selectedFile.name.split(".")[0];
    const extension =
      format === "auto" ? selectedFile.name.split(".").pop() : format;

    a.download = `${originalName}_compressed.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("图片已下载");
  };

  const clearAll = () => {
    setSelectedFile(null);
    setCompressedFile(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressionProgress(0);

    // 清理图片 URL
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
    if (compressedImageUrl) {
      URL.revokeObjectURL(compressedImageUrl);
    }
    setOriginalImageUrl("");
    setCompressedImageUrl("");
    setShowComparison(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("已清空");
  };

  // 清理 URL 对象
  useEffect(() => {
    return () => {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
      if (compressedImageUrl) {
        URL.revokeObjectURL(compressedImageUrl);
      }
    };
  }, [originalImageUrl, compressedImageUrl]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getCompressionRatio = () => {
    if (!originalSize || !compressedSize) return 0;
    return ((1 - compressedSize / originalSize) * 100).toFixed(1);
  };

  const getCompressionColor = (ratio) => {
    if (ratio < 20) return "text-yellow-500";
    if (ratio < 50) return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            图片压缩
          </CardTitle>
          <CardDescription className="text-lg">
            在线压缩图片，减小文件大小，支持多种格式
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要工作区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            图片压缩工作台
          </CardTitle>
          <CardDescription>
            上传图片，调整压缩参数，下载压缩后的图片
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 文件上传区域 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">选择图片</Label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                "hover:border-primary hover:bg-muted/50",
                selectedFile
                  ? "border-green-500 bg-green-50/50"
                  : "border-muted-foreground/25"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="space-y-3">
                  <FileImage className="w-12 h-12 mx-auto text-green-500" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(originalSize)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">点击或拖拽上传图片</p>
                    <p className="text-sm text-muted-foreground">
                      支持 JPG、PNG、WebP 格式，最大 50MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 压缩设置 */}
          {selectedFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 质量设置 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">压缩质量</Label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">
                        压缩强度
                      </span>
                    </div>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="text-orange-500 font-medium">
                        高压缩 (小文件)
                      </span>
                      <span className="text-green-500 font-medium">
                        高质量 (大文件)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 格式设置 */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">输出格式</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formatOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={compressImage}
              disabled={!selectedFile || isCompressing}
              size="lg"
              className="gap-2"
            >
              <Zap className="w-4 h-4" />
              {isCompressing ? "压缩中..." : "开始压缩"}
            </Button>
            <Button
              onClick={downloadCompressedImage}
              variant="outline"
              disabled={!compressedFile}
              size="lg"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              下载图片
            </Button>
            <Button
              onClick={clearAll}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!selectedFile}
            >
              <Trash2 className="w-4 h-4" />
              清空
            </Button>
          </div>

          {/* 压缩进度 */}
          {isCompressing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">压缩进度</Label>
                <span className="text-sm text-muted-foreground">
                  {compressionProgress}%
                </span>
              </div>
              <Progress value={compressionProgress} className="h-2" />
            </div>
          )}

          {/* 图片预览 */}
          {originalImageUrl && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">图片预览</Label>
                {compressedImageUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                    className="gap-2"
                  >
                    {showComparison ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                    {showComparison ? "隐藏对比" : "显示对比"}
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  "grid gap-6",
                  compressedImageUrl && showComparison
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                )}
              >
                {/* 原始图片 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">原始图片</h4>
                    <Badge variant="secondary">
                      {formatFileSize(originalSize)}
                    </Badge>
                  </div>
                  <div className="relative border rounded-lg overflow-hidden bg-muted/20">
                    <img
                      src={originalImageUrl}
                      alt="原始图片"
                      className="w-full h-auto max-h-64 object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      原始
                    </div>
                  </div>
                </div>

                {/* 压缩后图片 */}
                {compressedImageUrl && showComparison && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">压缩后图片</h4>
                      <Badge variant="secondary">
                        {formatFileSize(compressedSize)}
                      </Badge>
                    </div>
                    <div className="relative border rounded-lg overflow-hidden bg-muted/20">
                      <img
                        src={compressedImageUrl}
                        alt="压缩后图片"
                        className="w-full h-auto max-h-64 object-contain"
                      />
                      <div className="absolute top-2 left-2 bg-green-500/80 text-white px-2 py-1 rounded text-xs">
                        压缩后 (-{getCompressionRatio()}%)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 压缩结果统计 */}
          {compressedFile && (
            <div className="space-y-4">
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">原始大小</p>
                  <p className="text-lg font-semibold">
                    {formatFileSize(originalSize)}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    压缩后大小
                  </p>
                  <p className="text-lg font-semibold">
                    {formatFileSize(compressedSize)}
                  </p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">压缩率</p>
                  <p
                    className={cn(
                      "text-lg font-semibold",
                      getCompressionColor(getCompressionRatio())
                    )}
                  >
                    -{getCompressionRatio()}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            使用说明
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 压缩参数
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>质量越低，文件越小，但图片质量会下降</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>WebP 格式通常有更好的压缩效果</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>JPEG 适合照片，PNG 适合透明图片</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>PNG 转 JPEG 可显著减小文件大小，但会失去透明度</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>
                    选择 PNG 格式可能导致文件增大，特别是从 JPEG 转换时
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span>已高度压缩的图片可能无法进一步压缩</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> 注意事项
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>压缩在本地浏览器中完成，不会上传到服务器</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>过低的压缩质量可能导致图片模糊</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>建议先尝试中等质量，根据效果调整</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>如果压缩后文件变大，尝试降低压缩强度或转换格式</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>PNG 格式适合需要透明度的图片，但文件通常较大</span>
                </li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <ImageIcon className="w-4 h-4" />
            <AlertTitle>隐私保护</AlertTitle>
            <AlertDescription>
              本工具在您的浏览器本地运行，所有图片处理都在您的设备上完成，不会上传或存储您的图片文件，确保隐私安全。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
