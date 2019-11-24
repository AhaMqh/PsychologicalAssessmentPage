// 学生考试测评页面js
window.onload = function () {
    //获取登录学生session
    myAjax('post', conf.apiurl + '/login/getloginstu', {}, function (res) {
        if (res.code == 10001) {            
            var stuinfor1 = new Vue({
                el: '.stuinfo1',
                data: res.resultObject
            })
            tan.closew();
        } else {
            tan.tips(res.msg, 1000);
        }
    }, 'json');
    
    layui.use(['form', 'layedit', 'laydate', 'element', 'jquery'], function () {
        var form = layui.form;
        layer = layui.layer,
            element = layui.element,
            $ = layui.jquery;
        form.on('radio(aaa)', function (data) {

            var firstDiv = document.getElementById("firstDiv");
            firstDiv.className = "exam_number2";
            form.render();
        });


        $(document).on('click', '#btn', function () {
            var tradio = $("input[name='sex1']:checked").val();
            if (tradio == undefined) {
                layer.alert('第二题还未选择', {
                    icon: 5,
                    title: "提示"
                });
                var firstDiv2 = document.getElementById("firstDiv2");
                firstDiv2.className = "exam_number1";
                form.render();
            }
            console.log(tradio);
        });
    });


}