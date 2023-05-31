DT_PHOTO='photo_biz';
DT_CATEGORY='category_biz';
DT_REVIEW='review_biz';
DT_GALLERY='gallery_biz';
DT_BLOG_POST='blog_post_biz';
DT_EVENT='event_biz';
DT_MEMBER='member_biz';
DT_PRODUCT='product_biz';
DT_SERVICE='service_biz';
DT_ITEM='item_biz';
DT_BLANK='blank_biz';
color_list=['bg-black-black','bg-mint-dark','bg-red-dark','bg-green-dark','bg-blue-dark','bg-yellow-dark','bg-orange-dark','bg-teal-dark','bg-dark-dark','bg-magenta-dark','bg-brown-dark'];
PAYMENT_TYPE_PAY_NOW='pay_now';
PAYMENT_TYPE_CASHAPP='cashapp';
PAYMENT_TYPE_ON_DELIVERY='pay_on_delivery';
//biz
load_biz_app();
function load_biz_app(){
	const page_title=$('#biz_page_title').val();
	var url=get_biz_page_url(page_title);
	cloud_get_url(url,{customer_id:get_user().customer_id},function(biz_data){

		//$(".page-content").hide();
		//$("#page").hide();
		set_app_color(biz_data.mobile.primary.app_color,biz_data.mobile.primary.app_theme);
		w('biz_mobile_user',get_user());
		w('biz_cloud_get_url',get_cloud_url(url));
		w('biz_cloud_get_data',biz_data);
		set_footer_navigation(biz_data);
		set_biz_page_data(page_title,biz_data);
		set_left_navigation(biz_data);
		set_page_button_color(biz_data.mobile.primary.button_color);
		set_pull_down();
		set_init();
		clean_note();
		//$("#page").show();
	});
}
function get_new_item(data_type){
	if(!data_type){
		data_type=DT_BLANK;
	}
	return {data_type:data_type,tbl_id:0};
}
function show_spinner(){
	var preloader = document.getElementById('preloader')
	if(preloader){preloader.classList.remove('preloader-hide');}
}
function hide_spinner(){
	var preloader = document.getElementById('preloader')
	if(preloader){preloader.classList.add('preloader-hide');}
}
function hide_pager(){
	$('#biz_lbl_card_pager').hide();
}
function hide_cart(){
	$('#biz_btn_order_cart_top').hide();
}
function hide_footer(){
	$('#footer-bar').hide();
}
function set_page_title(str){
	$('#biz_lbl_page_title').html(str);
}
function set_page_button_color(button_color){
	if(button_color=='random' || !button_color){
		for(a=0;a<color_list.length+1;a++){
			len =get_id(color_list.length);
			button_color=color_list[len-1];
		}
	}
	$('.biz_btn').addClass(button_color);
}
function set_page_sub_title(str){
	$('#biz_lbl_page_sub_title').html(str);
}
function set_page_sub_note(str){
	$('#biz_lbl_page_sub_note').html(str);
}
function set_page_note(str){
	$('#biz_lbl_page_note').html(str);
}
function set_page_view_count(str){
	if(!str || str==0){
		str='1';
	}
	$('#biz_lbl_view_count').html(str);
}
function set_left_navigation(data){
	str='';
	str=str+"<div class='text-center'>"+
		"<a href='#'><img id='biz_img_navlogo' src='"+data.mobile.left_nav.photo_obj.square_mid_url+"' class='sidebar-logo' width='85'></a>"+
		"<h1 id='biz_lbl_nav_top_header' class='text-uppercase color-white mt-3'>"+data.mobile.left_nav.left_nav_header+"</h1>"+
		"<p id='biz_lbl_nav_top_sub_note' class='font-11 color-white opacity-50 mt-n1'>"+data.mobile.left_nav.left_nav_sub_note+"</p>"+
		"</div>"+
		"<span class='menu-divider' id='biz_lbl_nav_header'>"+data.mobile.left_nav.left_nav_bar_title+"</span>"+
		"<div class='menu-items'>"+
		"<a href='dashboard_menu.html' id='biz_link_nav_dashboard'>"+
		"<i class='fa fa-screwdriver-wrench biz_btn'></i>"+
		"<span>Dashboard</span>"+
		"</a>"+
		"<a href='about.html' id='biz_link_nav_about'>"+
		"<i class='fa fa-star  biz_btn'></i>"+
		"<span>About</span>"+
		"</a>"+
		"<a href='contact.html' id='biz_link_nav_contact'>"+
		"<i class='fa fa-address-book biz_btn'></i>"+
		"<span>Contact</span>"+
		"</a>"+
		"<a href='login.html' id='biz_link_nav_login'>"+
		"<i class='fa fa-lock biz_btn'></i>"+
		"<span>Login</span>"+
		"</a>"+
		"<a href='logout.html' id='biz_link_nav_logout'>"+
		"<i class='fa fa-unlock biz_btn'></i>"+
		"<span>Logout</span>"+
		"</a>"+
		"</div>"+
		"<span class='menu-divider mt-4'  id='biz_lbl_nav_bottom'>"+data.mobile.left_nav.left_nav_bar_social+"</span>"+
		"<div class='menu-items'>"+
		"<a href='mailto:"+data.info.business_phone+"'>"+
		"<i class='fa fa-phone biz_btn'></i>"+
		"<span>Call</span>"+
		"</a>"+
		"<a href='tel:"+data.info.business_email+"'>"+
		"<i class='fa fa-envelope biz_btn'></i>"+
		"<span>Mail</span>"+
		"</a>"+
		"</div>"+
		"<div class='divider bg-white opacity-10 mt-4'></div>"+
		"<p class='font-16  color-white opacity-20 text-center'>"+data.mobile.left_nav.left_nav_copyright+"</p>"+
		"<p class='font-10  color-white opacity-30 text-center'>sys: "+BIZ9_MOBILE_VERSION+" app: "+APP_VERSION +"</p>";
	$("#biz_lbl_left_menu").html(str);
	user=get_user();
	//check user login
	if(!get_user().tbl_id){
		//- login
		$("#biz_link_nav_logout").hide();
		$("#biz_link_nav_login").show();
		$("#biz_link_nav_dashboard").hide();
	}
	else{
		//- log out
		$("#biz_link_nav_login").hide();
		$("#biz_link_nav_logout").show();
		$("#biz_link_nav_dashboard").show();
	}
	$("#nav-logout").click(function() {
		if (confirm("Are you sure?") == true) {
			del_user();
			window.location='index.html';
		}
	});
}
function init_cart(){
	$("#biz_btn_order_cart_top").show();
	$("#biz_btn_order_cart_top").click(function() {
		show_cart_top();
	});
}
function show_cart_top(){
	$("#menu-cart").show();
	url = "order/cart_detail/"+get_user().customer_id;
	cloud_get_url(url,{},function(data){
		w('cart_top_detail',data.cart);
		set_order_cart_top(data.cart);
	});
}
function set_page_note_remove(num){
	if(num<=1){
		num='0';
	}else{
		num = String(num-1);
	}
	return "("+num + " items"+")";
}
function bind_mp3_form(mp3_url){
	return "<audio controls id='biz_lbl_audio_ctl'>"+
		"<source id='biz_lbl_audio_player' src='"+mp3_url+"' type='audio/mpeg'>"+
		"Your browser does not support the audio element."+
		"</audio>";
}
function set_footer_navigation(data){
	page_footer=$('#biz_page_footer').val();
	str='';
	//page
	str = str+"<a id='biz_lbl_ft_link_page' href='page_list.html'><i class='fa fa-heart'></i><span>Pages</span></a>";
	set_home=false;
	home_str = "<a id='biz_lbl_ft_link_home' href='index.html'><i class='fa fa-home'></i><span>Home</span></a>";
	for(a=0;a<data.mobile.page_list.items.length;a++){
		item = data.mobile.page_list.items[a];
		if(a==2){
			str = str + home_str;
			//home
			set_home=true;
		}
		if(item.visible=='true'){
			switch(item.type) {
				case DT_PRODUCT:
					str = str + "<a id='biz_lbl_ft_link_product' href='product_category_list.html?page_current=1'><i class='fa fa-cart-shopping'></i><span>"+item.title+"</span></a>";
					break;
				case DT_SERVICE:
					str = str + "<a id='biz_lbl_ft_link_service' href='service_category_list.html?page_current=1'><i class='fa fa-rocket'></i><span>"+item.title+"</span></a>";
					break;
				case DT_EVENT:
					str = str + "<a id='biz_lbl_ft_link_event' href='event_category_list.html?page_current=1'><i class='fa fa-ticket'></i><span>"+item.title+"</span></a>";
					break;
				case DT_BLOG_POST:
					str = str + "<a id='biz_lbl_ft_link_blog_post' href='blog_post_category_list.html?page_current=1'><i class='fa fa-bullhorn'></i><span>"+item.title+"</span></a>";
					break;
				case DT_GALLERY:
					str = str + "<a id='biz_lbl_ft_link_gallery' href='gallery_category_list.html?category=all&page_current=1'><i class='fa fa-image'></i><span>"+item.title+"</span></a>";
					break;
			}
		}
	}
	if(set_home==false){
		str = str + home_str;
	}
	$("#footer-bar").html(str);
	switch(page_footer) {
		case 'home':
			$("#biz_lbl_ft_link_home").attr('class','active-nav');
			break;
		case 'gallery':
			$("#biz_lbl_ft_link_gallery").attr('class','active-nav');
			break;
		case 'page':
			$("#biz_lbl_ft_link_page").attr('class','active-nav');
			break;
		case 'blog_post':
			$("#biz_lbl_ft_link_blog_post").attr('class','active-nav');
			break;
		case 'product':
			$("#biz_lbl_ft_link_product").attr('class','active-nav');
			break;
		case 'service':
			$("#biz_lbl_ft_link_service").attr('class','active-nav');
			break;
		case 'event':
			$("#biz_lbl_ft_link_event").attr('class','active-nav');
			break;
		case 'contact':
			$("#biz_lbl_ft_link_contact").attr('class','active-nav');
			break;
		default:
			break;
	}
}
function set_biz_page_data(biz_page_title,data){
	switch(biz_page_title) {
			/*PRIMARY-START */
			/*MAIN-START */
		case 'home':
			set_page_home(data);
			break;
		case 'about':
			set_page_about(data);
			break;
		case 'contact':
			set_page_contact(data);
			break;
		case 'register':
			set_page_register(data);
			break;
		case 'login':
			set_page_login(data);
			break;
		case 'logout':
			set_page_logout(data);
			break;
		case 'page_list':
			set_page_page_list(data);
			break;
			/*MAIN-START */
			/*BLOG_POST-START */
		case 'blog_post_list':
			set_page_blog_post_list(data);
			break;
		case 'blog_post_detail':
			set_page_blog_post_detail(data);
			break;
		case 'blog_post_category_list':
			set_page_blog_post_category_list(data);
			break;
			/*BLOG_POST-END */
			/*MEMBER-START */
		case 'member_list':
			set_page_member_list(data);
			break;
		case 'member_category_list':
			set_page_member_category_list(data);
			break;
			/*MEMBER-END */
			/*PRODUCT-START */
		case 'product_category_list':
			set_page_product_category_list(data);
			break;
		case 'product_list':
			set_page_product_list(data);
			break;
		case 'product_detail':
			set_page_product_detail(data);
			break;
		case 'order_checkout_summary':
			set_page_order_checkout_summary(data);
			break;
		case 'order_checkout_submit':
			set_page_order_checkout_submit(data);
			break;
		case 'order_checkout_success':
			set_page_order_checkout_success(data);
			break;
			/*PRODUCT-END */
			/*SERVICE-START */
		case 'service_category_list':
			set_page_service_category_list(data);
			break;
		case 'service_list':
			set_page_service_list(data);
			break;
		case 'service_detail':
			set_page_service_detail(data);
			break;
		case 'service_checkout_summary':
			set_page_service_checkout_summary(data);
			break;
		case 'service_checkout_submit':
			set_page_service_checkout_submit(data);
			break;
		case 'service_checkout_success':
			set_page_service_checkout_success(data);
			break;
			/*SERVICE-END */
			/*GALLERY-START */
		case 'gallery_category_list':
			set_page_gallery_category_list(data);
			break;
		case 'gallery_list':
			set_page_gallery_list(data);
			break;
		case 'gallery_detail':
			set_page_gallery_detail(data);
			break;
			/*GALLERY-END */
			/*EVENT-START */
		case 'event_category_list':
			set_page_event_category_list(data);
			break;
		case 'event_list':
			set_page_event_list(data);
			break;
		case 'event_detail':
			set_page_event_detail(data);
			break;
		case 'event_checkout_summary':
			set_page_event_checkout_summary(data);
			break;
		case 'event_checkout_submit':
			set_page_event_checkout_submit(data);
			break;
		case 'event_checkout_success':
			set_page_event_checkout_success(data);
			break;
			/*EVENT-END */
			/*PRIMARY-END */
			/*DASHBOARD START */
		case 'dashboard_sub_item_list':
			set_dashboard_sub_item_list(data);
			break;
		case 'dashboard_sub_item':
			set_dashboard_sub_item(data);
			break;
		case 'dashboard_photo_list':
			set_dashboard_photo_list(data);
			break;
		case 'dashboard_photo':
			set_dashboard_photo(data);
			break;
		case 'dashboard_menu_home':
			set_dashboard_menu_home(data);
			break;
		case 'dashboard_setting':
			set_dashboard_setting(data);
			break;
		case 'dashboard_home':
			set_dashboard_home(data);
			break;
		case 'dashboard_navigation':
			set_dashboard_navigation(data);
			break;
		case 'dashboard_about':
			set_dashboard_about(data);
			break;
		case 'dashboard_contact':
			set_dashboard_contact(data);
			break;
		case 'dashboard_category_list':
			set_dashboard_category_list(data);
			break;
		case 'dashboard_category':
			set_dashboard_category(data);
			break;
		case 'dashboard_blog_post':
			set_dashboard_blog_post(data);
			break;
		case 'dashboard_blog_post_list':
			set_dashboard_blog_post_list(data);
			break;
		case 'dashboard_blog_post_media':
			set_dashboard_blog_post_media(data);
			break;
			/*-- DASH_EVENT_START */
		case 'dashboard_event':
			set_dashboard_event(data);
			break;
		case 'dashboard_event_list':
			set_dashboard_event_list(data);
			break;
		case 'dashboard_event_media':
			set_dashboard_event_media(data);
			break;
		case 'dashboard_event_option':
			set_dashboard_event_option(data);
			break;
		case 'dashboard_event_option_list':
			set_dashboard_event_option_list(data);
			break;
		case 'dashboard_event_option_item_list':
			set_dashboard_event_option_item_list(data);
			break;
		case 'dashboard_event_option_item':
			set_dashboard_event_option_item(data);
			break;
			/*-- DASH_PRODUCT_END */
		case 'dashboard_gallery':
			set_dashboard_gallery(data);
			break;
		case 'dashboard_gallery_list':
			set_dashboard_gallery_list(data);
			break;
			/*-- DASH_PRODUCT_START */
		case 'dashboard_product':
			set_dashboard_product(data);
			break;
		case 'dashboard_product_list':
			set_dashboard_product_list(data);
			break;
		case 'dashboard_order_list':
			set_dashboard_order_list(data);
			break;
		case 'dashboard_product_media':
			set_dashboard_product_media(data);
			break;
		case 'dashboard_product_option':
			set_dashboard_product_option(data);
			break;
		case 'dashboard_product_option_list':
			set_dashboard_product_option_list(data);
			break;
		case 'dashboard_product_option_item_list':
			set_dashboard_product_option_item_list(data);
			break;
		case 'dashboard_product_option_item':
			set_dashboard_product_option_item(data);
			break;
			/*-- DASH_PRODUCT_END */
			/*-- DASH_SERVICE_START */
		case 'dashboard_service':
			set_dashboard_service(data);
			break;
		case 'dashboard_service_list':
			set_dashboard_service_list(data);
			break;
		case 'dashboard_service_media':
			set_dashboard_service_media(data);
			break;
		case 'dashboard_service_option':
			set_dashboard_service_option(data);
			break;
		case 'dashboard_service_option_list':
			set_dashboard_service_option_list(data);
			break;
		case 'dashboard_service_option_item_list':
			set_dashboard_service_option_item_list(data);
			break;
		case 'dashboard_service_option_item':
			set_dashboard_service_option_item(data);
			break;
			/*-- dash_service_end */
		case 'dashboard_page_list':
			set_dashboard_page_list(data);
			break;
		case 'dashboard_page':
			set_dashboard_page(data);
			break;
		case 'dashboard_review_list':
			set_dashboard_review_list(data);
			break;
		case 'dashboard_member_list':
			set_dashboard_member_list(data);
			break;
		case 'dashboard_member':
			set_dashboard_member(data);
			break;
	}
}
function get_biz_page_url(biz_page_title){
	var url='';
	switch(biz_page_title) {
			/*MAIN START */
		case 'logout':
			url='blank';
			break;
		case 'login':
			url='blank';
			break;
		case 'home':
			url='home';
			break;
		case 'about':
			url='about';
			break;
		case 'contact':
			url='contact';
			break;
		case 'register':
			url='blank';
			break;
		case 'page_list':
			url='blank';
			break;
			/*MAIN END */
			/*MEMBER START */
		case 'member_list':
			url='member/member_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'member_category_list':
			url="member/category_list/"+get_url_param('page_current');
			break;
			/*MEMBER END */
			/*BLOG_POST START */
		case 'blog_post_list':
			url='blog_post/blog_post_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'blog_post_detail':
			url='blog_post/blog_post_detail/'+get_url_param('title_url');
			break;
		case 'blog_post_category_list':
			url="blog_post/category_list/"+get_url_param('page_current');
			break;
			/*BLOG_POST END */
			/*EVENT START */
		case 'event_list':
			url='event/event_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'event_detail':
			url='event/event_detail/'+get_url_param('title_url');
			break;
		case 'event_category_list':
			url="event/category_list/"+get_url_param('page_current');
			break;
		case 'event_checkout_summary':
			url='event/cart_detail/'+get_user().customer_id;
			break;
		case 'event_checkout_submit':
			url='event/cart_detail/'+get_user().customer_id;
			break;
		case 'event_checkout_success':
			url='event/checkout/success/'+get_url_param('order_id');
			break;
			/*EVENT END */
			/*PRODUCT_START */
		case 'product_category_list':
			url="product/category_list/"+get_url_param('page_current');
			break;
		case 'product_list':
			url='product/product_list/'+get_url_param('category')+'/'+get_url_param('page_current');
			break;
		case 'product_detail':
			url='product/product_detail/'+get_url_param('title_url');
			break;
			/*PRODUCT_END */
			/*ORDER_START */
		case 'order_checkout_summary':
			url='order/cart_detail/'+get_user().customer_id;
			break;
		case 'order_checkout_submit':
			url='order/cart_detail/'+get_user().customer_id;
			break;
		case 'order_checkout_success':
			url='order/checkout/success/'+get_url_param('order_id');
			break;
			/*ORDER_END */
			/*SERVICE_START */
		case 'service_category_list':
			url="service/category_list/"+get_url_param('page_current');
			break;
		case 'service_list':
			url='service/service_list/'+get_url_param('category')+'/'+get_url_param('page_current');
			break;
		case 'service_detail':
			url='service/service_detail/'+get_url_param('title_url');
			break;
		case 'service_checkout_summary':
			url='service/cart_detail/'+get_user().customer_id;
			break;
		case 'service_checkout_submit':
			url='service/cart_detail/'+get_user().customer_id;
			break;
		case 'service_checkout_success':
			url='service/checkout/success/'+get_url_param('order_id');
			break;
			/*SERVICE_END */
			/*GALLERY_START */
		case 'gallery_category_list':
			url="gallery/category_list/"+get_url_param('page_current');
			break;
		case 'gallery_list':
			url='gallery/gallery_list/'+get_url_param('category')+'/'+get_url_param('page_current');
			break;
		case 'gallery_detail':
			url='gallery/gallery_detail/'+get_url_param('title_url');
			break;
			/*GALLERY_END */
			//- DASHBOARD_START //
		case 'dashboard_menu_home':
			url='blank';
			break;
		case 'dashboard_setting':
			url='setting';
			break;
		case 'dashboard_navigation':
			url='blank';
			break;
		case 'dashboard_about':
			url='about';
			break;
		case 'dashboard_contact':
			url='contact';
			break;
		case 'dashboard_home':
			url='home_edit';
			break;
		case 'dashboard_category_list':
			url='category/category_list/'+get_url_param('data_type')+'/'+get_url_param('page_current');
			break;
		case 'dashboard_category':
			url='category/category_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_blog_post_list':
			url='blog_post/blog_post_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'dashboard_blog_post':
			url='blog_post/blog_post_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_blog_post_media':
			url='blog_post/blog_post_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_member_list':
			url='member/member_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'dashboard_member':
			url='member/member_detail/'+get_url_param('tbl_id');
			break;
		case 'dashboard_gallery_list':
			url='gallery/gallery_list/'+get_url_param('category')+"/"+get_url_param('page_current');
			break;
		case 'dashboard_gallery':
			url='gallery/gallery_detail/'+get_url_param('title_url');
			break;
			/*-- DASH_EVENT_START */
		case 'dashboard_event_list':
			url='event/event_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'dashboard_event':
			url='event/event_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_event_media':
			url='event/event_detail/'+get_url_param('title_url');
			break;
			/*-- DASH_EVENT_END */
			/*-- DASH_PHOTO_LIST_START */
		case 'dashboard_photo_list':
			url='item/photo_list/'+get_url_param('parent_data_type')+"/"+ get_url_param('parent_tbl_id');
			break;
		case 'dashboard_photo':
			url='item/photo_detail/'+get_url_param('tbl_id')+"/"+ get_url_param('parent_data_type')+"/"+ get_url_param('parent_tbl_id');
			break;
			/*-- DASH_PHOTO_LIST_END */
			/*-- DASH_SUB_ITEM_START */
		case 'dashboard_sub_item_list':
			url='item/sub_item_list/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+'/'+get_url_param('parent_data_type') + "/" + get_url_param('parent_tbl_id');
			break;
		case 'dashboard_sub_item':
			url='item/sub_item_detail/'+get_url_param('data_type')+"/"+get_url_param('tbl_id')+'/'+get_url_param('parent_data_type') + "/" + get_url_param('parent_tbl_id');
			break;
			/*-- DASH_SUB_ITEM_END */
			/*-- DASH_PRODUCT_START */
		case 'dashboard_order_list':
			url='order/order_list/'+get_url_param('page_current');
			break;
		case 'dashboard_product_list':
			url='product/product_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'dashboard_product':
			url='product/product_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_product_media':
			url='product/product_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_product_option':
			url='product/product_option/'+get_url_param('product_tbl_id')+"/"+get_url_param('product_option_tbl_id');
			break;
		case 'dashboard_product_option_item_list':
			url='product/product_option/'+get_url_param('product_tbl_id')+"/"+get_url_param('product_option_tbl_id');
			break;
		case 'dashboard_product_option_item':
			url='product/product_option_item/'+get_url_param('product_tbl_id')+"/"+get_url_param('product_option_tbl_id')+"/"+get_url_param('product_option_item_tbl_id');
			break;
			/*-- DASH_PRODUCT_END */
			/*-- DASH_SERVICE_START */
		case 'dashboard_service_list':
			url='service/service_list/'+get_url_param('category') +"/"+get_url_param('page_current');
			break;
		case 'dashboard_service':
			url='service/service_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_service_media':
			url='service/service_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_service_option_list':
			url='service/service_detail/'+get_url_param('title_url');
			break;
		case 'dashboard_service_option':
			url='service/service_option/'+get_url_param('service_tbl_id')+"/"+get_url_param('service_option_tbl_id');
			break;
		case 'dashboard_service_option_item_list':
			url='service/service_option/'+get_url_param('service_tbl_id')+"/"+get_url_param('service_option_tbl_id');
			break;
		case 'dashboard_service_option_item':
			url='service/service_option_item/'+get_url_param('service_tbl_id')+"/"+get_url_param('service_option_tbl_id')+"/"+get_url_param('service_option_item_tbl_id');
			break;
			/*-- DASH_SERVICE_END */
		case 'dashboard_review_list':
			url='item/review_list/'+get_url_param('page_current');
			break;
			/*-- DASH_PAGE_START */
		case 'dashboard_page_list':
			url='blank';
			break;
		case 'dashboard_page':
			url='page/'+get_url_param('title_url');
			break;
			/*-- DASH_PAGE_END */
		default:
			show_toast_error('get biz page url not found');
	}
	return url;
}
//-- INIT-START
function set_init(){
	init_cards();
	$("[data-f-id=pbf").remove();//froala remove
}
function clean_note(){
	$("[data-f-id=pbf").remove();//froala remove
}
function init_slide_show(slide_id){
	var singleSlider = document.querySelectorAll(slide_id);
	if(singleSlider.length){
		singleSlider.forEach(function(e){
			var single = new Splide( '#'+e.id, {
				type:'loop',
				autoplay:true,
				interval:4000,
				perPage: 1,
			}).mount();
			var sliderNext = document.querySelectorAll('.slider-next');
			var sliderPrev = document.querySelectorAll('.slider-prev');
			sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
			sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
		});
	}
}
function init_menu_modal(){
	document.querySelectorAll('.menu').forEach(el=>{el.style.display='block'})
	var menus = document.querySelectorAll('.menu');
	menuFunction();
	function menuFunction(){
		if(menus.length){
			var menuSidebar = document.querySelectorAll('.menu-box-left, .menu-box-right');
			menuSidebar.forEach(function(e){
				if(e.getAttribute('data-menu-width') === "cover"){
					e.style.width = '100%'
				} else {
					e.style.width = (e.getAttribute('data-menu-width')) +'px'
				}
			})
			var menuSheets = document.querySelectorAll('.menu-box-bottom, .menu-box-top, .menu-box-modal');
			menuSheets.forEach(function(e){
				if(e.getAttribute('data-menu-width') === "cover"){
					e.style.width = '100%'
					e.style.height = '100%'
				} else {
					e.style.width = (e.getAttribute('data-menu-width')) +'px'
					e.style.height = (e.getAttribute('data-menu-height')) +'px'
				}
			})
			//Opening Menus
			var menuOpen = document.querySelectorAll('[data-menu]');
			var wrappers = document.querySelectorAll('.header, #footer-bar, .page-content');
			menuOpen.forEach(el => el.addEventListener('click',e =>{
				//Close Existing Opened Menus
				const activeMenu = document.querySelectorAll('.menu-active');
				for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
				//Open Clicked Menu
				var menuData = el.getAttribute('data-menu');
				document.getElementById(menuData).classList.add('menu-active');
				document.getElementsByClassName('menu-hider')[0].classList.add('menu-active');
				//Check and Apply Effects
				var menu = document.getElementById(menuData);
				var menuEffect = menu.getAttribute('data-menu-effect');
				var menuLeft = menu.classList.contains('menu-box-left');
				var menuRight = menu.classList.contains('menu-box-right');
				var menuTop = menu.classList.contains('menu-box-top');
				var menuBottom = menu.classList.contains('menu-box-bottom');
				var menuWidth = menu.offsetWidth;
				var menuHeight = menu.offsetHeight;
				if(menuEffect === "menu-push"){
					var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
					if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth+"px)"}}
					if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth+"px)"}}
					if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight+"px)"}}
					if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight+"px)"}}
				}
				if(menuEffect === "menu-parallax"){
					var menuWidth = document.getElementById(menuData).getAttribute('data-menu-width');
					if(menuLeft){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX("+menuWidth/10+"px)"}}
					if(menuRight){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+menuWidth/10+"px)"}}
					if(menuBottom){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY(-"+menuHeight/5+"px)"}}
					if(menuTop){for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateY("+menuHeight/5+"px)"}}
				}
			}));
			//Closing Menus
			const menuClose = document.querySelectorAll('.close-menu, .menu-hider');
			menuClose.forEach(el => el.addEventListener('click',e =>{
				const activeMenu = document.querySelectorAll('.menu-active');
				for(let i=0; i < activeMenu.length; i++){activeMenu[i].classList.remove('menu-active');}
				for(let i=0; i < wrappers.length; i++){wrappers[i].style.transform = "translateX(-"+0+"px)"}
			}));
		}
	}


}
function init_double_slide_show(slide_id){
	var singleSlider = document.querySelectorAll(slide_id);
	if(singleSlider.length){
		singleSlider.forEach(function(e){
			var single = new Splide( '#'+e.id, {
				type:'loop',
				autoplay:true,
				interval:4000,
				perPage: 2,
			}).mount();
			var sliderNext = document.querySelectorAll('.slider-next');
			var sliderPrev = document.querySelectorAll('.slider-prev');
			sliderNext.forEach(el => el.addEventListener('click', el => {single.go('>');}));
			sliderPrev.forEach(el => el.addEventListener('click', el => {single.go('<');}));
		});
	}
}


function init_stepper(){
	//Stepper
	var stepperAdd = document.querySelectorAll('.stepper-add');
	var stepperSub = document.querySelectorAll('.stepper-sub');
	if(stepperAdd.length){
		stepperAdd.forEach(el => el.addEventListener('click', event => {
			var currentValue = el.parentElement.querySelector('input').value
			el.parentElement.querySelector('input').value = +currentValue + 1
		}))
		stepperSub.forEach(el => el.addEventListener('click', event => {
			var currentValue = el.parentElement.querySelector('input').value
			el.parentElement.querySelector('input').value = +currentValue - 1
		}))
	}
}
function init_form(){
	//Validator
	var inputField = document.querySelectorAll('input');
	if(inputField.length){
		var mailValidator = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var phoneValidator = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		var nameValidator = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
		var passwordValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
		var numberValidator = /^(0|[1-9]\d*)$/;
		var linkValidator = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;
		var textValidator = /[A-Za-z]{2}[A-Za-z]*[ ]?[A-Za-z]*/;
		function valid(el){
			el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}
		function invalid(el){
			el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
		}
		function unfilled(el){
			el.parentElement.querySelectorAll('em')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}
		var regularField = document.querySelectorAll('.input-style input:not([type="date"])')
		regularField.forEach(el => el.addEventListener('keyup', e => {
			if(!el.value == ""){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelector('em').classList.add('disabled');
			} else {
				el.parentElement.querySelectorAll('.valid')[0].classList.add('disabled');
				el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
				el.parentElement.classList.remove('input-style-active');
				el.parentElement.querySelector('em').classList.remove('disabled');
			}
		}));
		var regularTextarea = document.querySelectorAll('.input-style textarea')
		regularTextarea.forEach(el => el.addEventListener('keyup', e => {
			if(!el.value == ""){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelector('em').classList.add('disabled');
			} else {
				el.parentElement.classList.remove('input-style-active');
				el.parentElement.querySelector('em').classList.remove('disabled');
			}
		}));
		var selectField = document.querySelectorAll('.input-style select')
		selectField.forEach(el => el.addEventListener('change', e => {
			if(el.value !== "default"){
				el.parentElement.classList.add('input-style-active');
				el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
				el.parentElement.querySelectorAll('.invalid, em, span')[0].classList.add('disabled');
			}
			if(el.value == "default"){
				el.parentElement.querySelectorAll('span, .valid, em')[0].classList.add('disabled');
				el.parentElement.querySelectorAll('.invalid')[0].classList.remove('disabled');
				el.parentElement.classList.add('input-style-active');
			}
		}));
		var dateField = document.querySelectorAll('.input-style input[type="date"]')
		dateField.forEach(el => el.addEventListener('change', e => {
			el.parentElement.classList.add('input-style-active');
			el.parentElement.querySelectorAll('.valid')[0].classList.remove('disabled');
			el.parentElement.querySelectorAll('.invalid')[0].classList.add('disabled');
		}));
		var validateField = document.querySelectorAll('.validate-field input, .validator-field textarea');
		if(validateField.length){
			validateField.forEach(el => el.addEventListener('keyup', e => {
				var getAttribute = el.getAttribute('type');
				switch(getAttribute){
					case 'name': nameValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'number': numberValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'email': mailValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'text': textValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'url': linkValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'tel': phoneValidator.test(el.value) ? valid(el) : invalid(el); break;
					case 'password': passwordValidator.test(el.value) ? valid(el) : invalid(el); break;
				}
				if(el.value === ""){unfilled(el);}
			}));
		}
		//Toasts
		var toastTrigger = document.querySelectorAll('[data-toast]');
		if(toastTrigger.length){
			toastTrigger.forEach(el => el.addEventListener('click', event => {
				var toastData = el.getAttribute('data-toast')
				var notificationToast = document.getElementById(toastData);
				var notificationToast = new bootstrap.Toast(notificationToast);
				notificationToast.show();
			}));
		}
	}
	//Dropdown
	var dropdownElementList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'))
	if(dropdownElementList.length){
		var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
			return new bootstrap.Dropdown(dropdownToggleEl);
		})
	}
	//Text Resizer
	var textSizeChanger = document.querySelectorAll('.text-size-changer');
	if(textSizeChanger.length){
		var textSizeIncrease = document.querySelectorAll('.text-size-increase');
		var textSizeDecrease = document.querySelectorAll('.text-size-decrease');
		var textSizeDefault = document.querySelectorAll('.text-size-default');
		textSizeIncrease[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = (+getFontSize +1) +'px';
			});
		})
		textSizeDecrease[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = (+getFontSize -1) +'px';
			});
		})
		textSizeDefault[0].addEventListener('click',function(){
			textSizeChanger[0].querySelectorAll('*').forEach(function(element) {
				const getFontSize = window.getComputedStyle(element).fontSize.split("px",2)[0]
				element.style.fontSize = "";
			});
		})
	}
}
function init_sharing(){
	//Sharing
	function shareLinks(){
		var shareCheck = document.querySelectorAll('.shareToFacebook, .shareToTwitter, .shareToLinkedIn');
		if(shareCheck.length){
			var share_link = window.location.href;
			var share_title = document.title;
			document.querySelectorAll('.shareToFacebook').forEach( x=> x.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u="+share_link));
			document.querySelectorAll('.shareToTwitter').forEach( x=> x.setAttribute("href", "https://twitter.com/share?text="+share_link));
			document.querySelectorAll('.shareToPinterest').forEach( x=> x.setAttribute("href", "https://pinterest.com/pin/create/button/?url=" + share_link));
			document.querySelectorAll('.shareToWhatsApp').forEach( x=> x.setAttribute("href", "whatsapp://send?text=" + share_link));
			document.querySelectorAll('.shareToMail').forEach( x=> x.setAttribute("href", "mailto:?body=" + share_link));
			document.querySelectorAll('.shareToLinkedIn').forEach( x=> x.setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url="+share_link+"&title="+share_title+"&summary=&source="));
		}
	}

}

function init_contact_page(){
	//Contact Form
	var contactForm = document.querySelectorAll('.contact-form');
	function contactFunction(){
		if(contactForm){
			var form = document.getElementById('contactForm');
			if(form){
				form.onsubmit = function (e) {
					// Stop the regular form submission
					e.preventDefault();
					//Validate Fields
					var nameField = document.getElementById('contactNameField');
					var mailField = document.getElementById('contactEmailField');
					var textField = document.getElementById('contactMessageTextarea');
					var validateMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if(nameField.value === ''){
						form.setAttribute('data-form','invalid');
						nameField.classList.add('border-red-dark');
						document.getElementById('validator-name').classList.remove('disabled');
					} else {
						form.setAttribute('data-form','valid');
						document.getElementById('validator-name').classList.add('disabled');
						nameField.classList.remove('border-red-dark');
					}
					if(mailField.value === ''){
						form.setAttribute('data-form','invalid');
						mailField.classList.add('border-red-dark');
						document.getElementById('validator-mail1').classList.remove('disabled');
					} else {
						document.getElementById('validator-mail1').classList.add('disabled');
						if(!validateMail.test(mailField.value)){
							form.setAttribute('data-form','invalid');
							mailField.classList.add('border-red-dark');
							document.getElementById('validator-mail2').classList.remove('disabled');
						} else{
							form.setAttribute('data-form','valid');
							document.getElementById('validator-mail2').classList.add('disabled');
							mailField.classList.remove('border-red-dark');
						}
					}
					if(textField.value === ''){
						form.setAttribute('data-form','invalid');
						textField.classList.add('border-red-dark');
						document.getElementById('validator-text').classList.remove('disabled');
					} else{
						form.setAttribute('data-form','valid');
						document.getElementById('validator-text').classList.add('disabled');
						textField.classList.remove('border-red-dark')
					}

					if(form.getAttribute('data-form') === 'valid'){
						document.querySelectorAll('.form-sent')[0].classList.remove('disabled');
						document.querySelectorAll('.contact-form')[0].classList.add('disabled');
						// Collect the form data while iterating over the inputs
						var data = {};
						for (let i = 0, ii = form.length; i < ii; ++i) {
							let input = form[i];
							if (input.name) {
								data[input.name] = input.value;
							}
						}
						// Construct an HTTP request
						var xhr = new XMLHttpRequest();
						xhr.open(form.method, form.action, true);
						xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
						xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
						// Send the collected data as JSON
						xhr.send(JSON.stringify(data));
						// Callback function
						xhr.onloadend = function (response) {if (response.target.status === 200) {console.log('Form Submitted')}};
					}
				};
			}
		}
	}
}
function init_tab(){
	//Tabs
	var tabTrigger = document.querySelectorAll('.tab-controls a');
	if(tabTrigger.length){
		tabTrigger.forEach(function(e){
			if(e.hasAttribute('data-active')){
				var highlightColor = e.parentNode.getAttribute('data-highlight');
				e.classList.add(highlightColor);
				e.classList.add('no-click');
			}
		});
		tabTrigger.forEach(el => el.addEventListener('click',e =>{
			var highlightColor = el.parentNode.getAttribute('data-highlight');
			var tabParentGroup = el.parentNode.querySelectorAll('a');
			tabParentGroup.forEach(function(e){
				e.classList.remove(highlightColor);
				e.classList.remove('no-click');
			});
			el.classList.add(highlightColor);
			el.classList.add('no-click');
		}));
	}
}
function init_cards(){
	//Card Extender
	const cards = document.getElementsByClassName('card');
	function card_extender(){
		var headerHeight, footerHeight, headerOnPage;
		var headerOnPage = document.querySelectorAll('.header:not(.header-transparent)')[0];
		var footerOnPage = document.querySelectorAll('#footer-bar')[0];
		headerOnPage ? headerHeight = document.querySelectorAll('.header')[0].offsetHeight : headerHeight = 0
		footerOnPage ? footerHeight = document.querySelectorAll('#footer-bar')[0].offsetHeight : footerHeight = 0
		for (let i = 0; i < cards.length; i++) {
			if(cards[i].getAttribute('data-card-height') === "cover"){
				if (window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.outerHeight;}
				if (!window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.innerHeight;}
				//Fix for iOS 15 pages with data-height="cover"
				var coverHeight = windowHeight + 'px';
				// - Remove this for iOS 14 issues - var coverHeight = windowHeight - headerHeight - footerHeight + 'px';
			}
			if(cards[i].getAttribute('data-card-height') === "cover-boxed"){
				if (window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.outerHeight;}
				if (!window.matchMedia('(display-mode: fullscreen)').matches) {var windowHeight = window.innerHeight;}
				var coverHeightBoxed = windowHeight - headerHeight - footerHeight - 40 + 'px';
			}
			if(cards[i].hasAttribute('data-card-height')){
				var getHeight = cards[i].getAttribute('data-card-height');
				cards[i].style.height= getHeight +'px';
				if(getHeight === "cover"){
					var totalHeight = getHeight
					cards[i].style.height =  coverHeight
				}
				if(getHeight === "cover-full"){
					var totalHeight = getHeight
					cards[i].style.height =  "100%"
				}
				if(getHeight === "cover-boxed"){
					var totalHeight = getHeight
					cards[i].style.height =  coverHeightBoxed
				}
			}
		}
	}
	if(cards.length){
		card_extender();
		window.addEventListener("resize", card_extender);
	}
	//Card Effects
	const cardScale = document.querySelectorAll('.card-scale');
	if(cardScale.length){
		cardScale.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-scale-image');}));
		cardScale.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-scale-image');}));
	}
	const cardHide = document.querySelectorAll('.card-hide');
	if(cardHide.length){
		cardHide.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.add('card-hide-image');}));
		cardHide.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('.card-center, .card-bottom, .card-top, .card-overlay')[0].classList.remove('card-hide-image');}));
	}
	const cardRotate = document.querySelectorAll('.card-rotate');
	if(cardRotate.length){
		cardRotate.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-rotate-image');}));
		cardRotate.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-rotate-image');}));
	}
	const cardGray = document.querySelectorAll('.card-grayscale');
	if (cardGray.length){
		cardGray.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-grayscale-image');}));
		cardGray.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-grayscale-image');}));
	}
	const cardBlur = document.querySelectorAll('.card-blur');
	if(cardBlur.length){
		cardBlur.forEach(el => el.addEventListener('mouseenter', event => {el.querySelectorAll('img')[0].classList.add('card-blur-image');}));
		cardBlur.forEach(el => el.addEventListener('mouseleave', event => {el.querySelectorAll('img')[0].classList.remove('card-blur-image');}));
	}
}
function init_plugin(){
	//Lazy Loading
	var lazyLoad = new LazyLoad();
	// Check Documentation folder for detailed explanations on
	// Externally loading Javascript files for better performance.
	var plugIdent, plugClass, plugMain, plugCall;
	var plugLoc = "plugins/"
	let plugins = [
		{
			id: 'uniqueID', // to detect if loaded and unload if needed
			plug: 'pluginName/plugin.js', // the main plugin javascript file
			call: 'pluginName/pluginName-call.js', // the plugin call functions
			style: 'pluginName/pluginName-style.css', // the plugin stylesheet
			trigger: '.pluginTriggerClass' // the trigger that will activate the loading and initializing of the plugin
		},
		/*
		  {
			id: 'chart',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-charts.js',
			trigger: '.chart'
		  },
		  {
			id: 'chart',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-wallet.js',
			trigger: '.wallet-chart'
		  },
		  {
			id: 'graph',
			plug: 'charts/charts.js',
			call: 'charts/charts-call-graphs.js',
			trigger: '.graph'
		  },
		  {
			id: 'count',
			plug: 'countdown/countdown.js',
			trigger: '.countdown'
		  },
		  */
		{
			id: 'gallery',
			plug: 'glightbox/glightbox.js',
			call: 'glightbox/glightbox-call.js',
			style: 'glightbox/glightbox.css',
			trigger: '[data-gallery]'
		},
		{
			id: 'gallery-views',
			plug: 'galleryViews/gallery-views.js',
			trigger: '.gallery-view-controls'
		},
		{
			id: 'filter',
			plug: 'filterizr/filterizr.js',
			call: 'filterizr/filterizr-call.js',
			style: 'filterizr/filterizr.css',
			trigger: '.gallery-filter'
		}
	];
	for (let i = 0; i < plugins.length; i++) {
		//Remove Previous Calls
		if(document.querySelectorAll('.'+plugins[i].id+'-c').length){document.querySelectorAll('.'+plugins[i].id+'-c')[0].remove();                }
		//Load Plugins
		var plugTrigger = document.querySelectorAll(plugins[i].trigger)
		if(plugTrigger.length){
			var loadScript = document.getElementsByTagName('script')[1],
				loadScriptJS = document.createElement('script');
			loadScriptJS.type = 'text/javascript'
			loadScriptJS.className = plugins[i].id+'-p'
			loadScriptJS.src = plugLoc + plugins[i].plug
			loadScriptJS.addEventListener('load',function(){
				//Once plugin is loaded, load the call.
				if(plugins[i].call !== undefined){
					var callFn = document.getElementsByTagName('script')[2],
						callJS = document.createElement('script');
					callJS.type = 'text/javascript'
					callJS.className = plugins[i].id+'-c'
					callJS.src =  plugLoc + plugins[i].call
					callFn.parentNode.insertBefore(callJS, callFn);
				}
			});
			//If plugin doesn't exist, load it
			if(!document.querySelectorAll('.'+plugins[i].id+'-p').length){
				loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
			} else {
				//If plugin doesn't exist, only load the call function
				setTimeout(function(){
					var loadScript = document.getElementsByTagName('script')[1],
						loadScriptJS = document.createElement('script');
					loadScriptJS.type = 'text/javascript'
					loadScriptJS.className = plugins[i].id+'-c'
					loadScriptJS.src = plugLoc + plugins[i].call;
					loadScript.parentNode.insertBefore(loadScriptJS, loadScript);
				},50);
			}
			//If Style doesn't exist in array, don't do anything
			if(plugins[i].style !== undefined){
				//if style already exists, don't re-add to page.
				if(!document.querySelectorAll('.'+plugins[i].id+'-s').length){
					var loadCSS = document.createElement("link");
					loadCSS.className = plugins[i].id+'-s';
					loadCSS.rel = "stylesheet";
					loadCSS.type = "text/css";
					loadCSS.href = plugLoc + plugins[i].style;
					document.getElementsByTagName("head")[0].appendChild(loadCSS);
				}
			}
		}
	}
}
function set_pull_down(){
	PullToRefresh.init({
		mainElement: 'body',
		onRefresh: function(){ window.location.reload(); }
	});
}
//-- INIT-END
//
function bind_page_list_count(count){
	if(count<=1){
		count=0;
	}
	$('#biz_page_item_list_count').val(count);
}
function bind_page_id(item){
	$('#biz_page_tbl_id').val(item.tbl_id);;
	$('#biz_page_data_type').val(item.data_type);;
	$('#biz_page_photofilename').val(item.photofilename);;
	$('#biz_page_parent_tbl_id').val(item.parent_tbl_id);
	$('#biz_page_parent_data_type').val(item.parent_data_type);
	$('#biz_page_top_tbl_id').val(item.top_tbl_id);
	$('#biz_page_top_data_type').val(item.top_data_type);
}
// CLOUD START PROCCESSING END --
//$('#biz_pager').html(get_pager_str(data.page_current,data.page_count,'gallery_list.html?category=all'));
function get_pager_str(page_current,page_count,url){
	str='';
	if(page_count){
		if(page_current>1){
			str = str+"<li class='prev'>";
			str = str+"<a href='"+url+"&page_current="+(parseInt(page_current)-1)+"'>";
			str = str+"<span class='fa fa-angle-left'></span>";
			str = str+"</a></li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='active'><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}else{
				str=str+"<li><a href='"+url+"&page_current="+a+"'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count-1){
		}else{
			str=str+"<li><a href='"+url+"&page_current="+(parseInt(page_current)+1)+"'><span class='fa fa-angle-right'></span></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}
//$('#biz_pager').html(get_pager_ajax(page_current,page_count));
function get_pager_ajax(page_current,page_count){
	str='';
	if(page_count){
		if(page_current>1){
			str = str+"<li class='page-item'>";
			str = str+"<a page_current='"+(parseInt(page_current)-1)+"' class='page-link color-black bg-transparent border-0 biz_link_page' href='#' tabindex='-1' aria-disabled='true'><i class='fa fa-angle-left'></i></a>";
			str = str+"</li>";
		}
		for(var a=1;a<=page_count;a++){
			if(page_current==a){
				str=str+"<li class='page-item active biz_link_page' page_current='"+a+"'><a class='page-link color-black rounded-s border-0 biz_link_page biz_btn' href='#'  page_current='"+a+"'>"+a+"<span class='sr-only'>(current)</span></a></li>";
			}else{
				str=str+"<li class='page-item biz_link_page'  page_current='"+a+"'><a  page_current='"+a+"' class='page-link color-black border-0 biz_link_page' href='#'>"+a+"</a></li>";
			}
		}
		if(page_current>=page_count){
		}else{
			str=str+"<li   page_current='"+(parseInt(page_current)+1)+"' class='page-item biz_link_page'><a  page_current='"+(parseInt(page_current)+1)+"' class='page-link rounded-xs color-black bg-transparent border-0 biz_link_page' href='#'><i class='fa fa-angle-right'></i></a></li>";
		}
		str=str+"</li>";
	}
	return str;
}

