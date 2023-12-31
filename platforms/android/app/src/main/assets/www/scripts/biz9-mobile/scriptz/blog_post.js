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
                "<div class='card card-style'style='background-color:transparent; height:320px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item.last_item_create.photo_obj.mid_url+")' >"+
              "<div class='card-bottom p-3'>"+
                "<a href='blog_post_list.html?category="+item.title+"&page_current=1' class='btn btn-s rounded-s mb-4 biz_btn'><h4>"+item.title+" (" + item.item_count + ")</h4></a>"+
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
                "<a href='blog_post_list.html?category="+item.title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style=' background-color:transparent; height:150px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item.photo_obj.mid_url+")' >"+
                "<div class='card-bottom'><span class='badge "+color_str+" font-12 p-2 ps-2 rounded-s'>"+item.title+" ("+item.item_count+")</span></div>"+
                "</div></a>";
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
            url_category='event_list.html?category='+item.category+"&page_current=1";
            value_field=" ";
            date_str="<span class=' mb-0 ps-3 font-12 pt-0'></span>";
            if(!item.sub_note){
                item.sub_note='';
            }
            str=str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='"+url+"'><h4 class='ps-3 line-height-s color-theme mb-1'>"+item.title+"</h4></a>"+
                "<p class='mb-0 ps-3 font-12 pt-0'>"+truncate_str(item.sub_note,250) +"</p>"+
                "<p class='font-12 pt-0 opacity-60'>"+date_str+" " +value_field + " " + "<i class='fa fa-eye color-gray-dark'></i> "+item.view_count +" <a href='"+url_category+"'><b>"+item.category+"</b></a></p>"+
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
    set_page_sub_title(data.category);
    $('#biz_page_category').val(data.category);
    bind_list(data.blog_post_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item=item_list[a];
            date_str="<span class=' mb-0 ps-3 font-12 pt-0'>"+item.date_obj.pretty_create+"</span>";
            if(!item.sub_note){
                item.sub_note='';
            }
            str =str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='blog_post_detail.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='blog_post_detail.html?title_url="+item.title_url+"'><h4 class='ps-3 line-height-s color-theme mb-1'>"+item.title+"</h4></a>"+
                "<p class='mb-0 ps-3 font-12 pt-0'>"+truncate_str(item.sub_note,250) +"</p>"+
                date_str+"<span class='mb-0 ps-3 font-12 pt-0'><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
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
    hide_cart();
    bind_page_id(data.blog_post);
    bind_detail(data);
    bind_photo(data);
    bind_review(data.blog_post);
    init_plugin();
    hide_spinner();
    function bind_detail(data){
        set_page_title(data.mobile.primary.app_title);
        $("#biz_lbl_title").html(data.blog_post.title);
        $("#biz_lbl_sub_title").html(data.blog_post.sub_note);
        $("#biz_link_category").attr('href',"blog_post_list.html?category="+data.blog_post.category+"&page_current=1");
        $("#biz_link_category").html(data.blog_post.category);
        $('#biz_lbl_count_info').show();
        set_page_view_count(data.blog_post.view_count);
        $("#biz_lbl_note").html(data.blog_post.note);
        author='';
        date ="<span style='margin-right:5px;class=''><i class='fa fa-clock pe-2 ml-5'></i>"+data.blog_post.date_obj.date_create+" " + data.blog_post.date_obj.month_create +", " + data.blog_post.date_obj.year_create +" at "+ data.blog_post.date_obj.time_update +"</span>";
        if(data.blog_post.author){
            author ="<span style='margin-right:5px;'><i class='fa fa-pen pe-2 pr-4'></i>"+data.blog_post.author+"</span>";
            $("#biz_lbl_info").html(author+ " " +date);
        }else{
        $("#biz_lbl_info").html(date);
        }
        if(data.blog_post.pdf_link){
            $("#biz_div_pdf").show();
            $("#biz_btn_pdf_link").click(function() {
                window.location=data.blog_post.pdf_link;
            });
        }
        if(data.blog_post.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.blog_post.youtube_url));
        }
        if(data.blog_post.mp3filename){
            $("#biz_lbl_card_mp3").show();
            $("#biz_lbl_mp3_duration").html(data.blog_post.mp3duration);
            $("#biz_page_mp3_url").val(data.blog_post.mp3_url);
        }
        if(data.card_double_list.length>1){
            bind_double_slide_show(data);
            $("#biz_lbl_double_card").show();
            init_double_slide_show('#slider_double');
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
    function bind_double_slide_show(data){
        var str='';
        $('#biz_lbl_double_category').html(data.blog_post.category);
        $('#biz_lbl_double_slide_show_list').html('');
        for(var a=0;a<data.card_double_list.length;a++){
            var item = data.card_double_list[a];
            url='blog_post_detail.html?title_url='+item.title_url;
            str=str+"<div class='splide__slide'>"+
                "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
                "<div class='biz_div_stat_outer'>"+
                "<span class='font-12 pt-0 m-3'><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
                "</div>"+
                "<a href='"+url+"'><h4 class='text-center'>"+item.title+"</h4></a>"+
                "<p class='text-center font-12 m-3'>"+
                item.sub_note+
                "</p>"+
                "</div>";
            $('#biz_lbl_double_slide_show_list').prepend(str);

            $(".biz_btn_double_cart_slide_add").click(function() {
                var obj={};
                obj.tbl_id=$(this).attr('tbl_id');
                obj.data_type=$(this).attr('data_type');
                obj.customer_id=get_user().customer_id;
                $(this).addClass("bg-click");
                $(this).html("<i class='fa fa-shopping-cart color-red font-12'></i>");
                cloud_order_cart_add(obj.tbl_id,obj,1,function(data){
                });
                return false;
            });
        }
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
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
                "</a>";
            photo_edit_url="dashboard_photo_list.html?parent_data_type="+item.data_type+"&parent_tbl_id="+item.tbl_id;
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_blog_post.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_blog_post.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item.title+"</b></p></a><div>"+
                "<span class='mb-0 ps-3 font-12 pt-1 '><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-12  opacity-60'>"+item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3 a-gear' style='float:left;'>"+
                "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='blog_post_detail.html?title_url="+item.title_url+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_copy ' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
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
             		set_page_note(set_page_note_remove(parseInt($('#biz_page_item_list_count').val())));
					bind_page_list_count(parseInt($('#biz_page_item_list_count').val()));
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
            $('#biz_img').hide();
            $('#biz_div_mp3').hide();
        }else{
            set_page_sub_title('Edit Blog Post');
            $('#biz_img').attr('src',data.blog_post.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.blog_post.title);
        $('#biz_tb_author').val(data.blog_post.author);
        $('#biz_tb_youtube_url').val(data.blog_post.youtube_url);
        $('#biz_tb_pdf_link').val(data.blog_post.pdf_link);
        $('#biz_tb_mp3_filename').val(data.blog_post.mp3filename);
        $('#biz_tb_sub_note').val(data.blog_post.sub_note);
        $('#biz_sel_visible').val(data.blog_post.visible);
        if(!data.blog_post.visible){
            $('#biz_sel_visible').val('true');
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
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.author=$('#biz_tb_author').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.pdf_link=$('#biz_tb_pdf_link').val();
            obj.mp3filename=$('#biz_tb_mp3_filename').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.title_url=get_title_url(obj.title);
            obj.note=get_item_note();
            if(!obj.title){
                show_toast_error('Please enter a valid title');
            }else if(!obj.category){
                show_toast_error('Please select a valid category');
            }else{
                cloud_update(data_type,tbl_id,obj, function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                     $('#biz_img').show();
                    $('#biz_div_mp3').show();
                    show_toast_update();
                    return false;
                });
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
                    $('#biz_img').show();
                    $('#biz_img').attr('src',data.photo_obj.square_mid_url);
                    $('#biz_page_photofilename').val(data.photofilename);
                    return false;
                });
            });
        });
        $("#biz_tb_mp3_filename").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            file_mp3_select(function(data){
                cloud_update(data_type,tbl_id,{mp3filename:data.mp3filename, mp3duration:data.mp3duration},function(data){
                    $("#biz_tb_mp3_filename").val(data.mp3filename);
                    return false;
                });
            });
        });
    }
}
