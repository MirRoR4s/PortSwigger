###### tags: `PortSwigger`
[TOC]
# PortSwigger

## 前言

这是我参看PortSwigger的[web安全文章](https://portswigger.net/web-security/learning-path)的汇总。
>PortSwigger这个并非针对零基础的人，似乎假设你具有一定的计算机基础，如熟悉基本的SQL语言、知晓基本的WEB工作原理。

## 一. SQL injection

### 1.1 SQL injection

- [原文地址](https://portswigger.net/web-security/sql-injection)
- [英文md](https://hackmd.io/Mw5mGNGGRvWP7nSZ4jNRMw)




### 1.2 SQL injection UNION attacks

- [英文md](https://hackmd.io/gjbPhtHDRsOpAs50vIYZlQ)

### 1.3 Examining the database in SQL injection attacks

这篇文章教会了我如何查询不同类型的数据库的版本，以及在mysql、oracle 数据库中针对information schema 的查询。

>information schema 就是一个数据库，里面存储着各个数据库及其表结构、字段信息等。



- [原文地址](https://portswigger.net/web-security/sql-injection/examining-the-database)
- [英文md](https://hackmd.io/pryDQAgsTYWhJqGqBP1KjA)

### 1.4 Blind SQL injection vulnerabilities

盲注的最后描述了针对盲注的带外攻击，主要适用于应用的响应和SQL注入执行时间无关、SQL执行报错无关、SQL查询是否返回任意数据无关的情况。

- [原文地址](https://portswigger.net/web-security/sql-injection/blind)
- [英文md](https://hackmd.io/DepKya4FTQaVohIb68is7g)


### 1.5 Database-specific factors

这里给出了一个针对各种类型的数据库的一个注入语句备忘录，建议时常翻阅。

- [原文地址](https://portswigger.net/web-security/sql-injection/cheat-sheet)
- [英文md](https://hackmd.io/84ChTyieTiq8ffDcZfFHZA)

### 1.6 How to prevent SQL injection

这里给出了几个预防SQL注入的建议，不过最骚的是为burp做了一波宣传，告诉我们如何使用burp的漏洞扫描器发现SQL注入漏洞。

- [原文地址](https://portswigger.net/burp/vulnerability-scanner)
