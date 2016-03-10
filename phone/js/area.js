//获取地区（通用）
function getAreas(id){
    $.ajax({  
        type: "get",  
        url: config.apiUrl,  
        data: {action: "get_area_parent_nodes",areaid:id},  
        dataType : 'jsonp',  
        jsonp:"jsoncallback",  
        success: function(data) {            
            $.each(data.parent_areas,function(index,value){
                if(data.length > 1){       
                    $("#area").html(data.parent_areas[0]['areaname'] + data.parent_areas[1]['areaname'] + data.parent_areas[2]['areaname']);
                }else{
                    $("#area").html(data.parent_areas[0]['areaname'] + data.parent_areas[1]['areaname']);
                }   
            })
        }  
    });
}

//获取全部省份
function getAreaProvince(){
    $.ajax({  
        type: "post",  
        url: config.apiUrl,  
        data: {action: "get_area_info",pid:0},  
        dataType : 'jsonp',  
        jsonp:"jsoncallback",  
        success: function(data) {  
            if(data.status != 210){	
		        //$("#province").append("<option value=''>请选择省</option>")    
                $.each(data.area_info,function(name,value){  
                    $("#province").append("<option value='" + data.area_info[name]['areaid'] + "'>" + data.area_info[name]['areaname'] + "</option>");                  
                })
            }
        }  
    });
}

//获取已设置省市县
function getAreaName(id){
    $.ajax({  
	type: "get",  
	url: config.apiUrl,  
	data: {action: "get_area_parent_nodes",areaid:id},  
	dataType : 'jsonp',  
	jsonp:"jsoncallback",  
	success: function(data) {
	    $.each(data.parent_areas,function(index,value){ 
		$("#province,#city,#county").show();
		if(index != 2){$("#county").hide();}		
		$("#province,#city,#county").empty();		
		$("#province").append("<option value='" + data.parent_areas[0]['areaid'] + "'>" + data.parent_areas[0]['areaname'] + "</option>");
		$("#city").append("<option value='" + data.parent_areas[1]['areaid'] + "'>" + data.parent_areas[1]['areaname'] + "</option>");
		$("#county").append("<option value='" + data.parent_areas[2]['areaid'] + "'>" + data.parent_areas[2]['areaname'] + "</option>");	
	    })
	    
	    $(".form_per .area").attr("readonly","readonly");
	    
	}  
    });
}

//当页面加载完获取所在地区
$(document).ready(function() {      
    //首次加载省
    getAreaProvince();
    
    $("#update_area").click(function(){
	$("#div_area,#city,#county").hide();
	$(".area").empty();
	getAreaProvince();
    })
    
    //加载市
    $("#province").change(function() {  
        var id = $(this).val();  
        $.ajax({  
            type: "post",  
            url: config.apiUrl,  
            data: {action: "get_area_info",pid:id},  
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            success: function(data) {  
                if(data.status != 210){
                    $("#city").show().empty();
                    $("county").hide();
                    $("#city").append("<option value=''>请选择市</option>")
                    $.each(data.area_info,function(name,value){ 
                        $("#city").append("<option value='" + data.area_info[name]['areaid'] + "'>" + data.area_info[name]['areaname'] + "</option>");
                    })
                }
            }  
        });  
    });    
    
    //加载县区
    $("#city").change(function() {  
        var id = $(this).val();  
        $.ajax({  
            type: "post",  
            url: config.apiUrl,  
            data: {action: "get_area_info",pid:id},  
            dataType : 'jsonp',  
            jsonp:"jsoncallback",  
            success: function(data) {
                if(data.status != 210){
                    $("#county").show().empty();
                    $("#county").append("<option value=''>请选择县/区</option>")
                    $.each(data.area_info,function(name,value){ 
                        $("#county").append("<option value='" + data.area_info[name]['areaid'] + "'>" + data.area_info[name]['areaname'] + "</option>");
                    })
                }else{
                    $("#county").hide();
                }
                
            }  
        });  
    }); 
    
    //赋值地区ID
    $("select").change(function(){
        var id = $(this).val();
        $("#areaid").val(id);
    })    
});  


