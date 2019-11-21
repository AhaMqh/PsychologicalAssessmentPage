//在这里面写好变量或者函数的封装，然后在其他js中调用
var conf = {
    apiurl: "http://localhost:8080/SchoolPsychologicalAssessmentWeb",
}
//将与该页面body name属性同名js注入
var js_name = document.getElementById('tags');
var givejs_model = false;
if (js_name != null) {
    givejs_model = true;
    var givejs = "js/" + js_name.getAttribute('name') + ".js";
}

//name为要添加的js路径，model为是否开启
var all_js = [{
        name: 'PokioPlugin/jquery-3.3.1.min.js',
        model: true
    },
    {
        name: 'PokioPlugin/vue.js',
        model: true
    },
    {
        name: 'js/main.js',
        model: true
    },
    {
        name: givejs,
        model: givejs_model
    },
];
//注入定义好的js
for (i = 0; i < all_js.length; i++) {
    if (all_js[i].model) {
        var new_element = document.createElement("script");
        new_element.setAttribute("type", "text/javascript");
        new_element.setAttribute("src", all_js[i].name);
        document.body.appendChild(new_element);
    }
}




//使用变量，类似JSON类型的js对象方式进行事件处理程序的相关逻辑封装，主要解决了浏览器兼容性问题
//单独写进js中，便于html多次进行调运
var eventUtil = {
    //添加事件
    addEventHandle: function (element, eventType, fn) {
        if (element.addEventListener) { //非IE
            element.addEventListener(eventType, fn, false);
        } else if (element.attachEvent) { //IE
            element.attachEvent('on' + eventType, fn); //这里拼接上'on',调运的时候不要加on，使用click等。
        } else { //不支持DOM2级，使用DOM0级方式
            element['on' + eventType] = fn; //这里使用[]方式实现对象的属性添加，相当于.的作用
        }
    },
    //删除事件
    removeEventHandle: function (element, eventType, fn) {
        if (element.removeEventListener) { //非IE,不带'on'
            element.removeEventListener(eventType, fn, false); //这里传入fn，是因为DOM2级或DOM0级都可以一次给一个元素的同一个事件绑定多个程序，所以需要传入具体的程序fn进行删除
        } else if (element.detachEvent) { //IE,带'on'
            element.detachEvent('on' + eventType, fn);
        } else { //不支持DOM2级，使用DOM0级方式
            element['on' + eventType] = fn;
        }

    },
    //获取事件对象
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取事件类型
    getType: function (event) {
        return event.type;
    },
    //获取执行事件的目标元素
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    //禁用默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault(); //非IE
        } else {
            event.returnValue = false; //针对IE
        }

    },
    //阻止传播冒泡
    stopPropagation: function (event) {
        if (event.stopPrapagation) {
            event.stopPropagation(); //非IE
        } else {
            event.cancelBubble = true; //针对IE
        }
    }
}


/*
 *封装一个自己的ajax函数
 *有5个参数，最后一个参数可选
 *
 * @param method(必选)    请求类型  get 和 post
 * @param url(必选)       请求的url地址   相同域名下的页面（此函数不支持跨域请求）
 * @param data(必选)      请求协带的数据  以js对象的形式定义，如：{name:'张三'}
 * @param callback(必选)  回调函数,可接收一个参数，这个参数就是服务器响应的数据
 * @param type(可选)      指定服务器响应的数据类型（可选值：json,xml,text），如果是json模式，则使用json解析数据，默认为text普通字符串
 */
function myAjax(method, url, data, callback, type) {
    //创建兼容 XMLHttpRequest 对象
    var xhr;
    if (window.XMLHttpRequest) { //IE7+, Firefox, Chrome, Opera, Safari
        xhr = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //给请求添加状态变化事件处理函数
    xhr.onreadystatechange = function () {
        //判断状态码
        if (xhr.status == 200 && xhr.readyState == 4) {
            //根据type参数，判断返回的内容需要进行怎样的处理
            if (type == 'json') {
                //获得 json 形式的响应数据，并使用parse方法解析
                var res = JSON.parse(xhr.responseText);
            } else if (type == 'xml') {
                //获得 XML 形式的响应数据
                var res = responseXML;
            } else {
                //获得字符串形式的响应数据
                var res = xhr.responseText;
            }
            //调用回调函数,并将响应数据传入回调函数
            callback(res);
        }
    };

    //判断data是否有数据
    var param = '';
    //这里使用stringify方法将js对象格式化为json字符串
    if (JSON.stringify(data) != '{}') {
        url += '?';
        for (var i in data) {
            param += i + '=' + data[i] + '&'; //将js对象重组，拼接成url参数存入param变量中
        }
        //使用slice函数提取一部分字符串，这里主要是为了去除拼接的最后一个&字符
        //slice函数：返回一个新的字符串。包括字符串从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。
        param = param.slice(0, param.length - 1);
    }

    //判断method是否为get
    if (method == "get") {
        //是则将数据拼接在url后面
        url = url + param;
    }


    //初始化请求
    xhr.open(method, url, true);

    //如果method == post
    if (method == "post") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //发送请求
        xhr.send(param);
    } else {
        //发送请求
        xhr.send(null);
    }

}


var tan = {
    //loading执行动画弹出层
    loading: function(){
        layer.load(2, {
            shade: [0.4, '#fff'] //0.1透明度的白色背景
        });
    },

    //自动关闭返回消息弹出层
    tips: function (message, times) {
        layer.msg(message, {
            time: times, //多久自动关闭
        });
    },

    // 错误弹出层
    error: function (message) {
        layer.open({
            content: message,
            icon: 2,
            title: '错误提示',
        });
    },

    //成功弹出层
    success: function (message, url) {
        layer.open({
            content: message,
            icon: 1,
            yes: function () {
                location.href = url;
            },
        });
    },

    // 确认弹出层
    confirm: function (message, url) {
        layer.open({
            content: message,
            icon: 3,
            btn: ['是', '否'],
            yes: function () {
                location.href = url;
            },
        });
    },

    //无需跳转到指定页面的确认弹出层
    toconfirm: function (message) {
        layer.open({
            content: message,
            icon: 3,
            btn: ['确定'],
        });
    },

    closew: function(wname){
        layer.closeAll(wname);
    }
}
