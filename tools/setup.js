const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 配置
const CONFIG = {
  GITHUB_API_BASE: 'https://api.github.com/repos/type-challenges/type-challenges',
  GITHUB_RAW_BASE: 'https://raw.githubusercontent.com/type-challenges/type-challenges/main',
  DIFFICULTIES: {
    'easy': 'easy',
    'medium': 'medium',
    'hard': 'hard',
    'extreme': 'extreme'
  }
};

// 工具函数
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\-_]/g, '-').toLowerCase();
}

// 从 GitHub API 获取题目列表
async function fetchQuestions() {
  try {
    console.log('正在获取题目列表...');
    const response = await axios.get(`${CONFIG.GITHUB_API_BASE}/contents/questions`);
    const questions = response.data.filter(item => item.type === 'dir' && /^\d+-.+/.test(item.name));

    console.log(`找到 ${questions.length} 道题目`);
    return questions;
  } catch (error) {
    console.error('获取题目列表失败:', error.message);
    return [];
  }
}

// 获取单个题目的详细信息
async function fetchQuestionDetails(questionDir) {
  try {
    const readmeUrl = `${CONFIG.GITHUB_RAW_BASE}/questions/${questionDir}/README.md`;
    const zhReadmeUrl = `${CONFIG.GITHUB_RAW_BASE}/questions/${questionDir}/README.zh-CN.md`;

    // 优先尝试中文版本
    let content;
    try {
      const zhResponse = await axios.get(zhReadmeUrl);
      content = zhResponse.data;
      console.log(`  获取中文版本: ${questionDir}`);
    } catch {
      // 如果中文版本不存在，使用英文版本
      const enResponse = await axios.get(readmeUrl);
      content = enResponse.data;
      console.log(`  获取英文版本: ${questionDir}`);
    }

    return content;
  } catch (error) {
    console.error(`  获取题目详情失败 ${questionDir}:`, error.message);
    return null;
  }
}

// 解析题目信息
function parseQuestionInfo(questionDir, content) {
  const parts = questionDir.split('-');
  const id = parts[0];
  const difficultyFromName = parts[1]; // 从文件名中提取难度
  const name = parts.slice(2).join('-'); // 题目名称（去掉id和难度部分）

  // 优先使用文件名中的难度信息
  let difficulty = difficultyFromName.toLowerCase();

  // 验证难度是否有效，如果无效则尝试从内容中提取
  if (!['easy', 'medium', 'hard', 'extreme'].includes(difficulty)) {
    difficulty = 'medium'; // 默认中等
    const difficultyMatch = content.match(/<!--info-header-start-->[\s\S]*?difficulty:\s*(\w+)[\s\S]*?<!--info-header-end-->/i);
    if (difficultyMatch) {
      difficulty = difficultyMatch[1].toLowerCase();
    }
  }

  return {
    id,
    name,
    difficulty,
    content,
    originalName: questionDir
  };
}

// 生成笔记文件模板
function generateNoteTemplate(questionInfo) {
  const { id, name, content, originalName } = questionInfo;

  return `# ${name}

## 题目描述

${content}

## 解题思路

<!-- 在这里记录你的解题思路和学习笔记 -->

## 代码实现

\`\`\`typescript
// 在这里实现你的解决方案
\`\`\`

## 知识点总结

<!-- 在这里总结相关的 TypeScript 知识点 -->

## 参考链接

- [原题链接](https://github.com/type-challenges/type-challenges/tree/main/questions/${originalName})
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
`;
}

// 创建目录结构
function createDirectoryStructure() {
  console.log('创建目录结构...');

  Object.values(CONFIG.DIFFICULTIES).forEach(dir => {
    ensureDir(dir);
    console.log(`  创建目录: ${dir}`);
  });
}

// 生成难度级别的 README 文件
function generateDifficultyReadme(difficulty, questions) {
  const difficultyNames = {
    'easy': '简单',
    'medium': '中等',
    'hard': '困难',
    'extreme': '极限'
  };

  const difficultyName = difficultyNames[difficulty] || difficulty;

  let content = `# ${difficultyName}难度

本目录包含所有${difficultyName}难度的 TypeScript 类型挑战题目。

## 题目列表

| 序号 | 题目名称 | 完成状态 |
|------|----------|----------|
`;

  questions.forEach((question, index) => {
    const { id, name } = question;
    const filename = `${id}-${name}.md`;
    content += `| ${index + 1} | [${name}](./${filename}) | ⏳ 待完成 |\n`;
  });

  content += `
## 学习建议

1. 按顺序完成题目，循序渐进
2. 每道题都要动手实践，不要只看答案
3. 理解题目背后的 TypeScript 概念
4. 记录学习过程中的思考和心得

## 相关资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 深入理解](https://jkchao.github.io/typescript-book-chinese/)
- [Type Challenges 官方仓库](https://github.com/type-challenges/type-challenges)
`;

  return content;
}

// 更新 VuePress 配置
function updateVuePressConfig(questionsByDifficulty) {
  console.log('更新 VuePress 配置...');

  const configPath = path.join('.vuepress', 'config.js');

  // 检查配置文件是否存在
  if (!fs.existsSync(configPath)) {
    console.log('VuePress 配置文件不存在，跳过更新');
    return;
  }

  let configContent = fs.readFileSync(configPath, 'utf8');

  // 为每个难度生成侧边栏配置
  Object.entries(questionsByDifficulty).forEach(([difficulty, questions]) => {
    const dirName = CONFIG.DIFFICULTIES[difficulty];
    const children = [`/${dirName}/README.md`];

    questions.forEach((question) => {
      const filename = `${question.id}-${question.name}.md`;
      children.push(`/${dirName}/${filename}`);
    });

    const sidebarConfig = `'/${dirName}/': [
        {
          text: '${difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : difficulty === 'hard' ? '困难' : '极限'}难度',
          children: [
            ${children.map(child => `'${child}'`).join(',\n            ')}
          ]
        }
      ]`;

    // 替换对应的侧边栏配置
    const regex = new RegExp(`'/${dirName}/': \\[[\\s\\S]*?\\](?=,\\s*['}]|\\s*})`);
    configContent = configContent.replace(regex, sidebarConfig);
  });

  fs.writeFileSync(configPath, configContent);
  console.log('VuePress 配置更新完成');
}

// 主函数
async function main() {
  console.log('开始设置 TypeScript Challenges 学习笔记项目...\n');

  // 创建目录结构
  createDirectoryStructure();

  // 获取题目列表
  const questions = await fetchQuestions();
  if (questions.length === 0) {
    console.log('未能获取到题目列表，请检查网络连接');
    return;
  }

  // 按难度分组题目
  const questionsByDifficulty = {
    easy: [],
    medium: [],
    hard: [],
    extreme: []
  };

  console.log('\n正在处理题目...');

  // 处理每道题目
  for (const question of questions) {
    const content = await fetchQuestionDetails(question.name);
    if (!content) continue;

    const questionInfo = parseQuestionInfo(question.name, content);
    questionsByDifficulty[questionInfo.difficulty].push(questionInfo);

    // 生成笔记文件 - 使用 id-name 格式
    const dirName = CONFIG.DIFFICULTIES[questionInfo.difficulty];
    const filename = `${questionInfo.id}-${questionInfo.name}.md`;
    const filepath = path.join(dirName, filename);

    const template = generateNoteTemplate(questionInfo);
    fs.writeFileSync(filepath, template);

    console.log(`  创建文件: ${filepath}`);
  }

  // 生成各难度的 README 文件
  console.log('\n生成难度说明文件...');
  Object.entries(questionsByDifficulty).forEach(([difficulty, questions]) => {
    if (questions.length === 0) return;

    const dirName = CONFIG.DIFFICULTIES[difficulty];
    const readmeContent = generateDifficultyReadme(difficulty, questions);
    const readmePath = path.join(dirName, 'README.md');

    fs.writeFileSync(readmePath, readmeContent);
    console.log(`  创建文件: ${readmePath}`);
  });

  // 更新 VuePress 配置
  updateVuePressConfig(questionsByDifficulty);

  console.log('\n设置完成！');
  console.log('接下来你可以：');
  console.log('1. 运行 npm run docs:dev 启动开发服务器');
  console.log('2. 开始编写学习笔记');
  console.log('3. 运行 npm run docs:build 构建静态网站');
}

// 运行主函数
main().catch(console.error);