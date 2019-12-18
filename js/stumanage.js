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
				myAjax("get", conf.apiurl+"/teastuexam/getteaclass",{}, function (data) {
					console.log(data.data);
					for (var k in data.data) 
					{
					$(".SelectPaymentMode").append("<option value='" + data.data[k].classid + "'>" + data.data[k].gradename + data.data[k].className + "</option>");
					}
					layui.use('form', function () {
						var form = layui.form;
						form.render();
					});
				}, 'json');

				var url = conf.apiurl + "/teastuexam/getstubyclass";
				table.render({
					elem: '#project',
					id: 'project',
					url: url,
					title: '后台管理员用户数据表',
					skin : 'line',
					even: true,
					cols: [ 
			     [ {field : 'id', title:'编号', align:'center'}
				  ,{field : 'stuid', title:'学号', align:'center',width : 280}
				  ,{title : '班级',align : 'center',width : 230
				  ,templet : function(p){
					var gname = p.gradename;
					var cname = p.className;
					var html = '<div>'+gname+cname+'</div>'

					html += '</div>'
					return html;
					},}
				  ,{field : 'realName',title : '姓名',align : 'center',width : 200}
				  ,{field : 'sex',title : '性别',align : 'center',width : 120}
				  ,{field : 'type', title:'操作',align:'center'
					,templet : function(p){
						var html = '<a id="edit" lay-event="edit"><span class="tb_beagin">重置密码</span></a>'
						return html;
						}
						
					}
			     ] 
			 ],
					
			 page: true,
			 limit: 9 //每页默认显示的数量
				});
			}
			/*点击查询加载表格数据结束*/
		//监听工具条
		table.on('tool(project)',function(obj){
			var data = obj.data;
			if(obj.event === 'edit'){
				
				var stuid = data.id;
				//默认prompt'密码是'+enpwd + '学生学号是' + stuid
				layer.prompt({title : '请输入密码'},function(val, index){
				var enpwd = hex_md5(fix(Encryption_key,val));
				layer.msg(
					myAjax("get", conf.apiurl + '/teastuexam/updatebyid', {
					stuid:stuid,
					pwd:enpwd
				}, function (res) {
					if (res.code == 0) {
						layer.alert('修改成功', {
						icon: 1,
						title: "提示"
						});
					} else {
						layer.alert('修改失败', {
						icon: 2,
						title: "提示"
						});
					}
				}, 'json')
				);
				layer.close(index);
				});
			}
		});

	});


}