(function ($) {
  $.index = {
    init: function () {
      //初始化编辑器
      $.index.initEditor('pContent');

      //获取编辑器的内容
      $('.action').find('.getInfo').click(function () {
        var pContent = UE.getEditor("pContent").getContent();
        alert(pContent);
      });

      //清空编辑器的内容
      $('.action').find('.clearInfo').click(function () {
        var editorBox = UE.getEditor('pContent');
        editorBox.setContent('');
      });

      //给编辑器赋值
      $('.action').find('.setValueInfo').click(function () {
        var str='你好，哈哈哈';
        var editorBox = UE.getEditor('pContent');
        editorBox.ready(function () {//编辑器初始化完成再赋值
          editorBox.setContent(str);  //赋值给UEditor
        });
      });

    },

    //编辑器开始
    initEditor: function (ObjectName) {
      var opts = {
        enableAutoSave: true,
        saveInterval: 60000,
        initialFrameHeight: 520,
        autoHeightEnabled: false,
        elementPathEnabled: false,
        retainOnlyLabelPasted: true,
        maximumWords: 20000,
        retainOnlyLabelPasted: true,
        toolbars: [['fullscreen', 'source', 'undo', 'redo', 'bold', 'italic',
          'underline', 'fontborder', 'backcolor', 'fontsize', 'fontfamily', 'paragraph',
          'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify',
          'strikethrough', 'superscript', 'subscript', 'removeformat',
          'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|',
          'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',
          'selectall', 'link', 'unlink', 'emotion', 'help', 'preview',
          'horizontal', 'removeformat', 'mergeright', 'mergedown', 'deleterow', 'deletecol', 'insertparagraphbeforetable', 'inserttitle',
          'insertcode', 'simpleupload', 'insertimage', 'spechars', 'searchreplace'
        ]]
      };
      UE.getEditor(ObjectName, opts);
    },

    validateEditor: {
      editor: function (ObjectName) {
        var n = '#' + ObjectName;
        var $ipt = $(n);
        var editor = UE.getEditor(ObjectName);
        var content = editor.getContent();
        if (content.length > 20000) {
          $.clwenkueditCont.validateEditor.msg($ipt, '内容长度不能超过20000个字符！建议您分多次发布！');
          return false;
        }
        $.clwenkueditCont.validateEditor.msg($ipt);
        return content;
      },
      bLength: function (str) {
        if (!str) {
          return 0;
        }
        var aMatch = str.match(/[^\x00-\xff]/g);
        return (str.length + (!aMatch ? 0 : aMatch.length));
      },
      msg: function ($el, msg) {
        if (msg) {
          $el['addClass']('ipt-error');
          //$el.siblings('.form-ipt-error').html(msg).css('display', 'block');
          $el.next('.form-ipt-error').html(msg).css('display', 'block');
        } else {
          $el['removeClass']('ipt-error');
          //$el.siblings('.form-ipt-error').html('').css('display', 'none');
          $el.next('.form-ipt-error').html('').css('display', 'none');
        }
      }
    },
    //编辑器结束


  }
})(jQuery);