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
				if (type != 10 && !strwhere==undefined) {
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=" + type + "&strwhere = " + value;
				}else if(type != 10 && strwhere==undefined){
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=" + type+ "&strwhere = ''";
				}else if(!strwhere==undefined){
					url = conf.apiurl + "/teaindex/geteplanliststrwhere?type=10 & strwhere = " + value;
				}
				alert(url)
				table.render({
					elem: '#table',
					id: 'table',
					url: url,
					title: '后台管理员用户数据表',
					height: "full-160",
					skin: 'line',
					even: true,
					cols: [ 
			     [ {field : 'eplanid', title:'编号', align:'center'}
			      ,{field : 'examname', title:'试卷名称', align:'center'}
				  ,{field : 'starttime',title : '测评时间',align : 'center'}
				  ,{field : 'examtpye',title : '状态',align : 'center'}
			      ,{field : 'bili', title:'班级完成比例 (实际测评/应测评)',align:'center'}
                  ,{title : '操作',toolbar : '#barDemo',align : 'center',}
			     ] 
			 ],
					page: {
						layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
						groups: 5,
						limit: 10,
						limits: [10, 20, 30, 40, 50],
						theme: '#1E9FFF',
					},
				});
			}
			/*点击查询加载表格数据结束*/
		//监听工具条
		table.on('tool(table)',function(obj){
			var data = obj.data;
			if(obj.event === 'edit'){
			layer.msg('ID：'+ data.id + ' 的查看操作');
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