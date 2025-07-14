# defined-partial-record

## 题目描述

<!--info-header-start--><h1>Defined Partial Record <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> </h1><blockquote><p>by Aleksandr Trutanov <a href="https://github.com/alex-altay" target="_blank">@alex-altay</a></p></blockquote><p><a href="https://tsch.js.org/34857/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

### Defined Partial Record


Using a Record with union types as keys doesn't allow you to make an object with only some of them

```ts
const record: Record<'a' | 'b' | 'c', number> = { a: 42, b: 10 } 
// error: Property 'c' is missing in type '{ a: number; b: number; }' 
// but required in type 'Record<"a" | "b" | "c", number>'
```

Using a Partial Record with union types as keys allows you to make an object without all union members, but makes all keys and values optional, potentially leaving them undefined

```ts
const partial: Partial<Record<'a' | 'b' | 'c', number>> = { a: 42 } 
const partialType = typeof partial // { a?: number | undefined, b? : number | undefined, c? : number | undefined }
const operation = 0 + partial.a // error: 'partial.a' is possibly 'undefined'
const access = partial.c // possible, type doesn't know that there is no such key
```

You need to make a type that takes the best of both worlds, creates all combinations of all the types in the union, so using a key that exists in the object gives you a defined type, but using a key that exists in the union and not in the object throws an error
```ts
const best: DefinedPartial<Record<'a' | 'b' | 'c', number>> = { a: 42 } 
const sum = 0 + best.a // 42
const error = best.b // error: property 'b' does not exist on type '{ a: number; }'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/34857/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/34857/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 解题思路

<!-- 在这里记录你的解题思路和学习笔记 -->

## 代码实现

```typescript
// 在这里实现你的解决方案
```

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/34857-medium-defined-partial-record)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
