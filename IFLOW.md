# iFlow CLI 上下文文件

## 项目概述

这是一个基于 Next.js 16 和 React 19 构建的现代化开发工具集网站，提供多种实用工具，包括 JSON 转换、时间戳生成、二维码生成、Base64 编码、URL 编码、Hash 生成、颜色转换、UUID 生成、IP 地址查询、地理编码查询和进制转换等功能。项目采用 shadcn/ui 设计系统，提供一致的用户体验和响应式设计。

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **UI 库**: React 19
- **设计系统**: shadcn/ui
- **样式**: Tailwind CSS 4
- **加密库**: CryptoJS
- **二维码**: qrcode.react
- **图标**: Lucide React
- **通知**: Sonner
- **主题**: next-themes

## 项目结构

```
dev-tools/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.js       # 根布局
│   │   ├── page.js         # 首页 - 工具列表和搜索
│   │   └── [toolId]/       # 动态工具页面
│   │       └── page.js     # 工具页面布局
│   ├── components/         # React 组件
│   │   ├── ui/            # shadcn/ui 组件库
│   │   │   ├── alert.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── input.jsx
│   │   │   ├── label.jsx
│   │   │   ├── progress.jsx
│   │   │   ├── radio-group.jsx
│   │   │   ├── select.jsx
│   │   │   ├── separator.jsx
│   │   │   ├── skeleton.jsx
│   │   │   ├── sonner.jsx
│   │   │   ├── tabs.jsx
│   │   │   └── textarea.jsx
│   │   ├── Base64EncoderDecoder.js
│   │   ├── ColorConverter.js
│   │   ├── Geocoder.js
│   │   ├── HashGenerator.js
│   │   ├── IpInfoChecker.js
│   │   ├── JsonConverter.js
│   │   ├── NumberBaseConverter.js
│   │   ├── QrCodeGenerator.js
│   │   ├── TimestampGenerator.js
│   │   ├── UrlEncoderDecoder.js
│   │   └── UuidGenerator.js
│   ├── data/               # 数据文件
│   │   └── tools.js        # 工具配置和分类
│   └── lib/                # 工具函数
│       └── utils.js        # 通用工具函数
├── public/                 # 静态资源
├── out/                    # 构建输出目录
├── components.json          # shadcn/ui 配置
├── package.json            # 项目依赖和脚本
├── next.config.mjs         # Next.js 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── eslint.config.mjs       # ESLint 配置
└── jsconfig.json           # JavaScript 配置
```

## 核心工具

项目包含 11 个核心工具，分为 5 个类别：

### 编码/解码
- **Base64编码** (Base64EncoderDecoder) - Base64 编码和解码
- **URL编码** (UrlEncoderDecoder) - URL 编码和解码
- **Hash生成器** (HashGenerator) - MD5、SHA1、SHA256、SHA512 哈希生成

### 生成器
- **时间戳生成** (TimestampGenerator) - 多种格式时间戳生成
- **二维码生成** (QrCodeGenerator) - 文本和链接二维码生成
- **UUID生成器** (UuidGenerator) - UUID v4 生成，支持批量

### 转换
- **JSON转换** (JsonConverter) - JSON 压缩、格式化、转义和反转义
- **颜色转换** (ColorConverter) - HEX、RGB、HSL 颜色格式互转
- **进制转换** (NumberBaseConverter) - 二进制、八进制、十进制、十六进制转换

### 网络
- **IP地址查询** (IpInfoChecker) - IP 地址信息和地理位置查询
- **地理编码查询** (Geocoder) - 地址和坐标相互转换

## 构建和运行

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 代码检查
npm run lint
```

### 生产环境

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 开发约定

### 组件结构
- 使用 `"use client";` 指令（客户端组件）
- 导入 shadcn/ui 组件使用绝对路径 `@/components/ui/...`
- 组件使用 PascalCase 命名
- 文件名使用 PascalCase.js 格式

### 样式规范
- 使用 Tailwind CSS 类名
- 遵循 shadcn/ui 设计系统
- 使用语义化颜色变量（如 `text-muted-foreground`）
- 响应式设计优先（使用 `sm:`、`md:`、`lg:` 前缀）

### 状态管理
- 使用 React Hooks（`useState`、`useMemo` 等）
- 复杂状态考虑使用 `useReducer`
- 表单状态本地管理

### 交互规范
- 使用 Sonner 进行 Toast 通知（`toast.success()`、`toast.error()`）
- 使用 `navigator.clipboard.writeText()` 进行复制操作
- 错误处理使用 try-catch 块
- 加载状态使用 Skeleton 组件

## 添加新工具

1. **在 `src/data/tools.js` 中添加工具配置**:
   ```javascript
   {
     id: "new-tool",
     name: "新工具",
     description: "工具描述",
     category: "分类",
     component: "NewTool",
   }
   ```

2. **创建工具组件** `src/components/NewTool.js`:
   ```javascript
   "use client";
   
   import { useState } from "react";
   import { Button } from "@/components/ui/button";
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
   // 其他导入
   
   export default function NewTool() {
     // 组件逻辑
     return (
       <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
         {/* 组件内容 */}
       </div>
     );
   }
   ```

3. **在 `src/app/[toolId]/page.js` 中注册组件**:
   ```javascript
   import NewTool from "@/components/NewTool";
   
   const componentMap = {
     // 现有组件...
     NewTool,
   };
   ```

## shadcn/ui 组件使用

项目已配置以下 shadcn/ui 组件：
- Button, Card, Input, Textarea, Label
- RadioGroup, Select, Alert, Separator
- Badge, Checkbox, Progress, Dialog
- Tabs, Skeleton, Sonner

### 常用组件模式

#### 卡片布局
```jsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 内容 */}
  </CardContent>
</Card>
```

#### 按钮组合
```jsx
<div className="flex flex-wrap gap-4 justify-center">
  <Button onClick={handleAction} size="lg" className="gap-2">
    <Icon className="w-4 h-4" />
    操作
  </Button>
  <Button variant="outline" onClick={handleCancel} size="lg">
    取消
  </Button>
</div>
```

#### 表单输入
```jsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="input">输入</Label>
    <Input
      id="input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="请输入..."
    />
  </div>
</div>
```

## 项目特色

### 设计系统
- 统一的蓝紫渐变主题 (`from-blue-600 to-purple-600`)
- 一致的间距和圆角
- 响应式设计，支持桌面和移动设备
- 支持亮色/暗色主题切换

### 用户体验
- 实时预览和结果即时显示
- 一键复制功能
- 示例数据快速填充
- 友好的错误提示
- 流畅的动画和过渡效果

### 性能优化
- 静态生成（SSG）所有工具页面
- 组件懒加载
- 优化的打包配置

## 部署

项目推荐部署到 Vercel，支持自动部署和 CI/CD。构建输出在 `out/` 目录，也可以部署到任何静态托管服务。

## 开发计划

项目正在进行 shadcn/ui 全面重构，计划：
1. 统一所有组件使用 shadcn/ui
2. 优化响应式设计
3. 改进交互体验
4. 添加暗色模式支持

详细计划参考 `shadcn-ui-refactor-plan.md` 文件。