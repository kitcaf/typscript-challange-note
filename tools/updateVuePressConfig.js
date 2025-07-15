const fs = require('fs');
const path = require('path');

// 难度配置
const DIFFICULTIES = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  extreme: 'extreme'
};

// 生成 sidebar 配置
function generateSidebarConfig() {
  const sidebar = {};
  Object.entries(DIFFICULTIES).forEach(([difficulty, dirName]) => {
    const absDir = path.join(process.cwd(), dirName);
    if (!fs.existsSync(absDir)) return;
    const children = [`/${dirName}/README.md`];
    fs.readdirSync(absDir).forEach(file => {
      if (file.endsWith('.md') && file !== 'README.md') {
        children.push(`/${dirName}/${file}`);
      }
    });
    sidebar[`/${dirName}/`] = [
      {
        text:
          difficulty === 'easy'
            ? '简单难度'
            : difficulty === 'medium'
            ? '中等难度'
            : difficulty === 'hard'
            ? '困难难度'
            : '极限难度',
        children
      }
    ];
  });
  return sidebar;
}

// 生成 config.js 文件
function updateVuePressConfigFile() {
  const configPath = path.join('.vuepress', 'config.js');
  const sidebar = generateSidebarConfig();

  // 生成 config.js 内容
  const configContent = `import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'TypeScript Challenges 学习笔记',
  description: 'TypeScript 类型挑战学习记录',
  base: '/ts-challenge/',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '简单', link: '/easy/' },
      { text: '中等', link: '/medium/' },
      { text: '困难', link: '/hard/' },
      { text: '极限', link: '/extreme/' },
      { text: 'GitHub', link: 'https://github.com/type-challenges/type-challenges' }
    ],
    sidebar: ${JSON.stringify(sidebar, null, 2)},
    repo: 'https://github.com/type-challenges/type-challenges',
    repoLabel: 'GitHub',
    editLinks: false,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: false,
    lastUpdatedText: '上次更新',
    contributors: false,
    contributorsText: '贡献者',
    search: true,
    searchMaxSuggestions: 10
  }),
  plugins: []
})
`;

  fs.writeFileSync(configPath, configContent);
  console.log('VuePress 配置文件已根据本地目录结构自动生成！');
}

// 仅导出主函数
// 支持直接命令行运行
if (require.main === module) {
  updateVuePressConfigFile();
}

module.exports = {
  updateVuePressConfigFile
};
