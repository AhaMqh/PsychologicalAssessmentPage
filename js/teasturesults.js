//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
    layui.use([ 'table', 'form', 'layer', 'laydate', 'laytpl', 'element' ], function() {
		var table = layui.table, form = layui.form, 
			layer = layui.layer, $ = layui.jquery,
			laydate = layui.laydate, laytpl = layui.laytpl,
			element = layui.element;
	
		/*加载表格*/
		table.render({
			elem : '#project',
			id:'project',
			url : 'http://localhost:8080/SchoolPsychologicalAssessmentWeb/teastu/getteastudent?eplanid=1&classid=KMMDZX2019090102001',
			title : '后台通知管理数据表',
			height: "full-160",
			skin : 'line',
			even : true,
			cols : [ 
			     [ {field : 'planstudentid', title:'序号', align:'center'}
			      ,{field : 'stuid', title:'学号', align:'center'}
			      ,{field : 'realName', title:'学生姓名', align:'center'}
				  ,{field : 'sex',title : '性别',align : 'center'}
				  ,{field : 'paperName',title : '评测试卷名称',align : 'center'}
				  ,{field : 'examstartime',title : '测评时间',align : 'center'}
				  ,{field : 'eplanstudenttype',title : '状态',align : 'center'}
                  ,{title : '操作',toolbar : '#barDemo',align : 'center',}
			     ] 
			 ],
			 page: true,
		});
		//监听工具条
		table.on('tool(project)',function(obj){
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