# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## 项目调试规则 (仅非显而易见信息)

### 开发环境调试

- 使用 `npm run dev` 启动开发服务器，默认端口 3000
- React 编译器已启用，调试时注意编译器优化可能影响调试体验
- ESLint 配置使用 Next.js 核心网络规范，严格模式开启

### 常见调试问题

- 动态路由工具页面如果 404，检查 `src/data/tools.js` 和 `componentMap` 是否正确配置
- 组件样式问题：确认使用了 `cn()` 函数合并类名，而不是直接使用 clsx
- Toast 通知不显示：确认在根布局中包含了 `<Toaster />` 组件

### 性能调试

- 使用 Tailwind CSS v4，调试样式时注意 v4 与 v3 的差异
- shadcn/ui 组件使用 CSS 变量系统，检查 `src/app/globals.css` 中的变量定义
- React 编译器会自动优化组件，避免手动添加不必要的 memo 优化

### 网络请求调试

- IP 查询和地理编码工具依赖外部 API，检查网络连接和 API 可用性
- 所有工具都是客户端渲染，没有服务端 API 调用
