# awaited

## 题目描述

<!--info-header-start--><h1>Awaited <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23promise-999" alt="#promise"/> <img src="https://img.shields.io/badge/-%23built--in-999" alt="#built-in"/></h1><blockquote><p>by Maciej Sikora <a href="https://github.com/maciejsikora" target="_blank">@maciejsikora</a></p></blockquote><p><a href="https://tsch.js.org/189/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用` Promise<T>` 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

> 这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/189/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/189/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <!--info-footer-end-->


## 解题思路

### 解题核心

- 其实问题就是推断包装类内部的类型，infer推断
- 那么其实就是extends递归 + infer 进行不断推断Promise的包装类型

### 解题流程

- 如果是Promise类型，那么推断出包装类型
- 将包装类型继续进行递归判断是不是Promise类型
- 最后如果不是Promise类型那么就可以返回输入类型了

## 代码实现

```typescript
type MyAwaited<T> = T extends Promise<infer In> ? MyAwaited<In> : T;
```

**但是当前的方法是不能解决问题，因为存在thenable 类型（类Promise类型）**

```typescript
type T = { then: (onfulfilled: (arg: number) => any) => any }
Expect<Equal<MyAwaited<T>, number>>,
```

因此直接特判

```typescript
type MyAwaited<T> =
	T extends Promise<infer In>
		? MyAwaited<In>
		: //加入特判
			T extends { then: (onfulfilled: (arg: infer U) => any) => any }
			? U
			: T;
```
## 知识点总结

- **模式匹配语法infer（如果X符合某种模式，那么推断出其中的某个部分）**

1. Promise 类型解构

``` typescript
type Awaited<T> = T extends Promise<infer U> ? U : T;
type Result = Awaited<Promise<string>>; // string
```

- thenable类型：**任何具有 then 方法的对象类型**


## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00189-easy-awaited)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
