// 学生首页js
window.onload = function () {
    tan.loading();
    this.myAjax('post', conf.apiurl + '/studenthome/getuserinfo', {
        stuid: 7
    }, function (res) {
        if (res.code == 10001) {            
            var stuinfor2 = new Vue({
                el: '.stuinfo2',
                data: res.resultObject
            })
            tan.closew();
        } else {
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
                        studentid: 976,
                        examtype: $('.exselect_sta').val(),
                        page: 1,
                        limit: 4
                    },
                    function (res) {
                        if (res.code == 10001) {
                            _this.theplans = res.resultObject;
                            page(res.resultObject.length);
                            console.log(_this.theplans)
                        } else {
                            tan.tips(res.msg);
                        }
                    }, 'json');
            },
            reqplanselect: function (tstuid, texamtype, tpage, tlimit) {
                var _this = this;
                myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
                    studentid: tstuid,
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
                    examplans.reqplanselect(976, $('.exselect_sta').val(), obj.curr, obj.limit);
                }
            }
        });
    }
}

//点击开始考试方法
function examstatu(e) {
    // console.log($(e).attr("planstudentid"))取出点击标签的自定义属性
    tan.loading();
    myAjax('post', conf.apiurl + '/studenthome/changeexamstatu', {
        planstudentid: $(e).attr("planstudentid")
    }, function (res) {
        if(res.code==10001){           
            setTimeout(function(){
                window.location.href="测评页面.html"
            },1500)
        }else{
            tan.closew();
            tan.tips(res.msg,1500);
        }
    }, 'json');
}