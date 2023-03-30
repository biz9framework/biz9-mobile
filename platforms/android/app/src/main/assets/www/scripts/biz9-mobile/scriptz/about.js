//9_about
function set_page_about(data){
    set_page_title(data.mobile.primary.app_title);
    bind_about_detail(data.mobile.about);
    hide_spinner();
    function bind_about_detail(data){
        $('#biz_lbl_header').html(data.header);
        $('#biz_lbl_sub_note').html(data.sub_note);
        $('#biz_lbl_paragraph').html(data.note);
        if(!data.photofilename){
            $('#biz_img_main').hide();
        }else{
            $('#biz_img_main').attr('src',data.photo_obj.square_mid_url);
        }
    }
}
//9_dashboard 9_edit
function set_dashboard_about(data){
    set_page_title('Dashboard');
    hide_cart();
    hide_footer();
    bind_page_id(data.mobile.about);
    bind_detail(data.mobile.about);
    bind_event();
    init_tab();
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_sub_title('About');
        init_item_note(data.note);
        $('#biz_tb_header').val(data.header);
        $('#biz_tb_sub_note').val(data.sub_note);
        $('#biz_img').attr('src',data.photo_obj.square_mid_url);
    }
    function bind_event(){
        $("#biz_update").click(function() {
            var obj={};
            obj.data_type=$('#biz_page_data_type').val();
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.header=$('#biz_tb_header').val();
            obj.note=$('#biz_tb_sub_note').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.note=get_item_note();
            obj.biz_list="header,sub_note";
            cloud_update_biz(obj.data_type,obj.tbl_id,obj,function(data){
                show_toast_update();
            });
        });
       $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img').attr('src',data.photo_obj.square_mid_url);
                });
            });
        });
    }
}


