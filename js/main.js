layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate;

    //日期
    laydate.render({
        elem: '#date'
    });
    laydate.render({
        elem: '#date1'
    });

    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');

    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '请输入字符';
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        content: function (value) {
            layedit.sync(editIndex);
        }
    });

    //监听指定开关
    form.on('switch(switchTest)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });

    //表单赋值
    layui.$('#LAY-component-form-setval').on('click', function () {
        form.val('example', {
            "username": "贤心" // "name": "value"
                ,
            "password": "123456",
            "interest": 1,
            "like[write]": true //复选框选中状态
                ,
            "close": true //开关状态
                ,
            "sex": "女",
            "desc": "我爱 layui"
        });
    });

    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function () {
        var data = form.val('example');
        alert(JSON.stringify(data));
    });
});

layui.use(['laypage', 'layer'], function () {
    var laypage = layui.laypage,
        layer = layui.layer;

    //自定义样式
    laypage.render({
        elem: 'demo2',
        count: 100,
        theme: '#5EAAB7'
    })
    //调用分页查看layui分页文档
});


layui.use('layer', function(){ //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
    
    //触发事件
    var active = {
      setTop: function(){
        var that = this; 
        //多窗口模式，层叠置顶
        layer.open({
        });
      } 
      ,notice: function(){
        //示范一个公告层
        layer.open({
          type: 1
          ,title: false //不显示标题栏
          ,closeBtn: false
          ,area: '300px;'
          ,shade: 0.8
          ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
          ,btn: ['确定', '取消']
          ,btnAlign: 'c'
          ,moveType: 1 //拖拽模式，0或者1
          ,content: '<div class="edit_pwd"><i class="layui-icon layui-icon-password icon_pwd"></i>修改密码</div><div style="padding: 20px; line-height: 22px; background-color: #fff; color: #333333; ">旧密码：<br> <input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"><br>新密码：<br><input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"><br>确认新密码：<br><input type="text" name="username" lay-verify="title" autocomplete="off" placeholder="" class="layui-input input_edit"></div>'
          ,success: function(layero){
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').attr({
              href: '登录.html'
              ,target: '_blank'
            });
          }
        });
      }
      ,confirmTrans: function(){
        //配置一个透明的询问框
        layer.msg('确定要强制交卷吗？', {
          time: 20000, //20s后自动关闭
          btn: ['确定', '取消']
        });
      }
      ,cancel: function(){
        //配置一个透明的询问框
        layer.msg('确定要取消交卷吗？', {
          time: 200000, //20s后自动关闭
          btn: ['确定', '取消']
        });
      }
    };
    
    $('#layerDemo .layui-btn').on('click', function(){
      var othis = $(this), method = othis.data('method');
      active[method] ? active[method].call(this, othis) : '';
    });
    $('#navbar_edit .edit_info').on('click', function(){
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
      });
    
  });
  function f(edit){
    var obj = document.getElementById(edit);
    if(obj.style.display=="block"){
    obj.style.display = "none";  
    }else{　　　　　　　　　　obj.style.display = "block";
    }       
}
  
  
