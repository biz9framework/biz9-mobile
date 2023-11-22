//9_dashboard_home 9_menu
function set_dashboard_menu_home(data){
	hide_footer();
	hide_cart();
	set_page_title('Dashboard');
	hide_spinner();
}
//9_dashboard_home 9_menu_home 9_home 9_splash
function set_dashboard_home(data){
	hide_footer();
	hide_cart();
	bind_page_id(data.home);
	set_page_title('Dashboard');
	set_page_sub_title('Home');
	bind_banner(data);
	bind_image(data);
	bind_popular(data);
	bind_category(data);
	bind_buy(data);
	bind_mini(data);
	bind_double(data);
	bind_event(data);
	init_form();
	init_tab();
	hide_spinner();
	function bind_event(data){
		$("#biz_btn_update").click(function() {
			var obj={};
			data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			obj.card_banner_visible=$('#biz_sel_banner_visible').val();
			obj.card_banner_data_type=$('#biz_sel_banner_data_type').val();
			obj.card_banner_order=$('#biz_sel_banner_order').val();
			obj.card_banner_category=$('#biz_sel_banner_category').val();
			obj.card_popular_visible=$('#biz_sel_popular_visible').val();
			obj.card_popular_data_type=$('#biz_sel_popular_data_type').val();
			obj.card_category_visible=$('#biz_sel_category_visible').val();
			obj.card_category_data_type=$('#biz_sel_category_data_type').val();
			obj.card_buy_visible=$('#biz_sel_buy_visible').val();
			obj.card_buy_data_type=$('#biz_sel_buy_data_type').val();
			obj.card_buy_category=$('#biz_sel_buy_category').val();
			obj.card_double_visible=$('#biz_sel_double_visible').val();
			obj.card_double_data_type=$('#biz_sel_double_data_type').val();
			obj.card_double_category=$('#biz_sel_double_category').val();

			obj.card_image_visible=$('#biz_sel_image_visible').val();
			obj.card_image_header=$('#biz_tb_image_header').val();
			obj.card_image_sub_note=$('#biz_tb_image_sub_note').val();

			obj.biz_list="card_banner_visible,card_banner_data_type,card_banner_order,card_banner_category,card_popular_visible,card_popular_data_type,card_category_visible,card_category_data_type,card_buy_visible,card_buy_data_type,card_double_visible,card_double_data_type,card_double_category,card_image_visible,card_image_header,card_image_sub_note";
					cloud_update_biz(data_type,tbl_id,obj,function(data){
					show_toast_update();
				});
		});
	}
	function bind_double(data){
		bind_double_types(data);
		bind_double_events();
		function hide_double_fields(){
			$("#biz_div_double_data_type").hide();
			$("#biz_div_double_category").hide();
		}
		function bind_double_types(data){
			if(data.home.card_double_visible=='true'){
				$("#biz_div_double_data_type").show();
			}else{
				hide_double_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				if(data.data_type_list[a].value!=DT_BLOG_POST && data.data_type_list[a].value!=DT_GALLERY ){
					str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
				}
			}
			$("#biz_sel_double_data_type").html(str);
			$("#biz_sel_double_data_type").val(data.home.card_double_data_type);
			if(data.home.card_double_visible=='true'){
				bind_double_category(data.home.card_double_category);
				$("#biz_div_double_category").show();
			}
		}
		function bind_double_events(){
			$("#biz_sel_double_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_double_data_type").show();
				}else{
					hide_double_fields();
				}
			});
			$("#biz_sel_double_data_type").change(function() {
				category=$(this).val();
				bind_double_category(category);
			});
		}
		function bind_double_category(sel_title){
			data_type=$('#biz_sel_double_data_type').val();
			url = "category/category_list/"+data_type+"/"+1;
			cloud_get_url(url,{},function(data){
				var str='';
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_double_category").html(str);
				$("#biz_div_double_category").show();
				if(sel_title){
					$("#biz_sel_double_category").val(sel_title);
				}
			});
		}
	}
	function bind_mini(data){
		bind_mini_types(data);
		bind_mini_events();
		function hide_mini_fields(){
			$("#biz_div_mini_data_type").hide();
			$("#biz_div_mini_type").hide();
			$("#biz_div_mini_category").hide();
		}
		function bind_mini_types(data){
			if(data.home.card_mini_visible=='true'){
				$("#biz_div_mini_data_type").show();
			}else{
				hide_mini_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_mini_data_type").html(str);
			$("#biz_sel_mini_data_type").val(data.home.card_mini_data_type);
			if(data.home.card_mini_category){
				bind_mini_category(data.home.card_mini_category);
			}
		}
		function bind_mini_events(){
			$("#biz_sel_mini_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_mini_data_type").show();
				}else{
					hide_mini_fields();
				}
			});
			$("#biz_sel_mini_data_type").change(function() {
				bind_mini_category();
			});
		}
		function bind_mini_category(sel_title){
			data_type=$('#biz_sel_mini_data_type').val();
			url = "category/category_list/"+data_type+"/"+1;
			cloud_get_url(url,{},function(data){
				var str='';
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_mini_category").html(str);
				$("#biz_div_mini_category").show();
				if(sel_title){
					$("#biz_sel_mini_category").val(sel_title);
				}
			});
		}
	}
	function bind_image(data){
		bind_image_types(data);
		bind_image_events();
		function hide_image_fields(){
			$("#biz_div_card_image_image").hide();
			$("#biz_div_card_image_header").hide();
			$("#biz_div_card_image_sub_note").hide();
			}
		function show_image_fields(){
			$("#biz_div_card_image_image").show();
			$("#biz_div_card_image_header").show();
			$("#biz_div_card_image_sub_note").show();
		}
		function bind_image_types(data){
			if(data.home.card_image_visible=='true'){
				show_image_fields();
			}else{
				hide_image_fields();
			}
			$('#biz_home_img').attr('src',data.home.photo_obj.square_mid_url);
			$('#biz_tb_image_header').val(data.home.card_image_header);
			$('#biz_tb_image_sub_note').val(data.home.card_image_sub_note);
		}
		function bind_image_events(){
			$("#biz_sel_image_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					show_image_fields();
				}else{
					hide_image_fields();
				}
			});
			$("#biz_home_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_home_img').attr('src',data.photo_obj.square_mid_url);
                    return false;
                });
            });
        });

		}
	}

	function bind_buy(data){
		bind_buy_types(data);
		bind_buy_events();
		function hide_buy_fields(){
			$("#biz_div_buy_visible").show();
			$("#biz_div_buy_data_type").hide();
			$("#biz_div_buy_category").hide();
		}
		function bind_buy_types(data){
			if(data.home.card_buy_visible=='true'){
				$("#biz_div_buy_data_type").show();
			}else{
				hide_buy_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				if( data.data_type_list[a].value!= DT_GALLERY && data.data_type_list[a].value!= DT_BLOG_POST){
					str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
				}
			}
			$("#biz_sel_buy_data_type").html(str);
			$("#biz_sel_buy_data_type").val(data.home.card_buy_data_type);
			if(data.home.card_buy_visible=='true'){
				bind_buy_category(data.home.card_buy_category);
				$("#biz_div_buy_category").show();
			}
		}
		function bind_buy_events(){
			$("#biz_sel_buy_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_buy_data_type").show();
				}else{
					hide_buy_fields();
				}
			});
			$("#biz_sel_buy_data_type").change(function() {
				category=$(this).val();
				bind_buy_category(category);
			});
		}
		function bind_buy_category(sel_title){
			data_type=$('#biz_sel_buy_data_type').val();
			url = "category/category_list/"+data_type+"/"+1;
			cloud_get_url(url,{},function(data){
				var str='';
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_buy_category").html(str);
				$("#biz_div_buy_category").show();
				if(sel_title){
					$("#biz_sel_buy_category").val(sel_title);
				}
			});
		}
	}
	function bind_category(data){
		bind_category_types(data);
		bind_category_events();
		function hide_category_fields(){
			$("#biz_div_category_data_type").hide();
		}
		function bind_category_types(data){
			if(data.home.card_category_visible=='true'){
				$("#biz_div_category_data_type").show();
			}else{
				hide_category_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_category_data_type").html(str);
			$("#biz_sel_category_data_type").val(data.home.card_category_data_type);
		}
		function bind_category_events(){
			$("#biz_sel_category_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_category_data_type").show();
				}else{
					hide_category_fields();
				}
			});
		}
	}
	function bind_popular(data){
		bind_popular_types(data);
		bind_popular_events();
		function hide_popular_fields(){
			$("#biz_div_popular_data_type").hide();
		}
		function bind_popular_types(data){
			$("#biz_sel_popular_visible").val(data.home.card_popular_visible);
			if(data.home.card_popular_visible=='true'){
				$("#biz_div_popular_data_type").show();
			}else{
				hide_popular_fields();
			}
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_popular_data_type").html(str);
			$("#biz_sel_popular_data_type").val(data.home.card_popular_data_type);
		}
		function bind_popular_events(){
			$("#biz_sel_popular_visible").change(function() {
				val=$(this).val();
				if(val=='true'){
					$("#biz_div_popular_data_type").show();
				}else{
					hide_popular_fields();
				}
			});
		}
	}
	function bind_banner(data){
		bind_banner_types(data);
		bind_banner_events();
		function bind_banner_types(data){
			var str='';
			for(a=0;a<data.data_type_list.length;a++){
				str=str+ "<option value='"+data.data_type_list[a].value+"'>"+data.data_type_list[a].title + "</option>";
			}
			$("#biz_sel_banner_data_type").html(str);
			$("#biz_sel_banner_visible").val(data.home.card_banner_visible);
			$("#biz_sel_banner_data_type").val(data.home.card_banner_data_type);
			if(data.home.card_banner_visible=='true'){
				if(data.home.card_banner_data_type){
					$("#biz_div_banner_data_type").show();
					$("#biz_div_banner_order").show();
					$("#biz_sel_banner_order").val(data.home.card_banner_order);
					if(data.home.card_banner_order=='category'){
						bind_banner_category(data.home.card_banner_category);
						$("#biz_div_banner_category").show();
					}else if(data.home.card_banner_order=='recent'){
						$("#biz_div_banner_category").hide();
					}
				}
			}else{
				hide_banner_fields();
			}
		}
		function hide_banner_fields(){
			$("#biz_div_banner_data_type").hide();
			$("#biz_div_banner_order").hide();
			$("#biz_div_banner_category").hide();
		}
		function bind_banner_events(){
			$("#biz_sel_banner_visible").change(function() {
				val = $(this).val();
				if(val=='false'){
					hide_banner_fields();
				}else{
					$("#biz_div_banner_data_type").show();
					bind_banner_events();
				}
			});
			$("#biz_sel_banner_data_type").change(function() {
				$("#biz_div_banner_order").show();
				$("#biz_div_banner_category").hide();
			});
			$("#biz_sel_banner_order").change(function() {
				order_type=$(this).val();
				if(order_type=='category'){
					bind_banner_category();
				}else{
					$("#biz_div_banner_category").hide();
				}
			});
		}
		function bind_banner_category(sel_title){
			data_type=$('#biz_sel_banner_data_type').val();
			url = "category/category_list/"+data_type+"/"+1;
			cloud_get_url(url,{},function(data){
				var str='';
				for(a=0;a<data.category_list.length;a++){
					str=str+ "<option value='"+data.category_list[a].title+"'>"+data.category_list[a].title + "</option>";
				}
				$("#biz_sel_banner_category").html(str);
				$("#biz_div_banner_category").show();
				if(sel_title){
					$("#biz_sel_banner_category").val(sel_title);
				}
			});
		}
	}
}
//9_navigation
function set_dashboard_navigation(data){
	hide_cart();
	hide_footer();
	bind_page_id(data.mobile.left_nav_bar);
	bind_navigation_detail(data.mobile.left_nav_bar);
	bind_navigation_event();
	init_form();
	hide_spinner();
	function bind_navigation_detail(data){
		set_page_title('Dashboard');
		set_page_sub_title('Navigation');
		$('#biz_img').attr('src',data.photo_obj.square_mid_url);
		$('#biz_tb_header').val(data.header);
		$('#biz_tb_sub_note').val(data.sub_note);
		$('#biz_tb_bar_title').val(data.bar_title);
		$('#biz_tb_bar_social').val(data.bar_social);
		$('#biz_tb_copyright').val(data.copyright);
	}
	function bind_navigation_event(){
		$("#biz_btn_update").click(function() {
			var obj={};
			data_type=$('#biz_page_data_type').val();
			tbl_id=$('#biz_page_tbl_id').val();
			obj.photofilename= $('#biz_page_photofilename').val();
			obj.header=$('#biz_tb_header').val();
			obj.sub_note=$('#biz_tb_sub_note').val();
			obj.bar_title=$('#biz_tb_bar_title').val();
			obj.bar_social=$('#biz_tb_bar_social').val();
			obj.copyright=$('#biz_tb_copyright').val();
			obj.biz_list="header,sub_note,bar_title,bar_social,copyright";
			cloud_update_biz(data_type,tbl_id,obj,function(data){
				show_toast_update();
			});
		});
	}
}

//9_setting
function set_dashboard_setting(data){
	hide_cart();
	hide_footer();
	set_page_title('Dashboard');
	set_page_sub_title('Settings');
	bind_page_id(data.info);
	bind_profile(data.info);
	bind_business(data.info);
	bind_social(data.info);
	bind_app(data.primary);
	bind_billing(data.info);
	bind_navigation(data.left_nav);
	bind_email(data.info);
	bind_event();
	init_tab();
	init_form();
	hide_spinner();
	function bind_profile(data){
		user=get_user();
		$('#biz_page_user_tbl_id').val(user.tbl_id);
		$('#biz_page_user_data_type').val(user.data_type);
		$('#biz_tb_first_name').val(user.first_name);
		$('#biz_tb_last_name').val(user.last_name);
		$('#biz_tb_profile_email').val(user.email);
		$('#biz_tb_password1').val(user.password);
		$('#biz_tb_password2').val(user.password);
	}
	function bind_business(data){
	$('#biz_tb_business_name').val(data.business_name);
		$('#biz_tb_business_email').val(data.business_email);
		$('#biz_tb_business_phone').val(data.business_phone);
		$('#biz_sel_business_country').val(data.business_country);
		$('#biz_tb_business_address1').val(data.business_address1);
		$('#biz_tb_business_address2').val(data.business_address2);
		$('#biz_tb_business_city').val(data.business_city);
		$('#biz_sel_business_state').val(data.business_state);
		$('#biz_tb_business_zip').val(data.business_zip);
	}
	function bind_social(data){
		$('#biz_tb_social_website').val(data.social_website);
		$('#biz_tb_social_instagram').val(data.social_instagram);
		$('#biz_tb_social_twitter').val(data.social_twitter);
		$('#biz_tb_social_facebook').val(data.social_facebook);
		$('#biz_tb_social_youtube').val(data.social_youtube);
	}
	function bind_app(data){
		$('#biz_tb_app_title').val(data.app_title);
		$('#biz_sel_app_color').val(data.app_color);
		$('#biz_sel_app_theme').val(data.app_theme);
		$('#biz_sel_button_color').val(data.button_color);
		$("#biz_sel_app_color").change(function() {
			set_app_color($('#biz_sel_app_color').val(),$('#biz_sel_app_theme').val());
		});
		$("#biz_sel_app_theme").change(function() {
			set_app_color($('#biz_sel_app_color').val(),$('#biz_sel_app_theme').val());
		});
	}
	function bind_billing(data){
		$('#biz_tb_business_cashapp').val(data.business_cashapp);
		$('#biz_tb_business_stripe_key').val(data.business_stripe_key);
	}
	function bind_navigation(data){
		$('#biz_page_left_nav_data_type').val(data.data_type);
		$('#biz_page_left_nav_tbl_id').val(data.tbl_id);
		$('#biz_tb_left_nav_header').val(data.left_nav_header);
		if(data.photofilename){
			$('#biz_navigation_img').attr('src',data.photo_obj.square_mid_url);
			$('#biz_page_left_nav_photofilename').val(data.photofilename)
		}
		$('#biz_tb_left_nav_sub_note').val(data.left_nav_sub_note);
		$('#biz_tb_left_nav_bar_title').val(data.left_nav_bar_title);
		$('#biz_tb_left_nav_bar_social').val(data.left_nav_bar_social);
		$('#biz_tb_left_nav_copyright').val(data.left_nav_copyright);
		$("#biz_navigation_img").click(function() {
            tbl_id= $('#biz_page_left_nav_tbl_id').val();
            data_type= $('#biz_page_left_nav_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
					$('#biz_page_left_nav_photofilename').val(data.photofilename);
                    $('#biz_navigation_img').attr('src',data.photo_obj.square_mid_url);
					return false;
                });
            });
        });
	}
	function bind_email(data){
		$('#biz_tb_send_in_blue_email').val(data.send_in_blue_email);
		$('#biz_tb_send_in_blue_key').val(data.send_in_blue_key);
		$('#biz_tb_send_in_blue_order_send_subject').val(data.send_in_blue_order_send_subject);
		$('#biz_tb_send_in_blue_order_send_template_id').val(data.send_in_blue_order_send_template_id);
		$('#biz_tb_send_in_blue_form_send_subject').val(data.send_in_blue_form_send_subject);
		$('#biz_tb_send_in_blue_form_send_template_id').val(data.send_in_blue_form_send_template_id);
	}
	function bind_event(){
		$("#biz_btn_update").click(function() {
			var obj={};
			obj.user_tbl_id=$('#biz_page_user_tbl_id').val();
			obj.user_data_type=$('#biz_page_user_data_type').val();
			//profile
			obj.first_name=$('#biz_tb_first_name').val();
			obj.last_name=$('#biz_tb_last_name').val();
			obj.email=$('#biz_tb_profile_email').val();
			password1=$('#biz_tb_password1').val();
			password2=$('#biz_tb_password2').val();
			//business
			obj.business_name=$('#biz_tb_business_name').val();
			obj.business_email=$('#biz_tb_business_email').val();
			obj.business_phone=$('#biz_tb_business_phone').val();
			obj.business_country=$('#biz_sel_business_country').val();
			obj.business_address1=$('#biz_tb_business_address1').val();
			obj.business_address2=$('#biz_tb_business_address2').val();
			obj.business_city=$('#biz_tb_business_city').val();
			obj.business_state=$('#biz_sel_business_state').val();
			obj.business_zip=$('#biz_tb_business_zip').val();
			//social
			obj.social_website=$('#biz_tb_social_website').val();
			obj.social_youtube=$('#biz_tb_social_youtube').val();
			obj.social_instagram=$('#biz_tb_social_instagram').val();
			obj.social_facebook=$('#biz_tb_social_facebook').val();
			obj.social_twitter=$('#biz_tb_social_twitter').val();
			if(!validate_email(obj.business_email)){
				show_toast_error('Please enter a valid business email');
			}else if(!validate_email(obj.email)){
				show_toast_error('Please enter a valid email');
			}else if(password1!=password2 || password1.length<=0){
				show_toast_error('Please enter a valid password');
			}else{
				obj.password=password1;
				url='profile_update';
				cloud_post_url(url,obj,function(data){
					set_user(data.user);
					show_toast_update();
					return false;
				});
			}
			return false;
		});
		$("#biz_btn_update2").click(function() {
			var obj={};
			//primary
			//app
			obj.primary_app_title=$('#biz_tb_app_title').val();
			obj.primary_app_color=$('#biz_sel_app_color').val();
			obj.primary_app_theme=$('#biz_sel_app_theme').val();
			obj.primary_button_color=$('#biz_sel_button_color').val();
			//info
			//billing
			obj.business_cashapp=$('#biz_tb_business_cashapp').val();
			obj.business_stripe_key=$('#biz_tb_business_stripe_key').val();
			//left_nav
			//navigation
			obj.left_nav_header=$('#biz_tb_left_nav_header').val();
			obj.left_nav_sub_note=$('#biz_tb_left_nav_sub_note').val();
			obj.left_nav_bar_title=$('#biz_tb_left_nav_bar_title').val();
			obj.left_nav_bar_social=$('#biz_tb_left_nav_bar_social').val();
			obj.left_nav_copyright=$('#biz_tb_left_nav_copyright').val();
			obj.left_nav_photofilename=$('#biz_page_left_nav_photofilename').val();;
			//info
			//email
			obj.send_in_blue_email=$('#biz_tb_send_in_blue_email').val();
			obj.send_in_blue_key=$('#biz_tb_send_in_blue_key').val();
			obj.send_in_blue_order_send_subject=$('#biz_tb_send_in_blue_order_send_subject').val();
			obj.send_in_blue_order_send_template_id=$('#biz_tb_send_in_blue_order_send_template_id').val();
			obj.send_in_blue_form_send_subject=$('#biz_tb_send_in_blue_form_send_subject').val();
			obj.send_in_blue_form_send_template_id=$('#biz_tb_send_in_blue_form_send_template_id').val();
			url='setting_update';
			cloud_post_url(url,obj,function(data){
				show_toast_update();
				return false;
			});
		});
	}
}
// 9_edit_list 9_list//9_dash
function set_dashboard_sub_item_list(data){
    hide_footer();
    hide_cart();
	bind_page_id(data);
	bind_page_list_count(data.item_list.length);
    set_page_title('Dashboard');
    set_page_sub_title(data.page_title);
    set_page_note("(" + data.item_list.length + " items)");
    bind_list(data.item_list);
	bind_event();
	hide_spinner();
    function bind_list(item_list){
        str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
			item_edit_url ='dashboard_sub_item.html?tbl_id='+item.tbl_id+'&data_type='+item.data_type+'&parent_data_type='+item.parent_data_type+'&parent_tbl_id='+item.parent_tbl_id;
			item_sub_list_edit_url ='dashboard_sub_item_list.html?tbl_id='+item.tbl_id+'&data_type='+item.data_type+'&parent_data_type='+item.data_type+'&parent_tbl_id='+item.tbl_id;
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-10 accordion-icon a-gear'></i>"+
                "</a>";
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div class='biz_diz_list_title'><a href='"+item_edit_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b>"+item.title+"</b></p></a><div>"+
                "</div>"+
              "<p class='mb-0 ps-3 font-10  opacity-60'>"+get_money(item.price)+ edit_str+ " </p>"+
                  "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3' style='float:left;'>"+
                "<div class='biz_diz_list_edit'>"+
				"<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+item_sub_list_edit_url+"'><i class='admin_edit_img fa fa-tags pe-2 a-gear'></i></a>"+
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
    }
    function bind_event(){
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
            data_type = DT_ITEM;
			parent_data_type=$('#biz_page_parent_data_type').val();
			parent_tbl_id=$('#biz_page_parent_tbl_id').val();
            window.location='dashboard_sub_item.html?tbl_id='+tbl_id+"&data_type="+data_type+"&parent_data_type="+parent_data_type+"&parent_tbl_id="+parent_tbl_id;
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
//9_dashboard_photo 9_photo_edit
function set_dashboard_photo(data){
    hide_footer();
    hide_cart();
    bind_detail(data);
    bind_event();
	hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        if(data.photo.tbl_id==0){
            set_page_sub_title('Add Photo');
			new_item=get_new_item(DT_PHOTO);
			new_item.parent_tbl_id=data.parent_tbl_id;
			new_item.parent_data_type=data.parent_data_type;
			new_item.top_tbl_id=data.parent_tbl_id;
			new_item.top_data_type=data.parent_data_type;
			bind_page_id(new_item);
        }else{
    		bind_page_id(data.photo);
            set_page_sub_title('Edit Photo');
            $('#biz_img').attr('src',data.photo.photo_obj.square_mid_url);
        }
        $('#biz_tb_text').val(data.photo.text);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() { var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            var obj={};
            obj.parent_data_type= $('#biz_page_parent_data_type').val();
            obj.parent_tbl_id= $('#biz_page_parent_tbl_id').val();
			obj.top_data_type= $('#biz_page_parent_data_type').val();
            obj.top_tbl_id= $('#biz_page_parent_tbl_id').val();
            obj.photofilename= $('#biz_page_photofilename').val();
            obj.text=$('#biz_tb_text').val();
                cloud_update(data_type,tbl_id,obj,function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    show_toast_update();
					return false;
                });
        });
        $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
			parent_data_type= $('#biz_page_parent_data_type').val();
            parent_tbl_id= $('#biz_page_parent_tbl_id').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id,parent_data_type:parent_data_type},function(data){
					$('#biz_page_tbl_id').val(data.tbl_id);
					$('#biz_page_photofilename').val(data.photofilename);
                    $('#biz_img').attr('src',data.photo_obj.square_mid_url);
                    return false;
                });
            });
        });

    }
}
//9_sub_item 9_sub_item
function set_dashboard_sub_item(data){
    hide_footer();
    hide_cart();
    bind_detail(data);
    bind_event();
	hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        if(data.sub_item.tbl_id==0){
            set_page_sub_title('Add Sub Item');
			new_item=get_new_item(DT_ITEM);
			new_item.parent_tbl_id=data.parent_item.tbl_id;
			new_item.parent_data_type=data.parent_item.data_type;
			new_item.top_tbl_id=data.top_item.tbl_id;
			new_item.top_data_type=data.top_item.data_type;
			bind_page_id(new_item);
        }else{
    		bind_page_id(data.sub_item);
            set_page_sub_title('Edit Sub Item');
        }
        $('#biz_tb_title').val(data.sub_item.title);
        $('#biz_tb_price').val(data.sub_item.price);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() { var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            var obj={};
            obj.parent_data_type= $('#biz_page_parent_data_type').val();
            obj.parent_tbl_id= $('#biz_page_parent_tbl_id').val();
			obj.top_data_type= $('#biz_page_top_data_type').val();
            obj.top_tbl_id= $('#biz_page_top_tbl_id').val();
            obj.photofilename= $('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.price=$('#biz_tb_price').val();
            if(obj.title){
                cloud_update(data_type,tbl_id,obj,function(data){
                    	$('#biz_page_tbl_id').val(data.tbl_id);
                    	show_toast_update();
						return false;
                });
            }else{
                show_toast_error('Please enter a valid title');
            }
        });
    }
}
//9_photo_list 9_dash_photo 9_dashboard_photo_list
function set_dashboard_photo_list(data){
    hide_footer();
    hide_cart();
	$('#biz_page_parent_data_type').val(data.parent_item.data_type);
    $('#biz_page_parent_tbl_id').val(data.parent_item.tbl_id);
	$('#biz_page_top_data_type').val(data.top_item.data_type);
    $('#biz_page_top_tbl_id').val(data.top_item.tbl_id);
	bind_page_list_count(data.photo_list.length);
    set_page_title('Dashboard');
    set_page_sub_title(data.parent_item.title + ' Photos');
    set_page_note("(" + data.photo_list.length + " items)");
    bind_list(data.photo_list);
	bind_event();
	hide_spinner();
    function bind_list(item_list){
        str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
                "</a>";
			edit_url="dashboard_photo.html?tbl_id="+item.tbl_id+"&parent_tbl_id="+item.parent_tbl_id +"&parent_data_type="+item.parent_data_type;
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='"+edit_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='"+edit_url+"'><p class='ps-3 line-height-s color-theme mb-1 font-11'>"+item.text+"</p></a><div>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-10  opacity-60'>"+item.date_obj.full_date_create + " " + item.date_obj.time_create + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'>"+
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
    }
    function bind_event(){
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
            parent_data_type = $('#biz_page_parent_data_type').val();
            parent_tbl_id = $('#biz_page_parent_tbl_id').val();
            window.location='dashboard_photo.html?tbl_id='+tbl_id+"&parent_data_type="+parent_data_type+"&parent_tbl_id="+parent_tbl_id;
        });
    }
}

