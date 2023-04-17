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
                "<div class='card card-style rounded-0 mx-0'  style='background-image: url("+item.photo_obj.mid_url+")'  data-card-height='500'>"+
                "<div class='card-bottom text-center'>"+
                "<h1 class='color-white mb-n1'>"+item.title+"</h1>"+
                "<p class='color-white opacity-60 pb-2'></p>"+
                "</div>"+
                "<div class='card-overlay bg-gradient rounded-0'></div>"+
                "</div>"+
                //"<a href='gallery_list.html?category="+item.title+"&page_current=1' class='btn " +data.mobile.primary.button_color + " btn-center-m biz_btn font-700 text-uppercase btn-m under-slider-btn mb-4 rounded-xl'>View (" +item.item_count +  " items)</a>"+
                "<a href='gallery_list.html?category="+item.title+"&page_current=1' class='btn  btn-center-m biz_btn font-700 text-uppercase btn-m under-slider-btn mb-4 rounded-xl biz_btn'>View (" +item.item_count +  " items)</a>"+
                "<div class='content mt-n2 text-center'>"+
                "<p class='boxed-text-xl mb-3'>"+
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
    set_page_note("(" + data.item_count + " items)");
    $('#biz_page_category').val(data.category);
    bind_list(data,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(data,page_current,page_count){
        str='';
        for(a=0;a<data.gallery_list.length;a++){
            item=data.gallery_list[a];
            str=str+"<a class='col' href='gallery_detail.html?title_url="+item.title_url+"' title="+item.title+">"+
                "<img src='"+item.photo_obj.square_mid_url+"'  class='preload-img img-fluid rounded-s' alt='img'>"+
                "<p class='font-600'>"+item.title+"</p>"+
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
    hide_detail();
    hide_cart();
    bind_page_id(data.gallery);
    bind_review(data.gallery);
    bind_detail(data);
    bind_photo_list(data);
    bind_event();
    hide_spinner();
    function hide_detail(){
        $("#biz_lbl_card_youtube").hide();
    }
    function bind_detail(data){
        set_page_title(data.mobile.primary.app_title);
        set_page_view_count(data.gallery.view_count);
        set_page_sub_title(data.gallery.title);
        set_page_sub_note(data.gallery.sub_note);
        set_page_note(data.gallery.note);
        if(data.gallery.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.gallery.youtube_url));
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
                    "<a href='dashboard_gallery.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                    "</div>"+
                    "<div class='biz_diz_list_title'><a href='dashboard_gallery.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-11'>"+item.title+"</b></p></a><div>"+
                    "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                    "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                    "</div>"+
                    "<p class='mb-0 ps-3 font-10  opacity-60'>"+item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                    "<div class='accordion ' id='accordion-"+a+"'>"+
                    "<div class=''>"+
                    "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                    "<div class='mb-0 ps-3  ' style='float:left;'>"+
                    "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='gallery_detail.html?title_url="+item.title_url+"'><i class='admin_edit_img fa fa-eye pe-2'></i></a>"+
                    "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2'></i></a>"+
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
                        item_count=String(parseInt($('#biz_page_item_list_count').val())-1);
                        bind_page_list_count(item_count);
                        set_page_note("(" + item_count + " items)");
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
            }else{
                set_page_sub_title('Edit Gallery');
                $('#biz_img').attr('src',data.gallery.photo_obj.square_mid_url);
            }
            $('#biz_tb_title').val(data.gallery.title);
            $('#biz_tb_youtube_url').val(data.gallery.youtube_url);
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
                obj.title=$('#biz_tb_title').val();
                obj.category=$('#biz_sel_category_list').val();
                obj.youtube_url=$('#biz_tb_youtube_url').val();
                obj.sub_note=$('#biz_tb_sub_note').val();
                obj.visible=$('#biz_sel_visible').val();
                obj.title_url=get_title_url(obj.title);
                obj.note=get_item_note();
                if(obj.title){
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
                window.location='dashboard_gallery.html?title_url=0';
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
        }
    }
    //9_gallery_media 9_gallery_media_edit 9_dashboard_gallery
    function set_dashboard_gallery_media(data){
        hide_footer();
        set_page_title('Dashboard');
        set_page_sub_title(data.gallery.title + " Media");
        $('#biz_mp3').hide();
        $('#biz_page_tbl_id').val(data.gallery.tbl_id);
        $('#biz_page_data_type').val(data.gallery.data_type);
        $('#biz_tb_mp3_title').val(data.gallery.mp3_title);
        $('#biz_tb_mp3_note').val(data.gallery.mp3_note);
        $('#biz_mp3filename').val(data.gallery.mp3filename);
        $('#biz_mp3duration').val(data.gallery.mp3duration);
        $('#biz_mp3_url').val(data.gallery.mp3_url);
        if(data.gallery.mp3filename){
            $('#biz_div_mp3').show();
            $('#biz_tb_mp3_title').val(data.gallery.mp3_title);
            $('#biz_tb_mp3_note').val(data.gallery.mp3_note);
            $('#biz_mp3filename').val(data.gallery.mp3filename);
            $('#biz_mp3_url').val(data.gallery.mp3_url);
            $('#biz_tb_mp3duration').val(data.gallery.mp3duration);
            set_mp3_player(data.gallery.mp3_url);
        }
        $('#biz_tb_youtube_link').val(data.gallery.youtube_link);
        $('#biz_tb_youtube_title').val(data.gallery.youtube_title);
        $('#biz_tb_youtube_note').val(data.gallery.youtube_note);
        load_validate_fields();
        set_tabs();
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
            cloud_update(obj.data_type,obj.tbl_id,obj, function(data){
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
