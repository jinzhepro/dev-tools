# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目编码规则 (仅非显而易见信息)

### 组件开发规范

- 所有组件必须使用 `"use client"` 指令，即使是服务端组件
- 组件文件使用 `.js` 扩展名，尽管项目配置了 TypeScript
- 工具组件必须遵循现有的 UI 模式：使用 Card 组件包装，包含标题区域和工作区域

### 导入和路径规范

- 必须使用 `@/` 别名导入，例如 `@/components/ui/button`
- UI 组件从 `@/components/ui/` 导入，而不是直接从 shadcn/ui
- 工具函数从 `@/lib/utils.js` 导入，特别是 `cn()` 函数用于类名合并

### 样式规范

- 使用 Tailwind CSS v4，不是 v3
- 必须使用 `cn()` 函数合并类名，不要直接使用 clsx 或 tailwind-merge
- 颜色使用 CSS 变量系统，配置为 neutral 基础色

### 工具组件结构

- 每个工具组件必须是默认导出
- 使用 useState 管理组件状态
- 使用 toast (sonner) 显示操作反馈，不要使用 alert
- 错误处理使用 try/catch，错误信息显示在 Alert 组件中

### 动态路由集成

- 新工具必须在 `src/data/tools.js` 中添加配置
- 必须在 `src/app/[toolId]/page.js` 的 `componentMap` 中注册
- 工具 ID 使用 kebab-case 格式

### React 编译器兼容性

- React 编译器已启用，代码必须兼容编译器要求
- 避免使用编译器不推荐的模式，如手动 memo 优化
