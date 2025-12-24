# 🛠️ DevTools - 现代化开发工具集

<div align="center">
  <img src="public/globe.svg" alt="DevTools Logo" width="120" height="120">
  
  <h3>一站式开发者工具平台</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-blue?style=for-the-badge&logo=shadcnui)](https://ui.shadcn.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=mit)](https://opensource.org/licenses/MIT)
  
  <p>
    <a href="#-功能特性">功能</a> •
    <a href="#-技术栈">技术栈</a> •
    <a href="#-快速开始">开始</a> •
    <a href="#-项目结构">结构</a> •
    <a href="#-贡献">贡献</a>
  </p>
</div>

## 📖 简介

DevTools 是一个现代化、轻量级的开发工具集网站，专为开发者设计。它提供了日常开发中常用的在线工具，包括 JSON 处理、编码转换、时间戳生成等功能。项目采用最新的技术栈和 shadcn/ui 设计系统，提供一致且优雅的用户体验。

## ✨ 功能特性

### 🔧 核心工具

| 工具                 | 功能描述                                     | 状态 |
| -------------------- | -------------------------------------------- | ---- |
| 🔄 **JSON 转换器**   | JSON 压缩、格式化、转义和反转义              | ✅   |
| ⏰ **时间戳生成器**  | 生成当前时间戳，支持多种格式                 | ✅   |
| 📱 **二维码生成器**  | 将链接或文本转换为二维码                     | ✅   |
| 🔐 **Base64 编码器** | Base64 编码和解码工具                        | ✅   |
| 🔗 **URL 编码器**    | URL 编码和解码工具                           | ✅   |
| 🔒 **Hash 生成器**   | 生成 MD5、SHA1、SHA256、SHA512 哈希          | ✅   |
| 🎨 **颜色转换器**    | HEX、RGB、HSL 颜色格式互转                   | ✅   |
| 🆔 **UUID 生成器**   | 生成 UUID v4，支持单个和批量生成             | ✅   |
| 🌍 **IP 地址查询**   | 查询 IP 地址信息和地理位置                   | ✅   |
| 🔢 **进制转换器**    | 二进制、八进制、十进制、十六进制相互转换     | ✅   |
| 📍 **地理编码查询**  | 基于地址查询坐标和基于坐标查询地址           | ✅   |
| 🖼️ **图片压缩工具**  | 在线压缩图片，减小文件大小，支持多种格式转换 | ✅   |
| 🔑 **密码强度检测**  | 检测密码强度，提供安全建议，生成强密码       | ✅   |

### 🎨 用户体验

- 🌐 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **极速加载** - 基于 Next.js 16 的高性能架构
- 🎯 **统一设计** - 基于 shadcn/ui 的现代化组件系统
- 🔄 **实时预览** - 所有操作即时反馈，无需等待
- 🎨 **优雅界面** - 简洁直观的用户界面设计
- 🌙 **主题支持** - 内置亮色和暗色主题切换
- ♿ **无障碍访问** - 符合 WCAG 2.1 标准

## 🛠️ 技术栈

### 前端框架

- **[Next.js 16](https://nextjs.org/)** - React 全栈框架，支持 App Router
- **[React 19](https://reactjs.org/)** - 最新的 React 版本，支持并发特性
- **[React Compiler](https://react.dev/learn/react-compiler)** - 自动优化 React 组件

### UI 与样式

- **[shadcn/ui](https://ui.shadcn.com/)** - 基于 Radix UI 的现代组件库
- **[Tailwind CSS 4](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Lucide React](https://lucide.dev/)** - 现代化图标库
- **[next-themes](https://github.com/pacocoursey/next-themes)** - 主题切换支持

### 功能库

- **[CryptoJS](https://cryptojs.gitbook.io/docs/)** - JavaScript 加密库
- **[qrcode.react](https://github.com/zpao/qrcode.react)** - React 二维码组件
- **[Sonner](https://sonner.emilkowalski.com/)** - 优雅的 Toast 通知系统

### 开发工具

- **[ESLint](https://eslint.org/)** - 代码质量检查
- **[PostCSS](https://postcss.org/)** - CSS 处理工具
- **[TypeScript](https://www.typescriptlang.org/)** - 类型支持（配置但使用 JS）

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm、yarn、pnpm 或 bun 包管理器

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install

# 使用 bun
bun install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev

# 使用 bun
bun dev
```

打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看应用。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 📁 项目结构

```
tool-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js          # 根布局组件
│   │   ├── page.js            # 首页
│   │   ├── globals.css        # 全局样式
│   │   └── [toolId]/          # 动态工具页面路由
│   │       └── page.js        # 工具页面渲染逻辑
│   ├── components/            # React 组件
│   │   ├── ui/               # shadcn/ui 基础组件
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── ...
│   │   ├── Base64EncoderDecoder.js
│   │   ├── ColorConverter.js
│   │   ├── Geocoder.js
│   │   ├── HashGenerator.js
│   │   ├── ImageCompressor.js
│   │   ├── IpInfoChecker.js
│   │   ├── JsonConverter.js
│   │   ├── NumberBaseConverter.js
│   │   ├── PasswordStrengthChecker.js
│   │   ├── QrCodeGenerator.js
│   │   ├── TimestampGenerator.js
│   │   ├── UrlEncoderDecoder.js
│   │   └── UuidGenerator.js
│   ├── data/                  # 数据文件
│   │   └── tools.js          # 工具配置和元数据
│   ├── lib/                   # 工具函数
│   │   └── utils.js          # 通用工具函数
│   ├── contexts/              # React Context
│   └── hooks/                 # 自定义 React Hooks
├── public/                    # 静态资源
│   ├── globe.svg
│   ├── next.svg
│   └── ...
├── .roo/                      # 项目配置
├── components.json            # shadcn/ui 配置
├── eslint.config.mjs          # ESLint 配置
├── jsconfig.json              # JavaScript 项目配置
├── next.config.mjs            # Next.js 配置
├── package.json               # 项目依赖和脚本
└── README.md                  # 项目文档
```

## 🎨 设计系统

项目采用 [shadcn/ui](https://ui.shadcn.com/) 设计系统，提供：

- **统一的组件库** - Button、Card、Input、Textarea 等高质量组件
- **一致的设计语言** - 统一的颜色、间距、圆角、阴影系统
- **响应式设计** - 移动端优先，完美适配各种屏幕尺寸
- **可访问性** - 符合 WCAG 2.1 AA 标准
- **主题支持** - 预配置的亮色和暗色主题
- **动画效果** - 流畅的过渡和微交互

## 🏗️ 构建和部署

### 本地构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

### 部署到 Vercel

推荐使用 [Vercel](https://vercel.com) 进行一键部署：

1. 将代码推送到 GitHub 仓库
2. 连接你的 GitHub 仓库到 Vercel
3. 自动检测框架并配置构建设置
4. 部署完成，获得自动生成的 HTTPS 域名

### 其他部署选项

- **Netlify** - 支持静态站点部署
- **Railway** - 支持全栈应用部署
- **Docker** - 容器化部署
- **自托管** - 使用 PM2 或类似工具

## 🤝 贡献

我们欢迎所有形式的贡献！请遵循以下步骤：

### 贡献流程

1. **Fork** 本仓库到你的 GitHub 账户
2. **Clone** 你的 Fork 到本地
   ```bash
   git clone https://github.com/yourusername/dev-tools.git
   cd dev-tools
   ```
3. **创建** 特性分支
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **提交** 你的更改
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **推送** 到分支
   ```bash
   git push origin feature/amazing-feature
   ```
6. **创建** Pull Request

### 开发规范

- 遵循 [Conventional Commits](https://www.conventionalcommits.org/) 提交规范
- 使用 ESLint 进行代码检查，确保代码质量
- 遵循 React 和 Next.js 最佳实践
- 使用 shadcn/ui 组件保持设计一致性
- 添加适当的注释和文档

### 添加新工具

1. 在 `src/data/tools.js` 中添加工具配置
2. 在 `src/components/` 中创建工具组件
3. 在 `src/app/[toolId]/page.js` 中注册组件
4. 遵循现有的组件结构和命名规范
5. 确保响应式设计和无障碍访问

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE) - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目和社区：

- [Next.js](https://nextjs.org/) - 强大的 React 全栈框架
- [React](https://reactjs.org/) - 用户界面库
- [Tailwind CSS](https://tailwind.com/) - 优秀的 CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 现代化的 React 组件库
- [Radix UI](https://www.radix-ui.com/) - 无障碍的原始组件
- [Vercel](https://vercel.com/) - 优秀的部署平台
- [Lucide](https://lucide.dev/) - 美观的图标库

## 📊 项目统计

![GitHub stars](https://img.shields.io/github/stars/jinzhepro/dev-tools?style=social)
![GitHub forks](https://img.shields.io/github/forks/jinzhepro/dev-tools?style=social)
![GitHub issues](https://img.shields.io/github/issues/jinzhepro/dev-tools)
![GitHub pull requests](https://img.shields.io/github/issues-pr/jinzhepro/dev-tools)

---
