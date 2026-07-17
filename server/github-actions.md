# GitHub Actions

> [!NOTE]
>
> - [官方文档](https://docs.github.com/en/actions)
> - [Marketplace Actions](https://github.com/marketplace?type=actions)
> - [示例库](https://github.com/actions/starter-workflows)

## 什么是 GitHub Actions

GitHub Actions 是 GitHub 提供的持续集成与持续部署（CI/CD）服务。它允许你在代码仓库中自动化软件开发工作流程，例如在推送代码时自动运行测试、构建项目、部署应用等。

## 核心概念

### Workflow（工作流）

- 一个 YAML 文件，定义了一套自动化流程。
- 存放在 `.github/workflows/` 目录下。
- 每个工作流可以包含一个或多个 Job。

### Event（事件）

- 触发工作流的条件，如 `push`、`pull_request`、`schedule`（定时）、`workflow_dispatch`（手动触发）等。

### Job（任务）

- 工作流中的一个执行单元。
- 可以在一个或多个 Runner 上并行或顺序执行。
- 每个 Job 包含一个或多个 Step。

### Step（步骤）

- Job 中的单个操作。
- 可以是运行一条 shell 命令，或使用一个 Action。

### Action（动作）

- 可复用的代码单元，用于执行特定任务。
- 可以是官方提供的（如 `actions/checkout@v4`），也可以是社区或自定义的。

### Runner（运行器）

- 执行 Job 的服务器。
- GitHub 提供托管的 Runner（如 Ubuntu、Windows、macOS），也支持自建 Runner。

## 快速开始：创建第一个 Workflow

1. 在你的 GitHub 仓库根目录创建 `.github/workflows` 文件夹。
2. 在该文件夹中新建一个 YAML 文件，例如 `ci.yml`。
3. 编写如下内容：

   ```yaml
   name: Hello World CI

   on: [push]

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout code
           uses: actions/checkout@v4

         - name: Say hello
           run: echo "Hello, GitHub Actions!"
   ```

4. 提交并推送到 GitHub。
5. 进入仓库的 **Actions** 标签页，即可看到工作流被触发并执行。

## 常用触发事件（on）

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch: # 允许手动触发
  schedule:
    - cron: "0 0 * * *" # 每天 UTC 0 点运行
```

## 多 Job 与依赖关系

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."

  test:
    needs: build # 必须等 build 成功后才运行
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."
```

## 使用环境变量

### 设置环境变量

```yaml
env:
  NODE_VERSION: 18

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      API_KEY: ${{ secrets.API_KEY }} # 从 Secrets 读取
    steps:
      - run: echo "Node version is $NODE_VERSION"
```

### 使用 Secrets（密钥）

- 在仓库 Settings → Secrets and variables → Actions 中添加。
- 在 YAML 中通过 `secrets.NAME`。

## 常用官方 Actions

- `actions/checkout@v4`：检出代码。
- `actions/setup-node@v4`：设置 Node.js 环境。
- `actions/setup-python@v5`：设置 Python 环境。
- `actions/upload-artifact@v4`：上传构建产物。
- `actions/download-artifact@v4`：下载构建产物。

示例：Node.js 项目测试

```yaml
name: Node.js CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
```

## 条件判断（if）

```yaml
steps:
  - name: Only on main branch
    if: github.ref == 'refs/heads/main'
    run: echo "Deploying to production"
```

## 矩阵策略（Matrix Strategy）

用于在多种环境下并行测试：

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [16, 18, 20]
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: npm ci
      - run: npm test
```

## 构建产物（Artifacts）

保存临时文件供后续 Job 使用或下载：

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/

- uses: actions/download-artifact@v4
  with:
    name: coverage-report
```

## 自定义 Action

你可以创建自己的 Action，分为三类：

1. **Docker 容器 Action**
2. **JavaScript Action**
3. **Composite Run Steps Action（推荐简单场景）**

示例：Composite Action（`.github/actions/hello/action.yml`）

```yaml
name: "Say Hello"
description: "Greet someone"
inputs:
  who-to-greet:
    description: "Who to greet"
    required: true
runs:
  using: composite
  steps:
    - run: echo "Hello ${{ inputs.who-to-greet }}!"
      shell: bash
```

在主 Workflow 中调用：

```yaml
- uses: ./.github/actions/hello
  with:
    who-to-greet: "World"
```

## 调试技巧

- 使用 `echo` 或 `print` 输出调试信息。
- 启用 **Debug logging**：在仓库 Secrets 中添加 `ACTIONS_STEP_DEBUG` 并设为 `true`。
- 查看完整日志：点击 Actions 页面中的具体运行记录。

## 最佳实践

1. **保持 Workflow 简洁**：拆分复杂逻辑为多个 Job 或自定义 Action。
2. **使用缓存加速**：如 `actions/cache` 缓存依赖。
3. **限制权限**：在 Settings → Actions → General 中设置最小权限。
4. **命名清晰**：Job 和 Step 名称应具有描述性。
5. **避免硬编码**：使用变量和 Secrets 管理配置。

## 示例：完整前端项目 CI/CD

```yaml
name: Frontend CI/CD

on:
  push:
    branches: [main]

env:
  NODE_VERSION: 18

jobs:
  lint-test-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Cache dependencies
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: lint-test-build
    runs-on: ubuntu-latest
    steps:
      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: ./dist

      - name: Deploy to server
        run: |
          echo "Deploy logic here (e.g., rsync, scp, or use a deployment action)"
```
