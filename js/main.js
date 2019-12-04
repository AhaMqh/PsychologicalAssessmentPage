layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '请输入字符';
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听指定开关
    form.on('switch(switchTest)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });

    //表单赋值
    layui.$('#LAY-component-form-setval').on('click', function () {
        form.val('example', {
            "username": "贤心" // "name": "value"
                ,
            "password": "123456",
            "interest": 1,
            "like[write]": true //复选框选中状态
                ,
            "close": true //开关状态
                ,
            "sex": "女",
            "desc": "我爱 layui"
        });
    });

    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function () {
        var data = form.val('example');
        alert(JSON.stringify(data));
    });
});

layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
        layer = layui.layer;

    //自定义样式
    laypage.render({
        elem: 'demo2',
        count: 100,
        theme: '#5EAAB7'
    })
    //调用分页查看layui分页文档
});
layui.use('element', function () {
    var element = layui.element;
});

//表格渲染js
layui.use('table', function () {
    var table = layui.table;

    table.render({
        elem: '#test',
        url: '',
        toolbar: true,
        totalRow: true,
        title: '班级心理测评答题卡',
        cols: [
            [{
                    type: 'numbers',
                    title: '序号',
                    width: 70,
                    fixed: 'left',
                    totalRowText: '合计行'
                },
                {
                    field: 'name',
                    title: '姓名',
                    width: 120,
                    fixed: 'left',
                    unresize: true,
                    sort: true,

                },
                {
                    field: 'stunum',
                    title: '学号',
                    fixed: 'left',
                    width: 200,
                }, {
                    field: 'scorelist',
                    title: '选项'
                },
            ]
        ],
        data: [{
                "name": "李小安",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "李大宝",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "李鑫",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "刘曦",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "孙大伟",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "发隋代",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "刘穗丹",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "念云飞",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "蒋劲夫",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },
            {
                "name": "蔡徐坤",
                "scorelist": "1.A    2.D    3.C    5.A    6.D    7.C    9.A    10.D    11.C    13.A    14.D    15.C    17.A    18.D    19.C    21.A    22.D    23.C    25.A    26.D    27.C    29.A    30.D    31.C    33.A    34.D    35.C    37.A    38.D    39.C    41.A    42.D    43.C    45.A    46.D    47.C    49.A    50.D    51.C    53.A    54.D    55.C    57.A    58.D    59.C    61.A    62.D    63.C    65.A    66.D    67.C    69.A    70.D    71.C    73.A    74.D    75.C    77.A    78.D    79.C    ",
                "stunum": "KMYTZX20190203"
            },

        ],
        page: false,
        response: {
            statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
        },
        parseData: function (res) { //将原始数据解析成 table 组件所规定的数据
            return {
                "code": res.status, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.rows.item, //解析数据列表
            };
        }
    });
});



layui.use('layer', function () { //独立版的layer无需执行这一句
    var $ = layui.jquery,
        layer = layui.layer; //独立版的layer无需执行这一句

    //触发事件
    var active = {
        setTop: function () {
            var that = this;
            //多窗口模式，层叠置顶
            layer.open({});
        },
        notice: function () {
            //示范一个公告层
            layer.open({
                type: 1,
                title: false //不显示标题栏
                    ,
                closeBtn: false,
                area: '300px;',
                shade: 0.8,
                id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,
                btn: ['确定', '取消'],
                btnAlign: 'c',
                moveType: 1 //拖拽模式，0或者1
                    ,
                content: '<div class="edit_pwd"><i class="layui-icon layui-icon-password icon_pwd"></i>修改密码</div><div style="padding: 20px; line-height: 22px; background-color: #fff; color: #333333; ">旧密码：<br> <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"><br>新密码：<br><input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"><br>确认新密码：<br><input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"></div>',
                success: function (layero) {
                    var btn = layero.find('.layui-layer-btn');
                    btn.find('.layui-layer-btn0').attr({
                        href: '登录.html',
                        target: '_blank'
                    });
                }
            });
        },
        
        
        confirmTrans: function () {
            //配置一个透明的询问框
            layer.msg('确定要强制交卷吗？', {
                time: 20000, //20s后自动关闭
                btn: ['确定', '取消']
            });
        },
        cancel: function () {
            //配置一个透明的询问框
            layer.msg('确定要取消交卷吗？', {
                time: 200000, //20s后自动关闭
                btn: ['确定', '取消']
            });
        },
        setTop: function () {
            var that = this;
            //多窗口模式，层叠置顶
            layer.open({});
        },
        confirmTrans: function () {
            //配置一个透明的询问框
            layer.msg('确定要强制交卷吗？', {
                time: 20000, //20s后自动关闭
                btn: ['确定', '取消']
            });
        },
        cancel: function () {
            //配置一个透明的询问框
            layer.msg('确定要取消交卷吗？', {
                time: 200000, //20s后自动关闭
                btn: ['确定', '取消']
            });
        }
    };

    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
    $('#navbar_edit .edit_info').on('click', function () {
        var othis = $(this),
            method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });

});


// myAjax('post', conf.apiurl + '/login/getloginstu', {}, function (res) {
//     if (res.code == 10001) {            
//         var stuinfor1 = new Vue({
//             el: '.stuinfo1',
//             data: res.resultObject
//         })
//         tan.closew();
//     } else {
//         tan.tips(res.msg, 1000);
//     }
// }, 'json');

//退出登录
function exitsys() {
    tan.loading();
    myAjax('post', conf.apiurl + '/loginout/exit', {}, function (res) {
        if (res.code == 10001) {
            layer.closeAll('loading');
            window.location.href = "/登录.html";
        }
    }, 'json')
}
//菜单展开收起
$(function(){
    $(".user-pic").click(function(event){
      var e=window.event || event;
      if(e.stopPropagation){
        e.stopPropagation();
      }else{
        e.cancelBubble = true;
      }  
      $("#manage_sys").show();
    });
    $("#manage_sys").click(function(event){
      var e=window.event || event;
      if(e.stopPropagation){
        e.stopPropagation();
      }else{
        e.cancelBubble = true;
      }
    });
    document.onclick = function(){
      $("#manage_sys").hide();
    };
  })
  
  $(".resetpwd").click(function () {
  layer.open({
    skin: 'demo-class',
    type:1,
    area:['500px','260px'],
     title: '班级密码重置'
     ,content: $("#modifypwd"),
     shade: 0.6,
     btn: ['确认', '取消']
     ,
   cancel: function(layero,index){ 
      layer.closeAll();
     }
   
   })
})
$(".btn_unresult").click(function () {
    layer.open({
      skin: 'demo-class',
      type:1,
      area:['500px','190px'],
       title: '重置学生密码'
       ,content: $("#modifypwd_single"),
       shade: 0.6,
       btn: ['确认', '取消']
       ,
     cancel: function(layero,index){ 
        layer.closeAll();
       }
     
     })
  })
  
