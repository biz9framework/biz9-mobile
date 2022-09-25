G_PAYMENT_TYPE_NOW='pay_now';
G_PAYMENT_TYPE_CASHAPP='cashapp';
G_PAYMENT_TYPE_ON_DELIVERY='pay_on_delivery';
//9_product_category_list
function set_page_product_category_list(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    set_product_btn_shopping_cart();
    var str='';
    color_row=0;
    for(var a=0;a<data.product_category_list.length;a++){
        data.product_category_list[a].title=data.product_category_list[a].title?(data.product_category_list[a].title):"";
        data.product_category_list[a].category=data.product_category_list[a].category?(data.product_category_list[a].category):"";
        data.product_category_list[a].sub_note=data.product_category_list[a].sub_note?(data.product_category_list[a].sub_note):"";
        str=str+
            "<a href='product_list.html?category="+data.product_category_list[a].title+"' class='card card-style' style='background-image:url("+data.product_category_list[a].mid_photo_url+")' data-card-height='200'>"+
            "<div class='card-top m-3'>"+
            "<span class='badge bg-"+color_list[color_row]+" px-2 py-1 text-uppercase'>"+data.product_category_list[a].category+"</span>"+
            "</div>"+
            "<div class='card-bottom mx-3 mb-4 pb-2'>"+
            "<h1 class='color-white mb-n2 font-700'>"+data.product_category_list[a].title+"</h1>"+
            "<p class='color-white mb-0 opacity-50 font-12'>"+data.product_category_list[a].sub_note+"</p>"+
            "</div>"+
            "<div class='card-overlay bg-black opacity-80'></div>"+
            "</a>";
        color_row=color_row+1;
        if(color_row==5){
            color_row=0;
        }
    }
    $('#biz_product_category_list').html(str);
}
//9_product_list
function set_page_product_list(data){
    set_product_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    var str='';
    for(var a=0;a<data.product_list.length;a++){
        data.product_list[a]=set_product_item_info(data.product_list[a]);
        if(!data.product_list[a].price){
            data.product_list[a].price='TBD';
        }
        str=str+
            "<div class='d-flex mb-4'>"+
            "<a href='product_detail.html?title_url="+data.product_list[a].title_url+"'>"+
            "<img src='"+data.product_list[a].mid_photo_url+"' width='130'> <br>"+
            "</a>"+
            "<div class='w-100'>"+
            "<a href='#'>"+
            "<h5 class='font-15 ps-3'>"+data.product_list[a].title+"</h5>"+
            "<p class='ps-3 mb-2 font-11 line-height-xs'>"+data.product_list[a].sub_note+"</p>"+
            "<span class='color-green-dark font-10 mt-n2 d-block ps-3'><del>"+data.product_list[a].old_price+"</del> - " + data.product_list[a].in_stock+ "</span>"+
            "</a>"+
            "<h5 class=' ps-3 font-700 pt-1 no-click'>"+data.product_list[a].price+"</h5>"+
            "<a href='product_detail.html?title_url="+data.product_list[a].title_url+"' class='icon icon-xxs float-end mt-n4'><i class='fa fa-shopping-cart color-blue-dark'></i></a>"+
            "</div>"+
            "</div>"+
            "<div class='divider'></div>";
    }
    $('#biz_product_list').html(str);
}
//9_product_detail
function set_page_product_detail(data){
    set_product_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('#biz_page_tbl_id').val(data.product.tbl_id);
    $('#biz_page_data_type').val(data.product.data_type);
    data.product=set_product_item_info(data.product);
    if(!data.product.price){
        data.product.price='TBD';
    }
    $("#biz_product_div_audio").hide();
    $("#biz_product_div_video").hide();
    $("#biz_product_div_description").hide();
    $('#biz_product_div_additional_information').hide();
    $('#biz_product_div_store_links').hide();
    if(!data.product.price){
        data.product.price='TBD';
    }
    $('#biz_product_title').html(data.product.title);
    $('#biz_product_old_price').html(data.product.old_price);
    $('#biz_product_price').html(data.product.price);

    $('#biz_product_in_stock').html(data.product.in_stock);
    if(!data.product.in_stock){
        $('#biz_product_in_stock').remove();
    }else if(data.product.in_stock=='Out of stock'){
        $('#biz_btn_product_purchase').hide();
    }

    if(data.product.sub_note){
        if(data.product.sub_note.length>0){
            $('#biz_product_div_description').show();
            $('#biz_product_paragraph_description').html(data.product.sub_note);
        }
    }
    if(data.product.note){
        if(data.product.note.length>0){
            $('#biz_product_div_additional_information').show();
            $('#div_note').html(data.product.note);
        }
    }
    if(data.product.mp3filename){
        $('#biz_product_div_audio').show();
        $('#biz_product_audio_title').html(data.product.mp3_title);
        $('#biz_product_audio_note').html(data.product.mp3_note);
        $('#biz_product_audio_duration').html('Duration: '+ data.product.mp3duration);
        set_mp3_player(data.product.mp3_url);
    }else{
        $('#biz_product_div_audio').hide();
    }
    if(data.product.youtube_link){
        $('#biz_product_div_video').show();
        $('#biz_product_video_link').attr('src',data.product.youtube_link);
        $('#biz_product_video_title').html(data.product.mp3_title);
        $('#biz_product_video_note').html(data.product.mp3_note);
    }else{
        $('#biz_product_div_video').hide();
    }
    if(data.product.show_store_links=='true'){
        $('#biz_product_div_store_links').show();
    }
    var str='';
    str="<div class='splide single-slider slider-no-arrows slider-no-dots' id='single-slider-1'><div class='splide__track'><div class='splide__list'>";
    str=str+
        "<div class='splide__slide'>"+
        "<a class='col mb-4' data-gallery='gallery-1' href='"+data.product.album_photo_url+"' title=''>"+
        "<img src='"+data.product.mid_photo_url+"' class='mx-auto pb-4' title='' style='width:200px!important;'>"+
        "</a>"+
        "</div>";
    for(a=0;a<data.product.photos.length;a++){
        if(!data.product.photos[a].note){
            data.product.photos[a].note='';
        }
        str=str+
            "<div class='splide__slide'>"+
            "<a class='col mb-4' data-gallery='gallery-1' href='"+data.product.photos[a].album_photo_url+"' title='"+data.product.photos[a].note+"'>"+
            "<img src='"+data.product.photos[a].mid_photo_url+"' class='mx-auto pb-4' style='width:200px!important;'  title='"+data.product.photos[a].note+"'>"+
            "</a>"+
            "</div>";
    }
    str=str+ "</div></div></div>";
    $('#biz_product_photo_list').html(str);
    //sub product
    if(data.product.product_sub1_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.product.product_sub1_title+"</label><select id='biz_sel_sub1_product'><option value='"+data.product.product_sub1_title+"' disabled>"+data.product.product_sub1_title+"</option>";
        for(a=0;a<5;a++){
            if(data.product['sub1_option'+a+'_title']){
                sub1_title=data.product['sub1_option'+a+'_title'];
                sub1_price=data.product['sub1_option'+a+'_price'];
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
        $('#biz_product_sub_product_title').val(data.sub_product_list_category);
        $('#biz_sub_product').html(str);
    }
    //sub2_product
    if(data.product.product_sub2_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.product.product_sub2_title+"</label><select id='biz_sel_sub2_product'><option value='"+data.product.product_sub2_title+"' disabled>"+data.product.product_sub2_title+"</option>";
        for(a=0;a<5;a++){
            if(data.product['sub2_option'+a+'_title']){
                sub2_title=data.product['sub2_option'+a+'_title'];
                sub2_price=data.product['sub2_option'+a+'_price'];
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
        $('#biz_sub2_product').html(str);
    }
    if(data.product.product_shipping_title){
        var str='';
        str="<label for='form5' class='color-blue-dark font-11 font-700' style='top:-20px'>"+data.product.product_shipping_title+"</label><select id='biz_sel_shipping_product'><option value='"+data.product.product_shipping_title+"' disabled>"+data.product.product_shipping_title+"</option>";
        for(a=0;a<5;a++){
            if(data.product['shipping_option'+a+'_title']){
                shipping_title=data.product['shipping_option'+a+'_title'];
                shipping_price=data.product['shipping_option'+a+'_price'];
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
    //9_product_cart_add
    $("#biz_btn_product_purchase").click(function() {
        product_tbl_id= $('#biz_page_tbl_id').val();
        product_data_type= $('#biz_page_data_type').val();
        post_crud_get_item(product_data_type,product_tbl_id,function(data){
            product_cart_item={};
            product_cart_item.tbl_id=data.tbl_id;
            product_cart_item.title=data.title;
            product_cart_item.title_url=data.title_url;
            product_cart_item.price=data.price;
            product_cart_item.old_price=data.old_price;
            product_cart_item.photofilename=data.photofilename;
            product_cart_item.image_url=data.thumb_photo_url;
            product_cart_item.product_sub1_title='';
            product_cart_item.product_sub1_price='';
            if(data.product_sub1_title){
                product_cart_item.product_sub1_title = data.product_sub1_title +" " + $("#biz_sel_sub1_product option:selected").text();
                product_cart_item.product_sub1_price=$("#biz_sel_sub1_product option:selected").val().replace('$','');
            }
            product_cart_item.product_sub2_title='';
            product_cart_item.product_sub2_price='';
            if(data.product_sub2_title){
                product_cart_item.product_sub2_title = data.product_sub2_title +" " + $("#biz_sel_sub2_product option:selected").text();
                product_cart_item.product_sub2_price=$("#biz_sel_sub2_product option:selected").val().replace('$','');
            }
            product_cart_item.product_shipping_title='';
            product_cart_item.product_shipping_price='';
            if(data.product_shipping_title){
                product_cart_item.product_shipping_title = data.product_shipping_title +" " + $("#biz_sel_shipping_product option:selected").text();
                product_cart_item.product_shipping_price=$("#biz_sel_shipping_product option:selected").val().replace('$','');
            }
            set_product_cart_item(product_cart_item,1);
            $('#biz_btn_product_purchase').addClass("bg-click");
            $('#biz_btn_product_purchase').html("Added to Cart!");
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
//9_product_checkout_success
function set_page_product_checkout_success(data){
    set_product_btn_shopping_cart();
    $('#biz_primary_app_title').html(data.primary.app_title);
    product_order_success = get_product_order();
    product_order_success.subtotal=product_order_success.subtotal?(product_order_success.subtotal):'TBD';
    $('#biz_lbl_checkout_sub_total').html(product_order_success.subtotal);
    $('#biz_lbl_checkout_discount').html(product_order_success.discount);
    $('#biz_lbl_checkout_shipping').html(product_order_success.shipping);
    $('#biz_lbl_checkout_grand_total').html(product_order_success.grand_total);
    $('#biz_lbl_checkout_email').html(product_order_success.email);
    $('#biz_lbl_checkout_payment_type').html(product_order_success.payment_type);
    $('#biz_lbl_checkout_first_name').html(product_order_success.shipping_first_name);
    $('#biz_lbl_checkout_last_name').html(product_order_success.shipping_last_name);
    $('#biz_lbl_checkout_company').html(product_order_success.shipping_company_name);
    $('#biz_lbl_checkout_country').html(product_order_success.shipping_country);
    $('#biz_lbl_checkout_city').html(product_order_success.shipping_city);
    $('#biz_lbl_checkout_state').html(product_order_success.shipping_state);
    $('#biz_lbl_checkout_address').html(product_order_success.shipping_address);
    $('#biz_lbl_checkout_zip').html(product_order_success.shipping_zip);
    var product_cart_list = get_product_cart_list();
    str='';
    for(a=0;a<product_cart_list.length;a++){
        product_cart_list[a]=set_product_item_info(product_cart_list[a]);
        if(!product_cart_list[a].price){
            product_cart_list[a].price='TBD';
        }
        if(!product_cart_list[a].product_sub1_title){
            product_cart_list[a].product_sub1_title='';
        }
        if(!product_cart_list[a].product_sub2_title){
            product_cart_list[a].product_sub2_title='';
        }
        if(!product_cart_list[a].shipping_title){
            product_cart_list[a].shipping_title='';
        }
        str=str+"<div class='d-flex mb-4'>"+
            "<div>"+
            "<img src='"+product_cart_list[a].image_url+"' width='90'> <br>"+
            "</div>"+
            "<div class='w-100'>"+
            "<h5 class='font-14 ps-3'>"+product_cart_list[a].title+"</h5>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>Quanity x"+product_cart_list[a].quantity+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub1_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub2_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].shipping_title+"</p>"+
            "</div>"+
            "<div class='ms-auto text-end'>"+
            "<h5 class='ps-3 font-14'>" +product_cart_list[a].price+"</h5>"+
            "<div class='clearfix'></div>"+
            "</div>"+
            "<div class='divider mb-3 mt-n2'></div>"+
            "</div>";
    }
    $('#biz_div_product_list').html(str);
    clear_product_cart_list();
}
function test_bind_customer_product_check_out(){
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
//9_product_checkout
function set_page_product_checkout(data){
    $('#biz_page_billing_stripe_publish_key').val(data.primary.billing_stripe_publish_key);
    $('#biz_page_billing_stripe_secret_key').val(data.primary.billing_stripe_secret_key);
    $('#biz_page_app_title').val(data.primary.app_title);
    test_bind_customer_product_check_out();
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
    set_product_btn_shopping_cart();
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    var product_cart_list = get_product_cart_list();
    str='';
    for(a=0;a<product_cart_list.length;a++){
        if(!product_cart_list[a].price){
            product_cart_list[a].price='TBD';
        }else{
            product_cart_list[a].price=get_money(product_cart_list[a].price);
        }
        str=str+"<div class='d-flex mb-4'>"+
            "<div>"+
            "<img src='"+product_cart_list[a].image_url+"' width='90'> <br>"+
            "</div>"+
            "<div class='w-100'>"+
            "<h5 class='font-14 ps-3'>"+product_cart_list[a].title+"</h5>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>Quanity x"+product_cart_list[a].quantity+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub1_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub2_title+"</p>"+
            "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_shipping_title+"</p>"+
            "</div>"+
            "<div class='ms-auto text-end'>"+
            "<h5 class='ps-3 font-14'>" +product_cart_list[a].price+"</h5>"+
            "<div class='clearfix'></div>"+
            "</div>"+
            "<div class='divider mb-3 mt-n2'></div>"+
            "</div>";
    }
    $('#biz_div_product_list').html(str);
    set_product_checkout_total();
    $('.div_payment_checkout').hide();

    var str='';
    var has_payment_type=false;
    str="<label for='form5' class='color-highlight color-blue-dark font-11 font-700' style='margin-left:20px'>Payment Type</label><select id='biz_sel_checkout_payment_type'><option value='Payment Type' disabled selected>Payment Type</option>";
    if(data.primary.billing_stripe_visible=='true'){
        has_payment_type=true;
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_NOW+"'>Pay Now</option>";
    }
    if(data.primary.billing_cashapp_visible=='true'){
        has_payment_type=true;
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_CASHAPP+"'>Cash App</option>";
    }
    if(data.primary.billing_paydelivery_visible=='true'){
        has_payment_type=true;
        $('.div_payment_checkout').show();
        str=str+ "<option value='"+G_PAYMENT_TYPE_ON_DELIVERY+"'>Pay on Delivery</option>";
    }
    if(has_payment_type){
    str=str+"</select>";
    str=str+"<span><i class='fa fa-chevron-down'></i></span>"+
        "<i class='fa fa-check disabled valid color-green-dark'></i>"+
        "<i class='fa fa-check disabled invalid color-red-dark'></i>"+
        "<em></em>";
        $('#biz_lbl_payment_info').html("Choose a payment type to process your order.");
        $('#biz_product_payment_type').html(str);

    }else{
       $('#biz_lbl_payment_info').html("No payment options availble. Contact customer support.");
    }

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
            $("#biz_product_payment_cashapp").html(data.primary.billing_cashapp_handler);
            $("#biz_btn_checkout_submit").show();
        }else if(payment_type==G_PAYMENT_TYPE_ON_DELIVERY){
            $("#biz_div_checkout_payment_address").show();
            $("#biz_btn_checkout_submit").show();
        }
    });
    $("#biz_btn_product_checkout").click(function() {
        window.location.reload();
    });
    $("#biz_btn_checkout_submit").click(function() {
        run_payment=true;
        var product_order={};
        product_order.app_title=$("#biz_page_app_title").val();
        product_order.billing_stripe_publish_key=$("#biz_page_billing_stripe_publish_key").val();
        product_order.billing_stripe_secret_key=$("#biz_page_billing_stripe_secret_key").val();
        product_order.email=$("#biz_tb_checkout_email").val();
        product_order.payment_type=$("#biz_sel_checkout_payment_type option:selected").val();
        product_order.subtotal=$("#biz_lbl_checkout_sub_total").html();
        product_order.shipping=$("#biz_lbl_checkout_shipping").html();
        product_order.discount=$("#biz_lbl_checkout_discount").html();
        product_order.grand_total=$("#biz_lbl_checkout_grand_total").html();

        product_order.shipping_first_name=$("#biz_tb_shipping_checkout_first_name").val();
        product_order.shipping_last_name=$("#biz_tb_shipping_checkout_last_name").val();
        product_order.shipping_company_name=$("#biz_tb_shipping_checkout_company_name").val();
        product_order.shipping_country=$("#biz_sel_shipping_checkout_country").val();
        product_order.shipping_city=$("#biz_tb_shipping_checkout_city").val();
        product_order.shipping_state=$("#biz_sel_shipping_checkout_state").val();
        product_order.shipping_address=$("#biz_tb_shipping_checkout_address").val();
        product_order.shipping_zip=$("#biz_tb_shipping_checkout_zip").val();
        error_message='';
        if(!product_order.shipping_first_name){
            error_message='Please enter a valid shipping first name';
        }else if(!product_order.shipping_last_name){
            error_message='Please enter a valid shipping last name';
        }else if(!product_order.shipping_company_name){
            error_message='Please enter a valid shipping company name';
        }else if(!product_order.shipping_country){
            error_message='Please enter a valid shipping country';
        }else if(!product_order.shipping_city){
            error_message='Please enter a valid shipping city';
        }else if(!product_order.shipping_address){
            error_message='Please enter a valid shipping address';
        }else if(!product_order.shipping_zip){
            error_message='Please enter a valid shipping zip code';
        }

        if(error_message){
            alert(error_message);
        }else if(!validate_email(product_order.email)){
            alert('Please enter a valid email');
            run_payment=false;
        }else if(product_order.payment_type==G_PAYMENT_TYPE_NOW){
            run_credit_card_payment(function(data,error){
                if(!error){
                    user=get_user();
                    product_order.user_shopping_cart_id=user.user_shopping_cart_id;
                    product_order.token_id=data;
                    send_product_checkout(product_order);
                }else{
                    alert(error);
                }
            });
        }else if(product_order.payment_type==G_PAYMENT_TYPE_CASHAPP|| product_order.payment_type==G_PAYMENT_TYPE_ON_DELIVERY){
                user=get_user();
                product_order.user_shopping_cart_id=user.user_shopping_cart_id;
                send_product_checkout(product_order);
        }
    });
    function send_product_checkout(product_order){
        url='shop/send_product_checkout';
        post_cloud_data(url,{
            email:product_order.email,
            payment_type:product_order.payment_type,
            subtotal:product_order.subtotal,
            discount:product_order.discount,
            grand_total:product_order.grand_total,
            card_credit_card:product_order.card_credit_card,
            card_exp_month:product_order.card_exp_month,
            card_exp_year:product_order.card_exp_year,
            card_cvc:product_order.card_cvc,
            card_country:product_order.card_country,
            card_zip:product_order.card_zip,
            shipping_first_name:product_order.shipping_first_name,
            shipping_last_name:product_order.shipping_last_name,
            shipping_company_name:product_order.shipping_company_name,
            shipping_country:product_order.shipping_country,
            shipping_city:product_order.shipping_city,
            shipping_state:product_order.shipping_state,
            shipping_address:product_order.shipping_address,
            user_shopping_cart_id:product_order.user_shopping_cart_id,
            stripe_token_id:product_order.token_id,
            app_title:product_order.app_title
        }, function(data){
            set_product_order(product_order);
            location="product_checkout_success.html";
        })
    }
    function validate_shipping(product_order){
        error_message='';
        callback(product_order,error_message);
    }
    function run_credit_card_payment(callback){
        error_message=null;
        product_order={};
        product_order.billing_stripe_publish_key=$("#biz_page_billing_stripe_publish_key").val();
        product_order.billing_stripe_secret_key=$("#biz_page_billing_stripe_secret_key").val();
        product_order.card_credit_card=$("#biz_tb_checkout_credit_card").val();
        product_order.card_exp_month=$("#biz_sel_checkout_exp_month").val();
        product_order.card_exp_year=$("#biz_sel_checkout_exp_year").val();
        product_order.card_cvc=$("#biz_tb_pay_checkout_cvc").val();
        product_order.card_country=$("#biz_sel_pay_checkout_country").val();
        product_order.card_zip=$("#biz_tb_pay_checkout_zip").val();
        if(String(product_order.card_credit_card).length<5){
            error_message='Please enter a valid card #';
        }else if(!product_order.card_zip){
            error_message='Please enter a valid card zip code';
        }else if(product_order.card_cvc.length<2){
            error_message='Please enter a valid credit card cvc';
        }
        var card = {
            number: product_order.card_credit_card, // 16-digit credit card number
            expMonth:product_order.card_exp_month, // expiry month
            expYear:product_order.card_exp_year, // expiry year
            cvc:product_order.card_cvc, // CVC / CCV
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
            cordova.plugins.stripe.setPublishableKey(product_order.billing_stripe_publish_key);
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
//9_product_shopping_cart//9_product_cart_button
function set_product_btn_shopping_cart(){
    update_product_cart_total();
    $("#biz_btn_product_shopping_cart").click(function() {
        update_product_cart_total();
        product_cart_list = get_product_cart_list();
        var product_cart_total=0;
        str='';
        for(a=0;a<product_cart_list.length;a++){
            product_cart_list[a]=set_product_item_info(product_cart_list[a]);
            if(!product_cart_list[a].price){
                product_cart_list[a].price='TBD';
            }
            str =str+"<div class='d-flex mb-4' id='biz_product_cart_row_"+product_cart_list[a].count_row+"'>"+
                "<div>"+
                "<img src='"+product_cart_list[a].image_url+"' width='90'> <br>"+
                "</div>"+
                "<div class='w-100'>"+
                "<h5 class='font-14 ps-3'>"+product_cart_list[a].title+"</h5>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub1_title+"</p>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_sub2_title+"</p>"+
                "<p class='mb-0 mt-n2 ps-3 font-10 opacity-50'>"+product_cart_list[a].product_shipping_title+"</p>"+
                "<a href='#' class='ps-3 color-red-dark pt-2 d-block font-10 biz_btn_product_cart_remove' count_row='"+product_cart_list[a].count_row+"'>Remove</a>"+
                "</div>"+
                "<div class='ms-auto text-end'>"+
                "<h5 class='ps-3 font-14'>"+product_cart_list[a].price+"<br/><br/></h5>"+
                "<div class='stepper rounded-s switch-s me-n2 mt-n2'>"+
                "<a href='#' type='sub'  count_row='"+product_cart_list[a].count_row+"' class='stepper-sub biz_btn_product_cart_step'><i class='fa fa-minus color-theme opacity-40'></i></a>"+
                "<input type='number' min='1' max='99' value='"+product_cart_list[a].quantity+"' class='"+product_cart_list[a].count_row+"_biz_product_cart_quantity'>"+
                "<a href='#' type='add'  count_row='"+product_cart_list[a].count_row+"' class='stepper-add biz_btn_product_cart_step'><i class='fa fa-plus color-theme opacity-40'></i></a>"+
                "</div>"+
                "<div class='clearfix'></div>"+
                "</div>"+
                "</div>";
        }
        $('#biz_product_cart_list').html(str);
        $(".biz_btn_product_cart_remove").click(function() {
            count_row = $(this).attr('count_row');
            $('#biz_product_cart_row_'+count_row).remove();
            remove_product_cart_item(count_row);
            set_product_checkout_total();
            update_product_cart_total();
        });
        //9_product_update_quantity
        $(".biz_btn_product_cart_step").click(function() {
            count_row = $(this).attr('count_row');
            type = $(this).attr('type');
            quantity=parseInt($("."+count_row+"_biz_product_cart_quantity").val());
            if(type=='sub'){
                if(quantity>1){
                    quantity=quantity-1;
                }else{
                    $("."+count_row+"_biz_product_cart_quantity").val('1');
                }
            }else{
                quantity=quantity+1;
            }
            update_product_cart_item(count_row,quantity);
            set_product_checkout_total();
            update_product_cart_total();
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
//9_update_product_cart_total
function update_product_cart_total(){
    var product_cart_list = get_product_cart_list();
    var product_cart_total=0;
    var all_not_tbd=true;
    for(a=0;a<product_cart_list.length;a++){
        if(isNaN(product_cart_list[a].sub_product_price)|| !product_cart_list[a].sub_product_price){
            product_cart_list[a].sub_product_price=0;
        }
        if(isNaN(product_cart_list[a].sub2_product_price)|| !product_cart_list[a].sub2_product_price){
            product_cart_list[a].sub2_product_price=0;
        }
        if(isNaN(product_cart_list[a].price)||!product_cart_list[a].price){
            all_not_tbd=false;
        }
        product_cart_total=product_cart_total+parseInt(product_cart_list[a].quantity)*parseFloat(product_cart_list[a].price)+ parseFloat(product_cart_list[a].sub_product_price)+parseFloat(product_cart_list[a].sub2_product_price) ;
    }
    if(!all_not_tbd){
        $('#biz_product_cart_total').html('TBD');
        $('#biz_product_cart_total_lbl').html('Total');
    }else{
        $('#biz_product_cart_total').html(get_money(product_cart_total));
        $('#biz_product_cart_total_lbl').html('Total');
    }
    if(product_cart_list.length==0){
        $('#biz_btn_product_checkout').html('0 Shopping Cart Items');
        $('#biz_btn_product_checkout').attr('href','#');
        $('#biz_product_cart_total').html(get_money(0));
        $('#biz_product_cart_total_lbl').html('Total');
    }else{
        $('#biz_btn_product_checkout').html('Proceed to Checkout');
        $('#biz_btn_product_checkout').attr('href','product_checkout.html');
    }
}
function set_product_checkout_total(){
    var product_cart_list = get_product_cart_list();
    var product_cart_total=0;
    var product_subtotal_cost=0;
    var product_shipping_total=0;
    var all_not_tbd=true;
    for(a=0;a<product_cart_list.length;a++){
        if(isNaN(product_cart_list[a].product_sub1_price)|| !product_cart_list[a].product_sub1_price){
            product_cart_list[a].product_sub1_price=0;
        }
        if(isNaN(product_cart_list[a].product_sub2_price)|| !product_cart_list[a].product_sub2_price){
            product_cart_list[a].product_sub2_price=0;
        }
        if(!product_cart_list[a].product_shipping_price){
            product_cart_list[a].product_shipping_price=0;
        }
        if(isNaN(product_cart_list[a].price)||!product_cart_list[a].price){
            all_not_tbd=false;
        }
        product_subtotal_cost= product_subtotal_cost+parseFloat(product_cart_list[a].product_sub1_price)+parseFloat(product_cart_list[a].product_sub2_price)+parseFloat(product_cart_list[a].price);
        product_shipping_total= product_shipping_total+parseFloat(product_cart_list[a].product_shipping_price);
        product_subtotal_cost= parseInt(product_cart_list[a].quantity)*product_subtotal_cost;
        product_shipping_total= parseInt(product_cart_list[a].quantity)*product_shipping_total;
    }
    product_cart_total= product_cart_total+ product_subtotal_cost +product_shipping_total;
    if(all_not_tbd){
        $('#biz_lbl_checkout_sub_total').html(get_money(product_subtotal_cost));
        $('#biz_lbl_checkout_grand_total').html(get_money(product_cart_total));
        $('#biz_lbl_checkout_shipping').html(get_money(product_shipping_total));
    }else{
        $('#biz_lbl_checkout_sub_total').html('TBD');
        $('#biz_lbl_checkout_grand_total').html('TBD');
        $('#biz_lbl_checkout_shipping').html('TBD');
    }
}
//9_get_product_cart_list
function get_product_cart_list(){
    var product_cart_list=[];
    for(var a=0;a<19;a++){
        if(get_product_cart_item(a)){
            product_cart_list.push(get_product_cart_item(a));
        }
    }
    return product_cart_list;
}
function get_product_cart_list_tbl_ids(){
    product_cart_list=get_product_cart_list();
    tbl_ids='';
    for(a=0;a<product_cart_list.length;a++){
        tbl_ids=tbl_ids+product_cart_list[a].tbl_id+',';
    }
    return tbl_ids;
}
function clear_product_cart_list(){
    var product_cart_list=[];
    for(var a=0;a<19;a++){
        remove_product_cart_item(a);
    }
}
function remove_product_cart_item(product_cart_list_row){
    Lockr.rm("product_cart_item_"+product_cart_list_row);
}
function update_product_cart_item(product_cart_list_row,quantity){
    product_cart_item=get_product_cart_item(product_cart_list_row)
    product_cart_item.quantity=quantity;
    Lockr.set("product_cart_item_"+product_cart_list_row,product_cart_item);
}
function get_product_cart_item(product_cart_list_row){
    return Lockr.get("product_cart_item_"+product_cart_list_row);
}
//9_product_cart_item //9_product_cart_add
function set_product_cart_item(product_cart_item,quantity){
    product_cart_list = get_product_cart_list();
    var found=false;
    new_count_row=parseInt(product_cart_list.length)+1;
    user=get_user();
    for(a=0;a<19;a++){
        _product_cart_item = get_product_cart_item(a);
        if(_product_cart_item){
            if(_product_cart_item.title_url==product_cart_item.title_url){
                _product_cart_item.quantity=_product_cart_item.quantity+quantity;
                Lockr.set("product_cart_item_"+_product_cart_item.count_row,_product_cart_item)
                found=true;
                break;
            }
        }
    }
    if(product_cart_list.length==0|| !user.user_shopping_cart_id){
        user.user_shopping_cart_id=get_id();
        set_user(user);
    }
    if(!found){
        new_product_cart_item ={
            tbl_id:0,
            title:product_cart_item.title,
            title_url:product_cart_item.title_url,
            price:product_cart_item.price,
            image_url:product_cart_item.image_url,
            product_tbl_id:product_cart_item.tbl_id,
            photofilename:product_cart_item.photofilename,
            product_sub1_title:product_cart_item.product_sub1_title,
            product_sub1_price:product_cart_item.product_sub1_price,
            product_sub2_title:product_cart_item.product_sub2_title,
            product_sub2_price:product_cart_item.product_sub2_price,
            product_shipping_title:product_cart_item.product_shipping_title,
            product_shipping_price:product_cart_item.product_shipping_price,
            quantity:quantity,
            count_row:new_count_row,
            user_shopping_cart_id:user.user_shopping_cart_id
        };
        post_crud_update_item(G_DT_PRODUCT_CART,new_product_cart_item.tbl_id,{
            title:new_product_cart_item.title,
            title_url:new_product_cart_item.title_url,
            price:new_product_cart_item.price,
            image_url:new_product_cart_item.image_url,
            product_tbl_id:new_product_cart_item.product_tbl_id,
            photofilename:new_product_cart_item.photofilename,
            product_sub1_title:new_product_cart_item.product_sub1_title,
            product_sub1_price:new_product_cart_item.product_sub1_price,
            product_sub2_title:new_product_cart_item.product_sub2_title,
            product_sub2_price:new_product_cart_item.product_sub2_price,
            product_shipping_title:new_product_cart_item.product_shipping_title,
            product_shipping_price:new_product_cart_item.product_shipping_price,
            quantity:new_product_cart_item.quantity,
            count_row:new_product_cart_item.count_row,
            user_shopping_cart_id:new_product_cart_item.user_shopping_cart_id,
        }, function(data){
            Lockr.set("product_cart_item_"+new_count_row,new_product_cart_item);
        });
    }
}
function set_product_order(order){
    Lockr.set("product_order",order);
}
function get_product_order(){
    return Lockr.get("product_order");
}
function set_page_product_store_links(data){
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
