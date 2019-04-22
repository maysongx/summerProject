(function ($) {
    $.index = {
        init: function () {
            //日期选择器
            $("#date").datepicker();
            //滚动条
            $(".SliderClass").slider();
            //折叠面板
            $("#accordion").accordion({
                collapsible: true,
                event: "click hoverintent"
            });
            //拖动
            $("#draggable").draggable({
                scroll: true, //自动滚动文档
                axis: "y", //只可以垂直滚动
                //axis: "x",  //只可以水平滚动
            });
            //tabs（标签页）
            $("#tabs").tabs();

            //实现购物车的功能
            //折叠面板
            $("#catalog").accordion();
            //拖拽
            $("#catalog li").draggable({
                appendTo: "body",
                helper: "clone"
            });
            $("#cart ol").droppable({
                activeClass: "ui-state-default",
                hoverClass: "ui-state-hover",
                accept: ":not(.ui-sortable-helper)",
                drop: function (event, ui) {
                    $(this).find(".placeholder").remove();
                    $("<li></li>").text(ui.draggable.text()).appendTo(this);
                }
            }).sortable({
                items: "li:not(.placeholder)",
                sort: function () {
                    // 获取由 droppable 与 sortable 交互而加入的条目
                    // 使用 connectWithSortable 可以解决这个问题，但不允许您自定义 active/hoverClass 选项
                    $(this).removeClass("ui-state-default");
                }
            });

            //缩放
            $("#resizable").resizable({
                animate: true,
                /*使用 animate 选项（布尔值）使缩放行为动画化。当该选项设置为 true 时，拖拽轮廓到所需的位置，元素会在拖拽停止时以动画形式调整到该尺寸*/
                helper: "ui-widget-header" /*通过设置 helper 选项为一个 CSS class，当缩放时只显示元素的轮廓*/
            });
            //限制缩放的区域
            $("#resizaeID").resizable({
                containment: "#FatherID" /*定义缩放区域的边界。使用 containment 选项来指定一个父级的 DOM 元素或一个 jQuery 选择器，比如 'document.'*/
            });
            //选择多个项目
            $("#selectable").selectable();
            //排序设置
            $("#sortable").sortable();
            $("#sortable").disableSelection();
            //自动填充数据
            var availableTags = [
					"ActionScript",
					"AppleScript",
					"Asp",
					"BASIC",
					"C",
					"C++",
					"Clojure",
					"COBOL",
					"ColdFusion",
					"Erlang",
					"Fortran",
					"Groovy",
					"Haskell",
					"Java",
					"JavaScript",
					"Lisp",
					"Perl",
					"PHP",
					"Python",
					"Ruby",
					"Scala",
					"Scheme"
				];
            $("#AutoComplete").autocomplete({
                source: availableTags
            });

            //菜单
            $("#menu").menu();

            //工具提示
            $("#age").tooltip();

        }

    }
})(jQuery);