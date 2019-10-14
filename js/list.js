$(function () {
    var id = window.location.href.split('?')[1];
    // console.log(id);
    
    // 1.全部分类渲染
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.level_two').html(template('ArticleCategoryAll', backData));
            $('.left_menu').html(template('ArticleCategoryShow', backData));
        }
    });

    // 2。文章热门排行
    $.ajax({
        url:'http://localhost:8080/api/v1/index/rank',
        type:'get',
        dataType:'json',
        success: function(backData){
            for(var i = 0 ; i < backData.data.length; i++){
                backData.data[i].index = i+1;
            };
            // console.log(backData);
            $('.content_list').html(template('HotArticle',backData));
            $('.content_list>li:eq(0)>span').addClass('first');
            $('.content_list>li:eq(1)>span').addClass('second');
            $('.content_list>li:eq(2)>span').addClass('third');
        }
    });

    // 3.最新评论
    $.ajax({
        url:'http://localhost:8080/api/v1/index/latest_comment',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            for(var i = 0 ; i < backData.data.length; i++){
                backData.data[i].FirstWord = backData.data[i].author[0];
                backData.data[i].Mounth = backData.data[i].date.split('-')[1];
                backData.data[i].Day = backData.data[i].date.split('-')[2];
                var ago = 9 - backData.data[i].date.split('-')[1];
                backData.data[i].ago = ago;
            };

            $('.comment_list').html(template('LatestComment',backData));
        }
    });

    // 4.焦点关注
    $.ajax({
        url:'http://localhost:8080/api/v1/index/attention',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            $('.guanzhu_list').html(template('Focus',backData));
        }
    });



    // 5.内容列表
    $.ajax({
        url:'http://localhost:8080/api/v1/index/search',
        type:'get',
        dataType:'json',
        data:{type:id},
        success: function(backData){
            // console.log(backData);
            $('.setfr').html(template('LatestNews',backData));
        }
    });


    $('#pagination').twbsPagination({
        totalPages: 20,
        startPage: 1,
        visiblePages: 6,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        onPageClick: function (event, page) {
            // $('#page-content').text('Page ' + page);
            // console.log(page);
            // getArticleList(page);
        }
    });

});