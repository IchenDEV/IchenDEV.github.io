---
title: "写程序，越来越像治理一个组织"
date: 2026-10-23 10:00:00
updated: 2026-10-23 10:00:00
categories:
  - gallery
tags:
  - AI
  - Agent
  - AI Coding
  - Organization
  - Governance
  - Workflow
description: 当 Agent 开始管理 Agent，写程序的重心从逐条安排任务，转向设定目标、边界、证据和反馈机制。
featured_image: /gallery/governing-an-organization-with-agents/cover.webp
---

> 文中的配图均为概念示意，不是产品实录。

以前写程序，注意力落在函数怎么设计、模块怎么划分、数据怎么流动、错误怎样处理。后来有了 AI Coding，需求开始可以交给 Agent：它写代码、调试、跑测试、准备 PR。人更多地做技术方案、拆分工作、看审查结果，也负责处理几个执行者之间的冲突。

这已经很像 Tech Lead 的日常。

但最近，重心又往前挪了一点。我开始让 Agent 管 Agent。不是给每个执行者配一个头衔，而是让一层负责协调的 Agent 去分配工作、收集证据、判断是否需要增加执行者或调整方案。人不再逐一追问每个任务的进度，而是设计它们如何工作、哪些事情可以自己处理、什么时候必须把问题带回来。

![人和协调者面向共同目标，多个专长不同的 Agent 沿着任务路径协作](/gallery/governing-an-organization-with-agents/cover.webp)

说它像“管理团队”也许不够准确。真正变化的不是任务数量，而是视角：我开始关心，这些能够独立执行的 Agent 能不能组成一个会持续交付的组织。

## Leader 的 Leader 在管什么

一个负责多个技术团队的人，不会每天读完所有人的代码，也不需要知道每位工程师今天改了哪个文件。进度开始失控、不同团队反复撞在一起、同一种事故不停出现时，他才需要介入。介入的重点也不是替人把眼前的活做完，而是追问：目标是不是模糊了，协作关系哪里出了问题，还是系统缺少及早暴露异常的办法。

这件事放到 Agent 上更明显。执行者越多，人越不可能通过一条条提示词维持秩序。靠人挨个派活、追问、补上下文，最后只会把人变成最慢的消息中转站。

赫伯特·西蒙在《管理行为》里把“决策前提”说得很清楚：进入一个决策过程的，不只是事实，也包括价值取向、目标、约束和能够使用的信息。[1] 组织设计的一部分工作，就是让这些东西以合适的方式进入每一次具体判断。对 Agent 系统也是如此。与其事后要求它“再仔细一点”，不如先让它知道什么优先、哪些边界不能越、什么证据才能算完成。

![共享的目标、边界和验收标准放在一处，多个 Agent 依此选择下一步](/gallery/governing-an-organization-with-agents/decision-premises.webp)

《不拘一格》讲 Netflix 时，用过 “context, not control” 这个表达：需要自主判断的团队，不能只靠越来越细的指令驱动，管理者也要提供足够的业务背景和判断依据。[2] 这并不等于不设规则，更不等于把风险交给“自觉”。它只是提醒人，系统一旦需要自主行动，规则本身不能代替对目标与边界的理解。

## 从安排任务，到安排关系

最早使用多 Agent 时，很自然会把它想成一个固定团队：产品、架构、前端、后端、测试，各有一个角色。这样看起来像一套完整配置，但实际任务往往不吃这一套。有些问题一个 Agent 就能完成，有些问题真正需要的是检索、实现和验证几种能力临时凑在一起；有些任务拆得过细，光是交接就比工作本身更费事。

Thompson 对组织互依的区分很有启发。两边必须不断相互调整的工作，比单向交接或最后汇总更需要强协调。更稳妥的做法，是把高频相互依赖尽量收在同一个局部单元里，减少它跨边界来回拉扯。[3] 放到工程里，就是先看哪些内容必须一起改、一起看、一起验证；能隔离的，就给它清晰接口和独立上下文，不要让所有 Agent 围着同一份模糊说明互相打断。

![不同专长的 Agent 围绕同一项工作临时聚合，完成后再各自散开](/gallery/governing-an-organization-with-agents/dynamic-assembly.webp)

Mintzberg 把一种围绕项目组建、又会随项目重新组合的形态称作 adhocracy。它适合复杂、变化快、需要跨专长协作的工作，但不是适用于一切场景的“最优结构”。[4] 这一点很适合 Agent：平时把可复用的技能、工具权限和验收方式沉淀好；任务来了，再根据实际依赖拉起少量执行者。所谓组织，并不是先把岗位表画完整，而是让正确的人和能力在需要时相遇。

## 验收和授权，得落到机制上

真正难的地方，不是派谁去做，而是怎样算做完。Agent 说“完成”不够，本地测试绿了也不够。一个 PR 准备好审查、审查通过、合并、部署成功，都是不同状态；每个状态都需要与实际版本对应的证据。否则，系统很容易为了迎合一句“尽快完成”，把还没验过的结果包装成交付。

![执行者携带测试、改动和发布证据，通过验收关口后任务才继续向前](/gallery/governing-an-organization-with-agents/evidence-gate.webp)

这里不该只靠协调 Agent 的记忆。任务状态、验证结果、产物位置和下一步责任，最好都落在可查的事实来源里。一个 Agent 可以据此接手另一个 Agent 的工作，人也能在需要时看清结果从哪里来。验收不是一份漂亮的总结，而是一份别人能够复查的契约。

授权也是同样的道理。安迪·格鲁夫提出，管理方式应当随一个人对具体任务的成熟度调整：经验不足时给更多结构和指导，成熟度提高后减少日常介入，但仍保留足以避免意外的跟进。[5] 对 Agent 来说，成熟度不只取决于模型能力，也取决于任务有没有明确约束、工具是否可靠、是否有回滚路径。一个处理过很多次、边界很清楚的修复，可以在授权范围内自己推进；涉及数据删除、对外发送、权限变更或产品方向的决定，则应该明确停下来。

![常规工作在绿色授权范围内继续，异常信号沿着橙色路径直接递给人](/gallery/governing-an-organization-with-agents/authority-boundary.webp)

借用 Stafford Beer 的可生存系统模型，可以把独立于日常汇报的审计和监测看成一层必要装置。[6] 它的作用不是制造更多检查，而是避免错误被层层转述后才暴露。至于什么异常需要越级、谁有权熔断、多久必须回应，这些不是理论替我们决定的，需要在系统里明明白白地写出来。

## 纠偏，不是再加一句提示词

机制也不会从第一天起就正确。Agent 仍然会重复劳动，会误解交接，会在两个审查意见之间反复横跳。起初最容易做的事，是直接下场把问题解决，再补一条提示词：“以后注意这个情况。”

这样当然能救一次火，却不会改变下一次的发生条件。

如果同一种错误反复出现，应该回头看任务的完成条件是否含混，不同执行者是不是读到了不一致的接口事实，审查是不是缺少“到此为止”的阈值。问题来自架构，就改架构；能由类型系统或测试提前发现，就让程序拦截；出在交接，就改交接机制。单个提示词的补丁，往往只是把故障挪到了下一轮。

![人和协调 Agent 调整路径与早期信号标记，后续执行者不再反复撞上同一处障碍](/gallery/governing-an-organization-with-agents/feedback-loop.webp)

Meadows 的“杠杆点”框架也给了一个很朴素的提醒：调整参数通常是较浅的干预，信息怎样流动、系统允许什么行为、违规时会发生什么，往往更能改变整个系统的走向。[7] 这不是说阈值和提示词不重要，而是说，出现重复故障时，不能永远把它当成某个执行者的一次偶发失误。

## 让组织自己运作

我并不希望 Agent 系统复刻传统组织的全部形式。不需要给每个 Agent 固定职位，也不需要为了显得正式而增加层层汇报。有些事情，一个 Agent 就能完成；有些问题，执行者直接对齐更快。治理的目的不是制造更多治理，而是让正确的事情以更低的协调成本发生。

真正值得从管理经验里继承的，是几个很朴素的骨架：目标清楚，责任明确，权限有边界，交付可验证，偏差有反馈。系统越自主，这些基础设施越不能靠口头默契。

巴纳德把正式组织定义为两个或两个以上的人有意识地协调活动或力量的系统。他也提醒，组织目的的形成与界定不是只发生在最高处的动作，而是一种广泛分布的功能；高层参与其中较一般的部分，同时还要维护沟通与合作意愿。[8] 这比“某个总控 Agent 包打天下”更接近我想做的事。

![人给出方向并站在组织边缘，多个 Agent 沿着清晰路径持续协作，不必等待逐条指挥](/gallery/governing-an-organization-with-agents/self-running-system.webp)

以前，我关心一段代码有没有写对。后来，我关心一项任务有没有交付。现在，我更在意的是：即使我不参与每个任务的具体过程，这套系统能不能在目标不变时持续做出正确的判断，在目标变化时又能及时停下来重新对齐。

过去写程序，是让机器按规则运行。现在要做的更像是先把目标、边界、证据和反馈机制安排好，再让一群能够写程序的 Agent 在其中自己运作。

写程序，正在越来越像治理一个组织。

而我真正期待的，不是有一天能同时指挥几百个 Agent，而是有一天，大多数时候不需要再逐一指挥它们。我只需要想清楚，我们究竟要创造什么。

## 参考资料

1. Herbert A. Simon，[Administrative Behavior, 4th Edition](https://www.simonandschuster.com/books/Administrative-Behavior-4th-Edition/Herbert-A-Simon/9780684835822)，关于决策前提、事实与价值的出版社公开书摘。
2. Reed Hastings、Erin Meyer，[No Rules Rules: Netflix and the Culture of Reinvention](https://www.penguinrandomhouse.com/books/606529/no-rules-rules-by-reed-hastings-and-erin-meyer/)，关于提供 context 而非以细密控制替代判断的出版社介绍。
3. James D. Thompson，[Organizations in Action](https://archive.org/details/organizationsina0000thom)，关于汇集性、顺序性与互惠性依赖的组织理论。
4. Henry Mintzberg，[Four Forms That Fit Most Organizations](https://journals.sagepub.com/doi/10.1177/00081256231214816)，关于 adhocracy、项目与重新组合的讨论。
5. Andrew S. Grove，[High Output Management](https://archive.org/details/dli.ernet.213936)，关于任务相关成熟度与管理介入方式。
6. Stafford Beer、Markus Schwaninger，[Viable System Model Primer](https://web3.isss.org/primer2/beer.html)，关于 System 3* 审计与监测功能。
7. Donella H. Meadows，[Leverage Points: Places to Intervene in a System](https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/)，关于参数、信息流和规则的系统杠杆点。
8. Chester I. Barnard，[The Functions of the Executive](https://archive.org/stream/in.ernet.dli.2015.190485/2015.190485.The-Functions-Of-The-Executive_djvu.txt)，关于正式组织、共同目的与执行职能。
