# remove-index-signature

## 题目描述

<!--info-header-start--><h1>Remove Index Signature <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/></h1><blockquote><p>by hiroya iizuka <a href="https://github.com/hiroyaiizuka" target="_blank">@hiroyaiizuka</a></p></blockquote><p><a href="https://tsch.js.org/1367/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

For example:

```ts
type Foo = {
  [key: string]: any
  foo(): void
}

type A = RemoveIndexSignature<Foo> // expected { foo(): void }
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/1367/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/1367/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->


## 解题思路

<!-- 在这里记录你的解题思路和学习笔记 -->

## 代码实现

```typescript
// 在这里实现你的解决方案
```

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/01367-medium-remove-index-signature)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
