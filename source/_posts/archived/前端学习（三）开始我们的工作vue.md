---
title: 前端学习（三）开始我们的工作Vue
tags: []
id: '287'
categories:
  - archived
  - - Web
date: 2019-01-11 21:49:56
---

我们先不像传统教程先教HTML，JS和CSS，我们先来介绍一下目前比较火的前端框架Vue。

按官网上的说法Vue是

>   
> Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与[现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)以及各种[支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins)结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

总之Vue是一个非常火的、现代化的前端框架。哪怕你不用也要了解一下。

首先我们要先介绍Vue的安装。

等等Vue的安装，一些同学可能疑惑，不是直接引用CDN或者脚本注入就可以了，为什么需要安装？

下面正式介绍Vue的安装。

首先在我们第一篇文章中已经介绍了npm的安装，下面直接使用npm安装vue脚手架

```bash
npm install --global vue-cli
```

运行完这条命令vue的脚手架已经安装完成了，我们可以使用它来方便构建项目。

然后你可以在终端中打开到你要新建项目的位置，使用以下命令新建vue项目

```bash
vue init webpack my-project
```

这样我们就在指定的目录新建好了一个Vue的模板项目。

打开到项目文件夹使用以下命令进行“调试”

```bash
npm install//安装依赖
npm run dev
```

如果一切顺利 访问 [http://localhost:8080](http://localhost:8080) 你可以看到有Vue logo界面就表示安装Vue脚手架并使用其新建项目成功。