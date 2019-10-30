<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="../perEvaluationResult/importhead.jsp" %>
<%@ page import="java.text.*" %>
<%
	String id = request.getParameter("id");      
	int checkid = Integer.parseInt(id);
	VCheckReport checkreprot = DAOFactory.getCheckReportDAO().getVCheckReportByID(checkid);
	List<TCheckReportItem> list = DAOFactory.getCheckReoprtItemDAO().getCheckReportItemsByCheckID(checkid);
	
	//将checkreprot中的itemscorestr字段中存储的字符串转换为list
	String[] itemscores = {};
	if(checkreprot.getItemscorestr()!=null){
		itemscores = checkreprot.getItemscorestr().split("#");
	}
	Format f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	Date d = (Date)f.parseObject(checkreprot.getChecktime());
	Format f2 = new SimpleDateFormat("yyyyMMdd");
	String checkdate = f2.format(d);
	//out.println(list.size());
	request.setAttribute("report", checkreprot);
	request.setAttribute("scorelist", itemscores);
	request.setAttribute("itemlist", list);
	request.setAttribute("checkdate", checkdate);

 %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="../js/jsuntil/FileSaver.js"></script>
    <script src="../js/jsuntil/jquery.wordexport.js"></script>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
        body{
            font-family: 宋体;
            font-size: 12px;
             padding-bottom:20px;
        }
        #baseInfo{
            list-style: none;
        }
        #baseInfo li{
            float: left;
            width: 200px;
        }
        table,tr,td{
            padding: 0;
            height: 28px;
        }
        .weidu{
            margin-top: 20px;
        }
        
        .MsoNormalTable{
            mso-style-name:普通表格;
            mso-style-parent:"";
            mso-style-noshow:yes;
            mso-tstyle-rowband-size:0;
            mso-tstyle-colband-size:0;
            mso-padding-alt:0.0000pt 5.4000pt 0.0000pt 5.4000pt;
            mso-para-margin:0pt;
            mso-para-margin-bottom:.0001pt;
            mso-pagination:widow-orphan;
            font-family:'Times New Roman';
            font-size:10.0000pt;
            mso-ansi-language:#0400;
            mso-fareast-language:#0400;
            mso-bidi-language:#0400;
        }
    </style>
</head>
<body>
    <input type="button" value="保存为Word"  onclick="toWord();">
    <div id="export_word" style="margin:auto;width:90%;margin-bottom：20px;">
        <div style="text-align:center;height:30px;line-height:30px;">
            <h3>${report.checkname}</h3> 
        </div> 
        <div>
            <table style="text-align: center; border-collapse:collapse;width:100%;mso-table-layout-alt:fixed;border:none;mso-border-left-alt:0.5000pt solid windowtext;mso-border-top-alt:0.5000pt solid windowtext;mso-border-right-alt:0.5000pt solid windowtext;mso-border-bottom-alt:0.5000pt solid windowtext;mso-border-insideh:0.5000pt solid windowtext;mso-border-insidev:0.5000pt solid windowtext;mso-padding-alt:0.0000pt 5.4000pt 0.0000pt 5.4000pt ;" class="MsoNormalTable" border="1">
                <tr>
                    <td style="width:33%">登录名：${report.username }</td>
                    <td style="width:33%">姓名：${report.realName }</td>
                    <td style="width:34%;">性别：${report.sex }</td>
                </tr>
                <tr>
                    <td>出生日期：2004-03-25</td>
                    <td colspan="2">完成时间：${report.checktime }</td>
                </tr>
            </table>
        </div>
        <div>
            <h4>一、测验简介</h4>
            <p>
                    ${report.checkintro }
            </p>
        </div>
     <c:forEach items="${itemlist }" var="obj">
     	<br>
        <div class="weidu">
            <table style="text-align: center; border-collapse:collapse;width:100%;mso-table-layout-alt:fixed;border:none;mso-border-left-alt:0.5000pt solid windowtext;mso-border-top-alt:0.5000pt solid windowtext;mso-border-right-alt:0.5000pt solid windowtext;mso-border-bottom-alt:0.5000pt solid windowtext;mso-border-insideh:0.5000pt solid windowtext;mso-border-insidev:0.5000pt solid windowtext;mso-padding-alt:0.0000pt 5.4000pt 0.0000pt 5.4000pt ;" class="MsoNormalTable" border="1">
                <tr>
                    <td colspan="3" style="background-color:darkgray;">
                        维度 ${obj.sortnum }：${obj.itemname }
                    </td>
                </tr>
                <tr>
                    <td style="width:33%">原始分：${obj.originalscore }</td>
                    <td style="width:33%">标准分：${obj.standardscore }</td>
                    <td style="width:34%;">状态：${obj.status }</td>
                </tr>
                <tr>
                    <td colspan="3" style="text-align:left">
                            【结果描述】
           ${obj.resultintro }                 
                    </td>
                </tr>
                <tr>
                    <td colspan="3" style="text-algin:left">
                            【心理建议】
           ${obj.suggestion }
                    </td>
                </tr>
            </table>
        </div>
	</c:forEach>
	
	<br>
	<div class="weidu">
             <table style="text-align: center; border-collapse:collapse;width:100%;mso-table-layout-alt:fixed;border:none;mso-border-left-alt:0.5000pt solid windowtext;mso-border-top-alt:0.5000pt solid windowtext;mso-border-right-alt:0.5000pt solid windowtext;mso-border-bottom-alt:0.5000pt solid windowtext;mso-border-insideh:0.5000pt solid windowtext;mso-border-insidev:0.5000pt solid windowtext;mso-padding-alt:0.0000pt 5.4000pt 0.0000pt 5.4000pt ;" class="MsoNormalTable" border="1">
                <tr>
                   <td colspan="10" style="background-color:darkgray;">三 、原始答卷</td>
                </tr>
              <c:forEach begin="0" end="99" step="1" var="i">
	               <c:if test="${(i+1)%10==1}">
		                <tr>
		                	<td>${scorelist[i]}</td>
		           </c:if>
		           <c:if test="${(i+1)%10!=1 && (i+1)%10!=0 && (i+1)%10<=9 }">
		                <td>${scorelist[i]}</td>
		                
		           </c:if>        
	               <c:if test="${(i+1)%10==0}">
	               			<td>${scorelist[i]}</td>
		                </tr>
		           </c:if> 
              </c:forEach>
              		
            </table>
          </div>	
    </div>
    
</body>
<script>
    function toWord(){
        $("#export_word").wordExport("<%=checkreprot.getCheckname() %>"+"-"+"<%=checkreprot.getRealName()%>" + "_"+"<%=checkdate%>");
    }
    
     $(function () {
		$('tr[style!="height:200px;"]').css('height',38);
	})
</script>
</html>