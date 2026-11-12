/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915）
 * 时间：2026-11-12
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：诗词列表页数据渲染（fetch + Promise.all + 搜索 + 排序）
 * 简介：用 Promise.all 同时请求 /api/poems 与 /api/authors 两份数据，
 *       拼出「上图下文」卡片；再提供关键字搜索与按标题长度排序两个功能。
 *       fetch 失败时给出友好提示，而不是白屏。
 * ============================================================
 */

(function (window, document) {
    'use strict';

    var zsb_api_poems = 'http://localhost:3015/api/poems';
    var zsb_api_authors = 'http://localhost:3015/api/authors';

    // 页面用到的元素
    var zsb_list = document.getElementById('zsbPoemList');
    var zsb_tip = document.getElementById('zsbTip');
    var zsb_search = document.getElementById('zsbSearch');
    var zsb_sort_btn = document.getElementById('zsbSortBtn');

    // 全局状态：原始数据、当前筛选结果、排序方式
    var zsb_poems = [];
    var zsb_authors = [];
    var zsb_showing = [];
    var zsb_sort_style = 'default';   // default | title
    var zsb_keyword = '';

    /**
     * 渲染卡片：把数组拼成「上图下文」的 li
     * @param {Array} zsb_arr 要显示的诗词数组
     */
    function zsb_render(zsb_arr) {
        if (!zsb_arr.length) {
            zsb_list.innerHTML = '<li class="zsb_empty">没有找到匹配的诗词，换个关键词试试。</li>';
            zsb_tip.textContent = '显示 0 条 / 共 ' + zsb_poems.length + ' 条';
            return;
        }

        var zsb_html = '';
        for (var zsb_i = 0; zsb_i < zsb_arr.length; zsb_i++) {
            zsb_html += '<li class="zsb_card">'
                + '<a href="' + (zsb_arr[zsb_i].link || '#') + '">'
                + '<img src="' + zsb_arr[zsb_i].pic + '" alt="' + zsb_arr[zsb_i].title + '">'
                + '</a>'
                + '<div class="zsb_card_body">'
                + '<h3>' + zsb_arr[zsb_i].title + '</h3>'
                + '<p>' + zsb_arr[zsb_i].content + '</p>'
                + '<span class="zsb_author">' + (zsb_arr[zsb_i].author || '佚名') + '</span>'
                + '</div>'
                + '</li>';
        }
        zsb_list.innerHTML = zsb_html;
        zsb_tip.textContent = '显示 ' + zsb_arr.length + ' 条 / 共 ' + zsb_poems.length + ' 条'
            + (zsb_authors.length ? ' · 作者 ' + zsb_authors.length + ' 位' : '');
    }

    /**
     * 按当前关键字与排序方式，从原始数据算出要显示的数组
     */
    function zsb_refresh() {
        var zsb_result = zsb_poems.filter(function (zsb_item) {
            if (!zsb_keyword) {
                return true;
            }
            var zsb_text = (zsb_item.title || '') + (zsb_item.content || '') + (zsb_item.author || '');
            return zsb_text.indexOf(zsb_keyword) !== -1;
        });

        // 先复制一份再排序，避免把原始数据顺序打乱
        zsb_result = zsb_result.slice();
        if (zsb_sort_style === 'title') {
            zsb_result.sort(function (zsb_a, zsb_b) {
                return zsb_a.title.length - zsb_b.title.length;
            });
        }

        zsb_showing = zsb_result;
        zsb_render(zsb_showing);
    }

    /**
     * 取数据：两块接口同时发请求，两边都回来后再一起渲染
     */
    function zsb_load() {
        // ① 先写死一个超时，避免服务器没开时页面一直转圈
        Promise.all([
            fetch(zsb_api_poems).then(function (zsb_res) {
                if (!zsb_res.ok) {
                    throw new Error('诗词接口状态码 ' + zsb_res.status);
                }
                return zsb_res.json();
            }),
            fetch(zsb_api_authors).then(function (zsb_res) {
                if (!zsb_res.ok) {
                    throw new Error('作者接口状态码 ' + zsb_res.status);
                }
                return zsb_res.json();
            })
        ]).then(function (zsb_all) {
            zsb_poems = zsb_all[0];
            zsb_authors = zsb_all[1];
            zsb_tip.classList.remove('zsb_error');
            zsb_refresh();
        }).catch(function (zsb_err) {
            // ② 服务器没启动 / 接口报错时的兜底提示
            zsb_tip.classList.add('zsb_error');
            zsb_tip.textContent = '数据获取失败：' + zsb_err.message
                + ' —— 请先在 db 文件夹里运行 node server.js（端口 3015）';
            zsb_list.innerHTML = '';
        });
    }

    /**
     * 绑定交互：搜索框实时筛选，排序按钮在「默认 / 标题长度」之间切换
     */
    function zsb_bind() {
        zsb_search.addEventListener('input', function () {
            zsb_keyword = zsb_search.value.trim();
            zsb_refresh();
        });

        zsb_sort_btn.addEventListener('click', function () {
            if (zsb_sort_style === 'default') {
                zsb_sort_style = 'title';
                zsb_sort_btn.textContent = '排序：按标题长度 ↑';
                zsb_sort_btn.classList.add('zsb_on');
            } else {
                zsb_sort_style = 'default';
                zsb_sort_btn.textContent = '排序：默认顺序';
                zsb_sort_btn.classList.remove('zsb_on');
            }
            zsb_refresh();
        });
    }

    zsb_bind();
    zsb_load();

})(window, document);
