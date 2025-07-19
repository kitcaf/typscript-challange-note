# readonly-2

## 题目描述

<!--info-header-start--><h1>对象部分属性只读 <img src="https://img.shields.io/badge/-%E4%B8%AD%E7%AD%89-d9901a" alt="中等"/> <img src="https://img.shields.io/badge/-%23readonly-999" alt="#readonly"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/8/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a>  <a href="./README.pt-BR.md" target="_blank"><img src="https://img.shields.io/badge/-Portugu%C3%AAs%20(BR)-gray" alt="Português (BR)"/></a> </p><!--info-header-end-->

实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

类型 `K` 指定 `T` 中要被设置为只读 (readonly) 的属性。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/8/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/8/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <hr><h3>相关挑战</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-7%E3%83%BB%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB-7aad0c" alt="7・对象属性只读"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-9%E3%83%BB%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB%EF%BC%88%E9%80%92%E5%BD%92%EF%BC%89-d9901a" alt="9・对象属性只读（递归）"/></a> <!--info-footer-end-->


## 解题思路

### 解题核心

最后的结果是返回一个对象类型，那么一定是涉及到`{[]:...}`映射操作符，但是一次映射操作符要么是**全属性Readonly要么是全属性非Readonly**, 但是题目要求是K属性集是Readonly其他的属性是正常映射。
1. K属性集是Readonly一个映射对象
2. 非K属性集是正常映射对象类型
**然后对两个对象类型进行交集操作即可**

- 泛型参数的默认值，设置参数默认值
- & 是**交叉类型（Intersection Type）**操作符：用于将多个类型“合并”为一个新类型，要求新类型同时满足所有类型的约束

### 解题流程

## 代码实现

```typescript
type MyReadonly2<T, K extends keyof T = keyof T> = {
	readonly [P in K]: T[P];
} & {
	[P in keyof T as P extends K ? never : P]: T[P];
};
```

## 知识点总结

一、& 是**交叉类型（Intersection Type）**操作符，用于将多个类型"合并"为一个新类型，要求新类型同时满足所有类型的约束

**基础用法**:

   ```typescript
1. 合并对象类型

   type A = { x: number }
   type B = { y: string }
   type C = A & B // { x: number; y: string }

2. 合并接口

   interface WithId { id: number }
   interface WithName { name: string }
   type User = WithId & WithName // { id: number; name: string }
   
3. 同名属性合并
   type X = { a: number; b: string }
   type Y = { a: number; c: boolean }
   type Z = X & Y // { a: number; b: string; c: boolean }
   // 注意：如果同名属性类型不兼容，结果为 never
```

**拓展用法**:
```typescript
1. 与映射类型结合
   // 像本题的解法
   type ReadonlyPart<T, K extends keyof T> = { readonly [P in K]: T[P] }
   type RestPart<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] }
   type MyReadonly2<T, K extends keyof T> = ReadonlyPart<T, K> & RestPart<T, K>

2. 工具类型增强
   type WithTimestamp<T> = T & { timestamp: number }
   type Data = { value: string }
   type DataWithTime = WithTimestamp<Data> // { value: string; timestamp: number }

3. 类型约束
   type StringOrNumber = string | number
   type HasLength = { length: number }
   
   // 函数参数既可以是字符串也可以是数组
   function getLength<T extends StringOrNumber & HasLength>(x: T): number {
     return x.length
   }

4. 联合类型交叉
   type A = { a: number } | { b: string }
   type B = { c: boolean }
   type C = A & B // { a: number; c: boolean } | { b: string; c: boolean }

5. 多重约束
   function merge<T extends object, U extends object>(a: T, b: U): T & U {
     return { ...a, ...b }
   }
```

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00008-medium-readonly-2)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
