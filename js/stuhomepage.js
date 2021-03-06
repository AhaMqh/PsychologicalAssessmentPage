// 学生首页js
window.onload = function () {


    tan.loading();
    //获取登录学生session
    myAjax("get", conf.apiurl + '/login/getloginstu', {}, function (res) {
        if (res.code == 10001) {
            var stuinfor2 = new Vue({
                el: '.stuinfo2',
                data: res.resultObject
            })
            tan.closew();
            Cookie.setCookie("stuid",res.resultObject.stuid)
        } else {
            tan.closew();
            tan.tips(res.msg, 1000);
        }
    }, 'json');

    var examplans = new Vue({
        el: '#examplans',
        data: {
            theplans: []
        },
        created: function () {
            this.reqplan();
        },
        methods: {
            reqplan: function () {
                var _this = this;
                myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
                        examtype: $('.exselect_sta').val(),
                        page: 1,
                        limit: 4,
                    },
                    function (res) {
                        if (res.code == 10001) {
                            _this.theplans = res.resultObject;
                            page(res.count);
                            tan.closew();
                        } else {
                            tan.closew();
                            tan.tips(res.msg);
                        }
                    }, 'json');
            },
            reqplanselect: function (texamtype, tpage, tlimit) {
                var _this = this;
                myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
                    examtype: texamtype,
                    page: tpage,
                    limit: tlimit
                }, function (res) {
                    if (res.code == 10001) {
                        _this.theplans = res.resultObject;
                        tan.closew();
                    } else {
                        tan.closew();
                        tan.tips(res, 1500);
                    }
                }, 'json');
            }
        },
    })

    //对selec值改变的监听
    layui.use(['form'], function () {
        form = layui.form;
        form.on('select(exselect_sta)', function (data) {
            tan.loading();
            examplans.reqplan();
        });
    });
    //layui分页方法
    function page(count) {
        layui.laypage.render({
            elem: 'sexamplan',
            count: count, //数据总数，从服务端得到
            limit: 4,
            theme: '#5EAAB7',
            layout: ['page', 'count'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数                      
                //首次不执行
                if (!first) {
                    //do something
                    tan.loading();
                    examplans.reqplanselect($('.exselect_sta').val(), obj.curr, obj.limit);
                }
            }
        });
    }
}

//点击开始考试方法
function examstatu(e) {
    // console.log($(e).attr("planstudentid"))取出点击标签的自定义属性
    console.log($(e));
    tan.loading();
    myAjax('post', conf.apiurl + '/studenthome/changetimeandstatu', {
        planstudentid: $(e).attr("planstudentid"),
        paperid:$(e).attr("paperid")
    }, function (res) {
        if (res.code == 10001) {
                window.location.href = "beingevaluated.html"           
        } else {
            tan.closew();
            tan.tips(res.msg, 1500);
        }
    }, 'json');
    Cookie.setCookie("planstuid",$(e).attr("planstudentid"));
    Cookie.setCookie("paperid",$(e).attr("paperid"))
}