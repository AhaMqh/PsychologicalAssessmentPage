//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
    layui.use([ 'table', 'form', 'layer', 'laydate', 'laytpl', 'element' ], function() {
		var table = layui.table, form = layui.form, 
			layer = layui.layer, $ = layui.jquery,
			laydate = layui.laydate, laytpl = layui.laytpl,
			element = layui.element;

			var url = location.search; //获取url中"?"符后的字串 ?vm_id=2
            var id;
	            if(url.indexOf("?") != -1) {
	            str = url.substr(1);
	            strs = str.split("=");
	            id = strs[1];
            }

			querylist();

			/* 点击查询对网站用户进行筛选 */
			$("#btnselfrontinfo").click(function() {
				//alert("1");
				querylist(); //调用局部刷新

			});

function querylist() {
		/*加载表格*/
		table.render({
			elem : '#project',
			id:'project',
			url : 'http://localhost:8080/SchoolPsychologicalAssessmentWeb/teaclass/geteplanclasslist?eplanid=' + id,
			title : '后台通知管理数据表',
			skin : 'line',
			even : true,
			cols : [ 
			     [ {field : 'eplanid', title:'编号', align:'center'}
			      ,{field : 'classid', title:'编号', align:'center', hide:true}
			      ,{field : 'gradename', title:'年级', align:'center'}
				  ,{field : 'className',title : '班级',align : 'center'}
				  ,{field : 'bili',title : '测评人数比例 (实际测评/应测评)',align : 'center'
				  ,templet : function(p){
					  var core = p.bili;
					  var html = '<div class="layui-progress pro_bar" lay-showPercent="true">'
					  html += '<div class="layui-progress-bar pro_b" lay-percent="'+core+'"></div>'

					  html += '</div>'
					  return html;
				  },
				}
			      ,{field : 'eplamclasstype', title:'状态',align:'center'
					,templet : function(p){
						var core = p.eplamclasstype;
						if(core==0){
						var html = '<a id="edit1" lay-event="edit1"><span class="tb_nostart">未开始</span></a>'
						return html;
						}else if(core==1){
						var html = '<a id="edit2" lay-event="edit2"><span class="tb_finish">已结束</span></a>'
						return html;
						}else{
						var html = '<a id="edit3" lay-event="edit3"><span class="tb_beagin">进行中</span></a>'
						return html;
						}
						
					},
				}
			     ] 
			 ],
			 page: true,
		});
	}
	tan.loading();
			//获取登录老师session
			myAjax("get", conf.apiurl + '/login/getlogintea', {}, function (res) {
				if (res.code == 10001) {
					var stuinfor1 = new Vue({
						el: '.stuinfo1',
						data: res.resultObject
					})
					tan.closew();
				} else {
					tan.closew();
					tan.tips(res.msg, 1000);
					setTimeout(window.location.href = "登录.html", 3000);
				}
			}, 'json');
		//监听工具条
		table.on('tool(project)',function(obj){
			var data = obj.data;
			if(obj.event === 'edit1'){
				layer.alert('此次考试还未开始', {
				icon: 2,
				title: "提示"
				});
			} else if(obj.event === 'edit2'){
				var epid = data.eplanid;
				var classiid = data.classid;
				window.location.href = "测评结果.html?eplanid="+epid+"=classid="+classiid;
			} else if(obj.event === 'edit3'){
				window.location.href = "测评详情.html"
			}
		});
	});


}