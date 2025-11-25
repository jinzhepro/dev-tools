# 项目编码规则 (非显而易见)

- 组件映射模式：所有工具页面使用 `src/app/[toolId]/page.js` 中的 `componentMap` 动态加载组件，新工具必须：

  1. 在 `src/data/tools.js` 中注册
  2. 在 `componentMap` 中导入映射
  3. 使用 `"use client"` 指令
  4. 实现 `generateStaticParams` 返回

- React 编译器已启用 (`reactCompiler: true`)，避免手动 memoization，依赖自动优化

- 所有 React 组件文件必须使用 `.js` 扩展名而非 `.jsx`，路径别名 `@/*` 在 `jsconfig.json` 中配置

- 组件错误处理模式：统一使用 `useState` 错误状态管理模式，错误显示格式为 `"转换失败：" + err.message`
