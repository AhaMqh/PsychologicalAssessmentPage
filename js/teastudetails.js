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
				console.log(strs);
	            id = strs[1];
				classiid = strs[3];
        }
		querylist();

			/* 点击查询对网站用户进行筛选 */
			$("#btnselfrontinfo").click(function() {
				querylist(); //调用局部刷新

			});

	function querylist() {

			var url = conf.apiurl + "/teastu/getteastudent?eplanid="+id+'&classid='+classiid+"&examtype=1";
			var strwhere = document.getElementById("title").value;
			if(!strwhere==""){
				url = conf.apiurl + "/teastu/getteastudentstrwhere?eplanid="+id+'&classid='+classiid+'&strwhere='+strwhere+"&examtype=1";
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
			      ,{field : 'stuid', title:'学号', align:'center'}
			      ,{field : 'realName', title:'学生姓名', align:'center'}
				  ,{field : 'sex',title : '性别',align : 'center'}
				  ,{field : 'paperName',title : '评测试卷名称',align : 'center'}
				  ,{field : 'examstartime',title : '测评时间',align : 'center'}
				  ,{field : 'eplanstudenttype',title : '状态',align : 'center'
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
                  ,{title : '操作',toolbar : '#barDemo',align : 'center',}
			     ] 
			 ],
			 page: true,
		});
		myAjax("get",url+"&limit=1&page=10", {}, function (data) {
			if (data.code == 0) {
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
			if(obj.event === 'edit1'){
				var epid = data.eplanid;
				var stuid = data.studentid;
				window.location.href = "试卷详情.html?eplanid="+epid+"=stuid="+stuid;
			} else if(obj.event === 'del'){
			layer.confirm('真的删除行么', function(index){
				obj.del();
				layer.close(index);
			});
			} else if(obj.event === 'edit'){
			layer.alert('编辑行：<br>'+ JSON.stringify(data))
			}
		});
	});


}