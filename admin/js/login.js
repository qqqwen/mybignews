$(function () {
    $('.input_sub').click(function (e) {
        e.preventDefault();

        var username = $('.input_txt').val();
        var password = $('.input_pass').val();

        if (username.trim().length == 0 || password.trim().length == 0) {
            $('.modal-body>p').text('请输入用户名和密码');
            $('#myModal').modal();
            return;
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        window.location.href = './index.html';
                    });
                    //登录成功之后，将用户的token存储到localStorage
                    localStorage.setItem('token',backData.token);
                }else{
                    $('.modal-body>p').text(backData.msg);
                    $('#myModal').modal();
                };
            }
        });
    });
});