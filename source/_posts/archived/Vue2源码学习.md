---
title: Vue2 源码学习
date: 2021-03-03 21:56:51
categories:
  - archived
tags:
cover: http://gainfromhere.com/wp-content/uploads/2017/07/vue-js.jpg
---
# Vue2 源码学习

## 响应式原理

这个过程和使用 Vue 的最大区别就是多了一步“手动操作 DOM 重新渲染”。这一步看上去并不多，但它背后又潜在的几个要处理的问题：

+ 我需要修改哪块的 DOM？

+ 我的修改效率和性能是不是最优的？

+ 我需要对数据每一次的修改都去操作 DOM 吗？

+ 我需要 case by case 去写修改 DOM 的逻辑吗？

### Object.defineProperty

obj 是要在其上定义属性的对象；prop 是要定义或修改的属性的名称；descriptor 是将被定义或修改的属性描述符。

比较核心的是 descriptor，它有很多可选键值，具体的可以去参阅它的文档。这里我们最关心的是 get 和 set，get 是一个给属性提供的 getter 方法，当我们访问了该属性的时候会触发 getter 方法；set 是一个给属性提供的 setter 方法，当我们对该属性做修改的时候会触发 setter 方法。

一旦对象拥有了 getter 和 setter，我们可以简单地把这个对象称为响应式对象。那么 Vue.js 把哪些对象变成了响应式对象了呢，接下来我们从源码层面分析。