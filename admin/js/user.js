$(function(){
    //1.页面一加载：ajax请求个人详情信息，渲染页面
    $.ajax({
        url:BigNew.user_detail,
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            $('#inputEmail1').val(backData.data.username);
            $('#inputEmail2').val(backData.data.nickname);
            $('#inputEmail3').val(backData.data.email);
            $('.user_pic').attr('src',backData.data.userPic)
            $('#inputEmail4').val(backData.data.password);
        }
    });

    //2.文件预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    //3.编辑个人信息(fromdata上传文件)
    $('.btn-edit').on('click',function(e){
        //禁用表单默认提交事件
        e.preventDefault();
        //创建FormData对象：参数是表单dom对象
        var fd = new FormData($('#form')[0]);
        $.ajax({
            url:BigNew.user_edit,
            type:'post',
            dataType:'json',
            data:fd,
            contentType: false,
            processData: false,
            success: function(backData){
                alert('修改成功');
                // console.log(backData);
                window.parent.location.reload();
            }
        });
    });
})