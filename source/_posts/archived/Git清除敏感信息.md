---
title: Git清除敏感信息
date: 2020-08-14 20:58:23
categories:
  - archived
tags:
---

# 如何删除GIT仓库中的敏感信息

正常Git仓库中应该尽量不包含数据库连接/AWS帐号/巨大二进制文件，否则一旦泄漏到Github，这些非常敏感信息会影响客户的信息安全已经公司的信誉。公司可能其它还有相关规定，如禁止私人邮件加入GIT仓库。如果违反这些规定，可能会面临辞退、高额罚款、或牢狱之灾等非常严厉的惩罚。

由于Git的正常操作流程，导致敏感信息一旦进入主分支，再怎么在新的Pull Request中删除，也无能为力了。其它人都能在历史记录中查询到历史记录中的配置。所以这要求对Git的签名和签入、推送要有高度的敬畏之心。

然而根据墨菲定律，可能发生的事情一定会发生。时不时，故意或失手，就会有人将这些信息写到了Git仓库中。如果代码还没有上传（git push），那可能还好说，只要将分支删除，然后重新写一下功能即可。但如果已经上传了，或功能太多太复制没办法及时删除，就会后悔莫及了。

## 如何删除敏感信息

必须先切换到主分支（一般为master），然后获取最新代码再进行操作：

    git checkout master
    git pull

### 移除数据
filter-branch 是 git 自带的命令：

    git filter-branch --force --index-filter \
    'git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA' \
    --prune-empty --tag-name-filter cat -- --all

### 避免再次提交

为了防止敏感文件再次被提交，可以将其加入到 .gitignore 文件中。

### 提交仓库

    git push origin --force --all