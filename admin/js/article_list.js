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
    // $('#btnSearch').click(function (e) {
    //     e.preventDefault();

    //     $.ajax({
    //         url: BigNew.article_query,
    //         type: 'get',
    //         dataType: 'json',
    //         data: {
    //             page: 1,
    //             perpage: 10,//每页返回10条数据
    //             type: $('#selCategory').val(),
    //             state: $('#selStatus').val()
    //         },
    //         success: function (backData) {
    //             // console.log(backData);
    //             $('.art_list>tbody').html(template('art_list', backData));
    //             // 分页
    //             $('#pagination').twbsPagination('destroy');
    //             // 清除原分页
    //             $('#pagination').twbsPagination({
    //                 totalPages: backData.data.totalPage,
    //                 startPage: 1,
    //                 visiblePages: 6,
    //                 first: '首页',
    //                 prev: '上一页',
    //                 next: '下一页',
    //                 last: '尾页',
    //                 onPageClick: function (event, page) {
    //                     // $('#page-content').text('Page ' + page);
    //                     // console.log(page);
    //                     getArticleList(page);
    //                 }
    //             });
    //         }
    //     });
    // });

    $('#btnSearch').click(function (e) {
        //2.1 阻止默认跳转
        e.preventDefault();
        //2.2 ajax请求
        getArticleList(1, true);
    });

    // 主动触发筛选按钮
    $('#btnSearch').trigger('click');


    /**
    * @description:加载分页插件
    * @param {type} 
    * @return: totalPage : 总页数
    * @return: startPage : 起始页数
    */
    function loadPagination(totalPage, startPage) {
        //初始化分页插件
        //(1)先销毁已经存在的插件
        $('#pagination').twbsPagination('destroy');
        // 清除原分页
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            startPage: startPage,
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
    function getArticleList(currentPage, flag) {
        $.ajax({
            url: BigNew.article_query,
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
                $('.art_list>tbody').html(template('art_list', backData));
                if (flag) {
                    loadPagination(backData.data.totalPage, currentPage);
                };
            }
        });
    };



    /*3.删除文章：
    3.1 给删除按钮注册委托事件（动态添加的元素需要注册动态事件）
    3.2 获取当前点击按钮自定义属性 data-id
    3.3 ajax发送请求
    3.4 响应之后刷新页面 
    */
    $('.art_list>tbody').on('click', '.delete', function () {
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: { id: $(this).attr('data-id') },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 204) {
                    alert('删除成功');
                    window.location.reload();
                };
            }
        });
    });


    /* 点击发布文章，设置左侧导航栏 发布文章 高亮 */
    $('#release_btn').click(function () {
        /* 
        $(选择器,DOM) ： 默认第二个参数就是当前页面的DOM树
        $(选择器,window.parent.document) : 选择父窗口的元素
         */
        $('.level02>li:eq(1)',window.parent.document).addClass('active').siblings().removeClass('active');
    });
})