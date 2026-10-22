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
