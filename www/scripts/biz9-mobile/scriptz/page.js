//9_list
function set_page_page_list(data){
    set_page_title(data.mobile.primary.app_title);
    bind_page_list(data.mobile.page_list.items);
    hide_spinner();
    function bind_page_list(item_list){
        var str='';
        url='';
        for(var a=0;a<item_list.length;a++){
            item= item_list[a];
            if(String(item.visible)=='true'){
            switch(item_list[a].type) {
                case DT_BLOG_POST:
                    url = 'blog_post_category_list.html?page_current=1';
                    break;
                case DT_PRODUCT:
                    url = 'product_category_list.html?page_current=1';
                    break;
                case DT_SERVICE:
                    url = 'service_category_list.html?page_current=1';
                    break;
                case DT_GALLERY:
                    url = 'gallery_category_list.html?page_current=1';
                    break;
                case DT_EVENT:
                    url = 'event_category_list.html?page_current=1';
                    break;
                case DT_MEMBER:
                    url = 'member_category_list.html?page_current=1';
                    break;

            }
            item.sub_note=item.sub_note?(item.sub_note):'';
            str=str+"<a href='"+url+"' class='card card-style mb-3' style=' background-color:transparent; height:180px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image:url("+item.photo_obj.square_mid_url+")'>"+
                "<div class='card-center px-3'>"+
                "<h1 class='color-white font-800 font-24'>"+item.title+"</h1>"+
                "<p class='color-white mt-n2 mb-0 opacity-70'>"+
                item.sub_note+
                "</p>"+
                "</div>"+
                "<div class='card-center'>";
            str=str+"</div>"+
                "<div class='card-overlay bg-black opacity-85'></div>"+
                "</a>";
            }
        }
        $('#biz_lbl_list').html(str);
    }
}
//9_page_list 9_dashboard
function set_dashboard_page_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_detail(data);
    bind_page_list(data.mobile.page_list.items,data.page_current,data.page_count);
    hide_spinner();
    function bind_page_list_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Pages');
    }
    function bind_page_list(item_list,page_current,page_count){
        var str='';
        var visble='str';
        var title_type='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            if(String(item.visible)=='true'){
                visible_str="<span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
            }else{
                visible_str="<span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
            }
            var category_url='';
            if(item.type==DT_EVENT){
                category_url='event_category_list.html?page_current=1';
                title_type='Events';
            }else if(item.type==DT_GALLERY){
                category_url='gallery_category_list.html?page_current=1';
                title_type='Gallery';
            }else if(item.type==DT_BLOG_POST){
                category_url='blog_post_category_list.html?page_current=1';
                title_type='Blog Posts';
            }else if(item.type==DT_SERVICE){
                category_url='service_category_list.html?page_current=1';
                title_type='Service';
            }else if(item.type==DT_PRODUCT){
                category_url='product_category_list.html?page_current=1';
                title_type='Product';
            }else if(item.type==DT_MEMBER){
                category_url='member_category_list.html?page_current=1';
                title_type='Team';
            }
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
                "</a>";
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_page.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_page.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b>"+item.title+"</b></p></a><div>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-10  opacity-60'>"+title_type+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+category_url+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div></div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        bind_page_event();
    }
    function bind_page_event(){
        $("#biz_btn_add").click(function() {
            window.location='dashboard_page.html?title_url=0';
        });
        $(".biz_btn_page_delete").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Delete?") == true) {
                post_crud_delete_item(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
                });
            }
        });
        $(".biz_btn_edit_photo").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            camera_photo_select(function(data){
                post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
                    $('#biz_img_'+tbl_id).attr('src',data.photo_obj.square_thumb_url);
                });
            });
        });
    }
}
//9_page_detail 9_page_edit //9_edit
function set_dashboard_page(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.page);
    bind_detail(data);
    bind_event();
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Edit Page ' + data.page.title);

        $('#biz_page_parent_tbl_id').val(data.page.parent_tbl_id);
        $('#biz_page_parent_data_type').val(data.page.parent_data_type);
        $('#biz_page_top_tbl_id').val(data.page.top_tbl_id);
        $('#biz_page_top_data_type').val(data.page.top_data_type);
        $('#biz_page_type').val(data.page.type);
        if(data.page.tbl_id==0){
            set_page_sub_title('Add Page');
        }else{
            set_page_sub_title('Edit Page');
            $('#biz_img').attr('src',data.page.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.page.title);
        $('#biz_tb_type').val(data.page.type);
        $('#biz_tb_sub_note').val(data.page.sub_note);
        $('#biz_tb_button_text').val(data.page.button_text);
        $('#biz_sel_visible').val(data.page.visible);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj={};
            page_tbl_id= $('#biz_page_tbl_id').val();
            page_data_type= $('#biz_page_data_type').val();
            obj.title=$('#biz_tb_title').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.button_text=$('#biz_tb_button_text').val();
            obj.type=$('#biz_tb_type').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.title_url=get_title_url(obj.title);
            obj.parent_tbl_id=$('#biz_page_parent_tbl_id').val();
            obj.parent_data_type=$('#biz_page_parent_data_type').val();
            obj.top_tbl_id=$('#biz_page_top_tbl_id').val();
            obj.top_data_type=$('#biz_page_top_data_type').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.biz_list='sub_note,type';
            if(!obj.title){
                show_toast_error('please enter title');
            }else{
                cloud_update_biz(page_data_type,page_tbl_id,obj, function(data){
                    show_toast_update();
                });
            }
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
