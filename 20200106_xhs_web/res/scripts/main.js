$(function () {
    console.log(123);
    // 现场直击导航切换js
    $('.picture-title li').on('click', function(){
        const index = $(this).index() + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $('.picture-list').hide();
        $(`.picture-list${index}`).show();
    });
});