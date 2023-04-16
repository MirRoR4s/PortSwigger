###### tags: `PortSwigger`
# Directory traversal

In this section, we'll explain what directory traversal is, describe how to carry out path traversal attacks and **circumvent**（绕过） common obstacles, and **spell out**（讲清楚） how to prevent path traversal vulnerabilities.

![](https://i.imgur.com/cXN8vqX.png)

##### 实验：汇总

If you're already familiar with the basic concepts behind directory traversal and just want to practice exploiting them on some realistic, deliberately vulnerable targets, you can access all of the labs in this topic from the link below.

[View all directory traversal labs](https://portswigger.net/web-security/all-labs#directory-traversal)

## What is directory traversal?

Directory traversal (also known as file path traversal) is a web security vulnerability that allows an attacker to read arbitrary files on the server that is running an application. This might include application code and data, credentials for back-end systems, and sensitive operating system files. In some cases, an attacker might be able to write to arbitrary files on the server, allowing them to modify application data or behavior, and **ultimately**（最终） take full control of the server.

> 目录穿越也被称为文件路径穿越。

## Reading arbitrary files via directory traversal

Consider a shopping application that displays images of items for sale. Images are loaded via some HTML like the following:

```html
<img src="/loadImage?filename=218.png">
```
The `loadImage` URL takes a `filename` parameter and returns the contents of the specified file. The image files themselves are stored on disk in the location `/var/www/images/`. To return an image, the application appends the requested filename to this base directory and uses a filesystem API to read the contents of the file. In the above case, the application reads from the following file path:

```http
/var/www/images/218.png
```

The application implements no defenses against directory traversal attacks, so an attacker can request the following URL to retrieve an arbitrary file from the server's filesystem:

```http
https://insecure-website.com/loadImage?filename=../../../etc/passwd
```

This causes the application to read from the following file path:

```http
/var/www/images/../../../etc/passwd
```

The sequence `../` is valid within a file path, and means to **step up**（提高） one level in the directory structure. The three consecutive `../` sequences step up from `/var/www/images/` to the filesystem root, and so the file that is actually read is:

```http
/etc/passwd
```

On Unix-based operating systems, this is a standard file containing details of the users that are registered on the server.

On Windows, both `../` and `..\` are valid directory traversal sequences, and an equivalent attack to retrieve a standard operating system file would be:

```
https://insecure-website.com/loadImage?filename=..\..\..\windows\win.ini
```

##### **实验：文件路径穿越**

[File path traversal, simple case](https://portswigger.net/web-security/file-path-traversal/lab-simple)



## Common obstacles to exploiting file path traversal vulnerabilities

Many applications that place user input into file paths implement some kind of defense against path traversal attacks, and these can often be circumvented.

If an application strips or blocks directory traversal sequences from the user-supplied filename, then it might be possible to bypass the defense using a variety of techniques.


You might be able to use an absolute path from the filesystem root, such as `filename=/etc/passwd`, to directly reference a file without using any traversal sequences.

##### **实验：使用绝对路径绕过穿越序列过滤**

[File path traversal, traversal sequences blocked with absolute path bypass](https://portswigger.net/web-security/file-path-traversal/lab-absolute-path-bypass)


##### 实验：双写穿越序列

You might be able to use nested traversal sequences, such as `....//` or `....\/`, which will revert to simple traversal sequences when the inner sequence is stripped.



[File path traversal, traversal sequences stripped non-recursively](https://portswigger.net/web-security/file-path-traversal/lab-sequences-stripped-non-recursively)

##### 编码绕过实验

In some contexts, such as in a URL path or the `filename` parameter of a `multipart/form-data` request, web servers may strip any directory traversal sequences before passing your input to the application. You can sometimes bypass this kind of sanitization by URL encoding, or even double URL encoding, the `../` characters, resulting in `%2e%2e%2f` or `%252e%252e%252f` respectively. Various non-standard encodings, such as `..%c0%af` or `..%ef%bc%8f`, may also do the trick.

For [Burp Suite Professional](https://portswigger.net/burp/pro) users, Burp Intruder provides a predefined payload list (**Fuzzing - path traversal**), which contains a variety of encoded path traversal sequences that you can try.

**LAB**

[File path traversal, traversal sequences stripped with superfluous URL-decode](https://portswigger.net/web-security/file-path-traversal/lab-superfluous-url-decode)


##### 限定文件开头路径绕过实验

If an application requires that the user-supplied filename must start with the expected base folder, such as `/var/www/images`, then it might be possible to include the required base folder followed by suitable traversal sequences. For example:

```http
filename=/var/www/images/../../../etc/passwd
```

**LAB**

[File path traversal, validation of start of path](https://portswigger.net/web-security/file-path-traversal/lab-validate-start-of-path)

##### 文件后缀名限定绕过实验（空字节绕过）

If an application requires that the user-supplied filename must end with an expected file extension, such as `.png`, then it might be possible to use a null byte to effectively terminate the file path before the required extension. For example:

```
filename=../../../etc/passwd%00.png
```

**LAB**

[File path traversal, validation of file extension with null byte bypass](https://portswigger.net/web-security/file-path-traversal/lab-validate-file-extension-null-byte-bypass)



## How to prevent a directory traversal attack

The most effective way to prevent file path traversal vulnerabilities is to avoid passing user-supplied input to filesystem APIs **altogether**（完全地）. Many application functions that do this can be rewritten to **deliver**（实现） the same behavior in a safer way.

如何避免文件路径穿越漏洞？最有效的方法就是完全地避免将用户的输入传入到文件系统的 APIs。许多这样做的应用程序函数实际上可以重新编写，以一种更安全的方式实现相同的业务逻辑（行为）。



If it is considered unavoidable to pass user-supplied input to filesystem APIs, then two layers of defense should be used together to prevent attacks:

- The application should validate the user input before processing it. Ideally, the validation should compare against a whitelist of permitted values. If that isn't possible for the required functionality, then the validation should verify that the input contains only permitted content, such as purely alphanumeric characters.
- After validating the supplied input, the application should append the input to the base directory and use a platform filesystem API to **canonicalize**（规范化转换） the path. It should verify that the canonicalized path starts with the expected base directory.

如果说我们无法避免呢？这时候我们可以考虑以下两个防护措施：

1. 应用程序在处理用户输入前应先对其进行校验/验证。理想情况下，校验应和白名单里的值进行比较。如果做不到这一点，那么校验应确保输入的内容只包含了允许的内容，比如输入仅由字母字符组成。
2. 在对用户的输入进行了校验之后，应用程序应将输入追加到基目录之后，并使用文件系统 API 对整体路径进行规范化转换。我们应确保规范化之后的路径以预期的基目录开始。



Below is an example of some simple Java code to validate the canonical path of a file based on user input:

```
File file = new File(BASE_DIRECTORY, userInput); if (file.getCanonicalPath().startsWith(BASE_DIRECTORY)) {    // process file }
```

#### Read more

[Find directory traversal vulnerabilities using Burp Suite's web vulnerability scanner](https://portswigger.net/burp/vulnerability-scanner)

