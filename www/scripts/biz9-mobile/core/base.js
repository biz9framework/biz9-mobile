Lockr.prefix = 'lockr_';
COOKIE_USER='biz_user';
DEVICE_TYPE_IOS='iOS';
DEVICE_TYPE_ANDROID='Android';
// BIZ PROCCESSING START --
function get_new_item(data_type){
    if(!data_type){
        data_type=DT_BLANK;
    }
    var item={data_type:data_type,tbl_id:0};
    return item;
}
function show_toast_update(message){
    hide_toast();
    if(!message){
        message='Update';
    }
    var toastID = document.getElementById('toast-save');
    toastID.innerHTML="<i class='fa fa-check me-3'></i>"+message;
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
}
function show_toast_error(error){
    hide_toast();
    var toastID = document.getElementById('toast-error');
    toastID.innerHTML="<i class='fa fa-times me-3'></i>Error<br/> "+error;
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
}
function hide_toast(){
    var toast_error_ID = document.getElementById('toast-error');
    toast_error_ID = new bootstrap.Toast(toast_error_ID);
    toast_error_ID.hide();

    var toast_success_ID = document.getElementById('toast-save');
    toast_success_ID = new bootstrap.Toast(toast_success_ID);
    toast_success_ID.hide();
}
// BIZ PROCCESSING END --
// AUDIO PROCCESSING START --
function file_mp3_select(call){
    if(device.platform==DEVICE_TYPE_IOS){
        window.FilePicker.pickFile(successCallback,errorCallback);
        function successCallback(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        }
        function errorCallback(error){
            alert(error);
        }
    }else{
        fileChooser.open({mime: 'audio/mpeg'},function(uri) {
            var fileURL = String(uri);
            upload_mp3(fileURL,function(data){
                call(data);
            });
        });
    }
}
function upload_mp3(fileURI,call) {
    var ft = new FileTransfer();
    cloud_sql_url=get_cloud_url("cloud/file/update_mp3");
    ft.upload(fileURI, encodeURI(cloud_sql_url), uploadMP3Success, fail, {});
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadMP3Success(r) {
        res=JSON.parse(r.response);
        if(res.helper.validation_message){
            alert(res.helper.validation_message);
        }else{
            call(res.helper.item);
        }
    }
}
// AUDIO PROCCESSING END --
// PHOTO PROCCESSING START --
function camera_photo_select(call){
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 100,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true
    });
    function onSuccess(imageData) {
        plugins.crop(function success (data) {
            upload_photo(data,function(data){
                call(data);
            });
        },
            function fail() {
            }, imageData, {quality:100});
    }
    function onFail(message) {
         alert("An error has occurred: = " + message);
    }
}
function upload_photo(imageURI,call) {
    var ft = new FileTransfer();
    cloud_sql_url=get_cloud_url("cloud/file/update_photo");
    ft.upload(imageURI, encodeURI(cloud_sql_url), uploadSuccess, fail, {});
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        //alert("upload error source " + error.source);
        //alert("upload error target " + error.target);
    }
    function uploadSuccess(r) {
        res=JSON.parse(r.response);
        if(res.helper.error){
            alert(res.helper.error)
        }else{
            call(res.helper.item);
        }
    }
}
// PHOTO PROCCESSING END --
// USER PROCCESSING START --
function get_user(){
    new_user=false;
    user=cookie_get(COOKIE_USER);
    if(!user||!user.customer_id){
        user={customer_id:get_id(99999)};
        set_user(user);
    }
    return user;
}
function set_user(item){
    cookie_set(COOKIE_USER,item);
}
// USER PROCCESSING END --
// EDITOR PROCCESSING START --
function get_item_note(){
    return tinymce.activeEditor.getContent();
}
function init_item_note(_str){
    if(!_str){
        _str='';
    }
tinymce.init({
    selector: '#biz_lbl_note',
    plugins: 'anchor autolink codesample emoticons image link lists media searchreplace table visualblocks wordcount',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
     setup: function (editor) {
      editor.on('init', function (e) {
        editor.setContent(_str);
      });
    }
  });
}
// EDITOR PROCCESSING END --
// CLOUD START PROCCESSING START --
function get_cloud_url(url){
    _query='?app_title_id='+APP_TITLE_ID;
    return CLOUD_URL+"/"+url+_query;
}
function cloud_get(data_type,tbl_id,call){
    url='cloud/crud/get/'+data_type+'/'+tbl_id;
    cloud_get_url(url,{},function(data){
        call(data.item);
    });
}
function cloud_update(data_type,tbl_id,params,call){
    url='cloud/crud/update/'+data_type+'/'+tbl_id;
    cloud_post_url(url,params,function(data){
        call(data.item);
    });
}
function cloud_update_biz(data_type,tbl_id,params,call){
    url='cloud/crud/update_biz/'+data_type+'/'+tbl_id;
    cloud_post_url(url,params,function(data){
        call(data.item);
    });
}
function cloud_delete(data_type,tbl_id,call){
    url='cloud/crud/delete/'+data_type+'/'+tbl_id;
    cloud_post_url(url,{},function(data){
        call(data.item);
    });
}
function cloud_post_url(url,params,call){
    $.post(get_cloud_url(url),params,function(data){
        w('biz_cloud_cloud_url',url);
        w('biz_cloud_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(get_cloud_url(url));
    });
}
function cloud_get_url(url,params,call){
    $.get(get_cloud_url(url),params,function(data){
        w('biz_cloud_url',url);
        w('biz_cloud_data',data);
        call(data.helper);
    }).fail(function() {
        alert('Network connection fail. Cannot connect to server!')
        alert(get_cloud_url(url));
    });
}
//-- OTHER START --
function set_pull_down(){
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){ window.location.reload(); }
    });
}
//-- OTHER END --

