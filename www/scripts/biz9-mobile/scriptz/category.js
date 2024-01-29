//9_category_list
function set_dashboard_category_list(data){
	hide_footer();
	hide_cart();
	bind_page_list_count(data.item_count);
	set_page_title('Dashboard');
	set_page_sub_title('Categories');
	bind_list(data.category_list,data.page_current,data.page_count);
    bind_event();
	hide_spinner();
	function bind_list(item_list,page_current,page_count){
        var str='';
        for(a=0;a<item_list.length;a++){
            if(String(item_list[a].visible)=='true'){
                visible_str=" | <span><i class='fa-sharp fa-solid fa-circle-check color-green-dark'></i></span>";
            }else{
                visible_str=" | <span> <i class='fa-sharp fa-solid fa-circle-xmark color-red-dark'></i> </span>";
            }
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
                "</a>";
            photo_edit_url="dashboard_photo_list.html?parent_data_type="+item_list[a].data_type+"&parent_tbl_id="+item_list[a].tbl_id;
			view_str='';
			if(item_list[a].type==DT_BLOG_POST){
				view_str="blog_post_list.html?category="+item_list[a].title+"&page_current=1";
			}else if(item_list[a].type==DT_EVENT){
				view_str="event_list.html?category="+item_list[a].title+"&page_current=1";
			}else if(item_list[a].type==DT_GALLERY){
				view_str="gallery_list.html?category="+item_list[a].title+"&page_current=1";
			}else if(item_list[a].type==DT_PRODUCT){
				view_str="product_list.html?category="+item_list[a].title+"&page_current=1";
			}else if(item_list[a].type==DT_SERVICE){
				view_str="service_list.html?category="+item_list[a].title+"&page_current=1";
			}else if(item_list[a].type==DT_MEMBER){
				view_str="member_list.html?category="+item_list[a].title+"&page_current=1";
			}

            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item_list[a].tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_category.html?title_url="+item_list[a].title_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_div_list_title'><a href='dashboard_category.html?title_url="+item_list[a].title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item_list[a].title+"</b></p></a><div>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-12  opacity-60'>"+item_list[a].type_title+ visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3 a-gear' style='float:left;'>"+
                "<div class='biz_div_list_edit'><a tbl_id='"+item_list[a].tbl_id +"' class='#' href='"+view_str+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+


                "<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
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
	}
    function bind_event(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            data_type='all';
            url='category/category_list/'+data_type +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.category_list,page_current,data.page_count);
            });
        });
        $(".biz_btn_delete").click(function() {
            tbl_id = $(this).attr('tbl_id');
            data_type = $(this).attr('data_type');
            if (confirm("Delete?") == true) {
                cloud_delete(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
             		set_page_note(set_page_note_remove(parseInt($('#biz_page_item_list_count').val())));
					bind_page_list_count(parseInt($('#biz_page_item_list_count').val()));
                });
            }
        });
        $("#biz_btn_add").click(function() {
            tbl_id = 0;
            data_type = $('#biz_page_data_type').val();
            window.location='dashboard_category.html?title_url='+tbl_id+"&data_type="+data_type;
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
    }
}
//9_category_detail 9_category_edit 9_edit 9_dash
function set_dashboard_category(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.category);
    bind_detail(data);
    bind_event();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        if(data.category.tbl_id==0){
            set_page_sub_title('Add Category');
            $('#biz_img').hide();
        }else{
            set_page_sub_title('Edit Category');
            $('#biz_img').attr('src',data.category.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.category.title);
        $('#biz_tb_sub_note').val(data.category.sub_note);
        var str='';
        for(a=0;a<data.category_title_list.length;a++){
            str=str+ "<option value='"+data.category_title_list[a].value+"' selected>"+data.category_title_list[a].title+"</option>";
        }
        $('#biz_sel_category_title_list').html(str);
        $('#biz_sel_category_title_list').val(data.category.type);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() { var obj={};
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.photofilename= $('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.title_url=get_title_url(obj.title);
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.type=$('#biz_sel_category_title_list').val();
            if(obj.title){
                cloud_update(data_type,tbl_id,obj,function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    $('#biz_img').show();
                    show_toast_update();
                    return false;
                });
            }else{
                show_toast_error('Please enter a valid title');
            }
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
    }
}
