---
title: GeoServer简单上手
date: 2020-08-21 15:13:40
cover: https://i.loli.net/2020/08/21/rzyw93HERsBgbuq.jpg
tags: 

---

![](http://geoserver.org/img/geoserver-logo.png)
# GeoServer简单介绍 

GeoServer是OGC Web服务器规范的J2EE实现，利用GeoServer可以方便地发布地图数据，允许用户对特征数据进行更新、删除、插入操作，通过GeoServer可以比较容易地在用户之间迅速共享空间地理信息。GeoServer是开源软件。

# GeoServer的安装

## 安装Java

由于GeoServer是基于Java开发的。因此在安装之前，必须确保安装了Java。

## GeoServer下载

访问GeoServer的管网：http://geoserver.org ，进入下载页面。

## 启动GeoServer

输入以下命令启动

    java -jar start.jar

默认端口8080

稍等片刻，直到信息停止添加。

必须保持本窗口打开，因为关闭该窗口就是关闭GeoServer。当我们与GeoServer交互时，也会在该窗口中显示信息，这些信息可以帮助排除故障。

# GeoServer的初步使用

## 打开GeoServer的Web管理页面

GeoServer的控制和管理是基于网页形式，所有和GeoServer相关的操作都要通过这个Web管理界面来进行，包括全局设置、数据发布与服务配置等。

    http://localhost:8080/geoserver/web/

由于安装GeoServer时也同时安装了一个名为Jetty的Web服务器，默认设置其监听端口为8080，因此该计算机能响应Web服务与页面的请求。

## 登录GeoServer的Web管理页面

在GeoServer的Web管理页面中输入用户名与密码进行登录。如果是默认安装，那么用户名为"admin"，密码为"geoserver"。

![](/img/geoServer/adminPanel.png)

与ArcMap、QGIS将整个地图处理为.mxd或.qgs不同的是，GeoServer使用的是图层与图层组的概念。将在服务器上准备发布为服务的数据定义为一组数据集，然后规定在发布为Web服务时的一些参数。

GeoServer在安装后已经自带了一些样例图层与服务。

# 添加TIF遥感

右边菜单选择```Stores``` 点击 ```Add new Store```选择```GeoTIFF```，设置工作区和名称和描述，并选择Tif文件
![](/img/geoServer/addtif.png)

然后发布图层，检查设置，一般默认即可

![](/img/geoServer/pubilshLayer.png)

## 预览
在Tile Layers 可以预览刚才发布的图层

![](/img/geoServer/preview.png)

## wmts
    http://localhost:8080/geoserver/gwc/service/wmts?
        layer={}
        &style=
        &tilematrixset=EPSG:4326
        &Service=WMTS
        &Request=GetTile
        &Version=1.0.0
        &Format=image。png
        &TileMatrix=EPSG:4326:{z}
        &TileCol={}
        &TileRow={}