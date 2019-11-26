// 学生考试测评页面js
window.onload = function () {
    //获取登录学生session
    myAjax('post', conf.apiurl + '/login/getloginstu', {}, function (res) {
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

    //获取学生试卷（已做题目还原）
    var papercontant = new Vue({
        el: '#papercontant',
        data: {
            titall: []
        },
        created: function () {
            this.gettitall();
        },
        methods: {
            gettitall: function () {
                var _this = this;
                myAjax('post', conf.apiurl + '/studentexam/getallpapercontents', {}, function (res) {
                    var contannum = new Vue({
                        el: '#contannum',
                        data: {                          
                            contnum: res.resultObject,
                        },
                    })
                    for (i = 0; i < res.resultObject.length; i++) {
                        var objtit = {};
                        titcon = (i + 1) + "." + res.resultObject[i].titleName; //获得题目
                        var aoptionContent = res.resultObject[i].optionContent; //获得多个选项
                        var dimensionid = res.resultObject[i].dimensionid; //题目维度
                        var answerid = res.resultObject[i].answerid //answer表主键id
                        var choiceoption = res.resultObject[i].choiceoption;
                        var optionContentstr = aoptionContent.split("&"); //将单个选项分成数组
                        var answerall = [];
                        for (j = 0; j < optionContentstr.length-1; j++) {
                            var newoptionContent = optionContentstr[j].split(","); //得到一个选项的内容和分值
                            var ABCoptionCotent = newoptionContent[0]; //某个选项内容
                            var optioncontentscore = newoptionContent[1]; //某个选项分值
                            var ifcheck = false;
                            if(j+1==choiceoption){
                                ifcheck =true;
                            }
                            _ansobj = {
                                ABCoptionCotent: ABCoptionCotent,
                                optioncontentscore: optioncontentscore,
                                ifcheck:ifcheck,
                            };
                            answerall.push(_ansobj);
                        }
                        objtit = {
                            titcont: titcon,
                            dimensionid: dimensionid,
                            answerid: answerid,
                            answerall: answerall,
                            choiceoption:choiceoption
                        }
                        _this.titall.push(objtit);
                    }
                    console.log(_this.titall);
                }, 'json')
            }
        },
        updated: function () {
            layui.form.render(); //重构layui表
        },

    })



    // myAjax('post', conf.apiurl + '/studentexam/getallpapercontents', {}, function (res) {
    //     if (res.code == 10001) {
    //         var papercontant = new Vue({
    //             el: '#papercontant',
    //             data: {
    //                 titall: [{
    //                     titcont: '',
    //                     titanser: []
    //                 }]
    //             },
    //             created: function () {
    //                 var _this = this;
    //                 for (i = 0; i < res.resultObject.length; i++) {
    //                     _this.titall[i].titcont = (i+1)+"."+res.resultObject[i].titleName
    //                 }
    //                 close.log(_this.titall);
    //             }
    //         })

    //     } else {
    //         tan.tips(res.msg, 1500);
    //     }
    // }, 'json');

}