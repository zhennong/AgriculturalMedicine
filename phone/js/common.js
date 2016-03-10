/* global uexWindow, appcan */

var Tools = {

    //纯静态tab切换
    setTab: function (name, cursel, n) {
        for (i = 1; i <= n; i++) {
            var menu = document.getElementById(name + i);
            var con = document.getElementById("con_" + name + "_" + i);
            menu.className = i == cursel ? "hover" : "";
            con.style.display = i == cursel ? "block" : "none";
        }
    },

    //html转义解析
    html_encode: function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&gt;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },
    html_decode: function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&gt;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    },
    htmlEncode: function (str) {
        var div = document.createElement("div");
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    },
    htmlDecode: function (str) {
        var div = document.createElement("div");
        div.innerHTML = str;
        return div.innerHTML;
    },
    
    /**
     * 获取登录用户信息
     */
    getUserId: function(){
    	var userid = appcan.locStorage.getVal('userid');
    	if(userid == null || userid == ""){	 
    	    Tools.toast('请先登录！');
            uexWindow.close();  
    	    Tools.openUrl('login');
    	}
    },
    
    /**
     * 获取登录用户名
     */
    getUserName: function(){
        var username = appcan.locStorage.getVal('username');
        $("#username").html(username);
    },
        
    /**
     * 退出当前登录用户
     * @returns {undefined}
     */
    logout: function(){    	    	
    	// appcan.locStorage.remove('userid');   
        // appcan.locStorage.remove('username');
        //清空全部存储
        appcan.locStorage.remove();        
        appcan.window.openToast("退出登录成功！", 3000, '5', '0');  
        uexWindow.close();  
        Tools.openUrl('index');
    },
    
    /**
     * 打开新链接
     * @param {name} 打开新Url
     * @param {id} 是否关闭当前页
     * @param {ref_name} 刷新页面
     */
    openUrl: function(name,id,ref_name){	
    	if(id == 1){
    	   appcan.window.close();	
        }
    	appcan.window.open({
    	    name:name,
    	    dataType:0,
    	    data:name + ".html",
    	    aniId:5,
    	    type:0,
    	    width:0,
    	    height:0,
    	    animDuration:0
       });  
       if(ref_name != ""){
           Tools.refresh(ref_name);
       } 
    },
    
    //关闭当前页
    closeUrl: function(ref_name){
        appcan.window.close();
        if(ref_name != ""){
            Tools.refresh(ref_name);
        }
    },
    
    //浮动窗口
    toast: function(mess){
        appcan.window.openToast(mess, 3000, '8','0');
    },
    
    // json转字符串
    json2string : function(obj){
        return JSON.stringify(obj);
    },
    
    // 打印出json数据
    json_data_show : function(json){
        alert(Tools.json2string(json));
    },
    
    // 刷新页面
    refresh : function(name){
       appcan.window.evaluateScript({
            name:name,
            scriptContent:'location.reload()'
       });
    }
}

/** * 
 * 全站通用用户ID
 */
var user_id = appcan.locStorage.getVal('userid');

//底部固定判断是否登录
$(function(){    
    $("#home").click(function(){
        Tools.openUrl('index');
    })
    
    $("#ask_center").click(function(){
        Tools.openUrl('questions_index');
    }) 
    
    $("#member_center").click(function(){
        if(user_id == null){
            Tools.openUrl('login');
        }else{
            Tools.openUrl('member');
        } 
    }) 
})



/**
 * 返回上一页
 */
$(function() {
    $("#back").click(function(){
        appcan.window.close();
        //uexWindow.windowForward();
        //alert(1);
    })
    
    $(".list_img #id2_1").css({"float":"right"});
    
})