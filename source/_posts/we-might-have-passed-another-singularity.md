---
title: 我们可能又迈过了一个奇点
date: 2026-09-01
categories: gallery
featured_image: /gallery/singularity/infinite-movie-neutral.webp
description: 当生成速度开始追上感知速度，视频不再等剪完才播放，界面和空间也开始在人抵达之后继续生长。
---

今天早上，我停在 fal.live 的页面上看了一会儿。

屏幕里的节目还在播，旁边已经挂出了下一段剧情的几个选项。倒计时往下走，票数不断变化。观众选中的那个方向，会被写进接下来的画面。

这本来只是一个 AI 演示。可看久一点，会生出一种奇怪的感觉：节目似乎没有一份藏在后台的完整母带。它一边播放，一边等待屏幕外的人替它决定未来。

*电影还没拍完，AI 已在幕后搭起多条可能的未来时间线。*

过去，电影和游戏总要先被做完一部分，我们才能进去。创作者把场景搭好，把镜头剪好，把每一条分支写进程序。观众到来时，世界已经在那里了。

现在，顺序有了一点松动。

不是整个世界都已经准备好，只剩我们按下播放。是我们先出现，世界再沿着我们的选择，继续往前长。

## 那条视频没有停下来

这件事最初看上去只是一个速度问题。

2026 年 8 月 27 日，fal 发布 H3 Max。按照 fal 公布的数据，这个在 MiniMax H3 基础上后训练、并与推理系统共同优化的版本，生成一段 5 秒视频约需 3 秒，吞吐量约为官方 MiniMax H3 接口的 35 倍。[4]

三秒，五秒。

单独看，不过是发布页上的两组数字。把它们放到播放器的时间轴上，意义就变了。

假设播放器里已经存了几秒缓冲。你正在看第 0 到第 5 秒，后台同时生成第 5 到第 10 秒。如果后一段能在前一段播完以前抵达，生成就不再一定发生在观看之前。它可以跟着播放一起向前跑。

只要它跑得稍微快一点，时间线上就会多出一点余量。

我觉得真正让人不安、也让人兴奋的，恰恰是这点余量。过去，我们等模型交付一个文件；现在，模型可能有时间在我们看完眼前这一幕以前，先替下一幕铺一小段路。

当然，这还不能推出“视频从此永远不会结束”。一条连续运行的内容流会遇到很多更麻烦的问题：人物会不会渐渐换了一张脸，房间的门会不会突然消失，观众临时改主意时，故事能不能接得住。生成速度追上播放，只是让这些问题第一次有机会从论文里的限制，变成真正的产品问题。

fal.live 就站在这条线上。它把自己称作 “AI television directed by everyone”。大家看着同一条节目，在倒计时里投票，获胜的选项决定下一段。[8]

传统直播也没有母带，但镜头前的人和房间已经存在。AI 直播更古怪一些：观众作出选择后，连镜头背后的那部分世界都可能才开始出现。

然后我又打开了 Reactor 的 Sandbox。

Visko Orbis Dynamic 的页面看起来像一张仍在工作的剪辑台。提示词、参考图、分辨率和声音都摆在视频流旁边。按照 Reactor 的文档，生成开始以后仍可以发送新的提示词；画面会在下一个约 1.8 秒的片段边界转向，不需要停止会话再从头生成。分辨率也能在运行中切换。[11]

这和“再生成一条视频”不是同一回事。影像没有关机。它还在流动，只是在半路听见了一句新指令，然后慢慢拐向另一条路。

Reactor 把 Orbis 1.0 称为“无限长度视频生成”模型，并表示它的有限记忆系统用于让主体、场景和风格在数小时内保持一致。[12] 这是产品方的说法，不是“永远不会漂移”的保证。可即使把宣传语言剥掉，剩下的变化仍然很有意思：视频正在从一次性交付的文件，变成一个需要维持记忆、接受指令、持续运行的进程。

开发者 @LerSentAI 展示的互动游戏生成器，则让这种变化落到了一个更熟悉的时刻。玩家面前出现几个选项，系统在选择发生以前便开始为后面的内容做准备。演示里，无论写实叙事还是二次元场景，分支反馈都已经接近即时。[7]

![LerSentAI 案例](/gallery/singularity/lersentai-game-generator.webp)
*当下一段内容提前在后台准备，等待的关系也随之反了过来。*

以前，是玩家点完按钮，程序才开始工作。

现在，下一步可能已经等在那里了。

## 点击以后，页面才出现

视频开始边播边长之后，我想到的却是六十多年前的一台老电脑。

1963 年，Ivan Sutherland 站在 TX-2 前，用光笔在 Sketchpad 上画出交互式线条。[1] 五年以后，Douglas Engelbart 用鼠标、窗口和超文本做了后来被称作“Mother of All Demos”的演示。[2] 再后来，Web 把链接铺到每个人面前。[3]

![历史的起点](/gallery/singularity/historical-sketchpad.webp)
*在 Sketchpad 出现以前，人与屏幕的关系远没有今天这样理所当然。*

这段历史常被写成一串界面发明史。但换一个角度看，它也有一条始终没变的暗线：无论鼠标多灵巧、窗口多直观、网页跳转多迅速，点击之后要去的地方，总得提前存在。

网页像一栋已经装修好的房子。入口、走廊和房间都由工程师事先安排。用户可以走来走去，但墙后没有写进代码的地方，通常也就不存在。

Flipbook 把这堵墙弄松了一点。它不要求每次点击都通往一个固定页面。用户点进画面里的某个细节，下一张页面才沿着那个兴趣出现。[5]

![Flipbook 截图](/gallery/singularity/flipbook-screenshot.webp)
*在 Flipbook 里，点击更像一次追问，而不是一次跳转。*

这时，链接的含义悄悄变了。它不再只是“带我去那里”，也可以是“既然我对这里感兴趣，那就从这里继续画下去”。

Runway 的 Solaris 又往前走了一步。Runway 把它叫作 Interface World Model，也就是“界面世界模型”。它不把界面看成一组预先写好的页面，而把用户的点击、拖拽和当前画面一起交给模型，生成接下来的界面帧。[6]

![Solaris 家具演示](/gallery/singularity/runway-solaris.webp)
![Solaris 虚拟试衣演示](/gallery/singularity/runway-solaris-clothing.webp)
*移动家具、拖动衣服，改变的不只是一个组件状态，而是下一刻界面本身。*

在传统软件里，设计师先画出界面，工程师把它翻译成组件、状态和事件，渲染器再把代码变成像素。Solaris 试着缩短这条链路：LLM 负责理解意图和维护状态，世界模型负责把状态实时变成画面；用户刚刚做出的动作，又成为下一帧的条件。[6]

为了让这件事赶得上交互，Runway 在官方介绍里提到自回归生成、多步扩散蒸馏，以及用模型自身输出继续训练，以减轻长会话里的质量衰减。它追求的也不是单纯的截图质量，而是交互速度、会话一致性和 720p 视觉质量之间的平衡。[6]

这里最容易被夸大的，是“软件不再需要代码”。至少现在还远远不是这样。支付、权限、数据一致性和真实业务规则，不会因为界面可以生成就自动消失。

但界面与代码之间那条过去看起来牢不可破的边界，的确开始晃动了。按钮后面不一定只藏着工程师提前写好的一条路径。它也可能藏着一个正在理解你、然后临时组织下一步的模型。

## 转过身以后，它还在那里吗

走到这里，又会碰到另一个问题。

一条画面可以无缝延长，一个界面也能跟着动作改变。可这还不等于“世界”。

如果镜头绕到一栋房子的背面，刚才的院子还在吗？如果从窗边走进走廊，那条走廊真的属于同一栋房子，还是模型又画了一张恰好合理的新图？

World Labs 的 Atlas 正在碰这个问题。官方把它描述为一个能原生处理文本、图像、视频和 3D 的多模态世界模型。不同输入被放进共享的空间上下文，模型再据此生成新视角和后续内容。[9]

给它几张房屋与院子的照片，它可以生成未被拍到的观察角度，也可以根据多张图像重建场景，输出点云或 3D Gaussian splats。[9]

屏幕上不只是多了一幅风景。你开始有机会绕着同一处风景走。

这句话需要留一点余地。World Labs 自己把世界模型的能力分成渲染、模拟和规划。画面在不同视角下看起来连贯，不代表它已经掌握了可以供工程系统或机器人依赖的物理规律。[10] Atlas 对输入里看不见的区域仍会作出推断；视角越少，需要“想象”的部分就越多。[9]

我反而喜欢这层不确定性。它让 Atlas 更像一个有空间记忆的叙事者，而不是现实的复印机。

Solaris 回答的是：你碰一下，界面怎么回应。

Atlas 追问的是：你转过身，那个地方还能不能接住你。

## 门后真的还有一条路

把这些演示放在一起以后，《刀剑神域》那种“完全潜行”的想象，忽然少了一点纯粹的科幻感。

不是因为我们已经接近它。事实上还差得很远。

今天的实时生成视频会漂移，空间重建会猜错，交互延迟、触觉反馈和安全问题也没有被解决。一个看起来可信的房间，未必经得起长时间停留，更未必经得起人在里面随意折腾。

![完全潜行展望](/gallery/singularity/sao-vision.webp)
*真正难的也许不是把画面铺满视野，而是让世界在视线之外仍然成立。*

可 VR 的下一步，或许真的不只是继续提高分辨率。

想象一个很小的变化：你戴上头显，走到一扇门前。门后的空间没有全部提前下载好。系统知道你从哪里走来，也记得房子的基本结构；当你的手碰到门把手，新的走廊开始生成，而且来得及在门打开以前接上。

你临时改变任务，环境不用黑屏重载。它在你面前转向。

你回头，刚才的房间还在那里。也许细节不是一模一样，也许远处仍有模型补上的部分，但它没有像梦一样在视线离开后立刻散掉。

这时候，fal 带来的那一点时间余量、Orbis 在运行中的转向、Solaris 对动作的回应、Atlas 对空间关系的维持，才真正汇到了一起。

它们今天仍是不同的系统，各自解决不同的问题。没人已经做出一个会无限生长、永不穿帮、还能安全容纳人的数字世界。

但旧的顺序确实在松动。

过去，我们先把世界做好，再邀请人进去。

以后，也许人会先推开门。

门后的路，才刚刚开始生成。

## 参考资料

1. [The Remarkable Ivan Sutherland — Computer History Museum][1]
2. [Did Engelbart’s “Mother of All Demos” Launch the Connected World?][2]
3. [A short history of the Web — CERN][3]
4. [Introducing H3 Max by fal][4]
5. [Flipbook ends the tyranny of the text box — Fast Company][5]
6. [Introducing Solaris — Runway News][6]
7. [@LerSentAI Interactive Game Generator Showcase][7]
8. [fal.live — AI television directed by everyone][8]
9. [Atlas: A World Model for Spatial Intelligence — World Labs][9]
10. [A Functional Taxonomy of World Models — World Labs][10]
11. [Visko Orbis Dynamic overview — Reactor Docs][11]
12. [Introducing Visko Orbis 1.0 — Reactor][12]

[1]: https://computerhistory.org/blog/the-remarkable-ivan-sutherland/
[2]: https://computerhistory.org/blog/net-50-did-engelbart-s-mother-of-all-demos-launch-the-connected-world/
[3]: https://home.cern/science/computing/the-birth-of-the-web/short-history-web/
[4]: https://blog.fal.ai/introducing-h3-max-by-fal/
[5]: https://www.fastcompany.com/91532926/flipbook-animated-browser-inspired-by-apple-hypercard
[6]: https://runway.com/news/research/introducing-solaris
[7]: https://x.com/LerSentAI
[8]: https://fal.live/
[9]: https://www.worldlabs.ai/blog/atlas
[10]: https://www.worldlabs.ai/blog/taxonomy-of-world-models
[11]: https://docs.reactor.inc/model-api-reference/visko-orbis-dynamic
[12]: https://www.reactor.inc/blog/visko-orbis-launch
