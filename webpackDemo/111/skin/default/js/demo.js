(function ($) {
    $.demo = {
        charLessonChar: [],
        charLessonLesson: [],
        init: function () {
            // //加载select下拉框
            // var optionsList = '';
            // $.each($.demo.charLessonLesson, function (index, perObj) {
            //     optionsList += '<option value=' + index + '>' + perObj + '</option>';
            // });
            // $dom.find(' .selectOption').html(optionsList)


            //初始化charlesson.json
            $.demo.initCharLesson();
            //textarea内容发生变化事件

            $('.infoList .dqd-sentence-facet-sgp15 .info1 textarea').bind('input propertychange', 'textarea', function (e) {
                e.stopPropagation();
                var $dom = $(this).parents('.dqd-sentence-facet-sgp15');
                var thisTextareaValue = $dom.find('.info1 textarea').val();
                const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]?/gu;
                var thisTextareaValueArr = thisTextareaValue.match(REGEX_CHINESE);
                var thisTextareaValueArr = '鸭小鹿挂盛炎竟'.match(REGEX_CHINESE);
                var lessonCharCount = {};
                $.each(thisTextareaValueArr, function (index, char) {
                    if ($.demo.charLessonChar[char]) {
                        var lessonSn = $.demo.charLessonChar[char].lesson_sn;
                        var character = $.demo.charLessonChar[char].character;
                        if (lessonCharCount[lessonSn] === undefined) {
                            lessonCharCount[lessonSn] = [];
                        }
                        if (lessonCharCount[lessonSn].indexOf(char) == -1) {
                            lessonCharCount[lessonSn].push(char);
                        }
                    } else {
                        if (lessonCharCount[10000000] === undefined) {
                            lessonCharCount[10000000] = [];
                        }
                        if (lessonCharCount[10000000].indexOf(char) == -1) {
                            lessonCharCount[10000000].push(char);
                        }
                    }
                });

                var htmls = '';
                //加载select下拉框
                var optionsList = '';
                $.each($.demo.charLessonLesson, function (index, perObj) {
                    optionsList += '<option value=' + index + '>' + perObj + '</option>';
                });

                // 如果已经存在，那么就不重新加载
                // if ($dom.find('.info2 .selectInfo').length == 0) {
                //     htmls += '<div class="selectInfo">\n' +
                //         '<select name="selectOption" class="selectOption">' + optionsList + '</select>\n' +
                //         '</div>';
                // }else{
                //
                // }

                if ($dom.find('.info2 .selectInfo .selectOption option').length == 0) {
                    htmls += '<div class="selectInfo">\n' +
                        '<select name="selectOption" class="selectOption">' + optionsList + '</select>\n' +
                        '</div>';
                }else{

                }

                var contInfoHtmls = '';
                $.each(lessonCharCount, function (lessonSn, perObj) {
                    var titledesc = '';
                    $.each($.demo.charLessonLesson, function (index, title) {
                        if (lessonSn == index) {
                            titledesc = title;
                        }
                    });
                    contInfoHtmls += '<div lesson_sn=' + perObj.lesson_sn + ' class="perInfo text-center">\n' +
                        '                        <div class="title1">' + titledesc + '</div>\n' +
                        '                        <div class="cont1">' + perObj + '</div>\n' +
                        '                    </div>';
                });


                htmls += '<div class="contInfo">' + contInfoHtmls + '</div>';
                $dom.find('.info2').html(htmls);
            })


        },
//初始化charlesson.json
        initCharLesson: function () {
            var data = {};
            data.url = 'http://dao.sg:3680/daoqidao65/api/corpusfacet/syllabus/2297651/charlesson.json';
            $.demo.AjaxRequest(data, function (data) {
                $.demo.charLessonChar = data.char;
                $.demo.charLessonLesson = data.lesson;
            })
        }
        ,
        AjaxRequest: function (data, callback, async, dateType, type) {
            var async1 = false;
            var dateType1 = "json";
            var type1 = "post";
            if (async && async == true) {
                async1 = async;
            }
            if (dateType && dateType.length > 0) {
                dateType1 = dateType;
            }
            if (type && type.length > 0) {
                type1 = type
            }
            $.ajax({
                async: async1,
                timeout: "10000",
                url: data.url,
                data: data,
                type: type1,
                cache: false,
                dataType: dateType1,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (data) {
                    callback(data);
                },
                error: function (data) {
                }
            });
        }
        ,
        reverseObject: function (object) {
            var newObject = {};
            var keys = [];
            for (var key in object) {
                keys.push(key);
            }
            for (var i = keys.length - 1; i >= 0; i--) {

                var value = object[keys[i]];
                newObject[keys[i]] = value;
            }

            return newObject;
        }
    }
})
(jQuery);