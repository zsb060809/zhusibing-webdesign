# zsb_prompt.md · 提示词归档

> 规则：所有提示词在执行之前以附加方式写入本文件，含时间、模型、提示词内容。


---

## 2026-10-22 14:27 · 模型：WorkBuddy

**提示词原文：**

设定规则：从现在开始，所有CSS类名，id名、js变量zsb_开始，所有的提示词都在执行之前写入文件zsb_prompt.md，以附加的方式写入，不覆盖之前的内容，写入的内容包括时间、使用的模型、提示词内容。设置规则：新建的html文件加入超链接到首页index.html做两个html网页iconfont-1.html,inconfont-2.html，分别显示font awesome图标和lucide图标，前者使用字体图标的方式，后者使用svg的方式，相关的cdn文件下载到本目录下的cdn目录。请根据skills下面的frontend-design里面的skill去优化iconfont-1.html和iconfont-2.html两个页面的设计等个，使其更有艺术美感，更优雅。根据font目录中的iconfont图标完成移动端的固定的自适应宽度的下导航，导航项目包括4个，完成html网页的设计，网页名称iconfont-3.html和iconfont-4.html分别使用字体图标和svg，包括右上角的数字徽章和红点。在上课的代码文件夹下面创建skills\frontend-design skill.md的文件放在frontend-design文件夹下面 @"D:/univercity/WebSecuirty/WXWork/1688857298554548/Cache/File/2026-10/SKILL.md" 这是这节课的任务，你不必严格按照他的要求，但要以他的要求为基准，贴合我们的项目去完成任务。第一次gitee自动提交步骤：https://spontaneous-valkyrie-4e4229.netlify.app/custom-skill-guide。创建skill:提交项目：使用git commit并push当前项目到`https://gitee.com/neusoft_wangyao_jsj/wangyao2026.git`。完事之后还是交到gitee就行。

**执行摘要：**
- 工作目录：C://Users//朱思冰//webdesign（上课代码文件夹）
- 命名前缀：zsb_
- 产出：iconfont-1/2/3/4.html、cdn/、skills/frontend-design/SKILL.md
- 发布：git push 到 https://gitee.com/neusoft_wangyao_jsj/wangyao2026.git

---

## 2026-10-22 15:05 · 模型：WorkBuddy

**提示词原文：**

（承接上一条，继续未完成部分）根据 font 目录中的 iconfont 图标完成移动端固定的自适应宽度下导航，导航项目 4 个，网页名称 iconfont-3.html（字体图标）和 iconfont-4.html（SVG），包括右上角的数字徽章和红点；在上课代码文件夹下创建 skills/frontend-design/SKILL.md；把 4 个新页面加入 index.html 首页超链接；创建「提交项目」skill 并 git commit + push 到 https://gitee.com/neusoft_wangyao_jsj/wangyao2026.git。

**执行摘要：**
- font/iconfont.woff2 使用的是 Font Awesome 6.5.2 Solid 字形，码位：首页 \f015、发现 \f14e、消息 \f0f3、我的 \f007
- 新增 font/iconfont.css（@font-face + zsb_icon-* 类）
- iconfont-3.html 用字体图标（::before content 码位）；iconfont-4.html 用内联 SVG symbol
- 下导航：position:fixed + left/right:0 + 内层 max-width 480px 居中，实现「固定 + 自适应宽度」
- 徽章：消息项数字徽章，我的项红点

---

## 2026-11-02 13:52 · 模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）

**提示词原文：**

请给我新建一个HTML文件，显示tab选项卡，选项卡分别为国内新闻、省内新闻、国际新闻、最热新闻，国内新闻作为默认选项。文件单独放在JS文件夹中，外部引用，JS部分tab选项卡可复用。实现代码中包含事件监听，清除所有选项卡的选中状态再设置当前元素的选中状态。修改规则AGENTS.md，在新建一个html文件时，要加入注释，尤其是js部分代码的主要功能实现。注释内容包括：姓名，时间，使用模型、功能名称及简介。AGENTS.md 所有说明、检查条目统一简体中文；文件路径、HTML、CSS、JS 标识符保留英文。后续在这个项目里，生成文档、检查清单都遵守这条约定。


---

## 2026-11-02 14:19 · 模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）

**提示词原文：**

https://spontaneous-valkyrie-4e4229.netlify.app/skill-github-pages-guide0 这是这堂课的任务，完成它（附图：课堂测试 3/4.jpg，汽车最新上市/即将上市选项卡表格效果图）

**执行摘要：**

- 参照 4.jpg 还原「最新上市 / 即将上市」选项卡 + 价格表格页面，文件 car-tabs.html + car-tabs.css，复用 js/zsb_tabs.js
- 按 skill-github-pages-guide 流程完成 GitHub 仓库与 Pages 发布


---

## 2026-11-06 · 模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）

**提示词原文：**

@swiper.zip @swiper-imgs.zip @swiper-task.html https://spontaneous-valkyrie-4e4229.netlify.app/swiper-task https://spontaneous-valkyrie-4e4229.netlify.app/swiper-lesson 本节课任务4都要完成，并将目前为止所有的课堂实践提交到netlify上，index文件中有所有课堂实践的入口。@企业微信截图_17938617767290.png 按照要求完成所有的任务

**执行摘要：**

- swiper 依赖落地到本地 cdn/swiper/，四张轮播任务全部写入 swiper-task.html（最简 / 循环+分页+箭头 / 自动播放 / 四种效果切换）
- 任务一 swiper-p1.html + js/zsb_swiper_p1.js：两轮提示词、两次代码差异对照、逐项验证表、答辩，成品 cube
- 任务二 swiper-p2.html + js/zsb_swiper_p2.js：creativeEffect 自定义第七种效果，按钮把 rotate 改 20°
- 任务三 swiper-p3.html + js/zsb_swiper_p3.js：新增第六件展品「爱达·魔都号」（AI 生图 1600×900），keyboard 方向键 + parallax 视差 + 现场改 delay
- index.html 目录扩展到 19 个模块，全部课堂实践可从此进入
