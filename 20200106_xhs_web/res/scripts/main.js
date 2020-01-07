$(function () {
    const xinHuaShe = {
        init: function() {
            this.OnSiteDirectStrike();
            this.GoodVoiceAction();
        },
        // 现场直击
        OnSiteDirectStrike: function() {
            // 现场直击导航切换js
            $('.picture-title li').on('click', function(){
                const index = $(this).index() + 1;
                $(this).addClass('active').siblings().removeClass('active');
                $('.picture-list').hide();
                $(`.picture-list${index}`).show();
            });
        },
        // 好声音轮播
        GoodVoiceAction: function() {
            const count = $('.slide_box .bd ul li').length;
            let pagination = [];
            Array.from({length: count}, (item, idx) => {pagination.push(`<li>${idx+1}</li>`)})
            pagination = `<div class="hd"><ul>${pagination.join('')}</ul></div>`;
            $('.slideTxtBox').slide({
                mainCell:'.bd ul',
                effect:'left',
                trigger:'mouseover',
                autoPlay:true,
                easing:'swing',
                delayTime:800,
                mouseOverStop:true,
                pnLoop:true
            })
        }
    };
    xinHuaShe.init();
});