(function () {

    $.photoClip_PIC = {
        "init": function () {

            $("#clipArea").photoClip({
                width: 200,
                height: 200,
                file: "#file",
                view: "#reviewImgArea",
                ok: "#reviewImg",
                outputType: 'jpg',
                loadStart: function () {
                    //alert("照片读取中");
                },
                loadComplete: function () {
                    //alert("照片读取完成");
                },
                clipFinish: function (dataURL) {
                    //alert('裁剪完成');
                    $("#reviewImgArea").attr("clipdataURL", dataURL);
                    $("#reviewImgArea").show();
                }
            });

            //上传头像
            $("#uploadSelectedImg").click(function () {
                if ($("#file").val() == "") {
                    $.public.showMsg('请选择要上传的图片');
                    return;
                }
                var revirewImg = $("#reviewImgArea").attr("clipdataURL");
                var imgUrl = "";
                if (revirewImg.length > 0) {
                    imgUrl = revirewImg;
                } else {
                    imgUrl = $("#clipArea").find("img").attr("src");
                }
                $.photoClip_PIC.funUploadFile(imgUrl);
            });
        },



        //上传图片
        "funUploadFile": function (imgUrl) {
            alert(imgUrl)
                //            $.ajax({
                //                type: "POST",
                //                url: "/lib/webupload/php/controller.php?action=uploadavatorcut",
                //                data: {
                //                    saveaction: 'b.member.member_changeimg',
                //                    file: imgUrl
                //                },
                //                cache: false,
                //                success: function (data) {
                //                    window.location.href = "/wap/personalCenter/personalCenter_setting.html";
                //                },
                //                error: function (XMLHttpRequest, textStatus, errorThrown) {
                //                    alert("上传失败，请检查网络后重试");
                //                }
                //            });
        }





    }

})(jQuery);