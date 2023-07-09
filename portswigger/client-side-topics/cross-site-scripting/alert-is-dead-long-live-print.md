---
description: https://portswigger.net/research/alert-is-dead-long-live-print
---

# alert-is-dead-long-live-print

* alert 已死，print 长存！

[Cross-Site Scripting](https://portswigger.net/web-security/cross-site-scripting) and the alert() function have gone hand in hand for decades. Want to prove you can execute arbitrary JavaScript? Pop an alert. Want to find an XSS vulnerability the lazy way? Inject alert()-invoking payloads everywhere and see if anything pops up.

However, there's trouble brewing on the horizon（麻烦正在酝酿之中）. Malicious adverts have been abusing our beloved alert to **distract（打扰）** and social engineer visitors from inside their iframe.



Google Chrome has decided to **tackle（解决）** this by [disabling alert for cross-domain iframes](https://chromestatus.com/feature/5148698084376576).&#x20;



Cross-domain iframes are often built into websites deliberately, and are also a **near-essential（近乎必须的）** component of [certain relatively advanced XSS attacks](https://portswigger.net/web-security/dom-based/controlling-the-web-message-source).

Once Chrome 92 lands on 20th July 2021, XSS vulnerabilities inside cross-domain iframes will:

* No longer enable alert-based PoCs.
* Be **invisible（隐形的）** to anyone using alert-based detection techniques.

What next? The obvious workaround is to use **prompt** or **confirm**, but unfortunately Chrome's mitigation blocks all **dialogs（对话框）**.&#x20;



Triggering a [DNS pingback](https://portswigger.net/research/hunting-asynchronous-vulnerabilities) to a listener, [OAST-style](https://portswigger.net/burp/application-security-testing/oast) is another potential approach, but less suitable as a PoC due to the config requirements.&#x20;



We also **ruled out（排除）** console.log() as console functions are often **proxied** or disabled by JavaScript obfuscators.

It's quite funny that this "protection" against showing dialogs cross domain blocks alerts and prompts but as [Yosuke Hasegawa pointed out](https://twitter.com/hasegawayosuke/status/1410963117236916227) they forgot about **basic authentication.**&#x20;



This works in the current version of **canary**.&#x20;



It's likely to be blocked in future though.

We needed an alert-alternative that was:

* Simple, **setup-free（免设置）** and easy to remember
* Highly visible, even when executed in an invisible iframe

After weeks of **intensive（** research, we're thrilled to bring you...

### print()

We will be updating our Web Security Academy labs to support print() based solutions shortly. The [XSS cheat sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet) will also be updated to reflect the new print() payloads when using cross domain iframes. We'll keep using alert when there's no iframes involved... for now.

Long live print!

\- Gareth & James
