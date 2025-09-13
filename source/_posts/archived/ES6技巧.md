---
title: ES6-2021技巧
date: 2021-02-19 23:37:35
tags: Javascript
categories:
  - archived
  - - Web
---
# ES 6-2021 技巧

## let和const命令

ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
## 数组的解构赋值

```javascript
var [a, b, c] = [1, 2, 3];

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
### 默认值
```javascript
var [foo = true] = [];
foo // true

[x, y = 'b'] = ['a']; // x='a', y='b'
[x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
## ES6 字符串的扩展

ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

```javascript
"\u{20BB7}"
// "𠮷"
```

## ES6 正则的扩展

在ES5中，RegExp构造函数的参数有两种情况。

第一种情况是，参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
第二种情况是，参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。

var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;
```

但是，ES5不允许此时使用第二个参数，添加修饰符，否则会报错。
ES6改变了这种行为。如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
```javascript
new RegExp(/abc/ig, 'i').flags
// "i"
```

## ES6 数值的扩展

### 二进制和八进制表示法

ES6提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
```javascript
0b111110111 === 503 // true
0o767 === 503 // true
```

从ES5开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6进一步明确，要使用前缀0o表示。

如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
```javascript
Number('0b111')  // 7
Number('0o10')  // 8
```
### Number.isFinite(), Number.isNaN()
ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

Number.isFinite()用来检查一个数值是否为有限的（finite）

Number.isNaN()用来检查一个值是否为NaN

### Number.parseInt(), Number.parseFloat()

ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

### Number.isInteger()

Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。

### Number.EPSILON

ES6在Number对象上面，新增一个极小的常量Number.EPSILON。
```javascript
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// '0.00000000000000022204'

引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。

0.1 + 0.2
// 0.30000000000000004

0.1 + 0.2 - 0.3
// 5.551115123125783e-17

5.551115123125783e-17.toFixed(20)
// '0.00000000000000005551'
```
Number.EPSILON

但是如果这个误差能够小于Number.EPSILON，我们就可以认为得到了正确结果。
```javascript
5.551115123125783e-17 < Number.EPSILON
// true
```

因此，Number.EPSILON的实质是一个可以接受的误差范围

### 安全整数和Number.isSafeInteger()

JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。

## ES6 数组的扩展
### Array.from()

Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

### Array.of()

Array.of方法用于将一组值，转换为数组。
```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```
这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
```javascript
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]
```

### 数组实例的find()和findIndex()

数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
```
### 数组实例的fill()

fill方法使用给定值，填充一个数组。
```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

### 数组实例的includes()

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。
```javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true

```

### 数组的空位

数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。
```javascript
Array(3) // [, , ,]
```

上面代码中，Array(3)返回一个具有3个空位的数组。

注意，空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
```javascript
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```

上面代码说明，第一个数组的0号位置是有值的，第二个数组的0号位置没有值。

ES5对空位的处理，已经很不一致了，大多数情况下会忽略空位。

forEach(), filter(), every() 和some()都会跳过空位。

map()会跳过空位，但会保留这个值

join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

## ES6 对象的扩展

属性的简洁表示法

ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
```javascript
var foo = 'bar';
var baz = {foo};
baz // {foo: "bar"}

// 等同于
var baz = {foo: foo};
```

### 属性名表达式

JavaScript语言定义对象的属性，有两种方法。
```javascript
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
```

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。
```javascript
var obj = {
  foo: true,
  abc: 123
};
```

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
```javascript
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};

```

### Object.assign()

基本用法

Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
```javascript
var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}

```

Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。

## ES6 symbol

# 未完待续

