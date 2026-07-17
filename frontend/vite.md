# Vite 技术文档

## 一、核心定位与架构解析

### 1.1 颠覆性创新

- **Native ESM 驱动**：基于浏览器原生模块系统构建，实现按需编译
- **双引擎架构**：
  - **Dev Server**：基于 [esbuild](https://esbuild.github.io/) 的毫秒级冷启动
  - **生产构建**：集成 [Rollup](https://rollupjs.org/) 的稳定打包能力
- **HMR 优化**：文件级更新速度比 Webpack 快 5-10 倍

### 1.2 性能对比

| 指标       | Vite  | Webpack | Parcel |
| ---------- | ----- | ------- | ------ |
| 冷启动时间 | 300ms | 15s     | 8s     |
| HMR 更新   | 50ms  | 800ms   | 300ms  |
| 构建时间   | 12s   | 45s     | 30s    |
| 内存占用   | 200MB | 1.2GB   | 600MB  |

## 二、工程化配置详解

### 2.1 核心配置文件

```typescript [vite.config.ts]
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "#": "/types",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.example.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

### 2.2 环境变量管理

```bash
.env                # 所有环境加载
.env.local          # 本地覆盖配置
.env.development    # 开发环境
.env.production     # 生产环境
```

通过 `import.meta.env` 访问：

- `MODE`: 当前环境模式
- `BASE_URL`: 部署基础路径
- `PROD`: 是否生产环境
- `DEV`: 是否开发环境

## 三、高级开发技巧

### 3.1 动态导入优化

```javascript
// 自动代码分割
const module = await import(`./modules/${name}.js`);

// 预加载提示
import(/* webpackPreload: true */ "./critical-module.js");
```

### 3.2 CSS 模块化方案

```css [style.module.css]
.container {
  --primary-color: #1890ff;
}

.title {
  color: var(--primary-color);
  composes: baseFont from "./base.css";
}
```

```typescript
import styles from "./style.module.css";
document.getElementById("app").className = styles.container;
```

## 四、插件开发指南

### 4.1 自定义插件结构

```typescript
interface VitePlugin {
  name: string;
  config?: (config: UserConfig) => UserConfig | null | void;
  transform?: (
    code: string,
    id: string,
  ) => string | { code: string; map?: SourceMap };
  configureServer?: (server: ViteDevServer) => void;
}
```

### 4.2 实战示例：Markdown 转换插件

```typescript
import { Plugin } from "vite";
import marked from "marked";

export function markdownPlugin(): Plugin {
  return {
    name: "vite-md-plugin",
    transform(code, id) {
      if (!id.endsWith(".md")) return;
      const html = marked(code);
      return `export default ${JSON.stringify(html)}`;
    },
  };
}
```

## 五、性能调优策略

### 5.1 构建分析

```bash
# 安装可视化工具
npm install --save-dev rollup-plugin-visualizer

# 配置插件
import { visualizer } from 'rollup-plugin-visualizer'
// vite.config.ts
plugins: [
  visualizer({
    open: true,
    gzipSize: true
  })
]
```

### 5.2 CDN 加速方案

```typescript [vite.config.ts]
import { splitVendorChunkPlugin } from "vite";

export default defineConfig({
  plugins: [splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        paths: {
          react:
            "https://cdn.example.com/react@18.2.0/umd/react.production.min.js",
          "react-dom":
            "https://cdn.example.com/react-dom@18.2.0/umd/react-dom.production.min.js",
        },
      },
    },
  },
});
```

## 六、Monorepo 支持方案

### 6.1 项目结构

```
├── packages/
│   ├── core/         # 核心库
│   ├── components/   # 组件库
│   └── docs/         # 文档站
├── vite.config.ts    # 根配置
└── package.json
```

### 6.2 工作区配置

```json [package.json]
{
  "workspaces": ["packages/*"],
  "scripts": {
    "dev:core": "cd packages/core && vite",
    "build:components": "cd packages/components && vite build"
  }
}
```

## 七、调试与问题排查

### 7.1 调试模式

```bash
# 启用详细日志
vite --debug

# 性能分析
vite --profile
```

### 7.2 常见错误代码解析

| 错误代码    | 含义           | 解决方案                      |
| ----------- | -------------- | ----------------------------- |
| ERR_SSL     | HTTPS 证书错误 | 配置 server.https 选项        |
| ERR_MODULE  | ESM 加载失败   | 检查文件扩展名是否为 .mjs     |
| HMR_TIMEOUT | 热更新超时     | 检查网络连接或增大 timeout 值 |
