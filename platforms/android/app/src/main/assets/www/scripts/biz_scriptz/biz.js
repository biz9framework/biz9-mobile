function set_left_navigation(data){
    //$("#a_link_page").css("visibility", "visible");
    $("#nav-register").hide();
    $("#nav-welcome").hide();
    $("#nav-login").hide();
    $("#nav-logout").hide();
    $("#nav-call").hide();
    $("#nav-mail").hide();
    user=get_user();
    if(data.primary.tbl_id==0){
        $("#nav-register").show();
        $("#nav-about").hide();
        $("#nav-page").hide();
        $("#nav-contact").hide();
    }else if(get_user().tbl_id!=0){
        $("#nav-welcome").show();
        $("#nav-login").hide();
        $("#nav-logout").show();
    }
    else{
        $("#nav-login").show();
        $("#nav-logout").hide();
    }
    $("#biz_nav_logo").attr('src',data.primary.mid_photo_url);
    $("#biz_nav_header").html(data.primary.nav_header);
    $("#biz_nav_sub_note").html(data.primary.nav_sub_note);
    $("#div_navigation_bar_title").html(data.primary.nav_bar_title);
    $("#div_navigation_bar_social").html(data.primary.nav_bar_social);
    if(!data.primary.nav_copy){
        data.primary.nav_copy='';
    }
    $("#biz_nav_copyright").html(data.primary.nav_copy+" version: "+APP_VERSION + "<br/><b>"+APP_VENDOR+" </b>");
    var target = "_blank";
    var options = "location=yes";
    if(data.primary.nav_phone){
        $("#nav-call").show();
        $("#nav-call").click(function() {
            url='tel:'+data.primary.nav_phone;
            window.open(url, target, options);
        });
    }
    if(data.primary.nav_mail){
        $("#nav-mail").show();
        $("#nav-mail").click(function() {
            url='mailto:'+data.primary.nav_mail;
            window.open(url, target, options);
        });
    }
    $("#nav-logout").click(function() {
        if (confirm("Are you sure?") == true) {
            del_user();
            window.location='index.html';
        }
    });
}
function set_left_lock_navigation(data){
    $("#nav-register").hide();
    $("#nav-page").hide();
    $("#nav-welcome").hide();
    $("#nav-login").hide();
    $("#nav-logout").hide();
    $("#nav-call").hide();
    $("#nav-mail").hide();
    $("#biz_btn_home_top_text").hide();
    $("#biz_nav_logo").attr('src',data.primary.mid_photo_url);
    $("#biz_nav_header").html(data.primary.nav_header);
    $("#biz_nav_sub_note").html(data.primary.nav_sub_note);
    $("#div_navigation_bar_title").html(data.primary.nav_bar_title);
    $("#div_navigation_bar_social").html(data.primary.nav_bar_social);
    if(!data.primary.nav_copy){
        data.primary.nav_copy='';
    }
    $("#biz_nav_copyright").html(data.primary.nav_copy+" version: "+APP_VERSION + "<br/><b>"+APP_VENDOR+" </b>");
}
function set_biz_page_data(biz_page_title,data){
    switch(biz_page_title) {
        case 'home':
            set_page_home(data.helper);
            break;
        case 'about':
            set_page_about(data.helper);
            break;
        case 'system':
            set_page_system(data.helper);
            break;
        case 'contact':
            set_page_contact(data.helper);
            break;
        case 'comment_add':
            set_page_comment_add(data.helper);
            break;
        case 'page_list':
            set_page_page_list(data.helper);
            break;
            /*BLOG START */
        case 'list':
            set_page_list(data.helper);
            break;
        case 'blog_post_list':
            set_page_blog_list(data.helper);
            break;
        case 'blog_post_detail':
            set_page_blog_detail(data.helper);
            break;
        case 'admin_edit_blog_post_media':
            set_admin_page_blog_post_media(data.helper);
            break;
        case 'blog_post_category_list':
            set_page_blog_post_category_list(data.helper);
            break;
            /*BLOG END */
            /*PRODUCT START */
        case 'product_category_list':
            set_page_product_category_list(data.helper);
            break;
        case 'product_list':
            set_page_product_list(data.helper);
            break;
        case 'product_detail':
            set_page_product_detail(data.helper);
            break;
        case 'product_checkout':
            set_page_product_checkout(data.helper);
            break;
        case 'product_checkout_success':
            set_page_product_checkout_success(data.helper);
            break;
        case 'product_store_links':
            set_page_product_store_links(data.helper);
            break;
        case 'admin_edit_product_photo_list':
            set_admin_page_product_photo_list(data.helper);
            break;
        case 'admin_edit_product_category':
            set_admin_page_product_category(data.helper);
            break;
        case 'admin_edit_product_category_list':
            set_admin_page_product_category_list(data.helper);
            break;
        case 'admin_edit_product_list':
            set_admin_page_product_list(data.helper);
            break;
        case 'admin_edit_product':
            set_admin_page_product(data.helper);
            break;
        case 'admin_edit_product_sub':
            set_admin_page_product_sub(data.helper);
            break;
        case 'admin_edit_product_media':
            set_admin_page_product_media(data.helper);
            break;
            /*PRODUCT END */
            /*SERVICE START */
        case 'service_category_list':
            set_page_service_category_list(data.helper);
            break;
        case 'service_list':
            set_page_service_list(data.helper);
            break;
        case 'service_detail':
            set_page_service_detail(data.helper);
            break;
        case 'service_checkout':
            set_page_service_checkout(data.helper);
            break;
        case 'service_checkout_success':
            set_page_service_checkout_success(data.helper);
            break;
        case 'admin_edit_service_photo_list':
            set_admin_page_service_photo_list(data.helper);
            break;
        case 'admin_edit_service_list':
            set_admin_page_service_list(data.helper);
            break;
        case 'admin_edit_service':
            set_admin_page_service(data.helper);
            break;
        case 'admin_edit_service_sub':
            set_admin_page_service_sub(data.helper);
            break;
        case 'admin_edit_service_media':
            set_admin_page_service_media(data.helper);
            break;
        case 'admin_edit_service_category':
            set_admin_page_service_category(data.helper);
            break;
        case 'admin_edit_service_category_list':
            set_admin_page_service_category_list(data.helper);
            break;
            /*SERVICE END */
        case 'team_list':
            set_page_team_list(data.helper);
            break;
        case 'forgot_password':
            set_admin_page_forgot_password(data.helper);
            break;
        case 'login':
            set_admin_page_login(data.helper);
            break;
        case 'register':
            set_admin_page_register(data.helper);
            break;
        case 'admin_home':
            set_admin_page_home(data.helper);
            break;
        case 'admin_edit_setting':
            set_admin_page_setting(data.helper);
            break;
        case 'admin_edit_account':
            set_admin_page_account(data.helper);
            break;
        case 'admin_edit_about':
            set_admin_page_about(data.helper);
            break;
        case 'admin_edit_slideshow':
            set_admin_page_slideshow(data.helper);
            break;
        case 'admin_edit_welcome':
            set_admin_page_welcome(data.helper);
            break;
        case 'admin_edit_comment':
            set_admin_page_comment(data.helper);
            break;
        case 'admin_edit_photo':
            set_admin_page_photo(data.helper);
            break;
        case 'admin_edit_team_list':
            set_admin_page_team_list(data.helper);
            break;
        case 'admin_edit_team':
            set_admin_page_team(data.helper);
            break;
            /*GALLERY START */
        case 'admin_edit_gallery_list':
            set_admin_page_gallery_list(data.helper);
            break;
        case 'admin_edit_gallery':
            set_admin_page_gallery(data.helper);
            break;
        case 'admin_edit_gallery_photo_list':
            set_admin_page_gallery_photo_list(data.helper);
            break;
        case 'gallery_list':
            set_page_gallery_list(data.helper);
            break;
        case 'gallery_detail':
            set_page_gallery_detail(data.helper);
            break;
        case 'gallery_category_list':
            set_page_gallery_category_list(data.helper);
            break;
        case 'admin_edit_gallery_category':
            set_admin_page_gallery_category(data.helper);
            break;
        case 'admin_edit_gallery_category_list':
            set_admin_page_gallery_category_list(data.helper);
            break;
            /*GALLERY END */
            /*BLOG START */
        case 'admin_edit_blog_post_list':
            set_admin_page_blog_post_list(data.helper);
            break;
        case 'admin_edit_blog_post':
            set_admin_page_blog_post(data.helper);
            break;
        case 'admin_edit_blog_post_category':
            set_admin_page_blog_post_category(data.helper);
            break;
        case 'admin_edit_blog_post_category_list':
            set_admin_page_blog_post_category_list(data.helper);
            break;
        case 'admin_edit_blog_post_photo_list':
            set_admin_page_blog_post_photo_list(data.helper);
            break;
            /*BLOG END */
        case 'admin_edit_page_list':
            set_admin_page_list(data.helper);
            break;
        case 'admin_edit_page':
            set_admin_page_page(data.helper);
            break;
        case 'admin_edit_contact':
            set_admin_page_contact(data.helper);
            break;
    }
}
function get_biz_page_url(biz_page_title){
    var url='';
    switch(biz_page_title) {
        case 'home':
            url='get_home';
            break;
        case 'about':
            url='get_about';
            break;
        case 'system':
            url='get_blank';
            break;
        case 'contact':
            url='get_contact';
            break;
        case 'comment_add':
            url='admin/get_comment';
            break;
        case 'page_list':
            url='get_document_list/'+G_DT_DOCUMENT_PAGE;
            break;
            /*GALLERY START */
        case 'gallery_list':
            url='gallery/get_gallery_list/'+ getUrlParameter('category');
            break;
        case 'gallery_detail':
            url='gallery/get_gallery/'+ getUrlParameter('title_url');
            break;
        case 'gallery_category_list':
            url='gallery/get_gallery_category_list/';
            break;
        case 'admin_edit_gallery_list':
            url='admin/get_gallery_list/';
            break;
        case 'admin_edit_gallery':
            url='admin/get_gallery/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_gallery_photo_list':
            url='admin/get_gallery/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_gallery_category':
            url='admin/get_gallery_category/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_gallery_category_list':
            url='admin/get_gallery_category_list/';
            break;
            /*GALLERY END */
            /*BLOG START */
        case 'blog_post_list':
            url='blog_post/get_blog_post_list';
            break;
        case 'blog_post_detail':
            url='blog_post/get_blog_post/'+ getUrlParameter('title_url');
            break;
        case 'blog_post_category_list':
            url='blog_post/get_blog_post_category_list/';
            break;
        case 'admin_edit_blog_post_media':
            url='admin/get_blog_post/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_blog_post_list':
            url='admin/get_blog_post_list/';
            break;
        case 'admin_edit_blog_post':
            url='admin/get_blog_post/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_blog_post_photo_list':
            url='admin/get_blog_post/'+getUrlParameter('title_url');
            break;
        case 'list':
            url='blog_post/get_list/';
            break;
        case 'admin_edit_blog_post_category':
            url='admin/get_blog_post_category/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_blog_post_category_list':
            url='admin/get_blog_post_category_list/';
            break;
            /*BLOG END */
            /*PRODUCT START */
        case 'product_category_list':
            url='product/get_product_category_list/';
            break;
        case 'product_list':
            url='product/get_product_list/'+ getUrlParameter('category');
            break;
        case 'product_detail':
            url='product/get_product/'+ getUrlParameter('title_url');
            break;
        case 'product_store_links':
            url='product/get_product_store_links';
            break;
        case 'product_checkout_success':
            url='get_blank';
            break;
        case 'product_checkout':
            url='get_blank';
            break;
        case 'admin_edit_product_list':
            url='admin/get_product_list/';
            break;
        case 'admin_edit_product_category_list':
            url='admin/get_product_category_list/';
            break;
        case 'admin_edit_product_category':
            url='admin/get_product_category/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_product':
            url='admin/get_product/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_product_sub':
            url='admin/get_product/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_product_media':
            url='admin/get_product/'+getUrlParameter('title_url');
            break;
            /*PRODUCT END */
            /* SERVICE START */
        case 'service_category_list':
            url='service/get_service_category_list/';
            break;
        case 'service_list':
            url='service/get_service_list/'+ getUrlParameter('category');
            break;
        case 'service_detail':
            url='service/get_service/'+ getUrlParameter('title_url');
            break;
        case 'service_checkout_success':
            url='get_blank';
            break;
        case 'service_checkout':
            url='get_blank';
            break;
        case 'admin_edit_service_photo_list':
            url='admin/get_service/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_service_media':
            url='admin/get_service/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_service_list':
            url='admin/get_service_list/';
            break;
        case 'admin_edit_service_category_list':
            url='admin/get_service_category_list/';
            break;
        case 'admin_edit_service':
            url='admin/get_service/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_service_sub':
            url='admin/get_service/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_service_photo_list':
            url='admin/get_service/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_service_category':
            url='admin/get_service_category/'+getUrlParameter('title_url');
            break;
            /* SERVICE END */
        case 'team_list':
            url='get_team_list/';
            break;
        case 'login':
            url='get_blank/';
            break;
        case 'register':
            url='get_blank/';
            break;
        case 'forgot_password':
            url='get_blank/';
            break;
        case 'admin_home':
            url='get_blank/';
            break;
        case 'admin_edit_slideshow':
            url='admin/get_slideshow/';
            break;
        case 'admin_edit_setting':
            url='get_blank/';
            break;
        case 'admin_edit_account':
            url='get_blank/';
            break;
        case 'admin_edit_about':
            url='get_about/';
            break;
        case 'admin_edit_welcome':
            url='admin/get_welcome/';
            break;
        case 'admin_edit_comment':
            url='admin/get_comment/';
            break;
        case 'admin_edit_team_list':
            url='admin/get_team_list/';
            break;
        case 'admin_edit_team':
            url='admin/get_team/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_photo':
            url='admin/get_photo/'+getUrlParameter('tbl_id');
            break;
        case 'admin_edit_product_photo_list':
            url='admin/get_product/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_page_list':
            url='admin/get_document_list/'+G_DT_DOCUMENT_PAGE;
            break;
        case 'admin_edit_page':
            url='admin/get_document/'+getUrlParameter('title_url');
            break;
        case 'admin_edit_contact':
            url='get_contact/';
            break;
    }
    return url;
}
function set_bottom_lock_footer(current){
    str=
        "<a class='a_bottom_link' id='a_link_home' href='index.html' class='active-nav'><i class='fa fa-home'></i><span>Home</span></a>"+
        "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
    return str;
}

function set_bottom_footer(current){
    str='';
    switch(current){
        case 'home':
            //str="<a style='visibility:hidden'  class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
            str="<a  class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a  class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a  class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a  class='a_bottom_link' id='a_link_home' href='index.html' class='active-nav'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a  class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a  class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        case 'page_list':
        case 'blog_post_list':
        case 'blog_post_detail':
        case 'team_list':
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html' class='active-nav'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        case 'product_category_list':
        case 'product_list':
        case 'product_detail':
        case 'product_checkout':
        case 'product_checkout_success':
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html' class='active-nav'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        case 'service_category_list':
        case 'service_list':
        case 'service_detail':
        case 'service_checkout':
        case 'service_checkout_success':
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'  class='active-nav'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        case 'gallery_list':
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html' class='active-nav'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        case 'contact':
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html' class='active-nav'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
        default:
            str="<a class='a_bottom_link' id='a_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>"+
                "<a class='a_bottom_link' id='a_link_shop' href='product_category_list.html'><i class='fa fa-shopping-bag'></i><span>Shop</span></a>"+
                "<a class='a_bottom_link' id='a_link_service' href='service_category_list.html'><i class='fa fa-rocket'></i><span>Services</span></a>"+
                "<a class='a_bottom_link' id='a_link_home' href='index.html' class='active-nav'><i class='fa fa-home'></i><span>Home</span></a>"+
                "<a class='a_bottom_link' id='a_link_gallery' href='gallery_category_list.html'><i class='fa fa-image'></i><span>Gallery</span></a>"+
                "<a class='a_bottom_link' id='a_link_contact' href='contact.html'><i class='fa fa-envelope'></i><span>Contact</span></a>";
            break;
    }
    return str;
}
function set_pull_down(){
    PullToRefresh.init({
        mainElement: 'body',
        onRefresh: function(){ window.location.reload(); }
    });

}

