//获取全部分类
function getCategoryRoot(){    
    $.ajax({  
        type: "post",  
        url: config.apiUrl,  
        data: {action: "get_ask_category_info",pid:0},  
        dataType : 'jsonp',  
        jsonp:"jsoncallback",  
        success: function(data) {  
            if(data.status != 210){   
                $.each(data.category_info,function(name,value){  
                    $("#first").append("<option value='" + data.category_info[name]['id'] + "'>" + data.category_info[name]['cat_name'] + "</option>");                  
                })
            }            
        }  
    });
}

//当页面加载完获取全部栏目
$(document).ready(function() {      
    //首次一级下拉
    getCategoryRoot();
        
    //加载首次一级下拉
    $("#first").change(function() {  
        var id = $(this).val();  
        $.ajax({  
            type: "post",  
            url: config.apiUrl,  
            data: {action: "get_ask_category_info",pid:id},  
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            success: function(data) {                  
                if(data.status != 210){
                    $("#second").show().empty();
                    $("#third").hide();                   
                    $("#second").append("<option value=''>请选择</option>")                    
                    $.each(data.category_info,function(name,value){ 
                        $("#second").append("<option value='" + data.category_info[name]['id'] + "'>" + data.category_info[name]['cat_name'] + "</option>");
                    })
                }else{
                    $("#second").hide();           
                    $("#third").hide();  
                }
            }  
        });  
    });    
    
    //加载二级下拉
    $("#second").change(function() {  
        var id = $(this).val();  
        $.ajax({  
            type: "post",  
            url: config.apiUrl,  
            data: {action: "get_ask_category_info",pid:id},  
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            success: function(data) {
                if(data.status != 210){
                    $("#third").show().empty();
                    $("#third").append("<option value=''>请选择</option>")
                    $.each(data.category_info,function(name,value){ 
                        $("#third").append("<option value='" + data.category_info[name]['id'] + "'>" + data.category_info[name]['cat_name'] + "</option>");
                    })
                }else{
                    $("#third").hide();
                }
                
            }  
        });  
    }); 
    
    //赋值地区ID
    $("select.category").change(function(){
        var id = $(this).val();
        $("input[name='cat_id']").val(id);
        
    })    
});  


