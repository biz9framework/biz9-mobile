function set_page_comment_add(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    $("#biz_btn_comment_add").click(function() {
        name= $('#biz_tb_name').val();
        _location= $('#biz_tb_location').val();
        comment= $('#biz_tb_comment').val();
        tbl_id=0;
        data_type=G_DT_COMMENT;
        if(!name){
            alert('Please enter a valid name');
        }else if(!comment){
            alert('Please enter a valid comment');
        }else{
            post_crud_update_item(data_type,tbl_id,{
                name:name,
                location:_location,
                comment:comment,
            }, function(data){
                alert("Thank you for your comment.");
                //window.location='admin_edit_product_category_list.html';
            });
        }
    });
    load_validate_fields();
}
