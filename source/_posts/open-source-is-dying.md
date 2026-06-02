---
title: Open Source 社区正在死去，先死在维护者不再相信陌生人
date: 2026-05-24 10:00:00
updated: 2026-05-24 10:00:00
tags:
  - 开源
  - 社区生态
  - AI
  - 信任危机
  - 简历流水线
categories:
  - [gallery]
featured_image: /gallery/open-source-is-dying/cover-new.jpg
author: chenli
description: AI 生成的低质量 PR 和培训机构批量制造的简历流水线，正在联手压垮开源社区的维护者。但这并非终局，开源的免疫系统正在苏醒，新的信任边界正在建立。
---
最离谱的信号，来自 vLLM。

vLLM 是当下最活跃的开源 AI 基础设施项目之一。它最初来自 UC Berkeley 的 Sky Computing Lab，现在已经成长为一个由很多高校、公司和超过 2000 名贡献者共同维护的开源项目 [1]。可就在这样一个站在 AI 浪潮中心的项目身上，也出现了一个很刺痛人的场景：有人在辅导机构的指导下提交 PR，把开源项目当成简历镀金场，把维护者当成免费审核员，把社区信用当成培训机构的宣传素材。

![被做成流水线的简历 PR](/gallery/open-source-is-dying/vllm-pr-screenshot.png)

那张截图里，左边是聊天记录：用户先发了一个 PR 截图，然后问「老师接下来怎么处理呢」。过了一会儿，又发了另一张截图，还 @ 了某个用户。最后，他发消息说「感谢老师，今天下午 pr 成功合入」。右边是一条社交平台帖文：恭喜同学 PR 合入 vLLM 社区，能一同见证并为 AI infra 社区的发展贡献力量。

如果只看结果，这像一次漂亮的开源经历。看完整个过程以后，它更像一条简历流水线。

这门生意的完整链条，比想象中更成熟。辅导机构收取 **3 到 5 万元**不等的培训费，教学生用 AI 工具批量生成低门槛、无意义甚至完全伪造的代码，向顶级开源项目发起「**PR DDoS**」——合并请求攻击。只要碰巧蒙混过关一次，学员的大厂面试就有了敲门砖。而这套千万级黑产付出的唯一成本，是那些远在海外、凭借热情用爱发电的开源维护者们，被迫充当了中国求职机构**免费的作业批改员**。

更荒诞的细节在于，vLLM 这次封禁的起因，是有人提交了一个声称修复「Eagle3 模型漏洞」的 PR。经过核心维护者熬夜审查，他们确认了一件事：**这个所谓的漏洞，根本就不存在。** 整件事从头到尾，是一次精心包装的虚假贡献。那家辅导机构在 PR 合入后，堂而皇之地在小红书发了一张喜报，打着「#面试辅导」「#vLLM」的标签引流。

培训机构要案例，学员要简历，维护者要读代码，开源社区要承担筛选成本。最刺痛人的地方在于，这里消耗的东西不是云资源，不是 CI 时间，也不是 GitHub 的存储空间，最被消耗的是维护者对陌生人的耐心。

vLLM 官方在 X 上的表达很克制：当 AI 让「虚拟贡献者」看起来越来越像真人时，真实的人类协作比以往更重要 [2]。这句话表面温和，实际已经带着警报。Open Source 社区正在死去，先死掉的并不是仓库、star、fork，也不是某个许可证。先死掉的是维护者对陌生人的默认信任。

## 失去承诺的提交，变成债务的 PR

过去，一个 PR 至少意味着某个人花了时间读代码、改代码、跑测试、写说明。它不一定正确，但背后通常有一个真实的人承担理解成本。现在，一个学生可以被辅导班推着去热门项目刷履历，一个 AI 代理可以在几分钟内生成礼貌的 Issue、完整的 PR 描述、看似合理的代码改动，甚至还会附上一段非常像人写的解释。生成成本接近零，验证成本仍然由人类承担。

GitHub 自己也承认了这个变化：生成式 AI 让代码、Issue 和安全报告可以大规模生成，创建成本下降了，但审查成本没有跟着下降。当低质量贡献的增长速度超过维护者的审查能力时，开源协作所依赖的信任就会开始承压 [3]。

这就是今天 Open Source 最深的裂缝。

一个 PR 以前像礼物，现在越来越像债务。维护者看到 PR，意味着要判断问题是否真实存在，要看方案是否合理，要读代码，要跑测试，要讨论兼容性，还要考虑这段改动以后由谁维护。tldraw 的维护者说得很清楚：一个打开的 PR 代表维护者的一种承诺，意味着它会被认真审查、认真考虑。正因为这个承诺需要有意义，tldraw 开始自动关闭外部贡献者的 PR，原因是他们看到了大量完全由 AI 工具生成的贡献，其中很多缺少上下文、误解代码库，而且作者几乎没有后续参与 [4]。

这就是 AI PR 最不公平的地方：提交者可以没有承诺，维护者却天然背上承诺。

Ghostty 的 AI 政策说得更直接。Ghostty 强调项目由人维护，每一个讨论、Issue 和 PR 都会由人阅读和审查；用低投入、低理解的工作去接近这个边界，是不尊重人的，因为它把验证负担转嫁给维护者 [5]。开源维护者反感的并不是工具本身。真正让他们疲惫的是，一些人自己也不理解那段代码，却把解释、验证、返工和情绪劳动全部丢给维护者。

## 消耗战的蔓延：从代码到安全报告

这种消耗已经不只发生在代码 PR 里，也发生在安全报告里。

curl 的经历说明了问题的严重性。Daniel Stenberg 在 2025 年写到，curl 收到的安全报告里，AI slop 大约占 20%，而当年只有大约 5% 的提交最终被确认是真实漏洞 [8]。到 2026 年 1 月，curl 直接结束了 bug bounty 项目。Stenberg 写到，过去确认率高于 15%，2025 年跌到 5% 以下，最终他们取消所有金钱奖励，希望减少低质量报告的动机 [9]。

bug bounty 原本是为了鼓励更多人帮项目变安全，最后却被低质量报告拖成了维护者的心理负担。奖励吸引了真正的研究者，也吸引了想用 AI 批量制造报告的人。对后者来说，提交一个报告很便宜；对 curl 来说，读完、反驳、解释、归档，每一步都很贵。

Linux 也没有躲开。Linus Torvalds 近期谈到，AI 生成的安全报告让 Linux 安全列表几乎难以管理，问题主要来自大量重复报告：不同的人用同样的工具发现同样的东西，然后把没有修复、缺少理解的报告交给维护者 [11]。

当一个维护者收到第 100 个 AI 生成的 Issue，他失去的不只是 10 分钟。他失去的是对下一个新人的耐心。当一个项目自动关闭外部 PR，它失去的不只是一个入口。它失去的是让陌生人慢慢成长为贡献者的机会。

## 免疫系统的苏醒：重建信任边界

听到这里，你可能会觉得开源已经走向末路。但如果你仔细看那些维护者的反应，你会发现，这其实是开源生态的免疫系统正在苏醒。

以前开源项目想要更多贡献，现在很多项目想要更少噪音。以前维护者想降低门槛，现在他们开始重新提高门槛。以前「欢迎贡献」是一句真心话，现在它后面往往跟着一长串规则：先开 Issue，先讨论，先证明你理解问题，先披露 AI，先跑测试，先别浪费大家时间。

![新的边界](/gallery/open-source-is-dying/new-boundary.jpg)

GitHub 已经开始把这称为开源的「Eternal September」。它在官方博客里说，贡献摩擦下降以后，维护者需要新的信任信号、分流方式和社区解决方案；GitHub 已经推出仓库级 PR 控制，让维护者可以限制 PR 创建者，甚至关闭 PR [3]。

这不是开源精神的消失，这是开源社区在自救。

过去，贡献的成本天然较高，这个过程本身就是一种筛选。今天，当技术把「贡献外观」变得非常便宜时，社区必须建立新的边界来保护自己。RPCS3 项目把话写进了 README：它允许 AI 用于研究和逆向分析，但要求贡献者完全拥有并理解自己提交的代码；PR 如果由 AI 代理或自动化工具打开，必须披露 AI 参与范围和人工测试情况 [12]。

所以，当我们说 Open Source 社区正在「死去」时，死去的其实是那种天真的、毫无防备的「默认信任」。而正在重生的，是一个更成熟、更具防御性、也更看重真实人类承诺的新生态。

开源过去最动人的地方，是一个人可以在深夜修好一个 bug，把补丁发给一个从未见过的人，然后两个人因为一段代码建立微弱但真实的连接。这种连接确实正在被机器噪音和简历流水线冲击。但只要还有维护者愿意站出来立下规矩，只要还有开发者愿意去理解代码背后的逻辑，开源的火种就不会熄灭。

它只是在经历一次痛苦的蜕皮，为了在 AI 时代重新找回人与人之间那份真实的信任。

## 参考资料

[1] GitHub - vllm-project/vllm: https://github.com/vllm-project/vllm
[2] vLLM on X: https://x.com/vllm_project/status/2058358072020779391
[16] Max For AI on X - 中国天才们正在排队「崩开源」: https://x.com/maxforai/status/2058910873947910558
[3] The GitHub Blog - Welcome to the Eternal September of open source: https://github.blog/open-source/maintainers/welcome-to-the-eternal-september-of-open-source-heres-what-we-plan-to-do-for-maintainers/
[4] tldraw Contributions policy: https://github.com/tldraw/tldraw/issues/7695
[5] Ghostty AI Policy: https://github.com/ghostty-org/ghostty/blob/main/AI_POLICY.md
[6] GitHub Community Discussion #159749: https://github.com/orgs/community/discussions/159749
[7] scikit-learn Issue #31679: https://github.com/scikit-learn/scikit-learn/issues/31679
[8] daniel.haxx.se - Death by a thousand slops: https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/
[9] daniel.haxx.se - The end of the curl bug-bounty: https://daniel.haxx.se/blog/2026/01/26/the-end-of-the-curl-bug-bounty/
[10] The Register - Godot maintainers struggle with AI slop PRs: https://www.theregister.com/software/2026/02/18/godot-maintainers-struggle-with-demoralizing-ai-slop-prs/4206219
[11] The Verge - Linus Torvalds on Linux AI security bugs: https://www.theverge.com/tech/932312/linus-torvalds-linux-ai-security-bugs
[12] RPCS3 README: https://github.com/RPCS3/rpcs3/blob/master/README.md
[13] YouTube - Open source is dying: https://www.youtube.com/watch?v=l8pQeVVaqpY
[14] BigGo Finance - Open source is dying transcript: https://finance.biggo.com/podcast/14c7040abae2703f
[15] Jeff Geerling - AI is destroying Open Source: https://www.jeffgeerling.com/blog/2026/ai-is-destroying-open-source/
