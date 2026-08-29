---
title: 代码生成快如闪电，为什么交付依然难如登天？
date: 2026-08-29 23:00:00
updated: 2026-08-29 23:00:00
categories: gallery
tags:
  - AI
  - SDLC
  - Agent
  - Engineering
featured_image: /gallery/ai-native-sdlc-running-system/cover.jpg
description: 当 AI 厨师一分钟出菜，为什么你的团队还是觉得“慢”？深入探讨 AI 原生时代软件开发运行系统的重构。
---

想象一家餐厅突然雇佣了十位出菜极快的厨师。过去需要十分钟的炒菜，现在一分钟就能端上柜台。

然而，餐厅并没有因此快上十倍——门口依然排着长队，服务员在焦头烂额地确认忌口，传菜员正对着桌号发呆，而经理正忙着处理送错菜的投诉。当厨房的火力不再是瓶颈，原本被掩盖的交接、审核与验证，成了新的堵塞点。

这正是当前软件开发领域正在发生的剧变。Anthropic 在其最新的 Playbook 中提出了一个振聋发聩的判断：**“Code is no longer the bottleneck（代码不再是瓶颈）”**。

![软件开发运行系统](/gallery/ai-native-sdlc-running-system/running-system.jpg)

当 Coding Agent 把实现速度压缩到极致，耗时开始集中到需求整理、设计、测试、审核、发布和维护。如果周围的组织流程继续按照人的产出来设计，PR 会堆积，安全审核会堆积，审批也会堆积。**软件团队的核心挑战，正从“如何写出代码”转向“如何管理注意力”。**

## 从人工交接，到 Artifact 驱动的循环

在传统模式下，开发是一串“人工交接”。而在 AI 原生时代，Anthropic 提出了一套完整的**「Agent 驱动工作循环」**。其核心灵魂是 **Artifact（中间产物）**。

每一段工作不再是随意的聊天，而是产生一个人类和机器都能读取的成果：

| 阶段 | 主要 Artifact | Agent 做什么 | 人主要做什么 |
| :--- | :--- | :--- | :--- |
| **Plan** | `intent.md` | 将原始问题整理为机器可执行意图 | 修正理解，决定是否进入设计 |
| **Design** | `spec.md` | 根据安全、品牌等规则生成完整方案 | 判断方案是否解决原问题 |
| **Build** | `plan.md`、代码、测试 | 阅读代码库、制定方案、实施、验证 | 审核方案和高风险选择 |
| **Test** | tests、eval results | 自己运行测试、构建、截图比较，循环修复 | 定义什么叫通过 |
| **Deploy** | PR、review findings | Review、修复评论、准备发布、操作工具 | 决定风险是否可以接受 |
| **Maintain** | incident、下一份 `intent.md` | 发现异常、诊断、执行有限动作 | 处理升级事项和最终授权 |

![Artifact 驱动](/gallery/ai-native-sdlc-running-system/handoff-artifact.jpg)

在此模式下，一个 Artifact 被接受，就可以成为下一段的 Trigger。`intent.md` 被接受，触发 Design；`spec.md` 被接受，触发 Plan；PR merge 后触发部署。它已经很接近一个「由文件、状态和事件驱动的 Agent Runtime」。

## 组织经验：从 Prompt 到 Harness

很多团队试图用一段长长的 Prompt 来约束 AI，但这就像对着司机喊“请安全驾驶”。Anthropic 将其分得更细，提出了**“分层治理”**的思想：

1. **CLAUDE.md (项目地图)**：保存一个新工程师加入项目时应该了解的信息，例如架构、命令、约定、Agent 经常犯的错误。告诉 Agent：**「这个项目是什么」**。
2. **Skill (组织经验)**：保存组织中需要反复执行的规则，例如 API 安全规范、UX 标准、品牌要求。告诉 Agent：**「碰到这种事情应该怎么处理」**。
3. **Hook / Permission / Sandbox (红绿灯)**：负责真正强制执行。告诉 Agent：**「这些动作禁止做，这些必须先得到批准」**。

![AI 需要说明书和刹车](/gallery/ai-native-sdlc-running-system/manual-brake.jpg)

单纯把安全规则写进 Prompt 或 Skill 是不够的，真正需要强制执行的规则必须进入 Harness（运行环境）。物理意义上的“门锁”比文字指令更可靠。

## 反馈回路：别让 Agent “自我感觉良好”

Agent 写完代码以后不能直接告诉人“完成了”。它必须拥有自我修正的反馈回路。

![会自检的 Agent 更可靠](/gallery/ai-native-sdlc-running-system/self-check.jpg)

执行 Agent 长时间工作以后容易接受自己的假设，因此 Anthropic 建议将 **Verifier Agent（检查者）** 与普通执行者分开。由另一个开启新 Context 的 Agent 检查实际结果，能极大提高可靠性。这正如我们在餐厅里，厨师盛盘并不代表结束，他得亲自尝一口味道，或者由主厨进行最后把关。

## 持续评测：事故即测试用例

当你修改了 Skill、Hook 甚至模型版本，Agent 的行为可能会发生不可预知的变化。因此，Agent 的配置也需要“回归测试”。

Anthropic 提出 **Continuous Evals**：从过去的真实工作中找 20 到 50 个任务，给每个任务定义接受条件，然后在 CI 中自动运行。**更有意思的是：每次生产事故，都应该变成新的 Eval Case。** 重新运行事故案例，保证旧错误没有在未来的 Harness 修改中重现。

## 结语：从开发流程到通用个人系统

如果我们把“写代码”换成任何脑力劳动，一套**通用个人工作系统 (Personal Harness)** 的骨架就浮现了。

![个人工作系统](/gallery/ai-native-sdlc-running-system/personal-harness.jpg)

让正确的信息，在正确的时机，以正确的粒度进入上下文。这听起来不像什么神奇的“念咒”技巧，但它正是我们从“使用 AI”转向“与 AI 共生”的关键。我们终于可以少花点时间研究如何与 AI 斗智斗勇，而多花点时间，把工作本身想清楚。

---
*本文基于 Anthropic 2026 年 8 月发布的 [The AI-Native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook) 创作。*
