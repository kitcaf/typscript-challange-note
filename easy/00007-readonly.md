# readonly

## 题目描述

<!--info-header-start--><h1>对象属性只读 <img src="https://img.shields.io/badge/-%E7%AE%80%E5%8D%95-7aad0c" alt="简单"/> <img src="https://img.shields.io/badge/-%23built--in-999" alt="#built-in"/> <img src="https://img.shields.io/badge/-%23readonly-999" alt="#readonly"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/7/play/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E6%8E%A5%E5%8F%97%E6%8C%91%E6%88%98-3178c6?logo=typescript&logoColor=white" alt="接受挑战"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.md" target="_blank"><img src="https://img.shields.io/badge/-English-gray" alt="English"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a>  <a href="./README.pt-BR.md" target="_blank"><img src="https://img.shields.io/badge/-Portugu%C3%AAs%20(BR)-gray" alt="Português (BR)"/></a> </p><!--info-header-end-->

不要使用内置的`Readonly<T>`，自己实现一个。

泛型 `Readonly<T>` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

<!--info-footer-start--><br><a href="../../README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E8%BF%94%E5%9B%9E%E9%A6%96%E9%A1%B5-grey" alt="返回首页"/></a> <a href="https://tsch.js.org/7/answer/zh-CN" target="_blank"><img src="https://img.shields.io/badge/-%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E8%A7%A3%E7%AD%94-teal" alt="分享你的解答"/></a> <a href="https://tsch.js.org/7/solutions" target="_blank"><img src="https://img.shields.io/badge/-%E6%9F%A5%E7%9C%8B%E8%A7%A3%E7%AD%94-de5a77?logo=awesome-lists&logoColor=white" alt="查看解答"/></a> <hr><h3>相关挑战</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-8%E3%83%BB%E5%AF%B9%E8%B1%A1%E9%83%A8%E5%88%86%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB-d9901a" alt="8・对象部分属性只读"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-9%E3%83%BB%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E5%8F%AA%E8%AF%BB%EF%BC%88%E9%80%92%E5%BD%92%EF%BC%89-d9901a" alt="9・对象属性只读（递归）"/></a> <!--info-footer-end-->


## 解题思路

解题关键：
- `MyReadonly<T>` 最后一定是返回T这个类型
- `MyReadonly<T>`  返回的T类型中的每一个（深度）属性都都是不能修改，设置属性不可修改涉及readonly 关键字

因此：
- 第一步：可以遍历T类型的所有属性 --- 遍历对象操作：[K in keyof T]: T[K]
- 第二步：并对每一个类型赋值一个readonly关键字 --- readonly
- 第三步：并返回属性不可修改的T类型 --- {}

## 代码实现

```typescript
type MyReadonly<T> = {
	readonly [K in keyof T]: T[K];
};
```

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->
- keyof 关键字获取某个类型的所有属性名
- `{[K in 联合类型('hello'|'test')] : ... }` 映射类型的遍历对象（**映射类型**），其中K是每一个联合类型的属性。**因为映射类型只能在必须在 {} 内，因此映射类型通常是用来创建一个新的对象类型** 

**关于映射类型通常是用来创建一个新的对象类型可以看下面的例子**：
``` typescript
//报错的写法
type Includes<T extends readonly any[], U> = [K in T[number]]: boolean;
//error ↑ 这里 TypeScript 把它理解为数组字面量！
//其实就可以理解编译器将这个类型别名看错Includes = [] （元组类型）。在加上:后就报错了。如果不加是可以通过编译的

type Includes<T extends readonly any[], U> = [T[number]];
type Arr = ["a", "b", "c"];
type c = Includes<Arr, true>;
// c = type c = ["a" | "b" | "c"]

//因此为什么说映射类型必须返回一个新的对象，就是一定在{}里面
type Includes<T extends readonly any[], U> = { [K in T[number]]: K extends U ? true : false };
type Arr = ["a", "b", "c"];
type Ac = Includes<Arr, true>;
// type Ac = {
//     a: false;
//     b: false;
//     c: false;
// }
```

## 继续思考

- 当前的MyReadonly其实不会阻止对深层对象的修改 , 能不能继续递归所有子对象也是readonly？
```
type MyReadonly<T> = {
	readonly [K in keyof T]: T[K];
};

interface Todo2 {
	title: string;
	meta: {
		author: string;
	};
}

const obj:  MyReadonly<Todo2> = {
	title: "Hey",
	meta: {
		author: "hello",
	},
};
obj.meta.author = "li hua"; // right
```

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/00007-easy-readonly)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
