# iFlow CLI 上下文文件

## 项目概述

这是一个基于 Next.js 16 和 React 19 的现代化开发工具集网站，提供开发者常用的在线工具。项目采用 shadcn/ui 设计系统和 Tailwind CSS 4，提供一致的用户体验和响应式设计。

### 核心特性

- **11个核心工具**: JSON转换器、时间戳生成器、二维码生成器、Base64编码器、URL编码器、Hash生成器、颜色转换器、UUID生成器、IP地址查询、地理编码查询、进制转换器
- **响应式设计**: 支持桌面和移动设备
- **现代化界面**: 基于 shadcn/ui 组件系统
- **实时预览**: 结果即时显示
- **分类筛选**: 支持按类别筛选和搜索功能

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **UI库**: React 19
- **设计系统**: shadcn/ui (New York风格)
- **样式**: Tailwind CSS 4
- **加密**: CryptoJS
- **二维码**: qrcode.react
- **图标**: Lucide React
- **通知**: Sonner
- **字体**: Geist Sans & Geist Mono

## 项目结构

```
dev-tools/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.js           # 根布局 (含Toaster和Footer)
│   │   ├── page.js             # 首页 (工具列表和筛选)
│   │   └── [toolId]/           # 动态工具页面
│   │       └── page.js         # 工具详情页模板
│   ├── components/             # React组件
│   │   ├── ui/                 # shadcn/ui 组件库
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   ├── textarea.jsx
│   │   │   ├── radio-group.jsx
│   │   │   ├── alert.jsx
│   │   │   ├── select.jsx
│   │   │   ├── tabs.jsx
│   │   │   ├── label.jsx
│   │   │   ├── separator.jsx
│   │   │   ├── badge.jsx
│   │   │   ├── checkbox.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── progress.jsx
│   │   │   ├── skeleton.jsx
│   │   │   └── sonner.jsx
│   │   ├── JsonConverter.js
│   │   ├── TimestampGenerator.js
│   │   ├── QrCodeGenerator.js
│   │   ├── Base64EncoderDecoder.js
│   │   ├── UrlEncoderDecoder.js
│   │   ├── HashGenerator.js
│   │   ├── ColorConverter.js
│   │   ├── UuidGenerator.js
│   │   ├── IpInfoChecker.js
│   │   ├── Geocoder.js
│   │   └── NumberBaseConverter.js
│   ├── data/                   # 数据文件
│   │   └── tools.js            # 工具配置和分类
│   ├── lib/                    # 工具函数
│   │   └── utils.js            # shadcn/ui 工具函数
│   ├── contexts/               # React Context (当前为空)
│   └── hooks/                  # 自定义Hooks (当前为空)
├── public/                     # 静态资源
├── components.json             # shadcn/ui 配置
├── eslint.config.mjs           # ESLint 配置
├── jsconfig.json               # JavaScript 配置
├── next.config.mjs             # Next.js 配置
├── postcss.config.mjs          # PostCSS 配置
└── package.json                # 项目依赖和脚本
```

## 构建和运行

### 环境要求
- Node.js 18.0 或更高版本

### 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器 (http://localhost:3000)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 开发约定

### 组件开发规范
- **文件命名**: 使用 PascalCase (如 `JsonConverter.js`)
- **组件结构**: 
  - 使用 `"use client"` 指令 (所有组件都是客户端组件)
  - 导入必要的 shadcn/ui 组件
  - 使用 Lucide React 图标
  - 使用 Sonner 进行通知提示
- **状态管理**: 使用 React Hooks (`useState`, `useMemo` 等)
- **样式**: 使用 Tailwind CSS 类名和 shadcn/ui 组件

### UI组件使用
- **布局**: 使用 `Card` 组件作为主要容器
- **输入**: 使用 `Input`、`Textarea` 组件
- **操作**: 使用 `Button` 组件
- **反馈**: 使用 `Alert` 组件显示错误信息
- **选择**: 使用 `RadioGroup`、`Select` 组件
- **标签**: 使用 `Label` 组件
- **分隔**: 使用 `Separator` 组件

### 工具分类
- **编码/解码**: Base64编码、URL编码、Hash生成器
- **生成器**: 时间戳生成、二维码生成、UUID生成器
- **转换**: JSON转换、颜色转换、进制转换
- **网络**: IP地址查询、地理编码查询

### 添加新工具流程
1. 在 `src/data/tools.js` 中添加工具配置
2. 在 `src/components/` 中创建工具组件 (遵循现有命名和结构规范)
3. 在 `src/app/[toolId]/page.js` 中导入并注册组件到 `componentMap`
4. 确保组件使用 shadcn/ui 组件保持设计一致性

### 代码质量
- 使用 ESLint 进行代码检查 (配置基于 `eslint-config-next/core-web-vitals`)
- 遵循 React 和 Next.js 最佳实践
- 保持组件的单一职责原则
- 添加适当的错误处理和用户反馈

### 样式指南
- 使用 Tailwind CSS 实用类
- 遵循 shadcn/ui 设计系统 (New York风格)
- 使用语义化的颜色变量 (`primary`, `muted-foreground` 等)
- 保持一致的间距和圆角
- 支持响应式设计 (`md:`, `lg:` 断点)

### 国际化
- 主要语言: 中文 (zh-CN)
- HTML lang 属性设置为 "zh-CN"
- 用户界面文本使用中文

## 部署信息
- **推荐平台**: Vercel
- **构建输出**: 静态导出支持
- **环境变量**: 当前无特殊环境变量要求
- **许可证**: MIT License

## Git信息
- **远程仓库**: https://github.com/jinzhepro/dev-tools.git
- **当前分支**: 包含一些已删除的文档文件
- **项目状态**: 活跃开发中