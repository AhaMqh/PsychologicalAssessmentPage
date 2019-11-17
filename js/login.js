alert(conf.apiurl);

//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
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
}