---
title: Port-Swigger-Examining-the-database
mathjax: true
toc: true
date: 2023-03-30 22:20:23
categories: SQL注入
tags: PortSwigger

---
###### tags: `PortSwigger`

# Examining the database in SQL injection attacks

When exploiting [SQL injection](https://portswigger.net/web-security/sql-injection) vulnerabilities, it is often necessary to gather some information about the database itself. This includes the type and version of the database software, and the contents of the database in terms of which tables and columns it contains.

## Querying the database type and version

Different databases provide different ways of querying their version. You often need to try out different queries to find one that works, allowing you to determine both the type and version of the database software.

The queries to determine the database version for some popular database types are as follows:

| Database type    | Query                     |
| ---------------- | ------------------------- |
| Microsoft, MySQL | `SELECT @@version`        |
| Oracle           | `SELECT * FROM v$version` |
| PostgreSQL       | `SELECT version()`        |

For example, you could use a `UNION` attack with the following input:

```
' UNION SELECT @@version--
```

This might return output like the following, confirming that the database is Microsoft SQL Server, and the version that is being used:

```!
Microsoft SQL Server 2016 (SP2) (KB4052908) - 13.0.5026.0 (X64) Mar 18 2018 09:11:49 Copyright (c) Microsoft Corporation Standard Edition (64-bit) on Windows Server 2016 Standard 10.0 <X64> (Build 14393: ) (Hypervisor)
```

**LAB**

**PRACTITIONER**

[SQL injection attack, querying the database type and version on Oracle](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)



**LAB**

**PRACTITIONER**

[SQL injection attack, querying the database type and version on MySQL and Microsoft](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-mysql-microsoft)



## Listing the contents of the database

Most database types (with the notable exception of Oracle) have a set of views called the information schema which provide information about the database.

You can query `information_schema.tables` to list the tables in the database:

```!
SELECT * FROM information_schema.tables
```

This returns output like the following:

![Uploading file..._1pks0ngem]()



This output indicates that there are three tables, called `Products`, `Users`, and `Feedback`.

You can then query `information_schema.columns` to list the columns in individual tables:

```!
SELECT * FROM information_schema.columns WHERE table_name = 'Users'
```

This returns output like the following:

![](https://i.imgur.com/6hF3Uir.png)



This output shows the columns in the specified table and the data type of each column.

**LAB**

**PRACTITIONER**
[SQL injection attack, listing the database contents on non-Oracle databases](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-non-oracle)

Not solved

### Equivalent to information schema on Oracle

On Oracle, you can obtain the same information with slightly different queries.

You can list tables by querying `all_tables`:

```
SELECT * FROM all_tables
```

And you can list columns by querying `all_tab_columns`:

```
SELECT * FROM all_tab_columns WHERE table_name = 'USERS'
```

**LAB**

**PRACTITIONER**

[SQL injection attack, listing the database contents on Oracle](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-listing-database-contents-oracle)