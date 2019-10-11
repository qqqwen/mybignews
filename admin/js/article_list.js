$(function () {
    // 文章列表。所有分类下拉
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('#selCategory').html(template('selClassify', backData));
        }
    });

    // 点击检索文章类别及渲染
    $('#btnSearch').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                perpage: 10,//每页返回10条数据
                type: $('#selCategory').val(),
                state: $('#selStatus').val()
            },
            success: function (backData) {
                // console.log(backData);
                $('.art_list>tbody').html(template('art_list', backData));
                // 分页
                $('#pagination').twbsPagination('destroy');
                // 清除原分页
                $('#pagination').twbsPagination({
                    totalPages: backData.data.totalPage,
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
            }
        });
    });

    // 主动触发筛选按钮
    $('#btnSearch').trigger('click');

    // 点击页码切换网页的封装函数
    function getArticleList(page) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                page: page,
                perpage: 10,//每页返回10条数据
                type: $('#selCategory').val(),
                state: $('#selStatus').val()
            },
            success: function (backData) {
                // console.log(backData);
                $('.art_list>tbody').html(template('art_list', backData));
            }
        });
    }
})