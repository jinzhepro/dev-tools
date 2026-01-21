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
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  ShieldCheck,
  ShieldX,
  Eye,
  EyeOff,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Lock,
  Key,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({
    score: 0,
    label: "无",
    color: "bg-gray-200",
    icon: Shield,
    suggestions: [],
  });

  const { copy } = useCopyClipboard();

  const strengthLevels = [
    {
      min: 0,
      max: 20,
      level: "非常弱",
      color: "bg-red-500",
      textColor: "text-red-500",
      icon: ShieldX,
    },
    {
      min: 21,
      max: 40,
      level: "弱",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      icon: ShieldX,
    },
    {
      min: 41,
      max: 60,
      level: "一般",
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      icon: Shield,
    },
    {
      min: 61,
      max: 80,
      level: "强",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      icon: ShieldCheck,
    },
    {
      min: 81,
      max: 100,
      level: "非常强",
      color: "bg-green-500",
      textColor: "text-green-500",
      icon: ShieldCheck,
    },
  ];

  const checkPasswordStrength = (pwd) => {
    if (!pwd) {
      return {
        score: 0,
        level: "无",
        color: "bg-gray-500",
        textColor: "text-gray-500",
        icon: ShieldX,
        feedback: [],
        suggestions: [],
      };
    }

    let score = 0;
    const feedback = [];
    const suggestions = [];

    // 长度检查
    if (pwd.length >= 8) {
      score += 20;
      feedback.push({ type: "success", message: "密码长度符合要求" });
    } else {
      suggestions.push("密码长度至少需要8个字符");
    }

    if (pwd.length >= 12) {
      score += 10;
    }

    if (pwd.length >= 16) {
      score += 10;
    }

    // 字符类型检查
    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    if (hasLowercase) {
      score += 10;
      feedback.push({ type: "success", message: "包含小写字母" });
    } else {
      suggestions.push("添加小写字母");
    }

    if (hasUppercase) {
      score += 10;
      feedback.push({ type: "success", message: "包含大写字母" });
    } else {
      suggestions.push("添加大写字母");
    }

    if (hasNumbers) {
      score += 10;
      feedback.push({ type: "success", message: "包含数字" });
    } else {
      suggestions.push("添加数字");
    }

    if (hasSpecialChars) {
      score += 15;
      feedback.push({ type: "success", message: "包含特殊字符" });
    } else {
      suggestions.push("添加特殊字符 (!@#$%^&*等)");
    }

    // 复杂性检查
    const uniqueChars = new Set(pwd).size;
    if (uniqueChars >= pwd.length * 0.6) {
      score += 5;
    } else {
      suggestions.push("避免重复字符");
    }

    // 常见密码检查
    const commonPasswords = [
      "password",
      "123456",
      "123456789",
      "qwerty",
      "abc123",
      "password123",
      "admin",
      "letmein",
      "welcome",
      "monkey",
      "1234567890",
      "password1",
    ];

    if (commonPasswords.some((common) => pwd.toLowerCase().includes(common))) {
      score = Math.max(0, score - 30);
      suggestions.push("避免使用常见密码模式");
    }

    // 连续字符检查
    const hasSequentialChars =
      /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(
        pwd
      );
    if (hasSequentialChars) {
      score = Math.max(0, score - 15);
      suggestions.push("避免连续字符序列");
    }

    // 确保分数在0-100范围内
    score = Math.max(0, Math.min(100, score));

    // 确定强度等级
    const strengthLevel = strengthLevels.find(
      (level) => score >= level.min && score <= level.max
    );

    return {
      score,
      level: strengthLevel.level,
      color: strengthLevel.color,
      textColor: strengthLevel.textColor,
      icon: strengthLevel.icon,
      feedback,
      suggestions,
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStrength(checkPasswordStrength(password));
    }, 100);

    return () => clearTimeout(timer);
  }, [password]);

  const generateStrongPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const allChars = lowercase + uppercase + numbers + specialChars;

    let newPassword = "";
    const length = 16;

    // 确保包含每种类型的字符
    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    newPassword += numbers[Math.floor(Math.random() * numbers.length)];
    newPassword +=
      specialChars[Math.floor(Math.random() * specialChars.length)];

    // 填充剩余长度
    for (let i = 4; i < length; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // 打乱字符顺序
    newPassword = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(newPassword);
    toast.success("已生成强密码");
  };

  const copyPassword = () => {
    if (!password) {
      toast.error("没有可复制的密码");
      return;
    }
    copy(password);
  };

  const clearPassword = () => {
    setPassword("");
    toast.success("已清空密码");
  };

  const StrengthIcon = strength.icon;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      {/* 标题区域 */}
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center px-0">
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            密码强度检测
          </CardTitle>
          <CardDescription className="text-lg">
            检测密码强度，获取安全建议，生成强密码
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 主要工作区域 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            密码检测工作台
          </CardTitle>
          <CardDescription>输入密码进行强度分析，获取安全建议</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 密码输入区域 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">输入密码</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入要检测的密码..."
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-8 w-8 p-0"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={generateStrongPassword}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              生成强密码
            </Button>
            <Button
              onClick={copyPassword}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!password}
            >
              <Copy className="w-4 h-4" />
              复制密码
            </Button>
            <Button
              onClick={clearPassword}
              variant="outline"
              size="lg"
              className="gap-2"
              disabled={!password}
            >
              <XCircle className="w-4 h-4" />
              清空
            </Button>
          </div>

          {/* 强度显示 */}
          {password && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">密码强度</Label>
                <Badge
                  variant="secondary"
                  className={cn(strength.textColor, "border-current")}
                >
                  <StrengthIcon className="w-3 h-3 mr-1" />
                  {strength.level}
                </Badge>
              </div>

              <Progress value={strength.score} className="h-3" />

              <div className="text-center">
                <span className={cn("text-2xl font-bold", strength.textColor)}>
                  {strength.score}/100
                </span>
              </div>
            </div>
          )}

          {/* 反馈信息 */}
          {password && strength.feedback.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">密码特征</Label>
              <div className="space-y-2">
                {strength.feedback.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 改进建议 */}
          {password && strength.suggestions.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">改进建议</Label>
              <div className="space-y-2">
                {strength.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span>{suggestion}</span>
                  </div>
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
            <Shield className="w-5 h-5" />
            密码安全指南
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 强密码特征
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>至少12个字符（推荐16个以上）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>包含大小写字母、数字和特殊字符</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>避免常见单词和个人信息</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>不包含连续字符或重复模式</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Key className="w-4 h-4" /> 安全建议
              </h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>为每个账户使用不同的密码</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>定期更新重要账户密码</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>使用密码管理器存储密码</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span>启用双因素认证（2FA）</span>
                </li>
              </ul>
            </div>
          </div>
          <Separator />
          <Alert>
            <Lock className="w-4 h-4" />
            <AlertTitle>隐私保护</AlertTitle>
            <AlertDescription>
              本工具在本地浏览器中运行，不会上传或存储您的密码信息。所有密码检测都在您的设备上完成，确保隐私安全。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
