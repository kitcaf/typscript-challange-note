# includes

## 题目描述

<!--info-header-start--><h1>Includes <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by null <a href="https://github.com/kynefuk" target="_blank">@kynefuk</a></p></blockquote><p><a href="https://tsch.js.org/898/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

例如：

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```


<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/898/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/898/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <!--info-footer-end-->

## 解题思路

给定`Includes<T, C>` 其中T是元组类型。判断T中元素类型是否存在C类型
如果从javascript的语言思考这个问题，其实就是遍历T中的每一个元素，判断元素===C
如果等于返回true, 反之返回false

### 解题关键

遍历有办法吗？ 映射类型可以遍历联合类型，但是最后它一定是返回一个映射类型对象，一定是无法返回true, false

- **遍历是可以递归做的**

下面以javascript函数进行演示
``` javascript
//判断元素arr中是否存在k这个元素
function include(arr: [], k: number, idx: number): boolean {
	if (arr.length === idx) return false;

	if (arr[idx] === k) return true;
	else return include(arr, k, idx++);
}
include([1, 2, 3], 3, 0);
```

- extend **具有条件判断的作用**
- **模式匹配语法（infer 关键字）：** 允许在**条件约束（extend）**中**解构和提取类型信息**，类似于 JavaScript 中的解构赋值
  - ` T extends [infer First, ...infer Rest]`用于**元组解构**
  - `infer First` - 推断第一个元素类型
  - `...infer Rest` - 推断剩余元素组成的元组类型
  - 配合 `extends` 进行条件类型的模式匹配

- **剩余元素操作符（rest operator）** 用于收集剩余的元素


### 解题流程

1. 使用条件类型判断元组是否为空
2. 如果不为空，用模式匹配提取第一个元素和剩余元素
3. 判断第一个元素是否等于目标类型
4. 如果相等返回 `true`，否则递归检查剩余元素

## 代码实现

```typescript
type Includes<T extends readonly any[], U> =
  T extends readonly [infer First, ...infer Rest]
    ? First extends U 
      ? true 
      : Includes<Rest, U>
    : false;
```

但是因为First extends U 是**兼容性判断**，不是**完全相等判断**
如果不使用Equal，我们知道A extends U 判断是A是U的子类型吗？
如果在加入U extends A那就判断是U是A的子类型吗？
**双向判断**是否就可以证明A 和 U是完全类型相等？

答案是不能的? **联合类型的分发 | 修饰符差异**
```typescript
type Test = string | number extends string ? true : false; // false
type Test2 = string extends string | number ? true : false; // true

type Test3 = { readonly a: string } extends { a: string } ? true : false; // true
type Test4 = { a: string } extends { readonly a: string } ? true : false; // true
```
但是数组包装`[T]`是可以的，可以阻止分发, 但是还是无法解决修饰符的差异

```typescript
type Includes<T extends readonly any[], U> = T extends readonly [infer Fi, ...infer re]
	? [Fi] extends [U]
		? [U] extends [Fi]
			? true
			: Includes<re, U>
		: Includes<re, U>
	: false;

//修饰符还是被认为是相等，修饰符的差异没有检测出来
type c = Includes<[{ a: "A" }], { readonly a: "A" }>; //true
type cv = Includes<[{ readonly a: "A" }], { a: "A" }>; //true

type b = Includes<[string | number], string>; //false
type bv = Includes<[string], string | number>; //false
```

还是要利用**函数类型的结构相等性**构建myEqual

```typescript

type myEqual<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type Includes<T extends readonly any[], U> = T extends readonly [infer Fi, ...infer re]
	? myEqual<Fi, U> extends true
		? true
		: Includes<re, U>
	: false;
```


## 知识点总结

- **模式匹配语法infer（如果X符合某种模式，那么推断出其中的某个部分）**

> infer 必须在条件判断（extends）中使用。条件判断【extends 上下文 ? : 】extends后面其实提供了一个**上下文**，表示某种类型，根据这种类型那么其实就可以推断想要的类型

当 TypeScript 进行类型匹配时，遇到 `infer X`，它会推断这个位置应该是什么类型
将推断的结果赋值给类型变量 X, **在条件类型的 true 分支中**，就可以使用 X 了


infer的作用：

1. 推断：让 TypeScript 自动推断某个位置的类型
2. 捕获：将推断出的类型"捕获"到一个类型变量中
3. 提取：从复杂类型中提取出我们需要的部分

**infer的拓展使用**：

```typescript
1. 函数类型解构
// 提取函数参数类型
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type Params = Parameters<(a: string, b: number) => void>; // [string, number]

// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Return = ReturnType<() => string>; // string

2. Promise 类型解构
type Awaited<T> = T extends Promise<infer U> ? U : T;
type Result = Awaited<Promise<string>>; // string

3. 字符串类型解构
// 提取字符串的第一个字符
type Head<S> = S extends `${infer First}${string}` ? First : never;
type H = Head<"hello">; // "h"
// 移除字符串前缀
type RemovePrefix<S, P> = S extends `${P}${infer Rest}` ? Rest : S;
type R = RemovePrefix<"prefix-content", "prefix-">; // "content"

4. 对象类型解构
// 提取对象属性值类型
type ValueOf<T> = T extends { [K: string]: infer V } ? V : never;
type V = ValueOf<{ a: string, b: number }>; // string | number

5. 嵌套模式匹配
// 提取嵌套数组的内层类型
type Flatten<T> = T extends (infer U)[] 
  ? U extends (infer V)[] 
    ? V 
    : U 
  : T;
type F = Flatten<string[][]>; // string

6. 复杂元组操作
// 获取元组的最后一个元素
type Last<T extends readonly any[]> = 
  T extends readonly [...any[], infer L] ? L : never;

// 去掉第一个元素
type Tail<T extends readonly any[]> = 
  T extends readonly [any, ...infer Rest] ? Rest : [];

// 反转元组
type Reverse<T extends readonly any[]> = 
  T extends readonly [infer First, ...infer Rest] 
    ? [...Reverse<Rest>, First] 
    : [];
```

- `... 是剩余元素操作符（rest operator）`，用于收集剩余的元素到一个新的元组类型中。**在 TypeScript 类型系统中只能用于 extends条件类型中的元组或数组类型的解构，注意区别展开操作符**

因此可以看到
``` typescript
//这种写法只会推断前两个元素
type Example<T> = T extends [infer First, infer Se] ? Rest : never;
//这种写法推断第一个元素和“剩余所有元素”
type Example<T> = T extends [infer First, ...infer Rest] ? Rest : never;
//首先是...将剩余元素都搜集到新的元素类型类型然后使用infer进行推断提取类型
```

- **函数类型的结构相等性**：**两个泛型函数类型相等，当且仅当它们对所有可能的类型参数 T 都产生相同的行为**

```typescript
type myEqual<X, Y> =
	(<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

其实在比较：
// 函数类型 A
<T>() => T extends X ? 1 : 2

// 函数类型 B  
<T>() => T extends Y ? 1 : 2

// 问：函数类型 A 是否等同于函数类型 B？
因为都是同一个泛型参数T, 如果两个函数对所有可能的类型参数T都产生相同的行为。
表示两个泛型函数相等

// X = string, Y = string
Equal<string, string> // true
// 因为两个函数完全相同

// X = string, Y = number  
Equal<string, number> // false
// 因为当 T = string 时：
// 函数A返回 1 (string extends string ? 1 : 2)
// 函数B返回 2 (string extends number ? 1 : 2)

```

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00898-easy-includes)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
