# 🚀 开发工具集

[![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个现代化、轻量级的开发工具集网站，由 [Grok Code Fast 1](https://x.ai) 开发。提供开发者常用的在线工具，支持 JSON 处理、编码转换、时间戳生成等功能。

## ✨ 功能特性

### 🔧 核心工具

- **JSON 转换器** - JSON 压缩、格式化、转义和反转义
- **时间戳生成器** - 生成当前时间戳，支持多种格式
- **二维码生成器** - 将链接或文本转换为二维码
- **Base64 编码器** - Base64 编码和解码工具
- **Hash 生成器** - 生成 MD5、SHA1、SHA256、SHA512 哈希
- **颜色转换器** - HEX、RGB、HSL 颜色格式互转

### 🎨 用户体验

- 🌐 响应式设计，支持桌面和移动设备
- ⚡ 快速加载，基于 Next.js 构建
- 🎯 直观界面，操作简单
- 🔄 实时预览，结果即时显示

## 🛠️ 技术栈

- **前端框架**: [Next.js 16](https://nextjs.org/) - React 全栈框架
- **UI 库**: [React 19](https://reactjs.org/) - 用户界面库
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **加密库**: [CryptoJS](https://cryptojs.gitbook.io/docs/) - JavaScript 加密库
- **二维码**: [qrcode.react](https://github.com/zpao/qrcode.react) - React 二维码组件

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看应用。

## 📁 项目结构

```
tool-website/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.js       # 根布局
│   │   ├── page.js         # 首页
│   │   └── [toolId]/       # 动态工具页面
│   ├── components/         # React 组件
│   │   ├── JsonConverter.js
│   │   ├── TimestampGenerator.js
│   │   └── ...
│   ├── data/               # 数据文件
│   │   └── tools.js        # 工具配置
│   └── utils/              # 工具函数
├── public/                 # 静态资源
└── package.json
```

## 🏗️ 构建和部署

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

### 部署到 Vercel

推荐使用 [Vercel](https://vercel.com) 进行部署：

1. 连接你的 GitHub 仓库到 Vercel
2. 导入项目
3. 自动部署完成

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 开发规范

- 使用 ESLint 进行代码检查
- 遵循 React 和 Next.js 最佳实践
- 添加适当的注释和文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Grok Code Fast 1](https://x.ai) - 项目开发者
- [Next.js](https://nextjs.org/) - 强大的 React 框架
- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- [Vercel](https://vercel.com/) - 优秀的部署平台

---

<div align="center">
  <p>由 <strong>Grok Code Fast 1</strong> 开发 • 使用 Next.js + React + Tailwind CSS 构建</p>
  <p>
    <a href="https://github.com/username/repo-name">GitHub</a> •
    <a href="https://x.ai">xAI</a>
  </p>
</div>
