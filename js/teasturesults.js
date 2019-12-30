//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
    layui.use([ 'table', 'form', 'layer', 'laydate', 'laytpl', 'element' ], function() {
		var table = layui.table, form = layui.form, 
			layer = layui.layer, $ = layui.jquery,
			laydate = layui.laydate, laytpl = layui.laytpl,
			element = layui.element;
	var url = location.search; //获取url中"?"符后的字串 ?vm_id=2
            var id;
			var classiid;
	            if(url.indexOf("?") != -1) {
	            str = url.substr(1);
	            strs = str.split("=");
	            id = strs[1];
				classiid = strs[3];
        }
		querylist();

			/* 点击查询对网站用户进行筛选 */
			$("#btnselfrontinfo").click(function() {
				querylist(); //调用局部刷新

			});

	function querylist() {
			//var url = conf.apiurl + "/teastu/getteastudent?eplanid=1&classid=KMMDZX2019090103001";
			var url = conf.apiurl + "/teastu/getteastudent?eplanid="+id+'&classid='+classiid+"&examtype=2";
			var strwhere = document.getElementById("title").value;
			if(!strwhere==""){
				//url = conf.apiurl + "/teastu/getteastudent?eplanid=1&classid=KMMDZX2019090103001";
				url = conf.apiurl + "/teastu/getteastudentstrwhere?eplanid="+id+"&examtype=2"+'&classid='+classiid+'&strwhere='+strwhere;
			}

		/*加载表格*/
		table.render({
			elem : '#project',
			id:'project',
			url : url,
			title : '后台通知管理数据表',
			skin : 'line',
			even : true,
			cols : [ 
			     [ {field : 'planstudentid', title:'序号', align:'center', hide:true}
			      ,{field : 'studentid', title:'学号', align:'center', hide:true}
			      ,{field : 'stuid', title:'学号', align:'center',width:220}
			      ,{field : 'realName', title:'学生姓名', align:'center',width:120}
				  ,{field : 'sex',title : '性别',align : 'center',width:80}
				  ,{field : 'eplanstudenttype',title : '状态',align : 'center',width:120
				  ,templet : function(p){
						var core = p.eplanstudenttype;
						if(core==0){
						var html = '<a><span class="tb_nostart">未开始</span></a>'
						return html;
						}else if(core==1){
						var html = '<a><span class="tb_finish">已结束</span></a>'
						return html;
						}else if(core==2){
						var html = '<a><span class="tb_beagin">进行中</span></a>'
						return html;
						}else{
						var html = '<a><span class="tb_nostart">缺考</span></a>'
						return html;
						}
					},}
				  ,{title : '完成题目数',align : 'center',width:110
					,templet : function(p){
						var all = p.allnum;
						var finish = p.finishnum;
						if (all="undefined") {
							all=0;
						}
						if (finish="undefined") {
							finish=0;
						}
						var html = '<div>'+finish+'/'+all+'</div>'

						html += '</div>'
						return html;
					},}
				  ,{field : 'starttime',title : '测评开始时间',align : 'center'}
				  ,{field : 'endtime',title : '测评结束时间',align : 'center',width:120}
				  ,{title : '缺考标记', templet: '#switchTpl',align : 'center',width:110}
                  ,{title : '操作',toolbar : '#barDemo',align : 'center',}
			     ] 
			 ],
			 page: true,
		});
		myAjax("get",url+"&limit=1&page=10", {}, function (data) {
			if (data.code == 0) {
				$("#spJY").html(data.data[0].examname);
				$("#spClass").html(data.data[0].gradename+data.data[0].className);
				layui.use('form', function () {
					var form = layui.form;
					form.render();
				});			
			}
		}, 'json');
	}
		//监听工具条
		table.on('tool(project)',function(obj){
			var data = obj.data;
			var plid = data.planstudentid;
			if(obj.event === 'edit1'){
				layer.confirm('您确定要强制交卷吗？', {
					btn: ['确定','取消'] //按钮
				  }, function(){
					myAjax("get", conf.apiurl + '/teastu/updatetype', {
						planstudentid:plid,
						type:1
					}, function (res) {
						if (res.code == 0) {
							layer.alert('交卷成功', {
							icon: 1,
							title: "提示"
							});
							
						} else {
							layer.alert('交卷失败', {
							icon: 2,
							title: "提示"
							});
						}
						querylist();
					}, 'json');
				  }, function(){

				  });
				
			} else if(obj.event === 'edit2'){
				layer.confirm('您确定要取消交卷吗？', {
					btn: ['确定','取消'] //按钮
				  }, function(){
					myAjax("get", conf.apiurl + '/teastu/updatetype', {
							planstudentid:plid,
							type:2
						}, function (res) {
							if (res.code == 0) {
								layer.alert('取消交卷成功', {
								icon: 1,
								title: "提示"
								});
							} else {
								layer.alert('取消交卷失败', {
								icon: 2,
								title: "提示"
								});
							}
							querylist();
						}, 'json');
					}, function(){
  
					});
			}
		});

		// 允许为空                                                                       
		form.on('switch(statusDemo)', function(obj){    
			var checked = obj.elem.checked;
			// 获取当前控件                                                                 
			var selectIfKey=obj.othis;                                                
			// 获取当前所在行                                                                
			var parentTr = selectIfKey.parents("tr");              
			// 获取“是否主键”的值                                                             
			var ifKey=parentTr.find(('td:eq(0)')).text().trim();
			console.log(checked);
			if(checked){
				layer.confirm('您确定要修改缺考状态吗？', {
					btn: ['确定','取消'] //按钮
				}, function(){
					myAjax("get", conf.apiurl + '/teastu/updatetype', {
							planstudentid:ifKey,
							type:4
						}, function (res) {
							if (res.code == 0) {
								layer.alert('设置缺考成功', {
								icon: 1,
								title: "提示"
								});
							} else {
								layer.alert('设置缺考失败', {
								icon: 2,
								title: "提示"
								});
							}
							querylist();
						}, 'json');
					}, function(){

					}); 
			}else{
				layer.confirm('您确定要修改缺考状态吗？', {
					btn: ['确定','取消'] //按钮
				}, function(){
					myAjax("get", conf.apiurl + '/teastu/updatetype', {
							planstudentid:ifKey,
							type:2
						}, function (res) {
							if (res.code == 0) {
								layer.alert('取消缺考成功', {
								icon: 1,
								title: "提示"
								});
							} else {
								layer.alert('取消缺考失败', {
								icon: 2,
								title: "提示"
								});
							}
							querylist();
						}, 'json');
					}, function(){

					});
			}														
		}); 		                                                                  
	});


}