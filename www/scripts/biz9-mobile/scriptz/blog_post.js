//9_blog_post_category_list //9_category_list
function set_page_blog_post_category_list(data){
    set_page_title(data.mobile.primary.app_title);
    bind_slide_show_list(data.category_list);
    bind_category_list(data.category_list,data.page_current,data.page_count);
    bind_popular_list(data.popular_list,data.page_current,data.page_count);
    set_page_button_color(data.mobile.primary.button_color);
    hide_spinner();
    function bind_slide_show_list(item_list){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item = item_list[a];
            str=str+"<div class='splide__slide'>"+
                "<div class='card card-style' style='background-image: url("+item.photo_obj.mid_url+")' data-card-height='cover-boxed'>"+
                "<div class='card-bottom p-3'>"+
                "<h1 class='color-white font-700 pt-3'>"+item.title+"</h1>"+
                "<p class='color-white opacity-60'>"+
                item.sub_note
                +"</p>"+
                "<a href='blog_post_list.html?category="+item.title+"&page_current=1' class='btn btn-s font-700 text-uppercase rounded-s mb-4 biz_btn'>Browse (" + item.item_count + " items)</a>"+
                "</div>"+
                "<div class='card-overlay bg-gradient'></div>"+
                "</div>"+
                "</div>";
        }
        $('#biz_lbl_slideshow_list_top').html('');
        $('#biz_lbl_slideshow_list_top').html(str);
        init_slide_show('#slider_top');
    }
    function bind_category_list(item_list,page_current,page_count){
        var str='';
        color=0;
        for(var a=0;a<item_list.length;a++){
            item = item_list[a];
            //color_button_get_start
            color_str='';
            if(data.mobile.primary.button_color=='random'){
                if(color>=color_list.length){
                    color=0;
                }
                color_str=color_list[color];
                color=color+1;
            }else{
                color_str=data.mobile.primary.button_color;
            }
            //color_button_get_end
            str=str+"<div class='col-6'>"+
                "<a href='blog_post_list.html?category="+item.title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style='background-image: url("+item.photo_obj.mid_url+")' data-card-height='300'>"+
                "<div class='card-bottom'><span class='badge "+color_str+"  p-2 ps-2 rounded-s'>"+item.title+" ("+item.item_count + " items)</span></div>"+
                "</div></a>";
            if(item.last_item_create.title){
                str=str+"<a href='blog_post_list.html?category="+item.title+"&page_current=1'><p class='line-height-s color-theme mb-1'>"+item.last_item_create.title+"</p></a>"+
                    "<p class='mb-0 font-10 pt-1 opacity-60'><i class='fa fa-clock pe-2'></i>"+item.last_item_create.date_obj.pretty_create+"</p>";
            }
            str=str+"</div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str = str+"<div class='w-100 mb-3'></div>";
            }
        }
        $('#biz_lbl_category_list').html('');
        $('#biz_lbl_category_list').html(str);
    }
    function bind_popular_list(item_list){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item=item_list[a];
            url='blog_post_detail.html?title_url='+item.title_url;
            url_category='blog_post_list.html?category='+item.category+"&page_current=1";
            str=str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='"+url+"'><p class='font-12 ps-3 line-height-s color-theme mb-1'><b>"+item.title+"</b></p></a>"+
                "<p class='mb-0 ps-3 font-10 pt-0'>"+item.sub_note +"</p>"+
                "<p class='mb-0 ps-3 font-10 pt-0 opacity-60'>"+item.date_obj.month_create+ "  "+item.date_obj.date_create+ ",    "+item.date_obj.year_create+ " at " +item.date_obj.time_update + " | <a href='#'>"+item.category+"</a></p>"+

                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "</div>"+
                "<div class='divider mb-3'></div>";
        }
        $("#biz_lbl_popular_list").show();
        $('#biz_lbl_popular_list').html('');
        $('#biz_lbl_popular_list').html(str);
    }
}
//9_list
function set_page_blog_post_list(data){
    hide_cart();
    set_page_title(data.mobile.primary.app_title);
    set_page_sub_title('Blog Posts');
    set_page_sub_note("(" + data.item_count + " items)");
    $('#biz_page_category').val(data.category);
    bind_list(data.blog_post_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item=item_list[a];
            str =str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='blog_post_detail.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='#'><p class='ps-3 line-height-s color-theme mb-1'><b>"+item.title+"</b></p></a>"+
                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+

                "<p class='mb-0 ps-3 font-12 pt-1'>"+item.sub_note+"</p>"+
                "<p class='mb-0 ps-3 font-10 pt-1 opacity-60'><i class='fa fa-clock pe-2'></i>"+item.date_obj.date_create+" " + item.date_obj.month_create +", " + item.date_obj.year_create + " " + item.date_obj.time_create +"</p>"+
                "</div>"+
                "</div>";
            str=str+"<div class='divider mb-3'></div>";
            $('#biz_lbl_list').html('');
            $('#biz_lbl_list').html(str);
            $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
            bind_events();
        }
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category=$('#biz_page_category').val();
            url="blog_post/blog_post_list/"+category+"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.blog_post_list,page_current,data.page_count);
            });
        });
    }
}
//9_detail
function set_page_blog_post_detail(data){
    hide_detail();
    hide_cart();
    bind_page_id(data.blog_post);
    bind_detail(data);
    bind_photo(data);
    bind_review(data.blog_post);
    init_plugin();
    hide_spinner();
    function hide_detail(){
        $("#biz_lbl_card_youtube").hide();
    }
    function bind_detail(data){
        set_page_title(data.mobile.primary.app_title);
        $("#biz_lbl_title").html(data.blog_post.title);
        $("#biz_lbl_sub_title").html(data.blog_post.sub_note);
        set_page_view_count(data.blog_post.view_count);
        //$("#biz_lbl_rating_count").html(data.blog_post.review_count);
        $("#biz_lbl_note").html(data.blog_post.note);
        $("#biz_lbl_date").html("<p class='m-3  font-10 opacity-60'><i class='fa fa-clock pe-2'></i>'"+data.blog_post.date_obj.date_create+" " + data.blog_post.date_obj.month_create +", " + data.blog_post.date_obj.year_create +" at "+ data.blog_post.date_obj.time_update +"</p>");
        $("#biz_lbl_author").hide();
        if(data.blog_post.author){
            $("#biz_lbl_author").show();
            $("#biz_lbl_author").html("<p class='m-3 mt-0  font-10 opacity-60'><i class='fa fa-pen pe-2'></i>'"+data.blog_post.author+ "</p>");
        }
        if(data.blog_post.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.blog_post.youtube_url));
        }
    }
    function bind_photo(data){
        if(data.blog_post.photofilename){
            $("#biz_img_primary").css("background-image", "url(" + data.blog_post.photo_obj.mid_url + ")");
        }else{
            $("#biz_img_primary").hide();
        }
        var str='';
        for(a=0;a<data.blog_post.photos.length;a++){
            if(!data.blog_post.photos[a].text){
                data.blog_post.photos[a].text='';
            }
            str=str+"<a class='col mb-4' data-gallery='gallery-1' href='"+data.blog_post.photos[a].photo_obj.album_url+"' title='"+data.blog_post.photos[a].text+"'>"+
                "<img src='"+data.blog_post.photos[a].photo_obj.square_mid_url+"' data-src='"+data.blog_post.photos[a].photo_obj.album_url+"' class='preload-img img-fluid rounded-s' alt='img'>"+
                "<p class=' pt-2'>"+ truncate_str(data.blog_post.photos[a].text, 50) +"</p>"+
                "</a>";
        }
        $("#biz_lbl_photo_list").html(str);
    }
}
//9_blog_post_list 9_edit_list 9_list 9_dashboard_blog_post_list //9_dashboard
function set_dashboard_blog_post_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    bind_detail(data);
    bind_list(data.blog_post_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Blog Posts');
        set_page_note("(" + data.item_count + " items)");
    }
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            if(String(item.visible)=='true'){
                visible_str="<span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
            }else{
                visible_str="<span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
            }
            edit_str= "<span class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon'></i>"+
                "</span>";
            photo_edit_url="dashboard_photo_list.html?parent_data_type="+item.data_type+"&parent_tbl_id="+item.tbl_id;
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_blog_post.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_blog_post.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1' ><b class='font-11'>"+item.title+"</b></p></a><div>"+
                "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-10  opacity-60'>"+item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='blog_post_detail.html?title_url="+item.title_url+"'><i class='admin_edit_img fa fa-eye pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2'></i></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div></div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e){
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category='all';
            url='blog_post/blog_post_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.blog_post_list,page_current,data.page_count);
            });
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_blog_post.html?title_url=0';
        });
        $(".biz_btn_copy").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Copy?") == true) {
                show_spinner();
                url="item/copy_item/"+data_type+"/"+tbl_id;
                cloud_post_url(url,{},function(data){
                    window.location.reload();
                });
            }
        });
        $(".biz_btn_delete").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Delete?") == true) {
                cloud_delete(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
                    item_count=String(parseInt($('#biz_page_item_list_count').val())-1);
                    bind_page_list_count(item_count);
                    set_page_note("(" + item_count + " items)");
                });
            }
        });
    }
}
//9_blog_post_detail 9_blog_post_edit 9_edit 9_dashboard_blog_post_edit
function set_dashboard_blog_post(data){
    hide_footer();
    hide_detail();
    hide_cart();
    bind_page_id(data.blog_post);
    bind_detail(data);
    bind_event();
    init_tab();
    init_form();
    hide_spinner();
    function hide_detail(){
        $('#biz_lbl_div_audio').hide();
    }
    function bind_detail(data){
        set_page_title('Dashboard');
        init_item_note(data.blog_post.note);
        if(data.blog_post.tbl_id==0){
            set_page_sub_title('Add Blog Post');
        }else{
            set_page_sub_title('Edit Blog Post');
            $('#biz_img').attr('src',data.blog_post.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.blog_post.title);
        $('#biz_tb_author').val(data.blog_post.author);
        $('#biz_tb_youtube_url').val(data.blog_post.youtube_url);
        $('#biz_tb_sub_note').val(data.blog_post.sub_note);
        $('#biz_sel_visible').val(data.blog_post.visible);
        if(!data.blog_post.visible){
            $('#biz_sel_visible').val('true');
        }
        if(data.blog_post.mp3filename){
            $('#biz_lbl_audio').show();
            $('#biz_div_audio_ctl').html(bind_mp3_form(data.blog_post.mp3_url));
        }
        str='';
        for(a=0;a<data.category_list.length;a++){
            str=str+ "<option value='"+data.category_list[a].title+"' selected>"+data.category_list[a].title+"</option>";
        }
        $('#biz_sel_category_list').html(str);
        $('#biz_sel_category_list').val(data.blog_post.category);
    }
    function bind_event(){
        $("#biz_btn_blog_post_update").click(function() {
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.title=$('#biz_tb_title').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.author=$('#biz_tb_author').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.title_url=get_title_url(obj.title);
            obj.note=get_item_note();
            if(obj.title.length>2){
                cloud_update(data_type,tbl_id,obj, function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    show_toast_update();
                    return false;
                });
            }else{
                show_toast_error('Please enter a valid title');
            }
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_blog_post.html?title_url=0';
        });
        $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img').attr('src',data.photo_obj.square_mid_url);
                    return false;
                });
            });
        });
        $("#biz_tb_mp3_track").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            file_mp3_select(function(data){
                $('#biz_lbl_div_audio').show();
                $('#biz_div_audio_ctl').html(bind_mp3_form(data.mp3_url));
                cloud_update(data_type,tbl_id,{mp3filename:data.mp3filename},function(data){
                    return false;
                });
            });
        });
        $("#biz_btn_audio_delete").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            $('#biz_lbl_div_audio').hide();
            cloud_update(data_type,tbl_id,{mp3filename:null},function(data){
                return false;
            });
        });
    }
}
//9_blog_post_media 9_blog_post_media_edit 9_dashboard_blog_post
function set_dashboard_blog_post_media(data){
    hide_footer();
    set_page_title('Dashboard');
    set_page_sub_title(data.blog_post.title + " Media");
    $('#biz_mp3').hide();
    $('#biz_page_tbl_id').val(data.blog_post.tbl_id);
    $('#biz_page_data_type').val(data.blog_post.data_type);
    $('#biz_tb_mp3_title').val(data.blog_post.mp3_title);
    $('#biz_tb_mp3_note').val(data.blog_post.mp3_note);
    $('#biz_tb_mp3filename').val(data.blog_post.mp3filename);
    $('#biz_mp3duration').val(data.blog_post.mp3duration);
    $('#biz_mp3_url').val(data.blog_post.mp3_url);
    if(data.blog_post.mp3filename){
        $('#biz_div_mp3').show();
        $('#biz_tb_mp3_title').val(data.blog_post.mp3_title);
        $('#biz_tb_mp3_note').val(data.blog_post.mp3_note);
        $('#biz_mp3filename').val(data.blog_post.mp3filename);
        $('#biz_mp3_url').val(data.blog_post.mp3_url);
        $('#biz_tb_mp3duration').val(data.blog_post.mp3duration);
        set_mp3_player(data.blog_post.mp3_url);
    }
    $('#biz_tb_youtube_link').val(data.blog_post.youtube_link);
    $('#biz_tb_youtube_title').val(data.blog_post.youtube_title);
    $('#biz_tb_youtube_note').val(data.blog_post.youtube_note);
    init_form();
    init_tab();
    $("#biz_btn_update").click(function() {
        var obj={};
        tbl_id= $('#biz_page_tbl_id').val();
        data_type= $('#biz_page_data_type').val();
        obj.mp3_title=$('#biz_tb_mp3_title').val();
        obj.mp3_note=$('#biz_tb_mp3_note').val();
        obj.mp3filename=$('#biz_mp3filename').val();
        obj.mp3duration=$('#biz_mp3duration').val();
        obj.mp3_url=$('#biz_mp3_url').val();
        obj.youtube_link=get_youtube_link($('#biz_tb_youtube_link').val());
        obj.youtube_title=$('#biz_tb_youtube_title').val();
        obj.youtube_note=$('#biz_tb_youtube_note').val();
        cloud_update(data_type,tbl_id,obj,function(data){
            show_toast_update();
            return false;
        });
    });
    $("#biz_btn_add_audio").click(function() {
        file_mp3_select(function(data){
            $('#biz_mp3filename').val(data.mp3filename);
            $('#biz_mp3duration').val(data.mp3duration);
            $('#biz_mp3_url').val(data.mp3_url);
            $('#biz_tb_mp3duration').val(data.mp3duration);
            $('#biz_div_mp3').show();
            set_mp3_player(data.mp3_url);
        });
    });
}
