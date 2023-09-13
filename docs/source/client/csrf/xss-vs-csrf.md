# XSS vs CSRF

In this section, we'll explain the differences between XSS and [CSRF](https://portswigger.net/web-security/csrf), and discuss whether CSRF tokens can help to prevent XSS attacks.

## What is the difference between XSS and CSRF?

[Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting) (or XSS) allows an attacker to execute arbitrary JavaScript within the browser of a victim user.

[Cross-site request forgery](https://portswigger.net/web-security/csrf) (or CSRF) allows an attacker to induce a victim user to perform actions that they do not intend to.

The consequences of XSS vulnerabilities are generally more serious than for CSRF vulnerabilities:

- CSRF often only applies to a subset of actions that a user is able to perform. Many applications implement CSRF defenses in general but overlook one or two actions that are left exposed. Conversely, a successful XSS exploit can normally induce a user to perform any action that the user is able to perform, regardless of the functionality in which the vulnerability arises.
- CSRF can be described as a "one-way" vulnerability, in that while an attacker can induce the victim to issue an HTTP request, they cannot retrieve the response from that request. Conversely, XSS is "two-way", in that the attacker's injected script can issue arbitrary requests, read the responses, and exfiltrate data to an external domain of the attacker's choosing.

## Can CSRF tokens prevent XSS attacks?

Some XSS attacks can indeed be prevented through effective use of CSRF tokens. Consider a simple [reflected XSS](https://portswigger.net/web-security/cross-site-scripting/reflected) vulnerability that can be trivially exploited like this:

```http
https://insecure-website.com/status?message=<script>/*+Bad+stuff+here...+*/</script>
```

Now, suppose that the vulnerable function includes a CSRF token:

```http
https://insecure-website.com/status?csrf-token=CIwNZNlR4XbisJF39I8yWnWX9wX4WFoz&message=<script>/*+Bad+stuff+here...+*/</script>
```

Assuming that the server properly validates the CSRF token, and rejects requests without a valid token, then the token does prevent exploitation of the XSS vulnerability. The clue here is in the name: "cross-site scripting", at least in its [reflected](https://portswigger.net/web-security/cross-site-scripting/reflected) form, involves a cross-site request. By preventing an attacker from forging a cross-site request, the application prevents trivial exploitation of the XSS vulnerability.

Some important caveats arise here:

- If a reflected XSS vulnerability exists anywhere else on the site within a function that is not protected by a CSRF token, then that XSS can be exploited in the normal way.
- If an exploitable XSS vulnerability exists anywhere on a site, then the vulnerability can be leveraged to make a victim user perform actions even if those actions are themselves protected by CSRF tokens. In this situation, the attacker's script can request the relevant page to obtain a valid CSRF token, and then use the token to perform the protected action.
- CSRF tokens do not protect against [stored XSS](https://portswigger.net/web-security/cross-site-scripting/stored) vulnerabilities. If a page that is protected by a CSRF token is also the output point for a stored XSS vulnerability, then that XSS vulnerability can be exploited in the usual way, and the XSS payload will execute when a user visits the page.