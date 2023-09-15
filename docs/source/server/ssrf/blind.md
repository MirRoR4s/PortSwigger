# Blind SSRF vulnerabilities

In this section, we'll explain what blind [server-side request forgery](https://portswigger.net/web-security/ssrf) is, describe some common blind SSRF examples, and explain how to find and exploit blind SSRF vulnerabilities.

## What is blind SSRF?

Blind SSRF vulnerabilities arise when an application can be induced to issue a back-end HTTP request to a supplied URL, but the response from the back-end request is not returned in the application's front-end response.

## What is the impact of blind SSRF vulnerabilities?

The impact of blind SSRF vulnerabilities is often lower than fully informed SSRF vulnerabilities because of their one-way nature. They cannot be trivially exploited to retrieve sensitive data from back-end systems, although in some situations they can be exploited to achieve full remote code execution.

## How to find and exploit blind SSRF vulnerabilities

The most reliable way to detect blind SSRF vulnerabilities is using out-of-band ([OAST](https://portswigger.net/burp/application-security-testing/oast)) techniques. This involves attempting to trigger an HTTP request to an external system that you control, and monitoring for network interactions with that system.

The easiest and most effective way to use out-of-band techniques is using [Burp Collaborator](https://portswigger.net/burp/documentation/collaborator). You can use [Burp Collaborator](https://portswigger.net/burp/documentation/desktop/tools/collaborator) to generate unique domain names, send these in payloads to the application, and monitor for any interaction with those domains. If an incoming HTTP request is observed coming from the application, then it is vulnerable to SSRF.

#### Note

It is common when testing for SSRF vulnerabilities to observe a DNS look-up for the supplied Collaborator domain, but no subsequent HTTP request. This typically happens because the application attempted to make an HTTP request to the domain, which caused the initial DNS lookup, but the actual HTTP request was blocked by network-level filtering. It is relatively common for infrastructure to allow outbound DNS traffic, since this is needed for so many purposes, but block HTTP connections to unexpected destinations.

**LAB**

PRACTITIONER[Blind SSRF with out-of-band detection](https://portswigger.net/web-security/ssrf/blind/lab-out-of-band-detection)

Not solved

Simply identifying a blind [SSRF vulnerability](https://portswigger.net/web-security/ssrf) that can trigger out-of-band HTTP requests doesn't in itself provide a route to exploitability. Since you cannot view the response from the back-end request, the behavior can't be used to explore content on systems that the application server can reach. However, it can still be leveraged to probe for other vulnerabilities on the server itself or on other back-end systems. You can blindly sweep the internal IP address space, sending payloads designed to detect well-known vulnerabilities. If those payloads also employ blind out-of-band techniques, then you might uncover a critical vulnerability on an unpatched internal server.

**LAB**

EXPERT[Blind SSRF with Shellshock exploitation](https://portswigger.net/web-security/ssrf/blind/lab-shellshock-exploitation)

Not solved

Another avenue for exploiting blind SSRF vulnerabilities is to induce the application to connect to a system under the attacker's control, and return malicious responses to the HTTP client that makes the connection. If you can exploit a serious client-side vulnerability in the server's HTTP implementation, you might be able to achieve remote code execution within the application infrastructure.

#### Read more

- [Cracking the lens: Remote client exploits](https://portswigger.net/blog/cracking-the-lens-targeting-https-hidden-attack-surface#remoteclient)