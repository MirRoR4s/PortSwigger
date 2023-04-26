###### tags: `PortSwigger`
[TOC]
# PortSwigger

## 前言

这是我参看PortSwigger的[web安全文章](https://portswigger.net/web-security/learning-path)的汇总。

我的时间不多了，以后可能只能更新WP了....

>PortSwigger这个并非针对零基础的人，似乎假设你具有一定的计算机基础，如熟悉基本的SQL语言、知晓基本的WEB工作原理。

Web Security Academy
Learning path
Here's how to get the most out of the Web Security Academy
If you're new to web security, it can be difficult to know where to begin. That's why we've created this suggested learning path to point you in the right direction. We recommend completing the labs as you go, but don't be afraid to move on to the next topic if you get stuck. You can go back to the more challenging labs once you've developed your skills further.

When you've started to build up your web security testing skills, you could put them to the test with our Burp Suite Certified Practitioner accreditation. Before you are ready to attempt the Burp Suite Certified Practitioner exam, you should be comfortably able to complete all of the labs within the Web Security Academy labeled "Practitioner" or lower. There is no set time frame for completing the labs, but you must be able to do so without requiring access to the solutions provided.

# Server-side topics

For complete beginners, we recommend starting with our server-side topics. These vulnerabilities are typically easier to learn because you only need to understand what's happening on the server. Our materials and labs will help you develop some of the core knowledge and skills that you will rely on time after time.

## 一. SQL injection

### 1.1 SQL injection

- [原文地址](https://portswigger.net/web-security/sql-injection)
- [英文md](./Server%20side%20topics/SQL%20injection/SQL%20injection/README.md)




### 1.2 SQL injection UNION attacks

- [英文md](./Server%20side%20topics/SQL%20injection/SQL%20injection%20UNION%20attacks/README.md)

### 1.3 Examining the database in SQL injection attacks

这篇文章教会了我如何查询不同类型的数据库的版本，以及在mysql、oracle 数据库中针对information schema 的查询。

>information schema 就是一个数据库，里面存储着各个数据库及其表结构、字段信息等。



- [原文地址](https://portswigger.net/web-security/sql-injection/examining-the-database)
- [英文md](./Server%20side%20topics/SQL%20injection/Examining%20the%20database%20in%20SQL%20injection%20attacks/README.md)

### 1.4 Blind SQL injection vulnerabilities

盲注的最后描述了针对盲注的带外攻击，主要适用于应用的响应和SQL注入执行时间无关、SQL执行报错无关、SQL查询是否返回任意数据无关的情况。

- [原文地址](https://portswigger.net/web-security/sql-injection/blind)
- [英文md](./Server%20side%20topics/SQL%20injection/Blind%20SQL%20injection%20vulnerabilities/README.md)


### 1.5 Database-specific factors

这里给出了一个针对各种类型的数据库的一个注入语句备忘录，建议时常翻阅。

- [原文地址](https://portswigger.net/web-security/sql-injection/cheat-sheet)
- [英文md](./Server%20side%20topics/SQL%20injection/Database-specific%20factors/README.md)

### 1.6 How to prevent SQL injection

这里给出了几个预防SQL注入的建议，不过最骚的是为burp做了一波宣传，告诉我们如何使用burp的漏洞扫描器发现SQL注入漏洞。

- [原文地址](https://portswigger.net/burp/vulnerability-scanner)

## 二. Authentication vulnerabilities

### 2.1 Authentication vulnerabilities

- [原文地址](https://portswigger.net/web-security/authentication)
- [英文md](https://hackmd.io/iM6k1WwpTgGvkj7ZrvxyZQ?view)


### 2.2 Vulnerabilities in password-based login

- [原文地址](https://portswigger.net/web-security/authentication/password-based)
- [英文md](https://hackmd.io/LG7NGqN4Ssa_d2BJKqddnA?view)

<!-- 2.2 目前只完成了基于密码的身份验证。 -->

### 2.3 Vulnerabilities in multi-factor authentication

>难度较高，需要一定的耐心。

- [原文地址](https://portswigger.net/web-security/authentication/multi-factor)
- [英文md](https://hackmd.io/W3qhAWCSSx6l5lhJGDuRaQ?view)

### 2.4 Vulnerabilities in other authentication mechanisms

- [原文地址](https://portswigger.net/web-security/authentication/other-mechanisms)
- [英文md](https://hackmd.io/PiuQaEO8QYOcFkdMsL9xng)

## 三. Directory traversal


### 3.1 Directory traversal

目录遍历是任意文件读取吗？(●'◡'●)

- [原文地址](https://portswigger.net/web-security/file-path-traversal)
- [英文md](./Server%20side%20topics/Directory%20traversal/README.md)

## 四. OS command injection

### 4.1 OS command injection


学完之后可以掌握如何进行命令注入，包括有回显的命令注入和无回显的命令盲注。

通过带外注入我们可以成功破除命名盲注的限制拿到执行命令的结果。



- [原文地址](https://portswigger.net/web-security/os-command-injection)
- [英文md](./Server%20side%20topics/OS%20command%20injection/README.md)

## 五. Business logic vulnerabilities

第五篇讲述业务逻辑漏洞，值得一看。

### 5.1 Business logic vulnerabilities
- [原文地址](https://portswigger.net/web-security/logic-flaws)
- [英文md](./Server%20side%20topics/Business%20logic%20vulnerabilities/README.md)


### 5.2 Examples

- [原文地址](https://portswigger.net/web-security/logic-flaws/examples)
- [英文md](https://hackmd.io/AMXU9EAURwabi-9Vbw0d2A?both)


## 六. Information disclosure vulnerabilities

### 6.1 Information disclosure vulnerabilities

- [原文地址](https://portswigger.net/web-security/information-disclosure)
- [英文md](https://hackmd.io/WGRxJMaKSuKJGZ7yzfmKYA?both)

### 6.2 How to find and exploit information disclosure vulnerabilities

- [原文地址](https://portswigger.net/web-security/information-disclosure/exploiting)
- [英文md](./Server%20side%20topics/Information%20disclosure%20vulnerabilities/How%20to%20find%20and%20exploit%20information%20disclosure%20vulnerabilities/README.md)



## 八. File upload vulnerabilities

- [英文md](./Server%20side%20topics/File%20upload%20vulnerabilities/README.md)
