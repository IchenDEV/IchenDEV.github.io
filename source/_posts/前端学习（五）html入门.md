---
title: 前端学习（五）HTML入门 上
tags:
  - HTML
  - 前端
id: '311'
categories:
  - - Web
date: 2019-01-13 15:07:19
---

学习到现在你一定发现了如果不会Html，js和css你可能无法继续进行前端的开发，这三个玩意是前端必备的基本要素。下面我们一起来学习一下HTML。

注意：由于内容比较多，本文章会分为上中下来讲，且每一篇文章内容比较多！

下面是一段最简单的基础HTML段，你可以复制到你的VS Code中并保存为html格式。

```markdown
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>开发实验室</title>
</head>
<body>
    <h1>Hello</h1>
    <p>World</p>
</body>
</html>
```

使用浏览器预览HTML，如果一切顺利你将看到如下所示的

 开发实验室

# Hello

World

恭喜你完成了HTML的Hello World

下面开始介绍 HTML

### **<!DOCTYPE> 声明**

```markdown
<!DOCTYPE HTML>
```

Html 5 如上即可，表示这是html文件，不区分大小写。

### **<head>标签里有什么?**

##### **元数据：<meta>元素**

###### **编码声明**

一般声明在head标签里，charset指定编码类型。如果你不知道什么是编码请自行[点击。](https://cn.bing.com/search?q=编码)

```markdown
<meta charset="UTF-8">
```

[其他支持的字符集](http://www.iana.org/assignments/character-sets/character-sets.xhtml)

###### **其他声明**

```markdown
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

[https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

##### **网页标题**

几乎是所有的网站都有一个标题，这个标题会在浏览器的标签上显示。

```markdown
<title>开发实验室</title>
```

##### **自定义图标**

```markdown
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
```

将图标保存在与网站的索引页面相同的目录中，以.ico格式保存（大多数浏览器将支持更通用的格式，如.gif或.png，但使用ICO格式将确保它能在如**Internet Explorer 6**一样久远的浏览器显示）

现在我们还可以使用不同的图标

```markdown
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://developer.cdn.mozilla.net/static/img/favicon144.a6e4162070f4.png">
<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://developer.cdn.mozilla.net/static/img/favicon114.0e9fabd44f85.png">
<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://developer.cdn.mozilla.net/static/img/favicon72.8ff9d87c82a0.png">
<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="https://developer.cdn.mozilla.net/static/img/favicon57.a2490b9a2d76.png">
<!-- basic favicon -->
<link rel="shortcut icon" href="https://developer.cdn.mozilla.net/static/img/favicon32.e02854fdcf73.png">
```

#####   
**在HTML中应用CSS和JavaScript**

```markdown
<link rel="stylesheet" href="my-css-file.css">
<script src="my-js-file.js"></script>
```

##### **设定页面语言**

```markdown
<html lang="en-US">
```

其实几乎所有的标签都可以指定语言，[具体标准](https://www.w3.org/International/articles/language-tags/)

### **<body>**

#### **基本元素**

##### **<h1>~<h6> 标题**

一般用于文本的标题，效果如下

```markdown
<h1>这是一个标题</h1>
<h2>这是一个标题</h2>
<h3>这是一个标题</h3>
<h4>这是一个标题</h4>
<h5>这是一个标题</h5>
<h6>这是一个标题</h6>
```

# 这是一个标题

## 这是一个标题

### 这是一个标题

#### 这是一个标题

##### 这是一个标题

###### 这是一个标题

##### **<p> 段落**

```haml
<p>The </p>
```

##### **<a> 链接**

在网页上使用超链接十分容易，只要指定href的值就可以了

```haml
<a href="https://idevlab.cn">the idevlab homepage</a>
```

[the idevlab homepage](https://idevlab.cn)

我们还可以为链接添加一个标题，你可以将鼠标移到链接上面查看链接标题

```haml
<a href="https://idevlab.cn"
   title="code changing the world">the idevlab homepage</a>.
```

[the idevlab homepage](https://idevlab.cn "code changing the world").

我们也可以为图片添加链接

```markdown
<a href="https://idevlab.cn">
  <img src="https://ob8aie1adzzf.i.optimole.com/910553ce6e20388a2d06814252deb850/270/270/55/https/idevlab.cn/wp-content/uploads/2019/01/cropped-cropped-Screenshot_2018-08-16-21-32-16-520_com.android.browser-1.png" alt="idevlab logo that links to the idevlab homepage">
</a>
```

 [![idevlab logo that links to the idevlab homepage](https://ob8aie1adzzf.i.optimole.com/910553ce6e20388a2d06814252deb850/270/270/55/https/idevlab.cn/wp-content/uploads/2019/01/cropped-cropped-Screenshot_2018-08-16-21-32-16-520_com.android.browser-1.png)](https://idevlab.cn)  

你也可以使用链接导航到文章的某位置

```markdown
<h1 id="idev">IDEV</h1>
<a href="#idev">the idevlab homepage</a>
```

你还可以使用更多链接导航，例如电子邮件

```markdown
<a href="mailto:nowhere@idevlab.cn?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email &body=The%20body%20of%20the%20email">
  Send mail with cc, bcc, subject and body
</a>
```

[Send mail with cc, bcc, subject and body](mailto:nowhere@idevlab.cn?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email &body=The%20body%20of%20the%20email)

上面的链接点击之后就会调用系统邮箱向上面链接指定的地址生成邮件，您并不一定需要填写所有的信息。

文件下载链接

```markdown
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
   download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```

[Download Latest Firefox for Windows (64-bit) (English, US)](https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US)

关于超链接的几个提示：  
尽可能使用相对链接  
链接到非html资源 ——留下清晰的指示  
在下载链接时使用下载属性

##### **<br/>换行和<hr/>水平分割线**

我们直接看例子

```markdown
<p>这是不一<br/>个标题</p>
<p>这是不一个标题</p>
<hr/>
<p>这是不一个标题</p>
<br/>
<p>这是不一个标题</p>
```

这是不一  
个标题

这是不一个标题

* * *

这是不一个标题

  

这是不一个标题

##### **<ul>无序列表**

```markdown
<ul>
  <li>牛奶</li>
  <li>鸡蛋</li>
  <li>面包</li>
  <li>鹰嘴豆泥</li>
</ul>
```

*   牛奶
*   鸡蛋
*   面包
*   鹰嘴豆泥

##### **<ol>有序列表**

```markdown
<ol>
  <li>行驶到这条路的尽头</li>
  <li>向右转</li>
  <li>直行穿过第一个双环形交叉路</li>
  <li>在第三个环形交叉路左转</li>
  <li>学校就在你的右边，300米处</li>
</ol>
```

1.  行驶到这条路的尽头
2.  向右转
3.  直行穿过第一个双环形交叉路
4.  在第三个环形交叉路左转
5.  学校就在你的右边，300米处

##### **<dl>描述列表**

浏览器的默认样式会在**描述列表的描述部分**（description description）和**描述术语**（description terms）之间产生缩进。

```markdown
<dl>
  <dt>soliloquy</dt>
  <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
  <dt>monologue</dt>
  <dd>In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.</dd>
  <dt>aside</dt>
  <dd>In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.</dd>
</dl>
```

soliloquy

In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)

monologue

In drama, where a character speaks their thoughts out loud to share them with the audience and any other characters present.

aside

In drama, where a character shares a comment only with the audience for humorous or dramatic effect. This is usually a feeling, thought or piece of additional background information.

##### **<em>强调**

```
<p>I am <em>glad</em> you weren't <em>late</em>.</p>
```

##### **<strong>强调**

```
<p>I am <strong>glad</strong> you weren't <em>late</em>.</p>
```

##### **<i>斜体**

```
<p>I am <i>glad</i> you weren't <em>late</em>.</p>
```

##### **<b>加粗**

```
<p>I am <b>glad</b> you weren't <em>late</em>.</p>
```

##### **<u>下划线**

```
<p>I am <u>glad</u> you weren't <em>late</em>.</p>
```

##### **<time>标记时间和日期**

但是这些不同的格式不容易被电脑识别 — 假如你想自动抓取页面上所有事件的日期并将它们插入到日历中， [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/time) 元素允许你附上清晰的、可被机器识别的 时间/日期来实现这种需求。

```markdown
<!-- Standard simple date -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- Just year and month -->
<time datetime="2016-01">January 2016</time>
<!-- Just month and day -->
<time datetime="01-20">20 January</time>
<!-- Just time, hours and minutes -->
<time datetime="19:30">19:30</time>
<!-- You can do seconds and milliseconds too! -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- Date and time -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- Date and time with timezone offset-->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- Calling out a specific week number-->
<time datetime="2016-W04">The fourth week of 2016</time>
```

##### **引用**

在引用别人的文章最好使用引用格式，由于篇幅有限请参阅MDN

[https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction\_to\_HTML/Advanced\_text\_formatting#引用](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Introduction_to_HTML/Advanced_text_formatting#引用)

##### **<img>图片**

用src来指定图片位置

```markdown
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
     width="400"
     height="341"
     title="A T-Rex on display in the Manchester University Museum">
```

一个完整的图片元素应该包括标题和替代文本方便视力残障人士使用

我们同时应该添加<figcaption> 来给图片解说

```markdown
<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">
  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

上篇的内容大体上是这么多了，中篇我们会讲述其他的多媒体的嵌入和表格。