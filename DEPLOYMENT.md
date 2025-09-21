# 情侣飞行棋 - GitHub Pages 部署指南

## 准备工作

1. 确保你已经安装了 Node.js 和 npm/pnpm/yarn
2. 确保你已经将项目推送到了 GitHub 仓库

## 部署步骤

### 方法一：使用脚本部署

1. 安装依赖
   ```bash
   npm install
   # 或
   pnpm install
   # 或
   yarn install
   ```

2. 运行部署脚本
   ```bash
   npm run deploy
   # 或
   pnpm run deploy
   # 或
   yarn deploy
   ```

3. 部署脚本会自动：
   - 构建项目 (`next build`)
   - 在 `out` 目录中创建 `.nojekyll` 文件（防止 GitHub Pages 使用 Jekyll 处理文件）
   - 生成一个简单的 README.md 文件在 `out` 目录中

4. 将 `out` 目录中的所有文件推送到 GitHub Pages 分支
   
   你可以使用以下命令直接部署：
   ```bash
   # 确保你在项目根目录
   cd out
   git init
   git add -A
   git commit -m 'deploy'
   git push -f git@github.com:<你的用户名>/<你的仓库名>.git master:gh-pages
   # 或
   git push -f https://github.com/<你的用户名>/<你的仓库名>.git master:gh-pages
   ```

### 方法二：使用 GitHub Actions 自动部署

1. 在项目根目录创建 `.github/workflows/deploy.yml` 文件

2. 将以下内容复制到文件中：
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches:
         - master  # 或 main，取决于你的主分支名称
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '20'
         
         - name: Install dependencies
           run: npm install
         
         - name: Build project
           run: npm run build
           env:
             NODE_ENV: production
         
         - name: Create .nojekyll file
           run: touch out/.nojekyll
         
         - name: Deploy to GitHub Pages
           uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: out
   ```

3. 提交并推送这个文件到你的仓库

4. 前往 GitHub 仓库的 Settings > Pages，将 Source 设置为 GitHub Actions

## 配置说明

- `next.config.mjs` 文件中已经配置了静态导出和基础路径
- 基础路径会在生产环境下自动设置为 `/couple-flying-chess-807-master`
- 如果你需要修改仓库名称，请同时更新 `next.config.mjs` 中的 `basePath` 配置

## 注意事项

- 部署后可能需要几分钟时间才能在 GitHub Pages 上看到更新
- 确保你的仓库设置中 GitHub Pages 功能已启用
- 如果遇到样式或资源加载问题，可能是路径配置不正确，请检查 `next.config.mjs` 中的 `basePath` 设置