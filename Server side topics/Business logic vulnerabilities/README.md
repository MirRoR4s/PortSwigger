###### tags: `PortSwigger`
# Examples of business logic vulnerabilities

[Business logic vulnerabilities](https://portswigger.net/web-security/logic-flaws) are relatively specific to the context in which they occur. However, although individual instances of [logic flaws](https://portswigger.net/web-security/logic-flaws) differ hugely, they can share many common themes. In particular, they can be loosely grouped based on the initial mistakes that introduced the vulnerability in the first place.

In this section, we'll look at examples of some typical mistakes that design and development teams make and show you how they can directly lead to business logic flaws. Whether you're developing your own applications, or auditing existing ones, you can take the lessons learned from these examples and apply the same critical thinking to other applications that you encounter.

Examples of logic flaws include:

- [Excessive trust in client-side controls](https://portswigger.net/web-security/logic-flaws/examples#excessive-trust-in-client-side-controls) LABS
- [Failing to handle unconventional input](https://portswigger.net/web-security/logic-flaws/examples#failing-to-handle-unconventional-input) LABS
- [Making flawed assumptions about user behavior](https://portswigger.net/web-security/logic-flaws/examples#making-flawed-assumptions-about-user-behavior) LABS
- [Domain-specific flaws](https://portswigger.net/web-security/logic-flaws/examples#domain-specific-flaws) LABS
- [Providing an encryption oracle](https://portswigger.net/web-security/logic-flaws/examples#providing-an-encryption-oracle) LABS

## Excessive trust in client-side controls

A fundamentally flawed assumption is that users will only interact with the application via the provided web interface. This is especially dangerous because it leads to the further assumption that client-side validation will prevent users from supplying malicious input. However, an attacker can simply use tools such as Burp Proxy to tamper with the data after it has been sent by the browser but before it is passed into the server-side logic. This effectively renders the client-side controls useless.

Accepting data at face value, without performing proper integrity checks and server-side validation, can allow an attacker to do all kinds of damage with relatively minimal effort. Exactly what they are able to achieve is dependent on the functionality and what it is doing with the controllable data. In the right context, this kind of flaw can have devastating consequences for both business-related functionality and the security of the website itself.

**LAB**

[Excessive trust in client-side controls](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-excessive-trust-in-client-side-controls)

>这个实验的逻辑漏洞发生在添加商品时可以修改商品对应的价格。

**LAB**

[2FA broken logic](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-broken-logic)


## Failing to handle unconventional input

One aim of the application logic is to restrict user input to values that adhere to the business rules. For example, the application may be designed to accept arbitrary values of a certain data type, but the logic determines whether or not this value is acceptable from the perspective of the business. Many applications incorporate numeric limits into their logic. This might include limits designed to manage inventory, apply budgetary restrictions, trigger phases of the supply chain, and so on.

Let's take the simple example of an online shop. When ordering products, users typically specify the quantity that they want to order. Although any integer is theoretically a valid input, the business logic might prevent users from ordering more units than are currently in stock, for example.

To implement rules like this, developers need to anticipate all possible scenarios and incorporate ways to handle them into the application logic. In other words, they need to tell the application whether it should allow a given input and how it should react based on various conditions. If there is no explicit logic for handling a given case, this can lead to unexpected and potentially exploitable behavior.

For example, a numeric data type might accept negative values. Depending on the related functionality, it may not make sense for the business logic to allow this. However, if the application doesn't perform adequate server-side validation and reject this input, an attacker may be able to pass in a negative value and induce unwanted behavior.

Consider a funds transfer between two bank accounts. This functionality will almost certainly check whether the sender has sufficient funds before completing the transfer:

```
$transferAmount = $_POST['amount']; 
$currentBalance = $user->getBalance();
if ($transferAmount <= $currentBalance){
  // Complete the transfer }
else {  
  // Block the transfer: insufficient funds }
```

But if the logic doesn't sufficiently prevent users from supplying a negative value in the `amount` parameter, this could be exploited by an attacker to both bypass the balance check and transfer funds in the "wrong" direction. If the attacker sent -$1000 to the victim's account, this might result in them receiving $1000 from the victim instead. The logic would always evaluate that -1000 is less than the current balance and approve the transfer.

Simple logic flaws like this can be devastating if they occur in the right functionality. They are also easy to miss during both development and testing, especially given that such inputs may be blocked by client-side controls on the web interface.

When auditing an application, you should use tools such as Burp Proxy and Repeater to try submitting unconventional values. In particular, try input in ranges that legitimate users are unlikely to ever enter. This includes exceptionally high or exceptionally low numeric inputs and abnormally long strings for text-based fields. You can even try unexpected data types. By observing the application's response, you should try and answer the following questions:

- Are there any limits that are imposed on the data?
- What happens when you reach those limits?
- Is any transformation or normalization being performed on your input?

This may expose weak input validation that allows you to manipulate the application in unusual ways. Keep in mind that if you find one form on the target website that fails to safely handle unconventional input, it's likely that other forms will have the same issues.

**LAB**

[High-level logic vulnerability](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-high-level)



**LAB**

[Low-level logic flaw](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-low-level)



**LAB**

[Inconsistent handling of exceptional input](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-handling-of-exceptional-input)



## Making flawed assumptions about user behavior

One of the most common root causes of [logic vulnerabilities](https://portswigger.net/web-security/logic-flaws) is making flawed assumptions about user behavior. This can lead to a wide range of issues where developers have not considered potentially dangerous scenarios that violate these assumptions. In this section, we'll provide some cautionary examples of common assumptions that should be avoided and demonstrate how they can lead to dangerous logic flaws.

### Trusted users won't always remain trustworthy

Applications may appear to be secure because they implement seemingly robust measures to enforce the business rules. Unfortunately, some applications make the mistake of assuming that, having passed these strict controls initially, the user and their data can be trusted indefinitely. This can result in relatively lax enforcement of the same controls from that point on.

If business rules and security measures are not applied consistently throughout the application, this can lead to potentially dangerous loopholes that may be exploited by an attacker.

**LAB**

**APPRENTICE**[Inconsistent security controls](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-inconsistent-security-controls)

Not solved

### Users won't always supply mandatory input

One misconception is that users will always supply values for mandatory input fields. Browsers may prevent ordinary users from submitting a form without a required input, but as we know, attackers can tamper with parameters in transit. This even extends to removing parameters entirely.

This is a particular issue in cases where multiple functions are implemented within the same server-side script. In this case, the presence or absence of a particular parameter may determine which code is executed. Removing parameter values may allow an attacker to access code paths that are supposed to be out of reach.

When probing for logic flaws, you should try removing each parameter in turn and observing what effect this has on the response. You should make sure to:

- Only remove one parameter at a time to ensure all relevant code paths are reached.
- Try deleting the name of the parameter as well as the value. The server will typically handle both cases differently.
- Follow multi-stage processes through to completion. Sometimes tampering with a parameter in one step will have an effect on another step further along in the workflow.

This applies to both URL and `POST` parameters, but don't forget to check the cookies too. This simple process can reveal some bizarre application behavior that may be exploitable.

**LAB**

**PRACTITIONER**[Weak isolation on dual-use endpoint](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-weak-isolation-on-dual-use-endpoint)

Not solved

**LAB**

**APPRENTICE**[Password reset broken logic](https://portswigger.net/web-security/authentication/other-mechanisms/lab-password-reset-broken-logic)

Not solved

### Users won't always follow the intended sequence

Many transactions rely on predefined workflows consisting of a sequence of steps. The web interface will typically guide users through this process, taking them to the next step of the workflow each time they complete the current one. However, attackers won't necessarily adhere to this intended sequence. Failing to account for this possibility can lead to dangerous flaws that may be relatively simple to exploit.

For example, many websites that implement two-factor authentication (2FA) require users to log in on one page before entering a verification code on a separate page. Assuming that users will always follow this process through to completion and, as a result, not verifying that they do, may allow attackers to bypass the 2FA step entirely.

**LAB**

**APPRENTICE**[2FA simple bypass](https://portswigger.net/web-security/authentication/multi-factor/lab-2fa-simple-bypass)

Not solved

Making assumptions about the sequence of events can lead to a wide range of issues even within the same workflow or functionality. Using tools like Burp Proxy and Repeater, once an attacker has seen a request, they can replay it at will and use forced browsing to perform any interactions with the server in any order they want. This allows them to complete different actions while the application is in an unexpected state.

To identify these kinds of flaws, you should use forced browsing to submit requests in an unintended sequence. For example, you might skip certain steps, access a single step more than once, return to earlier steps, and so on. Take note of how different steps are accessed. Although you often just submit a `GET` or `POST` request to a specific URL, sometimes you can access steps by submitting different sets of parameters to the same URL. As with all logic flaws, try to identify what assumptions the developers have made and where the attack surface lies. You can then look for ways of violating these assumptions.

Note that this kind of testing will often cause exceptions because expected variables have null or uninitialized values. Arriving at a location in a partly defined or inconsistent state is also likely to cause the application to complain. In this case, be sure to pay close attention to any error messages or debug information that you encounter. These can be a valuable source of [information disclosure](https://portswigger.net/web-security/information-disclosure), which can help you fine-tune your attack and understand key details about the back-end behavior.

**LAB**

**PRACTITIONER**[Insufficient workflow validation](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-insufficient-workflow-validation)

Not solved

**LAB**

**PRACTITIONER**[Authentication bypass via flawed state machine](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-flawed-state-machine)

Not solved

## Domain-specific flaws

In many cases, you will encounter logic flaws that are specific to the business domain or the purpose of the site.

The discounting functionality of online shops is a classic attack surface when hunting for logic flaws. This can be a potential gold mine for an attacker, with all kinds of basic logic flaws occurring in the way discounts are applied.

For example, consider an online shop that offers a 10% discount on orders over $1000. This could be vulnerable to abuse if the business logic fails to check whether the order was changed after the discount is applied. In this case, an attacker could simply add items to their cart until they hit the $1000 threshold, then remove the items they don't want before placing the order. They would then receive the discount on their order even though it no longer satisfies the intended criteria.

You should pay particular attention to any situation where prices or other sensitive values are adjusted based on criteria determined by user actions. Try to understand what algorithms the application uses to make these adjustments and at what point these adjustments are made. This often involves manipulating the application so that it is in a state where the applied adjustments do not correspond to the original criteria intended by the developers.

To identify these vulnerabilities, you need to think carefully about what objectives an attacker might have and try to find different ways of achieving this using the provided functionality. This may require a certain level of domain-specific knowledge in order to understand what might be advantageous in a given context. To use a simple example, you need to understand social media to understand the benefits of forcing a large number of users to follow you.

Without this knowledge of the domain, you may dismiss dangerous behavior because you simply aren't aware of its potential knock-on effects. Likewise, you may struggle to join the dots and notice how two functions can be combined in a harmful way. For simplicity, the examples used in this topic are specific to a domain that all users will already be familiar with, namely an online shop. However, whether you're bug bounty hunting, [pentesting](https://portswigger.net/solutions/penetration-testing), or even just a developer trying to write more secure code, you may at some point encounter applications from less familiar domains. In this case, you should read as much documentation as possible and, where available, talk to subject-matter experts from the domain to get their insight. This may sound like a lot of work, but the more obscure the domain is, the more likely other testers will have missed plenty of bugs.

**LAB**

**APPRENTICE**[Flawed enforcement of business rules](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-flawed-enforcement-of-business-rules)

Not solved

**LAB**

**PRACTITIONER**[Infinite money logic flaw](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-infinite-money)

Not solved

## Providing an encryption oracle

Dangerous scenarios can occur when user-controllable input is encrypted and the resulting ciphertext is then made available to the user in some way. This kind of input is sometimes known as an "encryption oracle". An attacker can use this input to encrypt arbitrary data using the correct algorithm and asymmetric key.

This becomes dangerous when there are other user-controllable inputs in the application that expect data encrypted with the same algorithm. In this case, an attacker could potentially use the encryption oracle to generate valid, encrypted input and then pass it into other sensitive functions.

This issue can be compounded if there is another user-controllable input on the site that provides the reverse function. This would enable the attacker to decrypt other data to identify the expected structure. This saves them some of the work involved in creating their malicious data but is not necessarily required to craft a successful exploit.

The severity of an encryption oracle depends on what functionality also uses the same algorithm as the oracle.

**LAB**

**PRACTITIONER**[Authentication bypass via encryption oracle](https://portswigger.net/web-security/logic-flaws/examples/lab-logic-flaws-authentication-bypass-via-encryption-oracle)

