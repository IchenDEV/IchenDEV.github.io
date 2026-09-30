---
title: "MCP，终将会走向失败"
date: 2026-10-01 10:00:00
updated: 2026-10-01 10:00:00
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
description: MCP 也许会成功得无处不在，却未必完成互操作性的承诺。问题不在于管道能否连通，而在于不同 Host、Server、授权、UI 与运行时如何真正协作。
---

最近看了 Pi 团队的一篇文章，《You Said No MCP!》。[1]

这篇文章解释了一件挺有意思的事情：为什么一个过去明确反对 MCP 的 Agent，现在又把 MCP 放进了 Core。Pi 0.99.0 已把 MCP 与 codemode 一并纳入内置能力。[1] [3]

Pi 过去对 MCP 的态度并不暧昧。Mario 去年也专门写过《What if you don’t need MCP at all?》，批评常见 MCP Server 带来的上下文开销、工具数量膨胀，以及工具之间不好组合的问题。他当时更喜欢 Bash、CLI 和代码，因为代码天然可以组合，中间结果也没必要全部经过模型上下文。[2]

但现在 Pi 支持 MCP 了。

Earendil 给出的解释也很合理：世界变了，MCP 变了，Pi 自己的 Tool Infrastructure 也变了。Pi 可以通过 codemode，把 MCP Tool 暴露给 QuickJS JavaScript Sandbox，让模型用程序去组合工具，而不是把几十个 Tool 全部摊在模型上下文里。文章也直接承认，很多 MCP Server 今天依然是围绕“把 Tool 全部塞进 Context”设计的；他们更希望 MCP 接近带智能发现能力的 OpenAPI，工具返回结构化数据。[1] [3]

我并不觉得改主意有什么问题。

技术判断本来就应该变化。

真正让我觉得有意思的是另外一个问题：

当初反对 MCP 的那些问题，究竟真的被解决了，还是 Pi 只是终于找到了一种自己能够接受 MCP 的方式？

这两件事情差别很大。

我之所以会对这篇文章有这么强的反应，也是因为去年很长一段时间，我就在做 MCP Server。

开发 Server，接各种 Agent，处理鉴权，排查各种莫名其妙的兼容问题。

那已经是去年的事情了。

但看完 Pi 这篇文章，当时很多已经有些遗忘的痛苦又回来了。

做到最后，我最烦的其实已经不是 Tool Schema 怎么写，也不是一个 Tool 多占了几千个 Token。

而是：

你永远不知道管道另一端到底是什么东西。

用户告诉你：

我的 Agent 支持 MCP。

理论上，这句话应该能够消除很多信息差。

实际上，排查问题往往才刚刚开始。

哪个 Agent？

哪个版本？

支持哪一版鉴权？

Tool 是全部加载，还是动态发现？

Resource 支不支持？

Elicitation 呢？

Apps 呢？

Structured Output 到底会不会被真正消费？

同一个 MCP Server，在张三的 Agent 上完全正常，在李四的 Agent 上可能直接不能工作。

然后用户会问：

两个不是都支持 MCP 吗？

我也很想问。

对啊。

不是都叫 MCP 吗？


---


MCP 最大的问题不是 Context

Anthropic 在 2024 年发布 MCP 时，描述得很清楚：希望通过一个开放协议连接 AI 应用与外部系统，包括数据源和工具，用统一标准取代不断重复的碎片化集成。[4]

这也是 MCP 最吸引人的地方。

不是因为 JSON-RPC 有多先进，而是因为它承诺了一件非常朴素的事情：

以后不用每接一个 Agent，再重新做一次集成。

但做到后来，我越来越觉得 MCP 最大的问题，并不是大家经常讨论的 Context。

Context 太大，可以延迟加载。

Tool 太多，可以搜索。

调用过程太长，可以用代码。

中间数据太多，可以放到 Sandbox 里过滤。

这些都是工程问题，而且已经有很多不错的解决方案。

真正麻烦的是：

MCP Client 和 MCP Server 之间的能力与行为并不对等，而且这种不对等可以大到让“支持 MCP”本身失去实际意义。

我作为 Server 作者，不知道对面的 Agent 到底支持什么。

反过来，如果我开发 Agent，也不知道接进来的 MCP Server 会用什么方式理解这个协议。

张三的 MCP 把 Tool 当传统 API，用非常严谨的 Schema，返回 JSON。

李四觉得 Tool 本来就是给模型看的，直接返回一大段 Markdown。

王五依赖 Resource。

赵六需要客户端 Elicit 用户。

另一个 Server 已经开始返回 Apps。

这些设计未必是错误的。

客户端这边也一样。

一个 Agent 把所有 Tool 直接加载。

一个做 Tool Search。

一个使用 Code Mode。

另一个只支持其中最基础的一小部分。

它们可能全部都可以合理地宣称自己：

支持 MCP。

问题恰恰就在这里。

![同样的协议连接到不同 Host，却会遇到完全不同的能力与结果](/gallery/mcp-will-fail/same-protocol-different-worlds.webp)


---


大家都支持协议，但大家想象的不是同一个协议

Structured Output 是一个很典型的例子。

MCP 后来增加了 outputSchema 和 structuredContent，这是正确方向。2025 年的工具规范已经明确它们的语义；到了 2026-07-28，outputSchema 又放宽到更多 JSON Schema 2020-12 关键字，structuredContent 也扩展到了任意符合 Schema 的 JSON 值。[5] [7]

但兼容旧客户端时，协议建议 Server 同时把结构化结果序列化进 TextContent，照顾那些只读取 content 的实现。[5] 这不是 SDK 自动替你完成的事：官方 Ruby SDK 的 Response 同时支持 content 与 structuredContent，但不会把后者自动序列化回文本，Server 作者仍需显式处理兼容层。[6]

单独看，这些设计都有充分理由。

但作为调用方，我仍然需要面对那个最现实的问题：

这个 Tool 到底是一个程序接口，还是一段写给模型看的话？

我要统计数据，当然希望拿到结构化结果。

结果对面返回：

根据您的需求，我找到了以下几个结果……

怎么办？

再找模型解析一次。

今天模型很强，这当然能做。

但这件事本身已经开始有些荒谬。

我接入一个所谓的标准协议，原本就是希望减少 Adapter。

最后变成：

让模型在运行时替我写 Adapter。

然后我们说，没关系，模型越来越聪明。

那协议本身到底替我解决了多少问题？


---


鉴权把这个问题暴露得最彻底

如果返回格式只是难受，鉴权很多时候会直接让产品不能用。

这也是去年做 MCP Server 时，我最深的体会之一。

有的 Agent 根本不支持认证。

有的支持，但实现的版本不一样。

有的授权页面正常打开，看起来也授权成功，回来以后还是调用失败。

Resource 怎么处理、Client Registration 怎么做、localhost redirect 怎么支持，这里面任何一个地方出现一点差异，最终用户看到的都只是：

不能用。

有意思的是，MCP 自己在 2026 年新版规范的介绍里也直接承认：

过去一年和实现者讨论下来，Authorization 是实现者花最多集成时间的地方之一。

于是 2026-07-28 又继续调整授权协议，包括 iss 验证、Dynamic Client Registration 的 application_type，以及客户端身份与 issuer 的绑定。[7]

这些变化很多是必要的。

安全问题当然应该修。

但标准的困难就在这里：

规范发布一个新版本，不等于整个生态在同一天升级。

客户端有客户端的版本。

SDK 有 SDK 的版本。

Server 有 Server 的版本。

企业自己的 OAuth 服务又是另外一套生命周期。

最后 Server 开发者维护的其实不是：

MCP

而是：

```text
MCP
× Client
× Client Version
× SDK Version
× Auth Implementation
× Server Implementation
```

任何一个问题单独拿出来，都可以说：

这是客户端 Bug。

这是 SDK Bug。

这是 Server 没正确实现。

都可以。

但用户根本不关心。

他只是来问：

为什么这个 Agent 能用，那个 Agent 不能用？

一个协议如果最后需要开发者长期回答这个问题，就很难说它真正解决了互操作性。


---


Capability Negotiation 也没有解决问题

有人会说，MCP 不是有 Capability 吗？

Client 告诉 Server 自己支持什么，不就可以了？

问题是：

知道“不支持”，和知道“不支持以后怎么办”，完全是两回事。

比如一个流程必须让用户确认。

Client 支持对应的交互能力，很好。

不支持呢？

Tool 失败？

返回一句文字，让模型问用户？

拆成两个 Tool？

在 Server 上保存中间状态？

还是整个功能标记为不可用？

再比如一个应用必须有 UI 才能完成任务。

客户端不支持 Apps。

你当然可以降级成文本。

协议还可以继续通信。

但如果用户已经无法完成原来的任务，这究竟算不算“兼容”？

这就是我觉得 MCP 经常混淆的一件事情：

Protocol fallback 不等于 Product fallback。

协议没有断，不意味着产品还能工作。

![管道仍然连通，用户却可能无法走完实际产品流程](/gallery/mcp-will-fail/pipe-not-product.webp)


---


Pi 改的是自己的 Harness，不是这个问题

所以再回到 Pi。

我基本认同 Earendil 对 Codemode 的判断。

复杂 Tool Call 用代码组合，本来就比让模型：

call tool
→ 看结果
→ call tool
→ 看结果
→ call tool

一轮轮操作自然。

但这并不是什么 2026 年才发现的新东西。

Mario 自己去年反对 MCP 时，喜欢的就是代码和 Bash。

2025 年 9 月，Cloudflare 也已经公开提出 Code Mode：把 MCP Tool 的 schema 转成带类型与文档的 TypeScript API，让模型直接写代码组合调用，把中间结果留在执行环境，只把需要的最终结果带回上下文。[8]

所以 Pi 今天的变化，在我看来更像：

以前：

```text
CLI / API
    ↓
Bash / Code
    ↓
Composition
```

现在：

```text
MCP
    ↓
Codemode
    ↓
Composition
```

它没有真正改变自己的执行哲学。

只是接受了 MCP 作为下面的接口。

这当然是合理的。

MCP 已经成为一个很大的生态，你没有必要因为不喜欢某一种 MCP 使用方式，就拒绝整个生态。

但这里解决的是：

Pi 怎么使用 MCP。

它没有解决：

其他 Agent 怎么使用 MCP。

更没有解决：

Server 作者怎么知道每一个 Agent 会怎么理解自己。

Pi 可以通过自己的 Tool Metadata、Deferred Loading 和 Codemode，把 MCP 包装成它喜欢的样子。Earendil 自己也明确说，他们仍然认为 MCP 很难组合，而且不同 Server 和不同 Harness 的使用方式仍然是问题。[1] [3]

所以我反而觉得，Pi 的转向证明了另一件事：

一个优秀的 Harness 可以把 MCP 用好，不等于 MCP 让不同 Harness 变得一样好用。

![Harness 可以在基础管道之上完成发现、过滤、代码组合与上下文管理](/gallery/mcp-will-fail/harness-wraps-pipe.webp)


---


Extension 让事情变得更乱了

今年 MCP Apps 成为第一个正式 MCP Extension。

这件事情本身并没有错。

而且需要说准确：MCP Apps 不是 OpenAI 的私有协议。它是 MCP 的公开扩展，但 Host 支持会随客户端、版本和渠道而变化。2026 年 1 月的官方公告列出 Claude Web/Desktop、Goose、VS Code Insiders 与 ChatGPT 的支持或上线状态；这不等于所有 Host 都实现了同一组能力。[9]

问题是，Extension Framework 进一步放大了一个已经存在的问题：

同样叫支持 MCP，实际支持的能力集合可以越来越不一样。

看微软自己的 MCP Apps 文档就很直观。

Microsoft 365 Copilot 支持 MCP Apps，但微软同时给出了一张很长的能力兼容表：

有些接口支持。

有些不支持。

Display Mode 只有部分模式。

文件上传、Modal、部分生命周期回调、部分 Tool Annotation 都存在差异。

微软甚至直接建议开发者在运行时检测 API 是否存在，然后自己准备 fallback。Microsoft 365 Copilot 的兼容矩阵也说明，部分 display mode、文件与 modal API 并不与其他 Host 完全一致。[10]

这不是在批评微软实现得不好。

相反，它很诚实。

问题就在于：

如果一个公开标准最后要求应用开发者对不同 Host 做 Feature Detection，然后逐家设计 fallback，那么这个标准到底把多少跨平台成本消掉了？

OpenAI 这边也一样。

OpenAI 当前的官方建议就是：公共能力先使用 MCP Apps；MCP Apps 没有提供的 ChatGPT 专属能力，再通过 window.openai 使用，并对扩展能力做 feature detection。[11]

这个设计本身非常合理。

一个平台当然应该能创新。

但从应用作者的角度，选择就很现实：

要跨平台，就只使用所有 Host 的交集。

要最好的 ChatGPT 体验，就使用 ChatGPT Extension。

到另一个 Host，再做另一套。

绕了一圈：

兼容矩阵又回来了。

以前我们给 Chrome、IE、Safari 写兼容代码。

现在我们开始给不同 Agent Host 写 MCP 兼容代码。

当然，这比什么标准都没有可能还是好。

但我很难把它叫成问题已经解决。

Extension 解决的是：

协议怎么继续增加能力。

它没有解决：

应用怎么稳定跨 Host 工作。

甚至从某种意义上说，它把差异正式制度化了。

协议维护者得到了扩展性。

Host 得到了产品自由。

开发者得到了一张越来越长的兼容矩阵。


---


最后 MCP 很可能只剩下一根管道

这也是我最近越来越强烈的感觉。

MCP 最开始的想象很漂亮：

Agent
  │
 MCP
  │
Tools / Data

一个 Agent 世界的 USB-C。

后来开始不断增加东西。

Tool。

Resource。

Prompt。

Sampling。

Elicitation。

Tasks。

Apps。

Extension。

Authorization。

每一个能力单独看，都能解释为什么需要它。

但整个协议开始承担越来越多原本属于不同层次的问题。

然后到了 2026-07-28，MCP 又做了一次非常大的基础调整：协议核心改为 Stateless，移除了原来的 initialize/initialized handshake 和 protocol-level session；Tasks 移出实验性核心，成为官方 Extension；Roots、Sampling 和 Logging 则被标记为 deprecated。官方把这次发布称为 MCP 发布以来最大的一次修订。这里的 deprecated 不是立刻删除：它们仍处在兼容窗口内。[7]

其中很多变化我甚至觉得方向是对的。

特别是 Stateless。

Server 不应该因为一个隐式 Transport Session 就很难水平扩展。

但这个变化同时让我更确信：

MCP 最后很可能应该老老实实做一根管道。

告诉我：

这里有一个能力。

这是它的输入。

这是它的输出。

我可以调用它。

至于：

什么时候发现 Tool。

要不要延迟加载。

用不用 Code Mode。

要不要 Plan。

怎么做 Context Management。

怎么调度多个 Agent。

怎么创建 Sandbox。

这些本来就是 Harness 的事情。

Codex 最近的变化其实也在说明这个边界。

OpenAI 已经移除了原来的 codex mcp-server。如果你需要暴露 Codex 自身完整的鉴权、Conversation History、Approval 和 Agent Event，需要迁移到自己的 app-server 协议；但 Codex 继续支持连接外部 MCP Server。OpenAI 文档明确写着，app-server 采用自己的 JSON-RPC，不是 MCP Server，也不是 drop-in replacement。[12]

我反而觉得这种分开是对的。

Agent Runtime 是 Agent Runtime。

Tool Protocol 是 Tool Protocol。

不要什么都叫 MCP。


---


但 CLI 也不是答案

批评 MCP 以后，一个很自然的答案是：

那就用 CLI。

这一点我和 Mario 的判断还是不完全一样。

CLI 对 Coding Agent 确实非常自然。

模型很会 Bash。

会 Pipe。

会 grep。

会 jq。

会写临时程序。

输出不需要全部进入上下文。

对于开发任务，我完全认可这些优势。

但从：

CLI 对 Coding Agent 非常好用。

推导到：

CLI 是所有 Agent 的通用 Tool Protocol。

中间还差得很远。

最直接的问题就是：

CLI 总得运行在什么地方。

你要有 Runtime。

要装程序。

要有文件系统。

要处理依赖。

而很多 Agent 任务本来根本不需要这些东西。

我只是读 CRM。

查一张订单。

改一个工单。

调用三个远程 API。

为什么在这之前，我必须先给 Agent 准备一台 Linux 机器？

OpenAI 现在的 Agent 架构反而提供了一个很好的例子：Harness、Session 和 Environment 是不同的概念。Agent 可以设置 environment.type = none；不需要运行代码或操作文件时，Harness 仍可调用 OpenAI 可访问的远程 HTTP MCP 和 Function Tools。真正需要命令、代码或文件操作时，再增加 Environment。[13]

我觉得这更自然。

执行环境应该是需要的时候才出现的资源，不应该是 Agent 存在的前提。


---


更麻烦的是 Secret

CLI 在自己的电脑上为什么这么舒服？

因为一切已经在那里。

GitHub 登录过了。

AWS 登录过了。

各种配置文件都在 Home Directory。

甚至浏览器 Cookie 都已经准备好了。

所以模型只需要执行：

gh issue list

事情就完成了。

但如果 Sandbox 是临时的呢？

任务到来：

创建一个。

任务结束：

销毁。

下一次任务跑到另外一个实例。

那 Credential 怎么办？

每个 Sandbox 重新登录？

把 .config 持久化？

把用户的 Home Directory 挂进去？

创建 Sandbox 的时候，把所有 Token 一股脑注入？

这些方案对于个人机器可能可以接受，到了企业就是完全不同的问题。

员工离职怎么办？

Token 泄漏怎么办？

权限怎么立即撤销？

一份 Credential 被复制到多少台环境里，我怎么知道？

这不是 CLI 自己可以解决的。

当然，可以做得很好。

Anthropic 的 Claude Code 云端 Sandbox 就没有把真实 Git Credential 放进 Sandbox，而是通过外部 Proxy 代理 Git 操作：Sandbox 使用按会话限定的短期 Credential，Proxy 检查操作和目标，再在服务端附上真正的认证。这是 Anthropic-hosted Cloud sessions 的设计，不应泛化为所有自托管运行方式。[16]

OpenAI 把两类边界拆得更清楚：Vault 将 MCP Credential 放在 Agent 配置之外，Agent 使用已认证连接时不会拿到 Secret 值；Codex Cloud 的 Network Secret 则让程序只收到 Placeholder，由受控代理仅在允许域名的 HTTPS 请求中替换真正 Secret。[14] [15]

我认同这种设计。

但注意，到这里以后真正解决问题的已经不是 CLI 了。

而是：

Identity。

Permission。

Credential Broker。

Network Policy。

Sandbox Isolation。

Audit。

CLI 只是最里面的一种 Interface。

![Sandbox 是按需执行资源，身份、权限与凭据应留在受控边界之外](/gallery/mcp-will-fail/ephemeral-sandbox-vault.webp)

所以说：

CLI 比 MCP 简单。

在个人电脑上可能没错。

在一个企业级、多租户、可以水平扩展的 Agent 系统里，我觉得这句话漏掉了太多东西。


---


Sandbox 不是 Agent 的家

这也是我对过去一年 Agent 产品形态一个越来越大的疑问。

不知道什么时候开始：

给 Agent 一台电脑

变成了一种特别自然的直觉。

它有自己的文件。

浏览器。

软件。

登录态。

一台机器长期放在那里。

看上去很像一个数字员工。

但我越来越觉得，这个类比可能从一开始就不太对。

在我们的设想里：

Sandbox 是 Agent 使用的执行资源，不是 Agent 本身。

需要的时候创建。

任务完成以后销毁。

需要并行就开多个。

只需要 Remote Tool，就一个都不要。

Agent 的任务、状态、权限、审批、长期记忆和产物，不应该因为某一个 Sandbox 被销毁就一起消失。

不然你所谓的 Agent，最后其实只是：

一台不太敢关机的虚拟机。

这对水平扩展尤其麻烦。

你可以很容易增加十个 Container。

但如果真正的身份、状态、Credential 和工作进度都绑在某一个 Container 上，那么增加 Container 并不等于获得了可调度的计算能力。

只是增加了十个新的状态孤岛。

OpenClaw 这一类产品又很容易强化“Agent 就是住在一台电脑里的东西”这种产品想象。

这里不想把代码架构本身说错。OpenClaw 在启用 Agent Sandbox 的架构中明确把 Gateway 控制进程留在 Host，只把受策略约束的 Tool Execution 交给 Docker、Podman、SSH、OpenShell 或其他 Sandbox Backend；它的实际架构本身已经存在控制层和执行层的区分。Sandbox 默认并不一定开启。[17]

我真正不认同的是这种被大众进一步简化之后的产品直觉：

一台常驻电脑 + 一个模型 + 一堆 Tool = Agent。

电脑应该是 Agent 可以调度的一个执行节点。

而不是 Agent 的身份。


---


更何况，真正重要的数据本来就不应该在本地

还有一个前提经常被忽略。

如果讨论的是信息化做得比较好的企业，或者一个正常使用现代知识管理工具的知识工作者，真正重要的数据本来就不以个人电脑为中心。

程序员的代码在 GitHub，或者企业 GitLab。

文档在飞书云文档、Google Docs、Notion 或企业知识库。

项目状态在项目系统。

客户在 CRM。

订单在业务系统。

电脑上当然还有东西。

有工作副本。

有 Cache。

有还没 Push 的代码。

有临时文件。

但这些通常不应该是组织唯一的事实来源。

本地电脑更多是一个 Interface 和 Runtime，不是 Data Center。

我打开飞书，不代表飞书文档住进了我的 Mac。

我 git clone 一个仓库，也不代表整个项目从此依赖我的 SSD。

我们过去二十年一直在做一件事：

把组织数据从某个人的电脑里搬出来。

统一版本。

统一权限。

方便协作。

方便交接。

结果到了 Agent 时代，又开始给每一个 Agent 准备一台长期存在的电脑，再把文件、状态、Cookie、Credential 全部往里面塞。

好不容易从：

某个人的电脑

里跑出来。

现在准备搬进：

某个 Agent 的电脑。

我不觉得这是一个很自然的终局。

当然，确实有例外。

几百 GB 的文件。

深度依赖某个桌面软件。

本地硬件。

特殊 GPU。

真正不能离开设备的数据。

这些都应该支持本地执行。

但它们决定的是：

这一步计算在哪里执行。

而不是：

整个 Agent 应该住在哪里。


---


我们这一年其实绕了一条挺奇怪的路

回头看看早期的 v0 和 Lovable，我觉得这件事情尤其有意思。

2023 年的 v0，本质上就是一个在线产品：用户描述自己想要的界面，v0 生成并迭代基于 React、Tailwind CSS 与 shadcn/ui 的代码，用户再把代码带走继续开发。[18]

Lovable 的历史也有类似轨迹：gpt-engineer 起初是面向终端开发者的开源项目，后来团队做了面向非技术用户的商业 Web 平台 gptengineer.app，并将其品牌重塑为 Lovable。开源命令行项目与商业 Web 产品需要分开看。[19]

这些产品当时当然没有今天的 Coding Agent 强。

但产品直觉非常清楚：

用户把事情交给服务。

至于后面启动几台机器，安装什么环境，是服务自己的事情。

后来 Coding Agent 快速起来，本地 Agent 成为一个非常自然的切入口。

因为开发者电脑上已经什么都有了。

代码有。

Node 有。

Git 有。

浏览器有。

各种 CLI 也登录好了。

Agent 直接进去工作，几乎不需要额外基础设施。

这是非常聪明的产品选择。

但一个：

最容易启动的切入点

不等于：

最终应该采用的系统架构。

我们很快遇到了：

电脑合盖怎么办？

断网怎么办？

任务执行几个小时怎么办？

人换设备怎么办？

怎么 Remote Control？

怎么让它继续运行？

然后开始做云端 Sandbox。

做 Remote Runtime。

做 Credential Proxy。

做状态同步。

做任务接管。

最后又发现：

好像还是需要一个独立于用户电脑、常在线的控制层。

有时候我会觉得，这一年的过程挺有意思。

我们先把一个服务拆成了一台需要用户照看的电脑，然后又开始一点点把它重新做回服务。

我的判断是，接下来组织级 Agent 会越来越明确地回到这个结构：

控制层长期在线。

状态集中管理。

Identity 和 Permission 集中管理。

Runtime 按需调度。

需要本地，就把一个步骤调度到本地。

需要代码环境，就创建一个 Sandbox。

只需要 Remote API，就根本不创建 Runtime。

Agent 与运行环境重新分开。

而且这一次应该分得更彻底。


---


也许最后需要的是一个分层的 Agent Protocol Stack

写到这里，我有一个还没有完全想清楚的判断。

也许 MCP 最大的问题，不是某一个 Feature 做错了。

而是它一直试图在同一个协议里处理太多不同层次的问题。

Tool 不够，加 Resource。

需要模型参与，加 Sampling。

需要用户参与，加 Elicitation。

需要任务生命周期，加 Tasks。

需要 UI，加 Apps。

以后再继续通过 Extension 扩展。

每一次单独看，都有理由。

但放到一起，就越来越像一个什么事情都想管一点的协议。

我反而觉得，Agent 未来的通信体系可能最终还是会走向类似网络协议的分层 Stack。

这里不是说照抄 OSI 七层，也不是现在就应该画出一张“Agent 七层模型”。

这个问题还远远没有清楚到那个程度。

但网络协议有一个特别重要的思想：

下一层提供稳定抽象，上层在这个抽象之上继续构建，而不是一个协议一路从链路管到最终应用。

IP 不需要理解网页。

TCP 不需要理解数据库。

HTTP 也不需要规定操作系统怎么调度一个进程。

Agent 的通信最后大概率也要找到类似的边界。

连接是一层问题。

可靠通信是另一层问题。

长期状态与任务又是另一层。

Tool、Agent 协作、人机交互，可能分别属于更上面的 Application Protocol。

Code Mode、Skill、Sandbox、Tool Search、Multi-Agent Orchestration，则更可能应该留给 Harness。

具体到底怎么分，我现在没有答案。

而且我觉得现在就非常自信地提出一套完整 Agent OSI，大概率也是过早设计。

但至少有一点越来越清楚：

继续把所有新需求都往 MCP 里面加，不会自然得到一个越来越统一的协议。

甚至可能正好相反。

它拥有的 Feature 越多，Host 可以选择的组合越多，“支持 MCP”这句话表达的信息越少。

一个成熟协议最重要的能力，可能并不是不断证明：

这个我也能做。

而是终于能够明确：

这个事情不归我管。

如果 MCP 最后能退回整个 Agent Stack 中一个清晰、稳定的层，我反而觉得它还有可能活得非常久。


---


但新的完美协议也不会有人自动 Follow

说到这里，很容易得出另一个结论：

那重新设计一个更好的协议不就好了？

问题是，现实世界不是这样工作的。

就算今天有人写出一份逻辑上比 MCP 漂亮十倍的规范：

OpenAI 为什么迁？

Anthropic 为什么迁？

Microsoft 为什么迁？

已经存在的 Server 为什么迁？

生态为什么迁？

标准从来不只是技术正确性的问题。

还有迁移成本。

已有投资。

开发者习惯。

平台利益。

先发优势。

MCP 今天最大的优势恰恰不是它已经完美，而是：

它已经在那里了。

Server 有了。

SDK 有了。

用户开始要求了。

越来越多平台支持了。

如果你今天做一个 Agent 不支持 MCP，反而需要解释：

为什么不支持？

一个标准进入这个阶段以后，就会产生非常强的惯性。

所以我所谓的“MCP 会失败”，并不意味着它会消失。

甚至恰恰相反。


---


MCP 最可能的失败方式，是成功得无处不在

它可能成为所有 Agent 都有的一根公共管道。

所有产品官网都写：

Supports MCP.

所有业务系统都提供 MCP Server。

越来越多 Apps。

越来越多 Extensions。

越来越多 Plugin、Skill、Agent 建立在上面。

从 Adoption 看，非常成功。

但真正做产品的时候，Server 开发者还是在问：

这个 Agent 到底支持什么？

Agent 开发者还是在问：

这个 MCP Server 到底会返回什么？

用户还是在问：

为什么同一个 MCP，在这里能用，在那里不能用？

然后所有人继续：

Feature Detection。

Compatibility Layer。

Host-specific Logic。

Private Extension。

版本判断。

Fallback。

以前我们适配不同 API。

后来我们说 MCP 可以结束这种碎片化。

最后，我们开始适配：

不同厂商对于 MCP 的理解。

如果到了那个时候，你接入一个 MCP Server 之前，第一句话仍然是：

你用的是哪家的 MCP？

那我们到底统一了什么？

这也是为什么，我还是愿意把标题写成：

MCP，终将会走向失败

它未必会死。

甚至可能活得非常好。

但如果一个协议最终只统一了一根管道，而真正决定应用能不能工作的行为，依然全部散落在管道两端的私有实现里，那么它至少没有完成最初那个最迷人的承诺：

让开发者不再为每一个对方重新做一次集成。

从 MCP，到 Code Mode，到 Apps，到 Extension，到 CLI，到 Sandbox，再到重新建立云端控制层。

每一步单独拿出来看，都有自己的理由。

很多决定本身甚至都是对的。

只是把这一年折腾的东西全部摊在桌子上以后，我总会想到刘震云那本《一地鸡毛》。

这不是引用书里的哪句话。

只是觉得这个书名实在太合适。

协议越来越完整。

Agent 越来越聪明。

架构图越来越复杂。

大家都在解决自己眼前那个非常合理的问题。

最后低头一看。

折腾一圈，一地鸡毛。

## 参考资料

1. Earendil，[You Said No MCP!](https://earendil.com/posts/you-said-no-mcp/)，Pi 对 MCP、codemode 与工具组合的解释。
2. Mario Zechner，[What if you don’t need MCP at all?](https://mariozechner.at/posts/2025-11-02-what-if-you-dont-need-mcp/)，关于 MCP 工具加载、上下文与组合方式的批评。
3. Pi，[Pi 0.99.0](https://pi.dev/changelog/releases/0.99.0)，内置 MCP、codemode、工具发现与结构化输出更新。
4. Model Context Protocol，[What is the Model Context Protocol?（2024-11-05）](https://modelcontextprotocol.io/docs/2024-11-05/getting-started/intro)，MCP 的早期开放协议定位。
5. Model Context Protocol，[Tools specification](https://modelcontextprotocol.io/specification/latest/server/tools)，outputSchema、structuredContent 与兼容性建议。
6. Model Context Protocol Ruby SDK，[Tool::Response implementation](https://raw.githubusercontent.com/modelcontextprotocol/ruby-sdk/main/lib/mcp/tool/response.rb)，Ruby SDK 的 content 与 structuredContent 响应实现。
7. Model Context Protocol，[2026-07-28 Specification Changelog](https://modelcontextprotocol.io/specification/2026-07-28/changelog)；[MCP 2026-07-28: A stateless protocol core and more](https://blog.modelcontextprotocol.io/posts/2026-07-28/)。
8. Cloudflare，[Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/)，2025-09-26。
9. Model Context Protocol，[MCP Apps: Bringing UI Capabilities To MCP Clients](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)；[MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview)。
10. Microsoft Learn，[Add MCP apps to declarative agents in Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/plugin-mcp-apps)，Host 能力矩阵与 feature detection。
11. OpenAI Developers，[Add UI to your MCP server](https://developers.openai.com/plugins/build/chatgpt-ui)，MCP Apps bridge 与 ChatGPT 专属 `window.openai` 扩展。
12. OpenAI Developers，[Codex MCP server removal](https://developers.openai.com/codex/mcp-server)，Codex app-server 的迁移说明。
13. OpenAI Developers，[Agents API architecture](https://developers.openai.com/api/docs/guides/agents-api/architecture)；[MCP connections](https://developers.openai.com/api/docs/guides/agents-api/tools/mcp)，Harness、Environment 与 Remote MCP 边界。
14. OpenAI Developers，[Vaults](https://developers.openai.com/api/docs/guides/agents-api/tools/vaults)，MCP 凭据的外置保管与按连接匹配。
15. OpenAI Developers，[Cloud environments](https://developers.openai.com/codex/environments/cloud-environments)，Network secret 的占位符与受控代理替换机制。
16. Anthropic，[Making Claude Code more secure and autonomous](https://www.anthropic.com/engineering/claude-code-sandboxing)；[Claude Code security](https://docs.anthropic.com/en/docs/claude-code/security)，云端 Sandbox 与 Git 凭据代理。
17. OpenClaw，[Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)；[Modes, scope, and backend](https://docs.openclaw.ai/gateway/sandboxing/modes-scope-and-backend)，Gateway 与 Tool Execution 的分层。
18. Vercel，[Announcing v0: Generative UI](https://vercel.com/blog/announcing-v0-generative-ui)，2023-10-11。
19. Lovable，[GPT Engineer and Lovable | The Evolution](https://lovable.dev/gpt-engineer)，开源 gpt-engineer 与商业 Web 产品的发展关系。
