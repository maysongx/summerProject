(function ($) {
    $.index = {
        init: function () {

        },
        //从服务器获取数据 填充datatable表格
        datatable: function ($dom) {
            $dom.dataTable({
                "bPaginate": true,  //是否显示分页器
                "sPaginationType": "full_numbers", //分页的类型
                'iDisplayLength': 10,// 每页显示数量
                //定义一个高度,当列表内容超过这个高度时,显示垂直滚动条,支持数字或者css写法.比如::"sScrollY": "300px",
                "bFilter": false,   //是否启动过滤、搜索功能(datatable自定义搜索功能)
                "sSearch": "模糊查询：",
                "bInfo": true,     //左下角信息
                "bAutoWidth": true, //自动宽度
                "bProcessing": true, // 显示进度条
                "bServerSide": true,////是否启动服务器端数据导入 默认是false,必须配合sAjaxSource使用
                "sAjaxSource": '',  //Url服务地址
                "oLanguage": { //语言
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉，未找到记录",
                    "sInfo": "共 _TOTAL_ 条数据，本页显示 _START_ 至 _END_ 条",
                    "sInfoEmpty": "暂无数据！",
                    "sInfoFiltered": "(从总共_MAX_条记录中过滤)",
                    "sProcessing": "数据正在加载中,请稍后。。。",
                    "oPaginate": {
                        "sFirst": "首页",
                        "sPrevious": "上一页",
                        "sNext": "下一页",
                        "sLast": "尾页"
                    }
                },
                "aLengthMenu": [10, 20, 30, 40, 50, 100], // 定义每页显示数据数量(bLengthChange默认为true)
                "sDom": 'rt<"bottom"i<"block"><"block"><"block">lp><"clear">',
                "aaSorting": [[1, 'asc']],//默认的排序方式，第2列，升序排列asc
                "ordering": false, //禁止排序
                "aoColumns": [
                    //mData是从ajax数据源获取的数字段
                    {"sTitle": "客服人员", "sWidth": "70px", "sClass": "center", "mData": "username", "bSortable": false},
                    {"sTitle": "总工单数", "sWidth": "70px", "sClass": "center", "mData": "total", "bSortable": false}
                ],
                //从form获取参数
                "fnServerParams": function (aoData) {
                    var mappings = {};
                    var sortnum = 0;
                    var sortcol = {};
                    var sortdir = {};
                    $.each(aoData, function (idx, value) {
                        if (value.name.indexOf("mDataProp_") === 0) {
                            mappings[value.name] = value.value;
                        }
                        if (value.name.indexOf("iSortCol_") === 0) {
                            sortnum++;
                            sortcol[value.name] = value.value;
                        }
                        if (value.name.indexOf("sSortDir_") === 0) {
                            sortdir[value.name] = value.value;
                        }
                    });
                    var sorts = [];
                    for (var i = 0; i < sortnum; i++) {
                        sorts[i] = mappings["mDataProp_" + sortcol["iSortCol_" + i]] + "," + sortdir["sSortDir_" + i];
                    }
                    if (sorts.length > 0) {
                        $.merge(aoData, [{"name": "sSorts", "value": sorts.join(";")}]);
                    }
                    $fmarray = $("#leftQueryForm").serializeArray();
                    $.merge(aoData, $fmarray);
                },
                //fnServerData这个是结合服务器模式的回调函数，用来处理服务器返回过来的数据
                "fnServerData": function (sSource, aoData, fnCallBack) {
                    $.ajax({
                        type: "post",
                        dataType: "json",
                        url: sSource,
                        data: aoData,
                        cache: false,
                        success: function (result, textStatus, jqXHR) {
                            if (result.success) {
                                fnCallBack(result.data);
                            }
                            else {
                                $.globaloption.alert(result.reason);
                            }
                        }
                    });
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $nRow = $(nRow);
                    $nRow.data(aData);
                    //给单个tr传参
                    $nRow.attr({
                        userid: aData.userid,
                        name: aData.name,
                        type: $('#lefttype').find("option:selected").val(),
                        time: $('#lefttime').val()
                    });

                    //tr双击事件
                    $nRow.unbind("dblclick").dblclick(function (e) {
                    });
                    //tr单击事件
                    $nRow.unbind("click").click(function (e) {

                    });
                },
                "fnDrawCallback": function (oSettings) {
                    $.globaloption.buildperms();
                },
                "fnInitComplete": function (oSettings, json) {

                }
            });
        }

    }
})
(jQuery);


