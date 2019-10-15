$(function () {
    var id = window.location.href.split('=')[1];
    // console.log(id);


    // 文章内容渲染
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/article',
        type: 'get',
        dataType: 'json',
        data: { id: id },
        success: function (backData) {
            // console.log(backData);
            $('.article_title').text(backData.data.title);
            $('.article_info').text(backData.data.author+'   发布于  '+backData.data.date+'   分类：'+backData.data.category+'   阅读：( '+backData.data.read +' )   评论：( '+backData.data.comments+' )');
            $('.article_con').text(backData.data.content);
            $('.article_links a').eq(0).html(backData.data.prev.title).attr('href','./article.html?id='+backData.data.prev.id);
            $('.article_links a').eq(1).html(backData.data.next.title).attr('href','./article.html?id='+backData.data.next.id);
        }
    });



    // 评论列表渲染
    $.ajax({
        url:'http://localhost:8080/api/v1/index/get_comment',
        type:'get',
        dataType:'json',
        data:{articleId:id},
        success: function(backData){
            // console.log(backData);
            $('.comment_list_con').html(template('com_list',backData));
        }
    });


    // 发表评论按钮
    $('.comment_sub').click(function(e){
        e.preventDefault();

        if($('.comment_name').val().trim() == '' || $('.comment_input').val().trim() == ''){
            alert('请输入用户名或密码');
            return;
        };

        $.ajax({
            url:'http://localhost:8080/api/v1/index/post_comment',
            type:'post',
            dataType:'json',
            data:{
                author:$('.comment_name').val(),
                content:$('.comment_input').val(),
                articleId:id
            },
            success: function(backData){
                // console.log(backData);
                if(backData.code == 201){
                    alert('发表成功');
                    window.location.reload();
                };
            }
        });
    });


    // 文章热门排行渲染
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