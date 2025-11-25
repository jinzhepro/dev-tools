# 项目调试规则 (非显而易见)

- 调试模式：使用 Next.js dev server 时开启浏览器开发者工具进行组件调试
- 组件状态：所有工具组件都使用 React hooks (useState)，可直接在 React DevTools 中查看和修改状态
- 错误调试：组件统一使用 `useState` 管理错误状态，错误信息格式为 `"转换失败：" + err.message`
- Tailwind CSS：使用 `@theme inline` 模式，在浏览器中可直接修改 CSS 变量进行样式调试
