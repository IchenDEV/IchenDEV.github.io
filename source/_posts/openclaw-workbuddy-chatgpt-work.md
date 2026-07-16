---
title: WorkBuddy和ChatGPT Work走红，正在给「养虾时代」拨乱反正
date: 2026-07-16 10:00:00
updated: 2026-07-16 10:00:00
tags:
  - AI
  - Agent
  - OpenClaw
  - WorkBuddy
  - ChatGPT Work
categories:
  - [gallery]
featured_image: /gallery/openclaw-workbuddy-chatgpt-work/cover.jpg
author: chenli
description: 从OpenClaw的狂热跟风，到WorkBuddy和ChatGPT Work的务实回归，AI Agent正在经历一场从“养宠物”到“完成工作”的拨乱反正。
---

# WorkBuddy和ChatGPT Work走红，正在给「养虾时代」拨乱反正

2026年的AI办公，绕了一个很有中国特色的弯。

1月12日，Anthropic推出Claude Cowork研究预览版，也就是很多人口中的「Claude Work」。它可以读取本地文件、调用工具、处理研究和文档任务，方向很清楚：把智能体装进一个普通人能够控制的桌面产品里。可它在中文互联网没有掀起同等规模的热潮。

随后抢走全部注意力的是OpenClaw。1月29日，OpenClaw官方称项目已经获得超过10万颗GitHub星标，一周访问量达到200万。开放源代码、本地部署、消息软件入口、高权限执行，再加上极其适合传播的龙虾标志，让它迅速从开发者项目变成中文互联网的集体游戏。([Anthropic][1])

OpenClaw被叫作「养虾」，安装、调教和维护它，也被描述成养宠物。Hermes Agent随后因为名称和「爱马仕」产生联想，又被叫作「养马」。一时间，AI智能体的竞争看起来像电子宠物展览：谁养得多，谁给的权限大，谁接的Skill多，谁就更接近未来。([Sohu][2])

几个月以后，OpenClaw开始退潮，WorkBuddy的日活排名变得好看，ChatGPT Work也正式发布。市场终于重新讨论一个朴素的问题：普通人为什么需要AI智能体？

答案逐渐清楚了。用户需要的是把工作做完。

## OpenClaw赢得了传播，Claude Cowork更早押中了方向

![AI Agent 的三阶段演进](/gallery/openclaw-workbuddy-chatgpt-work/cover.jpg)


OpenClaw在中国火过Claude Cowork，有很现实的原因。

截至目前，中国大陆仍未被列入ChatGPT和Claude的官方支持地区。Anthropic还明确表示，没有在中国提供Claude的商业访问。对中国开发者和大厂来说，开放源代码、可以本地部署、能够接入国产模型的OpenClaw，显然更容易研究、包装和推广。([OpenAI Help Center][3])

OpenClaw还提供了一种很强的「获得感」。安装完成后，它可以访问文件、调用命令、操作浏览器、连接聊天软件。用户能够看见它在电脑里行动，这种视觉刺激远远强于聊天框里生成一段文字。

问题也由此产生。权限感被当成能力，参与感被当成生产力，成功安装被当成真实需求。

Claude Cowork当时走的是另一条路线。它把文件访问、工具调用和多步骤任务放在Anthropic管理的产品界面中，权限相对受控，使用者也不必自己处理服务器、模型接口、依赖环境和插件来源。它在中文互联网上显得不够刺激，却更接近后来WorkBuddy和ChatGPT Work共同选择的路线：产品方承担复杂性，用户承担决策。

## Manus更早看见了，Agent应该组合Skill，少扮演岗位

在这轮对「养虾时代」的重新评价里，Manus值得单独补上一笔。

Manus在2025年春天亮相时，已经提出一个很清楚的目标：做能够处理各种计算机任务的通用Agent。用户给出目标，Agent自行研究资料、调用工具、编写和执行代码、处理文件，最后交付网页、报告、表格或者其他成果。Manus团队后来回顾产品起点时，也把使命概括为让一个自主Agent处理「任何基于计算机的任务」。([Manus][4])

这套方向比后来流行的「AI程序员」「AI运营」「AI销售」更早走了一步。

过去一年，很多Agent产品喜欢复制人类公司的组织图。一个Agent扮演经理，一个Agent扮演研究员，一个Agent扮演程序员，再安排一个Agent负责审查。演示视频里，它们会开会、分工、汇报，甚至互相评价。看起来像一家公司突然拥有了几十名数字员工。

问题在于，模型并不需要先获得一个人类职位，才能完成某一类工作。

Manus联合创始人季逸超在2025年底的一次长访谈中谈得很直接。他认为「模型跟人一点都不像」，把模型或者Agent强行同人类习惯的思考体系和组织分工对齐，很可能从起点上就选错了方向。([Wave AI Podcast Notes][5])

Manus在Wide Research中进一步把这个判断做成了产品架构。它没有预设「经理」「程序员」「设计师」之类的固定角色。参与并行任务的每一个子Agent，都是能力完整的通用Manus实例。系统根据目标拆分任务，再让多个通用Agent并行处理，而不是先给每个Agent写一份职位说明书。Manus官方特意把这点列为它同传统多Agent系统的主要区别。([Manus][6])

这里体现了Manus真正具有前瞻性的地方。

Agent的能力单位应当是Skill，角色更适合作为一种面向用户的界面说法。

一个通用Agent可以同时拥有网页研究、数据清洗、代码执行、图表制作、演示文稿生成、公司模板调用、邮件发送和文件管理等多个Skill。面对一项市场研究任务，它可以临时组合其中几种能力；面对一次产品发布，它又可以组合调研、写作、设计、建站和数据分析能力。

整个过程不需要虚构五名数字员工，也不需要让几个Agent模拟部门开会。用户只需要提出目标，系统负责选择和组合合适的Skill。

2026年1月，Manus宣布完整接入Agent Skills开放标准。按照Manus的定义，Skill可以把专业知识、工作步骤和经过验证的做法封装成可复用资源，由通用Agent在需要时发现和加载。多个独立Skill还可以组合成较长的工作流程，让同一个Agent从通用能力进入具体任务。([Manus][7])

这一点也能帮助我们重新理解OpenClaw。

OpenClaw的Skill生态本身很有价值。它证明了Agent可以通过外部模块持续扩展能力，也让大量开发者开始思考工具调用、权限管理和工作流程复用。中文互联网随后把这条路线讲歪了。原本应该讨论「怎样让一个Agent可靠地调用更多Skill」，后来变成了「怎样养出一个像人的数字员工」。

大厂跟进时又进一步放大了这种误读。产品页面上出现大量「AI员工」「智能团队」「数字分身」，仿佛给模型安排职位、名字和头像，就完成了Agent产品设计。很多团队甚至直接照搬人类公司的层级结构，让Agent互相汇报、反复讨论，把Token消耗包装成组织协作。

这类设计非常适合录制演示，真实工作里的价值却需要重新核算。一次任务原本可以由一个通用Agent调用三个Skill完成，产品却安排五个角色Agent开会、转述和复核。步骤增加以后，等待时间、费用、信息损失和错误来源也会跟着增加。

Manus提供了另一种答案：保留模型的通用性，根据任务组合Skill，在任务可以并行时复制通用Agent实例。角色无需固定，能力可以增加，任务完成方式由模型结合环境决定。

角色模仿让Agent看起来更像人。

多Skill组合让Agent更有可能完成工作。

这也是Manus比「养虾」「养马」更有前瞻性的地方。它没有把未来押在数字宠物和数字员工的人设上，而是更早把Agent理解成一种通用执行系统。这个系统可以调用工具、加载专业Skill、并行处理任务，并根据结果调整行动。

WorkBuddy和ChatGPT Work今天重新获得关注，从产品方向看，也是在回到类似的逻辑。用户面对的是一个统一工作入口，不需要先挑选「AI运营」还是「AI分析师」。产品根据任务调用文件、浏览器、代码、表格、演示文稿和企业应用能力，最终交付用户能够继续编辑和使用的成果。

所以，这场拨乱反正还应当补上一句：

Claude Cowork较早看见了受控桌面Agent，Manus较早看见了通用Agent和多Skill组合。OpenClaw让整个中文互联网看见Agent能够动手，却也把市场带进了养宠物、造人设和堆权限的岔路。WorkBuddy与ChatGPT Work的走红，正在把讨论重新带回交付、成本、权限和真实用户。

真正值得保留的Agent路线，从来都不需要模仿一家人类公司。

一个足够通用的Agent，加上一组能够随任务组合的Skill，已经更接近未来。

![Agent角色扮演 vs 多Skill组合](/gallery/openclaw-workbuddy-chatgpt-work/agent-skill-comparison.jpg)


## 中国大厂把一个极客实验推成了全民饲养运动

![大厂跟风OpenClaw](/gallery/openclaw-workbuddy-chatgpt-work/companies-following-openclaw.jpg)


2026年3月，OpenClaw热度进入高峰。腾讯总部曾出现近千人排队安装OpenClaw的场面。腾讯、字节跳动、阿里巴巴陆续推出相关智能体产品，腾讯云、阿里云、火山引擎、百度智能云、京东云以及电信运营商也迅速提供OpenClaw部署服务。([Sina Finance][8])

回头看，年初那轮跟进确实称得上瞎搞。

大厂最该先验证的，是普通用户有哪些高频任务，智能体可以节约多少时间，每次任务要消耗多少钱，错误能否被发现，权限失控后怎么撤回。实际传播却集中在「你养虾了吗」「给虾买一台Mac mini」「虾能不能替你上班」。

「能安装」被写成「有人需要」，「权限很大」被写成「能力很强」，「可以调用很多Skill」被写成「能够稳定交付」。三个概念被混在一起，制造出了巨大的技术幻觉。

商业上的动力也很容易理解。据21财经援引的行业人士估算，OpenClaw重度用户每天可能消耗3000万至1亿Token。这个数字属于行业估算，不能代表普通用户，却足以说明部署潮为什么会受到云厂商和模型厂商欢迎。更多智能体意味着更多服务器、更多模型调用和更高的Token消耗。([21经济网][9])

这轮传播最糟糕的部分，带着明显的「技术邪教式」结构。这里的「邪教」指传播方式。

安装成了入门仪式，Mac mini成了供品，Token账单像香火。任务失败以后，问题经常被归结为「你不会配置」「Skill装得不够」「模型没选好」「权限给得太少」。产品责任被一层层推回用户，使用者还要为折腾本身感到自豪。

当一个生产力工具要求普通人先学会服务器运维、密钥管理、权限隔离、日志排查和插件审计，它已经把自己的工作转嫁给了用户。

## 卸载潮让OpenClaw的真实成本浮出了水面

![OpenClaw卸载潮：隐藏的真实成本](/gallery/openclaw-workbuddy-chatgpt-work/uninstall-wave.jpg)


热闹过去以后，OpenClaw面对的是普通人的日常任务。

21财经旗下媒体在春季退潮阶段报道，OpenClaw的微信搜索热度一度降至峰值附近的3%。受访用户反复提到三个问题：成本高、风险高、产出低。有人多次安装和卸载，有人部署了数个智能体，最后大部分处于闲置状态。维护、调试和纠错花掉的时间，甚至超过智能体节省的时间。市场上还出现了付费帮用户卸载OpenClaw的服务。([21经济网][10])

安全问题更加具体。

2026年3月，国家网络与信息安全信息通报中心发布风险提示。通报称，当时全球可从互联网访问的OpenClaw活跃资产超过20万个，中国境内约有2.3万个；约85%的暴露资产存在安全风险。通报还提到，OpenClaw已经披露258个漏洞，对3016个ClawHub技能进行分析后发现336个恶意技能，占比约10.8%。风险涉及默认配置、公开暴露、插件供应链、权限滥用和敏感数据泄露。([Jiangsu Netcom][11])

这些数字说明，高权限智能体的风险并不抽象。它读取的可能是工作文件，拿到的可能是浏览器登录状态，调用的可能是付费模型接口，执行的可能是删除、发送、上传或者修改操作。一个来源不明的Skill，就可能获得远超普通浏览器插件的权限。

卸载潮因此可以理解为一次正常的风险重新定价。用户开始意识到，OpenClaw表面上免费，实际成本包括硬件、云服务器、模型调用、安装时间、维护时间、故障时间以及安全风险。

这不等于OpenClaw已经失去价值。截至2026年7月，OpenClaw官网仍显示超过34.6万颗GitHub星标，项目也在持续发布新版本。对于懂技术、需要自托管、愿意审计代码并且确实需要高自由度的用户，它仍然是一套有价值的基础设施。([OpenClaw][12])

真正的问题出在用户错配。一个适合开发者探索智能体边界的项目，被大厂和自媒体包装成了人人都该饲养的数字员工。

## WorkBuddy的增长说明普通用户愿意为省事投票

![WorkBuddy的受控Agent架构](/gallery/openclaw-workbuddy-chatgpt-work/workbuddy-architecture.jpg)


WorkBuddy同样在3月上线，但它后来跑出的数据，说明了另一种需求。

腾讯在2026年第一季度财报中称，按照日活跃账户数计算，WorkBuddy已经成为中国最受欢迎的效率型AI智能体服务。不过腾讯只披露了排名，没有公开绝对DAU。

第三方数据提供了另一个观察角度。易观报告在公开传播中的口径显示，WorkBuddy的PC端月访问量约为885万，排名第一，约为第二名的2.6倍。需要注意，相关二次报道对统计月份的描述并不完全一致，而且该口径只计算PC端交互，不包含移动端、浏览器嵌入和其他入口。把「885万月访问量」直接写成「885万DAU」，或者进一步写成网传的「1300万DAU」，都缺乏可核验依据。([TMTPost][13])

即便排除夸张数字，WorkBuddy的增长趋势仍然值得注意。它没有要求普通用户从命令行开始，也没有把模型选择、依赖安装、密钥配置和版本维护全部扔给用户。

它把这些麻烦收回了产品内部。

WorkBuddy接入腾讯文档、腾讯会议、企业微信、腾讯网盘、TAPD等办公系统，并提供面向企业的统一身份、权限管理和安全审计。用户可以从桌面端或者移动入口发起任务，产品负责规划步骤、调用工具和生成文档、表格、演示文稿等结果。([Tencent Cloud][14])

这种设计很符合中国真实办公环境。中国用户的工作资料往往散落在微信、企业微信、腾讯文档、飞书、钉钉、网盘和内部业务系统里。一个智能体即使模型能力很强，只要拿不到这些入口，仍然很难完成完整任务。

企业用户还会追问权限由谁授予、文件去了哪里、操作有没有记录、员工离职后怎样收回访问权。对个人极客来说，这些问题可能显得扫兴；对公司来说，它们决定了产品能否采购和部署。

易观对智能体产品进行任务测试时还发现，WorkBuddy的计划模式会先澄清需求，并给出预计消耗范围。面对预算和时间条件互相冲突的任务，它能够指出限制，而不是假装任务已经完成。当然，它也存在确认次数较多、行为偏谨慎等问题。([TMTPost][13])

这种谨慎有时会让人觉得麻烦，可它至少把不确定性展示给用户。对于会发送邮件、修改文件、调用付费接口的智能体来说，适当的确认本来就属于产品能力。

WorkBuddy的优势不在于拥有最大的权限。它把普通用户无力承担的部署、维护、权限控制、工具接入和风险管理，逐渐变成产品方应当完成的工作。

这才叫适配真实用户。

## ChatGPT Work把全球智能体路线也拉回了「完成工作」

![全球Agent路线的产品共识](/gallery/openclaw-workbuddy-chatgpt-work/global-consensus.jpg)


2026年7月9日，OpenAI正式推出ChatGPT Work。

按照OpenAI的介绍，ChatGPT Work可以跨应用和文件工作，连续执行较长时间的研究、分析和操作任务，并交付文档、电子表格、演示文稿、报告和网站等结果。它还支持定时任务，让一部分工作可以按照设定周期运行。([OpenAI][15])

这套描述里，重点已经从「智能体有多自由」转向「最终能交付什么」。

ChatGPT Work目前还没有公开可核验的活跃用户数据。因此，关于它的「爆火」，更准确的理解是产品发布后迅速获得行业关注，以及OpenAI将ChatGPT、Codex、文件工具和应用连接能力整合进统一工作入口所带来的市场势能。WorkBuddy有初步使用数据，ChatGPT Work暂时体现为产品方向和品牌影响力，两者的证据强度需要分开看。

它与Claude Cowork、WorkBuddy其实形成了相似的产品共识：智能体可以执行多个步骤，可以调用工具，也可以工作较长时间；产品方同时要提供权限边界、过程可见性、错误控制和可编辑的最终结果。

全球市场正在重新发现Claude Cowork年初已经给出的答案。

## 中国市场最终会奖励懂办公环境的智能体

ChatGPT Work在全球市场具有很强的模型、工具和应用生态优势，但中国大陆目前仍不在ChatGPT官方支持地区内。Claude也面临相似限制。直接把海外产品搬进中国市场，无法自动解决入口、账户、支付、数据治理和企业系统接入问题。([OpenAI Help Center][3])

这给WorkBuddy以及其他中国办公智能体留下了很大的空间。

中国特情并不只是中文能力。微信和企业微信是沟通入口，腾讯文档、飞书文档和WPS是文件入口，钉钉和内部系统是流程入口，企业采购还要求身份统一、权限分级、操作留痕和数据边界。

模型评测高出几分，未必能抵消工作入口缺失。Skill数量很多，也无法替代稳定的账户体系和错误恢复机制。

WorkBuddy真正值得大厂研究的地方，就在这里。它借到了OpenClaw完成的市场教育，也兼容了一部分技能生态；随后又把产品重心放回中国用户每天使用的办公软件、聊天入口和组织管理体系。

腾讯在这场变化中尤其有代表性。它既参与过「排队装虾」的热闹，也推出了更受控制的WorkBuddy。最终跑出DAU排名的，是后面这条路线。

用户用使用时长和留存做出了选择。

## 拨乱反正以后，AI同事终于要接受普通的绩效考核

一个真正可用的AI同事，不该要求用户先成为运维工程师、安全工程师和插件审计员。

它需要做到几件很朴素的事：打开就能使用，费用能够预估，权限尽量少，关键操作需要确认，执行过程可以查看，错误以后能够停止，结果能够编辑，数据去了哪里也说得清楚。

智能体能力越强，产品提供的约束就应该越完整。让用户承担全部风险，再把这种状态称为「自由」，只会重复OpenClaw退潮时暴露的问题。

回头看，年初那轮中国大厂跟风确实应该受到批评。一个供技术用户测试边界的开源项目，被包装成人人都要饲养的数字宠物；云资源、Token消耗和入口竞争，被包装成生产力革命。有人负责造梗，有人负责摆摊，有人负责卖服务器，普通用户则承担安装、维护、故障、账单和安全责任。

这就是当时的瞎搞。

更值得批评的是那套技术邪教式话术。产品不好用，责任归用户；任务没完成，责任归提示词；费用太高，责任归模型选择；出现风险，责任归权限配置。所有失败都可以被解释，唯独产品不需要接受考核。

WorkBuddy的增长和ChatGPT Work的走红，正在结束这种叙事。

AI同事的第一能力应该是按时交付。它要知道自己能做多少，出错以后能够停下来，账单让人看得懂，最后把文件交出来。

至于表演自由，可以排在很后面。

这才是对「养虾时代」真正的拨乱反正。

![AI同事绩效考核](/gallery/openclaw-workbuddy-chatgpt-work/ai-performance-review.jpg)


[1]: https://www.anthropic.com/news/introducing-anthropic-labs?utm_source=chatgpt.com "Introducing Labs"
[2]: https://www.sohu.com/a/1022909580_639898?utm_source=chatgpt.com "“养虾”“养马”之后，企业AI的下一站是什么？"
[3]: https://help.openai.com/articles/7947663-chatgpt-supported-countries?utm_source=chatgpt.com "ChatGPT Supported Countries"
[4]: https://manus.im/blog/what-we-saw-in-the-past-three-months-and-what-we-see-in-the-future "What we saw in the past three months. And what we see in the future."
[5]: https://pod.wave.co/podcast/jun-14c5d25c-c21b-42a7-a307-be6b58bcd235/128-manus2025?utm_source=chatgpt.com "128. Manus决定出售前最后的访谈：啊，这奇幻的2025年漂流 ..."
[6]: https://manus.im/blog/introducing-wide-research "Introducing Wide Research"
[7]: https://manus.im/blog/manus-skills "Manus AI Embraces Open Standards: Integrating Agent Skills to Usher in a New Chapter for Agents"
[8]: https://finance.sina.com.cn/stock/t/2026-03-09/doc-inhqksxn6971073.shtml "巨头集体下场，阿里、字节之后，腾讯也推出了自家“小龙虾”！|AI_新浪财经_新浪网"
[9]: https://www.21jingji.com/article/20260311/herald/d1181eed5b6e2f8ef8415cd10f63ce82.html?utm_source=chatgpt.com "国产AI厂商集体下场“养虾”，OpenClaw不是终局"
[10]: https://www.21jingji.com/article/20260509/herald/0d2056b593b89d570e4999777f0acb92.html "“养虾人”自述：我为什么卸载龙虾？ - 21经济网"
[11]: https://www.jswx.gov.cn/anquan/zixun/202603/t20260313_1315342.shtml "国家网络安全通报中心发布OpenClaw安全风险预警 | 江苏网信网"
[12]: https://openclaw.ai/?utm_source=chatgpt.com "OpenClaw — Personal AI Assistant"
[13]: https://www.tmtpost.com/8041727.html "给五款国产Agent上了压力测试，WorkBuddy直言\"做不到\"，豆包却在“打圆场”-钛媒体官方网站"
[14]: https://cloud.tencent.com/product/workbuddy?utm_source=chatgpt.com "WorkBuddy"
[15]: https://openai.com/index/chatgpt-for-your-most-ambitious-work/?utm_source=chatgpt.com "ChatGPT is now a partner for your most ambitious work"
