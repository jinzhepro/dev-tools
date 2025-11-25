# Project Architecture Rules (Non-Obvious Only)

- 项目采用 Next.js App Router 架构，使用静态生成策略，所有工具页面通过 `generateStaticParams()` 预生成
- 工具管理系统采用数据驱动模式：`src/data/tools.js` 定义所有工具元数据，`src/app/[toolId]/page.js` 使用 `componentMap` 动态加载组件
- CSS 架构使用 Tailwind CSS v4 的 `@theme inline` 配置，替代传统的 `tailwind.config.js`，在 `src/app/globals.css` 中定义主题变量
- 字体系统完全基于 `next/font/google`，使用 Geist 字体族，创建专用的 CSS 变量 `--font-geist-sans` 和 `--font-geist-mono`
- React Compiler (reactCompiler: true) 是项目核心优化策略，组件会自动进行性能优化，不需要手动使用 useMemo/useCallback
- 工具组件强制使用 `"use client"` 指令，因为所有工具都是交互式客户端组件
- 路径映射通过 `jsconfig.json` 配置 `@/*` 指向 `src/*`，简化导入路径
- 中文界面策略：UI 和文档使用中文，但代码和变量命名使用英文
- 组件架构遵循单一职责原则，每个工具在 `src/components/` 中有独立组件文件
