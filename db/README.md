# 诗词列表 · 从 JSON 到 fetch（操作说明）

姓名：朱思冰（学号 24001010915）　日期：2026-11-12

## 一、这条链路在做什么

```
db/db.json  ──读取──►  db/server.js (Express, 端口 3015)  ──HTTP──►  poems.html
  poems 数组           /api/poems、/api/authors              fetch + Promise.all
```

## 二、文件分工

| 文件 | 作用 |
|---|---|
| `db/db.json` | 数据源，最外层 `{ "poems": [...] }`，每条含 `title / author / content / pic` |
| `db/server.js` | Express 服务器，读 db.json 后通过两个接口返回；统一开跨域 |
| `db/package.json`、`db/node_modules/` | `npm init -y` 与 `npm install express` 生成，只需做一次 |
| `poems.html` | 页面骨架，只有容器，没有写死的数据 |
| `poems.css` | 上图下文卡片的三列布局，窄屏自动降为两列/一列 |
| `js/zsb_poems.js` | fetch 取数据、渲染卡片、搜索与排序 |

> 端口说明：课堂示例写的是 3004。本机 3004 已被其他程序占用（EADDRINUSE），
> 所以这里统一改成 **3015**，`server.js`、`poems.html` 说明文字、`js/zsb_poems.js`
> 三处必须一致。若你的机器 3004 空闲，把三处的 3015 全改成 3004 即可。

## 三、启动步骤

```bash
# ① 进入 db 文件夹
cd C:\Users\朱思冰\webdesign\db

# ② 初始化并装依赖（只做一次，本机已完成）
npm init -y
npm install express

# ③ 启动服务器（每次上课都要做）
node server.js
# 看到：数据服务器已启动：http://localhost:3015/api/poems

# ④ 验证接口：浏览器打开
#    http://localhost:3015/api/poems
#    http://localhost:3015/api/authors
```

然后在文件管理器里双击 `poems.html`（或右键「在浏览器中打开」），页面就会渲染出 6 张卡片。

## 四、课堂三档任务完成情况

### 任务一 · 跑通全链路 ⭐

- server.js 启动成功，接口返回 6 条数据，页面渲染出图片 + 标题 + 内容 + 作者。
- `js/zsb_poems.js` 里的 `.catch()` 分支：服务器没启动时，提示栏变红并显示
  「数据获取失败：Failed to fetch —— 请先在 db 文件夹里运行 node server.js（端口 3015）」，卡片列表为空而不是白屏。
- 实测：断开接口伪造失败后，页面正确定位到 catch 分支（`isError=true`）。

### 任务二 · 数据我来定 ⭐⭐

- **新增 2 条数据**：`静夜思`（李白）、`江雪`（柳宗元），另给原本缺作者的 4 条补上 `author`
  （曹操 / 王驾 / 杜甫 / 秦观）。顺手把原数据里标题写成「脊楼」的那条改回正确的 **《登高》**。
- **第二个接口**：`app.get('/api/authors', ...)`，从 poems 里取 `author` 去重后返回，
  现在返回 `["曹操","王驾","杜甫","秦观","李白","柳宗元"]`。
- **并发取两份数据**：`Promise.all([fetch(poems), fetch(authors)])`，两边都成功才渲染，
  提示栏同时显示「显示 6 条 / 共 6 条 · 作者 6 位」。

### 任务三 · 加交互 ⭐⭐⭐

- **搜索框**：`input` 事件实时筛选，同时匹配标题、内容、作者；输入「李白」只剩 1 条「静夜思」。
- **按标题长度排序**：按钮在「默认顺序 / 按标题长度 ↑」之间切换，
  排序结果：雨晴(2)、登高(2)、江雪(2)、短歌行(3)、静夜思(3)、鹊桥仙·纤云弄巧(8)。
- 排序用 `slice()` 复制后再排，不会打乱原始数组顺序，搜索与排序可以叠加使用。

## 五、答辩四问

**问 1：为什么 fetch 要写两个 then？**
`fetch()` 返回的是一个 Promise，它 resolve 出来的是 `Response` 对象——这时只拿到了响应头，
响应体还在流里没有读完（相当于快递到门口，包裹还没拆）。所以第一个 `then` 里要调用
`res.json()`，它返回的又是一个 Promise，等它读完并解析完才是真正的数组，需要在第二个 `then` 里接。
用 `async / await` 写就是两行 `await`，道理完全一样。

**问 2：`.json()` 之前拿到的是什么？**
是 `Response` 对象：包含 `status`（状态码）、`ok`（是否 2xx）、`headers`（响应头）等，
还有一堆读响应体的方法（`.text()` / `.json()` / `.blob()`）。此时**还没有**解析好的数据，
直接对它取 `.length` 或 `[0]` 都是 undefined。

**问 3：CORS 是谁拦的？**
是**浏览器**拦的，不是服务器也不是网络。浏览器发现「页面来源（file:// 或其他端口）」与
「接口来源 localhost:3015」不同源，就去检查响应里有没有 `Access-Control-Allow-Origin` 头；
没有就直接把响应丢掉并报 CORS 错误，请求其实已经发出去、服务器也已经返回了。
所以解决办法是在服务器端加这个响应头（本项目的 `app.use` 里统一加了 `*`）。

**问 4：如果服务器没启动，你的页面表现如何？**
请求会失败（Network 面板显示 `ERR_CONNECTION_REFUSED`），Promise 进入 reject，
被 `.catch()` 捕获：提示栏变红、显示具体原因和「请先在 db 文件夹里运行 node server.js」，
卡片区域保持为空，不会出现半截白屏或报错弹窗。用户一看就知道该去启动服务器。

## 六、常见问题对照

| 现象 | 原因 | 处理 |
|---|---|---|
| `ERR_CONNECTION_REFUSED` | 服务器没启动 / 端口不对 | `cd db` 后 `node server.js`，确认端口 3015 |
| `EADDRINUSE` | 端口被别的程序占用 | 换端口，三处一起改 |
| `Cannot find module 'express'` | 终端不在 db 目录 / 没装依赖 | `cd db` 后 `npm install express` |
| CORS 报错 | 服务器没加跨域头 | 本项目已统一加 `Access-Control-Allow-Origin: *` |
| 字段全是 undefined | 代码里写 `img`，数据里是 `pic` | 先打开接口地址核对字段名 |
| 改了 db.json 页面没变 | 不是问题 | 服务器每次都重新读文件，刷新页面即可；页面缓存则按 Ctrl+F5 |

## 七、值得说的一点

`server.js` 里没有在启动时把 db.json 读一次就存着，而是**每次请求都重新读**。
课堂示例里改完数据要 `Ctrl+C` 再 `node server.js` 才能生效，这里省掉了这一步：
改 `db.json` 保存后，直接刷新页面就能看到新内容，演示时更顺手。
