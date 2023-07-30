# SQL injection

In this section, we'll explain what SQL injection (SQLi) is, describe some common examples, explain how to find and exploit various kinds of SQL injection vulnerabilities, and summarize how to prevent SQL injection.

在这一小节，将阐述什么是SQL注入、描述一些常见的例子并说明如何寻找和利用各种类型的SQL注入漏洞，最后总结如何预防SQL注入。

![](https://i.imgur.com/TmX3nt4.png)

**Labs**

If you're already familiar with the basic concepts behind SQLi vulnerabilities and just want to practice exploiting them on some realistic, deliberately vulnerable targets, you can access all of the labs in this topic from the link below.

[View all SQL injection labs](https://portswigger.net/web-security/all-labs#sql-injection)

### What is SQL injection (SQLi)?

SQL injection (SQLi) is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.

SQL注入是一种web安全漏洞，允许攻击者干扰应用程序对其数据库的查询。

It generally allows an attacker to view data that they are not normally able to retrieve.

SQL注入通常允许攻击者查看他们一般情况下无法查看到的数据。

This might include data belonging to other users, or any other data that the application itself is able to access.

这些数据可能包括属于其他用户的数据，或是应用程序本身才可访问的数据。

In many cases, an attacker can modify or delete this data, causing persistent changes to the application's content or behavior.

在许多情况下，攻击者可以修改或删除这些数据，导致应用程序的内容或行为的持续变化。

In some situations, an attacker can escalate a SQL injection attack to compromise the underlying server or other back-end infrastructure, or perform a denial-of-service attack.

在某些情况下，攻击者可以构造SQL注入攻击来损害底层服务器或是其他后端关键基础设施或是执行拒绝服务攻击。

### What is the impact of a successful SQL injection attack?

A successful SQL injection attack can result in unauthorized access to sensitive data, such as passwords, credit card details, or personal user information.

一次成功的SQL注入攻击能够导致对敏感数据的非授权访问，比如密码、信用卡信息或用户个人信息等。

Many high-profile data breaches in recent years have been the result of SQL injection attacks, leading to reputational damage and regulatory fines.

近些年来，许多知名的数据泄露都是由于SQL注入攻击造成的。泄露了数据的公司不仅名誉遭受了损失，还要受到监管机构的罚款。

In some cases, an attacker can obtain a persistent backdoor into an organization's systems, leading to a long-term compromise that can go unnoticed for an extended period.

在某些情况下，攻击者可以获得对组织系统的一个持久的后门，这使得他们能够长时间地、悄悄地损害组织系统。

### SQL injection examples

There are a wide variety of SQL injection vulnerabilities, attacks, and techniques, which arise in different situations.

基于情况的不同，有各种各样的SQL注入漏洞、攻击和技巧。

Some common SQL injection examples include:

一些常见的SQL注入的例子包括：

* [Retrieving hidden data](https://portswigger.net/web-security/sql-injection#retrieving-hidden-data), where you can modify a SQL query to return additional results.
* [Subverting application logic](https://portswigger.net/web-security/sql-injection#subverting-application-logic), where you can change a query to interfere with the application's logic.
* [UNION attacks](https://portswigger.net/web-security/sql-injection/union-attacks), where you can retrieve data from different database tables.
* [Examining the database](https://portswigger.net/web-security/sql-injection/examining-the-database), where you can extract information about the version and structure of the database.
* [Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind), where the results of a query you control are not returned in the application's responses.

### Retrieving hidden data

Consider a shopping application that displays products in different categories.

考虑一个分类展示不同商品的商店应用。

When the user clicks on the Gifts category, their browser requests the URL:

当用户点击Gifts分类时，浏览器会向以下URL发起请求：

```
 https://insecure-website.com/products?category=Gifts
```

This causes the application to make a SQL query to retrieve details of the relevant products from the database:

这会使得应用程序向数据库发起如下的查询，希望检索出相关产品的细节。

```
 SELECT * FROM products WHERE category = 'Gifts' AND released = 1
```

This SQL query asks the database to return:

该SQL查询要求数据库返回以下信息：

* all details (\*)
* from the products table
* where the category is Gifts
* and released is 1.

The restriction `released = 1` is being used to hide products that are not released.

`released=1`的限制条件被用来隐藏未发售的商品。

For unreleased products, presumably `released = 0`.

对于未发售的商品，大概率`released=0`.

The application doesn't implement any defenses against SQL injection attacks, so an attacker can construct an attack like:

该应用程序并没有针对SQL注入攻击实现任何的防御措施，所以攻击者可以构造如下的攻击：

```
 https://insecure-website.com/products?category=Gifts'--
```

This results in the SQL query:

最终的SQL语句是：

```
 SELECT * FROM products WHERE category = 'Gifts'--' AND released = 1
```

The key thing here is that the double-dash sequence `--` is a comment indicator in SQL, and means that the rest of the query is interpreted as a comment.

此处的关键在于双破折号`--`在SQL中是注释符的意思，这意味着查询的剩余部分会被SQL解释成注释。

This effectively removes the remainder of the query, so it no longer includes `AND released = 1`.

这实际上移除了查询的剩余部分，所以查询不再包含`AND released=1`。

This means that all products are displayed, including unreleased products.

这意味着所有的商品都会被展示出来，包括未发售的商品。

Going further, an attacker can cause the application to display all the products in any category, including categories that they don't know about:

进一步地，攻击者可以使应用程序展示任何分类的商品，包括他们不知道的分类。攻击的SQL语句如下：

```
 https://insecure-website.com/products?category=Gifts'+OR+1=1--
```

This results in the SQL query:

后端最终的SQL语句如下：

```
 SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1
```

The modified query will return all items where either the category is Gifts, or 1 is equal to 1. Since `1=1` is always true, the query will return all items.

修改后的查询会返回分类是Gifts或1=1的所有项，因为1=1是永真的，所以查询实际上会返回所有项。

**Warning**

Take care when injecting the condition `OR 1=1` into a SQL query.

当向某个SQL查询注入条件`OR 1=1`时要小心。

Although this may be harmless in the initial context you're injecting into, it's common for applications to use data from a single request in multiple different queries.

尽管该条件在你正注入的初始上下文中可能是无害的，但应用程序常常在多个不同的查询中使用来个单个请求的数据。

If your condition reaches an `UPDATE` or `DELETE` statement, for example, this can result in an accidental loss of data.

举个例子，若你的查询条件被带入到了`UPDATE`或`DELETE`语句中，这可能会导致数据的意外丢失。

**LAB**

**APPRENTICE** [SQL injection vulnerability in WHERE clause allowing retrieval of hidden data](https://portswigger.net/web-security/sql-injection/lab-retrieve-hidden-data)

### Subverting application logic（颠覆应用程序的逻辑）

Consider an application that lets users log in with a username and password.

考虑一个让用户以账号密码登录的应用。

If a user submits the username `wiener` and the password `bluecheese`, the application checks the credentials by performing the following SQL query:

若用户提交了用户名`wiener`和密码`bluecheese`，那么应用会通过执行下列的SQL查询来验证用户提交的凭据：

```
 SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'
```

If the query returns the details of a user, then the login is successful.

若查询返回了用户的信息，那么登录成功。

Otherwise, it is rejected.

否则，登录就会被拒绝。

Here, an attacker can log in as any user without a password simply by using the SQL comment sequence `--` to remove the password check from the `WHERE` clause of the query.

在此处，攻击者可在无密码的情况下以任何用户的身份登录。他只需使用SQL注释符序列`--`来移除掉查询的`WHERE`字句。

For example, submitting the username `administrator'--` and a blank password results in the following query:

举个例子，提交用户名`administrator'--` 和一个空密码会构成以下查询：

```
 SELECT * FROM users WHERE username = 'administrator'--' AND password = ''
```

This query returns the user whose username is `administrator` and successfully logs the attacker in as that user.

该查询会返回用户名是`administrator`的用户并让攻击者成功地以该用户的身份登录。

**LAB**

**APPRENTICE** [SQL injection vulnerability allowing login bypass](https://portswigger.net/web-security/sql-injection/lab-login-bypass)

### Retrieving data from other database tables

In cases where the results of a SQL query are returned within the application's responses, an attacker can leverage a SQL injection vulnerability to retrieve data from other tables within the database.

在SQL查询结果会被返回到应用程序响应内的情况下，攻击者能够利用SQL注入漏洞检索数据库内其他表的数据。

This is done using the `UNION` keyword, which lets you execute an additional `SELECT` query and append the results to the original query.

这是通过`UNION`关键字实现的，UNION关键字能让你执行一个额外的`SELECT`查询并将查询结果附加到原始查询后。

For example, if an application executes the following query containing the user input "Gifts":

举个例子，若应用程序执行了以下查询，其中"Gifts"来自用户的输入。

```
 SELECT name, description FROM products WHERE category = 'Gifts'
```

then an attacker can submit the input:

那么攻击者能够提交下列输入：

```
 ' UNION SELECT username, password FROM users--
```

This will cause the application to return all usernames and passwords along with the names and descriptions of products.

该查询会使得应用程序返回所有的用户名和密码以及商品的名称和描述。

**Read more**

[SQL injection UNION attacks](https://portswigger.net/web-security/sql-injection/union-attacks)

### Examining the database

Following initial identification of a SQL injection vulnerability, it is generally useful to obtain some information about the database itself.

在初步识别出SQL注入漏洞后，通常情况下获得一些有关于数据库本身的信息是很有用的。

This information can often pave the way for further exploitation.

这些信息可为进一步的利用打下基础。

You can query the version details for the database.

你也可以执行数据库具体的版本信息。

The way that this is done depends on the database type, so you can **infer** the database type from whichever technique works.

具体的实现方式取决于数据库的类型，因此你可以从有效的payload中推论出数据库的类型。

For example, on Oracle you can execute:

举个例子，在Oracle中你可以执行如下查询：

```
 SELECT * FROM v$version
```

You can also determine what database tables exist, and which columns they contain.

你也可以确定数据库存在什么表以及表所含有的列。

For example, on most databases you can execute the following query to list the tables:

举个例子，在大部分数据库中你可以执行下列查询来列出所有表：

```
 SELECT * FROM information_schema.tables
```

**Read more**

[Examining the database in SQL injection attacks](https://portswigger.net/web-security/sql-injection/examining-the-database)[SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

### Blind SQL injection vulnerabilities

Many instances of SQL injection are blind vulnerabilities.

许多SQL注入都是盲注。

This means that the application does not return the results of the SQL query or the details of any database errors within its responses.

这意味着应用程序不会将SQL查询的结果或是数据库的错误信息返回到其响应中。

Blind vulnerabilities can still be exploited to access unauthorized data, but the techniques involved are generally more complicated and difficult to perform.

我们仍然可以利用盲注来未授权地访问数据，但是盲注涉及到的技巧通常更加复杂并难以执行。

Depending on the nature of the vulnerability and the database involved, the following techniques can be used to exploit blind SQL injection vulnerabilities:

取决于漏洞的特点以及所涉及到的数据库，下列技巧可被用于SQL盲注漏洞的利用：

* You can change the logic of the query to trigger a detectable difference in the application's response depending on the truth of a single condition. This might involve injecting a new condition into some Boolean logic, or conditionally triggering an error such as a divide-by-zero.-根据条件语句的真假，你可以更改查询的逻辑以此在应用程序的响应中引发一个可探查到的差异。这也许会涉及到将一个新的条件注入到某些布尔逻辑中去或者是有条件地引发一个错误，比如除数为0.
* You can conditionally trigger a time delay in the processing of the query, allowing you to infer the truth of the condition based on the time that the application takes to respond.-你也可以在查询的过程中有条件地引发一个时间延迟，这就允许你推断应用程序会响应的基于时间的条件语句的真假
* You can trigger an out-of-band network interaction, using [OAST](https://portswigger.net/burp/application-security-testing/oast) techniques. This technique is extremely powerful and works in situations where the other techniques do not. Often, you can directly exfiltrate data via the out-of-band channel, for example by placing the data into a DNS lookup for a domain that you control.-你也可以使用OAST技术引发一个带外的网络交互，该技巧极其有力并且在其它技巧都无法工作时依然有效。通常，你可以通过带外信道直接地提取数据。比如将数据放置在某个你能控制的域名的DNS查询中。

**Read more**

[Blind SQL injection](https://portswigger.net/web-security/sql-injection/blind)

### How to detect SQL injection vulnerabilities

The majority of SQL injection vulnerabilities can be found quickly and reliably using Burp Suite's [web vulnerability scanner](https://portswigger.net/burp/vulnerability-scanner).

通过Burp Suite 的web漏洞扫描器可以快速可靠地发现大部分的SQL注入漏洞。

SQL injection can be detected manually by using a systematic set of tests against every entry point in the application. This typically involves:

我们也能手工地探查SQL注入漏洞，比如针对应用程序的每个输入点使用一个系统的测试集，通常情况下这包括以下步骤：

* Submitting the single quote character `'` and looking for errors or other anomalies.-提交单引号作为输入并查看有无错误或是其它异常现象。.
* Submitting some SQL-specific syntax that evaluates to the base (original) value of the entry point, and to a different value, and looking for systematic differences in the resulting application responses.-
* Submitting Boolean conditions such as `OR 1=1` and `OR 1=2`, and looking for differences in the application's responses.-提交如`OR 1=1` 和`OR 1=2`等的布尔条件并寻找响应中的差异。
* Submitting payloads designed to trigger time delays when executed within a SQL query, and looking for differences in the time taken to respond.-提交在执行时会引起时间延迟的payloads，并寻找响应所花费的时间差异。
* Submitting OAST payloads designed to trigger an out-of-band network interaction when executed within a SQL query, and monitoring for any resulting interactions.-提交在执行时会引起带外网络交互的OAST payloads，并监视任何产生的交互。

### SQL injection in different parts of the query

Most SQL injection vulnerabilities arise within the `WHERE` clause of a `SELECT` query. This type of SQL injection is generally well-understood by experienced testers.

But SQL injection vulnerabilities can in principle occur at any location within the query, and within different query types. The most common other locations where SQL injection arises are:

* In `UPDATE` statements, within the updated values or the `WHERE` clause.
* In `INSERT` statements, within the inserted values.
* In `SELECT` statements, within the table or column name.
* In `SELECT` statements, within the `ORDER BY` clause.

### SQL injection in different contexts

In all of the labs so far, you've used the query string to inject your malicious SQL payload. However, it's important to note that you can perform SQL injection attacks using any controllable input that is processed as a SQL query by the application. For example, some websites take input in JSON or XML format and use this to query the database.

These different formats may even provide alternative ways for you to [obfuscate attacks](https://portswigger.net/web-security/essential-skills/obfuscating-attacks-using-encodings#obfuscation-via-xml-encoding) that are otherwise blocked due to WAFs and other defense mechanisms. Weak implementations often just look for common SQL injection keywords within the request, so you may be able to bypass these filters by simply encoding or escaping characters in the prohibited keywords. For example, the following XML-based SQL injection uses an XML escape sequence to encode the `S` character in `SELECT`:

```
 <stockCheck>
     <productId>
         123
     </productId>
     <storeId>
         999 &#x53;ELECT * FROM information_schema.tables
     </storeId>
 </stockCheck>
```

This will be decoded server-side before being passed to the SQL interpreter.

**LAB**

**PRACTITIONER**[SQL injection with filter bypass via XML encoding](https://portswigger.net/web-security/sql-injection/lab-sql-injection-with-filter-bypass-via-xml-encoding)

Not solved

### Second-order SQL injection

First-order SQL injection arises where the application takes user input from an HTTP request and, in the course of processing that request, incorporates the input into a SQL query in an unsafe way.

In second-order SQL injection (also known as stored SQL injection), the application takes user input from an HTTP request and stores it for future use.

This is usually done by placing the input into a database, but no vulnerability arises at the point where the data is stored.

Later, when handling a different HTTP request, the application retrieves the stored data and incorporates it into a SQL query in an unsafe way.

![](https://i.imgur.com/hHXgz6V.png)

Second-order SQL injection often arises in situations where developers are aware of SQL injection vulnerabilities, and so safely handle the initial placement of the input into the database.

When the data is later processed, it is deemed to be safe, since it was previously placed into the database safely.

At this point, the data is handled in an unsafe way, because the developer wrongly deems it to be trusted.

### Database-specific factors

Some core features of the SQL language are implemented in the same way across popular database platforms, and so many ways of detecting and exploiting SQL injection vulnerabilities work identically on different types of database.

However, there are also many differences between common databases. These mean that some techniques for detecting and exploiting SQL injection work differently on different platforms. For example:

* Syntax for string concatenation.
* Comments.
* Batched (or stacked) queries.
* Platform-specific APIs.
* Error messages.

**Read more**

[SQL injection cheat sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

### How to prevent SQL injection

Most instances of SQL injection can be prevented by using parameterized queries (also known as prepared statements) instead of string concatenation within the query.

通过使用参数化查询（也被称为预处理语句）而不是在查询中拼接字符串，可以预防大部分 SQL 注入。

The following code is vulnerable to SQL injection because the user input is concatenated directly into the query:

下列代码存在 SQL 注入漏洞，因为用户的输入被直接地拼接到了查询中。

```
 String query = "SELECT * FROM products WHERE category = '"+ input + "'"; Statement statement = connection.createStatement(); ResultSet resultSet = statement.executeQuery(query);
```

This code can be easily rewritten in a way that prevents the user input from interfering with the query structure:

可以轻松地重写上述代码并使得其能够预防用户输入干扰查询结构。

```
 PreparedStatement statement = connection.prepareStatement("SELECT * FROM products WHERE category = ?"); statement.setString(1, input); ResultSet resultSet = statement.executeQuery();
```

Parameterized queries can be used for any situation where untrusted input appears as data within the query, including the `WHERE` clause and values in an `INSERT` or `UPDATE` statement.

**只要不可信的输入出现在查询的数据部分，那么就可以使用参数化查询**，包括`WHERE`子句以及`INSET`或`UPDATE`子句中的值部分。

They can't be used to handle untrusted input in other parts of the query, such as table or column names, or the `ORDER BY` clause.

但是在查询的其他部分就无法使用参数化查询了，比如表名或列名或者是`ORDER BY`子句。

Application functionality that places untrusted data into those parts of the query will need to take a different approach, such as white-listing permitted input values, or using different logic to deliver the required behavior.

所以需要采取不同的方法来处理将不可信的数据放置到查询的这些部分的应用程序函数，比如允许输入值的白名单或是使用不同的逻辑来实现要求的行为。

For a parameterized query to be effective in preventing SQL injection, the string that is used in the query must always be a hard-coded constant, and must never contain any variable data from any origin.

为了使参数化查询能有效的预防 SQL 注入，查询中的字符串必须是硬编码的常量并且一定不能包含来自任意源的可变数据。

Do not be tempted to decide case-by-case whether an item of data is trusted, and continue using string concatenation within the query for cases that are considered safe.

不要尝试决定某项数据是否是可信的，也不要在认为是安全的情况下继续在查询内使用字符串拼接。

It is all too easy to make mistakes about the possible origin of data, or for changes in other code to violate assumptions about what data is tainted.

对数据的可能的来源我们太容易犯错

**Read more**

[Find SQL injection vulnerabilities using Burp Suite's web vulnerability scanner](https://portswigger.net/burp/vulnerability-scanner)
