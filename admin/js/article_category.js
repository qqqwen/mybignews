$(function () {
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.category_table>tbody').html(template('Mytemplate', backData));
        }
    });


    //模态框显示事件
    $('#modal').on('shown.bs.modal', function (e) {
        if (e.relatedTarget == $('#xinzengfenlei')[0]) {
            // 获取点击的标签
            // console.log(e.relatedTarget);

            //新增按钮业务逻辑
            $('.modal-footer>.btn-primary').text('新增');
        } else {
            //编辑按钮业务逻辑
            $('.modal-footer>.btn-primary').text('编辑');
            //取出编辑按钮所在的tr的name值赋值给模态框
            $('#recipient-name').val($(e.relatedTarget).parent().prev().prev().text());
            //取出编辑按钮所在的tr的slug值赋值给模态框
            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            //取出编辑按钮的data-id 赋值给 确认按钮的 data-id (用于ajax请求)
            $('.btn-confirm').attr('data-id', $(e.relatedTarget).attr('data-id'));

        }
    });

    //取消按钮点击事件
    $('.btn-cancel').click(function () {
        //隐藏模态框
        // $('#modal').modal('hide');
        //清空表单 DOM对象.reset()
        $('.modal-body>form')[0].reset();
    });


    //确认按钮点击事件
    $('.btn-confirm').on('click', function () {
        if ($('.btn-confirm').text() == '新增') {
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val()
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        alert('新增成功');
                        window.location.reload();
                    } else {
                        alert(backData.msg);
                    };
                }
            });
        } else {
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                    id: $(this).attr('data-id')
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        alert('编辑成功');
                        window.location.reload();
                    } else {
                        alert(backData.msg);
                    };
                }
            });
        };
    });


    //4.删除按钮 ：这个按钮是动态添加的，所以需要注册委托事件
    //注意点：注册委托事件的父元素不能是动态添加的，否则无法委托
    $('.category_table>tbody').on('click', '.btn-delete', function () {
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: { id: $(this).attr('data-id') },
            success: function (backData) {
                // console.log(backData);
                if(backData.code == 204){
                    alert('删除成功')
                }else{
                    alert(backData.msg)
                };
            }
        });
    })


})