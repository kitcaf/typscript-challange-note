# exclude

## 题目描述

<!--info-header-start--><h1>实现 Exclude <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23built--in-999" alt="#built-in"/> <img src="https://img.shields.io/badge/-%23union-999" alt="#union"/></h1><blockquote><p>by Zheeeng <a href="https://github.com/zheeeng" target="_blank">@zheeeng</a></p></blockquote><p><a href="https://tsch.js.org/43/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

实现内置的 `Exclude<T, U>` 类型，但不能直接使用它本身。

> 从联合类型 `T` 中排除 `U` 中的类型，来构造一个新的类型。

例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/43/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/43/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <!--info-footer-end-->

## 解题思路

`MyExclude<T, U>` T和U都是联合类型，将T中的的联合属性去掉U对应的联合类型

### 解题关键

- **分布式条件类型**：当条件类型作用于联合类型时，TypeScript **会自动分发**
- **never 类型的过滤**：never 在联合类型中会被自动忽略

### 解题流程

1. 利用分布式条件类型，让 T 中的每个联合成员分别与 U 进行比较
2. 如果某个成员属于 U，返回 never（表示排除）
3. 如果某个成员不属于 U，返回该成员本身
4. never 会在最终的联合类型中被自动过滤掉

**分发过程演示：**
```typescript
MyExclude<'a' | 'b' | 'c', 'a'>

// 自动分发为：
= MyExclude<'a', 'a'> | MyExclude<'b', 'a'> | MyExclude<'c', 'a'>

// 分别计算：
= ('a' extends 'a' ? never : 'a') | ('b' extends 'a' ? never : 'b') | ('c' extends 'a' ? never : 'c')

// 结果：
= never | 'b' | 'c'

// never 被过滤：
= 'b' | 'c'
```

**T 和 U 都是联合类型时的分发：**
```typescript
MyExclude<'a' | 'b' | 'c', 'a' | 'b'>

// 只有 T 被分发，U 保持为 'a' | 'b'：
= MyExclude<'a', 'a' | 'b'> | MyExclude<'b', 'a' | 'b'> | MyExclude<'c', 'a' | 'b'>

// 分别计算：
= ('a' extends 'a' | 'b' ? never : 'a') | ('b' extends 'a' | 'b' ? never : 'b') | ('c' extends 'a' | 'b' ? never : 'c')

// 结果：
= never | never | 'c'

// never 被过滤：
= 'c'
```

## 代码实现

```typescript
type MyExclude<T, U> = T extends U ? never : T;
```

## 知识点总结

一、 **分布式条件类型（Distributive Conditional Types）**
  - 当条件类型 `T extends U ? X : Y` 中的 T 是联合类型并且是**裸类型参数**时，会自动分发
  - **只有左边的 T 会分发，右边的 U 保持完整**
  - 相当于 `(A | B | C) extends U ? X : Y` → `(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`

关于**裸类型参**, 就是extends的左边完完全全是联合类型，而不是经过计算得出的结果，比如**keyof**的计算的结果不会进行分发

```typescript
// 1. 首先证明 keyof 不会分发
type TestObject = {
	h: {
		i: true;
		j: "string";
	};
};

// 当我们使用 keyof T[P] 时：
type Keys = keyof TestObject["h"]; // "i" | "j"

// 2. 在条件类型中的行为
type TestCondition<T> = keyof T extends "i" ? "is never" : "not never";
type Result1 = TestCondition<{ i: true; j: "string" }>; // "not never"
```

二、 **never 类型的特性**
  - `never` 在联合类型中会被自动过滤掉
  - `'a' | never | 'b'` → `'a' | 'b'`

三、 **联合类型操作**
  - 这种模式常用于从联合类型中排除特定类型
  - TypeScript 内置的 `Exclude<T, U>` 就是这样实现的

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00043-easy-exclude)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
