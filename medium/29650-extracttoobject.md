# extracttoobject

## 题目描述

<!--info-header-start--><h1>ExtractToObject <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23object-999" alt="#object"/></h1><blockquote><p>by Maxim Bazuev <a href="https://github.com/bazuka5801" target="_blank">@bazuka5801</a></p></blockquote><p><a href="https://tsch.js.org/29650/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type that extract prop value to the interface. The type takes the two arguments. The output should be an object with the prop values.
  Prop value is object.

  For example

```ts
type Test = { id: '1', myProp: { foo: '2' }}
type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/29650/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/29650/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 解题思路

<!-- 在这里记录你的解题思路和学习笔记 -->

## 代码实现

```typescript
// 在这里实现你的解决方案
```

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/29650-medium-extracttoobject)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
