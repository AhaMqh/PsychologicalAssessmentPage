// 学生首页js
window.onload = function () {

    tan.loading();
    this.myAjax('post', conf.apiurl + '/studenthome/getuserinfo', {
        stuid: 7
    }, function (res) {
        if (res.code == 10001) {
            var stuinfor1 = new Vue({
                el: '.stuinfo1',
                data: res.resultObject
            })
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
        data: {theplans:[]},
        created:function(){
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
                            console.log(_this.theplans)
                        } else {

                        }
                    }, 'json');
            },

        }
    })

    // this.myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
    //     studentid: 976,
    //     examtype: $('.exselect_sta').val(),
    //     page: 1,
    //     limit: 4
    // }, function (res) {
    //     if (res.code == 10001) {
    //         var examplans = new Vue({
    //             el: '#examplans',
    //             data: res
    //         })
    //         //分页器
    //         layui.use(['laypage', 'layer', 'form'], function () {
    //             var laypage = layui.laypage,
    //                 layer = layui.layer,
    //                 form = layui.form;;
    //             laypage.render({
    //                 elem: 'sexamplan',
    //                 count: res.resultObject.length, //数据总数，从服务端得到
    //                 limit: 4,
    //                 theme: '#5EAAB7',
    //                 layout: ['page', 'count'],
    //                 jump: function (obj, first) {
    //                     //obj包含了当前分页的所有参数，比如：
    //                     // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
    //                     // console.log(obj.limit); //得到每页显示的条数                      
    //                     //首次不执行
    //                     if (!first) {
    //                         //do something
    //                         tan.loading();
    //                         myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
    //                             studentid: 976,
    //                             examtype: $('.exselect_sta').val(),
    //                             page: obj.curr,
    //                             limit: obj.limit
    //                         }, function (res) {
    //                             if (res.code == 10001) {
    //                                 examplans.data = res;                                   
    //                                 tan.closew();
    //                             } else {
    //                                 tan.closew();
    //                                 tan.tips(res, 1000);
    //                             }
    //                         }, 'json');
    //                     }
    //                 }
    //             });

    //             form.on('select(exselect_sta)', function (data) {
    //                 tan.loading();
    //                 myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
    //                     studentid: 976,
    //                     examtype: $('.exselect_sta').val(),
    //                     page: 1,
    //                     limit: 4
    //                 }, function (res) {
    //                     if (res.code == 10001) {
    //                         examplans.data = res;
    //                         examplans.$forceUpdate();
    //                         console.log(examplans.data);
    //                         tan.closew();
    //                     } else {
    //                         tan.closew();
    //                     }
    //                 }, 'json');
    //             });
    //         })
    //     } else {
    //         tan.tips(res.msg, 1000);
    //     }
    // }, 'json')


    //对selec值改变的监听
    layui.use(['form'], function () {
        form = layui.form;
        form.on('select(exselect_sta)', function (data) {
            examplans.reqplan();
            //     tan.loading();
            //     myAjax('post', conf.apiurl + '/studenthome/getexamplanlist', {
            //         studentid: 976,
            //         examtype: $('.exselect_sta').val(),
            //         page: 1,
            //         limit: 4
            //     }, function (res) {
            //         if(res.code==10001){                 
            //             examplans.data = this.res;
            //             console.log(examplans.data+"-------------111");
            //             tan.closew();
            //         }else{
            //             tan.closew();
            //         }
            //     }, 'json');
        });
    });
}