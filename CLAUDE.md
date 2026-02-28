# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 的在线开发工具集网站，提供多种常用的开发工具（JSON 转换、Base64 编码、二维码生成等）。

## 技术栈

- **框架**: Next.js 16 (App Router, RSC)
- **React**: 19
- **UI**: shadcn/ui (new-york 风格)
- **样式**: Tailwind CSS 4
- **语言**: JavaScript (非 TypeScript)
- **图标**: Lucide React
- **通知**: Sonner
- **主题**: next-themes

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint
```

## 架构结构

```
src/
├── app/
│   ├── [toolId]/page.js   # 动态工具页面路由
│   ├── layout.js          # 根布局（包含页脚）
│   ├── page.js            # 首页（工具列表）
│   └── globals.css        # 全局样式
├── components/
│   ├── ui/                # shadcn/ui 组件
│   └── *.js               # 工具组件（如 JsonConverter.js）
├── data/
│   └── tools.js           # 工具配置和分类定义
├── hooks/                 # 自定义 React Hooks
│   ├── useCopyClipboard.js
│   ├── useAsyncOperation.js
│   └── useClearForm.js
└── lib/
    └── utils.js           # cn() 工具函数
```

## 添加工具

在 `src/data/tools.js` 中添加新工具配置：

```js
{
  id: "tool-id",           // 路由路径
  name: "工具名称",
  description: "工具描述",
  category: "分类",        // 编码/解码、生成器、转换、网络、安全、工具
  component: "ComponentName",
}
```

然后在 `src/app/[toolId]/page.js` 中导入并注册组件到 `componentMap`。

## 自定义 Hooks

- **useCopyClipboard**: 复制到剪贴板，自动显示成功提示
- **useAsyncOperation**: 管理异步操作状态（loading、error），集成 Sonner 提示
- **useClearForm**: 清空表单状态，支持多种数据类型

## UI 组件

使用 shadcn/ui 组件，导入路径：
```js
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// 其他组件同理
```

使用 `cn()` 函数合并类名：
```js
import { cn } from "@/lib/utils";
className={cn("base-class", conditional && "conditional-class")}
```

## 注意事项

- 项目使用 JavaScript 而非 TypeScript
- 所有工具组件在 `src/components/` 下独立管理
- 工具分类在 `src/data/tools.js` 中统一定义
- 使用 React Compiler 优化性能
