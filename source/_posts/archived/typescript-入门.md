---
title: TypeScript 入门
tags: []
id: '398'
categories:
  - archived
  - - Web
date: 2019-07-28 01:08:54
---

# 5分钟上手TypeScript

让我们使用TypeScript来创建一个简单的Web应用。

## 安装TypeScript

废话不多说，直接上代码，直接敲入命令行。（注意权限）

\> npm install -g typescript

## 构建你的第一个TypeScript文件

写代码当然是要写在文件里，那么我们就新建一个空白的文件`index.ts`

我们这里有一段简单的代码，不妨先输入到`index.ts`文件里：

function greeter(person) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);

## 编译代码

不同于JavaScript，TypeScript是要编译的！！！！

运行TypeScript编译器：

tsc greeter.ts

输出结果为一个`index.js`文件，它包含了和输入文件中相同的JavsScript代码。

一切准备就绪，我们可以运行这个使用TypeScript写的JavaScript应用了！㊗️

给 `person`函数的参数添加`: string`类型注解。这样就启动了类型检查，当输入类型不对的参数就会报错，不容易发生奇怪的问题！！

function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";

document.body.innerHTML = greeter(user);

## 类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。 在这个例子里，我们希望 `greeter`函数接收一个字符串参数。 然后尝试把 `greeter`的调用改成传入一个数组：

function greeter(person: string) {
    return "Hello, " + person;
}

let user = \[0, 1, 2\];

document.body.innerHTML = greeter(user);

重新编译，你会看到产生了一个错误。

greeter.ts(7,26): error TS2345: Argument of type 'number\[\]' is not assignable to parameter of type 'string'.

类似地，尝试删除`greeter`调用的所有参数。 TypeScript会告诉你使用了非期望个数的参数调用了这个函数。 在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

要注意的是尽管有错误，`greeter.js`文件还是被创建了。 就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

## 接口

直接上代码，用接口可以进一步约束输入，减少类型的错误

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);

## 类

最后，让我们使用类来改写这个例子。 TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

让我们创建一个`Student`类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。

还要注意的是，在构造函数的参数上使用`public`等同于创建了同名的成员变量。

class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

重新运行`tsc index.ts`，你会看到生成的JavaScript代码和原先的一样。 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。

## 运行TypeScript Web应用

在`index.html`里输入如下内容：

<!DOCTYPE html>
<html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="index.js"></script>
    </body>
</html>

在浏览器里打开`index.html`运行这个应用！