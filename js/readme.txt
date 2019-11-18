框架结构：
PublicVariable.js 用于存储js的公共变量，及封装的公共方法
main.js 会随着PublicVariable.js引入每个页面，主要编写每个页面公用的js代码
login.js 名称由用户自定义，通过在页面Body标签添加id和name的形式动态注入
以及其他第三方常用js 如：jQuery Vue;


PublicVariable:
conf 存储公共变量，能在其他js页面中调用。通过对象的形式添加 eg:apiurl : "http://localhost:8080/SchoolPsychologicalAssessmentWeb"
all_js 其他js引入{name：js路径,model:boolean类型 true表示引用 false则不引用}


window.onload = function(){
    eventUtil.addEventHandle($('#testbtn')[0],'click',function(e){
        myAjax('post',conf.apiurl+'/login/loginteacher',{username:'xuzhenlin13012312345',pwd:'959080a7b579e9d8ed7b5709bb161341',schoolname:'云南昆明新闻路小学'},function(res){
            console.log(res);
            alert(res.msg);
        },'json');
    });
}

loading弹窗弹出：
layui.use(['table','layer'], function(){
            loading = layer.load(2, {
                shade: [0.4, '#fff'] //0.1透明度的白色背景
            });
          })

loading弹窗关闭：layer.closeAll('loading');