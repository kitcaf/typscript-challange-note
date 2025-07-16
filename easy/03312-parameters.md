# parameters

## 题目描述

<!--info-header-start--><h1>Parameters <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23infer-999" alt="#infer"/> <img src="https://img.shields.io/badge/-%23tuple-999" alt="#tuple"/> <img src="https://img.shields.io/badge/-%23built--in-999" alt="#built-in"/></h1><blockquote><p>by midorizemi <a href="https://github.com/midorizemi" target="_blank">@midorizemi</a></p></blockquote><p><a href="https://tsch.js.org/3312/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

实现内置的 `Parameters<T> `类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。

例如：

```ts
const foo = (arg1: string, arg2: number): void => {}

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/3312/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/3312/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <!--info-footer-end-->


## 解题思路

### 解题核心

- **模式匹配语法infer** 去推断参数的类型

- `... 是剩余元素/参数操作符（rest operator/Parameters）` 可以自动收集**多参数、元组**中的剩余参数/元素

```typescript
T extends (	arg1: any, ...args: infer K) => any ? K : [];
此时的K就是除第一个元素之外的后面参数的类型元组、

T extends [infer Fi, infer Se, ...infer K] ? K : [];
此时的K就是除前2个元素之外的后面数组元素类型组成的元组
```

## 代码实现

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer K) => any ? K : [];
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
```

- `... 是剩余元素/参数操作符（rest operator/Parameters）`，用于收集剩余的元素到一个新的元组类型中。**在 TypeScript 类型系统中只能用于 extends条件类型中的元组或数组类型的解构，注意区别展开操作符**

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/03312-easy-parameters)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
