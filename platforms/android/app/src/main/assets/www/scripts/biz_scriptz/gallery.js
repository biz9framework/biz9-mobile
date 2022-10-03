function set_page_gallery_list(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    //gallery_list
    var str='';
    str="<div class='row mb-0'>";
    color_row=0;
    for(var a=0;a<data.gallery_list.length;a++){
        data.gallery_list[a].category=data.gallery_list[a].category?(data.gallery_list[a].category):"";
        data.gallery_list[a].sub_note=data.gallery_list[a].sub_note?(data.gallery_list[a].sub_note):"";
        str=str+"<div class='col-6'><a href='gallery_detail.html?title_url="+data.gallery_list[a].title_url+"'>"+
            "<div class='card card-style m-0 mb-2 rounded-m bg-4' style='background-image: url("+data.gallery_list[a].mid_photo_url+")' data-card-height='150'>"+
            "<div class='card-bottom'> <span class='badge bg-"+color_list[color_row]+" p-2 ps-2 rounded-s'>"+data.gallery_list[a].category+"</span></div>"+
            "</div>"+
            "<p class='line-height-s color-theme mb-1'><strong>"+data.gallery_list[a].title+"</strong></p>"+
            "</a></div>";
        if(a==1||a==3||a==5||a==7||a==9||a==11||a==11||a==13||a==15||a==17){
            str=str+"<div class='w-100 mb-3'></div>";
        }
        color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
    }
    str=str+"</div>";
    $('#biz_gallery_list').html(str);
}
//9_gallery_category_list
function set_page_gallery_category_list(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    var str='';
    color_row=0;
    for(var a=0;a<data.gallery_category_list.length;a++){
        data.gallery_category_list[a].title=data.gallery_category_list[a].title?(data.gallery_category_list[a].title):"";
        data.gallery_category_list[a].category=data.gallery_category_list[a].category?(data.gallery_category_list[a].category):"";
        data.gallery_category_list[a].sub_note=data.gallery_category_list[a].sub_note?(data.gallery_category_list[a].sub_note):"";
        str=str+
            "<a href='gallery_list.html?category="+data.gallery_category_list[a].title+"' class='card card-style' style='background-image:url("+data.gallery_category_list[a].mid_photo_url+")' data-card-height='200'>"+
            "<div class='card-top m-3'>"+
            "<span class='badge bg-"+color_list[color_row]+" px-2 py-1 text-uppercase'>"+data.gallery_category_list[a].category+"</span>"+
            "</div>"+
            "<div class='card-bottom mx-3 mb-4 pb-2'>"+
            "<h1 class='color-white mb-n2 font-700'>"+data.gallery_category_list[a].title+"</h1>"+
            "<p class='color-white mb-0 opacity-50 font-12'>"+data.gallery_category_list[a].sub_note+"</p>"+
            "</div>"+
            "<div class='card-overlay bg-black opacity-80'></div>"+
            "</a>";
        color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
    }
    $('#biz_gallery_category_list').html(str);
}


function set_page_gallery_detail(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    $("#biz_gallery_image_url").css("background-image", "url(" + data.gallery.mid_photo_url + ")");
    $('#biz_lbl_gallery_title').html(data.gallery.title);
    $('#biz_lbl_gallery_sub_note').html(data.gallery.sub_note);
    //gallery_photo_list
    var str='';
    str="<div class='row text-center row-cols-3 mb-n5'>";
    str=str+"<a class='col mb-4' data-gallery='gallery-1' href='"+data.gallery.album_photo_url+"' title=''>"+
        "<img src='"+data.gallery.mid_photo_url+"' data-src='"+data.gallery.album_photo_url+"' class='preload-img img-fluid rounded-s' alt='img'>"+
        "<h5 class='font-14 pt-2'></h5>"+
        "</a>";
    for(a=0;a<data.gallery.photos.length;a++){
        if(!data.gallery.photos[a].note){
            data.gallery.photos[a].note='';
        }
        str=str+"<a class='col mb-4' data-gallery='gallery-1' href='"+data.gallery.photos[a].album_photo_url+"' title='"+data.gallery.photos[a].note+"'>"+
            "<img src='"+data.gallery.photos[a].mid_photo_url+"' data-src='"+data.gallery.photos[a].album_photo_url+"' class='preload-img img-fluid rounded-s' alt='img'>"+
            "<h5 class='font-14 pt-2'>"+data.gallery.photos[a].note+"</h5>"+
            "</a>";
    }
    str=str+"</div>";
    $('#biz_div_gallery_photo_list').html(str);
    load_plugins();
}
