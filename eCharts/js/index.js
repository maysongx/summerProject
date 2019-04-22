(function ($) {
    $.index = {
        xData: [],
        yData: [],
        init: function () {
            $.index.xData = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            $.index.yData = ['31', '28', '31', '30', '31', '30', '30', '30', '31', '31', '30', '31'];
            $.index.initEChart();
        },
        initEChart: function () {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('eChartTableShow'));
            // 指定图表的配置项和数据
            var option = {
                //标题组件,包含主题和副标题
                title: {
                    // show:true,//是否显示标题 默认是显示
                    text: '主标题', //主标题文本
                    //link:'http://echarts.baidu.com/option.html#title',//主标题文本超链接
                    //target:"blank",//指定窗口打开主标题超链接  默认新窗口打开
                    //主标题样式设置
                    textStyle: {
                        color: "red",
                        fontSize: 20,
                        align: "center"
                    },
                    subtext: "副标题",//副标题文本
                    //sublink: "http://echarts.baidu.com/option.html#title",//副标题文本超链接
                    //subtarget: "blank",//指定窗口打开副标题超链接  默认新窗口打开
                    //副标题样式设置
                    subtextStyle: {
                        fontSize: 14,
                        align: "center",
                    },
                    padding: [10, 2, 10, 2], //标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距
                    itemGap: 6, //主副标题之间的间距。

                    left: 0,//grid 组件离容器左侧的距离
                    top: 0,//grid 组件离容器上侧的距离
                    // right:0,//grid 组件离容器右侧的距离
                    // bottom:0,//grid 组件离容器底部的距离
                    // backgroundColor:"red",//标题背景色，默认透明
                    // borderColor,borderWidth,borderRadius,shadowBlur,shadowColor,shadowOffsetX,shadowOffsetY
                },
                //提示框组件
                tooltip: {
                    show: false, //是否显示提示框组件，包括提示框浮层和 axisPointer
                    // trigger: 'axis',
                    // axisPointer: {  //坐标轴指示器是指示坐标轴当前刻度的工具
                    //     type: 'cross'
                    // },
                    //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置 通过数组表示提示框浮层的位置，支持数字设置绝对位置，百分比设置相对位置
                    // position: function (pos, params, dom, rect, size) {
                    //     // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                    //     var obj = {top: 60};
                    //    // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                    //     return obj;
                    // },
                    //相对于容器左侧 10px, 上侧 10 px
                    position: [10, 10],
                    //提示框浮层内容格式器，支持字符串模板 和 回调函数  两种形式
                    formatter: '{b0}: {c0}',
                    //triggerOn:'click', //提示框触发的条件  默认是同时鼠标移动和点击时触发
                    //enterable: true,//鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
                    confine: true, //是否将 tooltip 框限制在图表的区域内 当图表外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用
                    //backgroundColor,borderColor,borderWidth,padding,textStyle,extraCssText

                },
                //图例组件 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                legend: {
                    ////plain'：普通图例(默认)；scroll：可滚动翻页的图例。当图例数量较多时可以使用。
                    type: 'plain',
                    show: true,//是否显示图例 默认是显示
                    //left,top,right,bottom  图例的位置
                    // data[i]图例的数据数组.数组项通常为一个字符串，每一项代表一个系列的 name
                    //如果 data 没有被指定，会自动从当前系列中获取如果 data 没有被指定，会自动从当前系列中获取
                    data: [
                        {
                            name: '销量1',
                            // 强制设置图形为圆。
                            icon: 'rect',
                            // 设置文本为红色
                            textStyle: {
                                color: 'red'
                            }
                        }
                    ],
                    //图例列表的布局朝向  横向（horizontal默认） 纵向（vertical）
                    orient: 'horizontal',
                    align: 'left',  //图例标记和文本的对齐。默认自动 可选值：auto left right
                    //用来格式化图例文本，支持字符串模板和回调函数两种形式。
                    // 使用字符串模板，模板变量为图例名称 {name}
                    //formatter: '{name}',
                    //使用回调函数
                    formatter: function (name) {
                        return name;
                    },
                    //图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
                    //除此之外也可以设成 'single' 或者 'multiple' 使用单选或者多选模式。
                    selectedMode: 'single',
                    //inactiveColor 图例关闭时的颜色
                    //selected图例选中状态表
                    // selected: {
                    //     // 选中'系列1'
                    //     '系列1': true,
                    //     // 不选中'系列2'
                    //     '系列2': false
                    // }
                    //tooltip--图例的 tooltip 配置，配置项同 tooltip。默认不显示，可以在 legend 文字很多的时候对文字做裁剪并且开启 tooltip
                    //width,height,padding,textStyle,backgroundColor ,borderColor ，borderWidth ，borderRadius ，shadowBlur
                },
                //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
                grid: {
                    show: true, //是否显示网格，默认不显示
                    containLabel: false,//grid 区域是否包含坐标轴的刻度标签。
                },
                //直角坐标系 grid 中的 x 轴
                xAxis: {
                    //show: true,//是否显示x轴的数据（默认显示）
                    //gridIndex: 0,//x 轴所在的 grid 的索引，默认位于第一个 grid。
                    //position: 'bottom', //x 轴的位置 默认 grid 中的第一个 x 轴在 grid 的下方（'bottom'），第二个 x 轴视第一个 x 轴的位置放在另一侧
                    // value：数值轴，适用于连续数据
                    // category 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                    // time 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                    //log' 对数轴。适用于对数数据，默认是类目型
                    type: 'category',//坐标轴类型
                    name: '月份',//坐标轴的名称
                    //nameLocation: 'end',//坐标轴名称显示位置,默认是end 可选（start middle center end）
                    //min：坐标轴刻度最小值,可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度 ；不设置时会自动计算最小值保证坐标轴刻度的均匀分布
                    //silent:true, //坐标轴是否是静态无法交互 默认是false
                    //triggerEvent : 坐标轴的标签是否响应和触发鼠标事件，默认不响应。
                    // axisTick: {
                    //     alignWithLabel: true,
                    //     inside: false,//坐标轴刻度是否朝内，默认朝外
                    // },
                    //data类目数据，在类目轴（type: 'category'）中有效。
                    //如果没有设置 type，但是设置了 axis.data，则认为 type 是 'category'。
                    //如果设置了 type 是 'category'，但没有设置 axis.data，则 axis.data 的内容会自动从 series.data 中获取，这会比较方便。
                    // 不过注意，axis.data 指明的是 'category' 轴的取值范围。如果不指定而是从 series.data 中获取，那么只能获取到 series.data 中出现的值。比如说，假如 series.data 为空时，就什么也获取不到。
                    data: $.index.xData

                },
                //系列列表。每个系列通过 type 决定自己的图表类型
                yAxis: {
                    name: '天数',//坐标轴的名称
                },

                series: [{
                    name: '销量1',
                    //type取值：line=折线/面积图 bar=柱状/条形图 pie=饼图等等
                    type: 'bar',
                    data: $.index.yData
                }],
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {},
                        dataView: {
                            readOnly: false
                        },
                        magicType: {
                            type: ['line', 'bar']
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    }
})(jQuery);