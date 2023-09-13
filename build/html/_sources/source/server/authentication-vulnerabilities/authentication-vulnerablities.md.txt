###### tags: `PortSwigger`
# Authentication vulnerabilities

Conceptually at least, authentication vulnerabilities are some of the simplest issues to understand. However, they can be among the most critical due to the obvious relationship between authentication and security. As well as potentially allowing attackers direct access to sensitive data and functionality, they also expose additional attack surface for further exploits. For this reason, learning how to identify and exploit authentication vulnerabilities, including how to bypass common protection measures, is a fundamental skill.

In this section, we'll look at some of the most common authentication mechanisms used by websites and discuss potential vulnerabilities in them. We'll highlight both **inherent**（固有的） vulnerabilities in different authentication mechanisms, as well as some typical vulnerabilities that are introduced by their improper implementation. Finally, we'll provide some basic guidance on how you can ensure that your own authentication mechanisms are as robust as possible.

![](https://i.imgur.com/hM5MMZG.png)



#### Labs

If you're already familiar with the basic concepts behind authentication vulnerabilities and just want to practice exploiting them on some realistic, deliberately vulnerable targets, you can access all of the labs in this topic from the link below.

[View all authentication labs](https://portswigger.net/web-security/all-labs#authentication)

## What is authentication?

Authentication is the process of verifying the identity of a given user or client. In other words, it involves making sure that they really are who they claim to be. At least in part, websites are exposed to anyone who is connected to the internet by design. Therefore, robust authentication mechanisms are an **integral**（必要的） aspect of effective web security.

There are three authentication factors into which different types of authentication can be categorized（可以将不同类型的身份验证分为三个身份验证因素：）:

> 关于介词+which语法结构，可参看[此处](https://zhuanlan.zhihu.com/p/481795945)。

- Something you **know**, such as a password or the answer to a security question. These are sometimes referred to as "**knowledge factors**（知识因素）".
- Something you **have**, that is, a physical object like a mobile phone or security token. These are sometimes referred to as "**possession**（占有） factors".
- Something you **are** or do, for example, your biometrics or patterns of behavior. These are sometimes referred to as "**inherence**（固有） factors".

Authentication mechanisms rely on **a range of**（一系列） technologies to verify one or more of these factors.

### What is the difference between authentication and authorization?

Authentication is the process of verifying that a user really **is who they claim to be**, whereas authorization involves verifying whether a user **is allowed to do something**.

In the context of a website or web application, authentication determines whether someone attempting to access the site with the username `Carlos123` really is the same person who created the account.

Once `Carlos123` is authenticated, his permissions determine whether or not he is authorized, for example, to access personal information about other users or perform actions such as deleting another user's account.

## How do authentication vulnerabilities **arise**（产生）?

**Broadly speaking**（一般地说）, most vulnerabilities in authentication mechanisms arise in one of two ways:

- The authentication mechanisms are weak because they fail to adequately protect against brute-force attacks.
- Logic flaws or **poor coding**（糟糕的编码） in the implementation allow the authentication mechanisms to be bypassed entirely by an attacker. This is sometimes referred to as "broken authentication（身份验证缺陷？待定，直译为破碎的身份验证）".

In many areas of web development, [logic flaws](https://portswigger.net/web-security/logic-flaws) will simply cause the website to behave unexpectedly, which may or may not be a security issue. However, as authentication is so critical to security, the likelihood that flawed authentication logic exposes the website to security issues is clearly elevated（提高）.

## What is the impact of vulnerable authentication?

The impact of authentication vulnerabilities can be very severe. Once an attacker has either bypassed authentication or has brute-forced their way into another user's account, they have access to all the data and functionality that the compromised account has. If they are able to compromise a high-privileged account, such as a system administrator, they could take full control over the entire application and potentially gain access to internal infrastructure.

Even compromising a low-privileged account might still grant an attacker access to data that they otherwise shouldn't have, such as commercially sensitive business information. Even if the account does not have access to any sensitive data, it might still allow the attacker to access additional pages, which provide a further attack surface. Often, certain high-severity attacks will not be possible from publicly accessible pages, but they may be possible from an internal page.

## Vulnerabilities in authentication mechanisms

A website's authentication system usually consists of several distinct mechanisms where vulnerabilities may occur. Some vulnerabilities are broadly applicable across all of these contexts, whereas others are more specific to the functionality provided.

We will look more closely at some of the most common vulnerabilities in the following areas:

- [Vulnerabilities in password-based login](https://portswigger.net/web-security/authentication/password-based) LABS
- [Vulnerabilities in multi-factor authentication](https://portswigger.net/web-security/authentication/multi-factor) LABS
- [Vulnerabilities in other authentication mechanisms](https://portswigger.net/web-security/authentication/other-mechanisms) LABS

Note that several of the labs require you to enumerate usernames and brute-force passwords. To help you with this process, we've provided a shortlist of candidate [usernames](https://portswigger.net/web-security/authentication/auth-lab-usernames) and [passwords](https://portswigger.net/web-security/authentication/auth-lab-passwords) that you should use to solve the labs.

### Vulnerabilities in third-party authentication mechanisms

If you love to hack authentication mechanisms, after completing our main authentication labs, more advanced users may want to try and tackle our OAuth authentication labs.

#### Read more

[OAuth authentication](https://portswigger.net/web-security/oauth)

## Preventing attacks on your own authentication mechanisms

We have demonstrated several ways in which websites can be vulnerable due to how they implement authentication. To reduce the risk of such attacks on your own websites, there are several general principles that you should always try to follow.

#### Read more

[How to secure your authentication mechanisms](https://portswigger.net/web-security/authentication/securing)

