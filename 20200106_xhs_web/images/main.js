'use strict';

$(function () {
    var xinHuaShe = {
        init: function init() {
            this.OnSiteDirectStrike();
            var count = $('.slide_box .bd ul li').length;
            var pagination = [];
            for (var i = 0; i < count; i++) {
                pagination.push('<li>' + (i + 1) + '</li>');
            }
            pagination = '<div class="hd"><ul>' + pagination.join('') + '</ul></div>';
            $('.slideTxtBox').slide({
                mainCell: '.bd ul',
                effect: 'left',
                trigger: 'mouseover',
                autoPlay: true,
                easing: 'swing',
                delayTime: 800,
                mouseOverStop: true,
                pnLoop: true
            });
        },
        // 现场直击
        OnSiteDirectStrike: function OnSiteDirectStrike() {
            // 现场直击导航切换js
            $('.picture-title li').on('click', function () {
                var index = $(this).index() + 1;
                $(this).addClass('active').siblings().removeClass('active');
                $('.picture-list').hide();
                $('.picture-list' + index).show();
            });
        }
    };
    xinHuaShe.init();
});