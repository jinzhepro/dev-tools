# DevTools

> 简洁高效的开发工具集，一站式解决日常开发需求

![DevTools Banner](https://img.shields.io/badge/Dev-Tools-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61dafb?style=flat&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## 简介

DevTools 是一个轻量级的在线开发工具集合，提供 JSON 处理、编码转换、哈希生成等常用工具。所有工具在浏览器本地运行，无需服务器，保护您的数据安全。

## 工具列表

- **JSON 转换器** - 压缩、格式化、转义、反转义
- **时间戳生成器** - Unix 时间戳、ISO 8601、本地时间
- **二维码生成器** - 链接、文本转二维码，支持下载
- **Base64 编解码** - 文本与 Base64 互转，支持中文
- **URL 编解码** - URL 编码和解码工具
- **Hash 生成器** - MD5、SHA1、SHA256、SHA512
- **颜色转换器** - HEX、RGB、HSL 格式互转
- **UUID 生成器** - 生成 UUID v4，支持批量
- **IP 地址查询** - 查询 IP 信息和地理位置
- **进制转换器** - 二进制、八进制、十进制、十六进制
- **地理编码** - 地址与坐标互查
- **图片压缩** - 在线压缩，支持多种格式
- **密码强度检测** - 强度分析、安全建议

## 技术栈

<table>
  <tr>
    <td><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" /></td>
    <td>App Router, Server Components</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/React-19-61dafb?logo=react" alt="React" /></td>
    <td>Hooks, Concurrent Features</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss" alt="Tailwind" /></td>
    <td>Utility-first CSS</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/shadcn/ui-latest-000?logo=shadcnui" alt="shadcn/ui" /></td>
    <td>UI Components</td>
  </tr>
</table>

## 快速开始

### 前置要求

- Node.js >= 18.0
- npm 或 yarn

### 安装运行

```bash
# 克隆项目
git clone https://github.com/jinzhepro/dev-tools.git
cd dev-tools

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 构建部署

```bash
# 生产构建
npm run build

# 启动生产服务
npm start

# 代码检查
npm run lint
```

## 项目结构

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.js         # 首页
│   │   └── [toolId]/       # 动态工具路由
│   ├── components/         # React 组件
│   │   ├── ui/            # shadcn/ui 组件
│   │   └── *.js           # 工具组件
│   ├── hooks/             # 自定义 Hooks
│   ├── lib/               # 工具函数
│   └── data/              # 静态数据
├── public/                # 静态资源
└── package.json
```

## 核心特性

### 🚀 高性能
- Next.js 16 服务端渲染
- 客户端本地运行，无网络延迟
- 即时响应，无需等待

### 🔒 隐私安全
- 所有操作在浏览器本地完成
- 不上传任何数据到服务器
- 开源代码，透明可审计

### 📱 响应式设计
- 完美适配桌面和移动设备
- 触摸友好的界面
- 自适应布局

### 🎨 简洁界面
- 统一的设计语言
- 清晰直观的操作
- 无干扰的工作区域

## 添加新工具

1. 在 `src/data/tools.js` 添加工具配置：

```javascript
{
  id: 'new-tool',
  name: '新工具名称',
  description: '工具描述',
  category: '分类',
  component: 'NewTool'
}
```

2. 在 `src/components/` 创建组件 `NewTool.js`

3. 在 `src/app/[toolId]/page.js` 注册组件

4. 遵循现有代码风格和设计规范

## 开发规范

```bash
# 代码格式化
npm run lint

# 提交信息格式
git commit -m "feat: add new tool"
git commit -m "fix: resolve json converter bug"
git commit -m "docs: update readme"
```

## 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 反馈与支持

- 🐛 报告问题：[GitHub Issues](https://github.com/jinzhepro/dev-tools/issues)
- 💡 功能建议：[GitHub Discussions](https://github.com/jinzhepro/dev-tools/discussions)
- 📧 联系作者：[GitHub](https://github.com/jinzhepro)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 统计

![Stars](https://img.shields.io/github/stars/jinzhepro/dev-tools?style=social)
![Forks](https://img.shields.io/github/forks/jinzhepro/dev-tools?style=social)
![Issues](https://img.shields.io/github/issues/jinzhepro/dev-tools)
![PRs](https://img.shields.io/github/issues-pr/jinzhepro/dev-tools)

---

Built with ❤️ by [jinzhepro](https://github.com/jinzhepro)
