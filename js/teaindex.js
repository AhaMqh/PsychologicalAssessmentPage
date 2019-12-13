//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
    layui.use([ 'table', 'form', 'layer', 'laydate', 'laytpl', 'element' ], function() {
		var table = layui.table, form = layui.form, 
			layer = layui.layer, $ = layui.jquery,
			laydate = layui.laydate, laytpl = layui.laytpl,
			element = layui.element;
	
			

			querylist();

			/* 点击查询对网站用户进行筛选 */
			$("#btnselfrontinfo").click(function() {
				//alert("1");
				querylist(); //调用局部刷新
				

			});

			function querylist() {
				var url = conf.apiurl + "/teaindex/geteplanlist";
				var type = +$("#queryrole").val();
				var strwhere = document.getElementById("title").value; 
				var value = strwhere.value;
				if (type != 10 && !strwhere=="") {
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=" + type + "&strwhere = " + value;
				}else if(type != 10 && strwhere==""){
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=" + type+ "&strwhere = ''";
				}else if(!strwhere==""){
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=10 & strwhere = " + value;
				}
				table.render({
					elem: '#table',
					id: 'table',
					url: url,
					title: '后台管理员用户数据表',
					even: true,
					cols: [ 
			     [ {field : 'eplanid', title:'编号', align:'center',width : 60}
			      ,{field : 'examname', title:'试卷名称', align:'center',width : 290}
				  ,{title : '测评时间',align : 'center',width : 300
				  ,templet : function(p){
					var Stime = p.starttime;
					var Etime = p.endtime;
					var html = '<div>'+Stime+'~'+Etime+'</div>'

					html += '</div>'
					return html;
					},}
				  ,{field : 'examtpye',title : '状态',align : 'center',width : 120
					,templet : function(p){
					var core = p.examtpye;
					if(core==0){
						var html = '<a><span class="tb_nostart">未开始</span></a>'
						return html;
						}else if(core==1){
						var html = '<a><span class="tb_finish">已结束</span></a>'
						return html;
						}else{
						var html = '<a><span class="tb_beagin">进行中</span></a>'
						return html;
					}
					},
				}
				  ,{title:'人数完成比例 (实际测评/应测评)',align:'center',width : 290
				  ,templet : function(p){
					  var core = p.bili;
					  var html = '<div class="layui-progress pro_bar" lay-showPercent="true">'
					  html += '<div class="layui-progress-bar pro_b" lay-percent="'+core+'"></div>'

					  html += '</div>'
					  return html;
				  },
				},{title : '操作',toolbar : '#barDemo',align : 'center'}
			     ] 
			 ],
					
			 page: true,
				});
				table.reload();
			}
			/*点击查询加载表格数据结束*/
		//监听工具条
		table.on('tool(table)',function(obj){
			var data = obj.data;
			if(obj.event === 'edit'){
				var epid = data.eplanid;
				location.href = "../测评班级.html?eplanid=" + epid;
			}
		});

	});


}