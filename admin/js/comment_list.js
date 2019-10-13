$(function () {

    $.ajax({
        url: BigNew.comment_list,
        type: 'get',
        dataType: 'json',
        data: {
            page: 1,
            perpage: 10
        },
        success: function (backData) {
            console.log(backData);
            $('.table>tbody').html(template('CommentList', backData));
            loadPagination(backData.data.totalPage);
        }
    });


    /**
    * @description:加载分页插件
    * @param {type} 
    * @return: totalPage : 总页数
    * @return: startPage : 起始页数
    */
    function loadPagination(totalPage) {
        //初始化分页插件
        //(1)先销毁已经存在的插件
        $('#pagination').twbsPagination('destroy');
        // 清除原分页
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            startPage: 1,
            visiblePages: 6,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                // $('#page-content').text('Page ' + page);
                // console.log(page);
                getArticleList(page);
            }
        });
    };



    // 点击页码切换网页的封装函数
    /* 3.分页插件 : 点击页码展示对应页码数据 */
    /**
    * @description:根据页码请求文章列表数据
    * @param {type} currentPage : 需要请求的页数
    * @param {type} flag : 布尔类型 true: 需要重新加载分页插件  false：不需要
    * @return: 
    */
    function getArticleList(currentPage) {
        $.ajax({
            url: BigNew.comment_list,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 10//每页返回10条数据
            },
            success: function (backData) {
                // console.log(backData);
                $('.table>tbody').html(template('CommentList', backData));
            }
        });
    };



    // 评论审核通过
    $('.table>tbody').on('click', '.btn-pass', function () {
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            dataType: 'json',
            data: { id: id },
            success: function (backData) {
                console.log(backData);
                if(backData.code == 200){
                    alert('审批通过成功');
                    window.location.reload();
                }else{
                    alert('失败了');
                };
            }
        });
    });


    // 评论审核拒绝
    $('.table>tbody').on('click', '.btn-reject', function () {
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            url:BigNew.comment_reject,
            type:'post',
            dataType:'json',
            data: { id: id },
            success: function(backData){
                console.log(backData);
                if(backData.code == 200){
                    alert('拒绝成功');
                    window.location.reload();
                }else{
                    alert('拒绝失败？');
                };
            }
        });
    });


    // 评论删除
    $('.table>tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            url:BigNew.comment_delete,
            type:'post',
            dataType:'json',
            data: { id: id },
            success: function(backData){
                console.log(backData);
                if(backData.code == 200){
                    alert('删除成功');
                    window.location.reload();
                }else{
                    alert('删除失败？');
                };
            }
        });
    });




});