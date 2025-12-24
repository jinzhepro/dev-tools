# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目文档规则 (仅非显而易见信息)

### 项目结构理解

- 这是一个工具集合网站，每个工具都是独立的 React 组件
- 工具配置在 `src/data/tools.js` 中，包含 ID、名称、描述和组件映射
- 动态路由 `[toolId]` 根据工具 ID 渲染对应的组件

### 技术栈特点

- 使用 Next.js 16.0.4 的 App Router，但所有组件都是客户端组件
- 配置了 TypeScript 但实际使用 JavaScript 文件
- 使用 Tailwind CSS v4 (不是 v3) 和 shadcn/ui 组件库
- React 编译器已启用，影响组件优化策略

### 组件设计模式

- 所有工具组件遵循相同的 UI 模式：Card 包装 + 标题区域 + 工作区域
- 使用 `cn()` 函数合并 Tailwind 类名，而不是直接使用 clsx
- 错误处理使用 try/catch + Alert 组件显示
- 操作反馈使用 toast (sonner) 而不是 alert

### 路由系统

- 主页显示所有工具的网格布局，支持搜索和分类筛选
- 工具页面使用动态路由，URL 结构为 `/{toolId}`
- 静态生成所有工具页面，通过 `generateStaticParams` 实现

### 样式系统

- 使用 shadcn/ui 的 New York 风格，基于 CSS 变量
- 颜色系统配置为 neutral 基础色
- 响应式设计使用 Tailwind 的断点系统
