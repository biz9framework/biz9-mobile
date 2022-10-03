G_ITEM_MAP_ABOUT='about';
G_ITEM_MAP_CONTACT='contact';
G_ITEM_MAP_COMMENT='comment';
G_ITEM_MAP_SLIDESHOW='slideshow';
G_ITEM_MAP_WELCOME='welcome';
G_ITEM_MAP_PRIMARY='primary';
//sub
//-gallery
//-document
//9_account
function set_admin_page_account(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Account');
	user = get_user();
	url = 'admin/get_user/'+user.email;
	get_cloud_data(url,{
	}, function(data){
		$('#biz_tb_account_email').val(data.user.email);
		$('#biz_tb_account_name').val(data.user.name);
		$('#biz_page_tbl_id').val(data.user.tbl_id);
		$('#biz_page_data_type').val(data.user.data_type);
		load_validate_fields();
	});
	load_validate_fields();
	$("#biz_btn_account_update").click(function() {
		account_tbl_id= $('#biz_page_tbl_id').val();
		account_data_type= $('#biz_page_data_type').val();
		account_name=$('#biz_tb_account_name').val();
		account_email=$('#biz_tb_account_email').val();
		account_password=$('#biz_tb_account_password').val();
		account_confirm_password=$('#biz_tb_account_confirm_password').val();
		if(!validate_email(account_email)){
			alert('please enter a valid email');
		}else if(account_password!=account_confirm_password || account_password.length<=0){
			alert('please enter a valid password');
		}else{
			post_crud_update_item(account_data_type,account_tbl_id,{
				name:account_name,
				email:account_email,
				password:account_password,
			}, function(data){
				set_user(data);
				show_toast_update();
			});
		}
	});
}
//9_register
function set_admin_page_register(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Register');
	//$('#biz_tb_register_name').val('JoeSantana');
	//$('#biz_tb_register_email').val('ceo@mybossapp.com');
	//$('#biz_tb_register_password').val('1234567');
	load_validate_fields();
	$("#biz_btn_register_update").click(function() {
		name= $('#biz_tb_register_name').val();
		email= $('#biz_tb_register_email').val();
		password= $('#biz_tb_register_password').val();
		if(!validate_email(email)){
			alert('please enter a valid email.');
		}else if(!password){
			alert('please enter a password');
		}else{
			url = 'admin/update_system';
			post_cloud_data(url,{
				name:name,
				email:email,
				password:password,
			}, function(data){
				if(data.validation_message){
					alert(data.validation_message);
				}else{
					set_user(data.user);
					window.location='index.html';
				}
			});
		}
	});
}
//9_login
function set_admin_page_login(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Login');
	//$('#biz_tb_login_email').val('ceo@mybossapp.com');
	//$('#biz_tb_login_password').val('1234567');

	load_validate_fields();
	$("#biz_btn_login_update").click(function() {
		email= $('#biz_tb_login_email').val();
		password= $('#biz_tb_login_password').val();
		if(!validate_email(email)){
			alert('please enter a valid email.');
		}else if(!password){
			alert('please enter a password');
		}else{
			url = 'login_check';
			get_cloud_data(url,{
				email:email,
				password:password,
			}, function(data){
				if(data.validation_message){
					alert(data.validation_message);
				}else{
					set_user(data.user);
					window.location='/';
				}
			});
		}
	});
}
//9_forgotpassword
function set_admin_page_forgot_password(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Forgot Password');
	//$('#biz_tb_login_email').val('ceo@bossappz.com');
	load_validate_fields();
	$("#biz_btn_forgotpassword_update").click(function() {
		email= $('#biz_tb_login_email').val();
		if(!validate_email(email)){
			alert('please enter a valid email.');
		}else{
			url = 'cloud/mail/forgotpasswordsend';
			post_cloud_data(url,{
				email:email,
			}, function(data){
				alert(data.validation_message);
			});
		}
	});
}
//9_blog_post_category_edit
function set_admin_page_blog_post_category(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Blog Post Category');
	$('#biz_page_tbl_id').val(data.blog_post_category.tbl_id);
	$('#biz_page_data_type').val(data.blog_post_category.data_type);
	$('#biz_tb_blog_post_category_title').val(data.blog_post_category.title);
	load_validate_fields();
	$("#biz_btn_blog_post_category_update").click(function() {
		blog_post_category_tbl_id= $('#biz_page_tbl_id').val();
		blog_post_category_data_type= $('#biz_page_data_type').val();
		blog_post_category_title=$('#biz_tb_blog_post_category_title').val();
		title_url=get_title_url(blog_post_category_title);
		type='blog_post';
		if(blog_post_category_title){
			post_crud_update_item(blog_post_category_data_type,blog_post_category_tbl_id,{
				title_url:title_url,
				type:type,
				title:blog_post_category_title,
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
			});
		}else{
			alert('please enter title');
		}
	});
}
//9_product_category_edit
function set_admin_page_product_category(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Product Category');
	$('#biz_page_tbl_id').val(data.product_category.tbl_id);
	$('#biz_page_data_type').val(data.product_category.data_type);
	$('#biz_tb_product_category_title').val(data.product_category.title);
	load_validate_fields();
	$("#biz_btn_product_category_update").click(function() {
		product_category_tbl_id= $('#biz_page_tbl_id').val();
		product_category_data_type= $('#biz_page_data_type').val();
		product_category_title=$('#biz_tb_product_category_title').val();
		title_url=get_title_url(product_category_title);
		type='product';
		if(product_category_title){
			post_crud_update_item(product_category_data_type,product_category_tbl_id,{
				title_url:title_url,
				type:type,
				title:product_category_title,
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
				show_toast_update();
			});
		}else{
			alert('please enter title');
		}
	});
}

//9_service_detail 9_service_edit
function set_admin_page_service(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service Edit');
	$('#biz_page_tbl_id').val(data.service.tbl_id);
	$('#biz_page_data_type').val(data.service.data_type);
	$('#biz_tb_service_title').val(data.service.title);
	$('#biz_tb_service_description').val(data.service.sub_note);
	$('#biz_tb_service_price').val(data.service.price);
	$('#biz_sel_in_stock').val(data.service.in_stock);
	load_validate_fields();
	set_service_category_list(data.service_category_list);
	function set_service_category_list(category_list){
		var str='';
		str="<select id='biz_sel_category_title_list'><option value='Category' disabled>Category</option>";
		for(a=0;a<category_list.length;a++){
			str=str+ "<option value='"+category_list[a].title+"' selected>"+category_list[a].title+"</option>";
		}
		str=str+"</select>";
		$('#biz_div_service_category_list').html(str);
		$('#biz_sel_category_title_list').val(data.service.category);
	}
	init_item_note(data.service.note);
	$("#biz_btn_service_update").click(function() {
		service_tbl_id= $('#biz_page_tbl_id').val();
		service_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_service_title').val();
		title_url=get_title_url(title);
		description=$('#biz_tb_service_description').val();
		price=$('#biz_tb_service_price').val();
		in_stock=$('#biz_sel_in_stock').val();
		category=$('#biz_sel_category_title_list').val();
		note = get_item_note();
		if(title){
		post_crud_update_item(service_data_type,service_tbl_id,{
			in_stock:in_stock,
			title_url:title_url,
			title:title,
			category:category,
			sub_note:description,
			price:price,
			note:note,
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
		}else{
			alert('please enter title');
		}
	});
	set_tabs();
}
//9_about 9_about
function set_admin_page_about(data){
	$('#footer-bar').hide();
	var toastID = document.getElementById('toast-save');
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('About');
	$('#biz_img_about').hide();
	if(data.about.photofilename){
		$('#biz_img_about').attr('src',data.about.thumb_photo_url);
		$('#biz_img_about').show();
	}
	$('#biz_page_tbl_id').val(data.about.tbl_id);
	$('#biz_page_data_type').val(data.about.data_type);
	$('#biz_page_photofilename').val(data.about.photofilename);
	$('#biz_tb_about_header').val(data.about.header);
	$('#biz_tb_about_sub_note').val(data.about.sub_note);
	init_item_note(data.about.note);
	load_validate_fields();
	$("#biz_btn_about_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		header=$('#biz_tb_about_header').val();
		sub_note=$('#biz_tb_about_sub_note').val();
		photofilename=$('#biz_page_photofilename').val();
		note = get_item_note();
		post_crud_update_item(page_data_type,page_tbl_id,{
			title:G_ITEM_MAP_ABOUT,
			title_url:G_ITEM_MAP_ABOUT.toLowerCase(),
			header:header,
			sub_note:sub_note,
			note:note,
			photofilename:photofilename,
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
	});
	$("#biz_btn_about_img").click(function() {
		tbl_id = $('#biz_page_tbl_id').val();
		data_type = $('#biz_page_data_type').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_about').show();
				$('#biz_page_photofilename').val(data.photofilename);
				$('#biz_img_about').attr('src',data.thumb_photo_url);
			});
		});
	});
	set_tabs();
}
//9_contact_detail 9_contact_edit
function set_admin_page_contact(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Contact');
	$('#biz_page_tbl_id').val(data.contact.tbl_id);
	$('#biz_page_data_type').val(data.contact.data_type);
	$('#biz_tb_contact_form_title').val(data.contact.contact_form_title);
	$('#biz_tb_contact_form_note').val(data.contact.contact_form_note);
    if(!data.contact.contact_form_visible){
        data.contact.contact_form_visible='true';
    }
    if(!data.contact.contact_social_visible){
        data.contact.contact_social_visible='true';
    }
	$('#biz_sel_contact_form_visible').val(data.contact.contact_form_visible);
	$('#biz_tb_contact_info_title').val(data.contact.contact_info_title);
	$('#biz_tb_contact_info_note').val(data.contact.contact_info_note);
	$('#biz_tb_contact_social_address').val(data.contact.contact_social_address);
	$('#biz_tb_contact_social_phone').val(data.contact.contact_social_phone);
	$('#biz_tb_contact_social_email').val(data.contact.contact_social_email);
	$('#biz_tb_contact_social_facebook').val(data.contact.contact_social_facebook);
	$('#biz_tb_contact_social_twitter').val(data.contact.contact_social_twitter);
	$('#biz_tb_contact_social_youtube').val(data.contact.contact_social_youtube);
	$('#biz_tb_contact_social_instagram').val(data.contact.contact_social_instagram);
	$('#biz_tb_contact_social_website').val(data.contact.contact_social_website);
	$('#biz_sel_contact_social_visible').val(data.contact.contact_social_visible);
	$("#biz_btn_contact_update").click(function() {
		contact_tbl_id= $('#biz_page_tbl_id').val();
		contact_data_type= $('#biz_page_data_type').val();
		contact_form_title=$('#biz_tb_contact_form_title').val();
		contact_form_note=$('#biz_tb_contact_form_note').val();
		contact_form_visible=$('#biz_sel_contact_form_visible').val();
		contact_info_title=$('#biz_tb_contact_info_title').val();
		contact_info_note=$('#biz_tb_contact_info_note').val();
		contact_social_address=$('#biz_tb_contact_social_address').val();
		contact_social_phone=$('#biz_tb_contact_social_phone').val();
		contact_social_email=$('#biz_tb_contact_social_email').val();
		contact_social_facebook=$('#biz_tb_contact_social_facebook').val();
		contact_social_twitter=$('#biz_tb_contact_social_twitter').val();
		contact_social_youtube=$('#biz_tb_contact_social_youtube').val();
		contact_social_instagram=$('#biz_tb_contact_social_instagram').val();
		contact_social_website=$('#biz_tb_contact_social_website').val();
		contact_social_visible=$('#biz_sel_contact_social_visible').val();
		post_crud_update_item(contact_data_type,contact_tbl_id,{
			title:G_ITEM_MAP_CONTACT,
			title_url:G_ITEM_MAP_CONTACT.toLowerCase(),
			contact_form_title:contact_form_title,
			contact_form_note:contact_form_note,
			contact_form_visible:contact_form_visible,
			contact_info_title:contact_info_title,
			contact_info_note:contact_info_note,
			contact_social_address:contact_social_address,
			contact_social_phone:contact_social_phone,
			contact_social_email:contact_social_email,
			contact_social_facebook:contact_social_facebook,
			contact_social_twitter:contact_social_twitter,
			contact_social_youtube:contact_social_youtube,
			contact_social_instagram:contact_social_instagram,
			contact_social_website:contact_social_website,
			contact_social_visible:contact_social_visible
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
	});
	set_tabs();
}
//9_page_detail 9_page_edit
function set_admin_page_page(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Page Edit');
	$('#biz_page_tbl_id').val(data.page.tbl_id);
	$('#biz_page_data_type').val(data.page.data_type);
	$('#biz_tb_page_title').val(data.page.title);
	$('#biz_tb_page_sub_note').val(data.page.sub_note);
	$('#biz_tb_page_button_text').val(data.page.button_text);
    if(!data.page.visible){
        data.page.visible='true';
    }
	$('#biz_sel_page_visible').val(data.page.visible);
    if(!data.page.type){
        data.page.type='blog_post';
    }
	$('#biz_sel_page_type').val(data.page.type);
	$("#biz_btn_page_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_page_title').val();
		sub_note=$('#biz_tb_page_sub_note').val();
		button_text=$('#biz_tb_page_button_text').val();
		type=$('#biz_sel_page_type').val();
		visible=$('#biz_sel_page_visible').val();
		title_url=get_title_url(title);
		document_type=G_DT_DOCUMENT_PAGE;
		if(!title){
			alert('please enter title');
		}else{
			post_crud_update_item(page_data_type,page_tbl_id,{
				title:title,
				document_type:document_type,
				button_text:button_text,
				sub_note:sub_note,
				type:type,
				visible:visible,
				title_url:title_url,
			}, function(data){
				show_toast_update();
			});
		}
	});
}
//9_setting
function set_admin_page_setting(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Setting');
	$('#biz_img_nav').hide();
	$('#biz_page_tbl_id').val(data.primary.tbl_id);
	$('#biz_page_data_type').val(data.primary.data_type);
	$('#biz_page_photofilename').val(data.primary.photofilename);
    if(!data.primary.app_color){
        data.primary.app_color="gradient-4";
    }
    if(!data.primary.app_theme){
        data.primary.app_theme="light-mode";
    }
    if(!data.primary.home_feature_type){
        data.primary.home_feature_type="product";
    }
    if(!data.primary.feature_show_shop){
        data.primary.feature_show_shop="true";
    }
    if(!data.primary.feature_show_service){
        data.primary.feature_show_service="true";
    }
    if(!data.primary.feature_show_login){
        data.primary.feature_show_login="true";
    }
    if(!data.primary.billing_cashapp_visible){
        data.primary.billing_cashapp_visible="false";
    }
    if(!data.primary.billing_stripe_visible){
        data.primary.billing_stripe_visible="false";
    }
    if(!data.primary.billing_paydelivery_visible){
        data.primary.billing_paydelivery_visible="false";
    }
	$('#biz_sel_app_color').val(data.primary.app_color);
	$('#biz_tb_app_title').val(data.primary.app_title);
	$('#biz_sel_app_theme').val(data.primary.app_theme);
	$('#biz_tb_nav_header').val(data.primary.nav_header);
	$('#biz_tb_nav_sub_note').val(data.primary.nav_sub_note);
	$('#biz_tb_nav_bar_title').val(data.primary.nav_bar_title);
	$('#biz_tb_nav_bar_social').val(data.primary.nav_bar_social);
	$('#biz_tb_nav_phone').val(data.primary.nav_phone);
	$('#biz_tb_nav_mail').val(data.primary.nav_mail);
	$('#biz_tb_nav_copy').val(data.primary.nav_copy);
	$('#biz_sel_home_feature_type').val(data.primary.home_feature_type);
	$('#biz_sel_feature_show_shop').val(data.primary.feature_show_shop);
	$('#biz_sel_feature_show_service').val(data.primary.feature_show_service);
	$('#biz_sel_feature_show_login').val(data.primary.feature_show_login);
	$('#biz_tb_billing_notification_email').val(data.primary.billing_notification_email);
	$('#biz_tb_billing_cashapp_handler').val(data.primary.billing_cashapp_handler);
	$('#biz_sel_billing_cashapp_visible').val(data.primary.billing_cashapp_visible);
	$('#biz_tb_billing_stripe_publish_key').val(data.primary.billing_stripe_publish_key);
	$('#biz_tb_billing_stripe_secret_key').val(data.primary.billing_stripe_secret_key);
	$('#biz_sel_billing_stripe_visible').val(data.primary.billing_stripe_visible);
	$('#biz_sel_billing_paydelivery_visible').val(data.primary.billing_paydelivery_visible);
	if(data.primary.photofilename){
		$('#biz_img_nav').show();
		$('#biz_img_nav').attr('src',data.primary.thumb_photo_url);
	}

    //system
    $('#biz_lbl_app_vendor_title').html(APP_VENDOR);
    $('#biz_lbl_app_vendor_website').html(APP_VENDOR_WEBSITE);
    $('#biz_lbl_app_vendor_website').attr('href',APP_VENDOR_WEBSITE);

    $('#biz_lbl_app_system_version').html(BIZ9_MOBILE_VERSION);
    $('#biz_lbl_app_app_version').html(APP_VERSION);

    $('#biz_lbl_app_title').html(APP_TITLE);
    $('#biz_lbl_app_title_id').html(APP_TITLE_ID);
    $('#biz_lbl_app_title_url').html(CLOUD_URL);

	$("#biz_btn_setting_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		photofilename=$('#biz_page_photofilename').val();
		app_color=$('#biz_sel_app_color').val();
		app_title=$('#biz_tb_app_title').val();
		app_theme=$('#biz_sel_app_theme').val();
		nav_header=$('#biz_tb_nav_header').val();
		nav_sub_note=$('#biz_tb_nav_sub_note').val();
		nav_bar_title=$('#biz_tb_nav_bar_title').val();
		nav_bar_social=$('#biz_tb_nav_bar_social').val();
		nav_phone=$('#biz_tb_nav_phone').val();
		nav_mail=$('#biz_tb_nav_mail').val();
		nav_copy=$('#biz_tb_nav_copy').val();
		home_feature_type=$('#biz_sel_home_feature_type').val();
		billing_notification_email=$('#biz_tb_billing_notification_email').val();
		billing_cashapp_handler=$('#biz_tb_billing_cashapp_handler').val();
		billing_cashapp_visible=$('#biz_sel_billing_cashapp_visible').val();
		billing_stripe_publish_key=$('#biz_tb_billing_stripe_publish_key').val();
		billing_stripe_secret_key=$('#biz_tb_billing_stripe_secret_key').val();
		billing_stripe_visible=$('#biz_sel_billing_stripe_visible').val();
		billing_paydelivery_visible=$('#biz_sel_billing_paydelivery_visible').val();
		feature_show_shop=$('#biz_sel_feature_show_shop').val();
		feature_show_service=$('#biz_sel_feature_show_service').val();
		feature_show_login=$('#biz_sel_feature_show_login').val();
		post_crud_update_item(page_data_type,page_tbl_id,{
			app_title:app_title,
			app_color:app_color,
			app_theme:app_theme,
			nav_header:nav_header,
			nav_sub_note:nav_sub_note,
			nav_bar_title:nav_bar_title,
			nav_bar_social:nav_bar_social,
			nav_phone:nav_phone,
			nav_mail:nav_mail,
			nav_copy:nav_copy,
			home_feature_type:home_feature_type,
			billing_notification_email:billing_notification_email,
			billing_cashapp_handler:billing_cashapp_handler,
			billing_cashapp_visible:billing_cashapp_visible,
			billing_stripe_visible:billing_stripe_visible,
			billing_stripe_publish_key:billing_stripe_publish_key,
			billing_stripe_secret_key:billing_stripe_secret_key,
			photofilename:photofilename,
			billing_paydelivery_visible:billing_paydelivery_visible,
			feature_show_shop:feature_show_shop,
			feature_show_service:feature_show_service,
			feature_show_login:feature_show_login
		}, function(data){
			set_app_color(app_color,app_theme);
			show_toast_update();
		});
	});
	$("#biz_btn_nav_img").click(function() {
		tbl_id = $('#biz_page_tbl_id').val();
		data_type = $('#biz_page_data_type').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_nav').show();
				$('#biz_page_photofilename').val(data.photofilename);
				$('#biz_img_nav').attr('src',data.thumb_photo_url);
			});
		});
	});
	set_tabs();
}
//9_product_sub_detail 9_product_sub_edit
function set_admin_page_product_sub(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Sub');
	$('#biz_page_tbl_id').val(data.product.tbl_id);
	$('#biz_page_data_type').val(data.product.data_type);
	$('#biz_tb_product_sub1_title').val(data.product.product_sub1_title);
	$('#biz_tb_product_sub1_option1_title').val(data.product.sub1_option1_title);
	$('#biz_tb_product_sub1_option1_price').val(data.product.sub1_option1_price);
	$('#biz_tb_product_sub1_option2_title').val(data.product.sub1_option2_title);
	$('#biz_tb_product_sub1_option2_price').val(data.product.sub1_option2_price);
	$('#biz_tb_product_sub1_option3_title').val(data.product.sub1_option3_title);
	$('#biz_tb_product_sub1_option3_price').val(data.product.sub1_option3_price);
	$('#biz_tb_product_sub1_option4_title').val(data.product.sub1_option4_title);
	$('#biz_tb_product_sub1_option4_price').val(data.product.sub1_option4_price);
	$('#biz_tb_product_sub1_option5_title').val(data.product.sub1_option5_title);
	$('#biz_tb_product_sub1_option5_price').val(data.product.sub1_option5_price);
	$('#biz_tb_product_sub2_title').val(data.product.product_sub2_title);
	$('#biz_tb_product_sub2_option1_title').val(data.product.sub2_option1_title);
	$('#biz_tb_product_sub2_option1_price').val(data.product.sub2_option1_price);
	$('#biz_tb_product_sub2_option2_title').val(data.product.sub2_option2_title);
	$('#biz_tb_product_sub2_option2_price').val(data.product.sub2_option2_price);
	$('#biz_tb_product_sub2_option3_title').val(data.product.sub2_option3_title);
	$('#biz_tb_product_sub2_option3_price').val(data.product.sub2_option3_price);
	$('#biz_tb_product_sub2_option4_title').val(data.product.sub2_option4_title);
	$('#biz_tb_product_sub2_option4_price').val(data.product.sub2_option4_price);
	$('#biz_tb_product_sub2_option5_title').val(data.product.sub2_option5_title);
	$('#biz_tb_product_sub2_option5_price').val(data.product.sub2_option5_price);
	$('#biz_tb_product_shipping_title').val(data.product.product_shipping_title);
	$('#biz_tb_product_shipping_option1_title').val(data.product.shipping_option1_title);
	$('#biz_tb_product_shipping_option1_price').val(data.product.shipping_option1_price);
	$('#biz_tb_product_shipping_option2_title').val(data.product.shipping_option2_title);
	$('#biz_tb_product_shipping_option2_price').val(data.product.shipping_option2_price);
	$('#biz_tb_product_shipping_option3_title').val(data.product.shipping_option3_title);
	$('#biz_tb_product_shipping_option3_price').val(data.product.shipping_option3_price);
	$('#biz_tb_product_shipping_option4_title').val(data.product.shipping_option4_title);
	$('#biz_tb_product_shipping_option4_price').val(data.product.shipping_option4_price);
	$('#biz_tb_product_shipping_option5_title').val(data.product.shipping_option5_title);
	$('#biz_tb_product_shipping_option5_price').val(data.product.shipping_option5_price);
	if(!data.product.show_store_links){
		$('#biz_sel_show_store_links').val('false');
	}else{
		$('#biz_sel_show_store_links').val(data.product.show_store_links);
	}
	load_validate_fields();
	$("#biz_btn_product_update").click(function() {
		product_tbl_id= $('#biz_page_tbl_id').val();
		product_data_type= $('#biz_page_data_type').val();
		product_sub1_title= $('#biz_tb_product_sub1_title').val();
		sub1_option1_title=$('#biz_tb_product_sub1_option1_title').val();
		sub1_option1_price=$('#biz_tb_product_sub1_option1_price').val();
		sub1_option2_title=$('#biz_tb_product_sub1_option2_title').val();
		sub1_option2_price=$('#biz_tb_product_sub1_option2_price').val();
		sub1_option3_title=$('#biz_tb_product_sub1_option3_title').val();
		sub1_option3_price=$('#biz_tb_product_sub1_option3_price').val();
		sub1_option4_title=$('#biz_tb_product_sub1_option4_title').val();
		sub1_option4_price=$('#biz_tb_product_sub1_option4_price').val();
		sub1_option5_title=$('#biz_tb_product_sub1_option5_title').val();
		sub1_option5_price=$('#biz_tb_product_sub1_option5_price').val();
		product_sub2_title= $('#biz_tb_product_sub2_title').val();
		sub2_option1_title=$('#biz_tb_product_sub2_option1_title').val();
		sub2_option1_price=$('#biz_tb_product_sub2_option1_price').val();
		sub2_option2_title=$('#biz_tb_product_sub2_option2_title').val();
		sub2_option2_price=$('#biz_tb_product_sub2_option2_price').val();
		sub2_option3_title=$('#biz_tb_product_sub2_option3_title').val();
		sub2_option3_price=$('#biz_tb_product_sub2_option3_price').val();
		sub2_option4_title=$('#biz_tb_product_sub2_option4_title').val();
		sub2_option4_price=$('#biz_tb_product_sub2_option4_price').val();
		sub2_option5_title=$('#biz_tb_product_sub2_option5_title').val();
		sub2_option5_price=$('#biz_tb_product_sub2_option5_price').val();
		product_shipping_title= $('#biz_tb_product_shipping_title').val();
		shipping_option1_title=$('#biz_tb_product_shipping_option1_title').val();
		shipping_option1_price=$('#biz_tb_product_shipping_option1_price').val();
		shipping_option2_title=$('#biz_tb_product_shipping_option2_title').val();
		shipping_option2_price=$('#biz_tb_product_shipping_option2_price').val();
		shipping_option3_title=$('#biz_tb_product_shipping_option3_title').val();
		shipping_option3_price=$('#biz_tb_product_shipping_option3_price').val();
		shipping_option4_title=$('#biz_tb_product_shipping_option4_title').val();
		shipping_option4_price=$('#biz_tb_product_shipping_option4_price').val();
		shipping_option5_title=$('#biz_tb_product_shipping_option5_title').val();
		shipping_option5_price=$('#biz_tb_product_shipping_option5_price').val();
		show_store_links=$('#biz_sel_show_store_links').val();
		post_crud_update_item(product_data_type,product_tbl_id,{
			product_sub1_title:product_sub1_title,
			sub1_option1_title:sub1_option1_title,
			sub1_option1_price:sub1_option1_price,
			sub1_option2_title:sub1_option2_title,
			sub1_option2_price:sub1_option2_price,
			sub1_option3_title:sub1_option3_title,
			sub1_option3_price:sub1_option3_price,
			sub1_option4_title:sub1_option4_title,
			sub1_option4_price:sub1_option4_price,
			sub1_option5_title:sub1_option5_title,
			sub1_option5_price:sub1_option5_price,
			product_sub2_title:product_sub2_title,
			sub2_option1_title:sub2_option1_title,
			sub2_option1_price:sub2_option1_price,
			sub2_option2_title:sub2_option2_title,
			sub2_option2_price:sub2_option2_price,
			sub2_option3_title:sub2_option3_title,
			sub2_option3_price:sub2_option3_price,
			sub2_option4_title:sub2_option4_title,
			sub2_option4_price:sub2_option4_price,
			sub2_option5_title:sub2_option5_title,
			sub2_option5_price:sub2_option5_price,
			product_shipping_title:product_shipping_title,
			shipping_option1_title:shipping_option1_title,
			shipping_option1_price:shipping_option1_price,
			shipping_option2_title:shipping_option2_title,
			shipping_option2_price:shipping_option2_price,
			shipping_option3_title:shipping_option3_title,
			shipping_option3_price:shipping_option3_price,
			shipping_option4_title:shipping_option4_title,
			shipping_option4_price:shipping_option4_price,
			shipping_option5_title:shipping_option5_title,
			shipping_option5_price:shipping_option5_price,
			show_store_links:show_store_links
		}, function(data){
			show_toast_update();
		});
	});
	set_tabs();
}
//9_service_sub_detail 9_service_sub_edit
function set_admin_page_service_sub(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service Sub');
	$('#biz_page_tbl_id').val(data.service.tbl_id);
	$('#biz_page_data_type').val(data.service.data_type);
	$('#biz_tb_service_sub1_title').val(data.service.service_sub1_title);
	$('#biz_tb_service_sub1_option1_title').val(data.service.sub1_option1_title);
	$('#biz_tb_service_sub1_option1_price').val(data.service.sub1_option1_price);
	$('#biz_tb_service_sub1_option2_title').val(data.service.sub1_option2_title);
	$('#biz_tb_service_sub1_option2_price').val(data.service.sub1_option2_price);
	$('#biz_tb_service_sub1_option3_title').val(data.service.sub1_option3_title);
	$('#biz_tb_service_sub1_option3_price').val(data.service.sub1_option3_price);
	$('#biz_tb_service_sub1_option4_title').val(data.service.sub1_option4_title);
	$('#biz_tb_service_sub1_option4_price').val(data.service.sub1_option4_price);
	$('#biz_tb_service_sub1_option5_title').val(data.service.sub1_option5_title);
	$('#biz_tb_service_sub1_option5_price').val(data.service.sub1_option5_price);
	$('#biz_tb_service_sub2_title').val(data.service.service_sub2_title);
	$('#biz_tb_service_sub2_option1_title').val(data.service.sub2_option1_title);
	$('#biz_tb_service_sub2_option1_price').val(data.service.sub2_option1_price);
	$('#biz_tb_service_sub2_option2_title').val(data.service.sub2_option2_title);
	$('#biz_tb_service_sub2_option2_price').val(data.service.sub2_option2_price);
	$('#biz_tb_service_sub2_option3_title').val(data.service.sub2_option3_title);
	$('#biz_tb_service_sub2_option3_price').val(data.service.sub2_option3_price);
	$('#biz_tb_service_sub2_option4_title').val(data.service.sub2_option4_title);
	$('#biz_tb_service_sub2_option4_price').val(data.service.sub2_option4_price);
	$('#biz_tb_service_sub2_option5_title').val(data.service.sub2_option5_title);
	$('#biz_tb_service_sub2_option5_price').val(data.service.sub2_option5_price);
	$('#biz_tb_service_shipping_title').val(data.service.service_shipping_title);
	$('#biz_tb_service_shipping_option1_title').val(data.service.shipping_option1_title);
	$('#biz_tb_service_shipping_option1_price').val(data.service.shipping_option1_price);
	$('#biz_tb_service_shipping_option2_title').val(data.service.shipping_option2_title);
	$('#biz_tb_service_shipping_option2_price').val(data.service.shipping_option2_price);
	$('#biz_tb_service_shipping_option3_title').val(data.service.shipping_option3_title);
	$('#biz_tb_service_shipping_option3_price').val(data.service.shipping_option3_price);
	$('#biz_tb_service_shipping_option4_title').val(data.service.shipping_option4_title);
	$('#biz_tb_service_shipping_option4_price').val(data.service.shipping_option4_price);
	$('#biz_tb_service_shipping_option5_title').val(data.service.shipping_option5_title);
	$('#biz_tb_service_shipping_option5_price').val(data.service.shipping_option5_price);
	$('#biz_sel_show_store_links').val(data.service.show_store_links);
	load_validate_fields();
	$("#biz_btn_service_update").click(function() {
		service_tbl_id= $('#biz_page_tbl_id').val();
		service_data_type= $('#biz_page_data_type').val();
		service_sub1_title= $('#biz_tb_service_sub1_title').val();
		sub1_option1_title=$('#biz_tb_service_sub1_option1_title').val();
		sub1_option1_price=$('#biz_tb_service_sub1_option1_price').val();
		sub1_option2_title=$('#biz_tb_service_sub1_option2_title').val();
		sub1_option2_price=$('#biz_tb_service_sub1_option2_price').val();
		sub1_option3_title=$('#biz_tb_service_sub1_option3_title').val();
		sub1_option3_price=$('#biz_tb_service_sub1_option3_price').val();
		sub1_option4_title=$('#biz_tb_service_sub1_option4_title').val();
		sub1_option4_price=$('#biz_tb_service_sub1_option4_price').val();
		sub1_option5_title=$('#biz_tb_service_sub1_option5_title').val();
		sub1_option5_price=$('#biz_tb_service_sub1_option5_price').val();
		service_sub2_title= $('#biz_tb_service_sub2_title').val();
		sub2_option1_title=$('#biz_tb_service_sub2_option1_title').val();
		sub2_option1_price=$('#biz_tb_service_sub2_option1_price').val();
		sub2_option2_title=$('#biz_tb_service_sub2_option2_title').val();
		sub2_option2_price=$('#biz_tb_service_sub2_option2_price').val();
		sub2_option3_title=$('#biz_tb_service_sub2_option3_title').val();
		sub2_option3_price=$('#biz_tb_service_sub2_option3_price').val();
		sub2_option4_title=$('#biz_tb_service_sub2_option4_title').val();
		sub2_option4_price=$('#biz_tb_service_sub2_option4_price').val();
		sub2_option5_title=$('#biz_tb_service_sub2_option5_title').val();
		sub2_option5_price=$('#biz_tb_service_sub2_option5_price').val();
		service_shipping_title= $('#biz_tb_service_shipping_title').val();
		shipping_option1_title=$('#biz_tb_service_shipping_option1_title').val();
		shipping_option1_price=$('#biz_tb_service_shipping_option1_price').val();
		shipping_option2_title=$('#biz_tb_service_shipping_option2_title').val();
		shipping_option2_price=$('#biz_tb_service_shipping_option2_price').val();
		shipping_option3_title=$('#biz_tb_service_shipping_option3_title').val();
		shipping_option3_price=$('#biz_tb_service_shipping_option3_price').val();
		shipping_option4_title=$('#biz_tb_service_shipping_option4_title').val();
		shipping_option4_price=$('#biz_tb_service_shipping_option4_price').val();
		shipping_option5_title=$('#biz_tb_service_shipping_option5_title').val();
		shipping_option5_price=$('#biz_tb_service_shipping_option5_price').val();
		show_store_links=$('#biz_sel_show_store_links').val();
		post_crud_update_item(service_data_type,service_tbl_id,{
			service_sub1_title:service_sub1_title,
			sub1_option1_title:sub1_option1_title,
			sub1_option1_price:sub1_option1_price,
			sub1_option2_title:sub1_option2_title,
			sub1_option2_price:sub1_option2_price,
			sub1_option3_title:sub1_option3_title,
			sub1_option3_price:sub1_option3_price,
			sub1_option4_title:sub1_option4_title,
			sub1_option4_price:sub1_option4_price,
			sub1_option5_title:sub1_option5_title,
			sub1_option5_price:sub1_option5_price,
			service_sub2_title:service_sub2_title,
			sub2_option1_title:sub2_option1_title,
			sub2_option1_price:sub2_option1_price,
			sub2_option2_title:sub2_option2_title,
			sub2_option2_price:sub2_option2_price,
			sub2_option3_title:sub2_option3_title,
			sub2_option3_price:sub2_option3_price,
			sub2_option4_title:sub2_option4_title,
			sub2_option4_price:sub2_option4_price,
			sub2_option5_title:sub2_option5_title,
			sub2_option5_price:sub2_option5_price,
			service_shipping_title:service_shipping_title,
			shipping_option1_title:shipping_option1_title,
			shipping_option1_price:shipping_option1_price,
			shipping_option2_title:shipping_option2_title,
			shipping_option2_price:shipping_option2_price,
			shipping_option3_title:shipping_option3_title,
			shipping_option3_price:shipping_option3_price,
			shipping_option4_title:shipping_option4_title,
			shipping_option4_price:shipping_option4_price,
			shipping_option5_title:shipping_option5_title,
			shipping_option5_price:shipping_option5_price,
			show_store_links:show_store_links
		}, function(data){
			show_toast_update();
		});
	});
	set_tabs();
}
//9_product_media 9_product_media_edit
function set_admin_page_product_media(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Media');
	$('#biz_div_mp3').hide();
	$('#biz_page_tbl_id').val(data.product.tbl_id);
	$('#biz_page_data_type').val(data.product.data_type);
	$('#biz_tb_product_mp3_title').val(data.product.mp3_title);
	$('#biz_tb_product_mp3_note').val(data.product.mp3_note);
	$('#biz_product_mp3filename').val(data.product.mp3filename);
	$('#biz_product_mp3duration').val(data.product.mp3duration);
	$('#biz_product_mp3_url').val(data.product.mp3_url);
	if(data.product.mp3filename){
		$('#biz_div_mp3').show();
		$('#biz_tb_product_mp3_title').val(data.product.mp3_title);
		$('#biz_tb_product_mp3_note').val(data.product.mp3_note);
		$('#biz_product_mp3filename').val(data.product.mp3filename);
		$('#biz_product_mp3_url').val(data.product.mp3_url);
		$('#biz_tb_product_mp3duration').val(data.product.mp3duration);
		set_mp3_player(data.product.mp3_url);
	}
	$('#biz_tb_product_youtube_link').val(data.product.youtube_link);
	$('#biz_tb_product_youtube_title').val(data.product.youtube_title);
	$('#biz_tb_product_youtube_note').val(data.product.youtube_note);
	load_validate_fields();
	set_tabs();
	$("#biz_btn_product_update").click(function() {
		product_tbl_id= $('#biz_page_tbl_id').val();
		product_data_type= $('#biz_page_data_type').val();
		mp3_title=$('#biz_tb_product_mp3_title').val();
		mp3_note=$('#biz_tb_product_mp3_note').val();
		mp3filename=$('#biz_product_mp3filename').val();
		mp3duration=$('#biz_product_mp3duration').val();
		mp3_url=$('#biz_product_mp3_url').val();
		youtube_link=get_youtube_link($('#biz_tb_product_youtube_link').val());
		youtube_title=$('#biz_tb_product_youtube_title').val();
		youtube_note=$('#biz_tb_product_youtube_note').val();
		post_crud_update_item(product_data_type,product_tbl_id,{
			mp3_title:mp3_title,
			mp3_note:mp3_note,
			mp3_url:mp3_url,
			mp3filename:mp3filename,
			mp3duration:mp3duration,
			youtube_link:youtube_link,
			youtube_title:youtube_title,
			youtube_note:youtube_note,
		}, function(data){
			show_toast_update();
		});
	});
	$("#biz_btn_add_audio").click(function() {
		file_mp3_select(function(data){
			$('#biz_product_mp3filename').val(data.mp3filename);
			$('#biz_product_mp3duration').val(data.mp3duration);
			$('#biz_product_mp3_url').val(data.mp3_url);
			$('#biz_tb_product_mp3duration').val(data.mp3duration);
			$('#biz_div_mp3').show();
			set_mp3_player(data.mp3_url);
		});
	});
}
//9_service_media 9_service_media_edit
function set_admin_page_service_media(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service Media');
	$('#biz_div_mp3').hide();
	$('#biz_page_tbl_id').val(data.service.tbl_id);
	$('#biz_page_data_type').val(data.service.data_type);
	$('#biz_tb_service_mp3_title').val(data.service.mp3_title);
	$('#biz_tb_service_mp3_note').val(data.service.mp3_note);
	$('#biz_service_mp3filename').val(data.service.mp3filename);
	$('#biz_service_mp3duration').val(data.service.mp3duration);
	$('#biz_service_mp3_url').val(data.service.mp3_url);
	if(data.service.mp3filename){
		$('#biz_div_mp3').show();
		$('#biz_tb_service_mp3duration').val('Duration: '+data.service.mp3duration);
		set_mp3_player(data.service.mp3_url);
	}
	$('#biz_tb_service_youtube_link').val(data.service.youtube_link);
	$('#biz_tb_service_youtube_title').val(data.service.youtube_title);
	$('#biz_tb_service_youtube_note').val(data.service.youtube_note);
	load_validate_fields();
	set_tabs();
	$("#biz_btn_service_update").click(function() {
		service_tbl_id= $('#biz_page_tbl_id').val();
		service_data_type= $('#biz_page_data_type').val();
		mp3_title=$('#biz_tb_service_mp3_title').val();
		mp3_note=$('#biz_tb_service_mp3_note').val();
		mp3filename=$('#biz_service_mp3filename').val();
		mp3duration=$('#biz_tb_service_mp3duration').val();
		mp3_url=$('#biz_service_mp3_url').val();
		youtube_link=get_youtube_link($('#biz_tb_service_youtube_link').val());
		youtube_title=$('#biz_tb_service_youtube_title').val();
		youtube_note=$('#biz_tb_service_youtube_note').val();
		post_crud_update_item(service_data_type,service_tbl_id,{
			mp3_title:mp3_title,
			mp3_note:mp3_note,
			mp3_url:mp3_url,
			mp3filename:mp3filename,
			mp3duration:mp3duration,
			youtube_link:youtube_link,
			youtube_title:youtube_title,
			youtube_note:youtube_note,
		}, function(data){
			show_toast_update();
		});
	});
	$("#biz_btn_add_audio").click(function() {
		file_mp3_select(function(data){
			$('#biz_service_mp3filename').val(data.mp3filename);
			$('#biz_service_mp3duration').val(data.mp3duration);
			$('#biz_service_mp3_url').val(data.mp3_url);
			$('#biz_tb_service_mp3duration').val(data.mp3duration);
			$('#biz_div_mp3').show();
			set_mp3_player(data.mp3_url);
		});
	});
}
//9_product_detail 9_product_edit
function set_admin_page_product(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Edit');
	//$('#biz_div_mp3').hide();
	$('#biz_page_tbl_id').val(data.product.tbl_id);
	$('#biz_page_data_type').val(data.product.data_type);
	$('#biz_tb_product_title').val(data.product.title);
	$('#biz_tb_product_description').val(data.product.sub_note);
	$('#biz_tb_product_price').val(data.product.price);
	$('#biz_tb_product_old_price').val(data.product.old_price);
	if(!data.product.in_stock){
        data.product.in_stock='';
	}
	$('#biz_sel_in_stock').val(data.product.in_stock);
	load_validate_fields();
	set_product_category_list(data.product_category_list);
	function set_product_category_list(category_list){
		var str='';
		str="<select id='biz_sel_category_title_list'><option value='Category' disabled>Category</option>";
		for(a=0;a<category_list.length;a++){
			str=str+ "<option value='"+category_list[a].title+"' selected>"+category_list[a].title+"</option>";
		}
		str=str+"</select>";
		$('#biz_div_product_category_list').html(str);
		$('#biz_sel_category_title_list').val(data.product.category);
	}
	init_item_note(data.product.note);
	$("#biz_btn_product_update").click(function() {
		product_tbl_id= $('#biz_page_tbl_id').val();
		product_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_product_title').val();
		title_url=get_title_url(title);
		description=$('#biz_tb_product_description').val();
		price=$('#biz_tb_product_price').val();
		old_price=$('#biz_tb_product_old_price').val();
		in_stock=$('#biz_sel_in_stock').val();
		category=$('#biz_sel_category_title_list').val();
		note = get_item_note();
	if(title){
		post_crud_update_item(product_data_type,product_tbl_id,{
			in_stock:in_stock,
			title_url:title_url,
			title:title,
			category:category,
			sub_note:description,
			price:price,
			old_price:old_price,
			note:note,
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
	}else{
			alert('please enter title');
		}
	});
	set_tabs();
}
//9_service_category_edit
function set_admin_page_service_category(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Service Category');
	$('#biz_page_tbl_id').val(data.service_category.tbl_id);
	$('#biz_page_data_type').val(data.service_category.data_type);
	$('#biz_tb_service_category_title').val(data.service_category.title);
	load_validate_fields();
	$("#biz_btn_service_category_update").click(function() {
		service_category_tbl_id= $('#biz_page_tbl_id').val();
		service_category_data_type= $('#biz_page_data_type').val();
		service_category_title=$('#biz_tb_service_category_title').val();
		item_map_tbl_id=$('#biz_item_map_tbl_id').val();
		title_url=get_title_url(service_category_title);
		type='service';
		if(service_category_title){
			post_crud_update_item(service_category_data_type,service_category_tbl_id,{
				title:service_category_title,
				title_url:title_url,
				type:type
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
				show_toast_update();
			});
		}else{
			alert('please enter title');
		}
	});
}
//9_service_category_list
function set_admin_page_service_category_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service Category');
	var str='';
	for(a=0;a<data.service_category_list.length;a++){
		str=str+"<div  id='biz_row_"+data.service_category_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.service_category_list[a].data_type+"' tbl_id='"+data.service_category_list[a].tbl_id+"' href='#'><img  id='biz_img_"+data.service_category_list[a].tbl_id+"' src='"+data.service_category_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_service_category.html?title_url="+  data.service_category_list[a].title_url+"' data_type='"+  data.service_category_list[a].data_type+"' tbl_id='"+  data.service_category_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.service_category_list[a].title+"</strong></p></a>"+

			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_service_category.html?title_url="+  data.service_category_list[a].title_url+"' data_type='"+  data.service_category_list[a].data_type+"' tbl_id='"+  data.service_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_service_category_delete' href='#' data_type='"+data.service_category_list[a].data_type+"' tbl_id='"+data.service_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+

			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_service_category_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_service_category_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_page_list
function set_admin_page_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Pages');
	var str='';
	for(a=0;a<data.page_list.length;a++){
  data.page_list[a].sub_note=data.page_list[a].sub_note?(data.page_list[a].sub_note):'';
        data.page_list[a].button_text=data.page_list[a].button_text?(data.page_list[a].button_text):'';

		str=str+"<div  id='biz_row_"+data.page_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.page_list[a].data_type+"' tbl_id='"+data.page_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.page_list[a].tbl_id+"' src='"+data.page_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_page.html?title_url="+   data.page_list[a].title_url+"' data_type='"+  data.page_list[a].data_type+"'tbl_id='"+   data.page_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.page_list[a].title+"</strong></p></a>"+
			"<p class='ps-3 line-height-s color-theme mb-1'>"+data.page_list[a].sub_note+"</p>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_page.html?title_url="+   data.page_list[a].title_url+"' data_type='"+  data.page_list[a].data_type+"'tbl_id='"+   data.page_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_page_delete' href='#' data_type='"+data.page_list[a].data_type+"'tbl_id='"+data.page_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_page_list').html(str);

	$(".biz_btn_page_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});

	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
}
//9_team_edit
function set_admin_page_team(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Team');
	$('#biz_page_tbl_id').val(data.team.tbl_id);
	$('#biz_page_data_type').val(data.team.data_type);
	$('#biz_tb_team_title').val(data.team.title);
	$('#biz_tb_team_position').val(data.team.position);
	$('#biz_tb_team_bio').val(data.team.bio);
	load_validate_fields();
	$("#biz_btn_team_update").click(function() {
		team_tbl_id= $('#biz_page_tbl_id').val();
		team_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_team_title').val();
		position=$('#biz_tb_team_position').val();
		bio=$('#biz_tb_team_bio').val();
		title_url=get_title_url(title);
		if(title){
			post_crud_update_item(team_data_type,team_tbl_id,{
				title_url:title_url,
				title:title,
				position:position,
				bio:bio,
				title_url:title_url,
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
				show_toast_update();
			});
		}else{
			alert('please enter title');
		}
	});
}
//9_team_list
function set_admin_page_team_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Team');
	var str='';
	for(a=0;a<data.team_list.length;a++){
		str=str+"<div  id='biz_row_"+data.team_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.team_list[a].data_type+"' tbl_id='"+data.team_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.team_list[a].tbl_id+"' src='"+data.team_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='#'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.team_list[a].title+"</strong></p></a>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_team.html?title_url="+  data.team_list[a].title_url+"' data_type='"+  data.team_list[a].data_type+"'tbl_id='"+  data.team_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_team_delete' href='#' data_type='"+data.team_list[a].data_type+"'tbl_id='"+data.team_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_team_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_team_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_category_list
function set_admin_page_blog_post_category_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Blog Post Category');
	var str='';
	for(a=0;a<data.blog_post_category_list.length;a++){
		str=str+"<div  id='biz_row_"+data.blog_post_category_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.blog_post_category_list[a].data_type+"' tbl_id='"+data.blog_post_category_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.blog_post_category_list[a].tbl_id+"' src='"+data.blog_post_category_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_blog_post_category.html?title_url="+  data.blog_post_category_list[a].title_url+"' data_type='"+  data.blog_post_category_list[a].data_type+"'tbl_id='"+  data.blog_post_category_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.blog_post_category_list[a].title+"</strong></p></a>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_blog_post_category.html?title_url="+  data.blog_post_category_list[a].title_url+"' data_type='"+  data.blog_post_category_list[a].data_type+"'tbl_id='"+  data.blog_post_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_blog_post_category_delete' href='#' data_type='"+data.blog_post_category_list[a].data_type+"'tbl_id='"+data.blog_post_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_blog_post_category_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_blog_post_category_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_category_list
function set_admin_page_product_category_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Category');
	var str='';
	for(a=0;a<data.product_category_list.length;a++){
		str=str+"<div  id='biz_row_"+data.product_category_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.product_category_list[a].data_type+"' tbl_id='"+data.product_category_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.product_category_list[a].tbl_id+"' src='"+data.product_category_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='#'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.product_category_list[a].title+"</strong></p></a>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_product_category.html?title_url="+  data.product_category_list[a].title_url+"' data_type='"+  data.product_category_list[a].data_type+"'tbl_id='"+  data.product_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_product_category_delete' href='#' data_type='"+data.product_category_list[a].data_type+"'tbl_id='"+data.product_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_product_category_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_product_category_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_gallery_category_edit
function set_admin_page_gallery_category(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Gallery Category');
	$('#biz_page_tbl_id').val(data.gallery_category.tbl_id);
	$('#biz_page_data_type').val(data.gallery_category.data_type);
	$('#biz_tb_gallery_category_title').val(data.gallery_category.title);
	load_validate_fields();
	$("#biz_btn_gallery_category_update").click(function() {
		gallery_category_tbl_id= $('#biz_page_tbl_id').val();
		gallery_category_data_type= $('#biz_page_data_type').val();
		gallery_category_title=$('#biz_tb_gallery_category_title').val();
		title_url=get_title_url(gallery_category_title);
		type='gallery';
		if(gallery_category_title){
			post_crud_update_item(gallery_category_data_type,gallery_category_tbl_id,{
				title_url:title_url,
				type:type,
				title:gallery_category_title,
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
				show_toast_update();
			});
		}else{
			alert('please enter title');
		}
	});
}
//9_gallery_category_list
function set_admin_page_gallery_category_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Gallery Category');
	var str='';
	for(a=0;a<data.gallery_category_list.length;a++){
		str=str+"<div  id='biz_row_"+data.gallery_category_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.gallery_category_list[a].data_type+"' tbl_id='"+data.gallery_category_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.gallery_category_list[a].tbl_id+"' src='"+data.gallery_category_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_gallery_category.html?title_url="+  data.gallery_category_list[a].title_url+"' data_type='"+  data.gallery_category_list[a].data_type+"'tbl_id='"+  data.gallery_category_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.gallery_category_list[a].title+"</strong></p></a>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_gallery_category.html?title_url="+  data.gallery_category_list[a].title_url+"' data_type='"+  data.gallery_category_list[a].data_type+"'tbl_id='"+  data.gallery_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_gallery_category_delete' href='#' data_type='"+data.gallery_category_list[a].data_type+"'tbl_id='"+data.gallery_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_gallery_category_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_gallery_category_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_product_category_list
function set_admin_page_product_category_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Category');
	var str='';
	for(a=0;a<data.product_category_list.length;a++){
		str=str+"<div  id='biz_row_"+data.product_category_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.product_category_list[a].data_type+"' tbl_id='"+data.product_category_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.product_category_list[a].tbl_id+"' src='"+data.product_category_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_product_category.html?title_url="+  data.product_category_list[a].title_url+"' data_type='"+  data.product_category_list[a].data_type+"'tbl_id='"+  data.product_category_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.product_category_list[a].title+"</strong></p></a>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_product_category.html?title_url="+  data.product_category_list[a].title_url+"' data_type='"+  data.product_category_list[a].data_type+"'tbl_id='"+  data.product_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a class='biz_btn_product_category_delete' href='#' data_type='"+data.product_category_list[a].data_type+"'tbl_id='"+data.product_category_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_product_category_list').html(str);
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_product_category_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}

function set_photo_list_str(item){
	if(!item.note){
		item.note='';
	}
	str="<div id='biz_row_"+item.tbl_id+"' class='d-flex mb-3'>"+
		"<div>"+
		"<a class='biz_btn_edit_photo' data_type='"+item.data_type+"' tbl_id='"+item.tbl_id+"' href='#'><img  id='biz_img_"+item.tbl_id+"' src='"+item.thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
		"</div>"+
		"<div>"+
		"<p class='mb-0 ps-3 font-10 pt-1'>"+
		"<a class='biz_btn_edit_photo' href='admin_edit_photo.html?tbl_id="+item.tbl_id+"' data_type='"+ item.data_type+"'tbl_id='"+  item.tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
		"<a class='biz_btn_delete_photo' href='#' data_type='"+ item.data_type+"'tbl_id='"+  item.tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
		"</p>"+
		"<p class='mb-0 ps-3 font-12 pt-1'>"+
		item.note+
		"</p>"+
		"</div>"+
		"<div class='divider mb-3'></div></div>";
	return str;
}
//9_service_photo_list
function set_admin_page_service_photo_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service Photo');
	$('#biz_page_data_type').val(data.service.data_type);
	$('#biz_page_tbl_id').val(data.service.tbl_id);
	for(a=0;a<data.service.photos.length;a++){
		$('#biz_service_photo_list').append(set_photo_list_str(data.service.photos[a]));
	}
	$("#biz_btn_add_photo").click(function() {
		parent_tbl_id=$('#biz_page_tbl_id').val();
		data_type=G_DT_PHOTO;
		visible='true';
		order=data.service.photos.length+1;
		tbl_id=0;
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id,order:order}, function(data){
				$('#biz_service_photo_list').append(set_photo_list_str(data));
			});
		});
	});
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_product_photo_list
function set_admin_page_product_photo_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product Photo');
	$('#biz_page_data_type').val(data.product.data_type);
	$('#biz_page_tbl_id').val(data.product.tbl_id);
	for(a=0;a<data.product.photos.length;a++){
		$('#biz_product_photo_list').append(set_photo_list_str(data.product.photos[a]));
	}
	$("#biz_btn_add_photo").click(function() {
		parent_tbl_id=$('#biz_page_tbl_id').val();
		data_type=G_DT_PHOTO;
		visible='true';
		order=data.product.photos.length+1;
		tbl_id=0;
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id,order:order}, function(data){
				$('#biz_product_photo_list').append(set_photo_list_str(data));
			});
		});
	});
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_list
function set_admin_page_blog_post_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Blog Post');
	var str='';
	for(a=0;a<data.blog_post_list.length;a++){
		if(!data.blog_post_list[a].category){
			data.blog_post_list[a].category='';
		}
		str=str+"<div id='biz_row_"+ data.blog_post_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.blog_post_list[a].data_type+"' tbl_id='"+data.blog_post_list[a].tbl_id+"' href='#'><img id='biz_img_"+ data.blog_post_list[a].tbl_id+"' src='"+data.blog_post_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_blog_post.html?title_url="+data.blog_post_list[a].title_url+"' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.blog_post_list[a].title+"</strong></p></a>"+
			"<p class='ps-3 line-height-s color-theme mb-1'>"+data.blog_post_list[a].category+"</p>"+
			"<p class='mb-0 ps-3 font-10 pt-1'>"+
			"<a href='blog_post_detail.html?title_url="+data.blog_post_list[a].title_url+"' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-eye round-huge'></i></a>"+
			"<a href='admin_edit_blog_post.html?title_url="+data.blog_post_list[a].title_url+"' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a href='admin_edit_blog_post_photo_list.html?title_url="+data.blog_post_list[a].title_url+"' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-camera round-huge'></i></a>"+
			"<a href='admin_edit_blog_post_media.html?title_url="+data.blog_post_list[a].title_url+"' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-file-audio round-huge'></i></a>"+
			" <a class='biz_btn_delete' href='#' data_type='"+ data.blog_post_list[a].data_type+"'tbl_id='"+ data.blog_post_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_blog_post_list').html(str);
	set_pull_down();
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename},function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
	$(".biz_btn_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_media 9_blog_post_media_edit
function set_admin_page_blog_post_media(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Blog Post Media');
	$('#biz_div_mp3').hide();
	$('#biz_page_tbl_id').val(data.blog_post.tbl_id);
	$('#biz_page_data_type').val(data.blog_post.data_type);
	$('#biz_tb_blog_post_mp3_title').val(data.blog_post.mp3_title);
	$('#biz_tb_blog_post_mp3_note').val(data.blog_post.mp3_note);
	$('#biz_blog_post_mp3filename').val(data.blog_post.mp3filename);
	$('#biz_blog_post_mp3duration').val(data.blog_post.mp3duration);
	$('#biz_blog_post_mp3_url').val(data.blog_post.mp3_url);
	if(data.blog_post.mp3filename){
		$('#biz_div_mp3').show();
		$('#biz_tb_blog_post_mp3_title').val(data.blog_post.mp3_title);
		$('#biz_tb_blog_post_mp3_note').val(data.blog_post.mp3_note);
		$('#biz_blog_post_mp3filename').val(data.blog_post.mp3filename);
		$('#biz_blog_post_mp3_url').val(data.blog_post.mp3_url);
		$('#biz_tb_blog_post_mp3duration').val(data.blog_post.mp3duration);
		set_mp3_player(data.blog_post.mp3_url);
	}
	$('#biz_tb_blog_post_youtube_link').val(data.blog_post.youtube_link);
	$('#biz_tb_blog_post_youtube_title').val(data.blog_post.youtube_title);
	$('#biz_tb_blog_post_youtube_note').val(data.blog_post.youtube_note);
	load_validate_fields();
	set_tabs();
	$("#biz_btn_blog_post_update").click(function() {
		blog_post_tbl_id= $('#biz_page_tbl_id').val();
		blog_post_data_type= $('#biz_page_data_type').val();
		mp3_title=$('#biz_tb_blog_post_mp3_title').val();
		mp3_note=$('#biz_tb_blog_post_mp3_note').val();
		mp3filename=$('#biz_blog_post_mp3filename').val();
		mp3duration=$('#biz_blog_post_mp3duration').val();
		mp3_url=$('#biz_blog_post_mp3_url').val();
		youtube_link=get_youtube_link($('#biz_tb_blog_post_youtube_link').val());
		youtube_title=$('#biz_tb_blog_post_youtube_title').val();
		youtube_note=$('#biz_tb_blog_post_youtube_note').val();
		post_crud_update_item(blog_post_data_type,blog_post_tbl_id,{
			mp3_title:mp3_title,
			mp3_note:mp3_note,
			mp3_url:mp3_url,
			mp3filename:mp3filename,
			mp3duration:mp3duration,
			youtube_link:youtube_link,
			youtube_title:youtube_title,
			youtube_note:youtube_note,
		}, function(data){
			show_toast_update();
		});
	});
	$("#biz_btn_add_audio").click(function() {
		file_mp3_select(function(data){
			$('#biz_blog_post_mp3filename').val(data.mp3filename);
			$('#biz_blog_post_mp3duration').val(data.mp3duration);
			$('#biz_blog_post_mp3_url').val(data.mp3_url);
			$('#biz_tb_blog_post_mp3duration').val(data.mp3duration);
			$('#biz_div_mp3').show();
			set_mp3_player(data.mp3_url);
		});
	});
}
//9_gallery_list
function set_admin_page_gallery_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Gallery');
	var str='';
	for(a=0;a<data.gallery_list.length;a++){
		if(!data.gallery_list[a].category){
			data.gallery_list[a].category='';
		}
		str=str+"<div  id='biz_row_"+data.gallery_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.gallery_list[a].data_type+"' tbl_id='"+data.gallery_list[a].tbl_id+"' href='#'><img id='biz_img_"+data.gallery_list[a].tbl_id+"' src='"+data.gallery_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_gallery.html?title_url="+data.gallery_list[a].title_url+"' data_type='"+ data.gallery_list[a].data_type+"'tbl_id='"+ data.gallery_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.gallery_list[a].title+"</strong></p></a>"+
			"<p class='ps-3 line-height-s color-theme mb-1'>"+data.gallery_list[a].category+"</p>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a href='admin_edit_gallery.html?title_url="+data.gallery_list[a].title_url+"' data_type='"+ data.gallery_list[a].data_type+"'tbl_id='"+ data.gallery_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+"<a href='admin_edit_gallery_photo_list.html?title_url="+data.gallery_list[a].title_url+"' data_type='"+ data.gallery_list[a].data_type+"'tbl_id='"+ data.gallery_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-camera round-huge'></i></a>"+"<a class='biz_btn_delete_photo' href='#' data_type='"+ data.gallery_list[a].data_type+"'tbl_id='"+ data.gallery_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_gallery_list').html(str);
	set_pull_down();
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename},function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_photo_list
function set_admin_page_blog_post_photo_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Blog Post Photo');
	$('#biz_page_tbl_id').val(data.blog_post.tbl_id);
	$('#biz_page_data_type').val(data.blog_post.data_type);
	for(a=0;a<data.blog_post.photos.length;a++){
		$('#biz_blog_post_photo_list').append(set_photo_list_str(data.blog_post.photos[a]));
	}
	set_pull_down();
	$("#biz_btn_add_blog_post_photo").click(function() {
		data_type = G_DT_PHOTO;
		tbl_id = '0';
		parent_tbl_id=$('#biz_page_tbl_id').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id},function(data){
				$('#biz_blog_post_photo_list').append(set_photo_list_str(data));
			});
		});
	});
	$(".biz_btn_edit_photo").click(function() {
		data_type = G_DT_PHOTO;
		tbl_id = $(this).attr('tbl_id');
		parent_tbl_id=$('#biz_page_tbl_id').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id},function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_gallery_photo_list
function set_admin_page_gallery_photo_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Gallery Photo');
	$('#biz_page_tbl_id').val(data.gallery.tbl_id);
	$('#biz_page_data_type').val(data.gallery.data_type);
	for(a=0;a<data.gallery.photos.length;a++){
		$('#biz_gallery_photo_list').append(set_photo_list_str(data.gallery.photos[a]));
	}
	set_pull_down();
	$("#biz_btn_add_gallery_photo").click(function() {
		data_type = G_DT_PHOTO;
		tbl_id = '0';
		parent_tbl_id=$('#biz_page_tbl_id').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id},function(data){
				$('#biz_gallery_photo_list').append(set_photo_list_str(data));
			});
		});
	});
	$(".biz_btn_edit_photo").click(function() {
		data_type = G_DT_PHOTO;
		tbl_id = $(this).attr('tbl_id');
		parent_tbl_id=$('#biz_page_tbl_id').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename,parent_tbl_id:parent_tbl_id},function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_blog_post_detail 9_blog_post_edit
function set_admin_page_blog_post(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Blog Post');
	$('#biz_page_tbl_id').val(data.blog_post.tbl_id);
	$('#biz_page_data_type').val(data.blog_post.data_type);
	$('#biz_tb_blog_post_title').val(data.blog_post.title);
	$('#biz_tb_blog_post_author').val(data.blog_post.author);
	$('#biz_tb_blog_post_sub_note').val(data.blog_post.sub_note);
	//$('#biz_tb_blog_post_category').val(data.blog_post.category);
    if(!data.blog_post.visible){
        data.blog_post.visible='true';
    }
    set_blog_post_category_list(data.blog_post_category_list);
	function set_blog_post_category_list(category_list){
		var str='';
		str="<select id='biz_sel_category_title_list'><option value='Category' disabled>Category</option>";
		for(a=0;a<category_list.length;a++){
			str=str+ "<option value='"+category_list[a].title+"' selected>"+category_list[a].title+"</option>";
		}
		str=str+"</select>";
		$('#biz_div_blog_post_category_list').html(str);
		$('#biz_sel_category_title_list').val(data.blog_post.category);
	}
	$('#biz_sel_blog_post_visible').val(data.blog_post.visible);
	init_item_note(data.blog_post.note);
	$("#biz_btn_blog_post_update").click(function() {
		blog_post_tbl_id= $('#biz_page_tbl_id').val();
		blog_post_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_blog_post_title').val();
		category=$('#biz_sel_category_title_list').val();
		author=$('#biz_tb_blog_post_author').val();
		sub_note=$('#biz_tb_blog_post_sub_note').val();
		visible=$('#biz_sel_blog_post_visible').val();
		title_url=get_title_url(title);
		post_crud_update_item(blog_post_data_type,blog_post_tbl_id,{
			title:title,
			title_url:title_url,
			category:category,
			sub_note:sub_note,
			author:author,
			visible:visible,
			note:get_item_note()
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
	});
	set_tabs();
}
//9_gallery_detail 9_gallery_edit
function set_admin_page_gallery(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Edit Gallery');
	$('#biz_page_tbl_id').val(data.gallery.tbl_id);
	$('#biz_page_data_type').val(data.gallery.data_type);
	$('#biz_tb_gallery_title').val(data.gallery.title);
	$('#biz_tb_gallery_sub_note').val(data.gallery.sub_note);
    set_gallery_category_list(data.gallery_category_list);
	function set_gallery_category_list(category_list){
		var str='';
		str="<select id='biz_sel_category_title_list'><option value='Category' disabled>Category</option>";
		for(a=0;a<category_list.length;a++){
			str=str+ "<option value='"+category_list[a].title+"' selected>"+category_list[a].title+"</option>";
		}
		str=str+"</select>";
		$('#biz_div_gallery_category_list').html(str);
		$('#biz_sel_category_title_list').val(data.gallery.category);
	}
    if(!data.gallery.visible){
        data.gallery.visible='true';
    }
	$('#biz_sel_gallery_visible').val(data.gallery.visible);
	$("#biz_btn_gallery_update").click(function() {
		gallery_tbl_id= $('#biz_page_tbl_id').val();
		gallery_data_type= $('#biz_page_data_type').val();
		title=$('#biz_tb_gallery_title').val();
		category=$('#biz_sel_category_title_list').val();
		sub_note=$('#biz_tb_gallery_sub_note').val();
		visible=$('#biz_sel_gallery_visible').val();
		title_url=get_title_url(title);
		post_crud_update_item(gallery_data_type,gallery_tbl_id,{
			title:title,
			title_url:title_url,
			category:category,
			sub_note:sub_note,
			visible:visible,
		}, function(data){
			$('#biz_page_tbl_id').val(data.tbl_id);
			show_toast_update();
		});
	});
}
//9_service_list
function set_admin_page_service_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Service');
	var str='';
	for(a=0;a<data.service_list.length;a++){
		if(!data.service_list[a].category){
			data.service_list[a].category='';
		}

		str=str+"<div id='biz_row_"+data.service_list[a].tbl_id+"'  class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.service_list[a].data_type+"' tbl_id='"+data.service_list[a].tbl_id+"' href='#'><img  id='biz_img_"+data.service_list[a].tbl_id+"'  src='"+data.service_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_service.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.service_list[a].title+"</strong></p></a>"+
          "<p class='ps-3 mb-2 font-11 line-height-xs'>"+data.service_list[a].sub_note+"</p>"+
			"<p class='ps-3 line-height-s color-theme mb-1'>"+data.service_list[a].category+"</p></a>"+
 "<span class='color-green-dark font-10 mt-n2 d-block ps-3'><del>"+get_money(data.service_list[a].old_price)+"</del> - " + data.service_list[a].in_stock+ "</span>"+
 "<h5 class=' ps-3 font-700 pt-1 no-click'>"+get_money(data.service_list[a].price)+"</h5>"+






			"<p class='mb-0 ps-3 font-10 pt-1'>"+

			"<a href='service_detail.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-eye round-huge'></i></a>"+

			"<a href='admin_edit_service.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+

			"<a href='admin_edit_service_photo_list.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-camera round-huge'></i></a>"+
			"<a href='admin_edit_service_sub.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-info-circle round-huge'></i></a>"+
			"<a href='admin_edit_service_media.html?title_url="+data.service_list[a].title_url+"' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-file-audio round-huge'></i></a>"+
			"<a class='biz_btn_delete' href='#' data_type='"+ data.service_list[a].data_type+"'tbl_id='"+ data.service_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_service_list').html(str);
	set_pull_down();
	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_product_list
function set_admin_page_product_list(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Product');
	var str='';
	for(a=0;a<data.product_list.length;a++){
		if(!data.product_list[a].category){
			data.product_list[a].category='';
		}
		str=str+"<div id='biz_row_"+ data.product_list[a].tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+data.product_list[a].data_type+"' tbl_id='"+data.product_list[a].tbl_id+"' href='#'><img id='biz_img_"+ data.product_list[a].tbl_id+"' src='"+data.product_list[a].thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<a href='admin_edit_product.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.product_list[a].title+"</strong></p>"+
            "<p class='ps-3 mb-2 font-11 line-height-xs'>"+data.product_list[a].sub_note+"</p>"+
			"<p class='ps-3 line-height-s color-theme mb-1'>"+data.product_list[a].category+"</p></a>"+
 "<span class='color-green-dark font-10 mt-n2 d-block ps-3'><del>"+get_money(data.product_list[a].old_price)+"</del> - " + data.product_list[a].in_stock+ "</span>"+
 "<h5 class=' ps-3 font-700 pt-1 no-click'>"+get_money(data.product_list[a].price)+"</h5>"+


			"<p class='mb-0 ps-3 font-10 pt-1'>"+
			"<a href='product_detail.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-eye round-huge'></i></a>"+
			"<a href='admin_edit_product.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-pencil-alt round-huge'></i></a>"+
			"<a href='admin_edit_product_photo_list.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-camera round-huge'></i></a>"+
			"<a href='admin_edit_product_sub.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-info-circle round-huge'></i></a>"+
			"<a href='admin_edit_product_media.html?title_url="+data.product_list[a].title_url+"' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-file-audio round-huge'></i></a>"+
			" <a class='biz_btn_delete' href='#' data_type='"+ data.product_list[a].data_type+"'tbl_id='"+ data.product_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}
	$('#biz_product_list').html(str);
	set_pull_down();

	$(".biz_btn_edit_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
	$(".biz_btn_delete").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
}
//9_comment_list
function set_admin_page_comment(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Comment');
	$('#biz_page_tbl_id').val(data.comment.tbl_id);
	$('#biz_page_data_type').val(data.comment.data_type);
	$('#biz_tb_comment_header').val(data.comment.header);
	$('#biz_tb_comment_sub_note').val(data.comment.sub_note);
    if(!data.comment.visible){
        data.comment.visible='true';
    }
    if(!data.comment.button_color){
        data.comment.button_color='bg-yellow-dark';
    }
	$('#biz_sel_comment_visible').val(data.comment.visible);
	$('#biz_sel_comment_button_color').val(data.comment.button_color);
	set_tabs();
	str='';
	for(a=0;a<data.comment_list.length;a++){
		str=str+"<div id='biz_row_"+data.comment_list[a].tbl_id+"'  class='d-flex mb-3'>"+
			"<div>"+
			"</div>"+
			"<div>"+
			"<a href='#'><p class='ps-3 line-height-s color-theme mb-1'>"+data.comment_list[a].comment+"</p></a>"+
			"<p class='ps-3 line-height-s color-theme mb-1'><strong>"+data.comment_list[a].name+"</strong>-"+data.comment_list[a].location+"</p>"+
			"<p class='mb-0 ps-3 font-10 pt-1'>"+
			"<a class='biz_btn_delete_comment' href='#' data_type='"+ data.comment_list[a].data_type+"'tbl_id='"+ data.comment_list[a].tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash round-huge'></i></a>"+
			"</p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
	}

	$('#biz_comment_list').html(str);
	set_pull_down();
	$(".biz_btn_delete_comment").click(function() {
		data_type = $(this).attr('data_type');
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
	$("#biz_btn_comment_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		header= $('#biz_tb_comment_header').val();
		sub_note= $('#biz_tb_comment_sub_note').val();
		visible= $('#biz_sel_comment_visible').val();
		button_color= $('#biz_sel_comment_button_color').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				title:G_ITEM_MAP_COMMENT,
				title_url:G_ITEM_MAP_COMMENT.toLowerCase(),
				header:header,
				sub_note:sub_note,
				visible:visible,
				button_color:button_color,
			}, function(data){
				show_toast_update();
				$('#biz_page_tbl_id').val(data.tbl_id);
			});
	});
}
//9_photo
function set_admin_page_photo(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Photo Edit');
	$('#biz_page_tbl_id').val(data.item.tbl_id);
	$('#biz_page_data_type').val(data.item.data_type);
	$('#biz_tb_note').val(data.item.note);

	$("#biz_btn_photo_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		note= $('#biz_tb_note').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				note:note,
			}, function(data){
				show_toast_update();
				$('#biz_page_tbl_id').val(data.tbl_id);
			});
	});
}


//9_home 9_welcome
function set_admin_page_welcome(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Welcome');
	$('#biz_page_tbl_id').val(data.welcome.tbl_id);
	$('#biz_page_data_type').val(data.welcome.data_type);
	$('#biz_page_photofilename').val(data.welcome.photofilename);
	$('#biz_sel_welcome_type').val(data.welcome.welcome_type);
	$('#biz_tb_editor_header').val(data.welcome.editor_header);
	$('#biz_tb_youtube_link').val(data.welcome.youtube_link);
	$('#biz_tb_youtube_title').val(data.welcome.youtube_title);
	$('#biz_tb_youtube_note').val(data.welcome.youtube_note);
	$('#biz_tb_gallery_title').val(data.welcome.gallery_title);
	$('#biz_tb_gallery_sub_note').val(data.welcome.gallery_sub_note);
	set_gallery_list(data.gallery_list);
	$('#biz_sel_gallery_title_list').val(data.welcome.gallery_type);

	$('#biz_tb_image_title').val(data.welcome.image_title);
	$('#biz_tb_image_sub_note').val(data.welcome.image_sub_note);
	$('#biz_image_img').hide();

	if(data.welcome.photofilename){
		$('#biz_image_img').show();
		$('#biz_image_img').attr('src',data.welcome.thumb_photo_url);
	}
	init_item_note(data.welcome.editor_note);
	set_welcome_type(data.welcome.welcome_type);
	function set_gallery_list(gallery_list){
		str="<select id='biz_sel_gallery_title_list'><option value='Gallery Type' disabled>Gallery Type</option>";
		for(a=0;a<gallery_list.length;a++){
			str=str+ "<option value='"+gallery_list[a].title_url+"' selected>"+gallery_list[a].title+"</option>";
		}
		str=str+"</select>";
		$('#biz_gallery_title_list').html(str);
	}
	function set_welcome_type(type){
		$('.biz_card').hide();
		switch(type){
			case 'youtube':
				$('#biz_div_card_youtube').show();
				break;
			case 'editor':
				$('#biz_div_card_editor').show();
				break;
			case 'image':
				$('#biz_div_card_image').show();
				break;
			case 'gallery':
				$('#biz_div_card_gallery').show();
				break;
		}
	}
	$("#biz_btn_setting_update").click(function() {
		page_tbl_id=$('#biz_page_tbl_id').val();
		page_data_type=$('#biz_page_data_type').val();
		type=$('#biz_sel_welcome_type').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				title:G_ITEM_MAP_WELCOME,
				title_url:G_ITEM_MAP_WELCOME.toLowerCase(),
				welcome_type:type,
			}, function(data){
				show_toast_update();
				$('#biz_page_tbl_id').val(data.tbl_id);
			});
	});
	$('#biz_sel_welcome_type').change(function() {
		set_welcome_type($('#biz_sel_welcome_type').val());
	});
	$("#biz_btn_editor_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		editor_header=$('#biz_tb_editor_header').val();
		editor_note=get_item_note();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				editor_note:editor_note,
				editor_header:editor_header,
			}, function(data){
				show_toast_update();
			});
	});
	$("#biz_btn_youtube_update").click(function() {
		page_tbl_id=$('#biz_page_tbl_id').val();
		page_data_type=$('#biz_page_data_type').val();
		youtube_link=get_youtube_link($('#biz_tb_youtube_link').val());
		youtube_title=$('#biz_tb_youtube_title').val();
		youtube_note=$('#biz_tb_youtube_note').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				youtube_link:youtube_link,
				youtube_title:youtube_title,
				youtube_note:youtube_note,
			}, function(data){
				show_toast_update();
			});
	});
	$("#biz_btn_image_update").click(function() {
		page_tbl_id=$('#biz_page_tbl_id').val();
		page_data_type=$('#biz_page_data_type').val();
		image_title=$('#biz_tb_image_title').val();
		image_sub_note=$('#biz_tb_image_sub_note').val();
		photofilename=$('#biz_page_photofilename').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				image_title:image_title,
				image_sub_note:image_sub_note,
				photofilename:photofilename,
			}, function(data){
				show_toast_update();
			});
	});
	$("#biz_btn_gallery_update").click(function() {
		page_tbl_id=$('#biz_page_tbl_id').val();
		page_data_type=$('#biz_page_data_type').val();
		gallery_title=$('#biz_tb_gallery_title').val();
		gallery_type=$('#biz_sel_gallery_title_list').val();
		gallery_sub_note=$('#biz_tb_gallery_sub_note').val();
		post_crud_update_item(page_data_type,page_tbl_id,
			{
				gallery_title:gallery_title,
				gallery_type:gallery_type,
				gallery_sub_note:gallery_sub_note,
			}, function(data){
				$('#biz_page_tbl_id').val(data.tbl_id);
				show_toast_update();
			});
	});
	$("#biz_btn_image_img").click(function() {
		tbl_id = $('#biz_page_tbl_id').val();
		data_type = $('#biz_page_data_type').val();
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_image_img').show();
				$('#biz_page_photofilename').val(data.photofilename);
				$('#biz_image_img').attr('src',data.thumb_photo_url);
			});
		});
	});
}
function set_admin_page_home(data){
	$('#biz_primary_app_title').html('Dashboard');
}
//9_slideshow
function set_admin_page_slideshow(data){
	$('#footer-bar').hide();
	$('#biz_primary_app_title').html('Dashboard');
	$('#biz_page_sub_title').html('Slide Show');
	$('#biz_page_tbl_id').val(data.slideshow.tbl_id);
	$('#biz_page_data_type').val(data.slideshow.data_type);
    if(!data.slideshow.slideshow_visible){
        data.slideshow.slideshow_visible='true';
    }
    if(!data.slideshow.slideshow_button_visible){
        data.slideshow.slideshow_button_visible='false';
    }
    if(!data.slideshow.slideshow_button_color){
        data.slideshow.slideshow_button_color='bg-red-dark';
    }
    if(!data.slideshow.slideshow_button_link){
        data.slideshow.slideshow_button_link='product_category_list';
    }
	$('#biz_sel_slideshow_visible').val(data.slideshow.slideshow_visible);
	$('#biz_sel_slideshow_button_visible').val(data.slideshow.slideshow_button_visible);
	$('#biz_tb_slideshow_button_text').val(data.slideshow.slideshow_button_text);
	$('#biz_sel_slideshow_button_color').val(data.slideshow.slideshow_button_color);
	$('#biz_sel_slideshow_button_link').val(data.slideshow.slideshow_button_link);
	load_validate_fields();
	var str='';
	for(a=0;a<data.slideshow.photos.length;a++){
		$('#biz_slideshow_list').append(set_slideshow_str(data.slideshow.photos[a]));
	}
	function set_slideshow_str(item){
		str="<div id='biz_row_"+item.tbl_id+"' class='d-flex mb-3'>"+
			"<div>"+
			"<a class='biz_btn_edit_photo' data_type='"+item.data_type+"' tbl_id='"+item.tbl_id+"' href='#'><img id='biz_img_"+item.tbl_id+"' src='"+item.thumb_photo_url+"' width='70' class='rounded-sm'></a>"+
			"</div>"+
			"<div>"+
			"<p class='mb-0 ps-3 font-10 pt-1'><a class='biz_btn_delete_photo' href='#'  data_type='"+ item.data_type+"'tbl_id='"+ item.tbl_id+"'><i class='admin_edit_img rounded-xl font-24 fa fa-trash-alt round-huge'></i></a></p>"+
			"</div>"+
			"<div class='divider mb-3'></div></div>";
		return str;
	}
	$("#biz_btn_add_photo").click(function() {
		parent_tbl_id=$('#biz_page_tbl_id').val();
		item_map_tbl_id=parent_tbl_id;
		data_type=G_DT_PHOTO;
		tbl_id=0;
		order= data.slideshow.photos.length+1;
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{item_map_tbl_id:item_map_tbl_id,photofilename:data.photofilename,parent_tbl_id:parent_tbl_id,order:order}, function(data){
				$('#biz_slideshow_list').append(set_slideshow_str(data));
			});
		});
	});
	$(".biz_btn_edit_photo").click(function() {
		data_type=G_DT_PHOTO;
		tbl_id = $(this).attr('tbl_id');
		camera_photo_select(function(data){
			post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename}, function(data){
				$('#biz_img_'+tbl_id).attr('src',data.thumb_photo_url);
			});
		});
	});
	$(".biz_btn_delete_photo").click(function() {
		data_type=G_DT_PHOTO;
		tbl_id = $(this).attr('tbl_id');
		if (confirm("Are you sure?") == true) {
			post_crud_delete_item(data_type,tbl_id,function(data){
				$('#biz_row_'+tbl_id).remove();
			});
		}
	});
	$("#biz_btn_slideshow_update").click(function() {
		page_tbl_id= $('#biz_page_tbl_id').val();
		page_data_type= $('#biz_page_data_type').val();
		slideshow_visible=$('#biz_sel_slideshow_visible').val();
		slideshow_button_visible=$('#biz_sel_slideshow_button_visible').val();
		slideshow_button_text=$('#biz_tb_slideshow_button_text').val();
		slideshow_button_color=$('#biz_sel_slideshow_button_color').val();
		slideshow_button_link=$('#biz_sel_slideshow_button_link').val();
		post_crud_update_item(page_data_type,page_tbl_id,{
			slideshow_visible:slideshow_visible,
			slideshow_button_visible:slideshow_button_visible,
			slideshow_button_text:slideshow_button_text,
			slideshow_button_color:slideshow_button_color,
			slideshow_button_link:slideshow_button_link,
			title:G_ITEM_MAP_SLIDESHOW,
			title_url:G_ITEM_MAP_SLIDESHOW.toLowerCase(),

		}, function(data){
			show_toast_update();
			$('#biz_page_tbl_id').val(data.tbl_id);
		});
	});
	set_tabs();
}

