# GitLab CI/CD

> [!NOTE]
>
> - [官方文档](https://docs.gitlab.com/ci/)
> - [CI/CD 变量列表](https://docs.gitlab.com/ci/variables/predefined_variables/)
> - [示例模板库](https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates)

## 什么是 GitLab CI/CD

GitLab CI/CD 是 GitLab 内置的持续集成、持续交付与持续部署工具。通过在项目根目录添加一个名为 `.gitlab-ci.yml` 的配置文件，即可定义自动化构建、测试、部署等任务。所有任务由 GitLab Runner 执行。

## 核心概念

### Pipeline（流水线）

一次完整的 CI/CD 流程，由多个 Stage 组成。每次代码推送、合并请求或手动触发都会启动一个 Pipeline。

### Job（作业）

Pipeline 中的最小执行单元。每个 Job 运行在独立的 Runner 环境中（容器或虚拟机）。可以并行执行，也可以按依赖顺序执行。

### Stage（阶段）

将 Jobs 分组为逻辑阶段，如 `build`、`test`、`deploy`。同一 Stage 中的 Jobs 并行运行；下一 Stage 必须等待上一 Stage 全部成功才开始。

### Runner（运行器）

实际执行 Job 的机器或容器。可使用 GitLab 提供的共享 Runner，也可注册自己的专用 Runner。

### Artifact（产物）

Job 生成的文件（如编译结果、日志、报告），可传递给后续 Job 或供下载。

### Cache（缓存）

缓存依赖（如 node_modules、.m2）以加速后续 Pipeline。

### Variables（变量）

环境变量，可用于配置行为或存储敏感信息（通过 CI/CD Variables 设置）。

## 快速开始：创建第一个 .gitlab-ci.yml

1. 在项目根目录创建 `.gitlab-ci.yml` 文件。
2. 添加以下内容：

   ```yaml
   stages:
     - test

   hello_world:
     stage: test
     script:
       - echo "Hello, GitLab CI!"
   ```

3. 提交并推送到 GitLab。
4. 进入项目页面 → **CI/CD** → **Pipelines**，查看自动触发的流水线。

注意：必须有可用的 Runner 才能执行 Job。若未配置，Job 会处于 pending 状态。

## 基本结构说明

```yaml
stages:
  - build
  - test
  - deploy

job_name:
  stage: test
  script:
    - echo "Running tests"
    - npm test
  tags:
    - docker
  only:
    - main
```

## 触发条件（Rules / Only / Except）

推荐使用 `rules` 替代旧的 `only/except`。

### 使用 rules 控制触发

```yaml
build_job:
  script: npm run build
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
```

常见变量：

- `$CI_COMMIT_BRANCH`：当前分支名
- `$CI_COMMIT_TAG`：是否为 tag 推送
- `$CI_PIPELINE_SOURCE`：触发来源（push、merge_request_event、schedule 等）

### 示例：仅在 main 分支和 tag 时运行部署

```yaml
deploy_prod:
  stage: deploy
  script: ./deploy.sh
  rules:
    - if: '$CI_COMMIT_BRANCH == "main"'
    - if: "$CI_COMMIT_TAG != null"
```

## 多 Job 与 Stage 依赖

```yaml
stages:
  - build
  - test
  - deploy

build_app:
  stage: build
  script: npm run build
  artifacts:
    paths:
      - dist/

unit_test:
  stage: test
  script: npm test

e2e_test:
  stage: test
  script: npm run e2e

deploy_staging:
  stage: deploy
  script: scp -r dist/ user@staging:/app
  environment:
    name: staging
  only:
    - develop

deploy_prod:
  stage: deploy
  script: kubectl apply -f k8s/
  environment:
    name: production
  when: manual
```

`when: manual` 表示该 Job 需要人工点击才能执行（常用于生产部署）。

## Artifacts（产物）

保存 Job 输出供后续使用或下载：

```yaml
build:
  script: npm run build
  artifacts:
    paths:
      - dist/
      - coverage/
    expire_in: 1 week
```

下游 Job 自动下载上游 artifacts（同一 Pipeline 内）。

## Cache（缓存）

加速依赖安装：

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/

install_deps:
  script: npm ci
```

`key` 决定缓存隔离粒度。`${CI_COMMIT_REF_SLUG}` 表示按分支/标签缓存。跨 Job 共享缓存需显式声明（默认所有 Job 共享全局 cache）。

## 环境变量与 Secrets

### 设置 CI/CD Variables

1. 进入项目 → **Settings** → **CI/CD** → **Variables**
2. 添加键值对，如 `API_KEY=secret123`
3. 在 `.gitlab-ci.yml` 中使用：

```yaml
script:
  - echo "API Key is $API_KEY"
```

敏感变量建议勾选 **Masked**（隐藏日志）和 **Protected**（仅保护分支可用）。

## 使用 Services（服务容器）

用于启动数据库、Redis 等依赖服务：

```yaml
test_with_db:
  services:
    - name: postgres:13
      alias: db
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: runner
    POSTGRES_PASSWORD: ""
  script:
    - psql -h db -U runner -d testdb -c "SELECT 1;"
```

## Include 与模板复用

将通用逻辑抽离为模板文件，提高可维护性。

### 示例：`.gitlab/ci/templates/node.yml`

```yaml
.node_base:
  image: node:18
  before_script:
    - npm ci
```

### 主配置引用

```yaml
include:
  - local: "/.gitlab/ci/templates/node.yml"

test:
  extends: .node_base
  script: npm test
```

支持 `local`（本仓库）、`project`（其他项目）、`remote`（URL）等方式引入。

## 定时任务（Scheduled Pipelines）

1. 项目 → **CI/CD** → **Schedules** → **New schedule**
2. 设置 cron 表达式（如 `0 2 * * *` 表示每天 UTC 2 点）
3. 指定分支和变量
4. 在 `.gitlab-ci.yml` 中可通过 `$CI_PIPELINE_SOURCE == "schedule"` 判断

## 调试技巧

- 查看 Job 日志：点击 Pipeline → Job 名称
- 临时增加 `set -x` 显示命令执行细节
- 使用 `when: on_failure` 定义失败时的清理 Job
- 本地调试：使用 GitLab Runner 在本地运行 `gitlab-runner exec docker job_name`

## 最佳实践

1. 明确 Stage 划分：build → test → deploy，逻辑清晰。
2. 合理使用 artifacts 和 cache：避免重复构建，加快流程。
3. 保护敏感操作：生产部署设为 `manual` + `protected` 分支。
4. 使用 Docker 镜像指定环境：确保一致性。
5. 拆分复杂逻辑：通过 `include` 和 `extends` 复用配置。
6. 设置超时：避免 Job 卡死（`timeout: 1h`）。
7. 命名规范：Job 名称应具有语义（如 `test:unit`、`deploy:staging`）。

## 完整示例：前端项目 CI/CD

```yaml
image: node:18

stages:
  - install
  - test
  - build
  - deploy

variables:
  NODE_ENV: production

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - .npm/
    - node_modules/

install_deps:
  stage: install
  script:
    - npm ci --cache .npm --prefer-offline
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

unit_tests:
  stage: test
  script:
    - npm run test:unit
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'

build_app:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging server..."
    - rsync -avz dist/ user@staging:/var/www/app
  environment:
    name: staging
  only:
    - develop

deploy_prod:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - aws s3 sync dist/ s3://my-prod-bucket
  environment:
    name: production
  when: manual
  only:
    - main
```
