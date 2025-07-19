# deep-readonly

## 题目描述

<!--info-header-start--><h1>对象属性只读（递归） <img src="https://img.shields.io/badge/-%E4%B8%AD%E7%AD%89-d9901a" alt="中等"/> <img src="https://img.shields.io/badge/-%23readonly-999" alt="#readonly"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/> <img src="https://img.shields.io/badge/-%23deep-999" alt="#deep"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/9/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a>  <a href="./README.pt-BR.md" target="_blank"><img src="https://img.shields.io/badge/-Portugu%C3%AAs%20(BR)-gray" alt="Português (BR)"/></a> </p><!--info-header-end-->

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/9/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/9/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <hr><h3>相关挑战</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-7%E3%83%BB%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB-7aad0c" alt="7・对象属性只读"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-8%E3%83%BB%E5%AF%B9%E8%B1%A1%E9%83%A8%E5%88%86%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB-d9901a" alt="8・对象部分属性只读"/></a> <!--info-footer-end-->


## 解题思路

### 解题核心

初版的Readonly是`readonly [P in keyof T]: T[P];`, 但是现在的情况是`T[P]`可能是对象类型，因此需要递归处理。所以核心是**检查是否是对象类型**

判断一个类型是否为对象类型的方法：

1. **使用 `extends object` 判断**
   ```typescript
   type IsObject<T> = T extends object ? true : false;
   ```
   但这种方法会将数组、函数等也识别为对象类型。

2. **排除特定类型**
   ```typescript
   type IsObject<T> = T extends object
     ? T extends Array<any> ? false : true
     : false;
   ```

3. **更完整的判断**
   ```typescript
   type IsObject<T> = T extends object
     ? T extends Array<any> 
       ? false 
       : T extends Function
         ? false
         : true
     : false;
   ```

4. **通过属性检测**：`Record<K, T> `是 TypeScript 内置的工具类型，它创建一个类型，该类型的属性键是 K 类型，属性值是 T 类型。
   ```typescript
   type IsRecord<T> = T extends Record<string, any> ? true : false;
   ```

在DeepReadonly中，我们需要递归处理对象类型的属性，同时保留原始类型：

- extends递归函数

## 代码实现

```typescript
最好的使用方法是Record<K, T> / object 可以避免很多的条件判断
type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends Record<string, any> ? DeepReadonly<T[P]> : T[P];
};
```

但是还是存在问题不能递归处理数组类型情况。
```typescript

type test1 = {
   l: [
        'hi',
        {
          m: ['hey']
        },
      ]
}

type test1Ans = {
   readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
}
```
考虑到数组类型本身其实是
`{
  0: 'hello'
  1: 'nihao'
  ...
}` 本质还是key-value的组合

因此还是要核心判断是否存在key-value的组合，因此需要使用keyof进行判断。
核心**非裸联合类型参**extends不会进行分发

```typescript
type DeepReadonly<T> = {
	readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]>;
};
```

## 知识点总结

一、 **递归类型**：TypeScript 允许类型定义递归引用自身，常用于处理嵌套结构。

二、 **条件类型**：`T extends U ? X : Y` 语法允许根据类型关系动态选择类型。

三、 **对象类型判断**：
   - `T extends object` 判断 T 是否为对象类型（包括数组、函数等）
   - 可以通过额外条件排除特定对象类型（如数组、函数）
   - 原始类型（string、number、boolean等）不会匹配 `object`


## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00009-medium-deep-readonly)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
