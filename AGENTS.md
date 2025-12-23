# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 关键架构模式

**组件映射模式**: 所有工具页面使用 `src/app/[toolId]/page.js` 中的 `componentMap` 动态加载组件，新工具必须：

1. 在 `src/data/tools.js` 中注册
2. 在 `componentMap` 中导入映射
3. 使用 `"use client"` 指令
4. 实现 `generateStaticParams` 返回

**React Compiler**: 项目已启用 React Compiler (`reactCompiler: true`)，避免手动 memoization，依赖自动优化。

## 样式系统

**Tailwind v4 特性**: 使用 `@theme inline` 语法而非配置文件，CSS 变量在 `src/app/globals.css` 的 `:root` 中定义，字体通过 `Geist` 优化加载。

## 错误处理约定

组件统一使用 `useState` 错误状态管理模式，错误显示格式为 `"转换失败：" + err.message`。

## 开发模式要求

所有 React 组件文件必须使用 `.js` 扩展名而非 `.jsx`，路径别名 `@/*` 在 `jsconfig.json` 中配置。
