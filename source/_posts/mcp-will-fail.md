---
title: "MCP，终将会走向失败"
date: 2026-10-01 10:00:00
updated: 2026-10-01 20:18:00
tags:
  - MCP
  - Agent
  - Protocol
  - Architecture
  - Engineering
  - Sandbox
categories:
  - [gallery]
featured_image: /gallery/mcp-will-fail/cover.webp
author: chenli
description: MCP 可能会被广泛采用，却仍未解决客户端与服务端之间最难的预期错配。问题不只是工具能否调用，而是两端能否稳定地理解同一件事。
---

最近重读 Pi 团队的《You Said No MCP!》。[1]

一个曾经明确反对 MCP 的智能体，后来为什么又把它放进了核心功能？Pi 0.99.0 把 MCP 和代码模式（codemode）一起纳入内置能力。[1] [3] 这不是立场翻转。Mario 早先批评的是常见 MCP 服务端带来的工具描述膨胀、上下文开销和组合困难；他偏向 Bash、命令行和代码，因为中间结果可以留在执行环境里，不必一轮轮塞回模型。[2]

Pi 现在的做法，是把 MCP 工具接到自己的代码模式下：模型可以在 QuickJS JavaScript 沙箱里写程序组合调用，而不是一次读完几十个工具再临场决定下一步。[1] [3] 这能改善 Pi 的使用体验，却没有让不同产品之间自动互操作。

去年做 MCP 服务端时，我最常遇到的不是字段少写了一个，而是“这个智能体支持 MCP”后面那串仍没答案的问题：它怎么加载工具，支持哪种授权，会不会读取结构化结果，需不需要资源，能不能处理用户确认。服务端和客户端都写着 MCP，最后却像在说两种语言。

我想讨论的就是这个问题。MCP 想统一的东西很多，但两端对关键行为并没有形成稳定预期；新扩展没有填平这个缺口，反而让它更显眼。

---

## 问题不在于管道能不能连上

Anthropic 在 2024 年发布 MCP，目标是让 AI 应用用统一方式连接外部数据和工具，减少重复集成。[4] 这个方向没有问题。服务端作者最想要的，正是不必为每个智能体各做一次接入。

但能连上不等于能一起工作。工具调用之后，双方仍要对结果形式、分页和错误、长任务、用户确认以及中断恢复有共同理解。一个工具声明了输入输出，并不规定它在完整流程里如何收尾。模型可以临时补足含混处；需要反复运行、审计和维护的系统不行，含混会重新变成接口契约。

这类问题往往不会在第一次演示里暴露。演示只要把一个工具调通就够了，真实流程却会绕回来：上一步返回的是列表还是一段说明？下一页由谁取？服务端要求用户确认时，客户端是不是会真的弹出确认？任务跑到一半被取消，下一次调用是重来、继续，还是拿到一段无法复用的历史？协议提供消息格式，并不能替产品把这些选择做完。

结构化结果是个小例子。MCP 后来增加了 `outputSchema` 和 `structuredContent`，让服务端能表达返回数据的结构；工具规范也建议，为兼容旧客户端，还应把结果放进文本字段。[5] 官方 Ruby 开发工具包（SDK）的响应对象支持 `content` 和 `structuredContent`，却不会替服务端自动把后者转回文本。[6] 服务端不能只凭“支持 MCP”判断客户端怎样消费结果，客户端也不能只凭工具名判断拿到的是稳定数据还是给模型看的说明。

换句话说，工具的名字相同、字段长得相似，并不保证它在两边扮演同一种角色。一端也许把它当严格的程序接口，另一端可能只把它当模型阅读的一段自然语言入口。前者希望可组合、可校验，后者更在意能否给出一段足够好的回答。两种用法都说得通，但把它们装进同一条“已支持”的结论里，开发时就很容易拧巴。

![同样的协议连接到不同宿主应用，却会遇到完全不同的能力与结果](/gallery/mcp-will-fail/same-protocol-different-worlds.webp)

所以我说的失败，不是请求发不出去，而是传输层成功后，产品层的预期仍没有对齐。授权会把这件事放大：客户端版本、注册、回调地址和令牌刷新都可能决定最后一步是否能走完。MCP 2026 年的规范也承认，授权是实现者投入集成时间最多的领域之一，并继续调整了 `iss` 验证、动态客户端注册和客户端身份绑定。[7]

![同一份授权凭据面对不同实现，可能得到通过、拒绝或反复重试的结果](/gallery/mcp-will-fail/auth-expectation-mismatch.webp)

用户不会关心这些组合，他只会看到同一个 MCP 服务端在这里能用，在那里不能。标准若要减少集成成本，至少应让不兼容之处可见、可检测、可解释；支持矩阵、兼容测试和错误信息，往往比再加一个功能更有价值。

这里缺的不是一份更长的规范，而是一套能落到实际组合上的约定。服务端至少需要说明自己依赖哪些行为，客户端也应能明确报告哪些路径不会走通。否则“支持”只能留在市场页和 README 里，真正的兼容测试仍由每个接入的人重新做一遍。

---

## 扩展没有把边界补齐

能力协商能告诉服务端客户端“有没有”某项能力，却很少回答“没有以后，用户还能不能把事情做完”。一个流程需要用户确认时，服务端可以返回文字、拆成多个工具、保存状态或直接停下。这几种选择都能让协议继续说话，产品体验却完全不同。必须依赖界面才能完成的任务，降级成文本不算真正兼容。

MCP Apps 让这种差异更明显。它成为正式扩展并不意外，很多业务需要界面能力；问题是不同宿主应用支持的部分不同。微软的文档列出了能力矩阵，并建议运行时检查能力、准备替代路径。[9] [10] OpenAI 也建议先使用 MCP Apps 的通用部分，再通过 `window.openai` 调用 ChatGPT 专属能力。[11]

要理解这件事，不妨看 OpenAI 这两次把它做成产品的方式。2025 年推出 ChatGPT Apps 时，OpenAI 的说法很直接：Apps SDK 建在 MCP 之上，MCP 负责连接外部工具和数据，Apps SDK 让开发者同时定义应用逻辑和界面。[12] Booking.com 这张官方示意图里，用户仍在 ChatGPT 对话中提问，酒店结果则以可以继续操作的卡片出现。对用户来说，它不像“调了一次工具”，更像聊天里长出了一小段应用。

![OpenAI 2025 年公开的 Booking.com App 在 ChatGPT 对话中内嵌酒店检索结果；图源：OpenAI](/gallery/mcp-will-fail/openai-official/openai-apps-inline-booking.webp)

实现上并没有魔法：服务端仍是 MCP 服务端，返回结构化结果和组件模板；ChatGPT 把组件放进 iframe，再通过桥接把数据、工具调用和界面状态接起来。[11] 但到这里，MCP 已经不只是“给模型一个函数”。它开始承担一段可交互界面的数据通道，而宿主应用决定这段界面最终怎么出现、能不能改变布局、怎样拿到文件，以及什么时候要求用户确认。

前两天的 DevDay 2026，又把这一层往前推了一步。OpenAI 宣布的 Plugin Extensions 可以让插件在 ChatGPT 的侧边栏有入口，在对话旁打开面板，也可以接管特定文件的查看和编辑。[13] 官方开发文档把这件事说得更明确：扩展的规范是在 MCP 和 MCP Apps 规范之上继续定义的，而不是用另一套协议把它们替换掉。[14]

![OpenAI 在 DevDay 2026 展示的 Canva 插件侧边栏入口与全屏工作区；图源：OpenAI](/gallery/mcp-will-fail/openai-official/openai-plugin-sidebar-canva.webp)

Canva 这张图里，左侧那个小图标不是一个工具调用的结果，而是把应用变成 ChatGPT 工作台里的一个常驻入口。用户可以从对话进入它，也可以在完整工作区里继续做设计；这已经是宿主界面怎样组织应用的问题。

这正是“ChatGPT 页面里能插插件、侧边栏图标和互动面板”背后的结构。先有一层共享的 MCP / MCP Apps 能力，让服务端、工具和组件可以接上；随后由 ChatGPT 的扩展层决定它能否进侧边栏、进入对话旁的面板、作为文件查看器运行，或在输入框里提供更丰富的表单。站在产品角度，这很合理。一个宿主不应为了跨平台而放弃自己的交互能力。

![OpenAI 开发文档中的插件扩展入口示意：侧边栏、对话内面板与右侧工作区；图源：OpenAI Developers](/gallery/mcp-will-fail/openai-official/openai-mcp-extension-surfaces.webp)

问题也恰好在这里。OpenAI 的文档建议，能用共享 MCP Apps bridge 的地方优先使用它，只有需要 ChatGPT 专属能力时再访问 `window.openai`。[11] 这是很克制的工程建议，但它同时承认了边界：同一个应用若想在别的宿主里保持相同体验，就得面对不同的能力子集和降级路径。页面、文件、确认、状态和生命周期都不是“工具已经发现了”就自然解决的事情。

这会改变维护成本的形状。过去，服务端主要面对输入、输出和调用失败；有了页面以后，还要关心它由谁渲染、何时关闭、文件怎样交回、用户中途离开后任务是否还能继续。它们都是产品需要解决的问题，但不该因为挂在同一个协议名下，就被误读成已经天然可移植。

![管道仍然连通，用户却可能无法走完实际产品流程](/gallery/mcp-will-fail/pipe-not-product.webp)

---

## 代码模式很好，命令行不是通用答案

Pi 的代码模式和 Cloudflare 提出的“代码模式”都解决了一个实际问题：复杂调用交给代码组合，中间结果留在执行环境，只把必要结论带回上下文。[8] Pi 通过工具元数据和延迟加载，把 MCP 接到自己的运行方式下面。它没有证明所有 MCP 服务端从此可以彼此无差别地工作，也没有证明每个智能体都该照这个方式设计。

![运行框架可以在基础管道之上完成发现、过滤、代码组合与上下文管理](/gallery/mcp-will-fail/harness-wraps-pipe.webp)

批评 MCP 以后，很容易转向命令行。对编程智能体来说，它确实自然：模型会 Bash、管道、grep、jq，也会写临时程序；代码库、Git、包管理器和登录态往往已经在开发者电脑上。很多开发任务用命令行比远程工具顺手。

但从这里推到“命令行是所有智能体的通用工具接入协议”，跨得太远。命令行需要执行环境、文件系统、已安装的软件和依赖管理。一个只需读 CRM、查订单、改工单或调用远程 API 的智能体，没必要先拿到一台完整 Linux 机器。把所有能力都包成命令行，还会迫使智能体拥有沙箱、程序依赖和可能的登录态，原本只是调用问题，变成机器里该放什么状态和凭据的问题。

OpenAI 的架构给出了一条更合适的边界：运行框架、会话和执行环境是不同概念。智能体可以设置 `environment.type = none`；不需要代码和文件操作时，仍可调用远程 HTTP MCP 服务和函数工具，真正需要时再创建执行环境。[15] 命令行是好工具，但不该成为每个智能体的前提。

这种按需出现的关系，能避免架构从一开始就被“要不要给它一台机器”绑住。读订单和提交审批是服务连接；处理一批文件、跑一次测试或打开浏览器，才是执行环境的问题。把它们分开，权限范围和成本也更容易看清。

![命令行适合某些任务，但不应让每个小任务都先拖上一整台工作站](/gallery/mcp-will-fail/cli-is-not-default.webp)

---

## 沙箱不是智能体的家

把命令行和常驻机器视为默认方案，很容易把智能体想成住在一台电脑里的东西。这个形态对依赖本地硬件、桌面软件或私有网络的任务有用，却不该成为默认的身份模型。沙箱更适合被看作执行节点：需要时创建，任务结束后回收；只需远程工具时，甚至不创建。任务、状态、权限、审批记录和产物，不该跟着某个沙箱一起消失。

凭据最能说明差别。个人电脑上执行 `gh issue list` 很顺，因为 GitHub、AWS、配置文件和浏览器 Cookie 都在那里。临时沙箱没有这些前提。把全部凭据注入每个实例，或者把整个用户主目录挂进去，在企业里很快会碰到撤权、审计和泄漏处置。

Anthropic 的 Claude Code 云端沙箱让真实 Git 凭据留在外部，沙箱只用按会话限定的短期凭据访问代理；这里说的是 Anthropic 托管的云端会话，不代表所有自托管方式。[18] OpenAI 也把边界拆开：Vault 将 MCP 凭据放在智能体配置之外，Codex Cloud 的网络密钥由受控代理在允许域名的 HTTPS 请求中替换。[16] [17]

![沙箱是按需执行资源，身份、权限与凭据应留在受控边界之外](/gallery/mcp-will-fail/ephemeral-sandbox-vault.webp)

这指向一个更稳的组织方式：控制层保存任务、授权引用、审批记录和可恢复状态；执行层只拿当前步骤所需的短期权限和输入；产物写回受控存储或业务系统。执行环境被回收后，任务仍有归属和恢复路径。

它也更符合真实工作的分布方式。开发者可能在本地改代码，批处理放在隔离环境，审批和客户数据仍留在已有业务系统。把所有东西都塞进一台常驻电脑，短期看起来省事，后来却会把谁有权限、状态落在哪里、任务能否接手混成一个问题。控制层的价值并不在于替所有步骤执行，而在于让这些步骤不用依附同一台机器。

OpenClaw 很容易让人形成“智能体就是一台电脑”的印象，但它的实际架构已经区分了控制和执行：启用智能体沙箱时，Gateway 控制进程留在主机上，受策略约束的工具执行可以交给 Docker、Podman、SSH、OpenShell 等后端。[19] 我不同意的不是这种实现，而是把给智能体一台常驻电脑、把文件和凭据都放进去，当作组织级最佳实践。

这种区别在任务变长以后尤其明显。用户换了设备、电脑休眠、网络中断，或者需要别人接手时，任务不应跟着某个桌面会话一起失踪。长期在线的控制层可以保留进度和授权引用，再决定下一步调到本地、隔离环境还是远程服务；执行节点则只负责把眼前的一段工作做完。

![控制层把任务按需分派到本地、临时沙箱和远程服务，再集中收回状态与产物](/gallery/mcp-will-fail/control-plane-dispatch.webp)

组织数据早已不以某台电脑为中心。代码、文档、项目状态和客户订单分别在各自的业务系统里。工作流可以把代码检查调度到本地，把长处理放进隔离沙箱，把 CRM 查询留在远程服务，再把状态写回项目系统。电脑是可调度的节点，不该成为智能体的身份。

---

## MCP 应该退回一个更小的位置

MCP 已经加入工具、资源、提示词、模型采样、用户交互、任务、应用界面、扩展和授权。每项都有理由，但不都属于同一层。2026-07-28 的调整也在收敛：核心协议改为无状态，移除了 `initialize/initialized` 握手和协议级会话；任务移出实验性核心，成为官方扩展；根目录、模型采样和日志被标记为过时。[7]

我更愿意把 MCP 看成一层稳定的能力接口：这里有什么能力，接受什么输入，返回什么输出，怎样完成一次受控调用。工具发现、延迟加载、代码模式、界面、长任务和沙箱调度，留给上层运行框架。这样不是把责任推走，而是让每层有自己的变化速度：能力接口可以保守，运行框架可以试新的交互和调度，产品也可以为自己的关键路径承担责任。

如果沿着这个判断往下走，很容易问：那就重写一个更漂亮的协议，不就好了？现实没这么干脆。今天再写出一份逻辑上更整齐的规范，OpenAI、Anthropic、微软和已经上线的服务端，也没有理由自动迁过去。标准不只靠技术正确性，还受迁移成本、已有投入、开发者习惯和平台利益牵着走。

MCP 的优势并不在于它已经把问题想清楚，而在于它已经在那里：服务端、SDK 和用户预期都出现了。它因此很可能不会消失，甚至会成为所有智能体都有的一根公共管道。真正的风险恰恰是这条管道成功得无处不在，但开发者接入前仍要逐一确认客户端、扩展、授权、界面和恢复方式；服务端作者仍要猜宿主会如何解释结果；用户仍会问为什么同一个 MCP 在这里能用，在那里不能用。

过去适配不同 API，后来希望 MCP 结束这种碎片化；如果最后变成适配不同厂商对 MCP 的理解，事情就有点讽刺了。兼容判断、宿主专用逻辑、私有扩展和降级路径并不会因为它们有了统一的名字而消失。

所以标题里的“失败”不是说 MCP 会死。它甚至可能活得很好：更多 App、Extension、Plugin、Skill 和 Agent 都接在它上面。从采用率看，它会很成功。但如果一个协议最终只统一了一根管道，真正决定应用能不能完成任务的行为仍散落在两端的私有实现里，它没有完成最初最迷人的承诺：让开发者不必为每一个对方重新做一次集成。

从 MCP 到代码模式，再到 Apps、Extensions、命令行、沙箱和重新建立云端控制层，每个选择单独看都有合理性，许多甚至是正确的。只是把这一年折腾出来的东西一起摊开时，我总会想到刘震云那本《一地鸡毛》。不是在引用书里的句子，单纯觉得这个书名太合适：协议越来越完整，Agent 越来越聪明，架构图也越来越复杂，大家都在解决眼前那个合理的问题。最后低头一看，折腾一圈，还是一地鸡毛。

## 参考资料

1. Earendil，[You Said No MCP!](https://earendil.com/posts/you-said-no-mcp/)，Pi 对 MCP、codemode 与工具组合的解释。
2. Mario Zechner，[What if you don’t need MCP at all?](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)，关于 MCP 工具加载、上下文与组合方式的批评。
3. Pi，[Pi 0.99.0](https://pi.dev/changelog/releases/0.99.0)，内置 MCP、codemode、工具发现与结构化输出更新。
4. Model Context Protocol，[What is the Model Context Protocol?（2024-11-05）](https://modelcontextprotocol.io/docs/2024-11-05/getting-started/intro)，MCP 的早期开放协议定位。
5. Model Context Protocol，[Tools specification](https://modelcontextprotocol.io/specification/latest/server/tools)，`outputSchema`、`structuredContent` 与兼容性建议。
6. Model Context Protocol Ruby SDK，[Tool::Response implementation](https://raw.githubusercontent.com/modelcontextprotocol/ruby-sdk/main/lib/mcp/tool/response.rb)，Ruby SDK 的 `content` 与 `structuredContent` 响应实现。
7. Model Context Protocol，[2026-07-28 Specification Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)；[MCP 2026-07-28: A stateless protocol core and more](https://blog.modelcontextprotocol.io/posts/2026-07-28/)。
8. Cloudflare，[Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/)，2025-09-26。
9. Model Context Protocol，[MCP Apps: Bringing UI Capabilities To MCP Clients](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)；[MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview)。
10. Microsoft Learn，[Add MCP apps to declarative agents in Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps)，宿主应用能力矩阵与替代路径建议。
11. OpenAI Developers，[Add UI to your MCP server](https://developers.openai.com/plugins/build/chatgpt-ui)，MCP Apps bridge 与 ChatGPT 专属 `window.openai` 扩展。
12. OpenAI，[Introducing apps in ChatGPT and the new Apps SDK](https://openai.com/index/introducing-apps-in-chatgpt/)，Apps SDK 构建在 MCP 之上，以及对话内互动应用示例。
13. OpenAI，[DevDay 2026 Recap](https://openai.com/index/devday-2026-recap/)，Plugin Extensions 的侧边栏、互动面板与文件查看器公告。
14. OpenAI Developers，[Plugin Extensions](https://developers.openai.com/plugins/build/extensions)；[Plugins reference](https://developers.openai.com/plugins/reference)，在 MCP 与 MCP Apps 之上的插件扩展规范、共享 bridge 与 ChatGPT 专属能力。
15. OpenAI Developers，[Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture)；[MCP connections](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp)，运行框架、执行环境与远程 MCP 边界。
16. OpenAI Developers，[Vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults)，MCP 凭据的外置保管与按连接匹配。
17. OpenAI Developers，[Cloud environments](https://developers.openai.com/codex/environments/cloud-environments)，网络密钥的占位符与受控代理替换机制。
18. Anthropic，[Making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing)；[Claude Code security](https://docs.anthropic.com/en/docs/claude-code/security)，云端沙箱与 Git 凭据代理。
19. OpenClaw，[Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)；[Modes, scope, and backend](https://docs.openclaw.ai/gateway/sandboxing/modes-scope-and-backend)，Gateway 与工具执行的分层。
