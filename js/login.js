//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
$(".username").focus(function(){
    $(".tips").hide();
  });
window.onload = function () {




    // var div = document.getElementById('testbtn');
    // var a = document.getElementsByClassName('layui-btn');
    // eventUtil.addEventHandle($('#testbtn')[0],'click',function(e){
    //     e = eventUtil.getEvent(e);
    //     alert("给div增加的onclick事件");
    //     alert("事件执行的对象是："+eventUtil.getTarget(e).nodeName);
    //     alert("事件类型是："+eventUtil.getType(e));
    // });
    // eventUtil.addEventHandle(a,'click',function(e){
    //     e = eventUtil.getEvent(e);
    //     alert("给a增加的onclick事件");
    //     alert("事件执行的对象是："+eventUtil.getTarget(e).nodeName);
    //     alert("事件类型是："+eventUtil.getType(e));
    //     //上面两步执行以后,点击a标签，发现a的onclick和div的onclick都会执行，同时会跳转到百度页面，
    //     //说明事件冒泡和默认行为（a的href决定了a的默认行为是跳转）都存在,下面
    //     eventUtil.preventDefault(e);//禁止默认行为
    //     eventUtil.stopPropagation(e);//停止传播冒泡
    // });


    // layui.use(['form','table','layer'], function () {
    //     var form = layui.form;
    // form.verify({
    //     username: function(username){

    //     if(username==null || username==""){
    //     return '请输入用户名';
    //     }
    //     },pwd: function(pwd){

    //         if(pwd==null || pwd==""){
    //         return '请输入密码';
    //         }
    //         },schoolname: function(schoolname){

    //             if(schoolname==null || schoolname==""){
    //             return '请选择学校！';
    //             }
    //             }

    // )}



    // })
    eventUtil.addEventHandle($('.btnlogin')[0], 'click', function (e) {
      var username = $('.username').val();
      var pwd = $('.pwd').val();
      var schoolnum = $('.schoolname').val();
      var schoolname = $('.schoolname option:selected');
      var scname = schoolname.text();
      var usertype = $('input[name="usertype"]:checked').val();//获取选中的单选的值
      var tip = $('.tips');

      console.log(schoolnum);
      if (username == "") {
          tan.tips("请输入用户名", 2000)
      } else if (pwd == "") {
          tan.tips("请输入密码", 2000)
      } else if (schoolnum == null || schoolnum == '') {
          tan.tips("请选择学校", 2000)
      } else if (!username == "" && !pwd == "" && !scname == "") {

          layui.use(['table', 'layer'], function () {
              tan.loading();
              if (usertype == "教师") {
                  myAjax('post', conf.apiurl + '/login/loginteacher', { username: username, pwd: pwd, schoolname: scname }, function (res) {

                      if (res.code == 10001) {
                          window.location.href = "教师首页.html";
                          tan.closew();
                      } else{
                          tan.closew();
                          $(".tips").show();                          
                          $(".username").val("");
                          $(".pwd").val("");

                      }
                  }, 'json');
              } else {
                  myAjax('post', conf.apiurl + '/login/loginstudent', { stuid: username, pwd: pwd, schoolname: scname }, function (res) {

                      if (res.code == 10001) {
                          window.location.href = "学生首页.html";
                          tan.closew();
                      } else{
                          tan.closew();
                          $(".tips").show();                         
                          $(".username").val("");
                          $(".pwd").val("");
                      }
                  }, 'json');
              }

          })

      }

  })
}


