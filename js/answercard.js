//将页面执行脚本单独写在外部js中，在html的head中进行引用，由于牵扯到dom的操作，所以要使用window.onload来包装一下
window.onload = function(){
    layui.use([ 'table', 'form', 'layer', 'laydate', 'laytpl', 'element' ], function() {
		var table = layui.table, form = layui.form, 
			layer = layui.layer, $ = layui.jquery,
			laydate = layui.laydate, laytpl = layui.laytpl,
			element = layui.element;
			var url = location.search; //获取url中"?"符后的字串 ?vm_id=2
            var planstuid;
	            if(url.indexOf("?") != -1) {
	            str = url.substr(1);
	            strs = str.split("=");
	            planstuid = strs[1];
	console.log(planstuid);
        }
		myAjax("get", conf.apiurl + '/teastuexam/getcheckrepot', {
			planstuid:planstuid
		}, function (res) {
			if (res.code == 10001) {
				var checkreport = new Vue({
					el: '#app',
					data: {
						info: res.resultObject,
						usertype: true
					}
				})
			} else {
				//setTimeout(window.location.href = "login.html", 3000);
			}
		}, 'json'); 		                                                                  
	});


}