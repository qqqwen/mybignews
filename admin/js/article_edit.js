$(function () {
    var id = window.location.href.split('=')[1];
    // console.log(id);

    // 遍历表单文章类别
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $('.category').html(template('Category', backData))
        }
    });

    // 遍历表单，自动渲染内容
    $.ajax({
        url: BigNew.article_search,
        type: 'get',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
            // console.log(backData);
            $('#inputTitle').val(backData.data.title);
            $('.article_cover').attr('src', backData.data.cover);
            $('select.category').val(backData.data.categoryId);
            $('#testico').val(backData.data.date);
            /* 
                细节： tinymce这个插件比较复杂，加载需要时间
                如果ajax请求极快，有可能数据请求完成但是插件内部没有加载完毕。导致无法展示数据
                解决 ：
                    （1）添加一个loading动画
                    （2）开启定时延时加载
                */
            setTimeout(function () {
                tinymce.activeEditor.setContent(backData.data.content);
            }, 500);
        }
    });

    // 文件预览
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
    $('.btn-edit').click(function (e) {
        e.preventDefault();
        articleEdit('已发布');
    });

    // 草稿按钮
    $('.btn-draft').click(function (e) {
        e.preventDefault();
        articleEdit('草稿');
    });

    // 封装一个保存的函数
    function articleEdit(state) {
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        // 自动获取的表单内容不够，要自行添加
        fd.append('id', id);
        fd.append('date', $('#testico').val())
        fd.append('content', tinymce.activeEditor.getContent())
        fd.append('state', state)
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('保存成功');
                    window.history.back();
                };
            }
        });
    };

    
});