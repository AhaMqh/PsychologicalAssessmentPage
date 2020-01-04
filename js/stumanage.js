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
				
				var url = conf.apiurl + "/teastuexam/getstubyclass?classid=" + id;
				var strwhere = document.getElementById("title").value;
				if(!strwhere==""){
					url = conf.apiurl + "/teastuexam/getstubyclassstr?classid=" + id+"$strwhere="+strwhere;
				}
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

			
			$(".resetpwd").click(function () {
				layer.open({
					skin: 'demo-class',
					type: 1,
					area: ['500px', '260px'],
					title: '班级密码重置',
					content: $("#modifypwd"),
					shade: 0.6,
					btn: ['确认', '取消'],
					yes: function(index){
						var val = document.getElementById("ppassword").value;//获取select对象
						console.log(val);
						var enpwd = hex_md5(fix(Encryption_key,val));
							layer.msg(
								myAjax("get", conf.apiurl + '/teastuexam/updatebyclass', {
								classid:id,
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
					},
					cancel: function (layero, index) {
							layer.close(index);
					}

				})
			})
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