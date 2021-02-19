---
title: 前端学习（四）Vue 入门
tags: 
  - VUE
id: '301'
categories:
  - - Web
date: 2019-01-11 23:39:48
---

好吧，下面我们开始介绍vue的入门。

按照前面一篇所述，我们已经新建了一个模板。主要包括下面几个文件夹

![](https://idevlab.cn/wp-content/uploads/2019/01/image-4.png)

我们先不去管其他文件夹，先看src文件夹，一般来说src是源代码储存的地方

为了简单起见，先删除掉src文件夹中除了App.vue和main.js的文件，并简化剩下两个文件的内容。（“router,”也应该删掉）

![](https://idevlab.cn/wp-content/uploads/2019/01/image-5.png)

![](https://ob8aie1adzzf.i.optimole.com/a68f27ab61d173dd833c8ee324e7ed87/750/750/55/https/idevlab.cn/wp-content/uploads/2019/01/image-7-1024x945.png)

App.vue

在终端运行

npm run dev

在浏览器中查看效果。

下面具体说明一下这两页代码的意义。

首先是App.vue开始

我们可以看到 <template>标签，这个标签里面的内容就是浏览器显示的主部分，具体标签的功能我们下一节再讲，反正你知道浏览器加载了。

后面在<script>标签中

![](https://idevlab.cn/wp-content/uploads/2019/01/image-8.png)

是这个部分让其他文件引用的名称。

剩下的css部分我们暂时先不讲。

下面讲一下main.js的代码

main.js是我们前端程序的入口点，我们首先**import**了vue 和刚才写好的App使代码可以访问它们，然后构建一个vue实例替换id为app的元素（index.html上的，我们下一节在讲），后面代码表示引用了刚才的App.vue（具体涉及Vue的组件，以后再讲）