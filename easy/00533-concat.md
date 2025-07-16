# concat

## 题目描述

<!--info-header-start--><h1>Concat <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Andrey Krasovsky <a href="https://github.com/bre30kra69cs" target="_blank">@bre30kra69cs</a></p></blockquote><p><a href="https://tsch.js.org/533/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/533/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/533/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <hr><h3>相关挑战</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-3057%E3%83%BBPush-7aad0c" alt="3057・Push"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-3060%E3%83%BBUnshift-7aad0c" alt="3060・Unshift"/></a> <!--info-footer-end-->


## 解题思路

### 解题关键

- ** ... 展开操作符（spread operator）**： `type NewTuple = [...Tuple1, ...Tuple2, Element];` 可以合并、插入、拼接多个元组类型。

### 解题流程

写法一：递归
- 每次取出最后一个元素进行拼接

写法二：直接...展开
- 直接...全部展开元素操作符


## 代码实现

```typescript
方法一：
type Concat<T extends readonly any[], U extends readonly any[]> = U extends readonly [
	infer Fi,
	...infer Re,
]
	? Concat<[...T, Fi], Re>
	: T;

方法二：
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];
```

## 知识点总结

- 展开操作符（spread operator）

作用：
1. **展开元组或数组类型的所有元素**，用于构造新的元组类型。
2. 可以合并、插入、拼接多个元组类型。

语法：
```typescript
type NewTuple = [...Tuple1, ...Tuple2, Element];
```

拓展用法:

1.拼接元组

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U];
type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]
```
2. 添加元素

```typescript
type Push<T extends any[], U> = [...T, U]; // 末尾添加
type Unshift<T extends any[], U> = [U, ...T]; // 开头添加
```
3. 拆分元组（... 是剩余元素操作符（rest operator）

```typescript
type Split<T extends any[]> = T extends [infer First, ...infer Rest] ? [First, Rest] : never;
type S = Split<[1, 2, 3]>; // [1, [2, 3]]
```
4. 组合多个元组

```typescript
type Merge<T extends any[], U extends any[], V extends any[]> = [...T, ...U, ...V];
type M = Merge<[1], [2], [3, 4]>; // [1, 2, 3, 4]
```

5. 递归构造
```typescript
type Reverse<T extends any[]> = T extends [infer First, ...infer Rest] ? [...Reverse<Rest>, First] : [];
type R = Reverse<[1, 2, 3]>; // [3, 2, 1]
```

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00533-easy-concat)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
