---
title: "PetX：把 Codex 宠物带到任何页面里"
date: 2026-05-05 23:53:00
updated: 2026-05-06 00:32:00
tags:
  - PetX
  - Codex
  - Frontend
  - Open Source
categories:
  - [gallery]
featured_image: /gallery/petx-codex-pets-anywhere/cover.png
author: chenli
description: PetX 是一组面向 Codex pet atlas 的页面组件包，让 React、Vue、Svelte、SolidJS 和 Web Component 都能直接渲染同一套宠物素材。
---

这两天 Codex 推出桌面宠物，十分有趣，我做了不少角色

角色做多了以后，很快就遇到一个小问题：这些 `spritesheet.webp` 和 `pet.json` 放在 Codex 里能用，但像放到我其他网页、文档站或者展示页里，每次都要重新写一套渲染逻辑。

所以我顺手写了 [PetX](https://github.com/IchenDEV/petx)。

它做的事很小：把 Codex 桌宠的 `spritesheet.webp` 和 `pet.json` 变成页面组件。React、Vue、Svelte、SolidJS、Web Component 都能用同一套素材。

官网：[petx.idevlab.dev](https://petx.idevlab.dev/)。

另外我还做了一个 PetShare 分享站：[petshare.idevlab.dev](https://petshare.idevlab.dev/)。这个站主要放我做的 Codex 桌面人物，想看角色动画或者下载完整安装包，可以去那里。

<!-- more -->

![PetX 官网首页](petx-home.png)

## 这事原本很小

Codex 宠物的素材格式其实很直观。一个角色是一张 spritesheet：站立、奔跑、挥手、跳起、等待、审查等动作都在同一张图里。桌面应用按行和帧播放它，角色就动起来了。

麻烦的是，把这些角色放到页面里时，重复工作马上就来了：

1. 每个框架都要写一遍渲染代码。
2. atlas 的行列、帧宽高、动画名需要统一。
3. 透明边距会影响角色的视觉位置。
4. code agent 接入时，需要一份清楚的说明。

这些都算不上大功能，但每次遇到都要花时间。PetX 只是把这部分整理成一组小包：帧计算放在 `@petx/core`，不同框架各自拿组件入口。

## 现在有这些入口

`0.1.0` 里有这些包：

| 包 | 用途 |
| --- | --- |
| `@petx/core` | 类型、默认动画表、帧计算、CSS 变量生成 |
| `@petx/react` | React 组件 |
| `@petx/vue` | Vue 组件 |
| `@petx/svelte` | Svelte 组件 |
| `@petx/solid` | SolidJS 组件 |
| `@petx/webcomponent` | 无框架 Web Component |

## 快速接入

最简单的方式就是把这件事交给 AI，把这段发给你的 code agent：

```text
请把 PetX 接入这个项目。

接入文档在这里：
https://github.com/IchenDEV/petx/blob/main/docs/AI_AGENT_INTEGRATION.md

请按文档自动判断当前项目使用的框架，选择对应的 PetX 包，导入必要样式，放一个可见的 Codex 宠物预览，并运行项目已有的 typecheck、build 或 test 命令。

不要改无关 UI，不要重写项目结构。最后告诉我改了哪些文件，以及验证结果。
```

PetX 的接入文档会告诉 AI 怎么处理 React、Vue、Svelte、SolidJS、Web Component，也会说明默认素材目录、默认 atlas 参数和验证要求。你只要给出目标项目，剩下的让 AI 做。

## 官网只是先放个可看的版本

官网里放了一个调试区，可以切换动画、尺寸、偏移、帧间隔，也能切换框架代码片段。官网没有做成复杂文档站，先让人一眼看到 PetX 能干什么。

![PetX 示例角色](pet-gallery.png)

这些角色都来自同一种素材格式：

```text
pet.json
spritesheet.webp
```

## 项目链接

- GitHub：[IchenDEV/petx](https://github.com/IchenDEV/petx)
- 官网：[petx.idevlab.dev](https://petx.idevlab.dev/)
- PetShare 分享站：[petshare.idevlab.dev](https://petshare.idevlab.dev/)
- License：MIT
- npm：`@petx/core`、`@petx/react`、`@petx/vue`、`@petx/svelte`、`@petx/solid`、`@petx/webcomponent` 都是 `0.1.0`
