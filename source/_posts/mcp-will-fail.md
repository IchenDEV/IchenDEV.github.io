---
title: "MCP，终将会走向失败"
date: 2026-10-01 10:00:00
updated: 2026-10-01 18:40:00
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

这篇文章讨论了一件有意思的变化：一个曾经明确反对 MCP 的智能体，为什么后来又把 MCP 放进了核心功能。Pi 0.99.0 已把 MCP 和代码模式（codemode）一并纳入内置能力。[1] [3]

Pi 过去的批评并不含糊。Mario 在《What if you don’t need MCP at all?》里写过，常见 MCP 服务端会带来工具描述膨胀、上下文开销和组合困难；他更偏向 Bash、命令行和代码，因为代码可以把中间结果留在执行环境里，而不是一轮一轮塞回模型上下文。[2]

Pi 现在支持 MCP，并不表示这些问题突然消失了。它的做法是把 MCP 工具接入自己的代码模式：模型可以在 QuickJS JavaScript 沙箱里写一小段程序来组合多个调用，而不是一次读完几十个工具再临场决定下一步。[1] [3] 这是一种很好的用法，但它也让我重新确认了一点：Pi 改善的是自己使用 MCP 的方式，不是 MCP 已经解决了不同产品之间的互操作问题。

去年做 MCP 服务端时，我反复遇到的并不是“工具定义要多写一个字段”这种问题。更麻烦的是，只要有人说“这个智能体支持 MCP”，后面就还有一串没有答案的问题：它怎么加载工具，支持哪种授权，能不能读取结构化结果，需不需要资源，能不能处理用户确认。服务端和客户端都写着 MCP，最后却常常像是在说两种语言。

我想讨论的就是这件事。MCP 的问题不只是功能越来越多，而是它希望统一的东西太多，却没有让两端对关键行为形成足够稳定的预期。这个缺口在新扩展出现后没有变小，反而更明显了。

---

## 问题不在于管道能不能连上

Anthropic 在 2024 年发布 MCP 时，目标很明确：让 AI 应用以统一方式连接外部数据和工具，减少重复集成。[4] 这个方向本身没有问题。对于服务端作者来说，最吸引人的承诺是，不必为每一个智能体分别做一套接入。

但“能连上”不等于“能一起工作”。MCP 可以让客户端发现工具、发起调用、收到结果；真正落到产品里，双方还需要对很多事情达成一致：结果是给模型读的一段文字，还是给程序继续处理的数据？分页、错误、长任务、用户确认和中断恢复怎么表示？缺少某项能力时，服务端该停止、降级，还是保存状态等待下一次调用？

这些不是吹毛求疵。一个工具声明了输入和输出，并不自动规定它在完整流程里的行为。对模型来说，很多含混之处可以靠推理临时补上；对一个要反复运行、需要审计、还要由别人维护的系统，这些含混之处会重新变成接口契约问题。

结构化结果就是一个很小但很典型的例子。MCP 后来增加了 `outputSchema` 和 `structuredContent`，让服务端能明确表达返回数据的结构；工具规范同时建议，为兼容旧客户端，服务端还应把结构化结果放进文本字段。[5] 这件事仍要服务端自己处理：官方 Ruby 开发工具包（SDK）的响应对象支持 `content` 和 `structuredContent`，但不会替开发者自动把后者转回文本。[6]

这不是说结构化结果不好。需要筛选、统计或继续调用的数据，本来就应该尽量保留结构；需要解释给用户的内容，自然语言又更直接。问题在于，服务端无法只根据“支持 MCP”判断对面的客户端会怎样使用它。客户端也无法只根据工具名称判断服务端返回的是稳定数据，还是一段写给模型看的说明。

这才是我理解的协议失败：传输层可能成功了，产品层的预期却没有对齐。工具调用成功，并不代表这个系统已经真正互操作。

![同样的协议连接到不同宿主应用，却会遇到完全不同的能力与结果](/gallery/mcp-will-fail/same-protocol-different-worlds.webp)

授权会把这个问题放大得更直观。去年做 MCP 服务端时，常见情况是客户端不支持认证，或者支持的版本不同；有时授权页已经走完，回到客户端还是无法调用。资源处理、客户端注册、回调地址和令牌刷新都可能卡在中间。MCP 在 2026 年新版规范的说明里也承认，授权是实现者投入集成时间最多的领域之一；同一版规范还继续调整了 `iss` 验证、动态客户端注册和客户端身份绑定。[7]

这类演进有必要，安全相关的规范不能为了兼容旧实现而停住。但这意味着服务端实际维护的从来不是一个抽象的“支持 MCP”，而是一组组合：客户端、客户端版本、开发工具包、授权方式和服务端实现。用户不会关心这些组合，他只会看到同一个 MCP 服务端在这里能用，在那里不能用。

如果一个标准的目标是减少集成成本，就不能只停在“双方有能力声明”这一步。它还需要让不兼容的地方可见、可检测、可解释。公开支持矩阵、可复现的兼容测试和清楚的错误信息，很多时候比再加一个功能更有价值。

![同一份授权凭据面对不同实现，可能得到通过、拒绝或反复重试的结果](/gallery/mcp-will-fail/auth-expectation-mismatch.webp)

---

## 扩展没有把边界补齐

能力协商当然重要。客户端告诉服务端自己支持什么，至少能避免把不支持的能力当成理所当然。但能力协商只回答“有没有”，很少回答“不支持以后，用户还能不能把事情做完”。

假设一个流程必须向用户确认。客户端支持相应交互时，工具可以照常走下去；不支持时，服务端可以返回文字、拆成多个工具、保存中间状态，或者直接标记为不可用。协议层都能找到一种表达方式，但这几种选择对应的是完全不同的产品体验。一个应用如果必须依赖界面才能完成任务，降级成一段文本并不等于兼容，只是消息还在传。

MCP Apps 的出现让这种差异更容易被看见。它成为正式扩展并不意外，很多业务确实需要工具带一点界面能力。[9] 但不同宿主应用支持的部分并不相同。微软的文档就列出了能力矩阵：部分接口可用，部分不可用；显示模式、文件上传、弹窗和若干生命周期回调也有差异，并建议运行时检查能力、准备替代路径。[10]

OpenAI 的建议也很诚实：通用能力先放在 MCP Apps 里，MCP Apps 没有提供的 ChatGPT 专属能力再通过 `window.openai` 使用，并在调用前检查扩展能力。[11] 这对一个想把 ChatGPT 体验做好的团队没有问题。问题是，当“支持 MCP”同时覆盖了通用能力、平台扩展和各家自己的降级逻辑，它已经不再是一句足够说明兼容性的描述。

扩展不一定错。界面、长任务和用户交互本来就会出现。我的担心是，协议没有先把两端的共同部分做扎实，就不断把新的产品需求装进同一个名字里。最终，服务端作者仍要为不同宿主应用准备能力判断和专门适配；客户端作者也要为不同服务端猜测实际行为。协议统一了入口，复杂性却留在入口的两端。

![管道仍然连通，用户却可能无法走完实际产品流程](/gallery/mcp-will-fail/pipe-not-product.webp)

这也是为什么我不太相信“再加几个扩展就会越来越统一”。更值得做的事，是为常见场景沉淀清楚的能力档位和测试工具：哪些界面调用可用，结构化结果能到什么程度，没有界面时如何继续，任务中断以后谁负责恢复。允许差异存在没有问题，让差异只能靠开发者手工试出来才是问题。

---

## 代码模式很好，命令行不是通用答案

Pi 的代码模式和 Cloudflare 提出的“代码模式”都在解决一个很实际的问题：复杂工具调用交给代码组合，往往比让模型反复调用、阅读结果、再决定下一步更可控；中间结果也可以留在执行环境里，只把需要的结论带回上下文。[8]

这是一种运行框架上的改进。Pi 通过工具元数据和延迟加载，把 MCP 接到自己已经确定的执行方式下面。它没有证明所有 MCP 服务端从此可以彼此无差别地工作，也没有证明每个智能体都该照这个方式设计。

![运行框架可以在基础管道之上完成发现、过滤、代码组合与上下文管理](/gallery/mcp-will-fail/harness-wraps-pipe.webp)

批评 MCP 以后，很容易得出另一个结论：那就用命令行。对于编程智能体，命令行确实很自然。模型会 Bash、管道、grep、jq，也会写临时程序；代码库、Git、包管理器和开发者的登录态通常已经在电脑上了。很多开发任务用命令行比远程工具顺手得多。

但从“命令行对编程智能体很好用”推导到“命令行是所有智能体的通用工具接入协议”，中间跨得太远。命令行需要一个可用的执行环境、文件系统、已安装的软件和依赖管理。一个只需要读 CRM、查订单、改工单或调用几个远程 API 的智能体，没必要先拿到一台完整的 Linux 机器。

把所有外部能力都包成命令行，往往还会反过来影响智能体架构：为了调用一个远程服务，智能体被迫拥有沙箱、文件系统、程序依赖和可能的登录态。原本只是“怎样调用一个能力”的问题，变成了“这台机器里应该放什么状态、什么凭据、谁来维护”的问题。命令行是很好的工具，不该被当作所有问题的底座。

![命令行适合某些任务，但不应让每个小任务都先拖上一整台工作站](/gallery/mcp-will-fail/cli-is-not-default.webp)

OpenAI 现在的智能体架构提供了一个更合理的边界：运行框架、会话和执行环境是不同概念。智能体可以设置 `environment.type = none`；不需要运行代码或操作文件时，运行框架仍可调用远程 HTTP MCP 服务和函数工具。只有真正需要命令、代码或文件操作时，才创建执行环境。[13]

这个划分看起来平淡，却很重要。执行环境应该是一种按需申请的资源，而不是智能体必须先拥有的前提。查知识库、读订单、提交审批可以在受控服务连接上完成；编译、处理文件、运行浏览器自动化时，再申请合适的执行环境。这样做既少了无意义的机器，也让权限和数据边界更容易审计。

---

## 沙箱不是智能体的家

一旦把命令行和常驻机器视为默认方案，就很容易把智能体想成“住在一台电脑里的东西”。它有文件、浏览器、软件和登录态，长期运行，看起来很像一个数字员工。这个形态有自己的用途，特别是依赖本地硬件、桌面软件或私有网络的任务。

但它不应该成为默认的身份模型。沙箱更适合被看作一个执行节点：需要时创建，任务结束后回收，需要并行时扩展多个实例；只需要远程工具时，甚至不创建。任务、状态、权限、审批记录、长期记忆和产物，不该因为某个沙箱被销毁就一起消失。

凭据是最容易看出差别的地方。个人电脑上执行 `gh issue list` 很舒服，因为 GitHub、AWS、配置文件，甚至浏览器 Cookie 都已经在本地。临时沙箱没有这些前提。把全部凭据注入每一个实例，或者把整个用户主目录挂进去，在企业里很快会碰到撤权、审计和泄漏处置的问题。

Anthropic 的 Claude Code 云端沙箱采用的是另一种做法：真实 Git 凭据不进入沙箱，沙箱使用按会话限定的短期凭据访问外部代理，由代理检查操作和目标，再在服务端附上真正的认证。这里说的是 Anthropic 托管的云端会话，不应泛化到所有自托管方式。[16]

OpenAI 把边界拆得更清楚：Vault 将 MCP 凭据放在智能体配置之外，智能体使用已认证连接时不会得到密钥本身；Codex Cloud 的网络密钥则让程序只看到占位符，由受控代理仅在允许域名的 HTTPS 请求中替换真正密钥。[14] [15]

这些设计已经给出了更好的方向：控制层保存任务、授权引用、审批记录和可恢复状态；执行层只拿到完成当前步骤所需的短期权限和输入；步骤结束后，产物写回受控存储或业务系统，而不是留在某台难以追踪的机器里。即使执行环境被回收，任务仍有明确归属，也能恢复。

![沙箱是按需执行资源，身份、权限与凭据应留在受控边界之外](/gallery/mcp-will-fail/ephemeral-sandbox-vault.webp)

OpenClaw 这类产品很容易强化“智能体就是一台电脑”的直觉。这里需要分清产品印象和实际架构。OpenClaw 在启用智能体沙箱时，Gateway 控制进程留在主机上，受策略约束的工具执行可以交给 Docker、Podman、SSH、OpenShell 等后端；沙箱默认也不一定开启。[17] 它的架构本身已经有控制层和执行层的区分。

我不认同的不是 OpenClaw 的实现，而是它最容易被接受的部署想象：给智能体一台常驻电脑，把文件、登录态、任务进度和凭据都往里面放。这个方案对个人实验很省事，但不该被误认为组织级智能体的最佳实践。电脑可以是智能体可调度的一个节点，不该成为智能体的身份。

组织数据其实早已不以某一台电脑为中心。代码在 GitHub 或企业 GitLab，文档在飞书、Google Docs、Notion 或知识库，项目状态在项目系统，客户和订单在业务系统。电脑上有工作副本、缓存和临时文件，但它们通常不应是组织唯一的事实来源。

这意味着“本地优先”和“云端优先”也不必二选一。工作流可以把代码检查调度到本地，把长时间处理交给隔离沙箱，把 CRM 查询留在远程服务，把最终状态写回项目系统。需要统一的不是智能体永远待在哪台机器上，而是这些执行节点怎样取得有限权限、报告进度并交还产物。

![控制层把任务按需分派到本地、临时沙箱和远程服务，再集中收回状态与产物](/gallery/mcp-will-fail/control-plane-dispatch.webp)

---

## MCP 应该退回一个更小的位置

MCP 在演进中已经加入了工具、资源、提示词、模型采样、用户交互、任务、应用界面、扩展和授权。每一项单独拿出来看都有理由，但它们并不都属于同一层。

2026-07-28 的调整其实已经反映出一种收敛：核心协议改为无状态，移除了原来的 `initialize/initialized` 握手和协议级会话；任务移出实验性核心，成为官方扩展；根目录、模型采样和日志被标记为过时，但仍在兼容窗口内。[7]

我认可这种把边界重新说清楚的方向。MCP 可以做一层稳定的能力接口：这里有什么能力，接受什么输入，返回什么输出，怎样完成一次受控调用。工具发现、延迟加载、代码模式、上下文管理、多智能体协作、界面和沙箱调度，则应当留给上层的运行框架。

Codex 的变化也说明了类似边界。OpenAI 已经移除了原来的 codex mcp-server；如果需要暴露 Codex 自身的鉴权、会话记录、审批和智能体事件，应迁移到 `app-server` 协议。与此同时，Codex 仍然支持连接外部 MCP 服务端。OpenAI 明确说明，`app-server` 使用自己的 JSON-RPC，不是 MCP 服务端，也不能直接替代原来的接口。[12]

这不是说应用界面、任务或用户交互没有价值，而是说它们不必都被塞进同一个最小协议里。一个协议核心越克制，上层越有空间做产品；一个协议承担得越多，“支持 MCP”这句话包含的实现组合也越多，最后反而越难判断两个产品能否一起工作。

我不想现在就画出一张完整的“智能体七层模型”。分层最后会是什么样还不清楚。但有一件事已经很明确：连接、长期状态、工具调用、用户交互、身份权限和执行环境，是不同的问题。把它们都塞进 MCP，不能自然得到一个更统一的系统。

---

## 它未必会消失，但不能只靠“被广泛采用”来证明成功

标题里的“失败”，不是说 MCP 会消失。相反，它很可能会变成大多数智能体都支持的接入方式，服务端、开发工具包和平台支持都会继续增加。

我担心的是另一种结果：MCP 成了无处不在的公共管道，但开发者接入前仍要问，具体是哪一个客户端、支持哪些扩展、授权怎样走、界面是否能用、失败以后如何恢复。如果核心行为仍然散落在宿主应用和服务端各自的私有实现里，开发者依然要为不同对方写适配层，那么它没有完成最初最迷人的承诺：不必为每一个对方重新做一次集成。

所以这不是一篇反对 MCP 的文章。MCP、代码模式、命令行、沙箱和云端控制层各自都有用。真正需要分开的，是“能连通”“能调用”和“能稳定完成用户任务”这三件事。

一个协议被广泛采用，不等于它已经实现互操作。更可靠的标志是，客户端和服务端能够预测对方的行为；如果不能，也能清楚说明不兼容在哪里。MCP 如果最后愿意退回智能体架构中一个清晰、稳定、边界克制的位置，我反而认为它会活得更久。

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
12. OpenAI Developers，[Codex MCP server removal](https://developers.openai.com/codex/mcp-server)，Codex app-server 的迁移说明。
13. OpenAI Developers，[Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture)；[MCP connections](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp)，运行框架、执行环境与远程 MCP 边界。
14. OpenAI Developers，[Vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults)，MCP 凭据的外置保管与按连接匹配。
15. OpenAI Developers，[Cloud environments](https://developers.openai.com/codex/environments/cloud-environments)，网络密钥的占位符与受控代理替换机制。
16. Anthropic，[Making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing)；[Claude Code security](https://docs.anthropic.com/en/docs/claude-code/security)，云端沙箱与 Git 凭据代理。
17. OpenClaw，[Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)；[Modes, scope, and backend](https://docs.openclaw.ai/gateway/sandboxing/modes-scope-and-backend)，Gateway 与工具执行的分层。
