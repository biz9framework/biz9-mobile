//9_blog_post_category_list
function set_page_blog_post_category_list(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    var str='';
    color_row=0;
    for(var a=0;a<data.blog_post_category_list.length;a++){
        data.blog_post_category_list[a].title=data.blog_post_category_list[a].title?(data.blog_post_category_list[a].title):"";
        data.blog_post_category_list[a].category=data.blog_post_category_list[a].category?(data.blog_post_category_list[a].category):"";
        data.blog_post_category_list[a].sub_note=data.blog_post_category_list[a].sub_note?(data.blog_post_category_list[a].sub_note):"";
        str=str+
            "<a href='blog_post_list.html?category="+data.blog_post_category_list[a].title+"' class='card card-style' style='background-image:url("+data.blog_post_category_list[a].mid_photo_url+")' data-card-height='200'>"+
            "<div class='card-top m-3'>"+
            "<span class='badge bg-"+color_list[color_row]+" px-2 py-1 text-uppercase'>"+data.blog_post_category_list[a].category+"</span>"+
            "</div>"+
            "<div class='card-bottom mx-3 mb-4 pb-2'>"+
            "<h1 class='color-white mb-n2 font-700'>"+data.blog_post_category_list[a].title+"</h1>"+
            "<p class='color-white mb-0 opacity-50 font-12'>"+data.blog_post_category_list[a].sub_note+"</p>"+
            "</div>"+
            "<div class='card-overlay bg-black opacity-80'></div>"+
            "</a>";
        color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
    }
    $('#biz_blog_post_category_list').html(str);
}
//9_list
function set_page_blog_list(data){
   $('#biz_primary_app_title').html(data.primary.app_title);
    var str='';
    color_row=0;
    for(var a=0;a<data.blog_post_list.length;a++){
        data.blog_post_list[a].category=data.blog_post_list[a].category?(data.blog_post_list[a].category):'';
        data.blog_post_list[a].author=data.blog_post_list[a].author?(data.blog_post_list[a].author):'';
        data.blog_post_list[a].sub_note=data.blog_post_list[a].sub_note?(data.blog_post_list[a].sub_note):'';
        str=str+
            "<div class='card card-style'>"+
            " <div class='content mt-n3'>"+
            " <a href='#' class='card card-style mx-0  mt-4'   style='background-image: url("+data.blog_post_list[a].mid_photo_url+")' data-card-height='175'><div class='card-top p-3'><span class='bg-"+color_list[color_row]+" py-1 px-3 rounded-m text-uppercase font-10 font-700'>"+data.blog_post_list[a].category+"</span>"+
            "</div><div class='card-bottom p-3'><span class='color-white opacity-50'><i class='pe-2 fa fa-user'></i>"+data.blog_post_list[a].author+"</span></div><div class='card-bottom p-3'>"+
            "<span class='float-end color-white opacity-50'>"+data.blog_post_list[a].date_date_create+"th "+data.blog_post_list[a].month_date_create+" <span class='copyright-year'></span> <i class='fa fa-clock ps-2'></i></span></div><div class='card-overlay bg-gradient'></div></a>"+
            "<h2>"+data.blog_post_list[a].title+"</h2><p>"+data.blog_post_list[a].sub_note+"</p>"+
            "<a href='blog_post_detail.html?title_url="+data.blog_post_list[a].title_url+"' class='btn bg-highlight font-700 text-uppercase btn-m rounded-sm btn-full mb-n3'>Read More</a></div></div>";
          color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
  }
    $('#biz_blog_post_list').html(str);
}
//9_detail
function set_page_blog_detail(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    $("#biz_blog_post_div_audio").hide();
    $("#biz_blog_post_div_video").hide();
    $("#biz_blog_post_author_full").hide();
    if(data.item.mp3filename){
        $('#biz_blog_post_div_audio').show();
        $('#biz_blog_post_audio_title').html(data.item.mp3_title);
        $('#biz_blog_post_audio_note').html(data.item.mp3_note);
        $('#biz_blog_post_audio_duration').html('Duration: '+ data.item.mp3duration);
        set_mp3_player(data.item.mp3_url);
    }else{
        $('#biz_blog_post_div_audio').hide();
    }
    if(data.item.youtube_link){
        $('#biz_blog_post_div_video').show();
        $('#biz_blog_post_video_link').attr('src',data.item.youtube_link);
        $('#biz_blog_post_video_title').html(data.item.mp3_title);
        $('#biz_blog_post_video_note').html(data.item.mp3_note);
    }else{
        $('#biz_blog_post_div_video').hide();
    }
    if(data.item.author){
        $("#biz_blog_post_author_full").show();
        $("#biz_blog_post_author").html(data.item.author);
    }
    $("#biz_blog_post_image_url").css("background-image", "url(" + data.item.mid_photo_url + ")");
    $('#biz_blog_post_title').html(data.item.title);
    $('#biz_blog_post_date').html(data.item.date_date_create+"th "+data.item.month_date_create);
    $('#biz_blog_post_sub_note').html(data.item.sub_note);
    $('#biz_blog_post_note').html(data.item.note);
    var str='';
    str=str+"<div class='row text-center row-cols-3 mb-n5'>";
    for(a=0;a<data.item.photos.length;a++){
        data.item.photos[a].sub_note=data.item.photos[a].sub_note?(data.item.photos[a].sub_note):'';
        str=str+"<a class='col mb-4' data-gallery='gallery-2' href='"+data.item.photos[a].mid_photo_url+"' title="+data.item.photos[a].sub_note+">"+
        "<img src='"+data.item.photos[a].thumb_photo_url+"' data-src='"+data.item.photos[a].album_photo_url+"' class='preload-img img-fluid rounded-s' alt='img'>"+
        "<h5 class='font-14 pt-2'>"+data.item.photos[a].sub_note+"</h5>"+
        "</a>";
    }
    str=str+"</div>";
    $('#biz_blog_post_photo_list').html(str);
    load_plugins();
}

