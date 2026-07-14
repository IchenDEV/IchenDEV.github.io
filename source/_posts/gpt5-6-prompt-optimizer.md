---
title: 当提示词遇上 GPT-5.6：少即是多
date: 2026-07-14 18:00:00
updated: 2026-07-14 18:00:00
tags:
  - AI
  - LLM
  - Agent
  - Prompt
  - OpenAI
categories:
  - [gallery]
featured_image: /gallery/gpt5-6-prompt-optimizer/cover.jpg
author: chenli
description: 当模型变得更聪明，我们的提示词反而应该变得更简单。聊聊我为 GPT-5.6 打造的提示词优化 Skill，以及 OpenAI 官方文档背后的设计哲学。
---

# 当提示词遇上 GPT-5.6：少即是多

## ——从 OpenAI 官方文档出发，聊聊为什么旧提示词在新模型面前越来越不好用

想象一个场景。你有一台最新款的跑车，但方向盘上还贴着三年前的驾驶手册——"起步前先踩刹车，然后踩油门，再换挡，保持转速在 3000 转"。你握着方向盘，心里只有一个念头：这车明明能自己处理好这些，我为什么还要念说明书？

这就是我们面对 GPT-5.6 时的处境。

模型已经进化了，但我们的提示词还在用上一代的逻辑运行。那些层层叠叠的"步骤指导"、反复强调的"行为准则"、事无巨细的"过程脚手架"——在 GPT-5 的时代，它们可能是必要的拐杖；但在 GPT-5.6 面前，它们反而成了束缚。

最近，我花了不少时间仔细研读了 OpenAI 官方发布的 GPT-5.6 系列文档，并基于这些官方指导打造了一个名为 **optimize-gpt-5-6-prompts** 的 Skill。这个工具的职责很直接：把你手中那些粗糙的、过时的、或者过于臃肿的提示词，打磨成 GPT-5.6 真正能够高效执行的精简指令。今天想和大家聊聊这个过程里的一些发现——不只是工具本身，更是一种与新一代 AI 协作的思维方式的转变。

![混乱的提示词 vs 精简的提示词](/gallery/gpt5-6-prompt-optimizer/prompt-bloat.jpg)

## 旧提示词的"时代病"

在写这个 Skill 之前，我翻看了自己过去积累的几十个提示词。有一个共同的特征让我印象深刻：它们都很长。不是那种精炼的长，而是那种生怕模型"不理解"所以什么都写上去的长。

"请你作为一个经验丰富的数据分析师，首先仔细阅读我提供的所有数据，不要跳过任何一行。然后，你需要逐步执行以下操作：第一步，检查数据的完整性，如果有缺失值请用平均值填充；第二步，计算每个维度的统计指标，包括但不限于均值、中位数、标准差；第三步，识别异常值并标注；第四步，生成可视化图表；第五步，最后总结你的发现……"

这种提示词在 GPT-3.5 或者 GPT-4 的时代非常有效。那时候的模型确实需要这样保姆级的指导才能不出错。但我们现在面对的是 GPT-5.6——一个在推理效率、工具调用精度和指令理解上都有了质变的模型。

OpenAI 在官方文档里说得很直接：

> GPT-5.6 works best when prompts define the outcome, important constraints, available evidence, and completion bar, then leave room for the model to choose an efficient path. [1]

翻译过来就是：告诉模型你想要什么结果、有哪些约束条件、能看到什么证据、达到什么标准就算完成——然后，让模型自己去选路。

这和我们过去的习惯完全相反。过去我们习惯于"教"模型怎么做，现在官方建议我们"告诉"模型做什么。

## 来自官方的四个核心原则

在开发 **optimize-gpt-5-6-prompts** 的过程中，我把 OpenAI 官方文档中的核心指导提炼为四个重塑原则。这不仅仅是写提示词的技巧，更像是一套与 GPT-5.6 协作的心法。

### 一、先做减法，再做加法

官方文档中有一组数据让我印象深刻：在一些内部的代码代理评估中，经过精简的系统提示词不仅将整体 Token 消耗降低了 41% 到 66%，还将评估分数提升了 10% 到 15% [1]。

少即是多。这不是鸡汤，这是实测数据。

这个 Skill 的第一步就是"砍"。它会扫描你的提示词，找出那些重复的指令、过时的示例、不会改变模型行为的流程描述，以及和当前任务无关的工具。把这些都删掉之后，再看剩下的内容——你会发现，真正在驱动模型行为的，往往只有很少一部分。

> Start with a prompt and tool set that already works. Remove one group of instructions, examples, or tools at a time, then rerun the same evals. [1]

官方的建议也很务实：不要一次性重写整个提示词栈，而是每次只删一组内容，然后用相同的测试用例重新评估。这样你才能知道到底是删了什么导致了效果变化。

### 二、以结果为导向，而不是以过程为导向

这是 GPT-5.6 提示词设计中最核心的转变。

过去的提示词喜欢写"步骤"，现在的提示词应该写"标准"。

```text
// 旧的写法
First, read the file.
Then, analyze the data row by row.
Next, identify patterns.
Finally, write a summary report.

// 新的写法
Analyze the provided data and produce a summary report.
Success means: all key metrics are calculated, trends are identified,
and any anomalies are flagged with evidence.
If required data is missing, ask for the smallest missing field.
```

第二种写法把注意力从"怎么一步步做"转移到了"做成什么样才算完成"。GPT-5.6 会自己选择最高效的执行路径，而你的提示词只需要定义终点和成功的标准。

![从过程导向到结果导向的转变](/gallery/gpt5-6-prompt-optimizer/outcome-first.jpg)

官方文档里有一个非常生动的对比示例：

> Prefer: Resolve the customer's issue end to end. Success means: make the eligibility decision from available policy and account evidence, complete any allowed action before responding, return completed_actions, customer_message, and blockers. If required evidence is missing, ask for the smallest missing field. [1]

短短几行，把目标、成功标准、输出格式、缺失信息处理全部讲清楚了。没有说"第一步做什么、第二步做什么"，因为 GPT-5.6 不需要。

### 三、设定清晰的权限边界

GPT-5.6 在执行多步任务时非常积极，甚至有些"过于主动"。如果你的提示词没有明确界定它能做什么、不能做什么，它可能会在你意想不到的地方"发挥创造力"。

所以，提示词中必须有一个清晰的权限策略，而且只需要写一次：

```text
For requests to answer, explain, review, diagnose, or plan:
  inspect the relevant materials and report the result.
  Do not implement changes unless the request also asks for them.

For requests to change, build, or fix:
  make the requested in-scope local changes and run relevant
  non-destructive validation without asking first.

Require confirmation for external writes, destructive actions,
purchases, or a material expansion of scope.
```

这个策略把操作分成了三个层级：可以自主执行的（阅读、分析、诊断），可以在本地范围内自主修改的（代码修复、文件编辑），以及必须经过批准的（外部写入、删除、购买、扩大范围）。清晰、简洁、没有歧义。

![Agent 的权限边界](/gallery/gpt5-6-prompt-optimizer/authority-boundary.jpg)

官方特别提到，重复的权限指令反而会造成问题。如果你在提示词里反复写"ask first"、"do not mutate"、"wait for approval"，模型可能会对本该安全执行的本地操作也反复确认，反而降低了效率。

### 四、让推理发生在 API 层面，而不是提示词层面

这是最容易被忽视的一点。

过去我们习惯在提示词里写"think step by step"或者"think harder"，希望通过语言来激发模型的推理能力。但在 GPT-5.6 的架构中，推理的强度是通过 API 的 `reasoning.effort` 参数来控制的，有 `low`、`medium`、`high`、`xhigh`、`max` 五个等级 [2]。

把这些推理指令从提示词里删掉，换成 API 层面的配置。提示词里应该写的是成功标准、证据要求和验证条件，而不是"请多思考"。

同时，输出长度也应该通过 `text.verbosity` 参数来控制，而不是在提示词里反复强调"be concise"或者"keep it short" [1]。GPT-5.6 默认风格就已经更简洁直接了，过度的简短指令反而可能让回复过于单薄。

## 这个 Skill 是怎么工作的

**optimize-gpt-5-6-prompts** 的工作流程很简单，但每一步都有明确的判断标准。

当你把一段提示词交给它时，它首先会进行"清晰度检查"——不是检查语法，而是检查这段提示词是否定义了明确的目标、输入、约束、输出格式和成功标准。如果缺失的信息足以影响最终的执行结果，它会停下来问你几个关键问题，而不是自己猜测。

然后，它会对提示词进行"手术"。不是重写，而是精确地切除那些不再需要的部分，修正相互矛盾的指令，补充必要的成功标准和停止条件。整个过程严格遵循 OpenAI 官方文档中的指导，不做任何"自由发挥"。

最后，它会输出一个可以直接复制使用的优化提示词，并附上几个关键改动说明。如果某些修改是基于假设做出的，它也会明确标注出来。

这个 Skill 的核心代码结构是：

| 组件 | 职责 |
|------|------|
| SKILL.md | 定义完整的工作流程、改写原则、验证检查和输出格式 |
| agents/openai.yaml | 定义 Agent 接口，包括显示名称和默认调用方式 |
| references/official-guidance.md | 收录 OpenAI 官方文档的核心指导原则，作为改写的依据 |

整个设计遵循了一个原则：只做那些确实能改变模型行为的事情。如果删掉一段文字不会改变 GPT-5.6 的输出，那就删掉它。如果加上一个角色设定不会让结果更好，那就不加。每一行提示词都应该有存在的理由。

## 写在最后

GPT-5.6 的发布让我意识到一个有趣的现象：当 AI 变得更聪明时，我们对它的"教导"反而应该变得更少。

这和我们平时的思维方式有些不同。我们习惯了"越详细越好"，习惯了把每一个可能出错的地方都写上注意事项。但面对一个推理能力强、工具调用精确、指令理解细致的模型，这种做法反而是画蛇添足。

与其花大量时间写一个三百行的"保姆级"提示词，不如花十分钟想清楚：我到底想要什么结果？成功的标准是什么？模型可以自主做什么、不可以做什么？想清楚这三件事，剩下的，GPT-5.6 会自己处理。

这个 Skill 是我在这条路上的一小步尝试。如果你也有被臃肿的提示词困扰的经历，不妨试试看——把你的提示词交给它，看看它能帮你删掉多少"废话"，留下多少真正重要的东西。

说不定，你会发现一个更简洁的自己。

## 参考资料

[1] OpenAI. (2026). *Prompting guidance for GPT-5.6 Sol*. OpenAI Developer Documentation. https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6

[2] OpenAI. (2026). *Using GPT-5.6*. OpenAI Developer Documentation. https://developers.openai.com/api/docs/guides/latest-model?model=gpt-5.6
