# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build Commands

- `npm run dev` - 启动开发服务器 (Next.js)
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## Architecture Patterns

- 工具网站使用 Next.js App Router 结构 (`src/app/`)
- 动态路由处理：`src/app/[toolId]/page.js` + `src/app/[toolId]/page.js` 文件
- 工具注册在 `src/data/tools.js` 中，使用 `componentMap` 进行组件映射
- 使用 `generateStaticParams()` 进行静态生成所有工具页面

## Key Non-Obvious Conventions

- 项目使用 **React Compiler** (`reactCompiler: true`)，组件会自动优化
- 路径映射配置：`@/*` 指向 `src/*` (见 `jsconfig.json`)
- 使用 **Geist 字体** (` Geist` 和 ` Geist_Mono`)，通过 `next/font/google` 导入
- **Tailwind CSS v4**（非 v3），使用 `@theme inline` 配置主题
- 所有组件使用 **中文界面和注释**
- **静态生成策略**：`generateStaticParams()` 预生成所有工具页面
- **命名约定**：组件和工具 ID 使用驼峰命名法，工具页面路由使用短横线分隔符

## Critical Technical Details

- **React 19.2.0** + **Next.js 16.0.4**（版本兼容性重要）
- 使用 **ESLint 9** 配置 `eslint-config-next/core-web-vitals`
- 字体通过 `next/font/google` 优化，支持 variable fonts
- 工具数据结构和组件映射必须保持同步
- CSS 变量通过 `@theme inline` 定义，支持深色模式自动切换
