---
title: 你的 SSD 还在流血吗？盘点近期 Codex 那些让人头疼的 Bug 及其终极拯救指南
date: 2026-06-22
updated: 2026-06-22
tags:
  - Codex
  - OpenAI
  - Bug 修复
  - macOS
  - SSD
  - 开发工具
categories:
  - [gallery]
featured_image: /gallery/codex-annoying-bugs/cover.jpg
author: chenli
description: 从每天写入 1.76TB 日志谋杀 SSD，到打爆 syspolicyd 让整台 Mac 无法开启任何 App——Codex 近期 Bug 汇总与终极急救方案
---

![](cover.jpg)

如果你是一位开发者，且最近正在重度依赖 OpenAI 的 Codex 桌面端或 CLI 工具，那么你可能需要停下手头的工作，立刻检查一下你的硬盘剩余空间和 SSD 写入量了。

近段时间，Codex 频繁曝出多个严重影响系统性能和硬件寿命的 Bug。从疯狂吞噬磁盘空间的"克隆大军"，到每天写入近 2TB 数据"谋杀" SSD 的日志风暴，再到能让整台 Mac 陷入"任何 App 都无法打开"的系统级瘫痪——这些问题不仅让人心惊肉跳，更在开发者社区引发了广泛的讨论。

本文将按时间顺序梳理近期 Codex 暴露出的核心 Bug，强调其严重性，并逐一展开详细分析，最后为你提供一套行之有效的综合解决方案。

## 近期 Codex 核心 Bug 概览

在我们深入技术细节之前，先来看看近期 Codex 到底惹了哪些祸：

| Bug 类型 | 影响平台 | 严重程度 | 核心症状 | 发现时间 |
| :--- | :--- | :--- | :--- | :--- |
| **SSD 寿命刺客** | macOS Desktop, Linux CLI | 🔴 极高 | 每天写入 1.76TB 日志，极速消耗 SSD 寿命 | 近期反馈 |
| **克隆大军** | macOS Desktop | 🔴 极高 | 每次启动/退出留下近 1GB 目录，最高累计超 125GB | 2026年6月 |
| **打爆 syspolicyd** | macOS Desktop | 🔴 极高 | 每秒数十次自我重启触发 Gatekeeper，耗尽系统 fd，全机 App 无法启动 | 2026年6月 |
| **Crashpad 转储膨胀** | macOS Desktop | 🟡 中等 | 每天产生约 5GB 的崩溃转储文件 | 2026年6月 |
| **僵尸进程与系统卡顿** | macOS Desktop | 🟡 中等 | 退出后遗留大量辅助进程，导致 HID 延迟 | 2026年6月 |

正如你所见，这些 Bug 并非无关痛痒的 UI 错位，而是实打实地在消耗你的硬件资源，乃至让整台机器陷入瘫痪。接下来，我们将逐一拆解这些问题，并给出相应的急救措施。

---

## 深入分析与急救措施

### 1. SSD 寿命刺客：每天 1.76TB 的"慢性谋杀"

这可能是近期最让人后怕的一个 Bug。有开发者在社区反馈，Codex 应用可能因为某些异常，频繁写入 TRACE 级别的日志。这种行为会将日志持久化到本地 SQLite 数据库中，然后再进行删除 [1]。

**恐怖的数据**：有用户发现，自己在短短 21 天内，固态硬盘的写入量达到了惊人的 37TB，平均每天写入 1.76TB。要知道，常见的 1TB 消费级固态硬盘（如官方标准 600TBW），按照每天写入 100GB 计算，大约需要 16 年才能报废。但在 Codex 的这种"摧残"下，仅需 11 个月就会达到 TBW 限额，导致硬盘过保甚至进入只读模式。

**技术根源**：Codex 在启动后，会持续向用户目录下的 SQLite 数据库（如 `~/.codex/logs_2.sqlite`）写入数据。据观察，在模型流式输出期间，写入速率约为 5 MiB/s，峰值甚至可达 16 MiB/s。更糟糕的是，即便你设置了 `RUST_LOG=warn` 环境变量，它依然我行我素，继续持久化大量低价值的 TRACE 级别日志。

**急救方案**：如果你发现自己的 `logs_2.sqlite` 文件异常庞大，或者观察到持续的高频写入，你可以通过 SQLite 触发器来阻止新日志的插入。这种方法简单、可逆，且对 SSD 极其友好。

在完全退出 Codex 后，执行以下命令：

```bash
# 阻止新日志插入
sqlite3 ~/.codex/logs_2.sqlite "CREATE TRIGGER IF NOT EXISTS block_log_inserts BEFORE INSERT ON logs BEGIN SELECT RAISE(IGNORE); END;"

# 验证是否生效（看到 block_log_inserts 即代表成功）
sqlite3 ~/.codex/logs_2.sqlite "SELECT name, tbl_name, sql FROM sqlite_master WHERE type='trigger';"
```

如果你的硬盘空间已经捉襟见肘，还可以顺手清理一下历史日志：

```bash
# 备份原数据库（以防万一）
cp ~/.codex/logs_2.sqlite ~/.codex/logs_2.sqlite.bak

# 清空日志并回收空间
sqlite3 ~/.codex/logs_2.sqlite "DELETE FROM logs;"
sqlite3 ~/.codex/logs_2.sqlite "VACUUM;"
```

如果日后需要恢复日志写入（例如向官方提交 Bug 报告需要日志），只需执行：

```bash
sqlite3 ~/.codex/logs_2.sqlite "DROP TRIGGER IF EXISTS block_log_inserts;"
```

### 2. 克隆大军：每次启动"白嫖" 1GB 空间的幽灵

在 GitHub Issue #25667 中，开发者 yorhasaber 爆出了另一个令人窒息的 Bug [2]。每次启动并退出 Codex macOS 应用时，系统都会在 `/private/var/folders/.../X/com.openai.codex.code_sign_clone/` 目录下留下一个约 965MB 的新目录。

**失控的膨胀**：这些目录在应用退出后并不会被自动清理，只有在重启 macOS 时才会被系统回收。随着启动次数的增加，这些"克隆体"会不断累积。社区中的反馈触目惊心：

- 7 个克隆目录 = 6.5 GB
- 16 个克隆目录 = 16 GB
- 104 个克隆目录 = **130 GB**
- 最严重案例：**125 GB** 的磁盘空间就这样悄无声息地消失了

更让人哭笑不得的是，当用户尝试用第三方清理工具卸载 Codex 时，工具会将这些幽灵目录也算进 Codex 的"体积"里，显示 Codex 占用了 150GB 以上的空间，让不明真相的用户误以为是清理工具出了问题。

**技术根源**：这个问题与 Chromium 的 `MacAppCodeSignClone` 机制有关。克隆的创建本身是预期行为，但不活跃的克隆目录在应用退出后未能被正确清理，代码签名克隆清理助手未被正确触发。

**急救方案**：

首先，你可以用以下命令检查问题的严重程度：

```bash
# 查看克隆目录数量
find /private/var/folders/*/*/X/com.openai.codex.code_sign_clone \
  -maxdepth 1 -type d -name 'code_sign_clone.*' 2>/dev/null | wc -l

# 查看总占用空间
du -sh /private/var/folders/*/*/X/com.openai.codex.code_sign_clone 2>/dev/null
```

然后，在退出 Codex 后，执行以下命令进行清理：

```bash
# 退出 Codex
osascript -e 'quit app "Codex"'
sleep 3

# 清掉打包/clone 泄漏
base="$(dirname "$(getconf DARWIN_USER_TEMP_DIR)")/X/com.openai.codex.code_sign_clone"
rm -rf "$base"/code_sign_clone.*
```

社区用户 Jolg42 还提供了一个更智能的自动化清理脚本，可以保留最新的克隆目录（以防 Codex 正在运行时需要它），并定期通过 cron 自动清理旧目录：

```bash
# 添加到 crontab，每小时自动清理一次
0 * * * * /bin/bash "$HOME/dotfiles/utils/cleanup-codex-code-sign-clones.sh" >/dev/null 2>&1 || true
```

### 3. 打爆 syspolicyd：让整台 Mac 陷入"App 启动瘫痪"的系统级 DoS

这是近期 Codex 所有 Bug 中，影响范围最广、最具破坏性的一个。它不仅仅是 Codex 自身的问题，而是一个能让你整台 Mac 上**所有应用都无法启动**的系统级拒绝服务攻击（DoS）[3]。

**令人窒息的症状**：当 Codex Desktop 在后台运行时，你可能会突然发现：双击任何 App 都没有反应，Dock 里的图标在弹跳后消失，就连系统自带的计算器也打不开。与此同时，`syspolicyd` 和 `trustd` 这两个系统进程的 CPU 占用率会飙升到 100% 以上，内存占用甚至可以膨胀到 **20GB**。

**技术根源**：这是一个经过多位开发者反复验证、有详细数据支撑的严重 Bug [3]。Codex macOS 应用会以**每秒数十次**的频率，反复尝试 `exec`（执行）自己的主程序 `/Applications/Codex.app/Contents/MacOS/Codex`。每一次尝试都会被 macOS 的 Gatekeeper（AppleSystemPolicy）拦截，并触发 `syspolicyd` 进行代码签名和在线公证验证。

问题的核心在于：`syspolicyd` 的默认软性文件描述符（fd）上限只有 **256**。这场每秒数十次的"自我轰炸"会在数分钟内将 `syspolicyd` 的 fd 耗尽。一旦 fd 耗尽，`syspolicyd` 就会对**所有** Gatekeeper 评估请求返回 `EMFILE`（errno 24，即"打开文件过多"错误），导致全系统的应用启动被冻结。

社区中有用户记录到，`syspolicyd` 持有的指向 Codex 主程序的文件描述符数量达到了令人咋舌的 **67,854 个**，内存占用高达 **20GB**。

```
# 用以下命令可以实时观察这场"自我轰炸"风暴
log stream --predicate 'eventMessage CONTAINS "would not allow" AND eventMessage CONTAINS "MacOS/Codex"'
```

在一个 30 分钟的窗口内，有用户记录到了 **31,273 次** Codex 主程序被 Gatekeeper 拒绝的日志。而此时，系统中任何需要 Gatekeeper 验证的操作都会失败：

```
$ spctl -a -vv /System/Applications/Calculator.app
/System/Applications/Calculator.app: Too many open files
```

**触发条件的复杂性**：社区的调查显示，**开启 Computer Use（电脑使用）功能**是最强的触发因素，但并非唯一原因。即使禁用了 Computer Use、Chrome 插件、CodexBar 等所有可选组件，只要 Codex Desktop 在运行，这个问题依然可能出现。有用户指出，当 Codex 正在执行任务（例如通过 SSH 连接到 Docker 容器中的 codex server）时，这个问题同样会被触发。

**急救方案**：

首先，确认你是否正在遭受这个 Bug 的影响：

```bash
# 检查 syspolicyd 持有的 Codex 相关 fd 数量（需要 sudo）
sudo lsof -p $(pgrep -x syspolicyd | head -1) | \
  awk '/\/Applications\/Codex.app\/Contents\/MacOS\/Codex/ {c++} END {print c+0}'

# 如果数字异常高（如超过 100），说明你已经中招
# 同时检查 syspolicyd 的 CPU 占用
ps aux | grep syspolicyd
```

**临时急救**（治标）：退出 Codex，然后强制重启 `syspolicyd`，系统会立即恢复正常：

```bash
# 退出 Codex
osascript -e 'quit app "Codex"'
sleep 3

# 重启系统安全守护进程（launchd 会立即以干净状态重新拉起它们）
sudo killall syspolicyd trustd
```

> **注意**：这只是临时解决方案。只要 Codex 重新启动，fd 泄漏就会再次开始积累。

**缓解措施**（治本方向）：根据社区的讨论，以下措施可能有助于降低触发频率，但无法彻底根治：

```bash
# 在 ~/.codex/config.toml 中禁用 notify（legacy notify 是进程启动放大器之一）
# 注意：修改后需要完全退出并重启 Codex 才能生效（配置是 session-static 的）
notify = []
```

如果你发现问题与某个特定项目相关（例如通过 `/app` 命令从 CLI 迁移过来的项目），可以尝试在应用中删除该项目和相关对话，部分用户反馈此操作后问题消失。

根本性的修复需要 OpenAI 在代码层面解决：为重启逻辑添加指数退避（exponential backoff）和重试上限，避免无限循环的 `posix_spawn` 风暴。

### 4. 僵尸进程与 Crashpad 转储：系统卡顿的幕后黑手

除了上述几个"重量级" Bug，Codex 还在后台制造了不少麻烦。

首先是 **Crashpad 待处理转储的无限增长**（Issue #25921）。Codex 每天会生成约 5GB 的崩溃转储文件，存放在 `~/Library/Application Support/com.openai.codex/web/Crashpad/pending` 目录下，且没有任何自动清理机制。

其次是**僵尸进程的累积**（Issue #25744）。当你退出 Codex 时，它并不会"干净利落"地离开。多个辅助进程（如 `SkyComputerUseService`、`node_repl`、`browser_crashpad_handler` 等）依然在后台游荡，这不仅会导致 HID 延迟，还会引发 `syspolicyd` 和 `trustd` 进程的 CPU/内存失控。值得注意的是，这些孤立的 `browser_crashpad_handler` 进程有时来自**多个不同版本**的 Chromium 框架，它们会在 `syspolicyd` 中持续持有文件描述符，进一步加剧上文提到的 fd 泄漏问题。

你可以先用以下命令确认是否有残留进程：

```bash
pgrep -fl 'Codex|node_repl|SkyComputerUse|app-server|browser_crashpad_handler'
```

**急救方案**：

```bash
# 清理残留的 helper 进程
pkill -f 'SkyComputerUseClient|SkyComputerUseService|node_repl|browser_crashpad_handler' 2>/dev/null

# 恢复系统服务
sudo killall syspolicyd trustd 2>/dev/null
```

---

## 终极拯救指南：codex-fix 工具

如果你不想每次都手动执行上述繁琐的命令，这里有一个更好的选择——笔者专门为上述所有问题打包了一个开箱即用的诊断与修复工具：[**codex-fix**](https://www.npmjs.com/package/codex-fix) [4]。

### 安装与快速上手

无需安装，直接通过 `npx` 一键运行诊断报告（只读，不会修改任何文件）：

```bash
npx codex-fix
```

或者全局安装后使用：

```bash
npm install -g codex-fix
codex-fix
```

如果你的 Codex 已经卡死、无法正常工作，还可以直接通过 `curl` 运行，完全不依赖 Node.js 环境：

```bash
# 只读诊断报告
curl -fsSL https://raw.githubusercontent.com/IchenDEV/codex-fix/main/scripts/codex_fix.sh | bash
```

### 工具覆盖范围

`codex-fix` 的诊断报告会一次性呈现你最需要关注的所有关键指标：

| 检查项 | 对应 Bug |
| :--- | :--- |
| 日志数据库大小、行数、触发器状态 | SSD 寿命刺客 |
| `code_sign_clone.*` 目录数量与总大小 | 克隆大军 |
| Crashpad pending 转储文件数量 | 转储膨胀 |
| Codex 相关 helper 进程数、CPU、内存、僵尸数 | 僵尸进程 |
| `syspolicyd` 持有的 Codex 文件描述符数量 | syspolicyd 被打爆 |

### 安全设计：先预览，再执行

工具采用**默认只读**的设计哲学——所有修改操作都需要显式加上 `--apply` 标志才会生效，这让你可以放心地先预览将要发生的变化，再决定是否执行：

```bash
# 先预览（dry-run）
codex-fix --clean-clones

# 确认无误后，加上 --apply 真正执行
codex-fix --apply --clean-clones
```

### 常用修复命令速查

```bash
# 安装 SQLite 触发器，阻止日志写入（自动备份数据库）
codex-fix --apply --install-log-trigger

# 清理 code_sign_clone 幽灵目录
codex-fix --apply --clean-clones

# 清理 Crashpad 转储文件
codex-fix --apply --clean-crashpad

# 清理 SkyComputerUse 等 helper 进程
codex-fix --apply --kill-helpers

# 重启 syspolicyd/trustd（App 启动冻结时使用）
codex-fix --apply --restart-security-daemons

# 一键执行所有非 sudo 清理操作
codex-fix --apply --all
```

### 作为 Codex / Claude Code 技能使用

`codex-fix` 还支持作为 AI 编程助手的技能（Skill）安装，当 Codex 本身出现问题时，你可以让 Claude Code 来帮你跑诊断：

```bash
# 安装为 Claude Code 技能
mkdir -p ~/.claude/skills
git clone https://github.com/IchenDEV/codex-fix.git ~/.claude/skills/codex-fix
```

安装后，在 Claude Code 中执行 `/codex-fix` 即可触发诊断流程。

---

## 写在最后

Codex 作为一款强大的 AI 编程助手，无疑极大地提升了我们的开发效率。但在享受便利的同时，我们也必须警惕这些底层 Bug 对硬件和系统的潜在伤害。

这些 Bug 的共同特点是：它们都在**默默地、持续地**消耗你的资源——无论是 SSD 的写入寿命、磁盘的可用空间，还是系统安全守护进程的文件描述符。很多用户可能在毫不知情的情况下，已经承受了数月的损耗。

在官方彻底修复这些问题之前，定期运行 `npx codex-fix` 进行诊断，并在需要时执行对应的修复操作，将是你在这场"人机博弈"中保护自己硬件的最佳策略。

希望这篇文章能帮你拯救正在"流血"的 SSD 和正在被"打爆"的 `syspolicyd`，也期待 OpenAI 能尽快推出修复补丁，让我们可以更加安心地进行 Vibe Coding。

---

### 参考资料

[1] [附解决方案] Codex桌面版/CLI版可能会频繁写入日志影响SSD寿命 每天写入1.76TB. 蓝点网. https://www.landian.news/archives/113555.html

[2] [Bug] macOS app leaves code_sign_clone directories after quit (~965MB per launch). GitHub Issue #25667. https://github.com/openai/codex/issues/25667

[3] Codex macOS app relaunches its own main binary in a tight loop, exhausting syspolicyd file descriptors and freezing all app launches system-wide. GitHub Issue #25882. https://github.com/openai/codex/issues/25882

[4] codex-fix: Diagnostic and mitigation toolkit for Codex Desktop and CLI resource-leak symptoms on macOS. npm. https://www.npmjs.com/package/codex-fix
