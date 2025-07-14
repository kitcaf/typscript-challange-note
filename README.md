# TypeScript Challenges 学习笔记

这是一个基于 [type-challenges](https://github.com/type-challenges/type-challenges) 的 TypeScript 学习项目。本项目专注于记录每道 TypeScript 类型挑战题目的学习笔记，并通过 VuePress 构建为响应式网站展示。

## 项目特色

- 📚 **专注学习**: 纯笔记项目，记录解题思路和知识点
- 🎯 **结构清晰**: 按难度分类，易于管理和查找
- 📱 **响应式**: 基于 VuePress 的现代化网站
- 🤖 **自动化**: 脚本化处理重复工作
- 🔍 **易搜索**: 内置搜索功能，快速定位题目

## 目录结构

```
├── 1.easy/           # 简单难度题目
├── 2.medium/         # 中等难度题目
├── 3.hard/           # 困难难度题目
├── 4.extreme/        # 极限难度题目
├── .vuepress/        # VuePress 配置
├── tools/            # 自动化工具
└── README.md         # 项目说明
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化项目

```bash
npm run setup
```

这个命令会：
- 从 type-challenges 仓库获取所有题目
- 创建对应的目录结构
- 生成题目笔记模板
- 更新 VuePress 配置

### 3. 启动开发服务器

```bash
npm run docs:dev
```

### 4. 构建静态网站

```bash
npm run docs:build
```

## 学习建议

1. **按难度循序渐进**: 从简单题目开始，逐步提高难度
2. **动手实践**: 每道题都要亲自实现，不要只看答案
3. **理解原理**: 深入理解题目背后的 TypeScript 概念
4. **记录心得**: 在笔记中记录解题思路和学习收获
5. **反复复习**: 定期回顾之前的题目，巩固知识

## 笔记格式

每个题目的笔记都遵循统一格式：

```markdown
# 题目名称

## 题目描述
{从 type-challenges 仓库抓取的原始题目内容}

## 解题思路
{个人学习笔记和解析}

## 代码实现
{TypeScript 代码}

## 知识点总结
{相关概念和延伸知识}

## 参考链接
{相关资源}
```

## 相关资源

- [Type Challenges 官方仓库](https://github.com/type-challenges/type-challenges)
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 深入理解](https://jkchao.github.io/typescript-book-chinese/)
- [TypeScript 类型体操](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)

## 贡献指南

欢迎贡献你的学习笔记和解题思路！

1. Fork 本项目
2. 创建功能分支
3. 提交你的修改
4. 发起 Pull Request

## 许可证

MIT License

---

**开始你的 TypeScript 类型挑战之旅吧！** 🚀