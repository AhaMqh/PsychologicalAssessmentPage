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


//判断登录身份，采用不同的接口
var nowhtml = document.getElementById('tags');
var roletype = nowhtml.getAttribute('roletype');
if (roletype == 'teacher') {
    //获取登录老师session
    myAjax("get", conf.apiurl + '/login/getlogintea', {}, function (res) {
        if (res.code == 10001) {
            var stuinfor1 = new Vue({
                el: '.stuinfo1',
                data: {
                    info: res.resultObject,
                    usertype: true
                },
                created: function () {
                    var _this = this;
                    if (res.resultObject.hasOwnProperty("stuid")) {
                        _this.usertype = false;
                    }
                },
                mounted() {
                    //菜单展开收起 
                    $(".user-pic").on("click", function (e) {
                        $("#manage_sys").show();

                        $(document).one("click", function () {
                            $("#manage_sys").hide();
                        });
                        e.stopPropagation();
                    });
                    $("#manage_sys").on("click", function (e) {
                        e.stopPropagation();
                    });
                }
            })
        } else {
            setTimeout(window.location.href = "登录.html", 3000);
        }
    }, 'json');
} else if (roletype == 'student') {
    //获取登录学生session
    myAjax("get", conf.apiurl + '/login/getloginstu', {}, function (res) {
        if (res.code == 10001) {
            var stuinfor1 = new Vue({
                el: '.stuinfo1',
                data: {
                    info: res.resultObject,
                    usertype: true
                },
                created: function () {
                    var _this = this;
                    if (res.resultObject.hasOwnProperty("stuid")) {
                        _this.usertype = false;
                    }
                },
                mounted() {
                    //菜单展开收起 
                    $(".user-pic").on("click", function (e) {
                        $("#manage_sys").show();

                        $(document).one("click", function () {
                            $("#manage_sys").hide();
                        });

                        e.stopPropagation();
                    });
                    $("#manage_sys").on("click", function (e) {
                        e.stopPropagation();
                    });
                }
            })
        } else {
            setTimeout(window.location.href = "登录.html", 3000);
        }
    }, 'json');
}

$(".resetpwd").click(function () {
    layer.open({
        skin: 'demo-class',
        type: 1,
        area: ['500px', '260px'],
        title: '班级密码重置',
        content: $("#modifypwd"),
        shade: 0.6,
        btn: ['确认', '取消'],
        cancel: function (layero, index) {
            var enpwd = hex_md5(fix(Encryption_key,val));
				layer.msg(
					myAjax("get", conf.apiurl + '/teastuexam/updatebyid', {
					stuid:stuid,
					pwd:enpwd
				}, function (res) {
					if (res.code == 0) {
						layer.alert('修改成功', {
						icon: 1,
						title: "提示"
						});
					} else {
						layer.alert('修改失败', {
						icon: 2,
						title: "提示"
						});
					}
				}, 'json')
				);
				layer.close(index);
        }

    })
})
$(".btn_unresult").click(function () {
    layer.open({
        skin: 'demo-class',
        type: 1,
        area: ['500px', '190px'],
        title: '重置学生密码',
        content: $("#modifypwd_single"),
        shade: 0.6,
        btn: ['确认', '取消'],
        cancel: function (layero, index) {
            layer.closeAll();
        }
    })
})
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