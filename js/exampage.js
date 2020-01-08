// 学生考试测评页面js
window.onload = function () {


    myAjax('post', conf.apiurl + '/login/getloginstu', {}, function (res) {
        if (res.code == 10001) {
            var stuinfor2 = new Vue({
                el: '.stuinfo2',
                data: res.resultObject
            })
            tan.closew();
            Cookie.setCookie("stuid", res.resultObject.stuid);
        } else {
            tan.tips(res.msg, 1000);
        }
    }, 'json');

    var datatime;
    myAjax('post', conf.apiurl + "/studentexam/getplanbaseinfo", {}, function (res) {
        if (res.code == 10001) {
            var planbaseinfo1 = new Vue({
                el: '.planbaseinfo1',
                data: res.resultObject
            })
            tan.closew();

            //试卷已做时间显示
            datatime = res.resultObject.examstartime;
            setInterval(function () {
                BirthDay = new Date(datatime); //这个日期是可以修改的  
                today = new Date();
                timeold = (today.getTime() - BirthDay.getTime());
                sectimeold = timeold / 1000
                secondsold = Math.floor(sectimeold);
                msPerDay = 24 * 60 * 60 * 1000
                e_daysold = timeold / msPerDay
                daysold = Math.floor(e_daysold);
                e_hrsold = (e_daysold - daysold) * 24;
                hrsold = Math.floor(e_hrsold);
                e_minsold = (e_hrsold - hrsold) * 60;
                minsold = Math.floor((e_hrsold - hrsold) * 60);
                seconds = Math.floor((e_minsold - minsold) * 60);
                showtime.innerHTML = daysold + "<span class='inin'>天</span>" + hrsold + "<span class='inin'>时</span>" + minsold + "<span class='inin'>分</span>" + seconds + "<span class='inin'>秒</span>";
            }, 1000)
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
                    res.resultObject.sort(function(a,b){//将返回的题目按照题号重新排序
                        return a.titleOrder - b.titleOrder;
                    })
                    for (i = 0; i < res.resultObject.length; i++) {
                        var objtit = {};
                        titcon = (i + 1) + "." + res.resultObject[i].titleName; //获得题目
                        var aoptionContent = res.resultObject[i].optionContent; //获得多个选项
                        var dimensionid = res.resultObject[i].dimensionid; //题目维度
                        var titleid = res.resultObject[i].titleid //题目id                    
                        var choiceoption = res.resultObject[i].choiceoption; //学生已选选项
                        var titleOrder = res.resultObject[i].titleOrder;
                        var stuid = Cookie.getCookie("stuid");
                        var anserincookie = Cookie.getCookie(stuid)
                        if (!isEmpty(anserincookie)) {
                            choicemap = mapAndJson._jsonToMap(anserincookie);
                            choiceoption = choicemap.get(titleOrder.toString());
                        }
                        var optionContentstr = aoptionContent.split("&"); //将单个选项分成数组
                        var answerall = [];
                        for (j = 0; j < optionContentstr.length - 1; j++) {
                            var newoptionContent = optionContentstr[j].split("||"); //得到一个选项的内容和分值
                            var ABCoptionCotent = newoptionContent[0]; //某个选项内容
                            var onlyoptionContent = ABCoptionCotent.split("、");
                            var onyoption = onlyoptionContent[0]; //只获取ABC编号
                            var optioncontentscore = newoptionContent[1]; //某个选项分值
                            var ifcheck = false;
                            if (j + 1 == choiceoption) {
                                ifcheck = true;
                            }
                            _ansobj = {
                                ABCoptionCotent: ABCoptionCotent,
                                optioncontentscore: optioncontentscore,
                                ifcheck: ifcheck,
                                useranswer: onyoption,
                            };
                            answerall.push(_ansobj);
                        }
                        objtit = {
                            titcont: titcon,
                            dimensionid: dimensionid,
                            titleid: titleid,
                            answerall: answerall,
                            choiceoption: choiceoption,
                            titleOrder:titleOrder
                        }
                        _this.titall.push(objtit);
                    }

                    var contannum = new Vue({
                        el: '#contannum',
                        data: {
                            contnum: _this.titall,
                        },
                    })
                    //console.log(_this.titall);
                }, 'json')
            }
        },
        updated: function () {
            layui.form.render(); //重构layui表
        },

    })

    var backanswer = []; //将试卷答案暂存到这
    var cookieanswer = new Map(); //预存到cookie中的答案
    var stuid = Cookie.getCookie("stuid");
    var ifhavecookie = Cookie.getCookie(stuid)
    if (!isEmpty(ifhavecookie)) { //为cookie赋初始值
        cookieanswer = mapAndJson._jsonToMap(ifhavecookie);
    }
    layui.use(['form'], function () {
        var form = layui.form
        form.on('radio', function (data) {
            //console.log(data.elem); //得到radio原始DOM对象
            //console.log(data.value); //被点击的radio的value值
            var domvlue = data.elem;
            var anserdata = {};
            var tittleidcontent = domvlue.attributes.titleid.value;
            var dimensionid = domvlue.attributes.dimensionid.value;
            var optionscore = domvlue.attributes.optionscore.value;
            var useranswer = domvlue.attributes.useranswer.value;
            var choiceoption = domvlue.attributes.choiceoption.value;
            var titleOrder = domvlue.attributes.titleOrder.value;
            var titnumClassName = "." + domvlue.attributes.name.value;
            anserdata = {
                tittleidcontent: tittleidcontent,
                optionscore: optionscore,
                useranswer: useranswer,
                choiceoption: choiceoption,
                dimensionid: dimensionid
            }
            cookieanswer.set(titleOrder, choiceoption);
            //点击时改变边上题号的颜色
            if (!$(titnumClassName).hasClass("choisetab")) {
                $(titnumClassName).addClass("choisetab");
            }
            
            //判断之前数组中是否存在该字段
            let status = backanswer.some(item => item.tittleidcontent === tittleidcontent)
            if (status) {
                backanswer = backanswer.map(item => item.tittleidcontent === anserdata.tittleidcontent ? anserdata : item)
                //console.log(backanswer);
            } else {
                backanswer.push(anserdata);
            }

        });
    });

    //单保存试卷
    function savepaper() {
        myAjax("post", conf.apiurl + "/studentexam/savestuanswer", {
            answerList: JSON.stringify(backanswer),
            planstudentid: $('#planstudentid').val()
        }, function (res) {
            tan.closew();
            tan.tips(res.msg, 1500);
        }, 'json')
        var stuid = Cookie.getCookie("stuid");
        Cookie.setCookie(stuid, mapAndJson._mapToJson(cookieanswer));
    }

    //点击保存按钮保存试卷
    eventUtil.addEventHandle($(".exam_save")[0], 'click', function (e) {
        tan.loading();
        savepaper();
    })

    //自动保存试卷
    function autosave() {
        if (backanswer.length != 0) {
            myAjax("post", conf.apiurl + "/studentexam/savestuanswer", {
                answerList: JSON.stringify(backanswer),
                planstudentid: $('#planstudentid').val()
            }, function (res) {}, 'json')
            var stuid = Cookie.getCookie("stuid");
            Cookie.setCookie(stuid, mapAndJson._mapToJson(cookieanswer));
        }
    }

    //每1-2分钟进行一次随机保存分钟自动保存一次
    setInterval(autosave, 1000 * 60 * Math.ceil(Math.random() * 2));

    //交卷
    this.eventUtil.addEventHandle($(".btn_tijiao")[0], 'click', function (e) {
        checkSur();
    })

    function checkSur() {
        for (var i = 1; i <= $("#quesnum").val(); i++) {
            var objName = "anser" + i;
            var objNameId = "#anserid" + i;
            var obj = document.getElementsByName(objName);
            var objLen = obj.length;
            var objYN;
            objYN = false;

            for (var j = 0; j < objLen; j++) {
                if (obj[j].checked == true) {
                    objYN = true;
                    break;
                }
            }
            if (!objYN) {
                tan.error("请选择第" + i + "题答案");
                Gtoposition(objNameId);
                return false;
            }
        }
        tan.loading();
        myAjax("post", conf.apiurl + "/studentexam/handexams", {
            answerList: JSON.stringify(backanswer),
            checktypeid: $("#checktypeid").val(),
            planstudentid: $('#planstudentid').val()
        }, function (res) {
            if (res.code == 10001) {
                tan.tips(res.msg, 1500);
                window.location.href = "studenthome.html";
            } else {
                tan.closew();
                tan.tips(res.msg, 1500);
            }
        }, 'json')
        var stuid = Cookie.getCookie("stuid");
        Cookie.setCookie(stuid, mapAndJson._mapToJson(cookieanswer));
    }


    //锚点快速定位题目位置
    function Gtoposition(objID) {
        var howlong = document.body.scrollTop + $(objID).offset().top
        $("html,body").animate({
            scrollTop: howlong
        }, 1000);
    }

    //右下角保存按钮
    layui.use(['util', 'laydate', 'layer'], function () {
        var util = layui.util,
            laydate = layui.laydate,
            layer = layui.layer;
        //固定块
        util.fixbar({
            bar1: '&#x1005',
            css: {
                right: 50,
                bottom: 132,
                width: 80,
            },
            bgcolor: '#9ec317',
            click: function (type) {
                if (type === 'bar1') {
                    tan.loading();
                    savepaper();
                }
            }
        });
    });
}

//点击边上题号时，题目跳转到对应位置
function gotofornum(e) {
    var objID = "#" + $(e).attr("gotoid")
    var howlong = document.body.scrollTop + $(objID).offset().top
    $("html,body").animate({
        scrollTop: howlong
    }, 1000);
}