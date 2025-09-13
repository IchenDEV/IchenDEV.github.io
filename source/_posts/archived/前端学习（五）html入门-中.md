---
title: 前端学习（五）HTML入门 中
tags:
  - HTML
id: '333'
categories:
  - archived
  - - Web
date: 2019-01-13 16:30:28
---

本篇还未完成

在完成了上篇的学习之后，欢迎来到中篇

在中篇我们将会介绍 网页、视频和音频的插入 表格和表单的使用 以及节的使用

今天废话就不多说了，下面直接进入今天的学习。

#### **网页、视频和音频**

###### **<iframe>网页嵌入**

```markdown
<iframe src="https://idevlab.cn"
        width="100%" height="500"
        allowfullscreen sandbox>
  <p> <a href="https://idevlab.cn">
    Fallback link for browsers that don't support iframes
  </a> </p>
</iframe>
```

此示例包括使用以下所需的`<iframe>`基本要素：

`[allowfullscreen](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-allowfullscreen)` 如果设置，`<iframe>`则可以通过[全屏API](https://developer.mozilla.org/en-US/docs/Web/Apps/Fundamentals/User_notifications/Full_screen_api)设置为全屏模式。

`[src](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-src)` 指向要嵌入文档的URL路径。

`[width](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-width)` 和 `[height](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-height)` 这些属性指定您想要的iframe的宽度和高度。

`[sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox)` 该属性可以提高安全性设置,使嵌入的网页不会影响到我们的网页。

###### **<video> 标签**

<video src="rabbit320.webm" controls>
  <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a> instead.</p> 
</video>

你可以添加多个源预防浏览器不支持某种格式

```markdown
<video controls width="400" height="400"
       autoplay loop muted
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
</video>
```

`[autoplay](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-autoplay)` 这个属性会使音频和视频内容立即播放，即使页面的其他部分还没有加载完全。建议不要应用这个属性在你的网站上，因为用户们会比较反感自动播放的媒体文件。

`[loop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-loop)` 这个属性可以让音频或者视频文件循环播放。同样不建议使用，除非有必要。

`[muted](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-muted)` 这个属性会导致媒体播放时，默认关闭声音。

`[poster](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-poster)` 这个属性指向了一个图像的URL，这个图像会在视频播放前显示。通常用于粗略的预览或者广告。

`[preload](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-preload)`这个属性被用来缓冲较大的文件，有3个值可选：  

*   `"none"` ：不缓冲
*   `"auto"` ：页面加载后缓存媒体文件
*   `"metadata"` ：仅缓冲文件的元数据

###### **<audio> 标签**

使用和视频几乎一模一样

```markdown
<audio controls>
  <source src="viper.mp3" type="audio/mp3">
  <source src="viper.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio. Here is a <a href="viper.mp3">link to the audio</a> instead.</p>
</audio>
```

有关于字幕的操作请翻阅MDN

[https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia\_and\_embedding/Video\_and\_audio\_content#显示音轨文本](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content#显示音轨文本)

#### **表格**

>   
> HTML 表格 应该用于表格数据 ，这正是 HTML 表格设计出来的用途. 不幸的是, 许多人习惯用 HTML 表格来实现网页布局， e.g. 一行包含 header, 一行包含几列内容, 一行包含 footer, etc. 你可以在我们的 [Accessibility Learning Module](https://developer.mozilla.org/en-US/docs/Learn/Accessibility) 中的  [Page Layouts](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML#Page_layouts) 获得更多细节内容和一个示例。这种做法以前是很常见的，因为以前 CSS 在不同浏览器上的兼容性比较糟糕 ; 表格布局现在不太普遍，但您可能仍然会在网络的某些角落看到它们。
> 
> 引自MDN

当初小学用FrontPage做网页的时候我们就是用表格来布局的，这样布局出来的HTML真的不是人看的。

下面是一个表格的例子

```markdown
<table>
    <!--标题-->
    <caption>DEMO</caption>
     <!--表头-->
    <thead>
         <!--行-->
        <tr>
            <td> </td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> </td>
            <!--跨行-->
            <td rowspan="2">A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
        <tr>
            <td>F</td>
            <td>G</td>
            <!--跨列-->
            <td colspan="2">HIH</td>
        </tr>
    </tbody>
    <!--表尾-->
    <tfoot>
        <tr>
            <td> </td>
            <td>A</td>
            <td>B</td>
            <td>C</td>
            <td>D</td>
        </tr>
    </tfoot>
</table>
```

DEMO

 

A

B

C

D

 

A

B

C

D

F

G

HIH

 

A

B

C

D

#### **表单**

从用户体验(UX)的角度来看，要记住：表单越大，失去用户的风险就越大。保持简单，保持专注:只要求必要的数据。

#### **节**

为了实现的语义标记，HTML提供了可以用来表示这些部分的专用标签，例如：

*   **标题:** [`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header).
*   **导航栏:** [`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav).
*   **主要内容:** [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main), 具有代表性的内容段落主题可以使用 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article), [`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section), 和 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 元素.
*   **侧栏:** [`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside); 经常嵌套在 [`<main>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main) 中.
*   **页脚:** [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer).

[`<span>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/span) 是一个行内无语义元素

[`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div) 是一个块级无语义元素，