;(($)=>{
    /**
     *日期格式化
     *@method format
     *@param  "yyyy-MM-dd"
     *@return "2017-09-01"
     */
    ;Date.prototype.format = function(fmt){
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


    /**
     *字符串序列化为json
     *@method str2json
     *@param  String 属性名
     *@return Object|String
     */
    ;String.prototype.str2json = function(name){
        var num = this.indexOf("?"),
            str = this.substr(num+1),
            arr = str.split("&"),
            res = {};
        for(var i=0;i < arr.length;i++){
            num=arr[i].indexOf("=");
            if(num>0){
                var n=arr[i].substring(0,num),
                    v=arr[i].substr(num+1);
                res[n.toLowerCase()]=decodeURIComponent(v);
            }
        }
        if(name) {
            name = name.toLowerCase();
            return res[name] ? res[name] : '';
        }
        return res
    }



    //切换页面
    ;$.fn.render = function(el){
        var o = typeof el != 'string' ? el:null;
        if(o){
            el = null;
        }
        el = !el?'section':el;
        $(el).removeClass('active');
        this.addClass('active');
        this.trigger('render', o);
    }

    //表单序列化为json对象
    ;$.fn.form2json = function(){
        let res = {};
        this.find('[name]').each(function(){
            const name = $(this).attr('name');
            let val = $(this).val();
            res[name] = val;
        });
        return res;
    }
    
    //禁止放大文本(H5)
    ;(()=>{
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            handleFontSize();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
            }
        }
        var handleFontSize = ()=>{
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
            WeixinJSBridge.on('menu:setfont', function () {
                WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
            });
        }
    })();

    var ua = (function(){
        var u = navigator.userAgent;
        var u2 = navigator.userAgent.toLowerCase();
        var res = { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
            weixin:u2.match(/MicroMessenger/i) == "micromessenger",
            ali: u.indexOf('AliApp') > -1,
        };
        res.weixin = res.weixin && res.mobile;
        return res;
    })();

    let hocodo = {

        //获取浏览器信息
        ua,

        /**
        *添加百度统计事件
        *@method BDTJ
        *@param  String 事件名称
        */
        BDTJ(name, val){
            if(!window['_hmt']){
                console.error('please create tongji script');
                return;
            }
            val = !val? '':val;
            _hmt.push(['_trackEvent', name, val, new Date().format('yyyy-MM-dd')]);
        },

        qrcodeUrl(text){
            return "http://wandafilm.xhgai.com/service/test/qrcode.php?margin=1&text="+encodeURIComponent(text);
        },

        //文件上传
        upload($el, callback){
            if(!window['EXIF']){
                console.error('please import EXIF.js');
                return;
            }
            $el.change(function(){
                var files = $(this)[0].files;
                if(files.length>0){
                    layer.loading();
                    const url = URL.createObjectURL(files[0]);
                    let img = new Image();
                    img.onload = function(){
                        const org = EXIF.getTag(this, 'Orientation');
                        let rotation = 0;
                        switch(org){
                            case 3:
                                rotation = 180;
                                break;
                            case 6:
                                rotation = 90;
                                break;
                            case 8:
                                rotation = 270;
                                break;
                        }
                        callback(url, rotation)
                    }
                    img.src = url;
                }
            })
        },

        //微信分享
        share(options){
            if(!window['wx']){
                console.error('please import https://res.wx.qq.com/open/js/jweixin-1.2.0.js');
                return;
            }
            options = $.extend({},{
                title:'分享标题',
                desc:'分享描述语',
                link:'',
                imgUrl:'',
                trigger: function (res) {
                },
                cancel: function (res) {
                },
                success: function (res) {
                    BDTJ('EVENT', '分享到朋友圈');
                },
                fail: function (res) {
                }
            },options);
    
            window.wxShareConfig = options;
    
            var info = {
                appId: '',
                secret: '',
                url: window.location.href.split("#")[0]
            };
    
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://app.xhgai.com/webapps/weixinservice/weixinservice.php?callback=?",
                data: {"param": JSON.stringify(info)},
                async: false,
                success: function (data) {
                    wx.config({
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow'
                        ]
                    });
                    wx.ready(function () {
                        wx.hideMenuItems({
                            menuList: ['menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });
                        wx.onMenuShareTimeline(window.wxShareConfig);
                        wx.onMenuShareAppMessage(window.wxShareConfig);
                    });
                }
            });
        },

        //进入页面自动播放
        autoPlay(callback){
            if(this.ua.weixin){
                document.addEventListener("WeixinJSBridgeReady", function () { 
                    callback && callback();
                }, false); 
            }else{
                callback && callback();
            }
        },

        //文本框失去焦点后回弹
        afterInput(){
            window.scrollSmoothTo = (position)=>{
                if (!window.requestAnimationFrame) {
                    window.requestAnimationFrame = (callback, element) =>{
                        return setTimeout(callback, 17);
                    };
                }
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var step = ()=>{
                    var distance = position - scrollTop;
                    scrollTop = scrollTop + distance / 5;
                    if (Math.abs(distance) < 1) {
                        window.scrollTo(0, position);
                    } else {
                        window.scrollTo(0, scrollTop);
                        requestAnimationFrame(step);
                    }
                };
                step();
            };
            window.screenTop = 0
            $('body')
            .on('focus', 'input,textarea', function(){
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                window.screenTop = scrollTop;
            })
            .on('blur', 'input,textarea', function(){
                window.scrollSmoothTo(window.screenTop);
            })
        },
        music(id, videoId){
            id = !id?'music':id;
            $('#'+id).click(function(){
                $(this).toggleClass('playing');
                if(videoId){
                    var v = document.getElementById(videoId);
                    if(v.paused) v.play();
                    else v.pause();
                }
            })
        },
        //ajax
        remote(a){
            var options = $.extend({
                type:'POST',
                dataType:'json',
                success(res){},
                error(){},
            },a);

            options.noLayer = a.layer === false;

            options.success  = (res)=>{
                if(!options.noLayer) layer.closeAll();
                if(res.code == 0){
                    a.success&&a.success(res.data);
                }else{
                    // layer.info(res.msg);
                    a.error&&a.error(res)
                }
            }
            options.error = (res)=>{
                layer.info('网络异常，请稍后重试')
            }

            if(!options.noLayer) layer.loading();
            return $.ajax(options);
        }

    }
    
    window.hocodo = hocodo;
})(jQuery);
