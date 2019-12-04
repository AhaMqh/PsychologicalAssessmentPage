// 学生考试测评页面js
window.onload = function () {
    
    var url = location.search; //获取url中"?"符后的字串 ?vm_id=2
            var id;
            var stuid;
	            if(url.indexOf("?") != -1) {
	            str = url.substr(1);
	            strs = str.split("=");
	            id = strs[1];
	            stuid = strs[3];
            }

    var datatime;
    myAjax("get", conf.apiurl + '/teastuexam/getstuinfo', {
        stuid:stuid
    }, function (res) {
				if (res.code == 10001) {
					var stuinfor2 = new Vue({
                        el: '.stuinfo2',
                        data: res.resultObject
                    })
                    tan.closew();
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
                myAjax('post', conf.apiurl + '/teastuexam/getallpaper', {
                    eplanid:id,
                    studentid:stuid
                }, function (res) {
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