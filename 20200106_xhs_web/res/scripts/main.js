$(function () {
    /**
	 * [goToFloor 楼层定位]
	 * @type {Object}
	 */
	var goToFloor = {
		init: function(config) {
			this.watchFloor(config);
			this.goFloor(config);
			this.goTop(config);
		},
		watchFloor: function(config) {
			//监听滚动，高亮联动
			$(config.className1).each( function(i, index) {
	    		var windowTop = $(config.className1).eq(i).offset().top - 100;
	    		$(window).scroll(function(){
	                if($(this).scrollTop() >= windowTop ){
	                    $(config.className2).eq(i).addClass(config.activeClassName).siblings().removeClass(config.activeClassName);
	                }
	            })
			});
		},
		goFloor: function (config) {
			//点击侧边
			$(config.className2).not(config.className3).click(function() {
                var idx = $(this).index() + 1;
                var name = config.className4 + ($(this).index() + 1);
                switch(idx) {
                    case 1:
                    case 2:
                        name = config.className4 + 1;
                        break;
                    case 3:
                    case 4:
                        name = config.className4 + 2;
                        break;
                    case 5:
                        name = config.className4 + 3;
                        break;
                    case 6:
                        name = config.className4 + 4;
                        break;
                    default:
                        name = config.className4 + 5;
                        break;
                }
				$('body,html').animate({ 'scrollTop': $(name).offset().top - 40}, config.speed);
			})
		},
		goTop: function (config) {
			$(config.className3).click(function(){
				$('body,html').animate({ 'scrollTop':0 }, config.speed);
			})
		}
	};
    goToFloor.init({
		className1: '.bgc',//[目标楼层的class类名]
		className2: '.goto_floor',//[侧边点击的class类名]
		className3: '.goto_top',//[返回顶部的class类名]
		className4: '.floor',//[目标楼层公共部分的class类名比如： <div class=".floor1"></div> <div class=".floor2"></div>]
		activeClassName: 'active',//[侧边高亮的class类名] 注意最后的这个className 没有点
		speed: 600 // 滚动速度 越大越慢
	});
    const xinHuaShe = {
        time: "",
        Init: function() {
            this.OnSiteDirectStrike();
            this.GoodVoiceAction();
            // this.CalendarAction();
        },
        // 现场直击
        OnSiteDirectStrike: function() {
            var that = this;
            // 现场直击导航切换js
            var key = 1;
            this.time = setInterval(()=>{
                key ++;
                if (key >= 6) {
                    key = 1
                }
                $('.picture-title li').removeClass('active');
                $($('.picture-title li')[key-1]).addClass('active')
                $('.picture-list').hide();
                $(`.picture-list${key}`).show();
            },3000);

            $('.picture-title li').on('click', function(){
                const index = $(this).index() + 1;
                $(this).addClass('active').siblings().removeClass('active');
                $('.picture-list').hide();
                $(`.picture-list${index}`).show();
                key = $(this).index() + 1;
                clearInterval(that.time);
                that.time = "";
                that.time = setInterval(()=>{
                    key ++;
                    if (key >= 6) {
                        key = 1
                    }
                    $('.picture-title li').removeClass('active');
                    $($('.picture-title li')[key-1]).addClass('active')
                    $('.picture-list').hide();
                    $(`.picture-list${key}`).show();
                },3000);
            });
        },
        // 好声音轮播
        GoodVoiceAction: function() {
            const count = $('.slideTxtBox .bd ul li').length;
            let pagination = [];
            for (let i; i<count; i++) {
                pagination.push(`<li>${i+1}</li>`);
            }
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

            const count1 = $('.lbleft .bd ul li').length;
            let pagination2 = [];
            for (let i; i<count1; i++) {
                pagination2.push(`<li>${i+1}</li>`);
            }
            pagination2 = `<div class="hd"><ul>${pagination2.join('')}</ul></div>`;
            $('.lbleft').slide({
                mainCell:'.bd ul',
                effect:'left',
                trigger:'mouseover',
                autoPlay:true,
                easing:'swing',
                delayTime:800,
                mouseOverStop:true,
                pnLoop:true
            })

            const count2 = $('.title .bd ul li').length;
            let pagination3 = [];
            for (let i; i<count2; i++) {
                pagination3.push(`<li>${i+1}</li>`);
            }
            pagination3 = `<div class="hd"><ul>${pagination3.join('')}</ul></div>`;
            $('.title').slide({
                mainCell:'.bd ul',
                effect:'top',
                trigger:'click',
                autoPlay:true,
                easing:'swing',
                delayTime:800,
                mouseOverStop:true,
                pnLoop:true
            })
            
        },
        // 日历
        CalendarAction: function() {
            const date = new Date();
            const [month, day, DayList = []] = [`${date.getMonth() + 1}月`, date.getDate()];
            for (let idx = 0; idx<5; idx++) {
                switch (idx) {
                    case 0:
                        DayList.push(`<li class="fl-l active">${day + idx}日</li>`);
                        break;
                    default:
                        DayList.push(`<li class="fl-l">${day + idx}日</li>`);
                }
            };
            const DayString = DayList.join('');
            $('.date-day').html(DayString);
            $('.date-month').html(month);
        },
    };
    xinHuaShe.Init();
});