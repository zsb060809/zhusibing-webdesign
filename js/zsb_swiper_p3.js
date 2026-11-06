/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915）
 * 时间：2026-11-06
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：任务三 · 光影展轮播（键盘控制 + 视差 + 现场改 delay）
 * 简介：初始化 #zsbExpo 轮播，打开 parallax 与 keyboard；下面三个按钮用来
 *       现场修改 autoplay.delay，改完调用 autoplay.start() 让新间隔立即生效。
 * ============================================================
 */

(function (window, document) {
    'use strict';

    /* 当前选中的按钮用这个类名标亮 */
    var zsb_active_class = 'zsb_on';

    /* 默认每张停留 4200 毫秒，和页面上展示的初始化代码保持一致 */
    var zsb_default_delay = 4200;

    var zsb_swiper = null;

    /* 创建轮播实例：整页只有这一个入口，改参数只改这里 */
    function zsb_build() {
        var zsb_el = document.querySelector('#zsbExpo');

        if (!zsb_el || typeof window.Swiper !== 'function') {
            return null;
        }

        return new window.Swiper('#zsbExpo', {
            loop: true,          /* 六张展品首尾相接，可以一直往右翻 */
            speed: 900,          /* 一次切换动画 900 毫秒，比默认稍慢更从容 */
            parallax: true,      /* 打开视差，配合元素上的 data-swiper-parallax */

            keyboard: {
                enabled: true,          /* 方向键 ← → 可以翻页 */
                onlyInViewport: true    /* 轮播不在视口里时不抢键盘事件 */
            },

            autoplay: {
                delay: zsb_default_delay,
                disableOnInteraction: false   /* 手动翻页后自动播放继续，不中断 */
            },

            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },

            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next'
            }
        });
    }

    /* 改停留时间：先改参数，再停一次重新启动，新间隔才会立刻生效 */
    function zsb_set_delay(zsb_value, zsb_button) {
        document.querySelectorAll('.zsb_controls button').forEach(function (zsb_item) {
            zsb_item.classList.remove(zsb_active_class);
        });

        if (zsb_button) {
            zsb_button.classList.add(zsb_active_class);
        }

        if (!zsb_swiper || zsb_swiper.destroyed) {
            return;
        }

        zsb_swiper.params.autoplay.delay = zsb_value;
        zsb_swiper.autoplay.stop();
        zsb_swiper.autoplay.start();
    }

    function zsb_bind_controls() {
        document.querySelectorAll('.zsb_controls button').forEach(function (zsb_button) {
            zsb_button.addEventListener('click', function () {
                var zsb_value = parseInt(zsb_button.getAttribute('data-delay'), 10);

                if (!isNaN(zsb_value)) {
                    zsb_set_delay(zsb_value, zsb_button);
                }
            });
        });
    }

    function zsb_init() {
        zsb_swiper = zsb_build();
        zsb_bind_controls();
    }

    /* 对外暴露，方便在控制台里调试 */
    window.zsb_p3 = {
        init: zsb_init,
        set_delay: zsb_set_delay,
        get_swiper: function () {
            return zsb_swiper;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', zsb_init);
    } else {
        zsb_init();
    }

})(window, document);
