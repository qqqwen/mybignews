$(function () {
    // 遍历表单文章类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $('.category').html(template('Category', backData))
        }
    });

    // 图片文件预览
    //1.给file表单元素注册onchange事件
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });


    // 保存按钮
    $('.btn-release').click(function (e) {
        e.preventDefault();
        articlePublish('已发布');
    });

    // 草稿按钮
    $('.btn-draft').click(function (e) {
        e.preventDefault();
        articlePublish('草稿');
    });

    // 封装一个保存的函数
    function articlePublish(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 自动获取的表单内容不够，要自行添加
        fd.append('date', $('#testico').val())
        fd.append('content', tinymce.activeEditor.getContent())
        fd.append('state', state)
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                // console.log(backData);
                if (backData.code == 200) {
                    alert('发布成功');
                        /* 
                        $(选择器,DOM) ： 默认第二个参数就是当前页面的DOM树
                        $(选择器,window.parent.document) : 选择父窗口的元素
                         */
                        // $('.level02>li:eq(0)', window.parent.document).addClass('active').siblings().removeClass('active');
                        // window.location.href = '../article_list.html';
                        // $('.level02>li:eq(0)>a', window.parent.document).trigger();

                        window.history.back();

                } else {
                    alert('发布失败');
                };
            }
        });
    };
})