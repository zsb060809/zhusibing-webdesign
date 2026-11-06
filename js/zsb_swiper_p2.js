/*!
 * ============================================================
 * 姓名：朱思冰（学号 24001010915）
 * 时间：2026-11-06
 * 使用模型：DeepSeek-V4.1-Flash（WorkBuddy 环境）
 * 功能名称：任务二 · creative 效果与 20° 追问演示
 * 简介：用 creativeEffect 的 prev / next 描述上一张与下一张的位置；点按钮时
 *       把 rotate 的 Z 轴角度换成 20，并通过「销毁 + 重建」让新参数生效，
 *       用来回答"改一个数值让卡片转 20 度"的追问。
 * ============================================================
 */

(function (window, document) {
    'use strict';

    var zsb_active_class = 'zsb_on';
    var zsb_swiper = null;
    var zsb_rotate_z = -10;

    /* 按当前角度创建实例：真正生效的入口只有这里 */
    function zsb_build() {
        var zsb_el = document.querySelector('#zsbSw2');
        if (!zsb_el || typeof window.Swiper !== 'function') {
            return null;
        }

        return new window.Swiper('#zsbSw2', {
            loop: true,
            speed: 600,
            grabCursor: true,
            effect: 'creative',
            creativeEffect: {
                prev: {
                    translate: ['-55%', 0, -120],
                    rotate: [0, 0, zsb_rotate_z],
                    scale: 0.8,
                    opacity: 0.9,
                    shadow: true
                },
                next: {
                    translate: ['55%', 0, -40],
                    rotate: [0, 0, 6],
                    scale: 1.08,
                    shadow: true
                }
            },
            pagination: {
                el: '#zsbPag2',
                clickable: true
            },
            navigation: {
                prevEl: '#zsbPrev2',
                nextEl: '#zsbNext2'
            }
        });
    }

    /* 切换角度：先销毁旧实例，再按新角度重建 */
    function zsb_switch_rotate(zsb_value, zsb_button) {
        zsb_rotate_z = zsb_value;

        document.querySelectorAll('.zsb_btns .zsb_btn').forEach(function (zsb_item) {
            zsb_item.classList.remove(zsb_active_class);
        });
        if (zsb_button) {
            zsb_button.classList.add(zsb_active_class);
        }

        if (zsb_swiper && !zsb_swiper.destroyed) {
            zsb_swiper.destroy(true, true);
        }
        zsb_swiper = zsb_build();
    }

    function zsb_bind_buttons() {
        document.querySelectorAll('.zsb_btns .zsb_btn').forEach(function (zsb_button) {
            zsb_button.addEventListener('click', function () {
                var zsb_value = parseInt(zsb_button.getAttribute('data-rotate'), 10);
                zsb_switch_rotate(zsb_value, zsb_button);
            });
        });
    }

    function zsb_init() {
        zsb_swiper = zsb_build();
        zsb_bind_buttons();
    }

    window.zsb_p2 = {
        init: zsb_init,
        switch_rotate: zsb_switch_rotate
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', zsb_init);
    } else {
        zsb_init();
    }

})(window, document);
