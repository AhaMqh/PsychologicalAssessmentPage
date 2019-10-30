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
                return '标题至少得5个字符啊';
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

//表格渲染js
layui.use('table', function(){
    var table = layui.table;
    
    table.render({
      elem: '#test'
      ,url:''
      ,toolbar: true
      ,totalRow: true
      ,title: '班级心理测评答题卡'
      ,cols: [[
        {field:'name', title:'姓名', width:120, fixed: 'left', unresize: true, sort: true, totalRowText: '合计行'}
        ,{field:'scorelist', title:'选项'}
      ]]
      ,data:[{
          "name":"李小安",
          "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
      },
      {
          "name":"李大宝",
          "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
      },
      {
        "name":"李鑫",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"刘曦",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"孙大伟",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"发隋代",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"刘穗丹",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"念云飞",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"蒋劲夫",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },
    {
        "name":"蔡徐坤",
        "scorelist":"1.A 2.D 3.C 5.A 6.D 7.C 9.A 10.D 11.C 13.A 14.D 15.C 17.A 18.D 19.C 21.A 22.D 23.C 25.A 26.D 27.C 29.A 30.D 31.C 33.A 34.D 35.C 37.A 38.D 39.C 41.A 42.D 43.C 45.A 46.D 47.C 49.A 50.D 51.C 53.A 54.D 55.C 57.A 58.D 59.C 61.A 62.D 63.C 65.A 66.D 67.C 69.A 70.D 71.C 73.A 74.D 75.C 77.A 78.D 79.C "
    },

    ]
      ,page: false
      ,response: {
        statusCode: 200 //重新规定成功的状态码为 200，table 组件默认为 0
      }
      ,parseData: function(res){ //将原始数据解析成 table 组件所规定的数据
        return {
          "code": res.status, //解析接口状态
          "msg": res.message, //解析提示文本
          "count": res.total, //解析数据长度
          "data": res.rows.item, //解析数据列表
        };
      }
    });
  });
  


