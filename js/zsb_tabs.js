/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915，9 班 15 号）
 * 时间：2026-11-02
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：可复用 Tab 选项卡组件 zsb_tabs
 * 简介：用原生 JavaScript 实现选项卡切换。为每一组选项卡绑定点击事件监听，
 *       点击后先循环清除所有选项卡与面板的选中状态，再给当前元素单独加上
 *       选中状态。组件不依赖具体文字，只认 data 属性，同一页面可以放多组
 *       选项卡，互不干扰。
 * ------------------------------------------------------------
 * 命名规则：本文件所有 JavaScript 变量、函数、对外接口均以 zsb_ 开头。
 * HTML 结构约定（三处 data 属性缺一不可）：
 *   1. 容器      <div data-zsb-tabs>                     标记这是一组选项卡
 *   2. 选项卡    <button data-zsb-tab="cn">              值要和面板的 data-zsb-panel 对应
 *   3. 面板      <section data-zsb-panel="cn">           内容区
 * 选中状态统一用类名 zsb_is_active 表示，样式全部写在外部 css 文件里。
 * ============================================================
 */

(function (window, document) {
    'use strict';

    /* 选中状态的类名，HTML / CSS / JS 三处保持一致 */
    var zsb_active_class = 'zsb_is_active';

    /**
     * 切换到指定选项卡
     * 执行顺序：先清除全部选中状态，再设置当前元素的选中状态
     * @param {Element} zsb_root  选项卡容器（带 data-zsb-tabs 的那个元素）
     * @param {String}  zsb_key   要切换到的选项卡标识，例如 'cn'
     * @returns {Boolean} 切换成功返回 true
     */
    function zsb_switch_to(zsb_root, zsb_key) {
        if (!zsb_root || !zsb_key) {
            return false;
        }

        var zsb_buttons = zsb_root.querySelectorAll('[data-zsb-tab]');
        var zsb_panels = zsb_root.querySelectorAll('[data-zsb-panel]');
        var zsb_i;

        /* —— 第一步：循环清除所有选项卡的选中状态 —— */
        for (zsb_i = 0; zsb_i < zsb_buttons.length; zsb_i++) {
            zsb_buttons[zsb_i].classList.remove(zsb_active_class);
            zsb_buttons[zsb_i].setAttribute('aria-selected', 'false');
            zsb_buttons[zsb_i].setAttribute('tabindex', '-1');
        }

        /* —— 同时清除所有内容面板的显示状态 —— */
        for (zsb_i = 0; zsb_i < zsb_panels.length; zsb_i++) {
            zsb_panels[zsb_i].classList.remove(zsb_active_class);
            zsb_panels[zsb_i].setAttribute('aria-hidden', 'true');
        }

        /* —— 第二步：只给当前点击的这一项加选中状态 —— */
        var zsb_current_button = zsb_root.querySelector('[data-zsb-tab="' + zsb_key + '"]');
        var zsb_current_panel = zsb_root.querySelector('[data-zsb-panel="' + zsb_key + '"]');

        if (!zsb_current_button || !zsb_current_panel) {
            return false;
        }

        zsb_current_button.classList.add(zsb_active_class);
        zsb_current_button.setAttribute('aria-selected', 'true');
        zsb_current_button.setAttribute('tabindex', '0');

        zsb_current_panel.classList.add(zsb_active_class);
        zsb_current_panel.setAttribute('aria-hidden', 'false');

        /* 窄屏下选项卡可横向滚动，切换后把当前项滚到可见区域 */
        if (typeof zsb_current_button.scrollIntoView === 'function') {
            zsb_current_button.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }

        return true;
    }

    /**
     * 初始化页面上的选项卡
     * 遍历每一组容器，为组内每个选项卡绑定 click 事件监听
     * @param {String} zsb_selector 可选，自定义容器选择器，默认 [data-zsb-tabs]
     * @returns {Number} 初始化成功的选项卡组数量
     */
    function zsb_init(zsb_selector) {
        var zsb_roots = document.querySelectorAll(zsb_selector || '[data-zsb-tabs]');
        var zsb_count = 0;
        var zsb_r;

        for (zsb_r = 0; zsb_r < zsb_roots.length; zsb_r++) {
            /* 用闭包把当前这一组容器固定住，避免多组选项卡互相串台 */
            (function (zsb_root) {
                var zsb_buttons = zsb_root.querySelectorAll('[data-zsb-tab]');
                var zsb_i;

                for (zsb_i = 0; zsb_i < zsb_buttons.length; zsb_i++) {
                    /* 事件监听：点击某个选项卡时，把它的 data-zsb-tab 交给切换函数 */
                    zsb_buttons[zsb_i].addEventListener('click', function () {
                        var zsb_key = this.getAttribute('data-zsb-tab');
                        zsb_switch_to(zsb_root, zsb_key);
                    });
                }

                /* 如果 HTML 里没有预先标记选中项，默认选中第一个选项卡 */
                if (!zsb_root.querySelector('[data-zsb-tab].' + zsb_active_class)) {
                    var zsb_first = zsb_root.querySelector('[data-zsb-tab]');
                    if (zsb_first) {
                        zsb_switch_to(zsb_root, zsb_first.getAttribute('data-zsb-tab'));
                    }
                }

                zsb_count++;
            })(zsb_roots[zsb_r]);
        }

        return zsb_count;
    }

    /* 对外暴露接口：zsb_tabs.init() 初始化，zsb_tabs.switch_to() 手动切换 */
    window.zsb_tabs = {
        init: zsb_init,
        switch_to: zsb_switch_to
    };

    /* 页面加载完成后自动初始化，HTML 里不需要再写任何内联脚本 */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            zsb_init();
        });
    } else {
        zsb_init();
    }

})(window, document);
