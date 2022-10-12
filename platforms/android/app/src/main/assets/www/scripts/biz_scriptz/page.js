function set_page_page_list(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    //pages_boxes
    var str='';
    url='';
    for(var a=0;a<data.page_list.length;a++){
        switch(data.page_list[a].type) {
            case 'blog_post':
                url = 'blog_post_category_list.html';
                break;
            case 'product':
                url = 'product_category_list.html';
                break;
            case 'service':
                url = 'service_category_list.html';
                break;
            case 'gallery':
                url = 'gallery_category_list.html';
                break;
            case 'team':
                url = 'team_list.html';
                break;
        }
        data.page_list[a].sub_note=data.page_list[a].sub_note?(data.page_list[a].sub_note):'';
        data.page_list[a].button_text=data.page_list[a].button_text?(data.page_list[a].button_text):'';
        str=str+"<a href='"+url+"' class='card card-style mb-3' style='background-image:url("+data.page_list[a].mid_photo_url+")' data-card-height='150'>"+
            "<div class='card-center px-3'>"+
            "<h1 class='color-white font-800 font-24'>"+data.page_list[a].title+"</h1>"+
            "<p class='color-white mt-n2 mb-0 opacity-70'>"+
            data.page_list[a].sub_note+
            "</p>"+
            "</div>"+
            "<div class='card-center'>";
            if(data.page_list[a].button_text){
                str=str+"<span class='btn btn-s bg-blue-dark float-end me-3 rounded-xl font-800 text-uppercase'>"+data.page_list[a].button_text+"</span>";
            }
            str=str+"</div>"+
            "<div class='card-overlay bg-black opacity-85'></div>"+
            "</a>";
    }
    $('#biz_page_list').html(str);
}
