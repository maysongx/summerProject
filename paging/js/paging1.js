//文章
var pagingSet1 = {
    curObj: 1,
    curPage: 1,
    totalPage: 0,
    perPage: 10
};

(function ($) {
    $.paging = {
        init: function () {
            //初始化分页点击事件
            $.paging.initPage($(".article .paging"),pagingSet1);
            //文章列表   
            $.paging.articleInfo(pagingSet1);
        },

        //初始化列表
        articleInfo: function (pagingSet1) {
            var pagingSet = pagingSet1;
            //分页器对象
            var pagingHtmlObj = $(".article .paging");
            var data = {};
            data.url = "";
            data.sSorts = "date_create,asc";
            //分页设置
            data.iDisplayStart = (pagingSet.perPage) * (pagingSet.curPage - 1);
            data.iDisplayLength = pagingSet.perPage;
            //分页设置

            $.public.AjaxRequest(data, function (data) {
                if (data.success && data) {
                    if (data.data.aaData.length > 0) {
                        //分页设置
                        var totalRecords = data.data.iTotalDisplayRecords;
                        var total_page = Math.ceil(totalRecords / pagingSet.perPage);
                        if (total_page == "1") {
                            pagingHtmlObj.hide();
                        } else {
                            pagingHtmlObj.show();
                        }
                        //分页设置
                        var articleDataObj = data.data.aaData;
                        var htmls = '';
                        for (var i in articleDataObj) {
                            var perArticleInfo = articleDataObj[i];

                            htmls += '<div class="perArticle">' +
                                '<div class="title">' + perArticleInfo.topic + '</div>' +
                                '<div class="summary">' + perArticleInfo.summary + '</div>' +
                                '</div>';
                        }

                        $(".article .list").html(htmls);

                        //分页设置
                        pagingSet.totalPage = total_page;
                        $.paging.initPageNum(pagingHtmlObj, pagingSet);
                        //分页设置
                    } else {
                        pagingHtmlObj.hide();
                        var htmls = '<div class="norecord">' +
                            '<span>暂无数据哦^_^</span>' +
                            '</div>';
                        $(".article ").html(htmls);
                    }
                } else {
                    $.public.showMsg(data.reason);
                }
            }, true, 'json', true);
        },

        //分页开始 $dom 是paging对象
        initPage: function ($dom, pagingSet) {
            $dom.find(".prevpage").click(function () {
                $.paging.turnPage(pagingSet.curPage - 1, pagingSet);
            });
            $dom.find(".nextpage").click(function () {
                $.paging.turnPage(pagingSet.curPage + 1, pagingSet);
            });
            $dom.find(".firstpage").click(function () {
                $.paging.turnPage(1, pagingSet);
            });
            $dom.find(".lastpage").click(function () {
                $.paging.turnPage(pagingSet.totalPage, pagingSet);
            });
            $dom.on("click", ".pagenum .p_icon", function () {
                $.paging.turnPage($(this).text(), pagingSet);
            });
        },
        turnPage: function (page, pagingSet) {
            if (parseInt(page) < 1 || parseInt(page) > parseInt(pagingSet.totalPage)) {
                return;
            } else {
                pagingSet.curPage = parseInt(page);
                //加载列表信息
                var curObj = pagingSet.curObj;
                if (curObj == "1") {
                    $.paging.articleInfo(pagingSet1);
                }
            }
        },
        initPageNum: function ($dom, pagingSet) {
            var $pageNum = $dom.find(".pagenum");
            $pageNum.text("");
            //每页显示的条数
            var iPage = 5;
            var iStartPage = (pagingSet.curPage - iPage) <= 0 ? 1 : (pagingSet.curPage - iPage);
            var iEndPage = (pagingSet.curPage + iPage) > pagingSet.totalPage ? pagingSet.totalPage : (pagingSet.curPage + iPage);
            if (pagingSet.curPage - iStartPage < iPage) {
                iEndPage = iEndPage + iPage - (pagingSet.curPage - iStartPage);
                iEndPage = iEndPage > pagingSet.totalPage ? pagingSet.totalPage : iEndPage;
            }
            if (iEndPage - pagingSet.curPage < iPage) {
                iStartPage = iStartPage - (iPage - (iEndPage - pagingSet.curPage));
                iStartPage = iStartPage < 1 ? 1 : iStartPage;
            }
            for (var i = iStartPage; i <= iEndPage; i++) {
                if (parseInt(pagingSet.curPage) == i) {
                    $pageNum.append("<a class='selected p_icon'>" + i + "</a>");
                } else {
                    $pageNum.append("<a class='p_icon'>" + i + "</a>");
                }
            }
        }
        //分页结束


    }
})(jQuery);