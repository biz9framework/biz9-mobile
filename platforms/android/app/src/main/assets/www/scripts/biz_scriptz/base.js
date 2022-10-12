Lockr.prefix = 'lockr_';
G_DT_PHOTO='photo_biz';
G_DT_PRODUCT_CART='product_cart_biz';
G_DT_SERVICE_CART='service_cart_biz';
G_DT_COMMENT='comment_biz';
G_DT_DOCUMENT_PAGE='page';
G_COOKIE_USER='biz_user';
G_DEVICE_TYPE_IOS='iOS';
G_DEVICE_TYPE_ANDROID='Android';
var color_list=['red-dark','green-dark','blue-dark','yellow-dark','orange-dark','teal-dark'];

function get_title_url(title){
    return title.replace(/[^a-z0-9]+/ig, "_").toLowerCase();
}
function init_item_note(_str){
    return '';
}
function get_item_note(){
    return '';
}
function post_crud_delete_item(data_type,tbl_id,call){
    url='cloud/crud/delete_item_by_tbl_id/'+data_type+'/'+tbl_id;
    post_cloud_data(url,{},function(data){
        call(data.item);
    });
}
function post_crud_get_item(data_type,tbl_id,call){
    url='cloud/crud/get_item_by_tbl_id/'+data_type+'/'+tbl_id;
    get_cloud_data(url,{},function(data){
        call(data.item);
    });
}
function post_crud_update_item(data_type,tbl_id,params,call){
    url='cloud/crud/update_item/'+data_type+'/'+tbl_id;
    post_cloud_data(url,params,function(data){
        call(data.item);
    });
}
function post_cloud_data(url,params,call){
    $.post(get_cloud_url(url),params,function(biz_data,status){
        call(biz_data.helper);
    });
}
function get_cloud_data(url,params,call){
    $.get(get_cloud_url(url),params,function(biz_data,status){
        call(biz_data.helper);
    });
}
function file_mp3_select(call){
    if(device.platform==G_DEVICE_TYPE_IOS){
        window.FilePicker.pickFile(successCallback,errorCallback);
        function successCallback(uri) {
            var fileURL = String(uri);
            uploadMP3(fileURL,function(data){
                call(data);
            });
        }
        function errorCallback(error){
            alert(error);
        }
    }else{
    fileChooser.open({mime: 'audio/mpeg'},function(uri) {
        var fileURL = String(uri);
        uploadMP3(fileURL,function(data){
            call(data);
        });
    });
    }
}
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
            uploadPhoto(data,function(data){
                call(data);
            });
        },
            function fail() {
            }, imageData, {quality:100});
    }
    function onFail(message) {
        // alert("An error has occurred: = " + message);
    }
}
function uploadPhoto(imageURI,call) {
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
        if(res.helper.validation_message){
            alert(res.helper.validation_message);
        }else{
            call(res.helper.item);
        }
    }
}
function uploadMP3(fileURI,call) {
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
function set_product_item_info(product){
    product.title= product.title? (product.title):'';
    product.sub_note= product.sub_note? (product.sub_note):'';
    if(!product.old_price){
        product.old_price='';
    }else{
        product.old_price=get_money(product.old_price);;
    }
    if(!product.price){
        product.price='';
    }else{
        product.price=get_money(product.price);
    }
    if(!product.product_sub1_title){
        product.product_sub1_title='';
    }
    if(!product.product_sub2_title){
        product.product_sub2_title='';
    }
    if(!product.product_shipping_title){
        product.product_shipping_title='';
    }
    return product;
}
function set_service_item_info(service){
    service.title= service.title? (service.title):'';
    service.sub_note= service.sub_note? (service.sub_note):'';
    if(!service.old_price){
        service.old_price='';
    }else{
        service.old_price=get_money(service.old_price);
    }
    if(!service.price){
        service.price='';
    }else{
        service.price=get_money(service.price);
    }
    if(!service.service_sub1_title){
        service.service_sub1_title='';
    }
    if(!service.service_sub2_title){
        service.service_sub2_title='';
    }
    if(!service.service_shipping_title){
        service.service_shipping_title='';
    }

    return service;
}
function set_mp3_player(mp3_url){
    var myCirclePlayer = new CirclePlayer("#jquery_jplayer_0",
        {
            m4a:mp3_url,
        }, {
            cssSelectorAncestor: "#cp_container_0"
        });
}

function set_fields(){
    var selectField = document.querySelectorAll('.input-style select')
    selectField.forEach(el => el.addEventListener('change', e => {
        if(el.value !== "default"){
            el.parentElement.classList.add('input-style-active');
            el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
            el.parentElement.querySelectorAll('.invalid, em, span')[0].classList.add('disabled');
        }
        if(el.value == "default"){
            el.parentElement.querySelectorAll('span, .valid, em')[0].classList.add('disabled');
            el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
            el.parentElement.classList.add('input-style-active');
        }
    }));
}
function set_tabs(){
    //Tabs
    var tabTrigger = document.querySelectorAll('.tab-controls a');
    if(tabTrigger.length){
        tabTrigger.forEach(function(e){
            if(e.hasAttribute('data-active')){
                var highlightColor = e.parentNode.getAttribute('data-highlight');
                e.classList.add(highlightColor);
                e.classList.add('no-click');
            }
        });
        tabTrigger.forEach(el => el.addEventListener('click',e =>{
            var highlightColor = el.parentNode.getAttribute('data-highlight');
            var tabParentGroup = el.parentNode.querySelectorAll('a');
            tabParentGroup.forEach(function(e){
                e.classList.remove(highlightColor);
                e.classList.remove('no-click');
            });
            el.classList.add(highlightColor);
            el.classList.add('no-click');
        }));
    }
}
function get_youtube_link(link) {
    return link.replace("https://youtu.be/", "https://www.youtube.com/embed/");
}
function get_cloud_item(data_type,tbl_id){
    return {data_type:data_type,tbl_id:tbl_id};
}
function cookie_set(title,item){
    Lockr.set(title,item);
}
function cookie_get(title){
    return Lockr.get(title);
}

function get_user(){
    user=cookie_get(G_COOKIE_USER);
    if(!user){
        user={tbl_id:0,data_type:G_COOKIE_USER}
    }
    return user;
}
function set_user(item){
    cookie_set(G_COOKIE_USER,item);
}
function del_user(){
    Lockr.flush();
}
function get_cloud_url(url){
    _query='?app_title_id='+APP_TITLE_ID;
    return CLOUD_URL+url+_query;
}
function show_toast_update(){
    var toastID = document.getElementById('toast-save');
    toastID.innerHTML="<i class='fa fa-check me-3'></i>Update";
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
}
function show_toast_error(error){
    var toastID = document.getElementById('toast-error');
    toastID.innerHTML="<i class='fa fa-check me-3'></i>Error "+error;
    toastID = new bootstrap.Toast(toastID);
    toastID.show();
}

