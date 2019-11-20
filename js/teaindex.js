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
			url : 'http://localhost:8080/SchoolPsychologicalAssessmentWeb/teaindex/geteplanlist',
			title : '后台通知管理数据表',
			height: "full-160",
			skin : 'line',
			even : true,
			cols : [ 
			     [ {field : 'eplanid', title:'编号', align:'center'}
			      ,{field : 'examname', title:'试卷名称', align:'center'}
				  ,{field : 'starttime',title : '测评时间',align : 'center'}
				  ,{field : 'examtpye',title : '状态',align : 'center'}
			      ,{field : 'bili', title:'班级完成比例 (实际测评/应测评)',align:'center'}
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