//在这里面写好变量或者函数的封装，然后在其他js中调用
var conf = {
    apiurl : "http://localhost:8080/SchoolPsychologicalAssessmentWeb",
}
//将与该页面body name属性同名js注入
var js_name = document.getElementById('tags');
var givejs_model = false;
if(js_name!=null){
    givejs_model = true;
    var givejs = "js/"+js_name.getAttribute('name')+".js";
}

//name为要添加的js路径，model为是否开启
var all_js = [
    {name:'Lcplugin/jquery-3.3.1.min.js',model:true},
    {name:'Lcplugin/vue.js',model:true},
    {name:'js/main.js',model:true},
    {name:givejs,model:givejs_model},
];
//注入定义好的js
for(i=0;i<all_js.length;i++){
    if(all_js[i].model){
        var new_element = document.createElement("script");
        new_element.setAttribute("type", "text/javascript");
        new_element.setAttribute("src",all_js[i].name);
        document.body.appendChild(new_element);
    } 
}




//使用变量，类似JSON类型的js对象方式进行事件处理程序的相关逻辑封装，主要解决了浏览器兼容性问题
//单独写进js中，便于html多次进行调运
var eventUtil = {
    //添加事件
    addEventHandle:function(element,eventType,fn){
        if(element.addEventListener){//非IE
            element.addEventListener(eventType,fn,false);
        }else if(element.attachEvent){//IE
            element.attachEvent('on'+eventType,fn);//这里拼接上'on',调运的时候不要加on，使用click等。
        }else{//不支持DOM2级，使用DOM0级方式
            element['on'+eventType] = fn;//这里使用[]方式实现对象的属性添加，相当于.的作用
        }
    },
    //删除事件
    removeEventHandle:function(element,eventType,fn){
        if(element.removeEventListener){//非IE,不带'on'
            element.removeEventListener(eventType,fn,false);//这里传入fn，是因为DOM2级或DOM0级都可以一次给一个元素的同一个事件绑定多个程序，所以需要传入具体的程序fn进行删除
        }else if(element.detachEvent){//IE,带'on'
            element.detachEvent('on'+eventType,fn);
        }else{//不支持DOM2级，使用DOM0级方式
            element['on'+eventType] = fn;
        }

    },
    //获取事件对象
    getEvent:function(event){
       return event?event:window.event;
    },
    //获取事件类型
    getType:function(event){
        return event.type;
    },
    //获取执行事件的目标元素
    getTarget:function(event){
        return event.target||event.srcElement;
    },
    //禁用默认行为
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();//非IE
        }else{
            event.returnValue = false;//针对IE
        }

    },
    //阻止传播冒泡
    stopPropagation:function(event){
        if(event.stopPrapagation){
            event.stopPropagation();//非IE
        }else{
            event.cancelBubble = true;//针对IE
        }
    }
}