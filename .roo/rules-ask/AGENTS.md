# Project Documentation Rules (Non-Obvious Only)

- 这是一个 Next.js 工具网站项目，包含各种开发工具（JSON 转换、时间戳生成、二维码生成等）
- 项目使用 React Compiler 进行自动优化，组件渲染逻辑可能与标准 React 模式不同
- 所有文档和界面使用中文，但代码注释和变量名使用英文
- 项目结构：`src/components/` 存放各种工具组件，`src/data/tools.js` 定义工具列表和元数据
- 动态路由结构：`src/app/[toolId]/page.js` 负责渲染特定工具页面
- 静态生成策略通过 `generateStaticParams()` 实现，所有工具页面在构建时预生成
- CSS 使用 Tailwind v4 和 `@theme inline`，不是标准的 Tailwind 配置方式
- 字体使用 Geist 系列（` Geist` 和 ` Geist_Mono`），通过 next/font/google 导入
- 工具组件使用 `"use client"` 指令，遵循 React 19.2.0 的要求
