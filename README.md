# zhusibing-webdesign

朱思冰的《高级网页设计》课堂实践仓库（学号 24001010915，9 班 15 号）。

把每次课的 HTML / CSS / JavaScript 练习整理成可直接访问的网页，同时作为本课程的技能仓库，技能说明见 [SKILL.md](SKILL.md)。

## 在线地址

- 课堂目录：<https://zsb060809.github.io/zhusibing-webdesign/>
- Tab 选项卡：<https://zsb060809.github.io/zhusibing-webdesign/tabs.html>
- 汽车上市价格表（课堂测试）：<https://zsb060809.github.io/zhusibing-webdesign/car-tabs.html>

## 页面一览

| 文件 | 内容 |
| --- | --- |
| `index.html` | 课堂目录首页 |
| `html-basics.html` | HTML 基础标签与页面结构 |
| `html.24001010915zsb.html` | 自我介绍网页 |
| `form.html` / `submit.html` | 留言表单 / 作业提交表单 |
| `cascade.html` | CSS 层叠、继承与盒模型 |
| `css-diner.html` | CSS 选择器小游戏答案 |
| `stack.html` | 图文列表（上图下文 / 图上文字） |
| `layout-homework.html` | 网页整体布局课后作业 |
| `tabs.html` | Tab 选项卡（新闻频道） |
| `car-tabs.html` | 汽车上市价格表（课堂测试） |
| `iconfont-1.html` ~ `iconfont-4.html` | 字体图标、SVG 图标、移动端下导航 |

## 开发约定

- 类名、id、JavaScript 变量统一 `zsb_` 前缀
- CSS 外链，JavaScript 放 `js/` 目录外部引用，页面内不写行内样式与内联事件
- 新建页面需在文件头注释中写明姓名、时间、使用模型、功能名称与简介
- 详细规则见 [AGENTS.md](AGENTS.md)

## 浏览方式

直接用浏览器打开 `index.html`，或启动本地静态服务器：

```bash
python -m http.server 8080
```

然后访问 <http://localhost:8080/>。
