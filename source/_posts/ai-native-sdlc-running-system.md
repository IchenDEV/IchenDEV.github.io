---
title: "Anthropic 这份 Playbook 真正改造的是软件开发的运行系统"
date: 2026-08-29
updated: 2026-08-29
tags:
  - AI
  - Agent
  - Claude Code
  - SDLC
  - Harness
  - 软件工程
  - 工作流
categories:
  - [gallery]
featured_image: /gallery/ai-native-sdlc/cover.png
description: "用装修、接力单、汽车安全系统和考试题库几个生活例子，讲清 Anthropic AI-Native SDLC Playbook，以及它为什么正在把 Claude Code 推向企业工作运行层。"
---

<style>
.terminal-article .article-cover img,
.terminal-article .terminal-content img {
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
}

.terminal-article .terminal-content {
  line-height: 1.88;
}

.terminal-article .terminal-content p {
  margin: 0 0 1.28rem;
}

.terminal-article .terminal-content h2 {
  margin-top: 2.9rem;
}

.reader-map,
.plain-summary,
.analogy-card,
.engineer-note,
.sdlc-lab,
.control-lab {
  margin: 1.45rem 0;
  border: 1px solid var(--terminal-line-bright);
  border-radius: 8px;
  background: var(--terminal-soft-bg);
}

.reader-map,
.plain-summary,
.analogy-card {
  padding: 1rem 1.05rem;
}

.reader-map strong,
.plain-summary strong,
.analogy-card strong {
  color: var(--terminal-green);
}

.reader-map p,
.plain-summary p,
.analogy-card p {
  margin: 0.42rem 0 !important;
}

.reader-map__routes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 0.8rem;
}

.reader-map__route {
  border: 1px solid var(--terminal-line);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--terminal-panel);
}

.reader-map__route b {
  display: block;
  margin-bottom: 0.22rem;
  color: var(--terminal-cyan);
}

.term-cards,
.risk-cards,
.personal-parts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1.2rem 0;
}

.term-card,
.risk-card,
.personal-part {
  min-width: 0;
  border: 1px solid var(--terminal-line);
  border-radius: 7px;
  padding: 0.85rem 0.9rem;
  background: var(--terminal-panel);
}

.term-card strong,
.risk-card strong,
.personal-part strong {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--terminal-cyan);
}

.term-card code {
  color: var(--terminal-amber);
}

.engineer-note {
  overflow: hidden;
}

.engineer-note summary {
  cursor: pointer;
  padding: 0.85rem 1rem;
  color: var(--terminal-cyan);
  font-weight: 700;
}

.engineer-note[open] summary {
  border-bottom: 1px solid var(--terminal-line);
}

.engineer-note__body {
  padding: 0.9rem 1rem 0.2rem;
}

.engineer-note__body p,
.engineer-note__body ul {
  margin-top: 0 !important;
}

.sdlc-lab,
.control-lab {
  padding: 1rem;
}

.lab-kicker {
  margin-bottom: 0.8rem;
  color: var(--terminal-cyan);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.sdlc-tabs,
.control-tabs {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.sdlc-tabs {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.control-tabs {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.sdlc-tab,
.control-tab {
  min-width: 0;
  border: 1px solid var(--terminal-line);
  border-radius: 5px;
  padding: 0.55rem 0.35rem;
  background: var(--terminal-panel);
  color: var(--terminal-muted);
  cursor: pointer;
  font: inherit;
}

.sdlc-tab[aria-selected="true"],
.control-tab[aria-selected="true"] {
  border-color: var(--terminal-green);
  background: var(--terminal-green);
  color: var(--terminal-active-text);
  font-weight: 700;
}

.stage-output,
.control-output {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.stage-field,
.control-field {
  border: 1px solid var(--terminal-line);
  border-radius: 6px;
  padding: 0.8rem;
  background: var(--terminal-panel);
}

.stage-field b,
.control-field b {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--terminal-green);
  font-size: 0.8rem;
}

.stage-name,
.control-name {
  margin-bottom: 0.8rem;
  color: var(--terminal-text);
  font-size: 1.12rem;
  font-weight: 700;
}

.article-source-note {
  border-top: 1px solid var(--terminal-line);
  margin-top: 2.5rem;
  padding-top: 1rem;
  color: var(--terminal-muted);
  font-size: 0.9rem;
}

@media (max-width: 760px) {
  .reader-map__routes,
  .term-cards,
  .risk-cards,
  .personal-parts,
  .stage-output,
  .control-output {
    grid-template-columns: minmax(0, 1fr);
  }

  .sdlc-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

假设一家装修公司突然得到了一群速度提高十倍的工人。过去要两周完成的木工和水电，现在一天就能做完。

工人变快以后，整套工程并不会自动缩短到一天。业主仍然要说清楚自己想住成什么样，设计师仍然要画图，物业仍然要审批，验收人员仍然要检查水电和消防。工人如果在图纸还没有确认时就开工，返工反而会更多。

Anthropic 在 2026 年 8 月 21 日发布的[《The AI-Native SDLC playbook》](https://claude.com/blog/the-ai-native-sdlc-playbook)，讨论的就是软件行业遇到的同一个问题。

软件从一个想法走到正式上线，中间经过计划、设计、实现、测试、发布和维护。行业里把这整段过程叫作 SDLC，也就是「软件开发生命周期」。Coding Agent 让实现环节突然变快，周围的需求澄清、审核、验证和发布仍然按照人的速度工作。Anthropic 用一句很直接的话概括了变化：

> Code is no longer the bottleneck.

这份 Playbook 真正想改造的，是代码周围那套让工作能够持续流动的系统。

<div class="reader-map">
  <strong>这篇文章有两条阅读路线</strong>
  <p>正文先用生活里的例子讲清楚概念，不要求读者熟悉 Claude Code、Git 或 CI。</p>
  <div class="reader-map__routes">
    <div class="reader-map__route">
      <b>刚入门的读者</b>
      顺着正文和配图阅读，已经可以理解这套方法在解决什么问题。
    </div>
    <div class="reader-map__route">
      <b>有经验的工程师</b>
      每一节末尾都有折叠的「工程补充」，里面保留实现边界和容易出错的地方。
    </div>
  </div>
</div>

## 代码变快以后，等待转移到了代码两边

传统软件流程围绕一个前提建立：写代码很慢，返工也很贵。

团队会花不少时间写需求、估算工作量、做架构评审、排发布窗口。只要实现需要几周，这些流程虽然显得慢，大家仍然能够维持相近的节奏。

Coding Agent 改变了其中一段。一个 Agent 可以在几小时里阅读代码库、修改多个文件、补测试并提交 PR。产品负责人、安全工程师、代码所有者和发布经理的注意力没有同步增加，于是新的等待发生在实现前后。

这很像高速公路中间突然扩成十条车道，收费站和出口仍然只有两个。路上能同时容纳更多车，最终通过出口的速度没有增加多少。

<div class="plain-summary">
  <strong>Playbook 的第一个判断</strong>
  <p>团队以后真正缺少的资源，会逐渐从「写代码的时间」变成「把目标说清楚、把风险判断清楚、把结果验证清楚的注意力」。</p>
</div>

Anthropic 因此没有只讨论怎样让 Claude 多写代码。它把六个阶段重新连成一个循环，让每一段都留下下一段可以读取的成果，再把人的注意力放到少数需要判断的关口。

<details class="engineer-note">
  <summary>给工程师的补充：吞吐量为什么不会随着 Agent 数量一直增加</summary>
  <div class="engineer-note__body">
    <p>一条串联流程的速度，通常受最慢环节限制。Build 从数周缩到数小时以后，Plan、Review、Test 和 Deploy 会变成新的等待点。并行 Session 可以增加实现产量，也会更快碰到 Review Capacity 的上限。</p>
    <p>这意味着团队需要风险分级、证据摘要、Code Owner 路由和注意力预算。继续增加 Agent 数量，很可能只会增加排队中的 Artifact。</p>
  </div>
</details>

## Artifact 可以先理解成一张会传下去的接力单

「Artifact」在软件工程里常被翻译成「工件」。这个词听起来很硬，可以先把它理解成一张接力单。

顾客向餐厅说「我不要花生，想吃清淡一点」。服务员不能只在脑子里记住这句话，他要把要求写进订单。厨师根据订单做菜，出餐人员根据订单核对，顾客的反馈又会回到下一张订单。

这张订单同时有三个用途：

它让人知道顾客要什么；让下一位工作人员知道该继续做什么；让餐厅在出错以后查到问题发生在哪一段。

Anthropic 在六个阶段里安排了类似的接力单：

`intent.md` 记录「为什么要做、希望得到什么、有哪些限制」；`spec.md` 记录「准备怎样解决」；`plan.md` 记录「要改哪些文件、按什么顺序、怎样证明完成」。实现以后，代码、测试结果、PR 审核和事故记录继续承担同样的接力作用。

![Artifact 像一张人和 Agent 都能继续使用的接力单](/gallery/ai-native-sdlc/artifact-chain.png)

<section class="sdlc-lab" data-sdlc-explorer aria-label="AI Native SDLC 六段接力查看器">
  <div class="lab-kicker">INTERACTIVE / 六段接力</div>
  <div class="sdlc-tabs" role="tablist" aria-label="选择阶段">
    <button class="sdlc-tab" type="button" role="tab" aria-selected="true" data-stage="plan">Plan</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="design">Design</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="build">Build</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="test">Test</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="deploy">Deploy</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="maintain">Maintain</button>
  </div>
  <div class="stage-name" data-stage-name>Plan：先确认大家在解决同一个问题</div>
  <div class="stage-output" role="tabpanel" aria-live="polite">
    <div class="stage-field">
      <b>像生活中的什么</b>
      <span data-stage-field="analogy">把顾客的原话写成订单。</span>
    </div>
    <div class="stage-field">
      <b>交给下一段什么</b>
      <span data-stage-field="artifact">intent.md</span>
    </div>
    <div class="stage-field">
      <b>人负责看什么</b>
      <span data-stage-field="human">问题有没有被理解错，值不值得继续做。</span>
    </div>
  </div>
</section>

Artifact 被接受以后，可以成为下一段的触发器。被接受的 `intent.md` 启动设计，被批准的 `spec.md` 启动计划，合并后的 PR 启动发布流水线，生产环境的异常又会生成新的 `intent.md`。

这里有一个边界很重要。Anthropic 把自动触发写成目标形态，同时建议团队先用人工方式启动每一段。先把接力单、权限和验收标准稳定下来，再让系统自动往前走。

<details class="engineer-note">
  <summary>给工程师的补充：Markdown 文件只是状态的一种表现形式</summary>
  <div class="engineer-note__body">
    <p>企业可以继续让 Jira、ServiceNow、Figma 或内部审批系统担任事实源。关键在于每一类 Artifact 只能有一个明确的权威版本，其他系统保存链接、记录 ID 或 commit SHA。</p>
    <p>长期运行时，Artifact 最好拥有稳定 ID、父子关系、状态、所有者、策略版本、证据引用和下一触发条件。Markdown 很适合阅读，底层仍然需要结构化状态，避免复制和分叉以后出现两个「最新版本」。</p>
  </div>
</details>

## Harness 可以理解成导航、安全带和刹车的组合

「Harness」原意接近挽具或安全带。在 Agent 系统里，它指模型周围那套让模型获得上下文、调用工具、受到限制并留下记录的运行环境。

只给 Agent 一段 Prompt，很像只对司机说一句「请安全驾驶」。这句话有帮助，仍然无法代替地图、红绿灯、护栏和刹车。

![Harness 同时包含导航和真正能够生效的安全边界](/gallery/ai-native-sdlc/control-stack.png)

<div class="term-cards">
  <div class="term-card">
    <strong><code>CLAUDE.md</code> 像项目地图</strong>
    它告诉 Agent 代码库的结构、构建命令、约定和经常犯的错误。Anthropic 建议保持精简，因为每次 Session 开始时都会读取。
  </div>
  <div class="term-card">
    <strong>Skill 像驾驶技巧</strong>
    它把安全规范、API 设计方法、品牌要求和常用步骤整理成可复用说明。它主要负责提供建议和方法。
  </div>
  <div class="term-card">
    <strong>Hook 与 Permission 像红绿灯和刹车</strong>
    Hook 在命令或文件修改发生时运行，Permission 决定允许、询问或阻止。它们适合承载必须执行的规则。
  </div>
  <div class="term-card">
    <strong>Sandbox 像封闭练习场</strong>
    它限制文件、网络、进程和凭据的可见范围。即使 Agent 判断失误，影响也被关在较小的边界里。
  </div>
</div>

MCP 可以理解成标准化插座。Agent 通过它连接 GitHub、工单系统、数据库和其他工具。插座解决了连接问题，权限仍然要由 Harness 管理。

Anthropic 对这些组件的分工给出了一个很实用的原则：希望 Agent 遵守的做法，可以写进上下文和 Skill；任何一次都不能被违反的规则，需要进入 Hook、Permission、Sandbox、分支保护或云端权限系统。

<details class="engineer-note">
  <summary>给工程师的补充：本地 Hook 也可能被绕过</summary>
  <div class="engineer-note__body">
    <p>Hook 只有在分发、托管和作用域都设计正确时，才算组织级控制。本地脚本、仓库配置和模型提示无法替代分支保护、云端 IAM、短期凭据、环境审批和网络策略。</p>
    <p>独立 Agent 身份也很重要。日志需要区分谁触发了 Run、哪个 Agent 执行了动作、谁批准了生产发布。</p>
  </div>
</details>

## Agent 完成工作以前，需要先看见真实结果

一个厨师不能把菜放进锅里以后，凭感觉告诉顾客「已经做好了」。他需要尝味道、看火候，发现问题以后再调整。

Agent 也需要同样的反馈回路：

```text
执行
→ 看结果
→ 对照要求
→ 修正
→ 再执行
```

后端任务可以运行测试和构建。界面任务可以打开浏览器、截图并对比。数据任务可以核对总数、抽样检查和重新计算。关键在于，Agent 必须接触真实工具产生的结果。

Anthropic 又把 Self Verification 和 Verifier Agent 分开。Self Verification 是执行者边做边检查，适合及时修正机械错误。Verifier Agent 使用新的 Context，从接受条件和实际结果重新开始检查。一个负责推进，一个负责挑错。

![执行、独立检查和回归题库组成三层验证](/gallery/ai-native-sdlc/feedback-evals.png)

Playbook 还提出 Continuous Evals，也就是持续评测。模型、Prompt、`CLAUDE.md`、Skill、Hook 和权限配置发生变化时，Agent 的行为也可能变化，所以这些配置需要像代码一样跑回归测试。

Anthropic 建议先从最近的真实工作中收集二十到五十个任务，为每个任务写出可以检查的接受条件。更重要的一条规则是，每次生产事故都应该变成新的 Eval Case。系统以后每次升级，都要重新证明旧错误没有回来。

<div class="analogy-card">
  <strong>把 Eval 想成驾校题库</strong>
  <p>某位学员在一个路口犯过错，教练会把这个场景写进题库。以后更换教材、教练或训练方法时，学员都要重新通过这道题。</p>
</div>

<details class="engineer-note">
  <summary>给工程师的补充：漂亮的通过率也可能失真</summary>
  <div class="engineer-note__body">
    <p>Eval 需要覆盖真实任务分布、风险等级、工具组合和失败类型。只保存容易描述的错误，会让通过率逐渐失去代表性。</p>
    <p>高风险任务还可能需要多次运行、固定环境快照、对抗性 Verifier 和明确的失败预算。一次偶然通过，不能证明行为已经稳定。</p>
  </div>
</details>

## Maintain 阶段让开发流程真正闭合成循环

前五个阶段通常由人发起。Maintain，也就是维护阶段，开始允许监控、工单、定时任务或事故频道触发一次新的 Agent Run。

这里可以用家里的恒温器来理解。

温度传感器负责判断房间是否超过阈值，它是一段确定性的程序。AI 可以在被叫醒以后分析原因，例如门窗没有关、空调故障或人突然变多。涉及关闭设备、修改生产系统或发布代码时，仍然需要权限规则和人的批准。

Anthropic 用 1σ、2σ、3σ 展示了三档自治。这个统计符号不用深究，可以把它们理解成「轻微异常、中等异常、严重异常」。

<section class="control-lab" data-control-lab aria-label="维护阶段自治等级查看器">
  <div class="lab-kicker">INTERACTIVE / 生产异常的三档响应</div>
  <div class="control-tabs" role="tablist" aria-label="选择自治等级">
    <button class="control-tab" type="button" role="tab" aria-selected="false" data-level="record">只记录</button>
    <button class="control-tab" type="button" role="tab" aria-selected="true" data-level="diagnose">只读诊断</button>
    <button class="control-tab" type="button" role="tab" aria-selected="false" data-level="act">受限行动</button>
  </div>
  <div class="control-name" data-control-name>中等异常：Agent 可以读取现场并给出诊断</div>
  <div class="control-output" role="tabpanel" aria-live="polite">
    <div class="control-field">
      <b>Agent 可以做</b>
      <span data-control-field="allowed">读取日志、指标和代码，生成诊断与新的 intent.md。</span>
    </div>
    <div class="control-field">
      <b>Agent 不能做</b>
      <span data-control-field="blocked">修改生产系统、直接合并 PR、扩大自己的权限。</span>
    </div>
    <div class="control-field">
      <b>人负责什么</b>
      <span data-control-field="human">判断诊断是否可信，决定是否升级到允许行动的等级。</span>
    </div>
  </div>
</section>

这一段的关键结构可以压缩成四层：确定性程序负责发现异常，Agent 负责解释和准备动作，Policy 决定允许走哪条路，人负责生产授权和最终责任。

权限越界、支付错误、凭据泄露这类硬错误，不适合等待模型判断，应该直接触发确定性规则。统计阈值只是原文用于说明分级自治的例子。

<details class="engineer-note">
  <summary>给工程师的补充：自动循环必须有停止条件</summary>
  <div class="engineer-note__body">
    <p>Trigger 需要去重，动作需要幂等键，Run 需要最大步数、超时、成本预算、Circuit Breaker 和人工接管点。没有这些限制，一个抖动的指标可能反复生成 Intent，两个 Agent 也可能同时处理同一事故。</p>
    <p>回滚同样需要证据。系统要证明自己确实回到了已知状态，并保存失败 Run、授权记录和恢复指标。</p>
  </div>
</details>

## Claude Code 正在从编码工具走向企业 Harness

把文章里出现的产品放在一起看，Anthropic 的方向已经很清楚。

Claude 和 Cowork 帮助非开发人员表达意图，Claude Code 负责计划、实现和验证；`CLAUDE.md`、Skills、Hooks、Permissions 和 Sandbox 形成运行边界；MCP 连接外部工具；Code Review 和 Claude Code Action 进入 PR 与 CI；Agent SDK 支持长期运行的服务；OpenTelemetry 保存运行轨迹。

单独看，这些组件都不陌生。Git、CI、监控、权限系统和 ChatOps 已经存在很多年。新的部分来自组合方式：Agent 开始贯穿整条链，前一个 Artifact 被接受以后可以触发下一次 Run，运行结果又回到 Artifact、Skill 和 Eval。

谁掌握 Artifact 的格式、策略的分发、工具的入口、Eval 的样本和运行历史，谁就更接近软件公司的工作运行层。模型可以更换，长期积累的工作状态和控制规则更难迁移。

## 把软件名词换掉，Personal Harness 的骨架就出现了

这套结构并不只适用于写代码。

用户说一句「帮我更新下一轮融资材料」，聊天可以先澄清目标：材料给谁看，数据截止到哪一天，哪些数字需要保密，最终要交付哪些文件。

随后，系统把工作拆成调研、财务模型和演示稿。调研结果进入 `research.md`，数字进入 `model.xlsx`，页面进入 `deck.pptx`。Verifier 检查引用、数字和版式，用户批准最终版本。下个月，日期或市场数据变化又会触发新的检查。

![Personal Harness 把一次聊天变成有状态、可验证、会再次触发的工作](/gallery/ai-native-sdlc/personal-harness.png)

<div class="personal-parts">
  <div class="personal-part">
    <strong>聊天负责表达</strong>
    人用自然语言提出目标、补充背景和纠正误解。
  </div>
  <div class="personal-part">
    <strong>Artifact 负责保存状态</strong>
    文件、表格、演示稿和确认记录让工作离开聊天窗口以后仍然存在。
  </div>
  <div class="personal-part">
    <strong>Run 负责执行</strong>
    系统知道哪些任务正在进行、在哪个环境里运行、失败以后怎样继续。
  </div>
  <div class="personal-part">
    <strong>Policy 负责建立信任</strong>
    权限、审批、预算和审计记录决定 Agent 可以走到哪里。
  </div>
</div>

<details class="engineer-note">
  <summary>给工程师的补充：从 Anthropic SDLC 到 Personal Harness 的映射</summary>
  <div class="engineer-note__body">
    <p><code>intent.md</code> 对应 Goal，<code>spec.md</code> 对应 Workspace Spec，<code>plan.md</code> 对应 Task Plan，<code>CLAUDE.md</code> 对应 Project Context，Skill 对应可复用方法，Subagent 对应执行 Agent，Hook 对应 Policy，MCP 对应 Tool Gateway，Worktree 对应 Run Isolation，PR 对应 Artifact Review，Git History 对应 Run History 和 Audit Log。</p>
  </div>
</details>

## 这份 Playbook 仍然留下了几道难题

<div class="risk-cards">
  <div class="risk-card">
    <strong>它没有交付统一 Runtime</strong>
    原文给出运行协议、组件和实施方法，团队仍然要自己选择状态机、事实源和编排方式。
  </div>
  <div class="risk-card">
    <strong>Artifact 也会腐烂</strong>
    文件可能过期、互相矛盾或失去链接。版本控制能够记录变化，无法自动保证内容仍然正确。
  </div>
  <div class="risk-card">
    <strong>人的注意力仍然稀缺</strong>
    Agent 产出越快，需要审核的成果越多。风险排序和证据质量会决定系统能否继续扩展。
  </div>
  <div class="risk-card">
    <strong>Eval 可能被旧任务骗过</strong>
    工作分布变化以后，旧题库仍然可能给出很高的通过率。评测集合也需要持续维护。
  </div>
</div>

这些问题没有削弱 Playbook 的价值。它们说明下一阶段的竞争重点会从「模型能不能执行」转向「系统怎样保存目标、限制动作、验证结果并吸收失败」。

## Agent 正在变成承载工作方法的运行环境

这份 Playbook 里真正有价值的东西，来自一条完整的闭环：

```text
目标
→ Artifact
→ Agent Run
→ Policy
→ Evidence
→ Human Gate
→ Production
→ Incident
→ 新的目标
```

聊天继续承担最自然的入口，Artifact 保存长期状态，Run 保存执行过程，Policy 保存边界，Evidence 保存可信度，人保留价值判断和生产授权。

Anthropic 在结尾写道：

> The loop keeps running. Human judgement stays above it.

这句话也很适合作为 Personal Harness 和 AI Native Desktop 的设计边界。循环可以长期运行，人的判断仍然属于系统本身。

<div class="article-source-note">

本文主要依据以下官方资料：

1. [The AI-Native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)
2. [Claude Code Skills](https://code.claude.com/docs/en/skills)
3. [Claude Code Hooks](https://code.claude.com/docs/en/hooks)
4. [Claude Code Sandboxing](https://code.claude.com/docs/en/sandboxing)
5. [Managed MCP](https://code.claude.com/docs/en/managed-mcp)
6. [Claude Code Monitoring with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage)

资料快照：2026 年 8 月 29 日。

</div>

<script>
(function () {
  const stageData = {
    plan: {
      name: "Plan：先确认大家在解决同一个问题",
      analogy: "把顾客的原话写成订单。",
      artifact: "intent.md",
      human: "问题有没有被理解错，值不值得继续做。"
    },
    design: {
      name: "Design：把想法变成可以讨论的方案",
      analogy: "设计师根据订单画出图纸。",
      artifact: "spec.md",
      human: "方案是否解决原问题，关键取舍是否合理。"
    },
    build: {
      name: "Build：先写施工计划，再开始动手",
      analogy: "工长列出材料、顺序和验收方法。",
      artifact: "plan.md、代码与测试",
      human: "计划是否可信，高风险选择是否可以接受。"
    },
    test: {
      name: "Test：用真实结果证明已经完成",
      analogy: "验收人员通水、通电、测量并拍照。",
      artifact: "测试日志、截图、Eval 结果",
      human: "接受条件是否满足，业务意图有没有走偏。"
    },
    deploy: {
      name: "Deploy：把成果送进下一个环境",
      analogy: "物业验收后，允许正式交付和入住。",
      artifact: "PR、审核意见、发布与回滚记录",
      human: "风险是否可以进入生产，谁授权这次发布。"
    },
    maintain: {
      name: "Maintain：上线以后继续观察和修理",
      analogy: "入住后的报修单又回到新的设计和施工。",
      artifact: "事故记录、新 intent.md、新 Eval Case",
      human: "是否升级处理，生产动作是否得到授权。"
    }
  };

  const explorer = document.querySelector("[data-sdlc-explorer]");
  if (explorer) {
    const tabs = Array.from(explorer.querySelectorAll("[data-stage]"));
    const nameNode = explorer.querySelector("[data-stage-name]");
    const fields = Array.from(explorer.querySelectorAll("[data-stage-field]"));

    function renderStage(key, focus) {
      const stage = stageData[key];
      if (!stage) return;
      tabs.forEach(function (tab) {
        const active = tab.dataset.stage === key;
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      nameNode.textContent = stage.name;
      fields.forEach(function (node) {
        node.textContent = stage[node.dataset.stageField];
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        renderStage(tab.dataset.stage, false);
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (index + direction + tabs.length) % tabs.length;
        renderStage(tabs[next].dataset.stage, true);
      });
    });
  }

  const controlData = {
    record: {
      name: "轻微异常：确定性程序只保存现场",
      allowed: "没有调用 Agent，只记录时间、指标、日志和基线。",
      blocked: "读取业务数据、生成诊断、修改任何系统。",
      human: "观察趋势，调整检测规则和阈值。"
    },
    diagnose: {
      name: "中等异常：Agent 可以读取现场并给出诊断",
      allowed: "读取日志、指标和代码，生成诊断与新的 intent.md。",
      blocked: "修改生产系统、直接合并 PR、扩大自己的权限。",
      human: "判断诊断是否可信，决定是否升级到允许行动的等级。"
    },
    act: {
      name: "严重异常：Agent 只能沿批准过的路线行动",
      allowed: "打开进入审核门的 PR，或调用可回滚的 Runbook。",
      blocked: "绕过分支保护、自行批准发布、调用未授权工具。",
      human: "批准生产动作，处理超出 Runbook 的事项。"
    }
  };

  const controlLab = document.querySelector("[data-control-lab]");
  if (controlLab) {
    const tabs = Array.from(controlLab.querySelectorAll("[data-level]"));
    const nameNode = controlLab.querySelector("[data-control-name]");
    const fields = Array.from(controlLab.querySelectorAll("[data-control-field]"));

    function renderControl(key, focus) {
      const level = controlData[key];
      if (!level) return;
      tabs.forEach(function (tab) {
        const active = tab.dataset.level === key;
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
        if (active && focus) tab.focus();
      });
      nameNode.textContent = level.name;
      fields.forEach(function (node) {
        node.textContent = level[node.dataset.controlField];
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        renderControl(tab.dataset.level, false);
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = (index + direction + tabs.length) % tabs.length;
        renderControl(tabs[next].dataset.level, true);
      });
    });
  }
})();
</script>
