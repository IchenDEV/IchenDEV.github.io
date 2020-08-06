---
title: 2018 CISCN Misc
tags: []
id: '491'
categories:
  - - CTF
---

## 寻找入侵者

黑客使用无线钓鱼攻击一个SSID为“CyberPeace”的热点，但是我们的蜜罐系统捕获了他的数据包，并且已经得知他的握手包密码就是他的网卡地址。可是根据我们最新获得的情况，他又发送重连请求的Malformat Frame试图崩溃我们的无线路由器。
请从attack包中找到密码，并解开他的数据包,找到那条畸形数据。

首先根据题目提示在attack的数据包里面搜索并提取MAC地址

打开WireShake->Statistic->Endpoints->Copy as cvs提取，复制到cvs文件并用excel删除多余数据。注意，最后要将换行符改为LF格式！

![](https://i0.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/05/image.png?fit=750%2C533&ssl=1)

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/05/image-1.png?fit=750%2C353&ssl=1)

在命令行执行以下命令

aircrack-ng hanshake.cap -w password.txt

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/05/image-2.png?fit=750%2C420&ssl=1)