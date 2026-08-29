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
description: "用餐厅、汽车和错题本几个日常例子，讲清 Anthropic AI-Native SDLC Playbook，以及 Agent 为什么开始进入软件公司的工作运行层。"
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
  line-height: 1.94;
  font-size: 1.01rem;
}

.terminal-article .terminal-content p {
  margin: 0 0 1.42rem;
}

.terminal-article .terminal-content h2 {
  margin-top: 3.25rem;
  margin-bottom: 1.15rem;
}

.terminal-article .terminal-content img {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.article-lead {
  margin: 0 0 2rem;
  border-left: 3px solid var(--terminal-green);
  padding: 0.15rem 0 0.15rem 1rem;
  color: var(--terminal-muted);
  font-size: 1.06rem;
}

.plain-note {
  margin: 1.6rem 0 1.9rem;
  border: 1px solid var(--terminal-line);
  border-radius: 7px;
  padding: 0.9rem 1rem;
  background: var(--terminal-soft-bg);
}

.plain-note strong {
  color: var(--terminal-green);
}

.plain-note p {
  margin: 0.35rem 0 0 !important;
}

.stage-explorer {
  margin: 1.9rem 0 2.2rem;
  border: 1px solid var(--terminal-line-bright);
  border-radius: 8px;
  padding: 1rem;
  background: var(--terminal-soft-bg);
}

.stage-explorer__label {
  margin-bottom: 0.8rem;
  color: var(--terminal-cyan);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.stage-tabs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.42rem;
  margin-bottom: 1rem;
}

.stage-tab {
  min-width: 0;
  border: 1px solid var(--terminal-line);
  border-radius: 5px;
  padding: 0.52rem 0.3rem;
  background: var(--terminal-panel);
  color: var(--terminal-muted);
  cursor: pointer;
  font: inherit;
  font-size: 0.82rem;
}

.stage-tab[aria-selected="true"] {
  border-color: var(--terminal-green);
  background: var(--terminal-green);
  color: var(--terminal-active-text);
  font-weight: 700;
}

.stage-answer {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.stage-answer > div {
  border: 1px solid var(--terminal-line);
  border-radius: 6px;
  padding: 0.8rem;
  background: var(--terminal-panel);
}

.stage-answer b {
  display: block;
  margin-bottom: 0.25rem;
  color: var(--terminal-green);
  font-size: 0.8rem;
}

.engineer-note {
  margin: 2rem 0;
  overflow: hidden;
  border: 1px solid var(--terminal-line);
  border-radius: 7px;
  background: var(--terminal-soft-bg);
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
  padding: 0.95rem 1rem 0.2rem;
}

.engineer-note__body p {
  margin-top: 0 !important;
}

.article-source-note {
  margin-top: 3rem;
  border-top: 1px solid var(--terminal-line);
  padding-top: 1rem;
  color: var(--terminal-muted);
  font-size: 0.9rem;
}

@media (max-width: 760px) {
  .stage-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .stage-answer {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

<div class="article-lead">

想象一家餐厅突然来了十个出菜极快的厨师。炒菜从十分钟缩到一分钟，餐厅却没有因此快十倍。顾客还在排队点单，服务员还要确认忌口，传菜员还要核对桌号，经理还要处理投诉。厨房变快以后，拥堵只是移动到了别处。

</div>

Anthropic 在 2026 年 8 月 21 日发布的[《The AI-Native SDLC playbook》](https://claude.com/blog/the-ai-native-sdlc-playbook)，讨论的正是软件行业遇到的同一件事。

SDLC 是「软件开发生命周期」的英文缩写。它指一件软件从提出想法、设计方案、编写代码、测试、上线到长期维护的整段过程。

Coding Agent 把「编写代码」这一段大幅加快，需求澄清、方案判断、测试、审核和发布仍然按照人的速度进行。Anthropic 用一句话概括了变化：

> Code is no longer the bottleneck.

代码已经很快了。真正影响团队速度的，开始变成目标能否说清楚，结果能否被验证，风险能否被及时判断。

这也是我读完这份 Playbook 后最重要的结论：Anthropic 正在尝试改造代码周围的整套工作运行方式。

## 写代码变快以后，团队更容易卡在理解、审核和验证上

过去，工程师可能需要两周完成一个功能。产品、设计、安全和测试团队在这两周里有时间继续讨论，也有时间准备审核。

现在，Agent 可能在几个小时里读完代码库、修改文件、补测试并提交 PR。人的注意力没有同时增加，于是等待发生在实现前后。

这仍然像刚才那家餐厅。厨师一分钟出菜，服务员却来不及确认桌号，验菜的人也来不及检查过敏原。继续增加厨师，只会让出餐口堆满盘子。

<div class="plain-note">
  <strong>这份 Playbook 先解决一个很朴素的问题</strong>
  <p>怎样让目标、方案、执行结果和审核意见顺利传到下一位参与者手里，同时减少误解和重复确认。</p>
</div>

Anthropic 的答案，是让每一段工作都留下一个可以继续使用的成果。这个成果既给人看，也给 Agent 读，还能告诉系统什么时候可以进入下一段。

## Artifact 让交接不再只靠聊天记录和人的记忆

Artifact 常被翻译成「工件」。这个词有些生硬，可以先把它想成餐厅里的订单。

顾客说「不要花生，少放盐」。服务员把要求写进订单，厨师照单做菜，出餐人员照单核对。菜出了问题，经理也能沿着订单查到哪一步丢了信息。

软件里的 Artifact 承担相似作用。

```text
intent.md      先写清楚要解决什么问题
spec.md        把想法变成可以讨论的方案
plan.md        把方案变成实施顺序和检查方法
代码与测试      保存实际改动和验证结果
PR 与发布记录   保存审核、授权和上线状态
事故记录        把生产里的问题带回下一轮
```

Anthropic 还提出，成果被接受以后，可以触发下一段工作。被确认的 `intent.md` 启动设计，被批准的 `spec.md` 启动实施计划，合并后的 PR 启动发布，生产事故又生成新的 `intent.md`。

![Artifact 像一张会继续往下传的订单](/gallery/ai-native-sdlc/artifact-chain.png)

<section class="stage-explorer" data-stage-explorer aria-label="AI Native SDLC 六个阶段查看器">
  <div class="stage-explorer__label">点一个阶段，看它回答什么问题</div>
  <div class="stage-tabs" role="tablist" aria-label="选择阶段">
    <button class="stage-tab" type="button" role="tab" aria-selected="true" data-stage="plan">Plan</button>
    <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="design">Design</button>
    <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="build">Build</button>
    <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="test">Test</button>
    <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="deploy">Deploy</button>
    <button class="stage-tab" type="button" role="tab" aria-selected="false" data-stage="maintain">Maintain</button>
  </div>
  <div class="stage-answer" role="tabpanel" aria-live="polite">
    <div>
      <b>这一段回答</b>
      <span data-stage-question>我们究竟要解决什么问题？</span>
    </div>
    <div>
      <b>留给下一段</b>
      <span data-stage-output>一份被确认的 intent.md</span>
    </div>
  </div>
</section>

自动触发需要慢慢建立。Anthropic 建议团队先由人启动各个阶段，等 Artifact、权限和验收标准稳定以后，再逐步让系统自动前进。

这个细节很关键。AI Native SDLC 先是一套清楚的交接规则，之后才可能成为自动运行的状态机。

## Agent 需要说明书，也需要门锁和刹车

很多团队会把所有规则都写进 Prompt，希望模型记住并遵守。这个做法像对司机说「请安全驾驶」。它有帮助，仍然代替不了地图、红绿灯、安全带和刹车。

Anthropic 把这些东西分成了几层。

`CLAUDE.md` 像项目地图。它告诉 Agent 代码库怎样组织、常用命令是什么、团队有哪些约定。内容需要短而准确，因为每次开始工作时都要读取。

Skill 像经过整理的驾驶经验。它保存 API 设计方法、安全规范、品牌要求和常用步骤。Agent 遇到相应任务时，可以加载这套方法。

Hook 和 Permission 更接近红绿灯与刹车。它们在命令执行或文件修改时检查动作，决定允许、询问还是阻止。必须每次都成立的规则，应该放在这里。

Sandbox 像封闭练习场。它限制 Agent 能看到的文件、网络、进程和凭据。MCP 则像标准插座，让 Agent 连接 GitHub、工单、数据库和其他工具。插座负责连接，权限仍然由运行环境控制。

![Harness 把说明书、工具和真正生效的边界放在一起](/gallery/ai-native-sdlc/control-stack.png)

这里最值得记住的区分很简单：

Skill 告诉 Agent「怎样做更合适」。

Hook、Permission 和 Sandbox 决定「哪些事情可以发生」。

当 Agent 获得更强的执行能力，这些边界会比一段写得很长的 Prompt 更重要。

## 「已经完成」需要由真实结果来证明

厨师把菜放进锅里以后，不能凭感觉宣布完成。他要尝味道、看火候，发现问题以后继续调整。

Agent 也需要同样的回路：

```text
执行
→ 看见结果
→ 对照要求
→ 修正
→ 再执行
```

后端任务可以运行测试和构建。界面任务可以打开浏览器、截图并比较。数据任务可以重新计算总数、抽样检查明细。判断依据应当来自真实工具。

Anthropic 还把两种检查分开。

Self Verification 是执行者边做边检查，适合发现机械错误。Verifier Agent 使用新的上下文重新查看目标、代码和证据。一个负责推进，一个负责挑错。

![任务内反馈、独立检查和回归题库组成三层验证](/gallery/ai-native-sdlc/feedback-evals.png)

Playbook 进一步提出 Continuous Evals，也就是持续评测。模型、Prompt、`CLAUDE.md`、Skill、Hook 和权限发生变化时，Agent 的行为也可能变化，所以这些配置需要像代码一样跑回归测试。

原文建议先从最近的真实工作中收集二十到五十个任务，为每个任务写出可以检查的结果。每次生产事故也应该变成新的测试题。

可以把它想成驾校的错题本。学员在某个路口犯过错，教练就把这个场景留下来。以后更换教材、教练或训练方法时，这道题仍然要重新通过。

通过率也会骗人。旧题目可能已经无法代表今天的工作，所以 Eval 需要不断加入新任务，也需要删除失去区分能力的题目。

## 维护阶段让一次开发变成持续运行的循环

前面的阶段主要处理「怎样把功能做出来」。Maintain 处理的是「功能上线以后发生了什么」。

家里的恒温器可以帮助理解这一段。

传感器负责判断温度是否越过阈值，这是一段确定性的程序。AI 被叫醒以后，可以分析门窗是否打开、设备是否故障、房间里是否突然多了人。

涉及关闭设备、修改生产系统或发布代码时，还要经过权限规则和人的批准。

Anthropic 用 1σ、2σ、3σ 展示三档自治。这里的统计符号可以先忽略，把它理解成轻微异常、中等异常和严重异常即可：

```text
轻微异常    只记录
中等异常    允许 Agent 读取现场并给出诊断
严重异常    允许走预先批准的动作路径，生产授权仍由人完成
```

这个设计把四种权力分开了。程序决定什么时候报警，Agent 负责解释，人决定是否接受风险，权限系统保证任何参与者都不能跳过生产门。

## Claude Code 正在进入软件公司的工作运行层

单独看这些组件，它们都很熟悉。Git 保存版本，CI 运行测试，监控系统产生告警，权限系统限制动作。

变化来自组合方式。

Claude 开始从 Intent 一直参与到设计、实现、验证、审核和事故处理。前一个 Artifact 被接受以后，可以启动下一次 Run。每次 Run 又会留下证据、经验和新的评测样本。

这使 Claude Code 的竞争范围超出了「谁写代码更快」。

谁定义 Artifact 的格式、工具的入口、权限的分发、Eval 的题库和运行历史，谁就更接近团队每天工作的基础层。模型可以更换，长期形成的工作状态、规则和失败经验更难搬走。

## 把软件领域的名字换掉，Personal Harness 也就出现了

这套结构可以用于很多非开发任务。

例如用户说：「帮我更新下一轮融资材料。」

聊天先把目标问清楚：材料给谁看，数据截止到哪一天，哪些数字需要保密，最后要交付哪些文件。

随后，系统把工作拆成市场调研、财务模型和演示稿。调研进入 `research.md`，数字进入 `model.xlsx`，页面进入 `deck.pptx`。

Verifier 检查引用是否有效，数字能否互相对上，页面有没有裁切。用户确认以后，系统保存这次经验。下个月，日期或市场数据变化又可以触发新的检查。

![Personal Harness 把一次聊天变成能够继续运行的工作](/gallery/ai-native-sdlc/personal-harness.png)

这里可以得到一组很简单的对应关系：

```text
聊天       负责表达目标和纠正误解
Artifact   负责保存长期状态
Run        负责执行一次具体工作
Policy     负责限制权限、预算和风险
Evidence   负责证明结果真的发生过
人         负责价值判断和最终授权
```

有了这些层，Agent 才能承载一套持续使用的工作方法。用户也不必依靠聊天记录记住上一次做到哪里。

<details class="engineer-note">
  <summary>给资深工程师的一页补充</summary>
  <div class="engineer-note__body">
    <p>长期运行时，Artifact 需要稳定 ID、父子关系、状态、所有者、策略版本和证据引用。Markdown 适合阅读，底层仍然需要结构化状态和明确的 source of truth。</p>
    <p>自动循环需要去重、幂等键、最大步数、超时、成本预算、熔断和人工接管点。回滚也要产生证据，证明系统确实恢复到了已知状态。</p>
    <p>本地 Hook 和提示词无法替代分支保护、云端 IAM、短期凭据、环境审批和网络策略。高风险任务还需要独立 Verifier、环境回放和多次运行。</p>
    <p>Eval Dataset 会受到样本偏差和任务漂移影响。通过率只有在题目仍然代表生产任务时才有意义。</p>
  </div>
</details>

## 真正重要的是让工作留下可以继续的状态

这份 Playbook 没有发明 Git、测试、权限或监控。它把这些已有组件连成了一条由 Agent 参与的工作循环。

目标被写进 Artifact，Agent 在权限范围内执行，工具产生证据，人处理关键判断，生产事故再回到新的目标和新的 Eval。

Anthropic 在结尾写道：

> The loop keeps running. Human judgement stays above it.

循环可以持续运行，人的判断仍然属于系统本身。

这也是 AI Native Desktop 和 Personal Harness 最重要的边界。Agent 可以承担更多执行工作，系统仍然要清楚地保存目标、限制动作、证明结果，并为人留下随时接管的位置。

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
  const explorer = document.querySelector("[data-stage-explorer]");
  if (!explorer) return;

  const stages = {
    plan: {
      question: "我们究竟要解决什么问题？",
      output: "一份被确认的 intent.md"
    },
    design: {
      question: "准备用什么方案解决？",
      output: "一份被接受的 spec.md"
    },
    build: {
      question: "按什么顺序修改，怎样自查？",
      output: "plan.md、代码和初步测试"
    },
    test: {
      question: "真实结果是否满足要求？",
      output: "测试、截图和评测证据"
    },
    deploy: {
      question: "风险能否进入下一个环境？",
      output: "PR、发布记录和回滚信息"
    },
    maintain: {
      question: "生产里发生了什么，怎样回到下一轮？",
      output: "诊断、事故记录和新的 intent.md"
    }
  };

  const tabs = Array.from(explorer.querySelectorAll("[data-stage]"));
  const questionNode = explorer.querySelector("[data-stage-question]");
  const outputNode = explorer.querySelector("[data-stage-output]");

  function render(key, focus) {
    const stage = stages[key];
    if (!stage) return;

    tabs.forEach(function (tab) {
      const selected = tab.dataset.stage === key;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });

    questionNode.textContent = stage.question;
    outputNode.textContent = stage.output;
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      render(tab.dataset.stage, false);
    });

    tab.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + step + tabs.length) % tabs.length;
      render(tabs[next].dataset.stage, true);
    });
  });
})();
</script>
