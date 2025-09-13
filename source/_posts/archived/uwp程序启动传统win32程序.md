---
title: UWP程序启动传统win32程序
tags:
  - 桌面桥
id: '80'
categories:
  - archived
  - - 'UWP'
date: 2018-08-12 23:46:53
---

很多人认为这是不可能的，但是自桌面桥诞生以来不可能变为了可能。

但是这还是有很多限制。例如不能直接启动程序包以外的程序。

不过瑕不掩瑜，下面我们正式介绍一下如何在uwp中启动win32程序。

> <extension category="windows.fullTrustProcess" executable="\[executable file\]">  
> <fulltrustprocess>  
> <parametergroup groupid="\[GroupID\]" parameters="\[Parameters\]">
> 
> </parametergroup>
> 
> </fulltrustprocess>
> 
> </extension>

名称

描述

类别

始终为 `windows.fullTrustProcess`。

GroupID

标识想要传递给可执行文件的参数集的字符串。

Parameters

想要传递给可执行文件的参数。

从上面代码片段中，我们可以看出微软提供的API。具体来说在package中添加说明

相关官方说明☞[桌面桥](https://docs.microsoft.com/zh-cn/windows/uwp/porting/desktop-to-uwp-extensions#win32-process)