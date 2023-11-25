//9_member_category_list//9_category_list
function set_page_member_category_list(data){
    hide_cart();
    set_page_title(data.mobile.primary.app_title);
    bind_list(data.category_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item = item_list[a];
            str=str+"<div class='card card-style'>"+
                "<div class='card card-style rounded-0 mx-0'  style='background-image: url("+item.photo_obj.mid_url+")'  data-card-height='500'>"+
                "<div class='card-bottom text-center'>"+
                "<h1 class='color-white mb-n1'>"+item.title+"</h1>"+
                "<p class='color-white opacity-60 pb-2'></p>"+
                "</div>"+
                "<div class='card-overlay bg-gradient rounded-0'></div>"+
                "</div>"+
                "<a href='member_list.html?category="+item.title+"&page_current=1' class='btn btn-center-m font-700 text-uppercase btn-m under-slider-btn mb-4 rounded-xl biz_btn'>View (" +item.item_count +  " items)</a>"+
                "<div class='content mt-n2 text-center'>"+
                "<p class='boxed-text-xl mb-3'>"+
                item.sub_note
                +"</p>"+
                "</div>"+
                "</div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            url="member/category_list/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.category_list,page_current,data.page_count);
            });
        });
    }
}
//9_member_list /9_list
function set_page_member_list(data){
    hide_cart();
    set_page_title(data.mobile.primary.app_title);
    set_page_sub_title(data.category);
    $('#biz_page_category').val(data.category);
    bind_list(data.member_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            str=str+"<div class='col-6'>";
            str=str+"<div class='bg-theme rounded-m py-3 text-center'>"+
                "<img src='"+item.photo_obj.thumb_url+"' class='gradient-green mx-auto rounded-xl' width='100'>"+
                "<h2 class='pt-3'>"+item.first_name+" " + item.last_name+ "</h2>"+
                "<p class='mt-n2 color-blue-dark'>"+item.position+"</p>"+
                "<p class='mt-n2 '>"+item.bio+"</p>"+
                "</div>";
            str=str+"</div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category=$('#biz_page_category').val();
            url='member/member_list/'+category+'/'+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.member_list,page_current,data.page_count);
            });
        });
    }
}
// 9_edit_list 9_list//9_dashboard_list
function set_dashboard_member_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    set_page_title('Dashboard');
    set_page_sub_title('Members');
    set_page_note("(" + data.item_count + " items)");
    bind_list(data.member_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        str='';
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

            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_member.html?tbl_id="+item.tbl_id+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_member.html?tbl_id="+item.tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item.first_name+ ' '  +item.last_name+"</b></p></a><div>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-12  opacity-60'>"+item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
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
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            url='member/member_list/all/'+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.member_list,page_current,data.page_count);
            });
        });
        $(".biz_btn_copy").click(function() {
            show_spinner();
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Copy?") == true) {
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
        $("#biz_btn_add").click(function() {
            tbl_id = 0;
            data_type = $('#biz_page_data_type').val();
            window.location='dashboard_member.html?tbl_id='+tbl_id+"&data_type="+data_type;
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
//9_member_detail 9_member_edit 9_edit 9_dash
function set_dashboard_member(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.member);
    bind_detail(data);
    bind_event();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        if(data.member.tbl_id==0){
            set_page_sub_title('Add Member');
            $('#biz_img').hide();
        }else{
            set_page_sub_title('Edit Member');
            $('#biz_img').attr('src',data.member.photo_obj.square_mid_url);
        }
        $('#biz_tb_first_name').val(data.member.first_name);
        $('#biz_tb_last_name').val(data.member.last_name);
        $('#biz_tb_bio').val(data.member.bio);
        $('#biz_sel_visible').val(data.member.visible);
        str='';
        for(a=0;a<data.category_list.length;a++){
            str=str+ "<option value='"+data.category_list[a].title+"' selected>"+data.category_list[a].title+"</option>";
        }
        $('#biz_sel_category_list').html(str);
        $('#biz_sel_category_list').val(data.member.category);

    }
    function bind_event(){
        $("#biz_btn_update").click(function() { var obj={};
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.photofilename= $('#biz_page_photofilename').val();
            obj.first_name=$('#biz_tb_first_name').val();
            obj.last_name=$('#biz_tb_last_name').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.title=obj.first_name + obj.last_name;
            obj.title_url=get_title_url(obj.title);
            if(obj.first_name){
                cloud_update(data_type,tbl_id,obj,function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    $('#biz_img').show();
                    show_toast_update();
                    return false;
                });
            }else{
                show_toast_error('Please enter a valid first name');
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
