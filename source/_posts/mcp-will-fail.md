---
title: "MCP，终将会走向失败"
date: 2026-10-01 10:00:00
updated: 2026-10-01 15:42:00
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
description: MCP 的采用会继续扩大，但协议层的互操作性仍取决于 Host、Server、授权、UI 与运行时边界。本文从 MCP Server 的开发经验出发，讨论它更适合承担什么。
---

最近重读 Pi 团队的《You Said No MCP!》。[1]

这篇文章讨论了一件值得留意的事：一个曾经明确反对 MCP 的 Agent，为什么后来又把 MCP 放进了 Core。Pi 0.99.0 已把 MCP 与 codemode 一并纳入内置能力。[1] [3]

Pi 过去对 MCP 的批评并不含糊。Mario 去年在《What if you don’t need MCP at all?》里指出，常见 MCP Server 会带来工具描述膨胀、上下文开销，以及工具之间不容易组合的问题。他更偏向 Bash、CLI 和代码，因为代码可以组合，中间结果也不必逐步经过模型上下文。[2]

Pi 现在支持 MCP，并不意味着这些担忧突然失效。Earendil 给出的解释是，MCP 生态、模型能力和 Pi 自己的 Tool Infrastructure 都在变化。Pi 可以通过 codemode，把 MCP Tool 暴露给 QuickJS JavaScript Sandbox，让模型用程序组合调用，而不是把几十个 Tool 一次性摊进上下文。文章也承认，许多 MCP Server 仍然围绕“把 Tool 全部塞进 Context”设计；Pi 希望把 MCP 用得更接近带智能发现能力的 OpenAPI，并尽可能返回结构化数据。[1] [3]

我不觉得改变判断需要被视作立场问题。技术选择本来就应当随着条件变化。让我更在意的是另一个更工程化的区别：Pi 改善了自己使用 MCP 的方式，不等于不同 Agent 与不同 Server 之间的行为已经因此趋同。

去年有一段时间，我在做 MCP Server：接入不同 Agent，处理鉴权，排查兼容问题。那段经验留下的不是对某个 Tool Schema 的执念，而是一个很具体的习惯：听到“这个 Agent 支持 MCP”时，接下来仍要确认 Client 的版本、鉴权实现、Tool 的加载方式、Resource 与 Elicitation 的支持情况，以及 structured output 是否会被真正消费。

同一个 MCP Server 在一个 Agent 上正常，在另一个 Agent 上出问题，通常不是谁故意没有遵循协议，而是双方对协议的能力边界和默认行为理解不同。“支持 MCP”因此更像一个起点，而不是完整的兼容性结论。

---


互操作性的缺口不在 Context

Anthropic 在 2024 年发布 MCP 时，目标说得很清楚：通过一个开放协议连接 AI 应用与外部系统，包括数据源和工具，用统一标准减少重复集成。[4]

这也是 MCP 最有吸引力的承诺。重点不在 JSON-RPC 本身，而在于 Server 作者不用为每一个 Agent 单独写一套接入逻辑。

Context、Tool 数量、调用链长度和中间结果的体积，当然都是真问题，但它们已有相对直接的工程手段：按需加载、Tool Search、代码编排和 Sandbox 内过滤。更难处理的是另一类差异：Client 与 Server 可以都声称支持 MCP，却在能力、语义和降级策略上没有形成可预期的契约。

作为 Server 作者，我需要知道对面的 Agent 会如何加载 Tool、是否消费结构化输出、是否支持 Resource、是否能向用户发起交互；作为 Agent 作者，也需要知道 Server 是把 Tool 视作严格的程序接口，还是把它当作主要由模型阅读的自然语言入口。

例如，有的 Server 使用严格 Schema 并返回 JSON；有的 Server 直接返回大段 Markdown；有的依赖 Resource；有的需要 Client 参与用户确认；还有的已经把 UI 放进 Apps。Client 端也存在同样的差异：有的全量加载 Tool，有的做 Tool Search，有的通过 Code Mode 调用，有的只实现基础子集。

这些选择各自都有合理的使用场景。问题在于，协议名称相同并不能自动把它们变成相同的产品能力。一个 Tool 声明了输入 Schema，并不自动规定分页、错误码、幂等性、长任务的状态表达，或一段文本究竟是结果、解释还是给模型的操作建议。对于模型而言，这些含混之处可以被推理能力吸收；对于需要重复运行、审计和组合的系统，它们会重新变成接口契约问题。

这也是为什么“工具调用成功”与“系统已经互操作”之间还有一段距离。前者说明消息到达了对方，后者还要求双方对能力语义、错误处理和关键路径的降级方式形成足够稳定的共识。MCP 目前覆盖了其中一部分，但没有，也不必试图替所有产品把这一层约定完。

![同样的协议连接到不同 Host，却会遇到完全不同的能力与结果](/gallery/mcp-will-fail/same-protocol-different-worlds.webp)

---


同一协议下的语义差异

Structured Output 是一个很具体的例子。MCP 后来增加了 outputSchema 和 structuredContent；2025 年的工具规范已经明确了它们的语义，2026-07-28 又放宽到更多 JSON Schema 2020-12 关键字，并允许 structuredContent 使用任意符合 Schema 的 JSON 值。[5] [7]

这使 Tool 更接近程序接口，也让 Server 可以明确表达结果的结构。但兼容旧客户端时，协议仍建议 Server 同时把结构化结果序列化进 TextContent，照顾只读取 content 的实现。[5] 这不是 SDK 自动替开发者完成的事：官方 Ruby SDK 的 Response 同时支持 content 与 structuredContent，却不会把后者自动序列化回文本，Server 作者仍需明确维护兼容层。[6]

这里没有简单的对错。对于需要统计、筛选或继续调用的数据，结构化结果更合适；对于由模型解释给用户的结果，自然语言又更直接。困难在于调用方必须预先知道自己拿到的是哪一种，或者承担把自然语言重新解析成结构化数据的成本。

标准能统一传输的外形，不代表它已经统一了结果在产品中的角色。对我来说，这才是 MCP 互操作性讨论里更值得继续细化的部分。

---


鉴权让兼容边界更明显

返回格式造成的通常是额外处理；鉴权差异更容易直接落到用户体验上。去年做 MCP Server 时，常见情况是：Client 不支持认证，或支持的版本不同，或授权页完成后回到 Client 仍然无法调用。Resource 的处理、Client Registration、localhost redirect 的细节，都可能决定最后一次 Tool Call 是否成功。

MCP 在 2026 年新版规范的说明中也承认，Authorization 是实现者花费最多集成时间的领域之一。2026-07-28 的更新继续调整了 iss 验证、Dynamic Client Registration 的 application_type，以及客户端身份与 issuer 的绑定。[7]

这些变化有必要，尤其是安全相关的变化不应当为了兼容性而停下来。但版本演进有一个很现实的节奏：规范会更新，Client、SDK、Server 和企业自己的 OAuth 服务不会在同一天完成升级。

因此，Server 作者维护的往往不是一个抽象的“支持 MCP”，而是一组明确的组合：

```text
MCP
× Client
× Client Version
× SDK Version
× Auth Implementation
× Server Implementation
```

认证尤其说明了“支持”不是二元状态。一个 Client 即便实现 OAuth，也可能与 Server 在授权发现、redirect、token 刷新、scope、audience 或企业身份提供商的约束上不同。Server 作者不能假设任意已认证的 Client 都会走同一条流程，Client 也不能假设所有 Server 都使用相同的授权部署方式。

每个具体故障都可以归因到某一环，但用户看到的是一个更简单的问题：为什么这个 Agent 能用，另一个不能。协议如果想减少集成成本，就需要把这种组合关系尽量变得可见、可检测，也可解释。对产品而言，除了协议版本，公开支持矩阵、可复现的兼容测试和清楚的错误信息同样重要。

---


Capability Negotiation 只解决了第一步

Capability Negotiation 很重要。Client 告诉 Server 自己支持什么，至少可以避免把不支持的能力当成理所当然。但它回答的是“有没有”，而不是“不支持时产品如何完成”。

例如，一个流程必须让用户确认：Client 有对应的交互能力时，Tool 可以走正常路径；Client 没有时，Server 需要决定是返回文字、拆成多个 Tool、保存中间状态，还是明确标记该功能不可用。再比如，一个应用必须依赖 UI 才能完成任务。Client 不支持 Apps 时，协议仍然可以降级为文本，但如果用户已经无法完成原来的流程，这种降级只能算传输层兼容，不能算产品层兼容。

我倾向于把这两层分开看：协议层保证消息仍然可达，产品层需要对关键能力、替代路径和失败模式作出设计。Capability 本身不应被当成全部答案；它只是让后续决策有了依据。

这意味着 Server 不应只列出“支持哪些 Feature”，还应说明哪些能力是完成关键路径的前提，哪些可以文本降级，哪些需要保存状态后交给用户稍后继续。对 Host 也是一样：Capability 的价值不只在初始化时返回一段声明，更在于运行时能否给出一致的执行与失败语义。协议可以提供表达机制，产品仍要为具体流程负责。

![管道仍然连通，用户却可能无法走完实际产品流程](/gallery/mcp-will-fail/pipe-not-product.webp)

---


Pi 改善的是 Harness 的使用方式

再回到 Pi。Earendil 对 codemode 的判断很有说服力：复杂 Tool Call 交给代码组合，往往比让模型反复调用、阅读结果、再决定下一步更可控。Mario 去年批评 MCP 时偏爱的也是代码和 Bash。2025 年 9 月，Cloudflare 公开提出 Code Mode：把 MCP Tool 的 schema 转成带类型与文档的 TypeScript API，让模型写代码组合调用，并把中间结果留在执行环境，只返回需要的最终结果。[8]

从这个角度看，Pi 的变化并没有放弃原来的执行哲学，而是把 MCP 接到这个执行路径的下方：

```text
以前：

CLI / API
    ↓
Bash / Code
    ↓
Composition
```

```text
现在：

MCP
    ↓
Codemode
    ↓
Composition
```

这是一种合理的接入方式。MCP 已经有足够大的生态，Agent 没必要因为不接受某一种默认用法就拒绝所有 Server。Pi 通过 Tool Metadata、Deferred Loading 和 Codemode，建立了自己更可控的工具使用层；Earendil 也明确说过，MCP 的组合问题尚未被彻底解决，不同 Server 与不同 Harness 的使用方式仍是变量。[1] [3]

我更愿意把这个变化理解为一个积极信号：优秀的 Harness 可以把协议用得更好，但 Harness 的改进与跨 Host 的语义一致性，是两件不同的工作。

![Harness 可以在基础管道之上完成发现、过滤、代码组合与上下文管理](/gallery/mcp-will-fail/harness-wraps-pipe.webp)

---


Extension 扩展了能力，也扩大了协调范围

MCP Apps 成为正式 Extension，本身并不意外。MCP Apps 不是 OpenAI 的私有协议，而是 MCP 的公开扩展；不过 Host 支持会随客户端、版本和渠道而变化。2026 年 1 月的官方公告列出 Claude Web/Desktop、Goose、VS Code Insiders 与 ChatGPT 的支持或上线状态，但这并不表示所有 Host 实现了同一组能力。[9]

微软的 MCP Apps 文档把这种现实写得很清楚。Microsoft 365 Copilot 支持 MCP Apps，同时也给出能力兼容表：部分接口可用，部分不可用；Display Mode 只覆盖一部分模式；文件上传、Modal 和若干生命周期回调存在差异。文档建议在运行时检测 API 是否存在，并准备 fallback。[10]

这不是实现质量的问题，反而是一种诚实的工程表达。跨平台 UI 本来就需要处理能力子集。OpenAI 的建议也是类似的：公共能力先使用 MCP Apps，MCP Apps 没有提供的 ChatGPT 专属能力再通过 window.openai 使用，并对扩展能力做 feature detection。[11]

但这也重新定义了 MCP 的承诺。应用作者若要跨 Host，通常要选择能力交集并准备降级；若要利用某个 Host 的完整体验，就要接受更明确的平台适配。这种成本并不会因为协议存在而消失，协议能做的是把成本放到更清楚、更一致的边界上。

后续真正有价值的工作，可能不是继续抽象地宣布“兼容 MCP”，而是沉淀更具体的 profile、测试夹具和能力描述。例如，哪些 UI 调用可用、返回结构的大小与类型边界是什么、没有 UI 时如何继续、任务中断后由谁恢复。这样既不要求所有 Host 放弃差异，也能让差异不再完全依赖开发者手工摸索。

---


MCP 可能更适合成为稳定的基础层

MCP 最初的结构很简洁：

```text
Agent
  │
 MCP
  │
Tools / Data
```

随后协议逐步增加了 Tool、Resource、Prompt、Sampling、Elicitation、Tasks、Apps、Extension 与 Authorization。每一个能力单独看都有现实理由，但它们并不都属于同一层。

2026-07-28 的调整反而说明核心协议正在重新收敛：核心改为 Stateless，移除了原来的 initialize/initialized handshake 和 protocol-level session；Tasks 移出实验性核心，成为官方 Extension；Roots、Sampling 和 Logging 被标记为 deprecated，但仍在兼容窗口内。[7]

我认可这种把边界说清楚的方向。MCP 可以稳定地表达：这里有一个能力，它接受什么输入，产生什么输出，如何被调用。Tool 的发现时机、是否延迟加载、是否使用 Code Mode、Context Management、多 Agent 调度和 Sandbox 的创建，则更接近 Harness 的职责。

Codex 的变化也提供了一个相近的例子。OpenAI 移除了原来的 codex mcp-server；需要暴露 Codex 自身的鉴权、Conversation History、Approval 和 Agent Event 时，需要迁移到 app-server 协议；与此同时，Codex 仍能连接外部 MCP Server。官方明确写道，app-server 使用自己的 JSON-RPC，不是 MCP Server，也不是 drop-in replacement。[12]

这种拆分并不让系统更“简单”，但它避免了把 Agent Runtime 与 Tool Protocol 混作同一个概念。一个协议层的核心越保守，Host 与 Harness 越容易在上层实验；反过来，若把模型侧工作流、UI、状态、权限和执行环境都固定进同一层，每次演进都更容易牵动整条兼容链。

这并不意味着 Apps、Tasks 或 Sampling 没有价值。它更像是在提醒协议设计者区分两件事：一种能力是否需要被所有实现默认携带，和一种能力是否应当有标准化的扩展表达。把它们混在一起，短期看起来功能更齐全，长期却会让“最小可互操作集”越来越难说清。

---


CLI 的边界

批评 MCP 后，很容易把 CLI 当作更通用的替代方案。我和 Mario 的判断并不完全重合。

CLI 对 Coding Agent 的确自然：模型会 Bash、Pipe、grep、jq，也会写临时程序。它适合把多步操作留在代码里，让输出不必全部进入上下文。对于开发任务，这些优势非常实际。

但从“CLI 对 Coding Agent 很好用”推导到“CLI 是所有 Agent 的通用 Tool Protocol”，中间仍有不少条件。CLI 需要可运行的 Runtime、已安装的程序、文件系统和依赖管理；许多 Agent 任务只是读 CRM、查订单、改工单或调用几个远程 API，并不需要先获得一台完整的 Linux 机器。

OpenAI 现在的 Agent 架构给出了一种更按需的边界：Harness、Session 和 Environment 是不同概念。Agent 可以设置 environment.type = none；不需要运行代码或操作文件时，Harness 仍可调用 OpenAI 可访问的远程 HTTP MCP 和 Function Tools。只有真正需要命令、代码或文件操作时，才增加 Environment。[13]

我更认同这种安排：执行环境是一种按需出现的资源，而不是 Agent 存在的前提。一个读订单、查知识库或提交审批的任务，应该能够直接在受控服务连接上完成；一个需要编译、处理文件或运行浏览器自动化的任务，再申请相应的 Runtime。这样既减少了无意义的基础设施，也让权限与数据边界更容易被单独审计。

---


执行环境之外的身份与凭据

CLI 在个人电脑上很顺手，常常是因为登录态已经存在：GitHub、AWS、配置文件，甚至浏览器 Cookie 都在本地。模型执行 `gh issue list`，就能直接得到结果。

这套前提在临时 Sandbox 中会改变。任务可能被调度到新实例，执行结束后实例会销毁；凭据不能简单地随着每个 Sandbox 复制，也不适合把整个 Home Directory 挂载进去。企业场景还要考虑离职、撤权、审计与凭据泄漏后的处置。

Anthropic 的 Claude Code 云端 Sandbox 使用了另一种边界：真实 Git Credential 不进入 Sandbox，Sandbox 使用按会话限定的短期 Credential 访问外部 Proxy，由 Proxy 检查操作和目标，再在服务端附上真正的认证。这里讨论的是 Anthropic-hosted Cloud sessions，不应泛化到所有自托管运行方式。[16]

OpenAI 把两类边界拆得更清楚：Vault 将 MCP Credential 放在 Agent 配置之外，Agent 使用已认证连接时不会得到 Secret 值；Codex Cloud 的 Network Secret 则让程序只看到 Placeholder，由受控代理仅在允许域名的 HTTPS 请求中替换真正 Secret。[14] [15]

这些设计说明，可靠的 Agent 执行并不只依赖 CLI 或 Sandbox。Identity、Permission、Credential Broker、Network Policy、Sandbox Isolation 与 Audit 都属于更外层的控制系统；CLI 只是其中一种交互接口。

从系统设计上看，比较稳妥的模式是：控制层保存任务、授权引用、审批记录和可恢复状态；执行层只拿到完成当前步骤所需的短期权限与输入；步骤结束后，产物被写回受控的存储或业务系统，而不是留在某一台难以追踪的机器里。这样即使 Runtime 被回收，任务仍然有明确的归属和恢复路径。

![Sandbox 是按需执行资源，身份、权限与凭据应留在受控边界之外](/gallery/mcp-will-fail/ephemeral-sandbox-vault.webp)

---


Sandbox 是执行资源，不是 Agent 的身份

过去一年里，“给 Agent 一台电脑”逐渐成了一种直觉。它有文件、浏览器、软件和登录态，长期运行，看起来像一个数字员工。这个形态对某些任务有用，尤其是依赖桌面软件、专用硬件或长时间本地环境的工作。

但我不认为它应当成为默认的身份模型。Sandbox 更适合被看作 Agent 可调度的执行资源：需要时创建，任务完成后销毁，需要并行时扩展多个实例；只需要 Remote Tool 时，甚至不必创建。任务、状态、权限、审批、长期记忆和产物不应因为一个 Sandbox 被回收而消失。

这也是水平扩展中容易被忽视的地方。增加十个 Container 不难；如果身份、状态、Credential 和工作进度仍绑定在某个 Container 上，新增的只是更多状态孤岛，而不是更可调度的计算能力。

OpenClaw 的实际架构已经体现出控制层与执行层的区分：在启用 Agent Sandbox 的场景中，Gateway 控制进程留在 Host，受策略约束的 Tool Execution 可以交给 Docker、Podman、SSH、OpenShell 或其他 Sandbox Backend。Sandbox 默认并不一定开启。[17]

这里的分歧不在于常驻电脑是否有价值，而在于是否把它误当成 Agent 的身份。电脑可以是 Agent 调度的一个执行节点，不应是所有状态的唯一归宿。

---


组织数据与运行时应当分离

对于信息化程度较高的组织，重要数据通常并不以某个人的电脑为中心：代码在 GitHub 或企业 GitLab，文档在飞书云文档、Google Docs、Notion 或知识库，项目状态在项目系统，客户和订单在业务系统。电脑上保留的是工作副本、Cache、未 Push 的代码与临时文件，而不是组织唯一的事实来源。

本地电脑因此更像 Interface 与 Runtime，而不是 Data Center。打开飞书不代表文档住进 Mac；git clone 一个仓库，也不表示整个项目开始依赖某块 SSD。

给 Agent 准备长期电脑时，需要格外区分这两层。局部计算当然可能必须留在设备上，例如数百 GB 的文件、深度依赖桌面软件的流程、本地硬件、特殊 GPU 或不能离开设备的数据。但这些条件决定的是某一步计算在哪里执行，而不是整个 Agent 的状态必须住在哪里。

这种分离也能让“本地优先”和“云端优先”不再是非此即彼的选择。工作流可以把代码检查调度到本地，把长时间批处理调度到隔离 Sandbox，把 CRM 查询留在远程服务，把最终状态写回项目系统。真正需要标准化的不是 Agent 永久待在哪台机器上，而是这些执行节点如何取得有限权限、报告进度并交还产物。

---


从本地切入到服务化运行时

回头看早期的 v0 与 Lovable，这条线会更清楚。2023 年的 v0 是一个在线产品：用户描述想要的界面，v0 生成并迭代基于 React、Tailwind CSS 与 shadcn/ui 的代码，用户再把代码带走继续开发。[18]

Lovable 的历史也有类似变化。gpt-engineer 起初是面向终端开发者的开源项目，后来团队做了面向非技术用户的商业 Web 平台 gptengineer.app，并将其品牌重塑为 Lovable。开源命令行项目与商业 Web 产品需要分开看。[19]

本地 Coding Agent 的兴起同样有很实际的理由：开发者电脑上已有代码、Node、Git、浏览器和已登录的 CLI，Agent 可以很快进入工作，不必先搭一套额外基础设施。这是很好的切入点。

只是切入点不等于最终架构。随着任务变长、用户换设备、电脑休眠、网络中断和远程接管逐渐变成常态，产品自然开始引入云端 Sandbox、Remote Runtime、Credential Proxy、状态同步与任务接管。它们最终会指向一个独立于个人电脑、长期在线的控制层。

这个过程不必被理解成“本地路线走错了”。本地环境仍然是很多高价值任务的最佳入口，特别是在已有工作副本、私有网络或特定工具链的情况下。变化只是要求产品把本地环境当作一个可接入、可调度、可撤销的执行节点，而不再把它当作整个 Agent 的唯一宿主。

我的判断是，组织级 Agent 会逐渐形成更明确的结构：控制层长期在线，状态、身份与权限集中管理，Runtime 按需调度；需要本地时，把某个步骤调度到本地，需要代码环境时创建 Sandbox，只需要 Remote API 时就不创建 Runtime。这样做不是否定本地 Agent，而是让 Agent 与运行环境能够在需要时分开。

---


Agent 协议栈的分层问题

写到这里，我有一个仍在形成中的判断：MCP 的困难未必来自某一个 Feature 做错了，而是越来越多不同层次的职责被放进同一份协议里。Tool 不够时加入 Resource，需要模型参与时加入 Sampling，需要用户参与时加入 Elicitation，需要任务生命周期时加入 Tasks，需要 UI 时加入 Apps，之后再通过 Extension 扩展。

每一次选择都有理由，但放在一起会使协议的边界越来越宽。网络协议提供了一个有用的参照，不是因为 Agent 要照抄 OSI 七层，而是因为稳定的下一层抽象能让上层演进：IP 不需要理解网页，TCP 不需要理解数据库，HTTP 也不规定操作系统如何调度进程。

Agent 的通信体系可能也需要类似的边界。连接、可靠通信、长期状态与任务可以分别处理；Tool、Agent 协作和人机交互可能属于更上面的 Application Protocol；Code Mode、Skill、Sandbox、Tool Search 与 Multi-Agent Orchestration 则更接近 Harness。

具体应当怎样划分，我现在没有完整答案，也不认为此刻需要急着画出一张“Agent 七层模型”。但协议能力越多，Host 可以选择的组合也越多，“支持 MCP”表达的信息就越少。成熟协议的重要能力之一，是清楚说明哪些问题留给上层处理。

如果 MCP 最终能在 Agent Stack 中沉淀为一层稳定、清晰的能力接口，它反而可能拥有很长的生命周期。

---


不必急着寻找替代协议

讨论到这里，很容易顺着推到“那就重新设计一个更好的协议”。现实中的标准演进很少只由技术漂亮与否决定。OpenAI、Anthropic、Microsoft、既有 Server 与开发者社区，都有迁移成本、已有投入、产品节奏与平台利益需要考虑。

MCP 今天最大的优势也不在于已经完美，而在于它已经形成了生态：Server、SDK、用户预期和平台支持都在增长。一个 Agent 选择不支持 MCP，往往需要额外解释原因。这种惯性很强，也并不必然是坏事。

因此，标题里所说的“失败”并不是指 MCP 会消失。更可能的风险是：它广泛存在，却没有完成最初最吸引人的那部分承诺。如果协议只统一了基础管道，而决定产品是否可用的行为仍主要散落在 Host、Server、授权实现、UI 与运行时的私有选择里，开发者依然要为不同对方写大量适配。

这不是对 MCP 的否定。协议、Code Mode、Apps、Extension、CLI、Sandbox 和云端控制层各自都有充分理由，也会继续发展。更重要的是承认它们所在的层次不同，并把“能连通”“能调用”和“能稳定完成用户任务”分开衡量。

我仍然保留这个标题，是因为它提醒我不要把 Adoption 当作互操作性的完成。MCP 若能收敛为一层稳定的能力接口，并允许上层产品明确表达自己的约束与扩展，它未必会失败，反而可能比承担一切时活得更久。

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
