---
title: "代码变快以后，软件开发真正要升级的是运行系统"
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
featured_image: /gallery/ai-native-sdlc/cover-whiteboard.svg
description: "从 AI 编程提速后的新瓶颈出发，分析 Artifact、Harness、验证回路和 Personal Harness，哪些值得借鉴，哪些问题仍然没有解决。"
---

<style>
.terminal-article .article-cover img,
.terminal-article .terminal-content img {
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
  border: 1px solid var(--terminal-line);
  border-radius: 10px;
  background: #fff;
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

最近我认真看了一遍 Anthropic 对 AI-Native SDLC 的描述。它提供了一个很好的观察窗口，但行业远没有形成统一答案。Git、CI、测试、权限、沙盒和监控都已经存在多年，真正值得讨论的是，当 Agent 把这些东西串在一起以后，软件团队的工作方式会发生什么变化。

下面是一篇分析和分享。我更关心其中哪些结构值得借鉴，哪些内容只是对旧方法的重新组合，以及还有哪些问题没有被解决。

SDLC 是「软件开发生命周期」的英文缩写。它指一件软件从提出想法、设计方案、编写代码、测试、上线到长期维护的整段过程。

Coding Agent 把「编写代码」这一段大幅加快，需求澄清、方案判断、测试、审核和发布仍然按照人的速度进行。Anthropic 用一句话概括了变化：

> Code is no longer the bottleneck.

代码已经很快了。真正影响团队速度的，开始变成目标能否说清楚，结果能否被验证，风险能否被及时判断。

## 写代码变快以后，团队更容易卡在理解、审核和验证上

过去，工程师可能需要两周完成一个功能。产品、设计、安全和测试团队在这两周里有时间继续讨论，也有时间准备审核。

现在，Agent 可能在几个小时里读完代码库、修改文件、补测试并提交 PR。人的注意力没有同时增加，于是等待发生在实现前后。

这仍然像刚才那家餐厅。厨师一分钟出菜，服务员却来不及确认桌号，验菜的人也来不及检查过敏原。继续增加厨师，只会让出餐口堆满盘子。

![代码生成变快以后，拥堵转移到了交接、验证和发布](/gallery/ai-native-sdlc/cover.png)

<div class="plain-note">
  <strong>我认为最重要的变化</strong>
  <p>软件团队接下来缺少的资源，会逐渐从写代码的时间，转向说清目标、传递上下文、验证结果和判断风险的注意力。</p>
</div>

这也解释了为什么只统计「生成了多少代码」很容易产生错觉。一个团队的实际交付速度取决于整条链里最慢的一段。Build 提速以后，Plan、Review、Test 和 Deploy 会成为新的等待点。

## Artifact 让交接不再只靠聊天记录和人的记忆

Artifact 常被翻译成「工件」。这个词有些生硬，可以先把它想成餐厅里的订单或一张接力单。

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

它同时给人阅读，也给 Agent 读取，还能告诉系统什么时候可以进入下一段。被确认的 `intent.md` 可以启动设计，被批准的 `spec.md` 可以启动实施计划，合并后的 PR 可以启动发布，生产事故又会生成新的意图和测试样本。

![Artifact 像一张会继续往下传的接力单](/gallery/ai-native-sdlc/artifact-chain-whiteboard.svg)

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

这里需要保持克制。Artifact 不会自动变成可靠事实。文件可能过期、互相矛盾，也可能在复制和分叉以后出现两个「最新版」。长期运行时，每类状态需要明确的事实源、稳定 ID、版本关系和负责人。

自动触发也适合逐步建立。团队先把交接单、权限和验收标准稳定下来，再让系统自动向前推进，风险会小得多。

## Agent 需要说明书，也需要门锁和刹车

很多团队会把所有规则都写进 Prompt，希望模型记住并遵守。这个做法像对司机说「请安全驾驶」。它有帮助，仍然代替不了地图、红绿灯、安全带和刹车。

`CLAUDE.md` 像项目地图。它告诉 Agent 代码库怎样组织、常用命令是什么、团队有哪些约定。内容需要短而准确，因为每次开始工作时都要读取。

Skill 像经过整理的驾驶经验。它保存 API 设计方法、安全规范、品牌要求和常用步骤。Agent 遇到相应任务时，可以加载这套方法。

Hook 和 Permission 更接近红绿灯与刹车。它们在命令执行或文件修改时检查动作，决定允许、询问还是阻止。必须每次都成立的规则，应该放在这里。

Sandbox 像封闭练习场。它限制 Agent 能看到的文件、网络、进程和凭据。MCP 则像标准插座，让 Agent 连接 GitHub、工单、数据库和其他工具。插座负责连接，权限仍然由运行环境控制。

![Agent 需要说明书，也需要能够真正生效的边界](/gallery/ai-native-sdlc/control-stack-whiteboard.svg)

这里的区分很实用：Skill 告诉 Agent 怎样做更合适，Hook、Permission 和 Sandbox 决定哪些事情可以发生。

随着 Agent 获得更强的执行能力，这些边界会比一段写得很长的 Prompt 更重要。本地 Hook 也不能代替分支保护、云端 IAM、短期凭据、环境审批和网络策略。

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

Self Verification 是执行者边做边检查，适合发现机械错误。Verifier Agent 使用新的上下文重新查看目标、代码和证据。一个负责推进，一个负责挑错。

![任务内自检、独立复查和错题本组成验证回路](/gallery/ai-native-sdlc/feedback-evals-whiteboard.svg)

模型、Prompt、`CLAUDE.md`、Skill、Hook 和权限发生变化时，Agent 的行为也可能变化，所以这些配置需要像代码一样跑回归测试。

一种实用的起步方式，是从最近的真实工作中收集二十到五十个任务，为每个任务写出可以检查的结果。每次生产事故也可以变成新的测试题。

这像驾校的错题本。学员在某个路口犯过错，教练就把这个场景留下来。以后更换教材、教练或训练方法时，这道题仍然要重新通过。

通过率同样会骗人。旧题目可能已经无法代表今天的工作，评测集合需要持续加入新任务，也要删除失去区分能力的题目。

## 维护阶段让一次开发变成持续运行的循环

前面的阶段主要处理「怎样把功能做出来」。Maintain 处理的是「功能上线以后发生了什么」。

家里的恒温器可以帮助理解这一段。传感器负责判断温度是否越过阈值，这是一段确定性的程序。AI 被叫醒以后，可以分析门窗是否打开、设备是否故障、房间里是否突然多了人。

涉及关闭设备、修改生产系统或发布代码时，还要经过权限规则和人的批准。

有些方案会用轻微、中等和严重异常来分配不同自治程度。轻微异常只记录，中等异常允许 Agent 读取现场并给出诊断，严重异常可以走预先批准的动作路径，生产授权仍由人完成。

这个设计把四种权力分开了。程序决定什么时候报警，Agent 负责解释，权限系统限制动作，人决定是否接受风险。

自动循环还需要停止条件。Trigger 要去重，动作要有幂等键，Run 要有最大步数、超时、成本预算、熔断和人工接管点。回滚也要产生证据，证明系统确实回到了已知状态。

## 这些方法真正新在哪里，又有哪些旧问题仍然存在

单独看这些组件，它们都很熟悉。Git 保存版本，CI 运行测试，监控系统产生告警，权限系统限制动作，ChatOps 处理事故。

新的部分主要来自组合方式。Agent 开始贯穿意图、设计、实现、验证、审核和事故处理。前一个 Artifact 被接受以后，可以启动下一次 Run。每次 Run 又会留下证据、经验和新的评测样本。

我认为其中有四点值得借鉴。第一，长期状态离开聊天窗口，进入可以版本化和审计的对象。第二，建议性规则和强制性边界被分开。第三，完成必须绑定真实证据。第四，生产失败会回流到下一轮评测。

它也留下了几道很难的问题。Agent 产出越快，人的审核能力越容易成为上限。Artifact 会老化，评测样本会偏离真实工作，自动循环会放大错误。平台还可能掌握越来越多组织状态，新的锁定效应会来自 Artifact、Policy、Eval 和 Run History，而不仅来自模型接口。

因此，这套思路更适合作为工程设计的参考材料。它没有提供一个可以直接安装的统一 Runtime，也没有消除组织里的利益取舍、责任划分和人的注意力限制。

## 把软件领域的名字换掉，Personal Harness 也就出现了

这套结构可以用于很多非开发任务。

例如用户说：「帮我更新下一轮融资材料。」

聊天先把目标问清楚：材料给谁看，数据截止到哪一天，哪些数字需要保密，最后要交付哪些文件。

随后，系统把工作拆成市场调研、财务模型和演示稿。调研进入 `research.md`，数字进入 `model.xlsx`，页面进入 `deck.pptx`。

Verifier 检查引用是否有效，数字能否互相对上，页面有没有裁切。用户确认以后，系统保存这次经验。下个月，日期或市场数据变化又可以触发新的检查。

![同一套结构可以从开发流程延伸到个人工作系统](/gallery/ai-native-sdlc/personal-harness-whiteboard.svg)

这里可以得到一组简单的对应关系：

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

AI 编程正在把代码生成从稀缺能力变成常见能力。接下来的竞争会更多发生在代码周围：目标如何被保存，权限如何被限制，结果如何被证明，失败如何变成下一轮经验。

聊天继续承担自然的入口，Artifact 保存长期状态，Run 保存执行过程，Policy 保存边界，Evidence 保存可信度，人保留价值判断和生产授权。

循环可以长期运行，人的判断仍然属于系统本身。

这也是 AI Native Desktop 和 Personal Harness 最重要的边界。Agent 可以承担更多执行工作，系统仍然要清楚地保存目标、限制动作、证明结果，并为人留下随时接管的位置。

<div class="article-source-note">

本文主要参考以下官方资料：

1. [Anthropic：AI-Native SDLC 原文](https://claude.com/blog/the-ai-native-sdlc-%70laybook)
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
