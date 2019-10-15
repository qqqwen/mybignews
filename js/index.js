$(function(){
    // 1首页焦点图实现
    $.ajax({
        url:'http://localhost:8080/api/v1/index/search',
        type:'get',
        dataType:'json',
        data:{
            page:1,
            perpage:5
        },
        success: function(backData){
            // console.log(backData);
            $('.focus_list').html(template('hotPic',backData));
            $('.focus_list>li').eq(0).addClass('first');
        }
    });


    // 2.全部分类渲染
    $.ajax({
        url:'http://localhost:8080/api/v1/index/category',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            $('.level_two').html(template('ArticleCategoryAll',backData));
            $('.left_menu').html(template('ArticleCategoryShow',backData));
        }
    });


    // 3。文章热门排行
    $.ajax({
        url:'http://localhost:8080/api/v1/index/rank',
        type:'get',
        dataType:'json',
        success: function(backData){
            for(var i = 0 ; i < backData.data.length; i++){
                backData.data[i].index = i+1;
            };
            // console.log(backData);
            $('.hotrank_list').html(template('HotArticle',backData));
            $('.hotrank_list>li:eq(0)>span').addClass('first');
            $('.hotrank_list>li:eq(1)>span').addClass('second');
            $('.hotrank_list>li:eq(2)>span').addClass('third');
        }
    });


    // 4.最新资讯
    $.ajax({
        url:'http://localhost:8080/api/v1/index/latest',
        type:'get',
        dataType:'json',
        success: function(backData){
            // console.log(backData);
            $('.common_news').html(template('LatestNews',backData));
        }
    });



    // 5.最新评论
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



    // 6.焦点关注
    $.ajax({
        url:'http://localhost:8080/api/v1/index/attention',
        type:'get',
        dataType:'json',
        success: function(backData){
            $('.guanzhu_list').html(template('Focus',backData));
        }
    });

    

});