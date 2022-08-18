### editorconfig配置  .editorconfig文件
```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集
indent_style = space # 缩进风格 （tab | space)
indent_size = 2 # 缩进大小 
end_of_line = lf # 控制换行类型（lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅md文件适用一下规则
max_line_length = off
trim_trailing_whitespace = false
```

vscode 需要安装插件： **EditorConfig for VS Code**

### 使用prettier工具
- 安装 `npm install prettire -D`
- 配置.prettierrc文件:
   
   - useTabs: 使用tab缩进还是空格缩进，选择false
   - tabWidth: tab是空格的情况下，是几个空格，选择2个
   - printWidth: 一行字符的长度，推荐80，也有人喜欢100或120
   - singleQuote: 使用单引号还是双引号，选择true使用单引号
   - trailingComma: 在多行输入的尾逗号是否添加，设置为none
   - semi: 语句末尾是否要加分号，默认true，选择false则不加

```js
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```
- 创建.prettireignore忽略文件

```.prettireignore
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh


/public/*
```

### ESLint检测
- 安装eslint `npm install eslint`
- 配置.eslingrc.js文件

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
```
- 解决eslint和prettier冲突问题
  
  - 安装插件 `npm install eslint-plugin-prettier eslint-config-prettier -D`
  - 添加prettier插件
    ```js
      # .eslintrc.js
      extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "@vue/prettier",
        "@vue/prettier/@typescript-eslint",
        "plugin:prettier/recommended"
      ] 
    ```

### git Husky和eslint
husky可以触发的hook `pre-commit` 、 `commit-msg` 、 `pre-push`

使用自动配置命令`npx husky-init && npm install`
这里会做3件事
1. 安装husky相关依赖
2. 在项目目录下创建.husky文件夹
3. 在package.json文件中添加一个脚本 `"prepare": "husky install"`

### git commit 提交规范
使用工具帮助编写规范commit message：`Commitizen`
1. 安装Commitizen `npm install commitizen -D`
2. 安装cz-conventional-changelog,并且初始化cz-conventional-changelog`npx commitizen init cz-conventional-changelog --save-dev --save-exact`
这个命令会帮助安装cz-conventional-changelog,并在package.json中进行配置：
```json
{
  // ...
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```
### 代码提交验证
通过commitlint限制不符合规范的提交
1. 安装@commitlint/config-conventional和@commitlint/cli `npm i @commitlint/config-conventional @commitlint/cli -D`
2. 在根目录创建commitlint.config.js文件，配置commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```
3. 使用husky生成commit-msg文件，验证提交信息: `npx husky add .husky/commit-msg "npx --no-insatll commitlint --edit $1"`

### 第三方库集成

#### vue.config.js配置
vue.config.js有三种配置方式:
- 方式1：直接通过CLI提供的选项配置：

  - 比如publicPath: 配置应用程序部署的子目录（默认是`/`,相当于部署在`https://www.my-app.com`)
  - 比如outputDir：修改输出的文件夹

- 方式2： 通过configureWebpack修改webpack配置

  - 可以是一个对象，直接被合并
  - 可以是一个函数，会接收一个config，可以通过config来修改配置
- 方式3：通过chainWebpack修改webpack配置：

  - 是一个函数，会接收一个基于`webpack-chain`的config队形，可以对配置进行修改

```js
const path = require('path')

```
