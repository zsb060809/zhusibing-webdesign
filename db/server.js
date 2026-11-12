/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915）
 * 时间：2026-11-12
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：诗词数据服务器（Express 本地接口）
 * 简介：读取同目录下的 db.json，把 poems 数组通过 /api/poems 发出去，
 *       再提供 /api/authors 返回作者列表；统一允许跨域，方便页面用
 *       file:// 直接打开时也能请求。端口固定 3015。
 * ============================================================
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const zsb_port = 3015;

// 每次请求都重新读文件：改完 db.json 不用重启服务，刷新页面就能看到新内容
function zsb_read_db() {
    const zsb_raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    return JSON.parse(zsb_raw);
}

// 统一允许跨域：页面用 file:// 打开时也能请求本接口
app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// ① 诗词列表接口：返回 poems 数组
app.get('/api/poems', function (req, res) {
    try {
        const zsb_data = zsb_read_db();
        res.json(zsb_data.poems);
    } catch (zsb_err) {
        res.status(500).json({ error: 'db.json 读取或解析失败：' + zsb_err.message });
    }
});

// ② 作者列表接口：把 poems 里的 author 去重后返回
app.get('/api/authors', function (req, res) {
    try {
        const zsb_data = zsb_read_db();
        const zsb_authors = [];
        for (const zsb_poem of zsb_data.poems) {
            if (zsb_poem.author && zsb_authors.indexOf(zsb_poem.author) === -1) {
                zsb_authors.push(zsb_poem.author);
            }
        }
        res.json(zsb_authors);
    } catch (zsb_err) {
        res.status(500).json({ error: 'db.json 读取或解析失败：' + zsb_err.message });
    }
});

// ③ 根路径给个提示，避免误开根地址时以为是坏了
app.get('/', function (req, res) {
    res.type('html').send(
        '<meta charset="utf-8"><h3>诗词数据服务器运行中</h3>' +
        '<p>诗词接口：<a href="/api/poems">/api/poems</a></p>' +
        '<p>作者接口：<a href="/api/authors">/api/authors</a></p>' +
        '<p>前端页面：在项目根目录打开 poems.html</p>'
    );
});

app.listen(zsb_port, function () {
    console.log('数据服务器已启动：http://localhost:' + zsb_port + '/api/poems');
    console.log('作者接口：http://localhost:' + zsb_port + '/api/authors');
});
