# Git 详细介绍

> 💡 **学习指南**：Git 是现代软件开发必备的版本控制工具。本章节将通过可视化演示和实战案例，带你从零掌握 Git 的核心概念、常用命令和工作流程。

## 0. 快速体验：Git 工作流

让我们先通过交互式演示，理解 Git 的核心概念：

<GitWorkflowDemo />

## 1. 什么是 Git？

### 1.1 版本控制的必要性

**场景**：你在写论文，保存了多个版本：

```
论文_最终版.docx
论文_最终版_v2.docx
论文_最终版_真的最终版.docx
论文_最终版_打死不改版.docx
```

**问题**：
- ❌ 无法快速找回历史版本
- ❌ 无法知道改了什么
- ❌ 多人协作容易冲突

**Git 的解决方案**：
- ✅ 自动记录所有历史
- ✅ 清晰的版本对比
- ✅ 方便的分支管理
- ✅ 高效的团队协作

### 1.2 Git 的特点

- **分布式**：每个开发者都有完整的代码仓库
- **快速**：大部分操作在本地完成
- **分支管理**：轻量级的分支创建和切换
- **数据完整性**：内容寻址，确保数据不被损坏

## 2. Git 核心概念

### 2.1 三个区域

Git 工作流程涉及三个区域：

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  工作区      │ ──▶  │  暂存区      │ ──▶  │  仓库        │
│ (Working)   │ add  │ (Staging)   │ commit│ (Repository)│
│             │      │             │      │             │
│ 实际文件     │      │ 准备提交     │      │ 永久历史     │
└─────────────┘      └─────────────┘      └─────────────┘
```

**工作区 (Working Directory)**
- 你实际看到的文件
- 可以随意修改

**暂存区 (Staging Area)**
- 准备提交的文件
- 通过 `git add` 添加

**仓库 (Repository)**
- Git 保存历史记录的地方
- 通过 `git commit` 提交

### 2.2 文件状态

```
未跟踪 (Untracked) → 已修改 (Modified) → 已暂存 (Staged) → 已提交 (Committed)
```

- **未跟踪**：新文件，Git 未管理
- **已修改**：文件已改变，未添加到暂存区
- **已暂存**：文件已添加到暂存区，等待提交
- **已提交**：文件已保存到仓库

## 3. Git 基础命令

### 3.1 初始化仓库

```bash
# 创建新的 Git 仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git
```

### 3.2 查看状态

```bash
# 查看当前状态
git status

# 查看简化状态
git status -s
```

**输出示例**：
```
M modified.txt      # 已修改
A new.txt           # 已添加
?? untracked.txt    # 未跟踪
```

### 3.3 添加文件

```bash
# 添加单个文件
git add file.txt

# 添加所有文件
git add .

# 添加所有修改的文件
git add -u

# 交互式添加
git add -i
```

### 3.4 提交更改

```bash
# 提交并添加说明
git commit -m "提交信息"

# 添加并提交（跳过 git add）
git commit -am "提交信息"

# 修改最后一次提交
git commit --amend

# 查看提交历史
git log

# 查看简洁历史
git log --oneline
```

**提交信息规范**：
```bash
# 好的提交信息
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复导航栏显示错误"
git commit -m "docs: 更新 README 文档"

# 提交信息类型
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建/工具链更新
```

## 4. 分支管理

### 4.1 什么是分支？

分支是独立的开发线，让你可以：
- 同时进行多个任务
- 不影响主线代码
- 安全地实验新想法

**分支可视化**：

```
main branch:  ●────●────●────●────●
feature:              └────●────●
                    分支点  新提交
```

### 4.2 分支命令

```bash
# 查看所有分支
git branch

# 创建新分支
git branch feature-login

# 切换分支
git checkout feature-login
# 或
git switch feature-login

# 创建并切换分支
git checkout -b feature-login
# 或
git switch -c feature-login

# 删除分支
git branch -d feature-login

# 强制删除分支
git branch -D feature-login

# 查看分支合并情况
git log --graph --oneline --all
```

### 4.3 合并分支

**合并方式 1：普通合并**
```bash
# 切换到主分支
git checkout main

# 合并 feature 分支
git merge feature-login
```

**合并方式 2：变基 (Rebase)**
```bash
# 将 feature 分支的提交接到 main 最新提交
git checkout feature-login
git rebase main
```

**区别**：
- **merge**：保留完整历史，有分叉
- **rebase**：线性历史，更清晰

**可视化**：

```
# Merge 结果
main:  ●────●────●────●
                    └────● (merge commit)
feature:        └────●

# Rebase 结果
main:     ●────●────●────●────●
feature:              └────● (moved here)
```

### 4.4 冲突解决

**当合并产生冲突时**：

```bash
# Git 会提示冲突
git merge feature-login
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt
```

**解决步骤**：

1. 查看冲突文件：
```bash
# 标记冲突文件
git status
```

2. 编辑文件，解决冲突：
```python
# <<<<<<< HEAD
# 当前分支的代码
# =======
# feature 分支的代码
# >>>>>>> feature-login

# 改为你想要的代码
```

3. 标记冲突已解决：
```bash
git add file.txt
git commit
```

## 5. 远程仓库

### 5.1 查看远程仓库

```bash
# 查看远程仓库
git remote

# 查看详细信息
git remote -v

# 查看远程仓库信息
git remote show origin
```

### 5.2 推送到远程

```bash
# 推送到远程仓库
git push origin main

# 推送所有分支
git push --all origin

# 推送标签
git push --tags

# 首次推送分支（设置上游）
git push -u origin feature-login
```

### 5.3 从远程拉取

```bash
# 拉取并合并
git pull origin main

# 等价于
git fetch origin main
git merge origin/main

# 仅拉取不合并
git fetch origin
```

### 5.4 远程分支

```bash
# 查看远程分支
git branch -r

# 基于远程分支创建本地分支
git checkout -b local-branch origin/remote-branch

# 跟踪远程分支
git branch --set-upstream-to=origin/main main
```

## 6. Git 工作流程

### 6.1 Git Flow 工作流

**分支类型**：

- **main/master**：生产环境代码
- **develop**：开发环境代码
- **feature/***：新功能开发
- **release/***：发布准备
- **hotfix/***：紧急修复

**流程**：

```
1. 从 develop 创建 feature 分支
   git checkout -b feature-login develop

2. 开发完成后合并回 develop
   git checkout develop
   git merge feature-login

3. 从 develop 创建 release 分支
   git checkout -b release-1.0 develop

4. 测试通过后合并到 main 和 develop
   git checkout main
   git merge release-1.0
   git checkout develop
   git merge release-1.0

5. 紧急修复从 main 创建 hotfix
   git checkout -b hotfix-bug main
   # 修复后合并到 main 和 develop
```

### 6.2 GitHub Flow 工作流

**简化的工作流**：

1. **main 分支**：始终可部署
2. **创建分支**：`git checkout -b feature-login`
3. **提交并推送**：`git push -u origin feature-login`
4. **创建 Pull Request**：在 GitHub 上
5. **代码审查**：团队 review
6. **合并到 main**：通过审查后合并
7. **部署**：main 自动部署

## 7. 常用技巧

### 7.1 撤销操作

```bash
# 撤销工作区修改（恢复到最近一次提交）
git restore file.txt
# 或
git checkout -- file.txt

# 撤销暂存区（保留工作区修改）
git restore --staged file.txt
# 或
git reset HEAD file.txt

# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（丢弃修改）
git reset --hard HEAD~1

# 回到某个提交（危险！）
git reset --hard abc1234

# 撤销某次提交（创建新提交）
git revert abc1234
```

### 7.2 暂存工作

```bash
# 临时保存工作现场
git stash

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop

# 恢复指定暂存
git stash apply stash@{1}

# 删除暂存
git stash drop stash@{0}

# 清空所有暂存
git stash clear
```

### 7.3 查看差异

```bash
# 查看工作区修改
git diff

# 查看暂存区差异
git diff --staged

# 查看两次提交的差异
git diff abc1234 def5678

# 查看某文件的修改历史
git log -p file.txt
```

### 7.4 搜索代码

```bash
# 搜索代码内容
git grep "TODO"

# 搜索提交信息
git log --grep="bug"

# 搜索添加某行代码的提交
git log -S "function_name"
```

## 8. 标签管理

### 8.1 创建标签

```bash
# 创建轻量标签
git tag v1.0.0

# 创建附注标签（推荐）
git tag -a v1.0.0 -m "版本 1.0.0"

# 给某次提交打标签
git tag -a v0.9.0 abc1234 -m "版本 0.9.0"
```

### 8.2 查看标签

```bash
# 查看所有标签
git tag

# 查看标签信息
git show v1.0.0

# 查看标签对应的提交
git log v0.9.0..v1.0.0
```

### 8.3 推送标签

```bash
# 推送单个标签
git push origin v1.0.0

# 推送所有标签
git push --tags
```

### 8.4 删除标签

```bash
# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin :refs/tags/v1.0.0
# 或
git push origin --delete v1.0.0
```

## 9. Git 配置

### 9.1 基本配置

```bash
# 设置用户名
git config --global user.name "Your Name"

# 设置邮箱
git config --global user.email "your.email@example.com"

# 设置默认分支名
git config --global init.defaultBranch main

# 设置编辑器
git config --global core.editor vim

# 设置差异工具
git config --global merge.tool vscode
```

### 9.2 别名配置

```bash
# 创建常用别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg "log --graph --oneline --all"

# 使用别名
git st        # git status
git co main   # git checkout main
git lg        # 查看漂亮的提交历史
```

### 9.3 忽略文件

创建 `.gitignore` 文件：

```bash
# 忽略文件
*.log
*.tmp
.env
.DS_Store

# 忽略文件夹
node_modules/
dist/
.cache/

# 忽略特定文件
secret.txt
config.local.json

# 不忽略某文件
!important.log
```

**常见模板**：
- [GitHub gitignore](https://github.com/github/gitignore)
- [gitignore.io](https://www.toptal.com/developers/gitignore)

## 10. 实战案例

### 10.1 日常开发流程

```bash
# 1. 更新本地代码
git pull origin main

# 2. 创建功能分支
git checkout -b feature-user-auth

# 3. 开发功能
# ... 编写代码 ...

# 4. 查看修改
git status
git diff

# 5. 添加文件
git add .
git status

# 6. 提交代码
git commit -m "feat: 添加用户认证功能"

# 7. 推送到远程
git push -u origin feature-user-auth

# 8. 在 GitHub 创建 Pull Request

# 9. 代码审查通过后合并

# 10. 删除本地分支
git branch -d feature-user-auth
```

### 10.2 紧急修复流程

```bash
# 1. 切换到主分支
git checkout main

# 2. 创建修复分支
git checkout -b hotfix-login-bug

# 3. 修复 bug
# ... 修改代码 ...

# 4. 提交修复
git add .
git commit -m "fix: 修复登录验证错误"

# 5. 合并到 main
git checkout main
git merge hotfix-login-bug

# 6. 打标签
git tag -a v1.0.1 -m "修复登录 bug"

# 7. 推送
git push origin main
git push origin v1.0.1

# 8. 合并到 develop（如果存在）
git checkout develop
git merge hotfix-login-bug
git push origin develop

# 9. 删除修复分支
git branch -d hotfix-login-bug
```

## 11. 最佳实践

### 11.1 提交规范

- ✅ **频繁提交**：小步快跑，容易回滚
- ✅ **清晰的提交信息**：说明做了什么和为什么
- ✅ **原子提交**：一个提交只做一件事
- ❌ **避免**：提交测试文件、临时文件

### 11.2 分支管理

- ✅ **主分支保护**：禁止直接推送到 main
- ✅ **代码审查**：所有合并通过 PR/MR
- ✅ **定期同步**：保持分支与主分支同步
- ❌ **避免**：长期存在的分支

### 11.3 协作建议

- ✅ **拉取前先提交**：避免冲突
- ✅ **解决冲突及时**：不要拖延
- ✅ **保持提交历史清晰**：使用 rebase 整理
- ✅ **写好文档**：README、CHANGELOG

## 12. 常见问题

### 12.1 忘记推送某文件

```bash
# 修改最后一次提交
git add forgotten-file.txt
git commit --amend
git push -f origin feature-branch  # 强制推送
```

### 12.2 提交信息写错了

```bash
# 修改最后一次提交信息
git commit --amend -m "正确的提交信息"

# 如果已推送，需要强制推送
git push -f origin branch
```

### 12.3 提交到了错误的分支

```bash
# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 切换到正确的分支
git checkout correct-branch

# 重新提交
git commit -m "正确的提交信息"
```

### 12.4 恢复删除的文件

```bash
# 找到删除文件的提交
git log --diff-filter=D --summary

# 恢复文件
git checkout abc1234 -- deleted-file.txt
```

## 13. 学习资源

### 13.1 官方资源

- **Git 官方文档**：https://git-scm.com/doc
- **Git GitHub 指南**：https://guides.github.com/

### 13.2 可视化工具

- **Git 图形化界面**：
  - SourceTree (免费)
  - GitKraken (免费)
  - GitHub Desktop (免费)
  - TortoiseGit (Windows)

- **在线学习**：
  - Learn Git Branching：https://learngitbranching.js.org/
  - Git Immersion：http://gitimmersion.com/

## 14. 总结

Git 核心要点：

- 🎯 **掌握基础**：add、commit、pull、push
- 🌿 **善用分支**：并行开发，互不干扰
- 📝 **规范提交**：清晰的提交信息
- 🔄 **持续同步**：保持代码最新
- 🛡️ **及时备份**：推送到远程仓库

**学习建议**：
- ✅ 多动手实践：创建仓库、提交、分支
- ✅ 理解原理：Git 的三个区域、数据模型
- ✅ 查看历史：使用 git log 了解项目演进
- ✅ 解决冲突：不要害怕冲突，这是协作的常态
- ✅ 使用工具：GUI 工具可以降低学习曲线

掌握 Git，你就掌握了软件开发的基础设施。现在就开始使用 Git 管理你的代码吧！
