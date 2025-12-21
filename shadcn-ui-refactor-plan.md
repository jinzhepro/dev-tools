# shadcn/ui 重构计划

## 项目概述

本项目是一个现代化的开发工具集，目前使用自定义样式和部分 shadcn/ui 组件。目标是全面使用 shadcn/ui 重构所有 UI 组件，保持核心功能的同时优化布局和交互体验。

## 当前状态分析

### 已配置的 shadcn/ui 组件

- Button, Card, Input, Textarea, Label
- RadioGroup, Select, Alert, Separator
- Badge, Checkbox, Progress, Dialog
- Tabs, Skeleton, Sonner (Toast)

### 组件分类

1. **已使用 shadcn/ui 的组件** (需要微调优化)

   - TimestampGenerator.js
   - JsonConverter.js
   - NumberBaseConverter.js
   - QrCodeGenerator.js

2. **需要完全重构的组件** (使用自定义样式)

   - Base64EncoderDecoder.js
   - UrlEncoderDecoder.js
   - HashGenerator.js
   - ColorConverter.js
   - UuidGenerator.js
   - IpInfoChecker.js
   - Geocoder.js

3. **布局组件**
   - src/app/page.js (首页)
   - src/app/[toolId]/page.js (工具页面布局)

## 重构策略

### 设计原则

1. **保持功能完整性** - 所有现有功能必须保留
2. **统一设计语言** - 使用 shadcn/ui 的设计系统
3. **优化用户体验** - 改进交互和响应式设计
4. **提高可维护性** - 使用组件化开发模式

### 颜色和主题

- 保持现有的蓝紫渐变主题 (`from-blue-600 to-purple-600`)
- 使用 shadcn/ui 的颜色变量系统
- 统一 hover、active、focus 状态
- 支持暗色模式（未来扩展）

### 间距和布局

- 使用 shadcn/ui 的间距标准
- 统一组件内边距和外边距
- 优化响应式断点
- 改进网格布局

## 重构计划

### 阶段 1: 基础布局重构

1. **首页重构** (src/app/page.js)

   - 优化搜索框组件
   - 改进分类按钮布局
   - 统一工具卡片样式
   - 添加加载状态

2. **工具页面布局** (src/app/[toolId]/page.js)
   - 优化导航栏
   - 改进页面结构
   - 统一返回按钮样式

### 阶段 2: 工具组件重构

#### 已使用 shadcn/ui 的组件 (优化)

1. **TimestampGenerator.js**

   - 优化卡片布局
   - 改进复制按钮交互
   - 统一颜色使用

2. **JsonConverter.js**

   - 优化输入输出区域
   - 改进示例数据展示
   - 统一按钮样式

3. **NumberBaseConverter.js**

   - 优化单选按钮布局
   - 改进结果显示
   - 统一交互反馈

4. **QrCodeGenerator.js**
   - 优化预览区域
   - 改进下载功能
   - 统一错误处理

#### 需要完全重构的组件

5. **Base64EncoderDecoder.js**

   - 替换自定义按钮为 Button 组件
   - 使用 Card 组件重构布局
   - 添加 Textarea 组件
   - 使用 Alert 组件替换自定义错误提示

6. **UrlEncoderDecoder.js**

   - 同 Base64EncoderDecoder 重构策略
   - 统一交互模式

7. **HashGenerator.js**

   - 使用 Checkbox 组件替换自定义复选框
   - 使用 Card 组件重构结果展示
   - 优化批量操作界面

8. **ColorConverter.js**

   - 使用 Input 组件替换自定义输入
   - 使用 RadioGroup 组件替换自定义单选
   - 优化颜色预览组件

9. **UuidGenerator.js**

   - 使用 Card 组件重构布局
   - 优化批量生成界面
   - 统一复制功能

10. **IpInfoChecker.js**

    - 使用 Card 组件重构信息展示
    - 优化加载状态
    - 统一按钮样式

11. **Geocoder.js**
    - 使用 Tabs 组件替换自定义标签页
    - 优化搜索结果展示
    - 改进地图集成

### 阶段 3: 全局优化

1. **样式系统优化**

   - 统一颜色变量
   - 优化字体系统
   - 改进动画效果

2. **响应式设计**

   - 测试所有断点
   - 优化移动端体验
   - 统一交互模式

3. **性能优化**
   - 组件懒加载
   - 优化重渲染
   - 减少包体积

## 组件映射表

| 自定义组件     | shadcn/ui 组件 | 说明                 |
| -------------- | -------------- | -------------------- |
| 自定义按钮     | Button         | 统一按钮样式和变体   |
| 自定义卡片     | Card           | 统一卡片布局和样式   |
| 自定义输入框   | Input          | 统一输入框样式和验证 |
| 自定义文本域   | Textarea       | 统一文本域样式       |
| 自定义单选按钮 | RadioGroup     | 统一单选按钮组       |
| 自定义下拉选择 | Select         | 统一下拉选择组件     |
| 自定义复选框   | Checkbox       | 统一复选框样式       |
| 自定义错误提示 | Alert          | 统一警告和错误提示   |
| 自定义标签页   | Tabs           | 统一标签页组件       |
| 自定义标签     | Badge          | 统一标签样式         |
| 自定义分隔线   | Separator      | 统一分隔线样式       |
| 自定义加载状态 | Skeleton       | 统一加载状态展示     |
| 自定义通知     | Sonner         | 统一 Toast 通知      |

## 代码规范

### 组件结构

```jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// 其他shadcn/ui组件

export default function ComponentName() {
  // 状态管理
  const [state, setState] = useState();

  // 事件处理函数
  const handleAction = () => {
    // 处理逻辑
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">{/* 组件内容 */}</div>
  );
}
```

### 样式规范

- 使用 shadcn/ui 的 className 规范
- 保持一致的间距和布局
- 使用语义化的颜色变量
- 响应式设计优先

### 交互规范

- 统一的 hover 和 focus 状态
- 一致的加载状态处理
- 统一的错误处理模式
- 无障碍访问支持

## 测试计划

### 功能测试

- 所有现有功能正常工作
- 新的交互体验符合预期
- 错误处理正确

### 视觉测试

- 设计一致性检查
- 响应式布局测试
- 颜色和字体一致性

### 性能测试

- 页面加载速度
- 组件渲染性能
- 内存使用情况

## 部署计划

### 预发布测试

- 本地开发环境测试
- 预发布环境验证
- 用户验收测试

### 发布策略

- 分阶段发布
- 回滚计划
- 监控和反馈

## 风险评估

### 技术风险

- 组件兼容性问题
- 样式冲突
- 性能影响

### 缓解措施

- 充分的测试覆盖
- 渐进式重构
- 详细的回滚计划

## 成功指标

### 用户体验

- 界面一致性提升
- 交互体验改善
- 响应速度提升

### 开发体验

- 代码可维护性提升
- 开发效率提高
- 组件复用性增强

### 技术指标

- 代码质量提升
- 性能优化
- 包体积控制

---

_此重构计划将确保项目在保持所有现有功能的基础上，全面升级到 shadcn/ui 组件系统，提供更好的用户体验和开发体验。_
