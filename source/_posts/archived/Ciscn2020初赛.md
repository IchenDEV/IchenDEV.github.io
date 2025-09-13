---
title: Ciscn2020初赛
date: 2020-09-03 13:15:43
tags: CTF
categories:
  - archived
  - - CTF
---

# 1 签到

## 操作内容：

## flag值：

flag{同舟共济扬帆起，乘风破浪万里航。}

# 2 the\_best\_ctf\_game

## 操作内容：

使用gedit软件打开文件，即可看见类似flag的字符串，将其中的字母，花括号与连接线拼接，即可得到flag。

## flag值：

    flag{65e02f26-0d6e-463f-bc63-2df733e47fbe}

# 3 电脑被黑

首先用压缩软件查看disk\_dump文件内容，发现有demo和fakeflag.txt文件，经过ida64反编译demo后发现是一个异或加密程序，由此写出解密程序


解密程序如下：
``` cpp
#include <iostream>;
using namespace std;
int main() {

FILE \*file, \*out;

file = fopen("flag.txt","rb");
out = fopen("out.txt", "wb");
int v4 = 34;
int v5 = 0;
while (true) {
    char v6 = fgetc(file);
    if (feof(file))
        break;
    fputc((v6 ^ v4) - v5, out);
    v4 += 34;
    v5 = (v5 + 2) & 0xF;
}
return 0;
}
```
解密fakeflag.txt得到假的flag

由此从disk\_dump寻找真flag，通过fakeflag.txt被加密可推测真flag也被加密，由于flag加密后前几位16进制相同，查找后得到另一个加密后的flag的16进制，解密后得到真的flag: 

    flag{e5d7c4ed-b8f6-4417-8317-b809fc26c047}


## flag值：

    flag{e5d7c4ed-b8f6-4417-8317-b809fc26c047}

# 8 bd

e很大，明显wiener-attack

攻击脚本：

[https://github.com/pablocelayes/rsa-wiener-attack](https://github.com/pablocelayes/rsa-wiener-attack)

得到d

    d=1485313191830359055093545745451584299495272920840463008756233L

参考

[https://blog.csdn.net/kevin66654/article/details/54087647](https://blog.csdn.net/kevin66654/article/details/54087647)

轻松解得

    p=0x95f9b5e0daedf8a85878b1c5ee5a8d7f072641c16ac53073ae513538e9beecbcba773438e5cdc81348749208113fd1fe8ab7be62d4bf0ca2d5dc43fa9638d789L 

    q=0xd3655e049cda0628dd3b8dec46edcace0be0a62946bcaf46c4e7f6bb11fa6953f29b00e416737093a0fcb72a0862668575b8aee244444e0812ad3b5b9fe8e0d9L

p、q、e、d全部知道，容易解密。

## flag值：

    flag{d3752538-90d0-c373-cfef-9247d3e16848}

# 15 z3


ida 发现大量表达式，构建z3表达式，求解
``` python
>>> from z3 import *
>>> v46 = Int('v46')
>>> v47 = Int('v47')
>>> v48 = Int('v48')
>>> v49 = Int('v49')
>>> v50 = Int('v50')
>>> v51 = Int('v51')
>>> v52 = Int('v52')
>>> v53 = Int('v53')
>>> v54 = Int('v54')
>>> v55 = Int('v55')
>>> v56 = Int('v56')
>>> v57 = Int('v57')
>>> v58 = Int('v58')
>>> v59 = Int('v59')
>>> v60 = Int('v60')
>>> v61 = Int('v61')
>>> v62 = Int('v62')
>>> v63 = Int('v63')
>>> v64 = Int('v64')
>>> v65 = Int('v65')
>>> v66 = Int('v66')
>>> v67 = Int('v67')
>>> v68 = Int('v68')
>>> v69 = Int('v69')
>>> v70 = Int('v70')
>>> v71 = Int('v71')
>>> v72 = Int('v72')
>>> v73 = Int('v73')
>>> v74 = Int('v74')
>>> v75 = Int('v75')
>>> v76 = Int('v76')
>>> v77 = Int('v77')
>>> v78 = Int('v78')
>>> v79 = Int('v79')
>>> v80 = Int('v80')
>>> v81 = Int('v81')
>>> v82 = Int('v82')
>>> v83 = Int('v83')
>>> v84 = Int('v84')
>>> v85 = Int('v85')
>>> v86 = Int('v86')
>>> v87 = Int('v87')
>>> s = Solver()
>>> s.add(0x4F17 == 34 * v49 + 12 * v46 + 53 * v47 + 6 * v48 + 58 * v50 + 36 * v51 + v52)
>>> s.add(0x9CF6 == 27 * v50 + 73 * v49 + 12 * v48 + 83 * v46 + 85 * v47 + 96 * v51 + 52 * v52)
>>> s.add(0x8DDB == 24 * v48 + 78 * v46 + 53 * v47 + 36 * v49 + 86 * v50 + 25 * v51 + 46 * v52)
>>> s.add(0x8EA6 == 78 * v47 + 39 * v46 + 52 * v48 + 9 * v49 + 62 * v50 + 37 * v51 + 84 * v52)
>>> s.add(0x6929 == 48 * v50 + 14 * v48 + 23 * v46 + 6 * v47 + 74 * v49 + 12 * v51 + 83 * v52)
>>> s.add(0x9911 == 15 * v51 + 48 * v50 + 92 * v48 + 85 * v47 + 27 * v46 + 42 * v49 + 72 * v52)
>>> s.add(0x40A2 == 26 * v51 + 67 * v49 + 6 * v47 + 4 * v46 + 3 * v48 + 68 * v52)
>>> s.add(0x2F3E == 34 * v56 + 12 * v53 + 53 * v54 + 6 * v55 + 58 * v57 + 36 * v58 + v59)
>>> s.add(0x62B6 == 27 * v57 + 73 * v56 + 12 * v55 + 83 * v53 + 85 * v54 + 96 * v58 + 52 * v59)
>>> s.add(0x4B82 == 24 * v55 + 78 * v53 + 53 * v54 + 36 * v56 + 86 * v57 + 25 * v58 + 46 * v59)
>>> s.add(0x486C == 78 * v54 + 39 * v53 + 52 * v55 + 9 * v56 + 62 * v57 + 37 * v58 + 84 * v59)
>>> s.add(0x4002 == 48 * v57 + 14 * v55 + 23 * v53 + 6 * v54 + 74 * v56 + 12 * v58 + 83 * v59)
>>> s.add(0x52D7 == 15 * v58 + 48 * v57 + 92 * v55 + 85 * v54 + 27 * v53 + 42 * v56 + 72 * v59)
>>> s.add(0x2DEF == 26 * v58 + 67 * v56 + 6 * v54 + 4 * v53 + 3 * v55 + 68 * v59)
>>> s.add(0x28DC == 34 * v63 + 12 * v60 + 53 * v61 + 6 * v62 + 58 * v64 + 36 * v65 + v66)
>>> s.add(0x640D== 27 * v64 + 73 * v63 + 12 * v62 + 83 * v60 + 85 * v61 + 96 * v65 + 52 * v66)
>>> s.add(0x528F== 24 * v62 + 78 * v60 + 53 * v61 + 36 * v63 + 86 * v64 + 25 * v65 + 46 * v66)
>>> s.add(0x613B== 78 * v61 + 39 * v60 + 52 * v62 + 9 * v63 + 62 * v64 + 37 * v65 + 84 * v66)
>>> s.add(0x4781== 48 * v64 + 14 * v62 + 23 * v60 + 6 * v61 + 74 * v63 + 12 * v65 + 83 * v66)
>>> s.add(0x6B17== 15 * v65 + 48 * v64 + 92 * v62 + 85 * v61 + 27 * v60 + 42 * v63 + 72 * v66)
>>> s.add(0x3237== 26 * v65 + 67 * v63 + 6 * v61 + 4 * v60 + 3 * v62 + 68 * v66)
>>> s.add(0x2A93== 34 * v70 + 12 * v67 + 53 * v68 + 6 * v69 + 58 * v71 + 36 * v72 + v73)
>>> s.add(0x615F== 27 * v71 + 73 * v70 + 12 * v69 + 83 * v67 + 85 * v68 + 96 * v72 + 52 * v73)
>>> s.add(0x50BE== 24 * v69 + 78 * v67 + 53 * v68 + 36 * v70 + 86 * v71 + 25 * v72 + 46 * v73)
>>> s.add(0x598E== 78 * v68 + 39 * v67 + 52 * v69 + 9 * v70 + 62 * v71 + 37 * v72 + 84 * v73)
>>> s.add(0x4656== 48 * v71 + 14 * v69 + 23 * v67 + 6 * v68 + 74 * v70 + 12 * v72 + 83 * v73)
>>> s.add(0x5B31== 15 * v72 + 48 * v71 + 92 * v69 + 85 * v68 + 27 * v67 + 42 * v70 + 72 * v73)
>>> s.add(0x313A== 26 * v72 + 67 * v70 + 6 * v68 + 4 * v67 + 3 * v69 + 68 * v73)
>>> s.add(0x3010== 34 * v77 + 12 * v74 + 53 * v75 + 6 * v76 + 58 * v78 + 36 * v79 + v80)
>>> s.add(0x67FE== 27 * v78 + 73 * v77 + 12 * v76 + 83 * v74 + 85 * v75 + 96 * v79 + 52 * v80)
>>> s.add(0x4D5F== 24 * v76 + 78 * v74 + 53 * v75 + 36 * v77 + 86 * v78 + 25 * v79 + 46 * v80)
>>> s.add(0x58DB== 78 * v75 + 39 * v74 + 52 * v76 + 9 * v77 + 62 * v78 + 37 * v79 + 84 * v80)
>>> s.add(0x3799== 48 * v78 + 14 * v76 + 23 * v74 + 6 * v75 + 74 * v77 + 12 * v79 + 83 * v80)
>>> s.add(0x60A0== 15 * v79 + 48 * v78 + 92 * v76 + 85 * v75 + 27 * v74 + 42 * v77 + 72 * v80)
>>> s.add(0x2750== 26 * v79 + 67 * v77 + 6 * v75 + 4 * v74 + 3 * v76 + 68 * v80)
>>> s.add(0x3759== 34 * v84 + 12 * v81 + 53 * v82 + 6 * v83 + 58 * v85 + 36 * v86 + v87)
>>> s.add(0x8953== 27 * v85 + 73 * v84 + 12 * v83 + 83 * v81 + 85 * v82 + 96 * v86 + 52 * v87)
>>> s.add(0x7122== 24 * v83 + 78 * v81 + 53 * v82 + 36 * v84 + 86 * v85 + 25 * v86 + 46 * v87)
>>> s.add(0x81F9== 78 * v82 + 39 * v81 + 52 * v83 + 9 * v84 + 62 * v85 + 37 * v86 + 84 * v87)
>>> s.add(0x5524== 48 * v85 + 14 * v83 + 23 * v81 + 6 * v82 + 74 * v84 + 12 * v86 + 83 * v87)
>>> s.add(0x8971== 15 * v86 + 48 * v85 + 92 * v83 + 85 * v82 + 27 * v81 + 42 * v84 + 72 * v87)
>>> s.add(0x3A1D == 26 * v86 + 67 * v84 + 6 * v82 + 4 * v81 + 3 * v83 + 68 * v87)
>>> s.check()
sat
>>> s.model()
[v84 = 54,
 v65 = 52,
 v63 = 57,
 v74 = 45,
 v47 = 108,
 v62 = 98,
 v81 = 97,
 v64 = 45,
 v48 = 97,
 v51 = 55,
 v58 = 51,
 v53 = 49,
 v49 = 103,
 v55 = 49,
 v57 = 52,
 v67 = 49,
 v54 = 55,
 v70 = 57,
 v69 = 45,
 v56 = 100,
 v86 = 56,
 v72 = 48,
 v60 = 54,
 v78 = 52,
 v68 = 56,
 v79 = 99,
 v75 = 54,
 v46 = 102,
 v77 = 49,
 v76 = 101,
 v50 = 123,
 v61 = 51,
 v71 = 57,
 v82 = 102,
 v83 = 101,
 v85 = 52,
 v87 = 125,
 v80 = 50,
 v73 = 101,
 v66 = 101,
 v59 = 45,
 v52 = 101
```
转Ascii得到flag

## flag值：

    flag{7e171d43-63b9-4e18-990e-6e14c2afe48}

# 16 hyperthreading


经过动态调试，发现每一个字符与处理后的加密值有一一对应关系，输入flag值0123456789abcdef-{}获得编码表，根据最后比较字符串解得到flag

## flag值：

    flag{a959951b-76ca-4784-add7-93583251ca92}

# 19 easyphp

题目大概的意思是说，他创建了子进程，但是没有wait，导致子进程比父进程提早结束，变成了僵尸进程。所以fork不了，一直在else里面出不来。我们要进入else if里面。需要用a传入一个函数去干掉僵尸进程。b是函数三个参数中的一个参数，我就让他等于当前进程号。通过call\_user\_func绕过正则。

payload：

    ?a=call\_user\_func&amp;b=pcntl\_waitpid

## flag值：

    flag{d105f31d-b687-4e06-877d-4ce2191ca095}

# 21 littlegame

**原型链污染**

根据[https://snyk.io/vuln/SNYK-JS-SETVALUE-450213](https://snyk.io/vuln/SNYK-JS-SETVALUE-450213)的poc即可

payload如下图：

## flag值：

交的那一次忘了记录，后面重开获得

    flag{b56cfbc1-3a12-44a6-ac96-c6b89ff6adcb}

# 22 recme

构建符合格式正则的payload，用反引号执行

payload：

    {if:print\_r(`cat /flag`)}123{end if}

## flag值：

    flag{31263f16-97ff-4f5c-ac46-1e296289e7d0}
