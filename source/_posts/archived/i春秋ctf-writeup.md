---
title: I春秋CTF writeup
tags: []
id: '427'
categories:
  - archived
  - - CTF
    - misc
date: 2020-04-13 17:42:27
---

## MISC

### 0x01 你好，i春秋

题目内容：关注i春秋微信（微信号：icqedu）回复CTF会有意想不到的内容哦

解法：调戏微信机器人

![](https://i0.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/image-2.png?fit=335%2C1024&ssl=1)

flag{xin\_lei\_bu\_lei\_14b4s}

### 0x02 Hello World!

题目内容：

In this capture the flag competiton you're hunting for these strings, we call them "flags". These flags always begin with "IceCTF{" followed by a message in 1337sp34k and end with "}". Here's an example flag "IceCTF{h3l10\_wr0ld}". Try submitting it through the text box down below!

flag：IceCTF{h3l10\_wr0ld} 

### 0x03 Vape Nation

题目内容：Go Green!   [vape\_nation.png](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/IceCTF/stego/vape_nation.png)

解法：用Stegsolve看一下Green 0

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午6.07.41.png?fit=750%2C849&ssl=1)

### 0x04 签到题

题目内容：

对百度杯用时下最流行的表白（去调戏i春秋公众号）大声说出你的爱！！！

flag：flag{baIdU\_8ei\_meme\_D0}

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午5.49.20.png?fit=750%2C404&ssl=1)

### 0x05 那些年我追过的贝丝

题目内容：

贝丝贝丝，我爱你（大声循环2的6次方ing）

ZmxhZ3tpY3FlZHVfZ29nb2dvX2Jhc2U2NH0=

解法： base64 搞一下就完了

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午5.52.13.png?fit=750%2C402&ssl=1)

flag：flag{icqedu\_gogogo\_base64}

### 0x06 我要变成一只程序猿

题目内容：

输入：ba1f2511fc30423bdb

再运行一下

就会有惊喜哦！！[点击下载附件](https://static2.ichunqiu.com/icq/resources//fileupload/CTF/BSRC/BSRC10-1/dadaddadadadaa.rar)

解法：直接编译，输入ba1f2511fc30423bdb 输出就是flag

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午5.58.59.png?fit=750%2C532&ssl=1)

### 0x07 剧情大反转

题目内容：}~144\_0t\_em0c14w{galf

解法： 反转字符串即可

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午6.06.35.png?fit=750%2C503&ssl=1)

flag：flag{w41c0me\_t0\_441~}

### 0x08 challenge

题目内容：666c61677b686578327374725f6368616c6c656e67657d

解法：HEX编码，让cyberchef魔法一下就好了

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午6.11.43.png?fit=750%2C503&ssl=1)

flag：flag{hex2str\_challenge}

### 0x09 传说中的签到题

题目内容：小编保证这次是正常的签到题。按例，继续调戏小i公众号。输入关键词“答案在哪里”。就能获得你想要的。诺！扫码直接关注

flag：什么

### 0x0A 听说是rc4算法

题目内容：

key welcometoicqedu 

密文UUyFTj8PCzF6geFn6xgBOYSvVTrbpNU4OF9db9wMcPD1yDbaJw== 

\# -\*- coding: utf-8 -\*-
import random, base64
from hashlib import sha1

def crypt(data, key):
    """RC4 algorithm"""
    x = 0
    box = range(256)
    for i in range(256):
        x = (x + box\[i\] + ord(key\[i % len(key)\])) % 256
        box\[i\], box\[x\] = box\[x\], box\[i\]
    x = y = 0
    out = \[\]
    for char in data:
        x = (x + 1) % 256
        y = (y + box\[x\]) % 256
        box\[x\], box\[y\] = box\[y\], box\[x\]
        out.append(chr(ord(char) ^ box\[(box\[x\] + box\[y\]) % 256\]))

    return ''.join(out)

def tencode(data, key, encode=base64.b64encode, salt\_length=16):
    """RC4 encryption with random salt and final encoding"""
    salt = ''
    for n in range(salt\_length):
        salt += chr(random.randrange(256))
    data = salt + crypt(data, sha1(key + salt).digest())
    if encode:
        data = encode(data)
    return data

def tdecode(data, key, decode=base64.b64decode, salt\_length=16):
    """RC4 decryption of encoded data"""
    if decode:
        data = decode(data)
    salt = data\[:salt\_length\]
    return crypt(data\[salt\_length:\], sha1(key + salt).digest())

def main(data,key):
    # 需要解密的数据
    encoded\_data = 'UUyFTj8PCzF6geFn6xgBOYSvVTrbpNU4OF9db9wMcPD1yDbaJw== '
    # 密钥
    key = 'welcometoicqedu'
    # 加码
    #encoded\_data = tencode(data=data, key=key)
    #print encoded\_data
    # 解码
    decoded\_data = tdecode(data=encoded\_data, key=key)
    print decoded\_data

flag:flag{rc4\_l\_keepgoing}

### 0x0B try again

题目内容： try to find the flag [附件下载](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC10-3/babyre)

题解：反编译一下，在string可以看到flag

![](https://i1.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午7.18.11-1.png?fit=750%2C438&ssl=1)

### 0x0C 表姐家的签到题

题目内容：

出题人表示金盆洗手不坑任何参赛选手干脆利落，直接奉上答案就是123456abcdef

![](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC10-3/biaojiememeda.jpg)

flag：flag{123456abcdef}

### 0x0D 泄露的数据

题目内容：

听说这是某个数据库的泄漏的重要数据

25d55ad283aa400af464c76d713c07ad，试着找出原始key吧。

flag{key}

题解：看提示盲猜md5,查md5数据库得到

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午7.34.13.png?fit=750%2C503&ssl=1)

flag:flag{12345678}

### 0x0E 考眼力

题目内容： gmbh{4d850d5c3c2756f67b91cbe8f046eebd} 

try to find the flag

题解：一看就是凯撒加密，解一下就可以了

 flag{4c850c5b3b2756e67a91bad8e046ddac} 

### 0x0F flag格式

你真的知道flag格式吗？

尝试提交flag{0ahief9124jfjir}

flag：flag{0ahief9124jfjir}

### 0x10 小可爱

### 0x11 签到题

题目内容：

春秋Game CTF交流群（455849389）

春秋Game是永信至诚旗下三大春秋品牌之一，旨在以先进的网络安全竞赛平台和专业的赛事运营服务，推动网络安全知识、技术的普及，提高网络安全相关从业者能力，提升各行各业的网络安全综合水平。希望和广大网络安全竞赛圈同仁共同推动网络安全竞赛活动的发展，同时春秋Game也欢迎更多社区伙伴洽谈非商务合作，包括品牌联合推广、内容共建等项目。

flag{iCHunQIu-ctf-9uanf4ang}

### 0x12 所以这是13点吗

题目内容：synt{mur\_VF\_syn9\_svtug1at}

ROT13一下就好了

### 0x13 嘀嘀嘀

题目内容：

..-. .-.. .- --. . --... .---- -.-. .- ..... -.-. -.. -....- --... -.. -... ----. -....- ....- -... .- ...-- -....- ----. ...-- ---.. ...-- -....- .---- .- ..-. ---.. -.... --... ---.. ---.. .---- ..-. ----- --...

MORES 解一下就好了

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午8.48.31.png?fit=750%2C503&ssl=1)

flage{71ca5cd-7db9-4ba3-9383-1af867881f07}

### 0x14 山岚

题目内容：

f5-lf5aa9gc9{-8648cbfb4f979c-c2a851d6e5-c}

栅栏加密解一下就好了

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午8.54.17.png?fit=750%2C442&ssl=1)

flag{6cb9c256-5fac-4b47-a1ec-59988ff9c8d5}

### 0x15 签到题2

题目内容：

还是签到题[附件下载](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC11-2/UnAA8F1998B46A9B06CA443071866EA125.txt)

解法如图：

![](https://i0.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.00.04.png?fit=750%2C503&ssl=1)

flag{th1s\_is\_Un1c0de\_you\_Know?}

### 0x16 XX

题目内容：

LNalVNrhIO4ZnLqZnLpVsAqtXA4FZTEc+

题解： XX编码，解码即可

flag{This\_is\_Xx3nc0de}

### 0x17 贝丝家族

题目内容：

我喜欢贝丝，但是贝丝的表妹喜欢我

还给了我一封情诗 MZWGCZ33MVZGQZLJL5STQOJTGRPWK4SVJ56Q====

题解：BASE32编码

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.06.26.png?fit=750%2C410&ssl=1)

flag{erhei\_e8934\_erUO}

### 0x18 敲击

题目内容：

方方格格，不断敲击

“wdvtdz  qsxdr werdzxc  esxcfr uygbn”

flag格式为：flag{小写的字符串}

题解：在键盘上比划一下就知道了

flag{xvzoc}

### 0x19 签到题3

题目内容：21232f297a57a5a743894a0e4a801fc3

题解：发现32位长，md5查一下

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.16.46.png?fit=750%2C410&ssl=1)

flag{admin}

### 0x1A 小常识

题目内容：

低频ID卡数据格式转换小常识

将下列16进制串中倒数第5，6位转换为3位十进制数，

将最后4位转换为5位十进制卡号，中间用“，”分开。

0000944664

flag{148,18020}

### 0x1B 回归原始

题目内容：

让我们回到最开始的地方

011001100110110001100001011001110111101101100011011001010011001101100101001101010011000000110010011000110010110100110100001110000110001100111001001011010011010001100100001101010011000000101101001110010011100100111001001100000010110100110101011000100011100000110001011001000110001000110110011001100110001101100010011001100011000001111101

题解：二进制编码，cyberchef魔法一下就可以了

![](https://i0.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.23.05.png?fit=750%2C410&ssl=1)

flag{ce3e502c-48c9-4d50-9990-5b81db6fcbf0}

### 0x1C 一个16岁的少年

题目内容：

有一天，表姐的好朋友贝丝远房的表亲，一个16岁的少年

给表姐递了一封情书，表姐看不懂，你能帮忙翻译下吗？

666C61677B65633862326565302D336165392D346332312D613031322D3038616135666137626536377D

题解：HEX编码，cyberchef魔法一下就可以了

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.25.11.png?fit=750%2C410&ssl=1)

flag{ec8b2ee0-3ae9-4c21-a012-08aa5fa7be67}

### 0x1D 藏在邮件头里的秘密

题目内容：

flag{ichunqiu\_=E6=8A=80=E6=9C=AF=E6=9C=89=E6=B8=A9=E5=BA=A6}

题解：PQ编码，cyberchef魔法一下就可以了

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.27.58.png?fit=750%2C410&ssl=1)

flag{ichunqiu\_技术有温度}

### 0x1E 吃货

题目内容：麻辣烫的标配

flag{abbab\_babbb\_baaaa\_aaabb}

题解：培根密码

![](https://i2.wp.com/blogs.idevlab.cn/wp-content/uploads/2020/04/截屏2020-04-13-下午9.33.19.png?fit=750%2C410&ssl=1)

flag{N\_X\_Q\_D}

### 0x1F misc1

题目内容：

话不多说，看图片

![](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC12-3/misc1.jpg)

拖到010,翻到最后直接看到flag

flag{stego\_is\_s0\_bor1ing}

### 0x20 misc2

题目内容：

![](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC12-3/kaixin.jpg)

题解：猪圈密码

flag{NSN}

### 0x21 misc3

题目内容：

哒哒哒哒，你知道什么是键盘坐标密码吗？

11 21 31 18 27 33 34

flag格式：flag{\*\*\*\*\*}

我们注意到大键盘区所有的字母上面都有其对应的数字，这个位置几乎在所有的键盘都是相同的。所以我们可以利用这一点应用单表替换的方法进行加密\[注2\]：

1 2 3 4 5 6 7 8 9 0

Q W E R T Y U I O P

A S D F G H J K L

Z X C V B N M

我们根据上表可以得出，Q是1下面的第一个，A是1下面的第二个……以此类推，每一个字母都会有其对应的数字：  
A 12                B 53               C 33  
  
第一个数字代表横向（X坐标）的位置，第二个数字代表纵向（Y坐标）的位置

就可以得到最后的答案：flag{QAZIJ\*\*}

flag{QAZIJCV}

### 0x22 福尔摩斯

题目内容：

贝克街旁的圆形广场

·-· ·-· ·-· ·-· ·-· ·-· ·

flag格式：flag{\*\*\*\*\*\*\*\*\*}

题解：MORSE，cyberchef解一下就可以了

flag{RRRRRRE}

### 0x23 +——+

+++++ +++++ \[->++ +++++ +++<\] >++.+ +++++ .<+++ \[->-- -<\]>- -.+++ +++.<  
++++\[ ->+++ +<\]>+ +++.< +++++ +++\[- >---- ----< \]>--- --.+. ----- -.<++  
+++++ \[->++ +++++ <\]>++ ++.-- --.<+ +++++ \[->-- ----< \]>--- ----- .----  
\--.++ +++++ +.<++ +\[->- --<\]> --.++ +++.+ +++.- .<+++ +++\[- >++++ ++<\]>  
+++++ +++.< +++++ ++\[-> ----- --<\]> ---.+ +++++ +.+++ ++.-- ----- .<+++  
++++\[ ->+++ ++++< \]>+++ .<+++ ++++\[ ->--- ----< \]>--- ----- .<+++ ++++\[  
\->+++ ++++< \]>+++ .<+++ ++++\[ ->--- ----< \]>.++ ++.-- -.--- -.<++ +++++  
\[->++ +++++ <\]>++ ++.<+ +++++ \[->-- ----< \]>--- ----- ---.- --.<+ +++++  
+\[->+ +++++ +<\]>+ ..<++ ++++\[ ->--- ---<\] >---- --.-- -.+.+ ++.-- ---.+  
++++. ----- ----. <++++ ++++\[ ->+++ +++++ <\]>++ +++++ +++++ +.<

题解：barinfuck

flag{671fb608-265a-492f-a041-b30bb8569490}

### 0x24 misc1-纵横四海

题目内容：

有句话说的好

（大表姐最美）

。

。

。

。

。

天下分久必合，合久必分

[附件下载](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC12-4/tiaoxiwoya_F738231D64472CF1476F941699E20618.zip)

### 0x25 misc2-对错

如果说1代表对，0代表错，那么-1代表？[附件下载](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC12-4/duicuo_DCA74A67DC1C2C2A43E6F7F0AE6236DE.txt)

题解：二进制编码，cyberchef魔法一下就可以了

flag{zhEc9034jodsjfosko}

### 0x26 misc3-枯竭

题目内容：

讲真的，才华已经枯竭

大家好好答题

也许这道题一点都不坑

也许。。。。。

[附件下载](https://static2.ichunqiu.com/icq/resources/fileupload/CTF/BSRC/BSRC12-4/misc3_BDAE109BD7B51BF98BA9BB501C0F45C2.zip)

题解：弱密码

flag{319b7f63-e17d-4ac5-8428-c2476c7ecce3}