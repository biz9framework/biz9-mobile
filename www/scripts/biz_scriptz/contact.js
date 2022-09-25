function set_page_contact(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('#biz_div_contact_form').hide();
    $('#biz_div_contact_social').hide();
    $('#biz_div_info_title').hide();
    $('#biz_div_info_header').hide();
    if(data.contact.contact_form_visible=='true'){
        $('#biz_div_contact_form').show();
        $('#biz_div_contact_title').html(data.contact.contact_form_title);
        $('#biz_div_contact_note').html(data.contact.contact_form_note);
    }
    if(data.contact.contact_social_visible=='true'){
        $('#biz_div_contact_social').show();
        $('#biz_div_info_title').show();
        $('#biz_div_info_title').html(data.contact.contact_info_title);
        $('#biz_div_info_note').html(data.contact.contact_info_note);
        if(data.contact.contact_info_title && data.contact.contact_info_title!=null){
            $('#biz_div_info_header').show();
        }
    }
    var target = "_blank";
    var options = "location=yes";
    if(data.contact.contact_social_address){
        $('#biz_contact_link_address2').html(data.contact.contact_social_address);
        $("#biz_contact_link_address").click(function() {
            url='https://maps.google.com/?q='+data.contact.contact_social_address;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_address').remove();
    }
    if(data.contact.contact_social_phone){
        $('#biz_contact_link_phone2').html(data.contact.contact_social_phone);
        $("#biz_contact_link_phone").click(function() {
            url='tel:'+data.contact.contact_social_phone;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_phone').remove();
    }
    if(data.contact.contact_social_email){
        $('#biz_contact_link_email2').html(data.contact.contact_social_email);
        $("#biz_contact_link_email").click(function() {
            url='mailto:'+data.contact.contact_social_email;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_email').remove();
    }
    if(data.contact.contact_social_facebook){
        $('#biz_contact_link_facebook2').html('facebook');
        $("#biz_contact_link_facebook").click(function() {
            url='https://facebook.com/'+data.contact.contact_social_facebook;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_facebook').remove();
    }
    if(data.contact.contact_social_youtube){
        $('#biz_contact_link_youtube2').html('youtube');
        $("#biz_contact_link_youtube").click(function() {
            url=data.contact.contact_social_youtube;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_youtube').remove();
    }
    if(data.contact.contact_social_twitter){
        $('#biz_contact_link_twitter2').html(data.contact.contact_social_twitter);
        $("#biz_contact_link_twitter").click(function() {
            url='https://twitter.com/'+data.contact.contact_social_twitter;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_twitter').remove();
    }
    if(data.contact.contact_social_instagram){
        $('#biz_contact_link_instagram2').html(data.contact.contact_social_instagram);
        $("#biz_contact_link_instagram2").click(function() {
            url = 'https://instagram.com/'+data.contact.contact_social_instagram;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_instagram').remove();
    }
    if(data.contact.contact_social_website){
        $('#biz_contact_link_website2').html(data.contact.contact_social_website);
        $("#biz_contact_link_website").click(function() {
            url='http://'+data.contact.contact_social_website;
            window.open(url, target, options);
        });
    }else{
        $('#biz_contact_link_website').remove();
    }
    $("#biz_btn_submit").click(function() {
        full_name= $('#biz_tb_name').val();
        email= $('#biz_tb_email').val();
        message= $('#biz_tb_message').val();

        if(!full_name){
            alert('Please enter a valid name');
        }else if(!validate_email(email)){
            alert('Please enter a valid e-mail');
        }else{
            alert("We've received your message and we're working on it.");
        }
    });

    load_validate_fields();
    /*
    $('#biz_lbl_header').html(data.about.header);
    $('#biz_lbl_sub_note').html(data.about.sub_text);
    $('#biz_lbl_paragraph').html(data.about.paragraph);
    if(!data.about.photofilename){
        $('#biz_img_main').hide();
    }else{
       $('#biz_img_main').attr('src',data.about.mid_photo_url);
    }
    */
}
