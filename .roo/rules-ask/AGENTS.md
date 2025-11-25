# 项目文档规则 (非显而易见)

- 工具配置：`src/data/tools.js` 包含所有工具的元数据和组件映射信息
- 组件实现：`src/components/` 目录包含所有工具组件，都遵循 `"use client"` + `useState` 错误处理模式
- 路由架构：`src/app/[toolId]/page.js` 实现动态路由，组件通过 `componentMap` 动态加载
- 样式系统：`src/app/globals.css` 使用 Tailwind v4 的 `@theme inline` 语法，不使用传统的配置文件
