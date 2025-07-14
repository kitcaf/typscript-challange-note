# 技术架构文档

## 项目定位
这是一个 TypeScript 类型挑战的**学习笔记项目**，不是做题平台。主要功能是记录每道题的学习笔记，并通过 VuePress 构建为响应式网站展示。

## 核心技术方案

### 1. VuePress 项目结构
```
ts-challenge/
├── .vuepress/
│   ├── config.js              # VuePress 配置文件
│   ├── public/                # 静态资源
│   └── components/            # 自定义组件
├── 1.easy/                    # 简单难度目录
│   ├── 1.1.pick.md           # 第1题：Pick 类型
│   ├── 1.2.readonly.md       # 第2题：Readonly 类型
│   └── ...
├── 2.medium/                  # 中等难度目录
│   ├── 2.1.return-type.md    # 第1题：ReturnType
│   ├── 2.2.omit.md           # 第2题：Omit
│   └── ...
├── 3.hard/                    # 困难难度目录
│   └── ...
├── 4.extreme/                 # 极限难度目录
│   └── ...
└── README.md                  # 项目首页
```

### 2. 笔记文件格式标准
每个 `.md` 文件都遵循固定格式：

```markdown
# {题目名称}

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

## 核心解决方案

### 1. 自动化抓取脚本
创建 Node.js 脚本来：
- 批量下载 `https://github.com/type-challenges/type-challenges/tree/main/questions` 的所有题目
- 按照难度分类题目
- 生成符合 VuePress 结构的文件目录
- 自动填充题目描述部分

### 2. 文件组织策略
- **无 src/ 目录**：所有内容都是 markdown 笔记
- **按难度分目录**：easy/medium/hard/extreme
- **统一命名规则**：`{难度}.{序号}.{题目名}.md`
- **VuePress 兼容**：直接作为 VuePress 的文档源文件

### 3. VuePress 配置
```javascript
// .vuepress/config.js
module.exports = {
  title: 'TypeScript Challenges 学习笔记',
  description: 'TypeScript 类型挑战学习记录',
  base: '/ts-challenge/',
  
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '简单', link: '/1.easy/' },
      { text: '中等', link: '/2.medium/' },
      { text: '困难', link: '/3.hard/' },
      { text: '极限', link: '/4.extreme/' }
    ],
    
    sidebar: {
      '/1.easy/': [
        'README.md',
        '1.1.pick.md',
        '1.2.readonly.md',
        // ... 自动生成
      ],
      '/2.medium/': [
        'README.md',
        '2.1.return-type.md',
        '2.2.omit.md',
        // ... 自动生成
      ],
      // ... 其他难度
    }
  }
}
```

### 4. 自动化工具脚本
创建 `tools/setup.js` 脚本：
- 克隆 type-challenges 仓库
- 解析题目难度和编号
- 创建对应的目录结构
- 生成基础的 markdown 文件模板
- 更新 VuePress 配置文件

### 5. 开发工作流
1. 运行自动化脚本获取所有题目
2. 逐个题目编写学习笔记
3. 使用 `vuepress dev` 本地预览
4. 使用 `vuepress build` 构建静态网站
5. 部署到 GitHub Pages 或其他平台

## 技术实现要点

### 1. 题目抓取
- 使用 GitHub API 或直接 clone 仓库
- 解析每个题目的 README.md 文件
- 提取题目描述、测试用例等信息

### 2. 文件生成
- 创建符合 VuePress 要求的目录结构
- 生成包含题目信息的 markdown 模板
- 自动更新导航和侧边栏配置

### 3. 响应式设计
- 使用 VuePress 默认主题的响应式特性
- 自定义 CSS 优化移动端显示
- 添加搜索功能方便查找题目

### 4. 部署优化
- 配置 GitHub Actions 自动部署
- 使用 CDN 加速静态资源
- SEO 优化和性能监控

## 项目优势
1. **专注学习**：纯笔记项目，不涉及复杂的代码逻辑
2. **结构清晰**：按难度分类，易于管理和查找
3. **响应式**：基于 VuePress 的现代化网站
4. **自动化**：脚本化处理重复工作
5. **可扩展**：易于添加新题目和功能