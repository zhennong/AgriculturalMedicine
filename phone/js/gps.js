//启动定位功能，返回的通知函数 的回调函数
function locationCallback(lat, log){
    uexLocation.getAddress(lat,log,1);
}

//根据经纬度获取具体地址
function LocationSuccess(opCode, dataType, data){
    var obj = eval('('+data+')');
    //alert(obj.formatted_address);
    $("#gps").val('');
    $("#gps").val(obj.formatted_address);
}

window.uexOnload = function(){
    uexLocation.onChange = locationCallback;
    uexLocation.cbGetAddress = LocationSuccess;
}

//获取当前经纬度
function locationFun(){
    //0最准确，1十米以内 ，2百米以内，3千米内，4三千米以内
    var locLevel = 0;
    //distanceFilter 更新距离，如果设置为 100m,则100m以内不回调定位
    var distanceFilter = 10;
    //以上两参数仅ios支持
    uexLocation.openLocation(locLevel, distanceFilter);
}

$(function(){  
    $("#nickname").on('click',function(){
        locationFun();
    })        
})  
