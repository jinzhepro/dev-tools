# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目概述

这是一个基于 Next.js 的开发工具集网站，提供多种常用开发工具的在线版本。

## 技术栈

- Next.js 16.0.10 (App Router)
- React 19.2.0
- Tailwind CSS v4
- shadcn/ui 组件库
- JavaScript (使用 .js 扩展名，非 TypeScript)

## 构建和开发命令

```bash
npm run dev      # 启动开发服务器 (http://localhost:3000)
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
```

## 项目结构关键点

- **App Router**: 所有页面在 `src/app/` 目录
- **工具组件**: 位于 `src/components/` 目录
- **工具配置**: 在 `src/data/tools.js` 中定义
- **动态路由**: `[toolId]` 用于渲染不同工具页面
- **组件映射**: 使用 `componentMap` 在动态路由中注册组件

## 代码风格约定

### 文件命名和组织

- 组件文件使用 **PascalCase**: `JsonConverter.js`, `TimestampGenerator.js`
- 工具函数文件使用 **camelCase**: `utils.js`, `useCopyClipboard.js`
- 配置文件使用 **kebab-case**: `eslint.config.mjs`, `next.config.mjs`

### 导入规则

```javascript
// 1. React hooks (第一组)
import { useState, useEffect } from "react";

// 2. shadcn/ui 组件 (第二组)
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 3. 工具组件 (第三组)
import JsonConverter from "@/components/JsonConverter";

// 4. 图标库 (第四组)
import { Copy, AlertCircle, FileJson } from "lucide-react";

// 5. 第三方库 (第五组)
import { toast } from "sonner";

// 6. 自定义 hooks (第六组)
import { useCopyClipboard } from "@/hooks/useCopyClipboard";

// 7. 工具函数 (第七组)
import { cn } from "@/lib/utils";
```

### 组件结构

```javascript
"use client";  // 客户端组件必须在顶部

import { useState } from "react";
import { Button } from "@/components/ui/button";
// ... 其他导入

export default function ComponentName() {
  // 1. State 定义
  const [state, setState] = useState("");
  
  // 2. 自定义 hooks
  const { method } = useCustomHook();
  
  // 3. 事件处理函数
  const handleAction = () => {
    // 逻辑实现
  };
  
  // 4. 渲染
  return (
    <div className="container mx-auto">
      {/* 组件内容 */}
    </div>
  );
}
```

### 命名约定

| 类型 | 规则 | 示例 |
|------|------|------|
| 组件 | PascalCase | `JsonConverter`, `TimestampGenerator` |
| 函数 | camelCase | `convertJson`, `handleSubmit` |
| 变量 | camelCase | `inputValue`, `errorMessage` |
| 常量 | UPPER_SNAKE_CASE 或 PascalCase | `CONVERSION_TYPES`, `ConversionType` |
| CSS 类 | Tailwind utility classes | `className="flex items-center gap-4"` |

### 错误处理

```javascript
// 使用 try-catch 捕获错误
try {
  // 可能失败的代码
  const result = JSON.parse(input);
  setOutput(result);
  toast.success("转换成功");
} catch (err) {
  // 设置错误状态并显示
  setError("转换失败：" + err.message);
  toast.error("转换失败");
}

// UI 中显示错误
{error && (
  <Alert variant="destructive">
    <AlertCircle className="w-4 h-4" />
    <AlertTitle>错误标题</AlertTitle>
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

### UI 和样式指南

- 使用 shadcn/ui 基础组件: `Button`, `Card`, `Input`, `Textarea`, `Alert` 等
- 使用 `cn()` 工具函数合并类名: `cn("base-class", condition && "conditional-class")`
- 使用 Tailwind CSS 进行样式设计
- 遵循 shadcn/ui New York 风格
- 使用 CSS 变量进行主题定制
- 组件容器使用 `container mx-auto px-4` 作为基础布局

### 禁止使用的模式

- ❌ 使用 `as any`, `@ts-ignore`, `@ts-expect-error` (无 TypeScript)
- ❌ 空 catch 块: `catch(e) {}`
- ❌ 直接编辑前端视觉/样式代码 (委托给前端 UI/UX 工程师)
- ❌ 删除失败的测试来"通过"测试 (无测试框架)
- ❌ 随机调试和修改

## 添加新工具的步骤

1. **创建组件**: 在 `src/components/` 创建工具组件文件
2. **配置工具**: 在 `src/data/tools.js` 中添加工具配置
3. **注册组件**: 在 `src/app/[toolId]/page.js` 的 `componentMap` 中注册
4. **遵循模式**: 工具组件应遵循现有的 UI 模式和样式

## 重要配置

- **React 编译器**: 已启用 (`reactCompiler: true`)
- **ESLint**: 使用 Next.js 核心网络规范配置
- **shadcn/ui**: New York 风格，使用 CSS 变量
- **路径别名**: `@/*` 指向 `./src/*`
- **ESLint 忽略**: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
