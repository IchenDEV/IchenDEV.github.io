---
title: 记一次在Centos6.10上安装Python3.8
date: 2020-09-03 12:46:47
tags:
categories:
  - - '运维'
---
# 问题的由来

现在有一个python3写的django项目，和一台老服务器
服务器上没有安装python3，是Centos6.10系统

# OpenSSL 版本升级

## 查看openssl版本

```bash
openssl version
```
## 下载指定版本的openssl软件  

https://www.openssl.org/source/

```bash
wget https://www.openssl.org/source/openssl-1.1.1g.tar.gz
```

## 编译安装

```bash
cd openssl-1.1.0k
./config shared zlib
make && make install
```

## 配置

```bash
mv /usr/bin/openssl /usr/bin/openssl.bak
mv /usr/include/openssl /usr/include/openssl.bak
find / -name openssl
ln -s /usr/local/bin/openssl /usr/bin/openssl
ln -s /usr/local/include/openssl /usr/include/openssl
echo "/usr/local/lib64/" >> /etc/ld.so.conf
ldconfig 
openssl version -a
```

# sqlite 安装

https://www.sqlite.org/download.html

```bash
wget https://www.sqlite.org/2020/sqlite-amalgamation-3330000.zip
tar xvzf sqlite-autoconf-333000.tar.gz
cd sqlite-autoconf-333000
./configure
make
sudo make install
sudo yum install sqlite-devel
```
# uuid 安装
```bash
yum install libuuid-devel
```

# python3 安装

https://www.python.org/downloads/source/

```bash
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
wget https://www.python.org/ftp/python/3.8.5/Python-3.8.5.tgz
tar -zxvf Python-3.8.5.tgz
cd Python-3.8.5
./configure --prefix=/usr/local/python3
make
make install
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```