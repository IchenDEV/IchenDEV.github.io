---
title: 我们可能又迈过了一个奇点
date: 2026-09-01
categories: gallery
featured_image: /gallery/singularity/infinite-movie-neutral.webp
description: 当生成速度开始追上感知速度，视频不再等剪完才播放，界面和空间也开始在人抵达之后继续生长。
---

今天早上我打开 fal.live，本来只是想看看它和普通的 AI 视频站有什么不同。

页面中央是一档正在播的节目，右边挂着观众输入的问题和几个候选方向。倒计时走完以后，得票最多的那个会进入下一段。页面没有把这件事说得很玄，甚至有点像一个刚搭好的直播间；可多看一会儿，那个别扭的地方就冒出来了：这档节目似乎还没有完整的脚本，更没有剪好的母带。它正在播，但接下来会发生什么，要等屏幕外的人投完票才知道。

过去我们看 AI 视频，通常是在等一个文件。写提示词，等一会儿，拿到十几秒或几十秒的成片，再决定要不要重来。fal.live 让我想到另一种可能：如果机器来得及在上一段结束前做好下一段，视频就不必一次性做完再交付。它可以边播边往前接。

表面看，这只是把等待缩短了一点。可内容的生产顺序已经有点倒过来了：人先到，选择先发生，后面的画面再补上。

## 一段视频，为什么可以不必收尾

2026 年 8 月 27 日，fal 发布 H3 Max。按 fal 自己的口径，这个在 MiniMax H3 基础上做过后训练和推理优化的版本，生成 5 秒视频约需 3 秒，吞吐量约为官方 MiniMax H3 接口的 35 倍。[4]

![fal H3 Max Playground](/gallery/singularity/fal-h3-max-playground.webp)
*H3 Max 的 Playground：首帧、提示词、时长和分辨率都放在同一个生成面板里。*

把这两个数字塞进时间轴，感觉就不一样了。播放器先存几秒缓冲；你在看第 0 到第 5 秒时，后台做第 5 到第 10 秒。后者赶在前者放完以前送到，画面就能接着走。没有什么神秘之处，生成速度只是终于跑到了观看前面。

不过，跑得快不等于连续性就解决了。人物会不会变样，场景会不会忘记刚才发生的事，观众突然改主意时故事怎么接，这些都还麻烦得很。H3 Max 当然不是“视频从此无限长”，它只是让这个原本停留在演示稿里的设想，终于能拿产品来试一试。

fal.live 就在试这个。它把自己叫作 “AI television directed by everyone”：大家看同一个频道，在倒计时内投票，胜出的选项决定下一段。[8]

![fal.live 直播界面](/gallery/singularity/fal-live-directing.webp)
*节目还在播，右侧已经留出了提问和投票的位置。*

传统直播也没有预先剪好的母带，可摄像机对着的人、房间和舞台都已经在那里。fal.live 更奇怪一点。观众说“接下来这样演”以后，演员、镜头里的空间，甚至这件事本身，才可能被做出来。

我又去看了 Reactor 的 Sandbox。Visko Orbis Dynamic 的页面很像一张没收起来的工作台：提示词、参考图、分辨率、声音设置都挨着视频流。Reactor 的文档称，视频开始生成后可以继续发新的提示词，画面会在下一个约 1.8 秒的片段边界转向，不必停下会话从头再来；分辨率也可以在运行中切换。[11]

![Visko Orbis Dynamic Sandbox](/gallery/singularity/orbis-dynamic-sandbox.webp)
*Orbis Dynamic 把提示词、参考画面和实时输出控制留在同一块工作台上。*

这比“我不满意，再生成一条”更像编辑。视频没有被关掉，只是半路收到了新要求，然后在不太突兀的地方换了方向。Reactor 把 Orbis 1.0 称作“无限长度视频生成”模型，并说它用有限记忆维持主体、场景和风格在数小时内的一致性。[12] 这不是永远不出错的承诺，但问题已经变成了：怎样让一个一直运行的东西别忘了刚才发生过什么。

开发者 @LerSentAI 做的互动游戏生成器，把同一件事放到了更容易代入的场景里。玩家面前有几个选项，系统会在选择落下前为后面的内容预热。演示里，无论是写实叙事还是二次元场景，分支反馈都已经很快。[7]

![LerSentAI 案例](/gallery/singularity/lersentai-game-generator.webp)
*下一段内容开始提前准备以后，等待的人和被等待的东西换了位置。*

以前是点完按钮，程序才开始干活。现在，有些系统会猜着你的下一步，先把路铺一小截。猜错了当然会浪费；猜对了，交互的手感会完全不一样。

## 点击之前，下一页还不存在

这让我想起六十多年前的那台老电脑。1963 年，Ivan Sutherland 站在 TX-2 前，用光笔在 Sketchpad 上画出交互式线条。[1] 五年后，Douglas Engelbart 展示了鼠标、窗口和超文本。[2] 再后来，Web 把链接送到每个人的手边。[3]

![历史的起点](/gallery/singularity/historical-sketchpad.webp)
*Sketchpad 出现以前，人和屏幕的关系远没有今天这样顺手。*

这些发明改变了我们和屏幕打交道的方式，但有一件事一直没变：点开一个链接之前，那个页面通常已经存在。网页像装修好的房子。哪里有门，门后是什么，走错一步会回到哪里，都是工程师事先定下来的。

Flipbook 把这个习惯掰开了一点。它不要求每次点击都通向固定页面；你点进画面里的一个细节，下一张页面才顺着那个兴趣继续出现。[5]

![Flipbook 截图](/gallery/singularity/flipbook-screenshot.webp)
*在 Flipbook 里，点击像一次追问，不再只是跳到另一个地址。*

这时，链接就有了另一层意思。它不再单纯是“带我去已经写好的地方”，也可以是“从我刚刚注意到的地方，再往下讲一点”。

Runway 的 Solaris 把这种想法推到了操作界面上。Runway 把它称为 Interface World Model，也就是“界面世界模型”。用户的点击、拖拽和当前画面被一起交给模型，模型生成下一帧界面。[6]

![Solaris 家具演示](/gallery/singularity/runway-solaris.webp)
![Solaris 虚拟试衣演示](/gallery/singularity/runway-solaris-clothing.webp)
*移动家具、拖动衣服时，下一刻出现的是一整块被重新画过的界面。*

传统软件把这条链分得很清楚：设计稿、组件、状态、事件、渲染。Solaris 想省掉中间的一些翻译。它用 LLM 理解用户的意图和当前状态，再让世界模型把状态画出来；用户的下一次动作又会改写后面的画面。[6]

Runway 在介绍中提到自回归生成、多步扩散蒸馏，以及用模型自己的输出继续训练，目的是控制长会话里的质量衰减，并在交互速度、会话一致性和 720p 画质之间取平衡。[6] 这些说法听着仍然很研究项目，但家具和试衣的演示很好理解：如果一个界面能随着手上的动作出现，人们可能不会再把每一屏都当成预先画好的页面。

这当然不等于软件不用写代码。支付、权限、数据一致性，还有各种不讲道理的业务规则，不会自己消失。只是按钮后面未必永远是一条工程师提前写死的路；有时它会是一个正在看、正在猜、正在组织下一步的系统。

## 转过去之后，还是同一个地方吗

再往前一点，问题换成了空间。

镜头从房子的正面绕到背面，刚才的院子还在不在？从窗边走进走廊，那条走廊是同一栋房子的一部分，还是模型临时画了一张合理的图？一段流畅的视频可以把这些问题藏起来，直到你真的想回头看一眼。

World Labs 的 Atlas 就在处理这类事。官方把它描述为原生处理文本、图像、视频和 3D 的多模态世界模型：不同输入落在共享的空间上下文里，模型据此生成新的视角和后续内容。[9]

给它几张房屋和院子的照片，它可以补出没拍到的观察角度，也能依据多张图重建场景，输出点云或 3D Gaussian splats。[9]

![World Labs Atlas 3D 输出演示](/gallery/singularity/worldlabs-atlas-3d-output.webp)
*Atlas 从图像补出新视角与几何，再把结果转换成可以继续探索的 Gaussian splats。*

到这里，屏幕上是一处可以绕着走一走的地方，而不只是另一张风景图。

但我不太愿意把这直接叫作“理解了世界”。World Labs 自己也把世界模型的能力分成渲染、模拟和规划。[10] 多个视角看着连贯，不意味着它已经掌握了可以交给机器人或工程系统的物理规律。看不见的地方仍然要猜，给它的照片越少，猜的部分就越多。[9]

不过，这种不完整反而让我觉得 Atlas 更有意思。它像一个有空间记忆的叙事者，记得你刚才站在哪里，也会为没见过的角落补出一段说得过去的故事。

Solaris 问的是：你动一下，眼前的界面怎么变？Atlas 问的是：你转过身，刚才那个地方能不能还在？

## 门后

把这些东西放在一起，难免会想到《刀剑神域》里“完全潜行”的想象。不是说它已经近在眼前。离得还很远。

今天的实时生成视频会漂移，空间会猜错，延迟、触觉反馈和安全问题也都没解决。一个画面可信的房间，未必撑得住长时间停留，更别说让人随意折腾。

![完全潜行展望](/gallery/singularity/sao-vision.webp)
*难的地方在于：人转开视线以后，那个世界也得继续在那里。*

可有一个小画面，我最近总会想到。你戴着头显，走到一扇门前。门后的整条走廊没有提前下载好，但系统记得你从哪里来，知道这栋房子大致该怎么接。手碰到门把手时，新的空间开始生成，并在门打开前赶到。

然后你临时改了主意。环境不必黑屏重载，只是顺着你的动作换了方向。等你回头，刚才的房间还在。细节可能不完全一样，远处也许仍有模型补出来的部分，但它不会因为离开视线就立刻散掉。

fal 带来的是一点时间余量，Orbis 试着让影像在运行中改道，Solaris 让画面跟着手势回应，Atlas 则希望空间能记住自己。它们不是同一个系统，也没有哪一个已经做出了这样的世界。

只是旧的顺序开始不那么牢靠了。过去，我们先把世界做好，再请人进去。以后也许会变成：人先推开门，里面的路一边被走，一边慢慢长出来。

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
