!function (window) {
    var docWidth = 750; //设计图宽度
    var doc = window.document,
      docEl = doc.documentElement;
      var recalc;
    if(docWidth == 870){
      recalc = function() {
        var psW = 870, psH = 1280;
        var bw = docEl.getBoundingClientRect().width, bh = docEl.getBoundingClientRect().height;
        var scale = bh / psH;
        var w = psW * scale;
        document.documentElement.style.fontSize = (w * 100 / psW) + 'px'; 
      };
    }else{
      recalc = function() {
        var clientWidth = docEl.getBoundingClientRect().width;
        document.documentElement.style.fontSize =  Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';
      };
    }
    docEl.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
    if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
      doc.documentElement.classList.add('ios');
      if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
        doc.documentElement.classList.add('hairline');
    }
    if (!doc.addEventListener) return;
    if('orientationchange' in window){
      window.onorientationchange  = function(){
        recalc();
        window.landScape&&window.landScape();
      }
    }
    doc.addEventListener('DOMContentLoaded', function(){
      recalc();
      window.landScape&&window.landScape();
    }, false);
    window.onresize = function(){
      if(hocodo.ua.ios && !window.orientation){
        recalc();
        window.scrollTo(0, 0);
        window.landScape&&window.landScape();
      }
    }
  }(window);
  