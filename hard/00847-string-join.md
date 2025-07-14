# string-join

## 题目描述

<!--info-header-start--><h1>String Join <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> </h1><blockquote><p>by Matt Davis <a href="https://github.com/tl-matt-davis" target="_blank">@tl-matt-davis</a></p></blockquote><p><a href="https://tsch.js.org/847/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Create a type-safe string join utility which can be used like so:

```ts
const hyphenJoiner = join('-')
const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
```

Or alternatively:
```ts
join('#')('a', 'b', 'c') // = 'a#b#c'
```

When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e: 
```ts
join('')('a', 'b', 'c') // = 'abc'
```

When only one item is passed, we should get back the original item (without any delimiter added):
```ts
join('-')('a') // = 'a'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/847/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/847/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->

## 解题思路

<!-- 在这里记录你的解题思路和学习笔记 -->

## 代码实现

```typescript
// 在这里实现你的解决方案
```

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00847-hard-string-join)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
