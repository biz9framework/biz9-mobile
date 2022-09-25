function set_page_system(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('#biz_lbl_app_vendor_title').html(APP_VENDOR);
    $('#biz_lbl_app_vendor_website').html(APP_VENDOR_WEBSITE);
    $('#biz_lbl_app_vendor_website').attr('href',APP_VENDOR_WEBSITE);

    $('#biz_lbl_app_system_version').html(BIZ9_MOBILE_VERSION);
    $('#biz_lbl_app_app_version').html(APP_VERSION);

    $('#biz_lbl_app_title').html(APP_TITLE);
    $('#biz_lbl_app_title_id').html(APP_TITLE_ID);
    $('#biz_lbl_app_title_url').html(CLOUD_URL);
}
