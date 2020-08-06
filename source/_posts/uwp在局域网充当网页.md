---
title: UWP在局域网充当网页
tags: []
id: '209'
categories:
  - - 开发C#
  - - '%e5%bc%80%e5%8f%91c'
    - 文件浏览器
date: 2018-09-12 16:32:34
---

在同一个局域网中我们可以使用Restup构建一个局域网的网页。

我们使用HtmlAgilityPack编辑Html文件。

首先，建议在Github下载Restup的源码和示例https://github.com/tomkuijsten/restup

一下为Restup的初始化函数，你可以看到其将网站指向应用目录下的RAST\\Web（当然你也可以设置为应用本地数据目录），并启用了8800端口。

```
    private async Task InitializeWebServer()
        {
            var restRouteHandler = new RestRouteHandler();

            restRouteHandler.RegisterController<AsyncControllerSample>();
            restRouteHandler.RegisterController<FromContentControllerSample>();
            restRouteHandler.RegisterController<PerCallControllerSample>();
            restRouteHandler.RegisterController<SimpleParameterControllerSample>();
            restRouteHandler.RegisterController<SingletonControllerSample>();
            restRouteHandler.RegisterController<ThrowExceptionControllerSample>();
            restRouteHandler.RegisterController<WithResponseContentControllerSample>();
 
            var configuration = new HttpServerConfiguration()
                .ListenOnPort(8800)
                .RegisterRoute("api", restRouteHandler)
                .RegisterRoute(new StaticFileRouteHandler(@"RAST\Web"))
                .EnableCors(); // allow cors requests on all origins
                               //.EnableCors(x => x.AddAllowedOrigin("http://specificserver:<listen-port>"));

            var httpServer = new HttpServer(configuration);
            _httpServer = httpServer;
            await httpServer.StartServerAsync();


            // Don't release deferral, otherwise app will stop
        }
```

而我们的文件夹里面是一个你要显示的网站,示例文件夹目录如下图所示

![](https://idevlab.cn/wordpress/wp-content/uploads/2018/09/p-2.png)

至于Controller就直接克隆示例就行了。

下面使用**其他设备** 打开浏览器输入你电脑的{ip}:{Port}，

例如 192.168.1.102:8800

不出意外的话你就可以在你其他设备上看到你的网页。

别忘了完成后记得关闭服务器。

```
  if (_httpServer != null)
            {
                _httpServer.StopServer();
            }
```

至于对显示的网页进行修改，请在打开服务器之前修改。

建议使用HtmlAgilityPack。具体实现这里不再阐述。