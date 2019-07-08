(function ($) {
    $.index = {
        "init": function () {

        }

    }
})(jQuery);


var reg = location.search.match(/ts=([^&]*)/),
    ts = reg && reg[1] || 'scroll',
    a = new pageSwitch('pages', {
        duration: 1000, //页面过渡时间
        start: 0, //默认显示页面
        direction: 1, //页面切换方向，0横向，1纵向
        loop: false, //是否循环切换
        ease: 'ease', //过渡曲线动画
        transition: ts, //转场方式
        freeze: false, //是否冻结页面（冻结后不可响应用户操作，可以通过 `.freeze(false)` 方法来解冻）
        mouse: true, //是否启用鼠标拖拽
        mousewheel: true, //是否启用鼠标滚轮切换
        arrowkey: true // 是否启用键盘方向切换
    });

document.getElementById('tssel').onchange = function () {
    location.href = '?ts=' + this.value;
}

var options = document.getElementById('tssel').options,
    i = 0,
    op;
while (op = options[i++]) {
    if (op.value === ts) {
        op.selected = true;
        break;
    }
}

function colorRand() {
    return parseInt(Math.random() * 255);
}

function createPage() {
    var div = document.createElement('div');
    div.style.backgroundColor = 'rgb(' + colorRand() + ',' + colorRand() + ',' + colorRand() + ')';
    return div;
}