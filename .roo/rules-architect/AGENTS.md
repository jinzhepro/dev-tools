# 项目架构规则 (非显而易见)

- React Compiler：项目使用 React 19.2.0 + React Compiler (`reactCompiler: true`)，自动优化组件，无需手动 memoization
- 组件映射架构：`src/app/[toolId]/page.js` 通过 `componentMap` 实现动态组件加载，新工具必须在 `src/data/tools.js` 中注册
- Tailwind v4：使用 `@theme inline` 语法而非配置文件，CSS 变量在 `src/app/globals.css` 中定义
- 静态生成：所有工具页面通过 `generateStaticParams` 实现静态生成，适合工具类网站的 SEO 和性能需求
