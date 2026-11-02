---
name: zhusibing-webdesign
description: 朱思冰的《高级网页设计》课堂实践技能仓库，包含 HTML/CSS/JS 基础、CSS 选择器与布局、字体图标与 SVG 图标、移动端下导航、以及可复用 Tab 选项卡组件等课堂练习页面。
---

# zhusibing-webdesign

## 这是什么

大连东软信息学院《高级网页设计》课程的课堂实践项目，把每次课的练习整理成可以直接访问的网页。
仓库同时作为本课程的技能仓库（skill），打开 `index.html` 即可看到全部课堂模块的目录。

## 目录说明

| 文件 / 目录 | 说明 |
| --- | --- |
| `index.html` | 课堂目录首页，汇总所有练习页面 |
| `tabs.html` | Tab 选项卡练习：国内 / 省内 / 国际 / 最热新闻，默认国内新闻 |
| `car-tabs.html` | 课堂测试：汽车「最新上市 / 即将上市」选项卡与售价表格 |
| `js/zsb_tabs.js` | 可复用选项卡组件，页面通过 `<script src>` 外部引用 |
| `tab.css` / `car-tabs.css` | 对应页面的外链样式表 |
| `skills/frontend-design/` | 课程提供的视觉设计规范 |
| `AGENTS.md` | 项目规则：命名、注释、文件组织与交付约定 |
| `zsb_prompt.md` | 每次任务的提示词归档 |

其余为各课次练习页面：`html-basics.html`、`form.html`、`cascade.html`、`css-diner.html`、`stack.html`、`layout-homework.html`、`iconfont-1.html` 至 `iconfont-4.html` 等。

## 技术要点

1. 全部使用原生 HTML / CSS / JavaScript，不依赖框架。
2. CSS 一律外链，JavaScript 一律放在 `js/` 目录并用 `<script src>` 引入，页面内不写行内样式与内联事件。
3. 类名、id、JavaScript 变量统一以 `zsb_` 开头（姓名首字母 + 学号后四位相关约定）。
4. Tab 组件通过 `data-zsb-tabs`、`data-zsb-tab`、`data-zsb-panel` 三个属性识别结构，同一页面可以放多组，互不干扰。

## 在线访问

启用 GitHub Pages 后访问：

```
https://zsb060809.github.io/zhusibing-webdesign/
```

## 作者

朱思冰 · 学号 24001010915 · 9 班 15 号
