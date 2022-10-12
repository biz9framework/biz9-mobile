function set_page_about(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('#biz_lbl_header').html(data.about.header);
    $('#biz_lbl_sub_note').html(data.about.sub_note);
    $('#biz_lbl_paragraph').html(data.about.note);
    if(!data.about.photofilename){
        $('#biz_img_main').hide();
    }else{
       $('#biz_img_main').attr('src',data.about.mid_photo_url);
    }
}
