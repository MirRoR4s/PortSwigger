---
description: https://portswigger.net/web-security/cross-site-scripting/stored
---

# Stored XSS

In this section, we'll explain stored cross-site scripting, describe the impact of stored XSS attacks, and spell out how to find stored XSS vulnerabilities.

### What is stored cross-site scripting? <a href="#what-is-stored-cross-site-scripting" id="what-is-stored-cross-site-scripting"></a>

Stored cross-site scripting (also known as second-order or persistent XSS) arises when an application receives data from an untrusted source and includes that data within its later HTTP responses in an unsafe way.

Suppose a website allows users to submit comments on blog posts, which are displayed to other users. Users submit comments using an HTTP request like the following:

`POST /post/comment HTTP/1.1 Host: vulnerable-website.com Content-Length: 100 postId=3&comment=This+post+was+extremely+helpful.&name=Carlos+Montoya&email=carlos%40normal-user.net`

After this comment has been submitted, any user who visits the blog post will receive the following within the application's response:

`<p>This post was extremely helpful.</p>`

Assuming the application doesn't perform any other processing of the data, an attacker can submit a malicious comment like this:

`<script>/* Bad stuff here... */</script>`

Within the attacker's request, this comment would be URL-encoded as:

`comment=%3Cscript%3E%2F*%2BBad%2Bstuff%2Bhere...%2B*%2F%3C%2Fscript%3E`

Any user who visits the blog post will now receive the following within the application's response:

`<p><script>/* Bad stuff here... */</script></p>`

The script supplied by the attacker will then execute in the victim user's browser, in the context of their session with the application.

LABAPPRENTICE[Stored XSS into HTML context with nothing encoded](https://portswigger.net/web-security/cross-site-scripting/stored/lab-html-context-nothing-encoded)Not solved

### Impact of stored XSS attacks <a href="#impact-of-stored-xss-attacks" id="impact-of-stored-xss-attacks"></a>

If an attacker can control a script that is executed in the victim's browser, then they can typically fully compromise that user. The attacker can carry out any of the actions that are applicable to the impact of [reflected XSS vulnerabilities](https://portswigger.net/web-security/cross-site-scripting/reflected).

In terms of exploitability, the key difference between reflected and stored XSS is that a stored XSS vulnerability enables attacks that are self-contained within the application itself. The attacker does not need to find an external way of inducing other users to make a particular request containing their exploit. Rather, the attacker places their exploit into the application itself and simply waits for users to encounter it.

The self-contained nature of stored cross-site scripting exploits is particularly relevant in situations where an XSS vulnerability only affects users who are currently logged in to the application. If the XSS is reflected, then the attack must be fortuitously timed: a user who is induced to make the attacker's request at a time when they are not logged in will not be compromised. In contrast, if the XSS is stored, then the user is guaranteed to be logged in at the time they encounter the exploit.

**Read more**

* [Exploiting cross-site scripting vulnerabilities](https://portswigger.net/web-security/cross-site-scripting/exploiting)

### Stored XSS in different contexts <a href="#stored-xss-in-different-contexts" id="stored-xss-in-different-contexts"></a>

There are many different varieties of stored cross-site scripting. The location of the stored data within the application's response determines what type of payload is required to exploit it and might also affect the impact of the vulnerability.

In addition, if the application performs any validation or other processing on the data before it is stored, or at the point when the stored data is incorporated into responses, this will generally affect what kind of XSS payload is needed.

**Read more**

* [Cross-site scripting contexts](https://portswigger.net/web-security/cross-site-scripting/contexts)

### How to find and test for stored XSS vulnerabilities <a href="#how-to-find-and-test-for-stored-xss-vulnerabilities" id="how-to-find-and-test-for-stored-xss-vulnerabilities"></a>

Many stored XSS vulnerabilities can be found using Burp Suite's [web vulnerability scanner](https://portswigger.net/burp/vulnerability-scanner).

Testing for stored XSS vulnerabilities manually can be challenging. You need to test all relevant "entry points" via which attacker-controllable data can enter the application's processing, and all "exit points" at which that data might appear in the application's responses.

Entry points into the application's processing include:

* Parameters or other data within the URL query string and message body.
* The URL file path.
* HTTP request headers that might not be exploitable in relation to [reflected XSS](https://portswigger.net/web-security/cross-site-scripting/reflected).
* Any out-of-band routes via which an attacker can deliver data into the application. The routes that exist depend entirely on the functionality implemented by the application: a webmail application will process data received in emails; an application displaying a Twitter feed might process data contained in third-party tweets; and a news aggregator will include data originating on other web sites.

The exit points for stored XSS attacks are all possible HTTP responses that are returned to any kind of application user in any situation.

The first step in testing for stored XSS vulnerabilities is to locate the links between entry and exit points, whereby data submitted to an entry point is emitted from an exit point. The reasons why this can be challenging are that:

* Data submitted to any entry point could in principle be emitted from any exit point. For example, user-supplied display names could appear within an obscure audit log that is only visible to some application users.
* Data that is currently stored by the application is often vulnerable to being overwritten due to other actions performed within the application. For example, a search function might display a list of recent searches, which are quickly replaced as users perform other searches.

To comprehensively identify links between entry and exit points would involve testing each permutation separately, submitting a specific value into the entry point, navigating directly to the exit point, and determining whether the value appears there. However, this approach is not practical in an application with more than a few pages.

Instead, a more realistic approach is to work systematically through the data entry points, submitting a specific value into each one, and monitoring the application's responses to detect cases where the submitted value appears. Particular attention can be paid to relevant application functions, such as comments on blog posts. When the submitted value is observed in a response, you need to determine whether the data is indeed being stored across different requests, as opposed to being simply reflected in the immediate response.

When you have identified links between entry and exit points in the application's processing, each link needs to be specifically tested to detect if a stored XSS vulnerability is present. This involves determining the context within the response where the stored data appears and testing suitable candidate XSS payloads that are applicable to that context. At this point, the testing methodology is broadly the same as for finding [reflected XSS vulnerabilities](https://portswigger.net/web-security/cross-site-scripting/reflected).
