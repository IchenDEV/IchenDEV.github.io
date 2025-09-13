---
title: UWP以管理员身份使用PowerShell
tags:
  - C#
  - powershell
  - 管理员
id: '48'
categories:
  - archived
  - - UWP桌面桥
date: 2018-08-10 21:32:04
---

在开发UWP和传统应用程序通信的程序时，若以管理员身份运行C#程序AppService会连接不上。

下面介绍通过C#传统程序管理员身份启动Powershell执行命令。直接上代码

public static void InvokeSystemPS(string cmd)
        {
            string s1 = "$command =\\"" + cmd + "\\"";
            string ss2 = "Start-Process -FilePath powershell.exe -ArgumentList \\"-noprofile -command $Command\\" -WindowStyle Hidden -Verb runas";
            ps.Add(cmd);
            Runspace runspace = RunspaceFactory.CreateRunspace();
            runspace.Open();
            Pipeline pipeline = runspace.CreatePipeline();

            pipeline.Commands.AddScript(s1);
            pipeline.Commands.AddScript(ss2);
        
            try
            {
               pipeline.InvokeAsync();//Execute the ps script
            }
            catch (Exception e)
            {
            }  
            runspace.Close();         
        }

下面具体介绍一下

"Start-Process -FilePath powershell.exe -ArgumentList \\"-noprofile -command $Command\\" -WindowStyle Hidden -Verb runas"

`-Verb runas` 表示用管理员运行

`-WindowStyle Hidden` 表示隐藏窗口，如果你不想要执行命令时出现一个蓝色的窗口，请添加上这句脚本。

WindowStyle 除了Hidden 还有以下可选

"Show"     
"Maximize" 
"Minimize"