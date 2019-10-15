$(function () {
    var id = window.location.href.split('?')[1];
    // console.log(id);

    // 主动触发一次按钮函数 
    btn_search();
    // 按钮事件
    $('.search_btn').click(function(){
        btn_search();
    })

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




    
    // 搜索框按钮事件----------------封装
    function btn_search(){
        $.ajax({
            url:'http://localhost:8080/api/v1/index/search',
            type:'get',
            dataType:'json',
            data:{
                key:$('.search_txt').val(),
                page:1,
                perpage:10
            },
            success: function(backData){
                console.log(backData);
                $('.com_news_list').html(template('LatestNews',backData));
            }
        });
    }

});