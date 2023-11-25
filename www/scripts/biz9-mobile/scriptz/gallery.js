//9_gallery_category_list//9_category_list
function set_page_gallery_category_list(data){
    hide_cart();
    set_page_title(data.mobile.primary.app_title);
    bind_list(data,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(data,page_current,page_count){
        var str='';
        for(var a=0;a<data.category_list.length;a++){
            item = data.category_list[a];
            str=str+"<div class='card card-style'>"+
                "<div class='card card-style rounded-0 mx-0'  style=' background-color:transparent; height:320px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item.photo_obj.mid_url+")' >"+
                "<div class='card-bottom text-center'>"+
                "<p class='color-white opacity-60 pb-2'></p>"+
                "</div>"+
                "<div class='card-overlay bg-gradient rounded-0'></div>"+
                "</div>"+
                "<a href='gallery_list.html?category="+item.title+"&page_current=1' class='btn btn-center-m  btn-m under-slider-btn mb-4 rounded-xl biz_btn' style='width:200px'><h4>"+item.title+" (" + item.item_count +")</h4></a>"+
                "<div class='content mt-n2 text-center'>"+
                "<p class='boxed-text-xl mb-3 font-12'>"+
                item.sub_note
                +"</p>"+
                "</div>"+
                "</div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count,data.mobile.primary.button_color));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            url="gallery/category_list/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.category_list,page_current,data.page_count);
            });
        });
    }
}
//9_list 9_gallery_list
function set_page_gallery_list(data){
    hide_cart();
    set_page_title(data.mobile.primary.app_title);
    set_page_sub_title(data.category);
    set_page_note(data.sub_note);
    $('#biz_page_category').val(data.category);
    bind_list(data,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(data,page_current,page_count){
        str='';
        for(a=0;a<data.gallery_list.length;a++){
            item=data.gallery_list[a];
            str=str+"<a class='col' href='gallery_detail.html?title_url="+item.title_url+"' title="+item.title+">"+
                "<img src='"+item.photo_obj.square_mid_url+"'  class='preload-img img-fluid rounded-s' alt='img'>"+
                "<p class='font-12'>"+item.title+"</p>"+
                "</a>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_pager').html(get_pager_ajax(page_current,page_count,data.mobile.primary.button_color));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            category=$('#biz_page_category').val();
            page_current=$(this).attr('page_current');
            url="gallery/gallery_list/"+category+"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data,page_current,data.page_count);
            });
        });
    }
}
//9_detail 9_gallery_detail
function set_page_gallery_detail(data){
    hide_cart();
    bind_page_id(data.gallery);
    bind_review(data.gallery);
    bind_detail(data);
    bind_photo_list(data);
    bind_event();
    hide_spinner();
    function bind_detail(data){
        set_page_title(data.mobile.primary.app_title);
        set_page_view_count(data.gallery.view_count);
        set_page_sub_title(data.gallery.title);
        set_page_sub_note(data.gallery.sub_note);
        set_page_note(data.gallery.note);
        $("#biz_link_category").attr('href',"gallery_list.html?category="+data.gallery.category+"&page_current=1");
        $("#biz_link_category").html(data.gallery.category);
        $("#biz_lbl_gallery_control").show();
        $("#biz_lbl_stat_count").show();
        date ="<span style='margin-right:5px;class=''><i class='fa fa-clock pe-2 ml-5'></i>"+data.gallery.date_obj.date_create+" " + data.gallery.date_obj.month_create +", " + data.gallery.date_obj.year_create +" at "+ data.gallery.date_obj.time_update +"</span>";
        $("#biz_lbl_info").html(date);
        if(data.gallery.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.gallery.youtube_url));
        }
        if(data.gallery.mp3filename){
            $("#biz_lbl_card_mp3").show();
            $("#biz_lbl_mp3_duration").html(data.gallery.mp3duration);
            $("#biz_page_mp3_url").val(data.gallery.mp3_url);
        }
        if(data.card_double_list.length>1){
            bind_double_slide_show(data);
            $("#biz_lbl_double_card").show();
            init_double_slide_show('#slider_double');
        }
    }
    function bind_double_slide_show(data){
        var str='';
        $('#biz_lbl_double_category').html(data.gallery.category);
        $('#biz_lbl_double_slide_show_list').html('');
        for(var a=0;a<data.card_double_list.length;a++){
            var item = data.card_double_list[a];
            url='gallery_detail.html?title_url='+item.title_url;
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
    function bind_photo_list(data){
        function get_photo_str(item){
            if(!item.text){
                item.text=' ';
            }
            return "<a data-gallery='gallery-1' href='"+item.photo_obj.album_url+"' title='"+item.text+"'>"+
                "<img src='"+item.photo_obj.album_url+"' data-src='"+item.photo_obj.album_url+"' class='rounded-m preload-img shadow-l img-fluid' alt=''>"+
                "<p class=' pt-2' style='text-align:center'>"+ truncate_str(item.text, 50) +"</p>"+
                "</a>";
        }
        var str='';
        if(data.gallery.photofilename){
            str=get_photo_str(data.gallery);
        }
        if(data.gallery.photos.length>0){
            for(var a=0;a<data.gallery.photos.length;a++){
                item = data.gallery.photos[a];
                item.text = item.text ? item.text:'';
                str=str+get_photo_str(item);
            }
        }
        if(str){
            $('#biz_lbl_list').html('');
            $('#biz_lbl_list').html(str);
            init_plugin();
        }else{
            $('#biz_lbl_gallery_control').html('');
        }
    }
    function bind_event(){
        $(".biz_link_page").click(function() {
            page_current = $(this).attr('page_current');
            url="category/category_list/"+DT_GALLERY+"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.category_list,page_current,data.page_count);
            });
        });
    }
}
//9_gallery_list 9_edit_list 9_list 9_dashboard_gallery_list //9_dashboard
function set_dashboard_gallery_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    bind_gallery_list_detail(data);
    hide_spinner();
    bind_list(data.gallery_list,data.page_current,data.page_count);
    function bind_gallery_list_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Galleries');
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
                "<a href='dashboard_gallery.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_gallery.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item.title+"</b></p></a><div>"+
                "<span class='mb-0 ps-3 font-12 pt-1 '><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-12  opacity-60'>"+item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='gallery_detail.html?title_url="+item.title_url+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
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
            url='gallery/gallery_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.gallery_list,page_current,data.page_count);
            });
        });
        $(".biz_btn_edit_photo").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            camera_photo_select(function(data){
                post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img_'+tbl_id).attr('src',data.photo_square_thumb_url);
                });
            });
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_gallery.html?title_url=0';
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
//9_gallery_detail 9_gallery_edit 9_edit 9_dashboard_gallery_edit
function set_dashboard_gallery(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.gallery);
    bind_detail(data);
    bind_event();
    init_tab();
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        init_item_note(data.gallery.note);
        if(data.gallery.tbl_id==0){
            set_page_sub_title('Add Gallery');
            $('#biz_img').hide();
            $('#biz_div_mp3').hide();
        }else{
            set_page_sub_title('Edit Gallery');
            $('#biz_img').attr('src',data.gallery.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.gallery.title);
        $('#biz_tb_youtube_url').val(data.gallery.youtube_url);
        $('#biz_tb_mp3_filename').val(data.gallery.mp3filename);
        $('#biz_tb_sub_note').val(data.gallery.sub_note);
        $('#biz_sel_visible').val(data.gallery.visible);
        if(!data.gallery.visible){
            $('#biz_sel_visible').val('true');
        }
        str='';
        for(a=0;a<data.category_list.length;a++){
            str=str+ "<option value='"+data.category_list[a].title+"' selected>"+data.category_list[a].title+"</option>";
        }
        $('#biz_sel_category_list').html(str);
        $('#biz_sel_category_list').val(data.gallery.category);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
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
                    $('#biz_img').show();
                    $('#biz_div_mp3').show();
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    show_toast_update();
                    return false;
                });
            }
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_gallery.html?title_url=0';
        });
        $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
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
                cloud_update(data_type,tbl_id,{mp3filename:data.mp3filename,mp3duration:data.mp3duration},function(data){
                    $("#biz_tb_mp3_filename").val(data.mp3filename);
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

    }
}
