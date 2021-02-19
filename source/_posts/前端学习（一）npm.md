---
title: 前端学习（一）npm
tags: []
id: '249'
categories:
  - - Web
date: 2019-01-10 00:18:02
---

NPM是Network Power Manager缩写，是网络管理电源控制器，是克莱沃自主研发、生产制造的具有世界最先进技术水平的新一代网络管理电源监控产品。

我们学习的npm是Node Package Management不是那个电源管理器。

npm 是Node.js的东西，一开始Node.js是用JS来写服务器代码，但是今天我们讲的是前端，为什么一开始介绍npm。首先npm是js的包管理的引擎，可以管理js的各种包，包括我们后续要介绍的Vue.js.

nodejs的出现，可以算是前端里程碑式的一个事件，它让前端攻城狮们摆脱了浏览器的束缚，踏上了一个更加宽广的舞台。前端的可能性，从此更加具有想象空间。

随着一系列基于nodes的应用/工具的出现，工作中与nodejs打交道的机会越来越多。无论在node应用的开发，还是使用中，包管理都扮演着一个很重要的作用。NPM（node package manager），作为node的包管理工具，极大地便利了我们的开发工作。

首先是npm的安装

访问node.js的官网[https://nodejs.org/en/download/current/](https://nodejs.org/en/download/current/)

![](https://i1.wp.com/idevlab.cn/wp-content/uploads/2019/01/image.png?fit=1024%2C652)

Windows 和 Mac 下的安装比较简单，这里不进行过多的描述。

下面介绍在Linux下的安装：

简单来说：下载Linux的安装包，解压后设置全局目录即可。

下载可以使用wget

```bash
wget https://nodejs.org/dist/v11.6.0/node-v11.6.0-linux-x64.tar.xz
```

使用 tar 解压

```bash
tar xf  node-v11.6.0-linux-x64.tar.xz
```

使用 ln 创建软链接

```bash
ln -s /home/node-v11.6.0-linux-x64/bin/node /usr/local/bin/node
ln -s /home/node-v11.6.0-linux-x64/bin/npm /usr/local/bin/npm
```

安装完成后在其他目录输入

```bash
 npm -v
```

如果正确安装会输出npm的版本号。