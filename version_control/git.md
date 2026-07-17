# Git 笔记

## 一、Git 是什么？

- **分布式版本控制系统**（DVCS）：每个开发者本地都拥有完整的代码历史。
- 由 Linus Torvalds 于 2005 年为管理 Linux 内核开发而创建。
- 核心优势：高效、安全、支持非线性开发（分支/合并）、离线工作。

## 二、安装与配置

### 1. 安装

- **Windows**: [Git for Windows](https://git-scm.com/)
- **macOS**: `brew install git` 或 Xcode Command Line Tools
- **Linux**: `sudo apt install git`（Debian/Ubuntu）或 `sudo yum install git`（CentOS）

### 2. 初始配置（全局）

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认编辑器（可选）
git configure --global core.editor "code --wait"  # VS Code

# 设置默认分支名（推荐设为 main 或 master）
git config --global init.defaultBranch main

# 查看所有配置
git config --list
```

> 配置文件位置：
>
> - 全局：`~/.gitconfig`
> - 项目级：`.git/config`

## 三、基本概念

| 概念                               | 说明                       |
| ---------------------------------- | -------------------------- |
| **工作区（Working Directory）**    | 你当前编辑的文件目录       |
| **暂存区（Staging Area / Index）** | 临时保存即将提交的更改     |
| **本地仓库（Local Repository）**   | `.git` 目录，包含完整历史  |
| **远程仓库（Remote Repository）**  | 如 GitHub、GitLab 上的仓库 |
| **HEAD**                           | 当前所在分支的最新提交指针 |

## 四、基础操作流程（日常开发）

### 1. 初始化仓库

```bash
git init                    # 初始化新仓库
git init -b main            # 指定初始分支名（Git 2.28+）
```

### 2. 克隆远程仓库

```bash
git clone <url>             # 克隆整个仓库
git clone -b <branch> <url> # 克隆指定分支
```

### 3. 查看状态

```bash
git status                  # 查看工作区和暂存区状态
git status -s               # 简洁模式
```

### 4. 添加文件到暂存区

```bash
git add <file>              # 添加单个文件
git add .                   # 添加所有修改（不包括删除）
git add -A                  # 添加所有变更（包括新增、修改、删除）
git add -u                  # 仅添加已跟踪文件的修改/删除
```

### 5. 提交更改

```bash
git commit -m "描述信息"
git commit                  # 打开编辑器写多行提交信息
```

> ✅ 提交信息规范建议：
>
> ```
> feat: 新功能
> fix: 修复 bug
> docs: 文档更新
> style: 代码格式调整
> refactor: 重构（无功能变化）
> test: 测试相关
> chore: 构建/依赖等杂项
> ```

### 6. 查看历史

```bash
git log                     # 完整日志
git log --oneline           # 一行显示
git log --graph --all       # 图形化分支历史
git log -p -2               # 显示最近2次提交的差异
```

### 7. 差异对比

```bash
git diff                    # 工作区 vs 暂存区
git diff --staged           # 暂存区 vs 最近一次提交
git diff HEAD               # 工作区 vs 最近一次提交
git diff branch1..branch2   # 两个分支差异
```

## 五、分支管理（核心功能）

### 1. 创建与切换

```bash
git branch                  # 列出本地分支
git branch <name>           # 创建分支
git checkout <branch>       # 切换分支（旧）
git switch <branch>         # 切换分支（新，Git 2.23+）
git switch -c <new-branch>  # 创建并切换
```

### 2. 合并分支

```bash
git merge <branch>          # 将 <branch> 合并到当前分支
```

- **Fast-forward 合并**：无冲突，直接移动指针。
- **三方合并（Three-way merge）**：产生新合并提交。

### 3. 删除分支

```bash
git branch -d <branch>      # 安全删除（已合并）
git branch -D <branch>      # 强制删除
```

### 4. 重命名分支

```bash
git branch -m <old> <new>
```

## 六、远程仓库操作

### 1. 查看远程

```bash
git remote -v               # 显示远程仓库地址
git remote show origin      # 详细信息
```

### 2. 推送

```bash
git push origin main        # 推送本地 main 到远程 origin/main
git push -u origin main     # 首次推送并设置上游跟踪
```

### 3. 拉取

```bash
git fetch                   # 获取远程更新（不合并）
git pull                    # fetch + merge（等价于 git fetch && git merge）
git pull --rebase           # fetch + rebase（推荐，保持线性历史）
```

> ⚠️ `pull` 可能导致不必要的合并提交，建议用 `fetch + rebase`。

### 4. 远程分支管理

```bash
git push origin --delete <branch>   # 删除远程分支
git branch -r                       # 查看远程分支
git checkout -t origin/dev          # 跟踪远程分支并创建本地分支
```

## 七、撤销与回退

| 场景                       | 命令                                                     |
| -------------------------- | -------------------------------------------------------- |
| 撤销工作区修改             | `git checkout -- <file>` 或 `git restore <file>`         |
| 取消暂存                   | `git reset HEAD <file>` 或 `git restore --staged <file>` |
| 修改上一次提交             | `git commit --amend`                                     |
| 回退到某次提交（保留历史） | `git revert <commit>`                                    |
| 回退到某次提交（丢弃历史） | `git reset --hard <commit>`                              |
| 重置暂存区但保留工作区     | `git reset --mixed <commit>`（默认）                     |

> 🔒 `--hard` 会**永久丢失未提交的更改**，慎用！

## 八、标签（Tag）

用于标记发布版本（如 v1.0.0）。

```bash
git tag v1.0.0                      # 轻量标签
git tag -a v1.0.0 -m "Release 1.0"  # 附注标签（推荐）
git show v1.0.0                     # 查看标签信息
git push origin v1.0.0              # 推送单个标签
git push origin --tags              # 推送所有标签
```

## 九、高级技巧

### 1. Stash（临时存储）

```bash
git stash               # 保存当前修改（清空工作区）
git stash list          # 查看 stash 列表
git stash apply         # 应用最近的 stash（保留记录）
git stash pop           # 应用并删除
git stash drop          # 删除 stash
```

### 2. Rebase（变基）

将一系列提交“移动”到另一个基底上，使历史更线性。

```bash
git rebase main         # 将当前分支 rebase 到 main
git rebase -i HEAD~3    # 交互式 rebase（合并/编辑/删除提交）
```

> ⚠️ 不要对已推送的公共分支使用 rebase！

### 3. Cherry-pick（摘取提交）

```bash
git cherry-pick <commit>    # 将某个提交应用到当前分支
```

### 4. Reflog（引用日志）

找回“丢失”的提交（即使被 reset）：

```bash
git reflog
git reset --hard HEAD@{2}   # 回到 reflog 中的某个状态
```

## 十、常用工作流

### 1. Centralized Workflow（集中式）

- 类似 SVN，所有人向同一个 `main` 分支提交。
- 适合小型团队。

### 2. Feature Branch Workflow（特性分支）

- 每个功能在独立分支开发，完成后 PR/MR 合并。
- GitHub/GitLab 默认推荐。

### 3. Git Flow（经典模型）

- `main`：生产环境
- `develop`：集成分支
- `feature/*`、`release/*`、`hotfix/*`：各类分支
- 适合严格发布周期的项目。

### 4. Forking Workflow（开源协作）

- 每人 fork 主仓库，向 upstream 提 PR。
- GitHub 开源项目标准流程。

## 十一、.gitignore 文件

忽略不需要追踪的文件（如日志、编译产物、IDE 配置）。

示例 `.gitignore`：

```text
# 忽略所有 .log 文件
*.log

# 忽略 node_modules
node_modules/

# 忽略特定文件
.env
.DS_Store

# 但不忽略 src/.env
!src/.env
```

> 在线生成：[https://www.gitignore.io](https://www.gitignore.io)

## 十二、常见问题解决

### ❌ “fatal: refusing to merge unrelated histories”

```bash
git pull origin main --allow-unrelated-histories
```

### ❌ 提交了敏感信息（如密码）

1. 使用 `git filter-repo`（推荐）或 `BFG Repo-Cleaner` 彻底清除历史。
2. **不要只用 `reset`**，因为历史仍存在。

### ❌ 分支冲突

- 手动编辑冲突文件（`<<<<<<<`, `=======`, `>>>>>>>` 标记）
- `git add` 解决后继续合并/rebase

### ❌ 误删分支

```bash
git reflog                # 找到分支最后的 commit hash
git checkout -b recovery-branch <hash>
```

## 十三、最佳实践

✅ **提交原子性**：每次提交只做一件事  
✅ **写清晰的提交信息**：说明“为什么”而不是“做了什么”  
✅ **小步频繁提交**：避免大爆炸式提交  
✅ **不要提交二进制/敏感文件**  
✅ **使用 `.gitignore`**  
✅ **PR 前先 rebase 保持历史整洁**  
✅ **保护主干分支**（GitHub/GitLab 设置 branch protection）

## 十四、GUI 工具推荐

- **命令行**：`tig`（终端 UI）
- **桌面端**：
  - GitHub Desktop（简单易用）
  - Sourcetree（功能全面）
  - GitKraken（美观强大）
  - VS Code 内置 Git 支持

## 十五、学习资源

- 官方文档：[https://git-scm.com/doc](https://git-scm.com/doc)
- 互动教程：[Learn Git Branching](https://learngitbranching.js.org/)
- 书籍：《Pro Git》（免费在线版）

> 💡 **记住**：Git 的核心是 **快照（snapshot）**，不是“差异”。每次提交都是整个项目的一个快照。
