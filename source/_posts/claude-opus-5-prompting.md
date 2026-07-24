---
title: "当提示词遇上 Claude Opus 5：别教它怎么走，告诉它在哪里停"
date: 2026-07-22
updated: 2026-07-22
tags:
  - AI
  - 提示词
  - Claude
  - Prompt Engineering
categories:
  - [gallery]
featured_image: /gallery/claude-opus-5-prompting/cover.jpg
description: "写给 Opus 5 的提示词，核心不再是教它怎么做，而是告诉它在哪里停。"
---

# 当提示词遇上 Claude Opus 5：别教它怎么走，告诉它在哪里停

**——从 Anthropic 官方文档出发，聊聊 Opus 5 的提示词为什么更需要边界感**

想象一个场景。你招来了一位极其资深的高级工程师，把一项复杂的重构任务交给他。结果你不仅给了他需求文档，还附上了一份“如何使用 Git”“每次提交前请务必自己跑一遍测试”“如果遇到小 bug 请自行修复”的备忘录。

这位工程师看着你，心里大概只有一个念头：这些难道不是我本来就会做的事吗？

这就是我们在面对不同模型时，常常会犯的提示词错误。不同能力层级的模型，就像不同性格与经验的协作者。有些模型需要你像保姆一样，一步步拆解流程、强调检查；而像 Claude Opus 5 这样主打复杂企业任务与端到端代理编码的模型，它已经具备了极强的自主性。

如果你还在提示词里塞满各种“过程控制”和“自我验证”指令，不仅毫无帮助，反而会变成束缚它的枷锁。

最近，我仔细研读了 Anthropic 官方发布的 Claude Opus 5 提示工程文档。在这份文档里，我发现了一个非常有趣的趋势：**对于 Opus 5 来说，好提示词的核心不再是“教它怎么做”，而是“告诉它在哪里停”。**

今天想和大家聊聊，写给 Opus 5 的提示词，到底长什么样。

## 先把任务说完整，然后放手让它做

Opus 5 最鲜明的特点，是它很适合一次接住一项完整任务。

Anthropic 的说法是：在多文件功能开发、大型重构和端到端交付中，Opus 5 往往会把整件事做完，而不是停在脚手架、占位符或半成品；相应地，它也更适合在开始时拿到完整的任务规格，然后独立执行 [1]。

这里说的“完整”，并不等于写得很长。真正有用的信息通常只有四类：要完成什么、范围在哪里、什么结果算完成，以及有哪些不能碰的边界。

```text
为现有 TypeScript API 增加审计日志。

完成标准：
- 记录操作者、动作、对象、时间和结果；
- 覆盖创建、更新与删除接口；
- 现有 API 行为和返回格式保持不变；
- 补齐测试，并确保测试通过。

只修改与审计日志直接相关的代码，不顺手重构其他模块。
完成整项任务，不留下占位符。
```

这个提示词没有规定“第一步打开哪个文件，第二步设计哪张表”。它只把终点画清楚。具体怎么走，交给 Opus 5 自己判断。

## 过程越少越好，边界越硬越好

翻看很多人写给复杂任务的提示词，有一个共同的特征：它们喜欢在过程中微管理。

“请先列出计划。每完成一步都向我汇报。如果发现错误，请详细说明原因并修正。完成后，请再检查一遍你的代码，最好派两个子代理分别验证……”

这种提示词在某些模型上很管用，但在 Opus 5 面前，它会引发严重的“过度验证”和“过度叙述”。

Anthropic 在官方文档里说得很直接：

> Claude Opus 5 verifies its own work without being told to. If your prompt contains explicit verification instructions... remove them: instructions like these cause over-verification on Claude Opus 5, and removing them reduces wasted tokens with no loss in quality. [1]

翻译过来就是：它自己会检查，别再让它“再检查一遍”了。那些遗留的验证指令，只会让它平白无故地消耗 Token，却不会带来任何质量提升。

不仅是验证，纠错也是如此。Opus 5 会自动捕捉并修复自己的错误。如果你非要在提示词里加上“发现任何错误都要说明”，你就会得到一份冗长的自我更正流水账。

所以，给 Opus 5 的提示词，第一原则就是**砍掉所有关于“过程自省”的指令**。

![边界控制示意图](/gallery/claude-opus-5-prompting/opus5-boundary.jpg)

## 设定清晰的“不作为”清单

如果说砍掉过程指令是为了减负，那么设定“不作为”清单就是为了防偏。

Opus 5 是一个极其积极的执行者。它擅长多文件特性开发和大型重构，但也正因为如此，它很容易在狭窄的任务中“越界”。比如，你只是让它修复一个 bug，它可能会顺手把周围的代码都重构一遍。

对于这种模型，提示词里最重要的一句话，往往是用来约束范围的。

```text
// 约束范围的推荐写法
Deliver what was asked, at the scope intended. Make routine judgment calls yourself...
If the request seems mistaken or a better approach exists, say so in a sentence and continue with the task as asked rather than quietly narrowing, widening, or transforming it.
Finish the whole task, and stop short of actions that are clearly beyond what was asked.
```

短短几行，把日常判断的自主权交给了模型，同时死死按住了“扩大范围”和“改写任务”的冲动。

这同样适用于子代理（Subagent）的使用。Opus 5 很乐于将任务委派给子代理，但对于小任务来说，启动子代理只会成倍增加成本和延迟。因此，官方明确建议在提示词中加入委派条件：“只在规模庞大且真正可并行的任务中使用子代理；不要为了重复检查自己的工作而派代理。”

## 把输出长度和思考深度分开

在很多人的习惯里，想让模型少说两句，最直接的办法就是调低参数。但 Opus 5 把这两个概念彻底分开了。

在 Opus 5 的 API 架构中，`effort` 参数（low 到 max）控制的是**思考深度**，而不是可见文本的长度。降低 `effort` 确实能减少思考 Token 的消耗，但并不能可靠地让最终回答变短 [1]。

相反，Opus 5 默认的可见回答和写入文件的报告，都偏向于详尽。如果你想要简练的输出，必须在提示词里明确要求。

```text
// 控制输出长度的推荐写法
Keep responses focused, brief, and concise. Keep disclaimers and caveats short, and spend most of the response on the main answer.
When asked to explain something, give a high-level summary unless an in-depth explanation is specifically requested.
```

同样地，对于代理执行过程中的进度汇报，也应该明确节奏：“在第一次工具调用前，用一句话说明你准备做什么。工作过程中，只在发现重要信息或改变方向时简短更新。结束时结果先行。”

## 实战印证：清空旧工作流与降低 effort

不仅是官方文档，在一线开发者中，这种“清空旧习惯”的体验正在被反复验证。

最近，Every（一家知名的 AI 产品公司）的 CEO Dan Shipper 在 X 上分享了他的首发体验 [2]。他们团队一开始非常不适应 Opus 5，发现它会“和指令吵架”，甚至在任务没做完时就停下来，和之前为旧模型搭建的复杂工作流（如 Compound Engineering）完全不兼容。

当他们决定“从零开始”，不带任何旧有技能与插件去测试时，Opus 5 的表现反而“戏剧性地变好了，甚至闪现出天才般的才华”。

更有趣的是他们对 `effort` 参数的发现：Opus 5 在较低的思考层级（medium 甚至 low）表现反而更好。Shipper 指出：“你给它越多的时间去思考，它就越有可能做出那些烦人的行为。”

这与官方文档中“思考深度不等于输出长度”的理念不谋而合。不要一遇到问题就盲目调高参数，有时候给模型少一点“胡思乱想”的空间，它反而更聚焦于完成你的任务。

## 写在最后

研究完 Opus 5 的提示词指南，我最大的感触是：面对一个自主性很强的 AI 协作者，写提示词更像是在划定工作边界，而不是编写操作手册。

我们习惯了事无巨细的指导，习惯了把每一个可能出错的地方都写上防呆措施。但面对 Opus 5 这样自带纠错与验证机制的模型，这种做法反而是画蛇添足。

与其花大量时间写一个三百行的“保姆级”提示词，不如花十分钟想清楚：**这项任务的边界在哪里？什么是绝对不能碰的？沟通的频率应该保持在什么水平？**

想清楚这三件事，把它们清晰地写下来。剩下的，Opus 5 会自己处理。

说不定，你会发现一个更轻松的协作模式。

## 参考资料

[1] Anthropic. (2026). Prompting Claude Opus 5. Claude Platform Docs. https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5
[2] Dan Shipper. (2026). Breaking: Claude Opus 5 is OUT NOW! And…it's a hard model to love. X. https://x.com/danshipper/status/2080700057892815114
