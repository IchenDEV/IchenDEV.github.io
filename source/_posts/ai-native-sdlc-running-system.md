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
description: "从 Anthropic 的 AI-Native SDLC Playbook 出发，分析 Artifact Chain、Agent Harness、持续评测、生产触发与 Personal Harness 之间的关系。"
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
  line-height: 1.84;
}

.terminal-article .terminal-content p {
  margin: 0 0 1.18rem;
}

.sdlc-lab {
  margin: 1.6rem 0 2rem;
  border: 1px solid var(--terminal-line-bright);
  border-radius: 8px;
  padding: 1rem;
  background: var(--terminal-soft-bg);
}

.sdlc-lab__kicker {
  margin-bottom: 0.8rem;
  color: var(--terminal-cyan);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.sdlc-tabs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.45rem;
  margin-bottom: 1rem;
}

.sdlc-tab {
  min-width: 0;
  border: 1px solid var(--terminal-line);
  border-radius: 5px;
  padding: 0.55rem 0.35rem;
  background: var(--terminal-panel);
  color: var(--terminal-muted);
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
}

.sdlc-tab:hover,
.sdlc-tab:focus-visible {
  border-color: var(--terminal-cyan);
  color: var(--terminal-text);
  outline: 0;
}

.sdlc-tab[aria-selected="true"] {
  border-color: var(--terminal-green);
  background: var(--terminal-green);
  color: var(--terminal-active-text);
  font-weight: 700;
}

.sdlc-stage-head {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;
  margin-bottom: 0.9rem;
  border-bottom: 1px solid var(--terminal-line);
  padding-bottom: 0.65rem;
}

.sdlc-stage-index {
  color: var(--terminal-amber);
  font-size: 0.85rem;
}

.sdlc-stage-name {
  color: var(--terminal-text);
  font-size: 1.15rem;
  font-weight: 700;
}

.sdlc-stage-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.sdlc-field {
  min-width: 0;
  border: 1px solid var(--terminal-line);
  border-radius: 5px;
  padding: 0.7rem 0.75rem;
  background: var(--terminal-panel);
}

.sdlc-field:last-child {
  grid-column: 1 / -1;
}

.sdlc-field__label {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--terminal-green);
  font-size: 0.78rem;
  font-weight: 700;
}

.sdlc-field__value {
  color: var(--terminal-text);
  overflow-wrap: anywhere;
}

.sdlc-stage-summary {
  margin: 0.9rem 0 0 !important;
  color: var(--terminal-muted);
  font-size: 0.9rem;
}

.autonomy-lab__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 0.8rem;
}

.autonomy-lab__level {
  color: var(--terminal-green);
  font-size: 1.05rem;
  font-weight: 700;
}

.autonomy-range {
  width: 100%;
  accent-color: var(--terminal-green);
}

.autonomy-scale {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 0.35rem;
  color: var(--terminal-dim);
  font-size: 0.76rem;
}

.autonomy-scale span:nth-child(2) {
  text-align: center;
}

.autonomy-scale span:last-child {
  text-align: right;
}

.autonomy-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 1rem;
}

.autonomy-card {
  border: 1px solid var(--terminal-line);
  border-radius: 5px;
  padding: 0.7rem 0.75rem;
  background: var(--terminal-panel);
}

.autonomy-card strong {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--terminal-cyan);
  font-size: 0.78rem;
}

.autonomy-card span {
  color: var(--terminal-text);
}

.runtime-line {
  display: grid;
  gap: 0.4rem;
  margin: 1.4rem 0;
  border: 1px dashed var(--terminal-line-bright);
  border-radius: 6px;
  padding: 0.9rem 1rem;
  background: var(--terminal-soft-bg);
  color: var(--terminal-muted);
}

.runtime-line strong {
  color: var(--terminal-green);
}

.runtime-line code {
  width: fit-content;
}

.article-source-note {
  border-top: 1px solid var(--terminal-line);
  margin-top: 2.4rem;
  padding-top: 1rem;
  color: var(--terminal-muted);
  font-size: 0.9rem;
}

@media (max-width: 760px) {
  .sdlc-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sdlc-stage-grid,
  .autonomy-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .sdlc-field:last-child {
    grid-column: auto;
  }

  .autonomy-lab__top {
    display: block;
  }
}
</style>

我把 Anthropic 在 2026 年 8 月 21 日发布的[《The AI-Native SDLC playbook》](https://claude.com/blog/the-ai-native-sdlc-playbook)完整看完以后，最强烈的感受并不来自 Plan、Design、Build、Test、Deploy、Maintain 这六个熟悉的阶段。官方给这篇文章标注的阅读时间只有五分钟，作者 Louis Claxton 也把它写成了一份可以照着实施的企业指南，可只要把文中的 Artifact、Trigger、Hook、Permission、Sandbox、Eval、Agent SDK 与 OpenTelemetry 重新连在一起，文章呈现出的形状就已经接近一套软件开发的运行系统。

Anthropic 在开头写了一句很直接的话：「Code is no longer the bottleneck」。Coding Agent 把实现速度压缩以后，过去围绕慢速编码建立的需求仪式、交接方式、审核队列和发布节奏仍然按照人的产出来运行。代码可以在几小时里出现，产品负责人、安全团队、QA、代码所有者和发布经理仍然只有原来的注意力，于是等待时间从 Build 向两侧移动，组织也开始为越来越多的例外、审核和授权付出成本。

这份 Playbook 真正值得看的地方，就在于 Anthropic 没有把答案停留在「让 Claude 多写一些代码」。它把需求表达、方案设计、实施计划、验证证据、PR 审核、生产授权、事故诊断和经验回流连成了一条由 Artifact 驱动的循环，并让 Claude 在每一段里读取状态、执行动作、留下证据，再等待下一道确定性的控制或人的批准。沿着这条线继续往下看，Claude Code 的边界也从编码工具扩展到了企业软件工作的运行层。

## 代码生成提速以后，软件团队真正紧缺的资源变成了可传递的判断

传统 SDLC 的很多做法都产生于一个共同前提：实现昂贵，返工也昂贵，因此组织要在动手之前尽量对齐，在交付之后逐层确认。PRD、估时、架构评审、安全审核和发布窗口都带有这个时代的痕迹。只要 Build 仍然以周或月为单位，这些流程即使缓慢，也能与实现速度保持大致相同的节拍。

Coding Agent 改变了其中一段的速度，却没有自动改变其他人的时间。Anthropic 在原文中用安全审核举例：安全团队的人数按照人工代码产出来配置，当 Agent 成倍增加 Diff 后，结果通常只有两种，审核队列越来越长，或者代码在审核不足的情况下进入生产。受监管的组织无法长期接受其中任何一种，因此安全规则、验证工具和授权方式都必须获得与 Agent 相匹配的吞吐量。

这也解释了为什么只统计「生成了多少代码」很容易产生错觉。软件系统的有效吞吐量更接近一组串联系统中最慢的一段，可以近似写成：

```text
有效吞吐量
≈ min(
  需求被澄清的速度,
  风险被判断的速度,
  结果被验证的速度,
  生产动作被授权的速度
)
```

当 Build 从数周收缩到数小时，计划、验证和授权便会突然显得很慢。Agent 继续并行也很难无限改善结果，Anthropic 在讲 Worktree 和并行 Session 时明确提醒，团队最终会碰到 review capacity 的上限。并行两三个 Session 可能有效，十几个 Session 同时提交工作，只会把等待从编码队列搬到人的注意力队列。

所以，这篇 Playbook 所处理的核心问题其实是「判断怎样被保存、传递、检查和复用」。代码只是 Artifact Chain 中的一段，真正决定系统能否持续运转的，是前一段留下的目标是否足够清楚，后一段拿到的证据是否足够可信，以及每一次越权风险是否都有一个无法被模型绕开的边界。

## Artifact Chain 把文档升级成了可以推动系统前进的状态对象

Anthropic 为六个阶段分别安排了 `intent.md`、`spec.md`、`plan.md`、代码与测试、PR 与审核结果、事故诊断与新的 `intent.md`。这些文件看起来仍然像文档，作用却已经发生变化。传统文档主要帮助人理解已经发生或准备发生的事情；这里的 Artifact 同时供人阅读、供 Agent 执行、供系统判断状态，并在被接受以后触发下一段工作。

原文给出的主线可以压缩成下面这张表：

| 阶段 | 进入这一段的触发 | 主要 Artifact | Agent 留下的证据 | 人的决定 |
| --- | --- | --- | --- | --- |
| Plan | 想法、问题、事故或工单 | `intent.md` | 问题、结果、影响范围、约束、未决问题 | 原始提出者与 Product Owner 确认含义和优先级 |
| Design | 被接受的 `intent.md` | `spec.md` | 完整方案、安全、品牌、合规与 UX 约束 | 判断方案是否真正解决原问题 |
| Build | 被接受的 `spec.md` | `plan.md`、代码、测试 | 文件范围、实施顺序、风险、构建结果 | 接受计划，并处理高风险选择 |
| Test | 已产生的实现 | 测试结果、截图差异、Eval 结果 | 工具链的原始输出 | 定义什么叫通过，并检查关键行为 |
| Deploy | 被接受的 PR | 审核意见、发布包、状态与回滚信息 | 一致的 Review Pass、分支检查、环境状态 | 判断风险是否可以进入下一环境 |
| Maintain | 阈值越界、定时扫描、频道消息或事故 | 诊断、PR、Runbook 结果、新的 `intent.md` | 指标恢复、操作记录、事故 Eval | 处理升级事项与生产授权 |

Artifact 在这里至少承担四个用途。它必须让人看懂当前系统为什么要做这件事，也必须让 Agent 获得足够明确的输入；它要保留版本和责任线索，还要让 Orchestrator 知道什么条件满足以后可以继续。Git commit chain 因而不再只是代码历史，它还可以成为意图、方案、计划、实施和事故之间的审计线索。

Anthropic 对旧系统也留出了现实空间。原文没有要求所有企业立刻把 Jira、ServiceNow 或内部工单系统搬进 Git，只要求团队明确哪一个系统继续担任 source of truth，并让 Artifact 通过稳定链接、同步或提交记录指向同一个事实版本。这个细节很重要，Artifact 驱动不要求「所有东西都写成 Markdown」。它要求状态可被引用、可被版本化、可被触发，底层载体可以继续存在于组织已经使用的系统里。

这里还要区分目标形态与起步方式。Anthropic 建议团队先用人工提示启动各阶段，等 Artifact、权限和 Gate 足够稳定以后，再让被接受的成果自动触发下一段。Playbook 给出的是一套运行协议与控制组合，并没有交付一个可以直接安装的统一状态机。本文把它概括成「软件开发的运行系统」，属于对这些组件组合后的结构判断。

![被接受的 Artifact 会触发下一段 Agent Run](/gallery/ai-native-sdlc/artifact-chain.png)

下面这个交互区域把原文的六个阶段拆成了同一套字段。点选任意阶段，可以看到触发器、Artifact、Agent 动作、人的批准和进入下一阶段所需的证据怎样一起变化。

<section class="sdlc-lab" data-sdlc-explorer aria-label="AI Native SDLC 阶段查看器">
  <div class="sdlc-lab__kicker">INTERACTIVE / ARTIFACT CHAIN</div>
  <div class="sdlc-tabs" role="tablist" aria-label="选择 SDLC 阶段">
    <button class="sdlc-tab" type="button" role="tab" aria-selected="true" data-stage="plan">Plan</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="design">Design</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="build">Build</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="test">Test</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="deploy">Deploy</button>
    <button class="sdlc-tab" type="button" role="tab" aria-selected="false" data-stage="maintain">Maintain</button>
  </div>
  <div class="sdlc-stage-head">
    <span class="sdlc-stage-index" data-stage-index>01</span>
    <span class="sdlc-stage-name" data-stage-name>Plan</span>
  </div>
  <div class="sdlc-stage-grid" role="tabpanel" aria-live="polite">
    <div class="sdlc-field">
      <span class="sdlc-field__label">触发器</span>
      <span class="sdlc-field__value" data-stage-field="trigger">想法、问题、工单或生产事故进入系统。</span>
    </div>
    <div class="sdlc-field">
      <span class="sdlc-field__label">主要 Artifact</span>
      <span class="sdlc-field__value" data-stage-field="artifact">intent.md</span>
    </div>
    <div class="sdlc-field">
      <span class="sdlc-field__label">Agent 的动作</span>
      <span class="sdlc-field__value" data-stage-field="agent">通过对话澄清问题、结果、影响范围、约束和未决问题。</span>
    </div>
    <div class="sdlc-field">
      <span class="sdlc-field__label">人的批准</span>
      <span class="sdlc-field__value" data-stage-field="human">提出者修正理解，Product Owner 决定是否进入 Design。</span>
    </div>
    <div class="sdlc-field">
      <span class="sdlc-field__label">进入下一段所需的证据</span>
      <span class="sdlc-field__value" data-stage-field="proof">意图已经被接受，关键约束与未决问题都被明确记录。</span>
    </div>
  </div>
  <p class="sdlc-stage-summary" data-stage-summary>Plan 的产出并不追求完整解决方案，它先保证系统正在解决同一个问题。</p>
</section>

## 一条完整的 Agent 运行链必须同时拥有触发、权限、证据和人的批准

把六个阶段放在一起以后，可以抽象出一条更通用的运行链：

<div class="runtime-line">
  <strong>一次可审计的 Agent Run</strong>
  <code>Trigger → Input Snapshot → Agent → Artifact → Policy Gate → Verification Evidence → Human Decision → Next Trigger</code>
</div>

Trigger 决定一次运行为什么开始，Input Snapshot 决定 Agent 当时看到了哪个版本的事实，Artifact 保存它做出的成果，Policy Gate 限制哪些动作可以继续，Verification Evidence 证明结果确实发生，Human Decision 处理价值判断和风险授权，Next Trigger 再把被接受的成果交给下一段。缺少其中任何一层，系统都容易退回到聊天记录里寻找上下文，或者依赖某个人记得上次发生了什么。

这也说明了聊天与 Artifact 的关系。聊天适合让人表达模糊目标、补充背景和纠正误解，它是一种很好的交互入口；长期状态仍然需要进入有身份、有版本、有父子关系的 Artifact 与 Run 记录。用户说过什么、Agent 为什么选择某个方案、调用了哪些工具、产生了哪些副作用、验证结果来自哪里，都应该能在离开聊天窗口以后继续被系统读取。

原文里的 `intent.md → spec.md → plan.md → diff → review → incident` 已经提供了这条链的骨架。沿着工程化方向再走一步，每个 Artifact 还需要稳定 ID、类型、状态、父 Artifact、所有者、策略版本、证据引用和下一触发条件。Markdown 可以继续作为人最容易阅读的投影，底层状态最好进入结构化记录，否则文件改名、复制、分叉或局部同步以后，系统很难判断自己拿到的究竟是哪一个事实版本。

人的批准也不应该平均分布在每个细节上。AI Native SDLC 的目标之一，是让机械检查由工具和 Agent 完成，把人的注意力集中到「目标是否正确」「风险是否可以接受」「生产动作是否授权」这些判断上。真正成熟的 Harness 会按照风险分层，低风险改动自动通过更多确定性检查，高风险改动收紧权限并增加独立验证，人的注意力由风险触发，而不再由每一行代码触发。

## Anthropic 把组织经验拆成了四种强度完全不同的控制

这篇 Playbook 里最容易被忽略的部分，是 Anthropic 对 `CLAUDE.md`、Skill、Hook、Permission、Sandbox 和 MCP 的分工非常清楚。它们都能影响 Agent 行为，约束强度却完全不同。

| 层 | 它回答的问题 | 控制性质 | 典型内容 |
| --- | --- | --- | --- |
| `CLAUDE.md` | 「这个项目是什么，我进入以后先知道什么」 | 版本化的项目上下文 | 构建命令、目录结构、约定、常见错误 |
| Skill | 「碰到这类任务时，组织希望怎样处理」 | 会被调用的建议性控制 | API 安全规范、品牌要求、UX 标准 |
| Hook 与 Permission | 「哪些动作必须执行，哪些动作禁止发生」 | 确定性的阻止、询问或强制 | 阻止改受保护目录、运行 formatter、拦截凭据 |
| Sandbox 与 Tool Gateway | 「Agent 实际能够接触什么系统」 | 文件、网络、身份和工具边界 | 短期令牌、网络策略、MCP allowlist、环境分级 |

`CLAUDE.md` 更像给新工程师准备的项目说明。Anthropic 建议它保持在一页以内，因为 Session 开始时 Claude 会读取全部内容，过期信息会直接消耗上下文。原文还给出一个很实用的判断：同一种错误被纠正两次，就应该考虑把它写入 `CLAUDE.md`，让下一次 Session 在开始工作之前就知道这条经验。

Skill 把组织经验变成可分发、可版本化、带触发条件的操作说明。政策负责人拥有 source of truth，工程师把它整理成 `SKILL.md`，在政策变化时由负责人审核。可它仍然属于 advisory control，Claude 大概率会按照它工作，Session 本身并没有一个物理机制保证每一次都遵守。

Hook 才进入确定性层。它可以在文件修改和 Shell 命令发生时阻止受保护路径被改写，可以在每次编辑后运行格式化和静态检查，也可以在 Diff 中出现凭据时直接终止动作。Permission 进一步提供 allow、ask、block，Sandbox 再限制文件系统、网络、进程和凭据。MCP 则把外部能力收敛成明确的工具面，部署、回滚、状态查询和数据库操作都可以按环境列入允许范围。

确定性还取决于控制被放在哪里。一个可以被开发者关闭的本地 Hook，只能算便利工具；组织级门禁需要 Managed Settings、CI、分支保护、GitHub Environment 或云端 IAM 在权威位置执行。配置文件出现在仓库里，也不能自动证明 required review 和生产权限已经生效，系统必须检查真实平台状态。

![组织上下文、建议性控制和确定性边界需要分层](/gallery/ai-native-sdlc/control-stack.png)

这个分层给所有 Agent 产品提供了一个很清楚的提醒：原则可以写进 Prompt，反复使用的做法可以写进 Skill，需要保证的规则必须进入模型之外的控制层。只要安全、合规和权限仍然依赖 Agent 自己记得遵守，系统就还没有形成真正的 Harness。

## Agent 只有拿出工具链产生的证据，才算完成了一次工作

Anthropic 很强调「写完」与「完成」之间的差别。执行 Agent 不能在修改代码以后直接向人报告任务结束，它必须自己运行 Build、Test 和 Lint，前端工作还需要打开浏览器、截图、比较，再根据真实画面继续调整。原文甚至提醒，UI 实现经历两到三轮视觉反馈很正常，因为第一次生成只提供了一个可以被观察的起点。

这条反馈回路发生在同一个任务上下文中：

```text
Implement
→ Run
→ Observe
→ Compare
→ Fix
→ Run again
```

Self Verification 能及时纠正机械错误，却仍然继承执行 Agent 已经形成的假设。它工作得越久，越容易把自己的解释当成事实。因此 Anthropic 又把 Verifier Agent 单独拿出来：最终检查可以启动一个新 Context，让另一个 Agent 面对实际代码、测试结果、截图和接受条件重新判断。一个负责推进，一个负责怀疑，两者共享 Artifact 和证据，不共享执行过程中的心理惯性。

证据的来源也被规定得很具体。真正有用的证据是 `make test` 的原始输出、构建日志、Lint 结果、截图差异、PR Check 和生产指标。Agent 在总结里写一句「已经验证」，无法构成同等证据。OpenTelemetry 可以把 Session Trace 送进组织的可观测系统，PR Check 保存工具链结果，代码所有者由此把注意力放在意图与风险上。

进入 Deploy 后，Claude 同时承担给 PR 做一致 Review Pass 和处理自己 PR 上评论的工作。分支保护把所有写入收敛到 PR，Agent Job 使用独立身份与短期、范围受限的令牌，流水线日志因此能够区分 Agent、触发运行的工程师和最终授权人。开发、Staging、生产各自拥有不同权限，Agent 可以在低风险环境里自主推进，到了生产门仍然只能准备发布、状态查询和回滚信息。

## Harness 的配置已经属于生产系统，因此也必须接受回归测试

Playbook 进一步提出 Continuous Evals，这一点比常见的 Prompt 调优讨论更重要。模型版本、Prompt、`CLAUDE.md`、Skill、Hook 和权限配置都会改变 Agent 在真实任务中的行为，所以它们应当像代码一样接受回归测试。

Anthropic 给出的起步方法很具体：从最近的真实工作里收集二十到五十个任务，为每个任务写出可以检查的接受条件，然后在 CI 中以无交互方式运行。修改模型、Prompt、`CLAUDE.md`、Skill 或 Hook 时，Eval Suite 重新执行；一项配置变化导致通过率下降，就不能在没有复核的情况下进入主分支。

更值得保留的是这条规则：每一次生产事故都应该变成新的 Eval Case。事故由负责团队整理成永久样本，以后再修改 Harness 时，系统必须证明旧问题没有回来。这样一来，生产环境不只是在消耗模型能力，它也在持续生产更贴近真实工作的评测数据。

![任务内反馈、独立验证和 Harness 回归测试构成三层证据](/gallery/ai-native-sdlc/feedback-evals.png)

二十到五十个任务只能作为起点。真正长期运行的 Eval 系统还要保存任务来源、环境快照、模型版本、工具版本、策略版本、随机性和失败轨迹，并检查样本是否仍然覆盖当前工作分布。随着模型变强，过去能够区分好坏的 Case 会失去作用，新工具和新权限也会引入新的失败方式。Eval 因此会成为一套持续维护的生产资产，它的价值往往比某一版 Prompt 更稳定。

## 维护阶段让这套方法从开发流程闭合成持续运行的系统

Maintain 是整篇文章里最接近 Agent Runtime 的部分。前五个阶段通常仍然由人发起，维护阶段开始允许 Trigger 在没有人的调用路径时启动 Claude。阈值越界、工单、频道消息或定时任务都可以触发一次无交互运行，Claude 读取现场、做诊断、沿批准过的路线行动，再把发现写成新的 `intent.md`，重新进入 Plan、Design、Build、Test 和 Deploy。

Anthropic 在这里刻意把检测层留给确定性程序。一个版本化、带单元测试的脚本观察稳定指标，模型不参与判断是否越界。原文用控制带举例：在 1σ 时只记录，在 2σ 时调用 Claude 做只读诊断，在 3σ 时才允许 Claude 行动，而且行动只能表现为打开一个进入审核门的 PR，或者触发预先批准的 Runbook。生产发布仍然要经过命名授权人，回滚路径也必须在 Staging 中反复演练。

下面的滑块可以直观看出自治等级提高时，Agent 获得了什么能力，又有哪些边界始终没有消失。

<section class="sdlc-lab" data-autonomy-lab aria-label="维护阶段自治等级查看器">
  <div class="sdlc-lab__kicker">INTERACTIVE / CONTROL BANDS</div>
  <div class="autonomy-lab__top">
    <span>调整生产异常的响应等级</span>
    <output class="autonomy-lab__level" for="autonomy-range" data-autonomy-level>2σ / 只读诊断</output>
  </div>
  <input class="autonomy-range" id="autonomy-range" type="range" min="1" max="3" step="1" value="2" data-autonomy-range>
  <div class="autonomy-scale" aria-hidden="true">
    <span>1σ</span>
    <span>2σ</span>
    <span>3σ</span>
  </div>
  <div class="autonomy-grid" aria-live="polite">
    <div class="autonomy-card">
      <strong>Agent 可以做</strong>
      <span data-autonomy-field="allowed">读取日志、指标和代码，形成诊断并生成新的 intent.md。</span>
    </div>
    <div class="autonomy-card">
      <strong>Agent 仍然不能做</strong>
      <span data-autonomy-field="blocked">修改生产系统、直接合并 PR、使用生产凭据。</span>
    </div>
    <div class="autonomy-card">
      <strong>人负责的判断</strong>
      <span data-autonomy-field="human">判断诊断是否可信，并决定是否升级到允许行动的等级。</span>
    </div>
  </div>
</section>

这种设计解决了一个经常被混在一起的问题：检测异常、解释异常、执行动作和授权生产动作属于四种不同权力。确定性脚本决定什么时候启动，Agent 在已有权限里解释和准备，人处理升级与授权，Hook、分支保护和环境权限保证任何参与者都不能跳过生产门。

`1σ / 2σ / 3σ` 只是原文用于说明分级自治的示例。它适合具有稳定滚动基线的连续指标，权限越界、支付错误、凭据泄露这类离散硬错误更适合直接使用确定性规则。真正需要复用的是「检测保持确定性、自治随置信度和风险分级、行动只能走预先批准的路径」这组原则。

Claude Tag 在 Slack 事故频道里的位置也可以从这个角度理解。它以自己的身份进入频道，诊断、人的授权、修复和指标恢复都留在同一条线程里，频道因而同时承担协作界面、审计记录和后续事故的记忆。小而明确的问题可以形成 PR，范围较大的问题会被写成 `intent.md`，重新进入完整循环。

## Claude Code 的产品边界正在扩展到企业工作运行层

单看 Playbook 里的任何一个组件，技术上都很熟悉。Git 保存版本，CI 运行测试，Policy Engine 限制动作，Sandbox 隔离执行，ChatOps 处理事故，监控系统产生告警。Anthropic 的变化来自组合方式：Claude 开始贯穿这些系统，前一个 Artifact 被接受以后可以触发下一段 Run，人的注意力被集中到少数风险门，运行轨迹再回流到 `CLAUDE.md`、Skill 和 Eval。

文章依赖的产品与能力已经覆盖了整条链。Claude 与 Cowork 帮助非开发人员表达 Intent，Claude Design 进入方案阶段，Claude Code 负责计划、实施和验证；`CLAUDE.md`、Skill、Subagent、Worktree、Hook、Permission 与 Sandbox 构成 Harness；MCP 连接外部系统，Code Review 与 Claude Code Action 进入 PR 和 CI，Agent SDK 支持长期服务，Claude Tag 进入事故频道，OpenTelemetry 保存运行记录。

所以 Anthropic 在企业市场争夺的已经不只是 IDE 里的编码时间。谁定义 Artifact 的格式、策略的分发方式、工具的入口、Eval 的样本、运行身份和审计记录，谁就有机会成为软件公司的工作运行层。模型可以被替换，工作方式一旦沉淀进 Artifact Graph、Policy、Skill、Eval Dataset 和 Run History，迁移成本会明显高于更换一个聊天模型。

这里也存在一个值得警惕的集中趋势。企业为了获得统一的权限、评测和审计，可能会把越来越多工作状态交给同一套 Harness。平台随后掌握的已经包含组织怎样定义问题、怎样批准风险、怎样处理事故，以及哪些错误在历史上发生过。未来真正需要被企业认真评估的锁定效应，很可能来自这些状态与控制面，而不只来自模型 API。

## 把软件领域的名词换掉以后，Personal Harness 的骨架已经出现

把程序开发领域的名称换成通用工作语言以后，Anthropic 的结构几乎可以直接映射到 Personal Harness：

| Anthropic SDLC | Personal Harness |
| --- | --- |
| `intent.md` | Goal / Intent |
| `spec.md` | Workspace Spec |
| `plan.md` | Task Graph |
| `CLAUDE.md` | Workspace Context |
| Skill | 可复用的工作方法 |
| Subagent | 角色化 Agent |
| Hook / Permission | Policy 与授权规则 |
| MCP | Tool Gateway |
| Worktree | Run Isolation |
| PR | Artifact Review |
| Test / Eval | Verifier 与回归评测 |
| Git History | Run History 与 Audit Log |
| Incident Trigger | Event / Schedule / Threshold |

例如用户提出「更新下一轮融资材料」，聊天只负责把模糊请求变成可确认的 Intent。系统随后要明确投资阶段、目标受众、数据截止日期、保密约束和需要更新的材料；Workspace Spec 定义市场、竞品、财务模型和 Deck 的交付标准；Task Graph 再把研究、财务和演示稿分给不同 Agent。

真正的产出会落到 `research.md`、`model.xlsx`、`deck.pptx` 和数据来源映射里。Verifier 检查引用是否仍然有效，财务数字能否互相对上，Deck 中的表格是否来自同一版模型，页面渲染有没有裁切，最终文件是否符合受众。用户批准以后，系统可以把投资人常见问题和本轮修改经验写回 Skill，并在下个月由日期或数据变化触发新一轮检查。

![Personal Harness 把一次聊天变成可持续运行的工作状态](/gallery/ai-native-sdlc/personal-harness.png)

这比「桌面里放一个聊天框」多出了几层关键结构。AI Native Desktop 需要知道当前 Goal 对应哪些 Workspace，哪些 Run 正在执行，哪些 Artifact 已经被接受，哪些权限仍然有效，哪一份证据支持最终结果，以及下一次什么时候应该重新检查。聊天仍然很重要，它负责让人自然地表达与纠正；桌面真正长期保存的，应当是 Artifact、Run、Policy、Evidence 和 Trigger。

沿这个方向设计，一个通用 Personal Harness 至少会出现八个部分：

| 运行部分 | 负责的事情 |
| --- | --- |
| Intent Store | 保存目标、约束、开放问题与人的确认 |
| Artifact Graph | 管理成果之间的版本、依赖、来源和状态 |
| Run Orchestrator | 根据 Trigger 启动任务、处理重试、暂停与继续 |
| Context / Skill Registry | 分发工作区知识和可复用方法 |
| Policy Engine | 决定允许、询问、阻止与环境分级 |
| Tool Gateway / Sandbox | 控制文件、应用、网络、身份与外部服务 |
| Verifier / Eval Service | 产生任务证据，并测试 Harness 变化 |
| Audit / Telemetry | 保存模型、工具调用、副作用、批准和结果 |

这几层合起来以后，Agent 才从「会替用户执行一个任务」变成「能够承载一套工作方法」。用户也不需要记住上一次对话停在哪里，因为系统的状态已经存在于可读取的工作对象中。

## 这份 Playbook 真正留下的工程难题集中在状态、人的注意力和评测数据

Anthropic 提供了一个很完整的方向，真正落地时仍然有几处需要继续工程化。

### Markdown 适合作为人类视图，底层还需要稳定的状态模型

`intent.md`、`spec.md` 和 `plan.md` 很容易被人审核，也方便 Agent 读取，可大型系统不能只凭文件名判断生命周期。一个 Artifact 需要稳定 ID、Schema Version、状态机、父子关系、Owner、Policy Version、Evidence Link 和 Trigger Contract。编辑文档与改变状态也应该分开，否则一次普通措辞修改可能意外触发新的 Run。

Artifact Graph 还要处理分支与合并。两个 Agent 从同一份 Spec 开始工作，随后各自产生计划和实现，系统需要知道它们是竞争方案、并行子任务，还是重复运行。只靠聊天历史很难可靠回答这些问题，事件日志和结构化元数据会成为必要基础。

### 人的注意力需要像计算资源一样被安排

Playbook 把人的工作上移到意图和风险判断，这是正确方向，同时也会让高质量审核变成更稀缺的资源。并行 Agent 越多，等待审核的 Artifact 也越多。系统需要风险评分、证据摘要、变更聚类、Code Owner 路由和注意力预算，帮助人先看最可能改变结果的地方。

Human Gate 还需要明确拒绝、退回、部分接受和暂缓的语义。一次拒绝究竟回到哪一个 Artifact，原有 Run 是否失效，已经产生的副作用怎样撤销，都应该由状态机处理，不能只靠评论区里的自然语言猜测。

### Eval Dataset 会成为 Harness 最有价值也最容易失真的资产

真实任务和生产事故组成的 Eval 很有价值，它也会受到采样偏差影响。团队容易保存容易描述的错误，遗漏那些没有明显报警、却长期降低质量的问题；当工作类型变化时，旧样本还可能继续给出漂亮通过率，却已经无法代表生产。

因此 Eval 需要覆盖任务分布、风险等级、工具组合和失败类型，还要记录模型与环境的随机性。某个 Case 偶尔通过一次，不足以证明行为已经稳定。对高风险任务，系统可能需要多次运行、对抗性 Verifier、环境回放和明确的失败预算。

### 自动循环必须拥有停止条件、预算和可重放的回滚

Maintain 让系统持续运行，也带来重复触发和动作放大的风险。一个指标抖动可能连续生成多个 Intent，同一个 Runbook 可能在状态尚未收敛时被再次调用，两个 Agent 也可能同时处理同一事故。Trigger 需要去重，动作需要幂等键，循环需要最大步数、成本预算、超时、Circuit Breaker 和人工接管点。

Anthropic 已经强调回滚应当成为最常演练的路径。继续往下推，回滚本身也要产生证据，证明系统确实恢复到已知状态，并把失败 Run、授权记录和恢复结果一起保存。只有这样，长期运行才不会以牺牲可解释性为代价。

## Agent 正在从任务执行器变成承载工作方式的运行环境

这份 Playbook 采用的组件大多存在了很多年。它真正带来的变化，是把这些组件放进同一条由 Agent 贯穿的工作循环里：目标被写成 Artifact，Artifact 被接受后触发 Run，Policy 限制动作，工具链产生证据，Verifier 检查结果，人处理价值判断和生产授权，事故再回到新的 Intent 与 Eval。

从这个角度看，未来 Agent 产品最难复制的部分可能并不在 Prompt。更稳定的价值会积累在组织或个人长期形成的 Artifact Graph、Skill、Policy、Eval Dataset、工具权限、运行轨迹和失败历史里。它们共同回答一个比「模型会不会做」更重要的问题：这套系统是否知道为什么开始、允许做到哪里、怎样证明完成，以及发生错误以后如何把经验留给下一次。

Anthropic 在原文结尾写道：「The loop keeps running. Human judgement stays above it.」这句话也给 AI Native Desktop 和 Personal Harness 划出了一条清楚的边界。循环可以持续运行，人的判断权仍然要被设计成运行系统的一部分。

## 这篇文章主要依据 Anthropic 的原文与官方文档

<div class="article-source-note">

1. [The AI-Native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)
2. [Claude Code Skills](https://code.claude.com/docs/en/skills)
3. [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
4. [Claude Code Sandboxing](https://code.claude.com/docs/en/sandboxing)
5. [Managed MCP](https://code.claude.com/docs/en/managed-mcp)
6. [Claude Code Monitoring with OpenTelemetry](https://code.claude.com/docs/en/monitoring-usage)

资料快照：2026 年 8 月 29 日。

</div>

<script>
(function () {
  const explorer = document.querySelector("[data-sdlc-explorer]");
  if (explorer) {
    const stages = {
      plan: {
        index: "01",
        name: "Plan",
        trigger: "想法、问题、工单或生产事故进入系统。",
        artifact: "intent.md",
        agent: "通过对话澄清问题、结果、影响范围、约束和未决问题。",
        human: "提出者修正理解，Product Owner 决定是否进入 Design。",
        proof: "意图已经被接受，关键约束与未决问题都被明确记录。",
        summary: "Plan 的产出并不追求完整解决方案，它先保证系统正在解决同一个问题。"
      },
      design: {
        index: "02",
        name: "Design",
        trigger: "被接受的 intent.md 成为方案工作的输入。",
        artifact: "spec.md",
        agent: "结合安全、品牌、合规、架构与 UX Skill 形成完整方案。",
        human: "判断方案是否解决原问题，并处理价值取舍与关键假设。",
        proof: "方案覆盖主要路径、约束、风险与接受条件。",
        summary: "Design 把意图变成可实施的边界，同时保留人对产品方向的判断。"
      },
      build: {
        index: "03",
        name: "Build",
        trigger: "被接受的 spec.md 触发代码库探索与计划。",
        artifact: "plan.md、代码、测试",
        agent: "识别文件、顺序、风险和验证方法，接受计划后实施并自检。",
        human: "批准计划与高风险选择，不需要逐行参与机械执行。",
        proof: "构建、测试、Lint 和必要的截图结果来自真实工具链。",
        summary: "Build 的完成条件包含实施与验证，单纯产生 Diff 仍然只是中间状态。"
      },
      test: {
        index: "04",
        name: "Test",
        trigger: "实现已经产生，接受条件与 Harness 配置需要被验证。",
        artifact: "测试结果、截图差异、Verifier 结论、Eval 结果",
        agent: "循环执行、观察、修复，并由新 Context 的 Verifier 做最终检查。",
        human: "定义通过标准，检查业务意图和工具难以覆盖的风险。",
        proof: "原始日志、Check Run、截图与 Eval Pass Rate 可被复核。",
        summary: "Test 同时验证任务结果和 Agent 配置，生产事故会成为永久回归样本。"
      },
      deploy: {
        index: "05",
        name: "Deploy",
        trigger: "通过验证的 PR 进入统一审核与环境分级。",
        artifact: "Review Findings、Release Package、Status、Rollback Evidence",
        agent: "执行一致的 Review Pass，处理评论，并准备部署、状态查询和回滚。",
        human: "代码所有者与发布经理判断风险，授权生产动作。",
        proof: "分支保护、环境权限、短期令牌和发布 Hook 都已满足。",
        summary: "Agent 可以一直行动到生产门前，生产门本身由确定性控制和命名授权人负责。"
      },
      maintain: {
        index: "06",
        name: "Maintain",
        trigger: "控制带越界、定时扫描、工单或频道消息启动无交互 Run。",
        artifact: "诊断、PR、Runbook 结果、新的 intent.md 与 Incident Eval",
        agent: "读取现场，按自治等级诊断或行动，并验证指标是否恢复。",
        human: "处理升级、生产授权和最终责任。",
        proof: "指标回到基线，操作记录完整，事故被写入 Eval Suite。",
        summary: "Maintain 关闭了循环，让生产环境持续产生新的 Intent、修复与评测数据。"
      }
    };

    const tabs = Array.from(explorer.querySelectorAll("[data-stage]"));
    const indexNode = explorer.querySelector("[data-stage-index]");
    const nameNode = explorer.querySelector("[data-stage-name]");
    const summaryNode = explorer.querySelector("[data-stage-summary]");
    const fieldNodes = Array.from(explorer.querySelectorAll("[data-stage-field]"));

    function renderStage(key, focusTab) {
      const stage = stages[key];
      if (!stage) return;

      tabs.forEach(function (tab) {
        const selected = tab.dataset.stage === key;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focusTab) tab.focus();
      });

      indexNode.textContent = stage.index;
      nameNode.textContent = stage.name;
      summaryNode.textContent = stage.summary;
      fieldNodes.forEach(function (node) {
        node.textContent = stage[node.dataset.stageField];
      });
    }

    tabs.forEach(function (tab, tabIndex) {
      tab.addEventListener("click", function () {
        renderStage(tab.dataset.stage, false);
      });

      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (tabIndex + direction + tabs.length) % tabs.length;
        renderStage(tabs[nextIndex].dataset.stage, true);
      });
    });
  }

  const autonomyLab = document.querySelector("[data-autonomy-lab]");
  if (autonomyLab) {
    const levels = {
      1: {
        label: "1σ / 只记录",
        allowed: "没有调用 Agent。确定性脚本记录异常、时间、指标和基线。",
        blocked: "读取业务数据、形成诊断、修改任何系统或触发 Runbook。",
        human: "观察趋势，决定阈值是否合理，必要时调整检测规则。"
      },
      2: {
        label: "2σ / 只读诊断",
        allowed: "读取日志、指标和代码，形成诊断并生成新的 intent.md。",
        blocked: "修改生产系统、直接合并 PR、使用生产凭据。",
        human: "判断诊断是否可信，并决定是否升级到允许行动的等级。"
      },
      3: {
        label: "3σ / 受限行动",
        allowed: "打开进入审核门的 PR，或调用预先批准且可回滚的 Runbook。",
        blocked: "绕过分支保护、越过生产 Hook、扩大工具权限或自行授权发布。",
        human: "批准生产动作，处理超出 Runbook 的事项，并承担最终责任。"
      }
    };

    const range = autonomyLab.querySelector("[data-autonomy-range]");
    const levelNode = autonomyLab.querySelector("[data-autonomy-level]");
    const fields = Array.from(autonomyLab.querySelectorAll("[data-autonomy-field]"));

    function renderAutonomy() {
      const level = levels[range.value];
      levelNode.textContent = level.label;
      fields.forEach(function (node) {
        node.textContent = level[node.dataset.autonomyField];
      });
    }

    range.addEventListener("input", renderAutonomy);
    renderAutonomy();
  }
})();
</script>
