// 学生考试测评页面js
window.onload = function () {
    
    //获取登录学生session
    jQuery(function($){
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
            setTimeout(window.location.href = "登录.html", 3000);
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
            setInterval(function(){
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
                    },1000)
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
                        var choiceoption = res.resultObject[i].choiceoption; //学生已选选项
                        var planstudentid = res.resultObject[i].planstudentid; //学生测评计划id
                        var optionContentstr = aoptionContent.split("&"); //将单个选项分成数组
                        var answerall = [];
                        for (j = 0; j < optionContentstr.length - 1; j++) {
                            var newoptionContent = optionContentstr[j].split(","); //得到一个选项的内容和分值
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
                            answerid: answerid,
                            answerall: answerall,
                            choiceoption: choiceoption,
                            planstudentid: planstudentid
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

    var backanswer = []; //将试卷答案暂存到这
    layui.use(['form'], function () {
        var form = layui.form
        form.on('radio', function (data) {
            //console.log(data.elem); //得到radio原始DOM对象
            //console.log(data.value); //被点击的radio的value值
            var domvlue = data.elem;
            var anserdata = {};
            var answerid = domvlue.attributes.answerid.value;
            var planstudentid = domvlue.attributes.planstudentid.value;
            var optionscore = domvlue.attributes.optionscore.value;
            var useranswer = domvlue.attributes.useranswer.value;
            var choiceoption = domvlue.attributes.choiceoption.value;
            var titnumClassName = "." + domvlue.attributes.name.value;
            anserdata = {
                answerid: answerid,
                planstudentid: planstudentid,
                optionscore: optionscore,
                useranswer: useranswer,
                choiceoption: choiceoption,
            }
            //点击时改变边上题号的颜色
            if (!$(titnumClassName).hasClass("choisetab")) {
                $(titnumClassName).addClass("choisetab");
            }

            //判断之前数组中是否存在该字段
            let status = backanswer.some(item => item.answerid === answerid)
            if (status) {
                backanswer = backanswer.map(item => item.answerid === anserdata.answerid ? anserdata : item)
                console.log(backanswer);
            } else {
                backanswer.push(anserdata);
            }

        });
    });

    //单保存试卷
    function savepaper() {
        myAjax("post", conf.apiurl + "/studentexam/savestuanswer", {
            answerList: JSON.stringify(backanswer)
        }, function (res) {
            tan.closew();
            tan.tips(res.msg, 1500);
        }, 'json')
    }

    //点击保存按钮保存试卷
    eventUtil.addEventHandle($(".exam_save")[0], 'click', function (e) {
        tan.loading();
        savepaper();
    })

    //每10分钟自动保存一次
    setInterval("savepaper()", 1000 * 60 * 10);

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
            answerList: JSON.stringify(backanswer)
        }, function (res) {
            if (res.code == 10001) {
                tan.tips(res.msg, 1500);
                setTimeout(window.location.href = "学生首页.html", 3000);
            } else {
                tan.closew();
                tan.tips(res.msg, 1500);
            }
        }, 'json')
    }


    //锚点快速定位题目位置
    function Gtoposition(objID) {
        var howlong = document.body.scrollTop + $(objID).offset().top
        $("html,body").animate({
            scrollTop: howlong
        }, 1000);
    }
}



//点击边上题号时，题目跳转到对应位置
function gotofornum(e) {
    var objID = "#" + $(e).attr("gotoid")
    var howlong = document.body.scrollTop + $(objID).offset().top
    $("html,body").animate({
        scrollTop: howlong
    }, 1000);
}