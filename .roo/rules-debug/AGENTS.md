# Project Debug Rules (Non-Obvious Only)

- React Compiler 在生产构建中可能掩盖错误，确保在开发模式下测试所有功能
- 使用 `generateStaticParams()` 静态生成，调试时可能看不到动态路由的实际渲染
- CSS 使用 `@theme inline` 配置，某些样式变更可能需要重启开发服务器
- Next.js 16.0.4 在 App Router 中错误处理不同于 Pages Router，需要检查 `notFound()` 的正确使用
- 字体加载通过 `next/font/google`，调试字体问题需检查字体文件的网络请求
- 组件错误边界不会自动捕获异步操作中的错误，需要手动在异步函数中处理错误
- ESLint 9 配置可能比 ESLint 8 更严格，某些代码模式可能在新版本中报错
