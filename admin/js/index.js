//入口函数
$(function(){
    /* 1.页面一加载请求个人信息：渲染页面 */
  
    $.ajax({
        url:BigNew.user_info,
        type:'get',
        dataType:'json',
        data:'',
        success: function(backData){
            // console.log(backData);
            $('.user_info>img').attr('src',backData.data.userPic);
            $('.user_info>span').html('欢迎&nbsp;&nbsp;'+backData.data.nickname);
            $('.user_center_link>img').attr('src',backData.data.userPic);
        }
    });
    
    /* 2.退出登录功能 */
    $('.logout').click(function(){
        //2.1 清除token
        localStorage.removeItem('token');
        //2.2 跳转登录页面
        window.location.href = './login.html';
    })

    /* 左侧导航栏点击高亮效果 */
    $('.menu>.level01').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).index() == 1){
            $('.level02').slideToggle();
            $('.level01 b').toggleClass('rotate0');
            $('.level02>li:eq(0)>a')[0].click();
        }else{
            $('ul.level02').slideUp();
            $('.level01 b').removeClass('rotate0');
        }
    });

    /* 二级菜单点击高亮效果 */
    $('.level02>li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 右上角头像点击也进入
    $('.user_center_link>img').click(function(){
        // $('#user').click();
        $('#user>a')[0].click();
    });
});