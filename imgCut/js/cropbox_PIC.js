(function () {

    $.cropbox_PIC = {
        "init": function () {
            var avator_src = "/images/demo.jpg"; //设置默认显示图片
            var options = {
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: avator_src
            }
            var cropper = $('.imageBox').cropbox(options);
            $('#upload-file').on('change', function () {
                var reader = new FileReader();
                reader.onload = function (e) {
                    options.imgSrc = e.target.result;
                    cropper = $('.imageBox').cropbox(options);
                }
                reader.readAsDataURL(this.files[0]);
                this.files = [];
            })
            $('#btnCrop').on('click', function () {
                $('.cropped').show();
                var img = cropper.getDataURL();
                $('.cropped').html('');
                $('.cropped').append('<img id="upload_img" src="' + img + '" align="absmiddle" style="width:64px;margin-top:4px;border-radius:64px;box-shadow:0px 0px 12px #7E7E7E;" ><p>64px*64px</p>');
                $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:128px;margin-top:4px;border-radius:128px;box-shadow:0px 0px 12px #7E7E7E;"><p>128px*128px</p>');
                $('.cropped').append('<img src="' + img + '" align="absmiddle" style="width:180px;margin-top:4px;border-radius:180px;box-shadow:0px 0px 12px #7E7E7E;"><p>180px*180px</p>');

            })
            $('#btnZoomIn').on('click', function () {
                cropper.zoomIn();
            })
            $('#btnZoomOut').on('click', function () {
                cropper.zoomOut();
            })

            $('#upload').on('click', function () {
                alert(cropper.getDataURL());
                //                $.ajax({
                //                    type: "POST",
                //                    url: "/lib/webupload/php/controller.php?action=uploadavatorcut",
                //                    data: {
                //                        saveaction: 'b.member.member_changeimg',
                //                        file: cropper.getDataURL()
                //                    },
                //                    cache: false,
                //                    success: function (data) {
                //                        window.location.href = "/wap/personalCenter/personalCenter_setting.html";
                //                    },
                //                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                //                        alert("上传失败，请检查网络后重试");
                //                    }
                //                });
            })
        },






    }

})(jQuery);