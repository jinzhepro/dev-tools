# Project Coding Rules (Non-Obvious Only)

- 所有客户端组件必须使用 `"use client"` 指令在文件顶部（React 19.2.0 要求）
- 工具组件注册在 `src/data/tools.js` 中，组件名称必须与 `componentMap` 中键名完全匹配
- 新工具必须同时更新 `tools.js` 中的数据结构并在 `src/app/[toolId]/page.js` 中添加导入
- 使用 `jsx` 文件扩展名而非 `.jsx`，遵循 Next.js 16.0.4 约定
- 字体导入必须使用 `next/font/google` 的 Geist 和 Geist_Mono，变量名必须为 `--font-geist-sans` 和 `--font-geist-mono`
- Tailwind CSS v4 使用 `@theme inline` 配置，不使用传统的 `tailwind.config.js`
- CSS 变量定义位置在 `src/app/globals.css` 的 `:root` 中
- 中文字符串直接嵌入 JSX，无需额外的国际化配置
- React Compiler 会自动优化组件，避免手动 `useMemo`/`useCallback` 除非性能测试证明必要
- 错误处理使用 try/catch，在组件中设置 `error` 状态而非 throw Error
