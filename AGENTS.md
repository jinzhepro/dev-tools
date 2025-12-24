# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目概述

这是一个基于 Next.js 的开发工具集网站，提供多种常用开发工具的在线版本。

## 技术栈

- Next.js 16.0.4 (App Router)
- React 19.2.0
- Tailwind CSS v4
- shadcn/ui 组件库
- TypeScript 配置但使用 JavaScript 文件 (.js)

## 构建和开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
```

## 项目结构关键点

- 使用 App Router 结构，所有页面在 `src/app/` 目录
- 工具组件位于 `src/components/` 目录
- 工具数据配置在 `src/data/tools.js`
- 动态路由 `[toolId]` 用于渲染不同工具页面
- 使用 `componentMap` 在动态路由中映射工具组件

## 代码风格约定

- 使用 JavaScript 而非 TypeScript (尽管有 tsconfig)
- 组件文件使用 `.js` 扩展名
- 使用 `"use client"` 指令标记客户端组件
- 导入路径使用 `@/` 别名指向 `src/` 目录
- 使用 shadcn/ui 组件库的组件模式
- 使用 Tailwind CSS 进行样式设计
- 使用 `cn()` 工具函数合并类名

## 添加新工具的步骤

1. 在 `src/components/` 创建新工具组件
2. 在 `src/data/tools.js` 中添加工具配置
3. 在 `src/app/[toolId]/page.js` 的 `componentMap` 中注册组件
4. 工具组件应遵循现有的 UI 模式和样式

## 重要配置

- React 编译器已启用 (`reactCompiler: true`)
- 使用 Next.js 核心网络规范 ESLint 配置
- shadcn/ui 配置为 New York 风格，使用 CSS 变量
- 路径别名: `@/*` 指向 `./src/*`
