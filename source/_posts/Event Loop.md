---
title: Event Loop
date: 2021-03-09 13:23:51
tags:
---

# Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部 API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。请看下面这个例子。

```javascript
var req = new XMLHttpRequest();
req.open("GET", url);
req.onload = function () {};
req.onerror = function () {};
req.send();
```

上面代码中的 req.send 方法是 Ajax 操作向服务器发送数据，它是一个异步任务，意味着只有当前脚本的所有代码执行完，系统才会去读取"任务队列"。所以，它与下面的写法等价。

HTML5 标准规定了 setTimeout()的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 requestAnimationFrame()的效果要好于 setTimeout()。

需要注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在 setTimeout()指定的时间执行。

HTML5 标准规定了 setTimeout()的第二个参数的最小值（最短间隔），不得低于 4 毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为 10 毫秒。另外，对于那些 DOM 的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每 16 毫秒执行一次。这时使用 requestAnimationFrame()的效果要好于 setTimeout()。

## Macrotasks && Microtasks

Macrotasks 包含生成 dom 对象、解析 HTML、执行主线程 js 代码、更改当前 URL 还有其他的一些事件如页面加载、输入、网络事件和定时器事件。从浏览器的角度来看，macrotask 代表一些离散的独立的工作。当执行完一个 task 后，浏览器可以继续其他的工作如页面重渲染和垃圾回收。

Microtasks 则是完成一些更新应用程序状态的较小任务，如处理 promise 的回调和 DOM 的修改，这些任务在浏览器重渲染前执行。Microtask 应该以异步的方式尽快执行，其开销比执行一个新的 macrotask 要小。Microtasks 使得我们可以在 UI 重渲染之前执行某些任务，从而避免了不必要的 UI 渲染，这些渲染可能导致显示的应用程序状态不一致。

在单次的迭代中，event loop 首先检查 macrotask 队列，如果有一个 macrotask 等待执行，那么执行该任务。当该任务执行完毕后（或者 macrotask 队列为空），event loop 继续执行 microtask 队列。如果 microtask 队列有等待执行的任务，那么 event loop 就一直取出任务执行知道 microtask 为空。这里我们注意到处理 microtask 和 macrotask 的不同之处：在单次循环中，一次最多处理一个 macrotask（其他的仍然驻留在队列中），然而却可以处理完所有的 microtask。

![](https://user-gold-cdn.xitu.io/2019/1/10/1683877ba9aab056?imageView2/0/w/1280/h/960/ignore-error/1)
