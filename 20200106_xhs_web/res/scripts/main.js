$(function () {
    const xinHuaShe = {
        init: function() {
            this.OnSiteDirectStrike();
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
        }
    };
    xinHuaShe.init();
});