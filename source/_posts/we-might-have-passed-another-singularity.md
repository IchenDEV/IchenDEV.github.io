---
title: 我们可能又迈过了一个奇点
date: 2026-09-01
categories: gallery
featured_image: /gallery/singularity/infinite-movie-neutral.webp
description: 当生成速度开始追上感知速度，视频不再等剪完才播放，界面和空间也开始在人抵达之后继续生长。
---

今天早上打开 fal.live 时，我原本只是想确认它和一般的 AI 视频网站差在哪儿。页面中间有一档正在播放的节目，侧边是观众写下的建议和几个候选选项，倒计时结束后，得票多的那个会进入下一段。它的界面并不复杂，甚至有点像还在试运营的直播间。可我停下来多看了一会儿，才意识到一个很小但不太寻常的细节：屏幕里的节目正在播，后面却没有一份完整成片等着被播放，接下来会发生什么，要看屏幕外的人怎么选。

以往看 AI 视频，节奏大致是固定的：写提示词，等待，拿到一段视频，再判断这一段值不值得重新做。fal.live 让我想到，如果机器能在上一段结束前做好下一段，这个流程也许会松开一些。内容不必全部做完才开始出现，观众的选择可以先发生，画面随后补上。听上去只是等待时间短了一点，但它会改变内容被安排出来的顺序。

2026 年 8 月 27 日，fal 发布 H3 Max。按照 fal 的介绍，这个在 MiniMax H3 基础上做过后训练和推理优化的版本，生成 5 秒视频约需 3 秒，吞吐量约为官方 MiniMax H3 接口的 35 倍。[4]

![fal H3 Max Playground](/gallery/singularity/fal-h3-max-playground.webp)
*H3 Max 的 Playground 把首帧、提示词、时长和分辨率放在同一个生成面板里。*

我觉得这组数字的意思不在于“更快”本身，而在于它终于可以被放进播放场景里理解。假设播放器有几秒缓冲，人在看第 0 到第 5 秒时，后台已经开始处理第 5 到第 10 秒；只要下一段赶在前一段结束前送达，视频便有机会自然接下去。这个设想并不神秘，也不代表连续性已经解决。人物会不会变样、场景会不会忘记前情、观众突然改主意后如何接住故事，都是会在实际使用里暴露出来的问题。H3 Max 只是让这类问题不再只停留在讨论里，而可以放进产品里测试。

fal.live 正是在做这种尝试。它把自己称作 “AI television directed by everyone”，让所有人观看同一条频道，在倒计时内投票，再把获胜的选择写进下一段。[8]

![fal.live 直播界面](/gallery/singularity/fal-live-directing.webp)
*fal.live 的节目画面、观众提问和投票选项同时出现在一个页面里。*

传统直播同样没有预先剪好的母带，但镜头前的人、舞台和环境都是已经存在的。fal.live 里，观众提出要求以后，演员、场景和事件本身都可能才刚被生成出来。这个区别会让节目更像一个持续运行的系统，而不是把许多短片拼成一条很长的视频。

在 Reactor 的 Sandbox 里，Visko Orbis Dynamic 的工作方式更直白一些。提示词、参考图、分辨率和声音设置摆在视频流旁边，像一张始终没有收起来的剪辑台。Reactor 的文档称，视频开始生成后仍可以发送新提示词，画面会在下一个约 1.8 秒的片段边界转向，不需要停止会话再从头做；分辨率也能在运行中切换。[11]

![Visko Orbis Dynamic Sandbox](/gallery/singularity/orbis-dynamic-sandbox.webp)
*Orbis Dynamic 的 Sandbox 将参考画面、提示词和实时输出控制放在同一处。*

这并不等于它已经像剪辑软件一样可靠，但用起来的感觉会很不一样。常见的做法是对一段结果不满意后重新提交任务，而这里的视频可以先继续跑着，随后接收新的要求。Reactor 把 Orbis 1.0 称为“无限长度视频生成”模型，并说它以有限记忆维持主体、场景和风格在数小时内的一致性。[12] 这当然不是对不漂移的保证，不过它已经把焦点放在长期运行时如何保留上下文，而不只是单段画面好不好看。

开发者 @LerSentAI 展示的互动游戏生成器，也让我对这种变化有了更具体的感觉。玩家面对几个选项时，系统会提前为接下来的内容做准备；演示中，无论是写实叙事还是二次元场景，分支的反馈都很快。[7] 这类产品最后能否成立，未必取决于它每次都猜对玩家，更要看它猜错时会不会打断体验，以及猜对时能不能真的少掉那段等待。

![LerSentAI 案例](/gallery/singularity/lersentai-game-generator.webp)
*互动游戏生成器的演示把选择、预热和后续画面放进了一次连续体验中。*

看着这些演示，我想起了早期图形交互的历史。1963 年，Ivan Sutherland 在 TX-2 上用光笔操作 Sketchpad；五年后，Douglas Engelbart 展示了鼠标、窗口和超文本；Web 随后把链接送到普通用户手上。[1] [2] [3] 这些变化让人和屏幕的关系变得越来越直接，但链接背后一直有一个前提：点击前，目的地已经被做出来了。网页像是装修完再开放的房子，页面、路径和异常情况，通常都要在用户到达以前考虑好。

![历史的起点](/gallery/singularity/historical-sketchpad.webp)
*Sketchpad 出现以前，人与屏幕之间远没有今天这样直接。*

Flipbook 把这个前提放松了一点。它不要求每次点击都跳去固定的页面；用户点进画面里的一个细节后，下一张页面才围绕那个兴趣生成出来。[5] 这不是要取代传统网页，更像是在一些内容场景里，把“链接”从地址换成了一句还没说完的追问。

![Flipbook 截图](/gallery/singularity/flipbook-screenshot.webp)
*在 Flipbook 中，点击画面中的细节会引出下一张围绕该细节生成的页面。*

Runway 的 Solaris 则把这个想法放到操作界面上。Runway 把它称为 Interface World Model，用户的点击、拖拽和当前画面会一起进入模型，模型再生成下一帧界面。[6]

![Solaris 家具演示](/gallery/singularity/runway-solaris.webp)
![Solaris 虚拟试衣演示](/gallery/singularity/runway-solaris-clothing.webp)
*Solaris 的两个公开演示：调整家具摆放，以及在商品上拖动衣物。*

传统软件里，设计稿、组件、状态、事件和渲染各有自己的位置。Solaris 尝试把一部分中间过程交给模型处理，用 LLM 理解意图和当前状态，再由世界模型给出下一帧画面。[6] Runway 提到自回归生成、多步扩散蒸馏和以模型自身输出继续训练，目标是在较长会话里减缓质量下降，并在响应速度、一致性和 720p 画质之间找平衡。[6] 这些技术说法离日常使用还有距离，但家具和试衣的例子已经能说明它在尝试什么：有些界面不必由工程师把每个中间状态都提前画好。

这不代表软件会因此摆脱代码。支付、权限、数据一致性和各种业务规则并不会自动消失，生成出来的画面也必须落回可靠的系统上。只是将来某些界面背后的逻辑，可能不再完全是固定的分支图，而会包含一个根据上下文组织下一步的部分。

视频和界面之外，还会碰到空间连续性的问题。镜头从房子的正面绕到背面后，院子是否还在那里；从窗边走进走廊时，走廊究竟是同一栋房子的一部分，还是模型临时拼出的一张合理画面。短视频可以把这些问题藏起来，只有当人想回头走走时，问题才会真正出现。

World Labs 的 Atlas 试图处理这类情况。官方把它描述为原生处理文本、图像、视频和 3D 的多模态世界模型，不同输入会落进共享的空间上下文，模型据此生成新视角和后续内容。[9] 给它几张房屋与院子的照片，它可以补出没有拍到的观察角度，也能用多张图重建场景，输出点云或 3D Gaussian splats。[9]

![World Labs Atlas 3D 输出演示](/gallery/singularity/worldlabs-atlas-3d-output.webp)
*Atlas 的公开演示展示了从图像生成新视角，并输出可继续查看的 Gaussian splats。*

这和单纯生成一张漂亮的风景图不同，Atlas 希望得到的是一处能绕着看的地方。不过我也不愿意太早把它叫作“理解世界”。World Labs 自己把世界模型的能力分成渲染、模拟和规划。[10] 多个视角看上去连贯，并不说明模型已经掌握了可用于机器人或工程系统的物理规律；输入图像里看不见的部分仍然需要推测，而且照片越少，推测就越多。[9]

Solaris 关心的是手一动以后，界面怎样接着变化；Atlas 更关心人转身以后，场景能否还是同一个场景。两者离真正可进入的虚拟世界都还有很长一段路。不过，把这些产品放在一起，很容易联想到《刀剑神域》里“完全潜行”的设定，只是眼下并没有接近那个状态。实时生成的视频仍会漂移，空间会猜错，延迟、触觉反馈和安全问题也没有现成答案。一个看起来可信的房间，未必能经受住人长时间停留，更经不住随手翻找、反复返回和各种不按剧本来的动作。

![完全潜行展望](/gallery/singularity/sao-vision.webp)
*真正的难处不在于把画面铺满视野，而在于人转开视线以后，那个世界还得继续成立。*

不过，眼下这些演示已经让我有了一个很具体的想象：戴上头显走到一扇门前，门后的走廊没有被提前完整下载，但系统知道人从哪里来，也有足够的上下文把房子接下去。人推开门时，新的空间正好赶到；临时改了主意，环境也不必黑屏重载，而是沿着动作继续变化。等人回头时，刚才离开的房间最好仍然在那里，即使某些远处细节依旧是模型补出来的。

我不确定这是否配得上“奇点”这个词。H3 Max、fal.live、Orbis、Solaris 和 Atlas 不是同一个系统，它们也没有合在一起解决这个问题。不过它们都在逼近一个以前很少成为产品目标的状态：内容不必预先完整存在，而要能在人的时间、选择和位置变化时继续往下生成，并尽量不忘记之前发生过的事。等这种能力稳定下来，很多数字内容的制作方式和使用方式都会慢慢改变。

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
