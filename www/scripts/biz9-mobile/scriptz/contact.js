//9_contact
function set_page_contact(data){
    set_page_title(data.mobile.primary.app_title);
    hide_cart();
    bind_detail(data.mobile.contact, data.info);
    init_form();
    hide_spinner();
    function bind_detail(contact,info){
            $('#biz_lbl_form_header').html(contact.form_header);
            $('#biz_lbl_form_sub_note').html(contact.form_sub_note);
            $('#biz_lbl_social_header').html(contact.social_header);
            $('#biz_lbl_social_sub_note').html(contact.social_sub_note);
        var target = "_blank";
        var options = "location=yes";
        if(info.business_address1){
            addr_str = info.business_address1 +  " " + info.business_address2+  " " + info.business_city + " " + info.business_zip+  " " + info.business_country;
            $('#biz_lbl_social_address').html(addr_str);
            $("#biz_lbl_link_address").click(function() {
                url='https://maps.google.com/?q='+addr_str;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_address').remove();
        }
        if(info.business_phone){
            $('#biz_lbl_social_phone').html(info.business_phone);
            $("#biz_lbl_link_phone").click(function() {
                url='tel:'+info.business_phone;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_phone').remove();
        }
        if(data.business_email){
            $('#biz_lbl_social_email').html(data.business_email);
            $("#biz_lbl_link_email").click(function() {
                url='mailto:'+data.business_email;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_email').remove();
        }
        if(info.social_facebook){
            $('#biz_lbl_social_facebook').html('facebook');
            $("#biz_lbl_link_facebook").click(function() {
                url='https://facebook.com/'+data.social_facebook;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_facebook').remove();
        }
        if(info.social_youtube){
            $('#biz_lbl_social_youtube').html('youtube');
            $("#biz_lbl_link_youtube").click(function() {
                url=data.social_youtube;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_youtube').remove();
        }
        if(info.social_twitter){
            $('#biz_lbl_social_twitter').html(info.social_twitter);
            $("#biz_lbl_link_twitter").click(function() {
                url='https://twitter.com/'+info.social_twitter;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_twitter').remove();
        }
        if(info.social_instagram){
            $('#biz_lbl_social_instagram').html(info.social_instagram);
            $("#biz_lbl_link_instagram").click(function() {
                url = 'https://instagram.com/'+info.social_instagram;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_instagram').remove();
        }
        if(info.social_website){
            $('#biz_lbl_social_website').html(info.social_website);
            $("#biz_lbl_link_website").click(function() {
                url='http://'+info.social_website;
                window.open(url, target, options);
            });
        }else{
            $('#biz_lbl_link_website').remove();
        }
    }
    $("#biz_btn_submit").click(function() {
        full_name= $('#biz_tb_name').val();
        email= $('#biz_tb_email').val();
        message= $('#biz_tb_message').val();
        if(!full_name){
            show_toast_error('Please enter a valid name');
        }else if(!validate_email(email)){
            show_toast_error('Please enter a valid e-mail');
        }else{
            show_toast_error("We've received your message and we're working on it.");
        }
    });
}
//9_contact_detail 9_contact_edit 9_dash
function set_dashboard_contact(data){
    hide_cart();
    hide_footer();
    bind_page_id(data.mobile.contact);
    bind_detail(data.mobile.contact);
    bind_event();
    init_tab();
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Contact');
        $('#biz_tb_form_header').val(data.form_header);
        $('#biz_tb_form_sub_note').val(data.form_sub_note);
		$('#biz_tb_social_header').val(data.social_header);
        $('#biz_tb_social_sub_note').val(data.social_sub_note);
    }
    function bind_event(){
        $("#biz_btn_contact_update").click(function() {
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.form_header=$('#biz_tb_form_header').val();
            obj.form_sub_note=$('#biz_tb_form_sub_note').val();
            obj.social_header=$('#biz_tb_social_header').val();
            obj.social_sub_note=$('#biz_tb_social_sub_note').val();
            obj.biz_list="'form_header','form_sub_note','social_header','social_sub_note'";
            cloud_update_biz(data_type,tbl_id,obj, function(data){
                $('#biz_page_tbl_id').val(data.tbl_id);
                show_toast_update();
            });
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
