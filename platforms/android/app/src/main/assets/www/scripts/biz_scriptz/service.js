G_PAYMENT_TYPE_NOW='pay_now';
G_PAYMENT_TYPE_CASHAPP='cashapp';
G_PAYMENT_TYPE_ON_DELIVERY='pay_on_delivery';
//9_service_category_list
function set_page_service_category_list(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    set_service_btn_shopping_cart();
    var str='';
    /*
    color_row=0;
    for(var a=0;a<data.service_category_list.length;a++){
        data.service_category_list[a].title=data.service_category_list[a].title?(data.service_category_list[a].title):"";
        data.service_category_list[a].category=data.service_category_list[a].category?(data.service_category_list[a].category):"";
        data.service_category_list[a].sub_note=data.service_category_list[a].sub_note?(data.service_category_list[a].sub_note):"";
        str=str+
            "<a href='service_list.html?category="+data.service_category_list[a].title+"' class='card card-style' style='background-image:url("+data.service_category_list[a].mid_photo_url+")' data-card-height='200'>"+
            "<div class='card-top m-3'>"+
            "<span class='badge bg-"+color_list[color_row]+" px-2 py-1 text-uppercase'>"+data.service_category_list[a].category+"</span>"+
            "</div>"+
            "<div class='card-bottom mx-3 mb-4 pb-2'>"+
            "<h1 class='color-white mb-n2 font-700'>"+data.service_category_list[a].title+"</h1>"+
            "<p class='color-white mb-0 opacity-50 font-12'>"+data.service_category_list[a].sub_note+"</p>"+
            "</div>"+
            "<div class='card-overlay bg-black opacity-80'></div>"+
            "</a>";
        color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
    }
    */
    var color=0;
    str="<div class='row px-3'>"

    for(var a=0;a<data.service_category_list.length;a++){
    //
    if(a==0||a==1||a==2||a==5||a==6||a==7||a==11||a==12||a==13||a==16||a==17||a==18){
        var height="100";
    }
    if(a==3||a==4||a==9||a==10||a==14||a==15||a==20||a==21){
        var height="150";
    }
    if(a==8||a==19){
        var height="150";
    }
    //
    if(a==0||a==2||a==5||a==7|a==11||a==13||a==16||a==18){
        var col='col-4 pe-1';
    }
    if(a==1||a==6||a==12||a==17){
        var col='col-4 ps-1 pe-1';
    }
    if(a==3||a==4||a==9||a==10 ||a==14||a==15||a==20||a==21){
        var col='col-6 pe-1';
    }
    if(a==8||a==19){
        var col='col-12';
    }
    //
    if(a==0||a==11){
        card='card card-style mx-0 mb-2';
    }
    if(a==1||a==12){
        card='card card-style mx-0 mb-2';
    }
    if(a==2||a==13){
        card='card card-style mx-0 mb-2';
    }
    if(a==3||a==9||a==14){
        card='card card-style mx-0 mb-2';
    }
    if(a==4||a==10||a==15||a==21){
        card='card card-style mx-0 mb-2';
    }
    if(a==5||a==16){
        card='card card-style mx-0 mb-2';
    }
    if(a==6||a==17){
        card='card card-style mx-0 mb-2';
    }
    if(a==7||a==18){
        card='card card-style mx-0 mb-2';
    }
    if(a==8||a==19){
        card='card card-style mx-0 mb-2';
    }

    title=data.service_category_list[a].title?(data.service_category_list[a].title):"";
    str=str+"<div class='"+col+"'>"+
        "<a href='service_list.html?category="+title+"'>"+
        "<div class='"+card+"' data-card-height='"+height+"' style='background-image:url("+data.service_category_list[a].mid_photo_url+")'>"+
        "<div class='card-bottom pb-2'>"+
        "<h5 class='font-14 color-white text-center mb-0'>"+title+"</h5>"+
        "<div class='card-overlay bg-gradient'></div>"+
        "</a></div>"+
        "</div>";
    str=str+ "</div>";
    }

    $('#biz_service_category_list').html(str);
}
//9_service_list
function set_page_service_list(data){
    set_service_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    var str='';
    for(var a=0;a<data.service_list.length;a++){
        data.service_list[a]=set_service_item_info(data.service_list[a]);
        if(!data.service_list[a].price){
            data.service_list[a].price='TBD';
        }
        str=str+
            "<div class='d-flex mb-4'>"+
            "<a href='service_detail.html?title_url="+data.service_list[a].title_url+"'>"+
            "<img src='"+data.service_list[a].mid_photo_url+"' width='130'> <br>"+
            "</a>"+
            "<div class='w-100'>"+
            "<a href='#'>"+
            "<h5 class='font-15 ps-3'>"+data.service_list[a].title+"</h5>"+
            "<p class='ps-3 mb-2 font-11 line-height-xs'>"+data.service_list[a].sub_note+"</p>"+
            "<span class='color-green-dark font-10 mt-n2 d-block ps-3'><del>"+data.service_list[a].old_price+"</del></span>"+
            "</a>"+
            "<h5 class=' ps-3 font-700 pt-1 no-click'>"+data.service_list[a].price+"</h5>"+
            "<a href='service_detail.html?title_url="+data.service_list[a].title_url+"' class='icon icon-xxs float-end mt-n4'><i class='fa fa-shopping-cart color-blue-dark'></i></a>"+
            "</div>"+
            "</div>"+
            "<div class='divider'></div>";
    }
    $('#biz_service_list').html(str);
}
//9_service_detail
function set_page_service_detail(data){
    set_service_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('#biz_page_tbl_id').val(data.service.tbl_id);
    $('#biz_page_data_type').val(data.service.data_type);
    data.service=set_service_item_info(data.service);
    if(!data.service.price){
        data.service.price='TBD';
    }
    $("#biz_service_div_audio").hide();
    $("#biz_service_div_video").hide();
    $( "#biz_service_div_description").hide();
    $('#biz_service_div_additional_information').hide();
    $('#biz_service_div_store_links').hide();
    if(!data.service.price){
        data.service.price='TBD'
    }
    $('#biz_service_title').html(data.service.title);
    $('#biz_service_old_price').html(data.service.old_price);
    $('#biz_service_price').html(data.service.price);
    if(data.service.sub_note){
        if(data.service.sub_note.length>0){
            $('#biz_service_div_description').show();
            $('#biz_service_paragraph_description').html(data.service.sub_note);
        }
    }
    if(data.service.note){
        if(data.service.note.length>0){
            $('#biz_service_div_additional_information').show();
            $('#div_note').html(data.service.note);
        }
    }
    if(data.service.mp3filename){
        $('#biz_service_div_audio').show();
        $('#biz_service_audio_title').html(data.service.mp3_title);
        $('#biz_service_audio_note').html(data.service.mp3_note);
        $('#biz_service_audio_duration').html('Duration: '+ data.service.mp3duration);
        set_mp3_player(data.service.mp3_url);
    }else{
        $('#biz_service_div_audio').hide();
    }
    if(data.service.youtube_link){
        $('#biz_service_div_video').show();
        $('#biz_service_video_link').attr('src',data.service.youtube_link);
        $('#biz_service_video_title').html(data.service.mp3_title);
        $('#biz_service_video_note').html(data.service.mp3_note);
    }else{
        $('#biz_service_div_video').hide();
    }
    if(data.service.show_store_links=='true'){
        $('#biz_service_div_store_links').show();
    }
    var str='';
    str="<div class='splide single-slider slider-no-arrows slider-no-dots' id='single-slider-1'><div class='splide__track'><div class='splide__list'>";
    str=str+
        "<div class='splide__slide'>"+
        "<a class='col mb-4' data-gallery='gallery-1' href='"+data.service.album_photo_url+"' title=''>"+
        "<img src='"+data.service.mid_photo_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
        "</a>"+
        "</div>";
    for(a=0;a<data.service.photos.length;a++){
        if(!data.service.photos[a].note){
            data.service.photos[a].note='';
        }
        str=str+
            "<div class='splide__slide'>"+
            "<a class='col mb-4' data-gallery='gallery-1' href='"+data.service.photos[a].album_photo_url+"' title='"+ data.service.photos[a].note+"'>"+
            "<img src='"+data.service.photos[a].mid_photo_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
            "</a>"+
            "</div>";
    }
    str=str+ "</div></div></div>";
    $('#biz_service_photo_list').html(str);
    //sub service
    if(data.service.service_sub1_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.service.service_sub1_title+"</label><select id='biz_sel_sub1_service'><option value='"+data.service.service_sub1_title+"' disabled>"+data.service.service_sub1_title+"</option>";
        for(a=0;a<5;a++){
            if(data.service['sub1_option'+a+'_title']){
                sub1_title=data.service['sub1_option'+a+'_title'];
                sub1_price=data.service['sub1_option'+a+'_price'];
                if(!sub1_price||sub1_price==null){
                    sub1_price='';
                    if(a==0){
                        str=str+ "<option value='' selected>"+sub1_price+" - "+sub1_title+"</option>";
                    }else{
                        str=str+ "<option value=''>"+sub1_price+" - "+sub1_title+"</option>";
                    }
                }else{
                    if(a==0){
                        str=str+ "<option value='"+sub1_price+"' selected>"+get_money(sub1_price)+" - "+sub1_title+"</option>";
                    }else{
                        str=str+ "<option value='"+sub1_price+"'>"+get_money(sub1_price)+" - "+sub1_title+"</option>";
                    }
                }
            }
        }
        str=str+"</select>";
        str=str+"<span><i class='fa fa-chevron-down'></i></span>"+
            "<i class='fa fa-check disabled valid color-green-dark'></i>"+
            "<i class='fa fa-check disabled invalid color-red-dark'></i>"+
            "<em></em>";
        $('#biz_service_sub_service_title').val(data.sub_service_list_category);
        $('#biz_sub_service').html(str);
    }
    //sub2_service
    if(data.service.service_sub2_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.service.service_sub2_title+"</label><select id='biz_sel_sub2_service'><option value='"+data.service.service_sub2_title+"' disabled>"+data.service.service_sub2_title+"</option>";
        for(a=0;a<5;a++){
            if(data.service['sub2_option'+a+'_title']){
                sub2_title=data.service['sub2_option'+a+'_title'];
                sub2_price=data.service['sub2_option'+a+'_price'];
                if(!sub2_price||sub2_price==null){
                    sub2_price='';
                    if(a==0){
                        str=str+ "<option value='' selected>"+sub2_price+" - "+sub2_title+"</option>";
                    }else{
                        str=str+ "<option value=''>"+sub2_price+" - "+sub2_title+"</option>";
                    }
                }else{
                    if(a==0){
                        str=str+ "<option value='"+sub2_price+"' selected>"+get_money(sub2_price)+" - "+sub2_title+"</option>";
                    }else{
                        str=str+ "<option value='"+sub2_price+"'>"+get_money(sub2_price)+" - "+sub2_title+"</option>";
                    }
                }
            }
        }
        str=str+"</select>";
        str=str+"<span><i class='fa fa-chevron-down'></i></span>"+
            "<i class='fa fa-check disabled valid color-green-dark'></i>"+
            "<i class='fa fa-check disabled invalid color-red-dark'></i>"+
            "<em></em>";
        $('#biz_sub2_service').html(str);
    }
    if(data.service.service_shipping_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.service.service_shipping_title+"</label><select id='biz_sel_shipping_service'><option value='"+data.service.service_shipping_title+"' disabled>"+data.service.service_shipping_title+"</option>";
        for(a=0;a<5;a++){
            if(data.service['shipping_option'+a+'_title']){
                shipping_title=data.service['shipping_option'+a+'_title'];
                shipping_price=data.service['shipping_option'+a+'_price'];
                if(!shipping_price||shipping_price==null){
                    shipping_price='';
                    if(a==0){
                        str=str+ "<option value='' selected>"+shipping_price+" - "+shipping_title+"</option>";
                    }else{
                        str=str+ "<option value=''>"+shipping_price+" - "+shipping_title+"</option>";
                    }
                }else{
                    if(a==0){
                        str=str+ "<option value='"+shipping_price+"' selected>"+get_money(shipping_price)+" - "+shipping_title+"</option>";
                    }else{
                        str=str+ "<option value='"+shipping_price+"'>"+get_money(shipping_price)+" - "+shipping_title+"</option>";
                    }
                }
            }
        }
        str=str+"</select>";
        str=str+"<span><i class='fa fa-chevron-down'></i></span>"+
            "<i class='fa fa-check disabled valid color-green-dark'></i>"+
            "<i class='fa fa-check disabled invalid color-red-dark'></i>"+
            "<em></em>";
        $('#biz_shipping').html(str);
    }
    set_fields();
    //9_service_cart_add
    $("#biz_btn_service_purchase").click(function() {
        service_tbl_id= $('#biz_page_tbl_id').val();
        service_data_type= $('#biz_page_data_type').val();
        post_crud_get_item(service_data_type,service_tbl_id,function(data){
            service_cart_item={};
            service_cart_item.tbl_id=data.tbl_id;
            service_cart_item.title=data.title;
            service_cart_item.title_url=data.title_url;
            service_cart_item.price=data.price;
            service_cart_item.old_price=data.old_price;
            service_cart_item.photofilename=data.photofilename;
            service_cart_item.image_url=data.thumb_photo_url;
            service_cart_item.service_sub1_title='';
            service_cart_item.service_sub1_price='';
            if(data.service_sub1_title){
                service_cart_item.service_sub1_title = data.service_sub1_title +" " + $("#biz_sel_sub1_service option:selected").text();
                service_cart_item.service_sub1_price=$("#biz_sel_sub1_service option:selected").val().replace('$','');
            }
            service_cart_item.service_sub2_title='';
            service_cart_item.service_sub2_price='';
            if(data.service_sub2_title){
                service_cart_item.service_sub2_title = data.service_sub2_title +" " + $("#biz_sel_sub2_service option:selected").text();
                service_cart_item.service_sub2_price=$("#biz_sel_sub2_service option:selected").val().replace('$','');
            }
            service_cart_item.service_shipping_title='';
            service_cart_item.service_shipping_price='';
            if(data.service_shipping_title){
                service_cart_item.service_shipping_title = data.service_shipping_title +" " + $("#biz_sel_shipping_service option:selected").text();
                service_cart_item.service_shipping_price=$("#biz_sel_shipping_service option:selected").val().replace('$','');
            }
            set_service_cart_item(service_cart_item,1);
            $('#biz_btn_service_purchase').addClass("bg-click");
            $('#biz_btn_service_purchase').html("22Added to Cart!");
        });
    });
    load_plugins();
    var splide = document.getElementsByClassName('splide');
    if(splide.length){
        var singleSlider = document.querySelectorAll('.single-slider');
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
}
//9_service_checkout_success
function set_page_service_checkout_success(data){
    set_service_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    service_order_success = get_service_order();
    service_order_success.subtotal=service_order_success.subtotal?(service_order_success.subtotal):'TBD';
    $('#biz_lbl_checkout_sub_total').html(service_order_success.subtotal);
    $('#biz_lbl_checkout_discount').html(service_order_success.discount);
    $('#biz_lbl_checkout_shipping').html(service_order_success.shipping);
    $('#biz_lbl_checkout_grand_total').html(service_order_success.grand_total);
    $('#biz_lbl_checkout_date').html(service_order_success.service_date);
    $('#biz_lbl_checkout_time').html(service_order_success.service_time);
    $('#biz_lbl_checkout_email').html(service_order_success.email);
    $('#biz_lbl_checkout_payment_type').html(service_order_success.payment_type);
    $('#biz_lbl_checkout_first_name').html(service_order_success.shipping_first_name);
    $('#biz_lbl_checkout_last_name').html(service_order_success.shipping_last_name);
    $('#biz_lbl_checkout_company').html(service_order_success.shipping_company_name);
    $('#biz_lbl_checkout_country').html(service_order_success.shipping_country);
    $('#biz_lbl_checkout_city').html(service_order_success.shipping_city);
    $('#biz_lbl_checkout_state').html(service_order_success.shipping_state);
    $('#biz_lbl_checkout_address').html(service_order_success.shipping_address);
    $('#biz_lbl_checkout_zip').html(service_order_success.shipping_zip);
    var service_cart_list = get_service_cart_list();
    str='';
    for(a=0;a<service_cart_list.length;a++){
        service_cart_list[a]=set_service_item_info(service_cart_list[a]);
        if(!service_cart_list[a].price){
            service_cart_list[a].price='TBD';
        }
        if(!service_cart_list[a].service_sub1_title){
            service_cart_list[a].service_sub1_title='';
        }
        if(!service_cart_list[a].service_sub2_title){
            service_cart_list[a].service_sub2_title='';
        }
        if(!service_cart_list[a].shipping_title){
            service_cart_list[a].shipping_title='';
        }
        str=str+"<div class='d-flex mb-4'>"+
            "<div>"+
            "<img src='"+service_cart_list[a].image_url+"' width='90'> <br>"+
            "</div>"+
            "<div class='w-100'>"+
            "<h5 class='font-14 ps-3'>"+service_cart_list[a].title+"</h5>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>Quanity x"+service_cart_list[a].quantity+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub1_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub2_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].shipping_title+"</p>"+
            "</div>"+
            "<div class='ms-auto text-end'>"+
            "<h5 class='ps-3 font-14'>" +service_cart_list[a].price+"</h5>"+
            "<div class='clearfix'></div>"+
            "</div>"+
            "<div class='divider mb-3 mt-n2'></div>"+
            "</div>";
    }
    $('#biz_div_service_list').html(str);
    clear_service_cart_list();
}
function test_bind_customer_service_check_out(){
    $('#biz_tb_checkout_email').val(get_id('email')+'@mail.com');
    $('#biz_tb_checkout_credit_card').val("4242424242424242");
    $('#biz_sel_checkout_exp_month').val('1');
    $('#biz_sel_checkout_exp_year').val('2030');
    $('#biz_tb_pay_checkout_cvc').val('543');
    $('#biz_tb_pay_checkout_zip').val(get_id());
    $('#biz_tb_shipping_checkout_first_name').val('Nicole');
    $('#biz_tb_shipping_checkout_last_name').val('Robinson');
    $('#biz_tb_shipping_checkout_company_name').val('Top ServiceZ');
    $('#biz_tb_shipping_checkout_city').val('Los Angeles');
    $('#biz_sel_shipping_checkout_state').val('CA');
    $('#biz_tb_shipping_checkout_address').val('456 Love St');
    $('#biz_tb_shipping_checkout_zip').val('30000');
}
//9_service_checkout
function set_page_service_checkout(data){
    $('#biz_page_billing_stripe_publish_key').val(data.primary.billing_stripe_publish_key);
    $('#biz_page_billing_stripe_secret_key').val(data.primary.billing_stripe_secret_key);
    $('#biz_page_app_title').val(data.primary.app_title);
    //test_bind_customer_service_check_out();
    //drop down list
    var str='';
    for(a=1;a<13;a++){
        str=str+"<option value='"+a+"'>"+a+"</option>";
    }
    $('#biz_sel_checkout_exp_month').html(str);
    var str='';
    for(a=2022;a<2092;a++){
        str=str+"<option value='"+a+"'>"+a+"</option>";
    }
    $('#biz_sel_checkout_exp_year').html(str);
    set_service_btn_shopping_cart();
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    var service_cart_list = get_service_cart_list();
    str='';
    for(a=0;a<service_cart_list.length;a++){
        if(!service_cart_list[a].price){
            service_cart_list[a].price='TBD';
        }else{
            service_cart_list[a].price=get_money(service_cart_list[a].price);
        }
        str=str+"<div class='d-flex mb-4'>"+
            "<div>"+
            "<img src='"+service_cart_list[a].image_url+"' width='90'> <br>"+
            "</div>"+
            "<div class='w-100'>"+
            "<h5 class='font-14 ps-3'>"+service_cart_list[a].title+"</h5>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>Quanity x"+service_cart_list[a].quantity+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub1_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub2_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_shipping_title+"</p>"+
            "</div>"+
            "<div class='ms-auto text-end'>"+
            "<h5 class='ps-3 font-14'>" +service_cart_list[a].price+"</h5>"+
            "<div class='clearfix'></div>"+
            "</div>"+
            "<div class='divider mb-3 mt-n2'></div>"+
            "</div>";
    }
    $('#biz_div_service_list').html(str);
    set_service_checkout_total();
    $('.div_payment_checkout').hide();
    var str='';
    str="<label for='form5' class='color-highlight color-blue-dark font-11 font-700' style='margin-left:20px'>Payment Type</label><select id='biz_sel_checkout_payment_type'><option value='Payment Type' disabled selected>Payment Type</option>";
    if(data.primary.billing_stripe_visible=='true'){
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_NOW+"'>Pay Now</option>";
    }
    if(data.primary.billing_cashapp_visible=='true'){
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_CASHAPP+"'>Cash App</option>";
    }
    if(data.primary.billing_paydelivery_visible=='true'){
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_ON_DELIVERY+"'>Pay on Delivery</option>";
    }
    str=str+"</select>";
    str=str+"<span><i class='fa fa-chevron-down'></i></span>"+
        "<i class='fa fa-check disabled valid color-green-dark'></i>"+
        "<i class='fa fa-check disabled invalid color-red-dark'></i>"+
        "<em></em>";
    $('#biz_service_payment_type').html(str);
    load_validate_fields();
    set_fields();
    hide_checkout();
    function hide_checkout(){
        $("#biz_div_checkout_payment_now").hide();
        $("#biz_div_checkout_payment_cashapp").hide();
        $("#biz_div_checkout_payment_address").hide();
        $("#biz_div_checkout_payment_creditcard").hide();
        $("#biz_btn_checkout_submit").hide();
    }
    $("#biz_sel_checkout_payment_type").change(function() {
        payment_type=$("#biz_sel_checkout_payment_type option:selected").val();
        hide_checkout();
        if(payment_type==G_PAYMENT_TYPE_NOW){
            $("#biz_div_checkout_payment_creditcard").show();
            $("#biz_div_checkout_payment_address").show();
            $("#biz_btn_checkout_submit").show();
        }else if(payment_type==G_PAYMENT_TYPE_CASHAPP){
            $("#biz_div_checkout_payment_cashapp").show();
            $("#biz_div_checkout_payment_address").show();
            $("#biz_service_payment_cashapp").html(data.primary.billing_cashapp_handler);
            $("#biz_btn_checkout_submit").show();
        }else if(payment_type==G_PAYMENT_TYPE_ON_DELIVERY){
            $("#biz_div_checkout_payment_address").show();
            $("#biz_btn_checkout_submit").show();
        }
    });
    $("#biz_btn_service_checkout").click(function() {
        window.location.reload();
    });
    $("#biz_btn_checkout_submit").click(function() {
        run_payment=true;
        var service_order={};
        service_order.app_title=$("#biz_page_app_title").val();
        service_order.billing_stripe_publish_key=$("#biz_page_billing_stripe_publish_key").val();
        service_order.billing_stripe_secret_key=$("#biz_page_billing_stripe_secret_key").val();
        service_order.email=$("#biz_tb_checkout_email").val();
        service_order.payment_type=$("#biz_sel_checkout_payment_type option:selected").val();
        service_order.subtotal=$("#biz_lbl_checkout_sub_total").html();
        service_order.shipping=$("#biz_lbl_checkout_shipping").html();
        service_order.discount=$("#biz_lbl_checkout_discount").html();
        service_order.grand_total=$("#biz_lbl_checkout_grand_total").html();
        date = new Date($("#biz_tb_checkout_date").val()+" "+$("#biz_tb_checkout_time").val());
        service_order.service_date = String(date.toLocaleString('default', { month: 'long' }));
        service_order.service_time = String(date.toLocaleTimeString('en-US'));
        service_order.shipping_first_name=$("#biz_tb_shipping_checkout_first_name").val();
        service_order.shipping_last_name=$("#biz_tb_shipping_checkout_last_name").val();
        service_order.shipping_company_name=$("#biz_tb_shipping_checkout_company_name").val();
        service_order.shipping_country=$("#biz_sel_shipping_checkout_country").val();
        service_order.shipping_city=$("#biz_tb_shipping_checkout_city").val();
        service_order.shipping_state=$("#biz_sel_shipping_checkout_state").val();
        service_order.shipping_address=$("#biz_tb_shipping_checkout_address").val();
        service_order.shipping_zip=$("#biz_tb_shipping_checkout_zip").val();
        error_message='';

        if(!service_order.service_date||!service_order.service_time){
            alert('Please enter a valid date and time');
        }else if(!service_order.shipping_first_name){
            error_message='Please enter a valid shipping first name';
        }else if(!service_order.shipping_last_name){
            error_message='Please enter a valid shipping last name';
        }else if(!service_order.shipping_company_name){
            error_message='Please enter a valid shipping company name';
        }else if(!service_order.shipping_country){
            error_message='Please enter a valid shipping country';
        }else if(!service_order.shipping_city){
            error_message='Please enter a valid shipping city';
        }else if(!service_order.shipping_address){
            error_message='Please enter a valid shipping address';
        }else if(!service_order.shipping_zip){
            error_message='Please enter a valid shipping zip code';
        }

        if(error_message){
            alert(error_message);
        }else if(!validate_email(service_order.email)){
            alert('Please enter a valid email');
            run_payment=false;
        }else if(service_order.payment_type==G_PAYMENT_TYPE_NOW){
            run_credit_card_payment(function(data,error){
                if(!error){
                    user=get_user();
                    service_order.user_shopping_cart_id=user.user_shopping_cart_id;
                    service_order.token_id=data;
                    send_service_checkout(service_order);
                }else{
                    alert(error);
                }
            });
        }else if(service_order.payment_type==G_PAYMENT_TYPE_CASHAPP|| service_order.payment_type==G_PAYMENT_TYPE_ON_DELIVERY){
            user=get_user();
            service_order.user_shopping_cart_id=user.user_shopping_cart_id;
            send_service_checkout(service_order);
        }
    });
    function send_service_checkout(service_order){
        url='shop/send_service_checkout';
        post_cloud_data(url,{
            email:service_order.email,
            payment_type:service_order.payment_type,
            subtotal:service_order.subtotal,
            discount:service_order.discount,
            grand_total:service_order.grand_total,
            card_credit_card:service_order.card_credit_card,
            card_exp_month:service_order.card_exp_month,
            card_exp_year:service_order.card_exp_year,
            card_cvc:service_order.card_cvc,
            card_country:service_order.card_country,
            card_zip:service_order.card_zip,
            shipping_first_name:service_order.shipping_first_name,
            shipping_last_name:service_order.shipping_last_name,
            shipping_company_name:service_order.shipping_company_name,
            shipping_country:service_order.shipping_country,
            shipping_city:service_order.shipping_city,
            shipping_state:service_order.shipping_state,
            shipping_address:service_order.shipping_address,
            user_shopping_cart_id:service_order.user_shopping_cart_id,
            stripe_token_id:service_order.token_id,
            app_title:service_order.app_title,
            service_date:service_order.service_date,
            service_time:service_order.service_time
        }, function(data){
            set_service_order(service_order);
            location="service_checkout_success.html";
        })
    }
    function validate_shipping(service_order){
        error_message='';
        callback(service_order,error_message);
    }
    function run_credit_card_payment(callback){
        error_message=null;
        service_order={};
        service_order.billing_stripe_publish_key=$("#biz_page_billing_stripe_publish_key").val();
        service_order.billing_stripe_secret_key=$("#biz_page_billing_stripe_secret_key").val();
        service_order.card_credit_card=$("#biz_tb_checkout_credit_card").val();
        service_order.card_exp_month=$("#biz_sel_checkout_exp_month").val();
        service_order.card_exp_year=$("#biz_sel_checkout_exp_year").val();
        service_order.card_cvc=$("#biz_tb_pay_checkout_cvc").val();
        service_order.card_country=$("#biz_sel_pay_checkout_country").val();
        service_order.card_zip=$("#biz_tb_pay_checkout_zip").val();
        if(String(service_order.card_credit_card).length<5){
            error_message='Please enter a valid card #';
        }else if(!service_order.card_zip){
            error_message='Please enter a valid card zip code';
        }else if(service_order.card_cvc.length<2){
            error_message='Please enter a valid credit card cvc';
        }
        var card = {
            number: service_order.card_credit_card, // 16-digit credit card number
            expMonth:service_order.card_exp_month, // expiry month
            expYear:service_order.card_exp_year, // expiry year
            cvc:service_order.card_cvc, // CVC / CCV
        };
        function onSuccess(tokenId) {
            _token = JSON.stringify(tokenId)
            _token = JSON.parse(_token);
            callback(_token.id,error_message);
        }
        function onError(errorMessage) {
            callback(null,errorMessage);
        }
        if(!error_message){
            cordova.plugins.stripe.setPublishableKey(service_order.billing_stripe_publish_key);
            cordova.plugins.stripe.createCardToken(card, onSuccess, onError);
        }else{
            callback(null,error_message);
        }
    }
}
function set_user_shopping_cart(shopping_cart_list){
    if(shopping_cart_list.length==0){
        user=get_user();
        user.user_shopping_cart_id=get_id();
    }
}
//9_service_shopping_cart//9_service_cart_button
function set_service_btn_shopping_cart(){
    update_service_cart_total();
    $("#biz_btn_service_shopping_cart").click(function() {
        update_service_cart_total();
        service_cart_list = get_service_cart_list();
        var service_cart_total=0;
        str='';
        for(a=0;a<service_cart_list.length;a++){
            service_cart_list[a]=set_service_item_info(service_cart_list[a]);
            if(!service_cart_list[a].price){
                service_cart_list[a].price='TBD';
            }
            str =str+"<div class='d-flex mb-4' id='biz_service_cart_row_"+service_cart_list[a].count_row+"'>"+
                "<div>"+
                "<img src='"+service_cart_list[a].image_url+"' width='90'> <br>"+
                "</div>"+
                "<div class='w-100'>"+
                "<h5 class='font-14 ps-3'>"+service_cart_list[a].title+"</h5>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub1_title+"</p>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_sub2_title+"</p>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+service_cart_list[a].service_shipping_title+"</p>"+
                "<a href='#' class='ps-3 color-red-dark pt-2 d-block font-10 biz_btn_service_cart_remove' count_row='"+service_cart_list[a].count_row+"'>Remove</a>"+
                "</div>"+
                "<div class='ms-auto text-end'>"+
                "<h5 class='ps-3 font-14'>"+service_cart_list[a].price+"<br/><br/></h5>"+
                "<div class='stepper rounded-s switch-s me-n2 mt-n2'>"+
                "<a href='#' type='sub'  count_row='"+service_cart_list[a].count_row+"' class='stepper-sub biz_btn_service_cart_step'><i class='fa fa-minus color-theme opacity-40'></i></a>"+
                "<input type='number' min='1' max='99' value='"+service_cart_list[a].quantity+"' class='"+service_cart_list[a].count_row+"_biz_service_cart_quantity'>"+
                "<a href='#' type='add'  count_row='"+service_cart_list[a].count_row+"' class='stepper-add biz_btn_service_cart_step'><i class='fa fa-plus color-theme opacity-40'></i></a>"+
                "</div>"+
                "<div class='clearfix'></div>"+
                "</div>"+
                "</div>";
        }
        $('#biz_service_cart_list').html(str);
        $(".biz_btn_service_cart_remove").click(function() {
            count_row = $(this).attr('count_row');
            $('#biz_service_cart_row_'+count_row).remove();
            remove_service_cart_item(count_row);
            set_service_checkout_total();
            update_service_cart_total();
        });
        //9_service_update_quantity
        $(".biz_btn_service_cart_step").click(function() {
            count_row = $(this).attr('count_row');
            type = $(this).attr('type');
            quantity=parseInt($("."+count_row+"_biz_service_cart_quantity").val());
            if(type=='sub'){
                if(quantity>1){
                    quantity=quantity-1;
                }else{
                    $("."+count_row+"_biz_service_cart_quantity").val('1');
                }
            }else{
                quantity=quantity+1;
            }
            update_service_cart_item(count_row,quantity);
            set_service_checkout_total();
            update_service_cart_total();
        });
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
    });
}
//9_update_service_cart_total
function update_service_cart_total(){
    var service_cart_list = get_service_cart_list();
    var service_cart_total=0;
    var all_not_tbd=true;
    for(a=0;a<service_cart_list.length;a++){
        if(isNaN(service_cart_list[a].sub_service_price)|| !service_cart_list[a].sub_service_price){
            service_cart_list[a].sub_service_price=0;
        }
        if(isNaN(service_cart_list[a].sub2_service_price)|| !service_cart_list[a].sub2_service_price){
            service_cart_list[a].sub2_service_price=0;
        }
        if(isNaN(service_cart_list[a].price)||!service_cart_list[a].price){
            all_not_tbd=false;
        }
        service_cart_total=service_cart_total+parseInt(service_cart_list[a].quantity)*parseFloat(service_cart_list[a].price)+ parseFloat(service_cart_list[a].sub_service_price)+parseFloat(service_cart_list[a].sub2_service_price) ;
    }
    if(!all_not_tbd){
        $('#biz_service_cart_total').html('TBD');
        $('#biz_service_cart_total_lbl').html('Total');
    }else{
        $('#biz_service_cart_total').html(get_money(service_cart_total));
        $('#biz_service_cart_total_lbl').html('Total');
    }
    if(service_cart_list.length==0){
        $('#biz_btn_service_checkout').html('0 Shopping Cart Items');
        $('#biz_btn_service_checkout').attr('href','#');
        $('#biz_service_cart_total').html(get_money(0));
        $('#biz_service_cart_total_lbl').html('Total');
    }else{
        $('#biz_btn_service_checkout').html('Proceed to Checkout');
        $('#biz_btn_service_checkout').attr('href','service_checkout.html');
    }
}
function set_service_checkout_total(){
    var service_cart_list = get_service_cart_list();
    var service_cart_total=0;
    var service_subtotal_cost=0;
    var service_shipping_total=0;
    var all_not_tbd=true;
    for(a=0;a<service_cart_list.length;a++){
        if(isNaN(service_cart_list[a].service_sub1_price)|| !service_cart_list[a].service_sub1_price){
            service_cart_list[a].service_sub1_price=0;
        }
        if(isNaN(service_cart_list[a].service_sub2_price)|| !service_cart_list[a].service_sub2_price){
            service_cart_list[a].service_sub2_price=0;
        }
        if(!service_cart_list[a].service_shipping_price){
            service_cart_list[a].service_shipping_price=0;
        }
        if(isNaN(service_cart_list[a].price)||!service_cart_list[a].price){
            all_not_tbd=false;
        }
        service_subtotal_cost= service_subtotal_cost+parseFloat(service_cart_list[a].service_sub1_price)+parseFloat(service_cart_list[a].service_sub2_price)+parseFloat(service_cart_list[a].price);
        service_shipping_total= service_shipping_total+parseFloat(service_cart_list[a].service_shipping_price);
        service_subtotal_cost= parseInt(service_cart_list[a].quantity)*service_subtotal_cost;
        service_shipping_total= parseInt(service_cart_list[a].quantity)*service_shipping_total;
    }
    service_cart_total= service_cart_total+ service_subtotal_cost +service_shipping_total;
    if(all_not_tbd){
        $('#biz_lbl_checkout_sub_total').html(get_money(service_subtotal_cost));
        $('#biz_lbl_checkout_grand_total').html(get_money(service_cart_total));
        $('#biz_lbl_checkout_shipping').html(get_money(service_shipping_total));
    }else{
        $('#biz_lbl_checkout_sub_total').html('TBD');
        $('#biz_lbl_checkout_grand_total').html('TBD');
        $('#biz_lbl_checkout_shipping').html('TBD');
    }
}
//9_get_service_cart_list
function get_service_cart_list(){
    var service_cart_list=[];
    for(var a=0;a<19;a++){
        if(get_service_cart_item(a)){
            service_cart_list.push(get_service_cart_item(a));
        }
    }
    return service_cart_list;
}
function get_service_cart_list_tbl_ids(){
    service_cart_list=get_service_cart_list();
    tbl_ids='';
    for(a=0;a<service_cart_list.length;a++){
        tbl_ids=tbl_ids+service_cart_list[a].tbl_id+',';
    }
    return tbl_ids;
}
function clear_service_cart_list(){
    var service_cart_list=[];
    for(var a=0;a<19;a++){
        remove_service_cart_item(a);
    }
}
function remove_service_cart_item(service_cart_list_row){
    Lockr.rm("service_cart_item_"+service_cart_list_row);
}
function update_service_cart_item(service_cart_list_row,quantity){
    service_cart_item=get_service_cart_item(service_cart_list_row)
    service_cart_item.quantity=quantity;
    Lockr.set("service_cart_item_"+service_cart_list_row,service_cart_item);
}
function get_service_cart_item(service_cart_list_row){
    return Lockr.get("service_cart_item_"+service_cart_list_row);
}
//9_service_cart_item //9_service_cart_add
function set_service_cart_item(service_cart_item,quantity){
    service_cart_list = get_service_cart_list();
    var found=false;
    new_count_row=parseInt(service_cart_list.length)+1;
    user=get_user();
    for(a=0;a<19;a++){
        _service_cart_item = get_service_cart_item(a);
        if(_service_cart_item){
            if(_service_cart_item.title_url==service_cart_item.title_url){
                _service_cart_item.quantity=_service_cart_item.quantity+quantity;
                Lockr.set("service_cart_item_"+_service_cart_item.count_row,_service_cart_item)
                found=true;
                break;
            }
        }
    }
    if(service_cart_list.length==0|| !user.user_shopping_cart_id){
        user.user_shopping_cart_id=get_id();
        set_user(user);
    }
    if(!found){
        new_service_cart_item ={
            tbl_id:0,
            title:service_cart_item.title,
            title_url:service_cart_item.title_url,
            price:service_cart_item.price,
            image_url:service_cart_item.image_url,
            service_tbl_id:service_cart_item.tbl_id,
            photofilename:service_cart_item.photofilename,
            service_sub1_title:service_cart_item.service_sub1_title,
            service_sub1_price:service_cart_item.service_sub1_price,
            service_sub2_title:service_cart_item.service_sub2_title,
            service_sub2_price:service_cart_item.service_sub2_price,
            service_shipping_title:service_cart_item.service_shipping_title,
            service_shipping_price:service_cart_item.service_shipping_price,
            quantity:quantity,
            count_row:new_count_row,
            user_shopping_cart_id:user.user_shopping_cart_id
        };
        post_crud_update_item(G_DT_SERVICE_CART,new_service_cart_item.tbl_id,{
            title:new_service_cart_item.title,
            title_url:new_service_cart_item.title_url,
            price:new_service_cart_item.price,
            image_url:new_service_cart_item.image_url,
            service_tbl_id:new_service_cart_item.service_tbl_id,
            photofilename:new_service_cart_item.photofilename,
            service_sub1_title:new_service_cart_item.service_sub1_title,
            service_sub1_price:new_service_cart_item.service_sub1_price,
            service_sub2_title:new_service_cart_item.service_sub2_title,
            service_sub2_price:new_service_cart_item.service_sub2_price,
            service_shipping_title:new_service_cart_item.service_shipping_title,
            service_shipping_price:new_service_cart_item.service_shipping_price,
            quantity:new_service_cart_item.quantity,
            count_row:new_service_cart_item.count_row,
            user_shopping_cart_id:new_service_cart_item.user_shopping_cart_id,
        }, function(data){
            Lockr.set("service_cart_item_"+new_count_row,new_service_cart_item);
        });
    }
}
function set_service_order(order){
    Lockr.set("service_order",order);
}
function get_service_order(){
    return Lockr.get("service_order");
}
function set_page_service_store_links(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    str='';
    for(a=0;a<data.store_links.items.length;a++){
        str=str+"<div class='card card-style'><div class='content'>"+
            "<h2>"+data.store_links.items[a].title+"</h2>"+
            "<p>"+data.store_links.items[a].note+"</p></div></div>";
    }
    $("#biz_div_page_info").html(str);
    load_plugins();
}
