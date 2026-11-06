/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915）
 * 时间：2026-11-06
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：任务一验证台 · #wySw4 cube 轮播
 * 简介：把第二轮提示词产出的配置原样落地，用于页面上的逐项验证：
 *       不写 loop（无循环）+ 3.2 秒自动播放且拖动不停止 + 圆点可点击 +
 *       初始 cube 效果 + 800ms 切换速度。
 * ============================================================
 */

(function (window, document) {
    'use strict';

    /* 选中/当前状态的统一类名，和样式表保持一致 */
    var zsb_active_class = 'zsb_on';

    function zsb_init_demo() {
        var zsb_el = document.querySelector('#wySw4');
        if (!zsb_el || typeof window.Swiper !== 'function') {
            return null;
        }

        return new window.Swiper('#wySw4', {
            speed: 800,
            effect: 'cube',
            /* 无循环：这里刻意不写 loop，保持默认 false */
            autoplay: {
                delay: 3200,
                disableOnInteraction: false
            },
            pagination: {
                el: '#wyPag4',
                clickable: true
            }
        });
    }

    /* 暴露给页面其他脚本使用（当前页面只用来自动初始化） */
    window.zsb_p1 = {
        init: zsb_init_demo,
        active_class: zsb_active_class
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', zsb_init_demo);
    } else {
        zsb_init_demo();
    }

})(window, document);
