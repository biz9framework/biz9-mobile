//9_home
function set_page_home(data){
    function hide_bind_cards(){
        $(".biz_lbl_banner_card").hide();
        $("#biz_lbl_image_card").hide();
        $("#biz_lbl_popular_category_full_card").hide();
        $("#biz_lbl_popular_card").hide();
        $("#biz_lbl_double_card").hide();
        $("#biz_lbl_category_card").hide();
        $("#biz_lbl_buy_card").hide();
        $("#biz_lbl_card_datetime").hide();
    }
    set_page_title(data.mobile.primary.app_title);
    hide_bind_cards();
    bind_cards();
    init_cart();
    hide_spinner();
    function bind_cards(){
        if(data.home.card_banner_visible=='true'){
            bind_banner_card(data);
        }
        if(data.home.card_image_visible=='true'){
            bind_image_card(data);
        }
        if(data.home.card_popular_visible=='true'){
            bind_popular_card(data);
        }
        if(data.home.card_category_visible=='true'){
            bind_category_card(data);
        }
        if(data.home.card_buy_visible=='true'){
            bind_buy_card(data);
        }
        if(data.home.card_double_visible=='true'){
            bind_double_card(data);
        }
    }
    function bind_events(){
        $(".biz_btn_cartadd").click(function() {
            tbl_id = $(this).attr('tbl_id');
            add_product_cart(tbl_id,{},1);
            $(".biz_btn_cartadd").css("background-color", "red");
            $('#biz_btn_cart_add_'+tbl_id).css("background-color", "red");
            $('#biz_btn_cart_add_'+tbl_id).html("Added to Cart!");
            return false;
        });
        $("#biz_btn_carttop").click(function() {
            if(home_cart_top_type==DT_PRODUCT){
                show_product_cart_top();
            }else if(home_cart_top_type==DT_SERVICE){
                show_service_cart_top();
            }
        });
    }
    function bind_image_card(data){
        $("#biz_lbl_image_card").show();
        $("#biz_lbl_image_card").css("background-image", "url(" + data.home.photo_obj.mid_url + ")");
        $("#biz_lbl_image_header").html(data.home.card_image_header);
        $("#biz_lbl_image_sub_note").html(data.home.card_image_sub_note);
    }
    function bind_banner_card(data){
        if(data.card_banner_list.length>0){
            bind_banner_list(data);
            $(".biz_lbl_banner_card").show();
            init_slide_show('#slider_banner');
        }
        function bind_banner_list(data){
            color=0;
            var str='';
            var item_list=filter_visible_list(data.card_banner_list);
            for(var a=0;a<item_list.length;a++){
                url = '';
                if(item_list[a].data_type==DT_BLOG_POST){
                    url='blog_post_detail.html?title_url='+item_list[a].title_url;
                }else if(item_list[a].data_type==DT_PRODUCT){
                    url='product_detail.html?title_url='+item_list[a].title_url;
                }else if(item_list[a].data_type==DT_SERVICE){
                    url='service_detail.html?title_url='+item_list[a].title_url;
                }else if(item_list[a].data_type==DT_GALLERY){
                    url='gallery_detail.html?title_url='+item_list[a].title_url;
                }else if(item_list[a].data_type==DT_EVENT){
                    url='event_detail.html?title_url='+item_list[a].title_url;
                }
                //color_button_get_start
                color_str='';
                if(data.mobile.primary.button_color=='random'){
                    if(color>=color_list.length){
                        color=0;
                    }
                    color_str=color_list[color];
                    color=color+1;
                }else{
                    color_str=data.mobile.primary.button_color;
                }
                //color_button_get_end
                str=str+"<div class='splide__slide'>"+
                    "<div style='background-color:transparent; height:180px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item_list[a].photo_obj.mid_url+")' class='card card-style'>"+
                    "<div class='card-top'>"+
                    "<span class='badge "+color_str+" px-2 py-1 ms-2 mt-2 font-12'>"+ item_list[a].category+"</span>"+
                    "</div>"+
                    "<div class='card-bottom'>"+
                    "<a href='"+url+"'><h4 class='color-white px-3 mb-3'>"+ item_list[a].title+"</h4></a>"+
                    "</div>"+
                    "<div class='card-overlay bg-gradient'></div>"+
                    "</div>"+
                    "</div>";
            }
            $('#biz_lbl_banner_slide_show_list').html('');
            $('#biz_lbl_banner_slide_show_list').html(str);
        }
    }
    function bind_popular_card(data){
        if(data.card_popular_list.length>0){
            bind_popular_list(data.card_popular_list);
            $("#biz_lbl_popular_category_full_card").show();
            $("#biz_lbl_popular_card").show();
        }
        function bind_popular_list(item_list){
            var str='';
            var item_list=filter_visible_list(item_list);
            for(var a=0;a<item_list.length;a++){
                if(item_list[a].data_type==DT_BLOG_POST){
                    url='blog_post_detail.html?title_url='+item_list[a].title_url;
                    url_category='blog_post_list.html?category='+item_list[a].category+"&page_current=1";
                    value_field=' ' ;
                    date_str="<span class=' mb-0 ps-3 font-12 pt-0'>"+item_list[a].date_obj.pretty_create+"</span>";
                }else if(item_list[a].data_type==DT_PRODUCT){
                    popular_title='Products';
                    url='product_detail.html?title_url='+item_list[a].title_url;
                    url_category='product_list.html?category='+item_list[a].category+"&page_current=1";
                    value_field=item_list[a].money_obj.price + " | ";
                    date_str="<span class=' mb-0 ps-3 font-12 pt-0'>"+item_list[a].date_obj.pretty_create+"</span>";
                }else if(item_list[a].data_type==DT_EVENT){
                    popular_title='Events';
                    url='event_detail.html?title_url='+item_list[a].title_url;
                    url_category='event_list.html?category='+item_list[a].category+"&page_current=1";
                    value_field=item_list[a].event_obj.start_date_time + " | ";
                    date_str='';
                }else if(item_list[a].data_type==DT_SERVICE){
                    popular_title='Services';
                    url='service_detail.html?title_url='+item_list[a].title_url;
                    url_category='service_list.html?category='+item_list[a].category+"&page_current=1";
                    value_field=item_list[a].money_obj.price + " | ";
                    date_str='';
                }else if(item_list[a].data_type==DT_GALLERY){
                    popular_title='Galleries';
                    url='gallery_detail.html?title_url='+item_list[a].title_url;
                    url_category='gallery_list.html?category='+item_list[a].category+"&page_current=1";
                    value_field=item_list[a].date_obj.date_create+" " + item_list[a].date_obj.month_create +", " + item_list[a].date_obj.year_create + " " + item_list[a].date_obj.time_create + " | ";
                    date_str="<span class=' mb-0 ps-3 font-12 pt-0'>"+item_list[a].date_obj.pretty_create+"</span>";
                }
                if(!item_list[a].sub_note){
                    item_list[a].sub_note='';
                }
                str=str+"<div class='d-flex mb-3'>"+
                    "<div>"+
                    "<a href='"+url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                    "</div>"+
                    "<div>"+
                    "<a href='"+url+"'><h4 class='ps-3 line-height-s color-theme mb-1'>"+item_list[a].title+"</h4></a>"+
                    "<p class='mb-0 ps-3 font-12 pt-0'>"+truncate_str(item_list[a].sub_note,250) +"</p>"+
                    "<p class='font-12 pt-0 opacity-60'>"+date_str+" " +value_field + " " + "<i class='fa fa-eye color-gray-dark'></i> "+item_list[a].view_count +" | <a href='"+url_category+"'><b>"+item_list[a].category+"</b></a></p>"+
                    "</div>"+
                    "</div>"+
                    "<div class='divider mb-3'></div>";
            }
            if(item_list.length>0){
                $("#biz_lbl_title_popular").html(popular_title);
            }
            $('#biz_lbl_title_popular').show();
            $('#biz_lbl_popular_list').html('');
            $('#biz_lbl_popular_list').html(str);
        }
    }
    function bind_category_card(data){
        var str='';
        color=0;
        for(var a=0;a<data.card_category_list.length;a++){
            item = data.card_category_list[a];
            //color_button_get_start
            color_str='';
            if(data.mobile.primary.button_color=='random'){
                if(color>=color_list.length){
                    color=0;
                }
                color_str=color_list[color];
                color=color+1;
            }else{
                color_str=data.mobile.primary.button_color;
            }
            //color_button_get_end
            var url_category='';
            if(data.card_category_list[a].type==DT_BLOG_POST){
                url_category='blog_post_list.html?category='+data.card_category_list[a].title+"&page_current=1";
                category_title='Blog Post Categories';
            }else if(data.card_category_list[a].type==DT_PRODUCT){
                url_category='product_list.html?category='+data.card_category_list[a].title+"&page_current=1";
                category_title='Product Categories';
            }else if(data.card_category_list[a].type==DT_EVENT){
                category_title='Event Categories';
                url_category='event_list.html?category='+data.card_category_list[a].title+"&page_current=1";
            }else if(data.card_category_list[a].type==DT_SERVICE){
                category_title='Service Categories';
                url_category='service_list.html?category='+data.card_category_list[a].title+"&page_current=1";
            }else if(data.card_category_list[a].type==DT_GALLERY){
                category_title='Gallery Categories';
                url_category='gallery_list.html?category='+data.card_category_list[a].title+"&page_current=1";
            }
            str=str+"<div class='col-6'>"+
                "<a href='"+url_category+"'><div class='card card-style m-0 mb-2 rounded-m' style='background-color:transparent;height:150px;background-position:center center !important;background-size:contain; background-repeat:no-repeat;background-image:url("+data.card_category_list[a].photo_obj.square_mid_url+")' >"+
                "<div class='card-bottom'><span class='badge "+color_str+" p-2 ps-2 rounded-s font-12'>"+data.card_category_list[a].title+"</span></div>"+
                "</div></a></div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str = str+"<div class='w-100 mb-3'></div>";
            }
        }
        if(str){
            $('#biz_lbl_title_category').html(category_title);
            $('#biz_lbl_title_category').show();
            $("#biz_lbl_popular_category_full_card").show();
            $("#biz_lbl_category_card").show();
            $('#biz_lbl_category_list').html('');
            $('#biz_lbl_category_list').html(str);
        }
    }
    function bind_buy_card(data){
        if(data.home.card_buy_data_type==DT_PRODUCT){
            bind_buy_product_slide_show(data);
            buy_page_title='Products';
        }else if(data.home.card_buy_data_type==DT_SERVICE){
            bind_buy_service_slide_show(data);
            buy_page_title='Services';
        }else if(data.home.card_buy_data_type==DT_EVENT){
            bind_buy_event_slide_show(data);
            buy_page_title='Events';
        }
        if(data.home.card_buy_category!='all'){
            buy_page_title=data.home.card_buy_category;
        }
        $('#biz_lbl_title_buy').html(buy_page_title);
        function bind_buy_event_slide_show(data){
            var str='';
            $('#biz_lbl_buy_slide_show_list').html('');
            for(var a=0;a<data.card_buy_list.length;a++){
                if(String(data.card_buy_list[a].visible)=='0'){
                    data.card_buy_list[a].visible="<span class='color-red-dark font-12 mt-n2 text-end d-block'>"+data.card_buy_list[a].visible_obj.event_status+"</span>";
                }else{
                    data.card_buy_list[a].visible="<span class='color-green-dark font-12 mt-n2 text-end d-block'>"+data.card_buy_list[a].visible_obj.event_status+"</span>";
                }
                if(!data.card_buy_list[a].sub_note){
                    data.card_buy_list[a].sub_note='';
                }
                str = str+"<div class='splide__slide'>"+
                    "<a href='event_detail.html?title_url="+data.card_buy_list[a].title_url+"'><img src='"+data.card_buy_list[a].photo_obj.square_mid_url+"' class='mx-auto biz_slide_image'></a>"+
                    "<div class='biz_div_stat_outer'>"+
                    "<span class='font-12 pt-0 m-5'><i class='fa fa-eye color-gray-dark'></i> "+data.card_buy_list[a].view_count +"</span>"+
                    "</div>"+
                    "<h4 class='font-600 text-center pt-2'>"+data.card_buy_list[a].title+"</h4>"+
                    "<h6 class='font-600 text-center pt-1'>"+data.card_buy_list[a].event_obj.start_date+"</h6>"+
                    "<p class='mb-0 ps-3 font-12 pt-0 text-center'>"+truncate_str(data.card_buy_list[a].sub_note,250)+"</p>"+
                    "<p class='text-center pt-2 mb-3'>";
                for(b=0;b<parseInt(data.card_buy_list[a].rating_avg);b++){
                    str = str+"<i class='fa fa-star color-yellow-dark'></i>";
                }
                str = str+"</p>"+
                    "<div class='row mb-0 px-3'>"+
                    "<div class='col-6'>"+
                    "<h3 class='font-18 mb-2'>"+data.card_buy_list[a].money_obj.price+"</h3>";
                str = str+ "<p class='mb-0 mt-1 opacity-30 font-12'><del>"+data.card_buy_list[a].money_obj.old_price+"</del></p>";
                str = str+"</div>"+
                    "<div class='col-6'>"+
                    "<span class='biz_sp_buy'><a href='#' class='text-end d-block font-12 color-theme'><i class='fa fa-heart color-red-dark font-12'></i>Add To Cart</a></span>"+
                    data.card_buy_list[a].visible+
                    "</div>"+
                    "</div>"+
                    "<span class='biz_sp_buy'><a id='biz_btn_cart_add_"+data.card_buy_list[a].tbl_id+"' tbl_id='"+data.card_buy_list[a].tbl_id+"'  data_type='"+data.card_buy_list[a].data_type+"' href='#' class='btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn_buy_now_button biz_btn'>Add To Cart</a></span>";
                if(data.card_buy_list[a].app_store_product=='true'){
                    str = str+"<span class='biz_sp_checkout'><a href='#' biz_product_id='"+data.card_buy_list[a].app_store_product_id+"' class='biz_btn_checkout btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn'>Buy Now With 1-Click</a></span>";
                }
                str = str+"</div>";
                $('#biz_lbl_buy_slide_show_list').html(str);
                $("#biz_lbl_buy_card").show();
                init_slide_show('#slider_buy');
                bind_one_click_buy();
                $(".biz_btn_buy_now_button").click(function() {
                    var obj={};
                    tbl_id=$(this).attr('tbl_id');
                    data_type=$(this).attr('data_type');
                    $(this).addClass("bg-click");
                    $(this).html("Added to Cart!");
                    cloud_order_cart_add(data_type,tbl_id,obj,1,function(data){
                    });
                    return false;
                });
            }
        }
        function bind_buy_product_slide_show(data){
            var str='';
            $('#biz_lbl_buy_slide_show_list').html('');
            for(var a=0;a<data.card_buy_list.length;a++){
                if(String(data.card_buy_list[a].visible)=='0'){
                    data.card_buy_list[a].visible="<span class='color-red-dark font-12 mt-n2 text-end d-block'>"+data.card_buy_list[a].visible_obj.product_status+"</span>";
                }else{
                    data.card_buy_list[a].visible="<span class='color-green-dark font-12 mt-n2 text-end d-block'>"+data.card_buy_list[a].visible_obj.product_status+"</span>";
                }
                str = str+"<div class='splide__slide'>"+
                    "<a href='product_detail.html?title_url="+data.card_buy_list[a].title_url+"'><img src='"+data.card_buy_list[a].photo_obj.square_mid_url+"' class='mx-auto biz_slide_image'></a>"+
                    "<div class='biz_div_stat_outer'>"+
                    "<span class='font-12 pt-0 m-5'><i class='fa fa-eye color-gray-dark'></i> "+data.card_buy_list[a].view_count +"</span>"+
                    "</div>"+
                    "<h4 class='text-center pt-2'>"+data.card_buy_list[a].title+"</h4>";
                    if(data.card_buy_list[a].mp3filename){
                        str = str+"<div  class='text-center pt-2'><audio class='biz_audio_track' controls><source src='"+data.card_buy_list[a].mp3_url+"'  type='audio/mp3' /></audio></div>";

                new Plyr('.biz_audio_track');
                    }
                    str = str+"<p class='mb-0 ps-3 font-12 pt-0 text-center'>"+truncate_str(data.card_buy_list[a].sub_note,250)+"</p>"+
                    "<p class='text-center pt-2 mb-3'>";
                for(b=0;b<parseInt(data.card_buy_list[a].rating_avg);b++){
                    str = str+"<i class='fa fa-star color-yellow-dark'></i>";
                }
                str = str+"</p>"+
                    "<div class='row mb-0 px-3'>"+
                    "<div class='col-6'>"+
                    "<h3 class='font-18 mb-2'>"+data.card_buy_list[a].money_obj.price+"</h3>";
                str = str+ "<p class='mb-0 mt-1 opacity-30 font-12'><del>"+data.card_buy_list[a].money_obj.old_price+"</del></p>";
                str = str+"</div>"+
                    "<div class='col-6'>"+
                    "<a href='#' class='text-end d-block font-12 color-theme'><i class='fa fa-heart color-red-dark font-12'></i>Add To Cart</a>"+
                    item.visible+
                    "</div>"+
                    "</div>"+
                    "<span class='biz_sp_buy'><a id='biz_btn_cart_add_"+item.tbl_id+"' tbl_id='"+data.card_buy_list[a].tbl_id+"'  data_type='"+data.card_buy_list[a].data_type+"' href='#' class='btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700  btn-margins rounded-sm mt-3 shadow-xl biz_btn_buy_now_button biz_btn'>Add To Cart</a></span>";
                if(data.card_buy_list[a].app_store_product=='true'){
                    str = str+"<span class='biz_sp_checkout'><a href='#' biz_product_id='"+data.card_buy_list[a].app_store_product_id+"' class='biz_btn_checkout btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn'>Buy Now With 1-Click</a></span>";
                }
                str = str+"</div>";
                $('#biz_lbl_buy_slide_show_list').html(str);
                $("#biz_lbl_buy_card").show();
                init_slide_show('#slider_buy');

                bind_one_click_buy();
                $(m".biz_btn_buy_now_button").click(function() {
                  m  var obj={};
                    tbl_id=$(this).attr('tbl_id');
                    data_type=$(this).attr('data_type');
                    $(this).addClass("bg-click");
                    $(this).html("Added to Cart!");
                    cloud_order_cart_add(data_type,tbl_id,obj,1,function(data){
                    });
                    return false;
                });
            }
        }
        function bind_buy_service_slide_show(data){
            $('#biz_lbl_card_datetime').show();
            $('#biz_lbl_buy_slide_show_list').html('');
            var str='';
            for(var a=0;a<data.card_buy_list.length;a++){
                var item = data.card_buy_list[a];
                if(item.visible=='0'){
                    item.visible="<span class='color-red-dark font-12 mt-n2 text-end d-block'>"+item.visible_obj.service_status+"</span>";
                }else{
                    item.visible="<span class='color-green-dark font-12 mt-n2 text-end d-block'>"+item.visible_obj.service_status+"</span>";
                }
                if(!item.sub_note){
                    item.sub_note='';
                }
                str = str+"<div class='splide__slide'>"+
                    "<a href='service_detail.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='mx-auto biz_slide_image'></a>"+
                    "<div class='biz_div_stat_outer'>"+
                    "<span class='font-12 pt-0 m-5'><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
                    "</div>"+
                    "<h4 class='text-center pt-2'>"+item.title+"</h4>"+
                    "<p class='mb-0 ps-3 font-12 pt-0 text-center'>"+truncate_str(item.sub_note,250)+"</p>"+
                    "<p class='text-center pt-2 mb-3'>";
                for(b=0;b<parseInt(item.rating_avg);b++){
                    str = str+"<i class='fa fa-star color-yellow-dark'></i>";
                }
                str = str+"</p>"+
                    "<div class='row mb-0 px-3'>"+
                    "<div class='col-6'>"+
                    "<h3 class='font-18 mb-2'>"+item.money_obj.price+"</h3>";
                str = str+ "<p class='mb-0 mt-1 opacity-30 font-12'><del>"+item.money_obj.old_price+"</del></p>";
                str = str+"</div>"+
                    "<div class='col-6'>"+
                    "<a href='#' class='text-end d-block font-12 color-theme'><i class='fa fa-heart color-red-dark font-12'></i> Book Now</a>"+
                    item.visible+
                    "</div>"+
                    "</div>"+
                    "<a id='biz_btn_cart_add_"+item.tbl_id+"' tbl_id='"+item.tbl_id+"'  data_type='"+item.data_type+"' href='#' class='btn btn-sm btn-full bg-highlight font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn_buy_now_button biz_btn'>Book Now</a>";

                if(item.app_store_product=='true'){
                    str = str+"<span class='biz_sp_checkout'><a href='#' biz_product_id='"+item.app_store_product_id+"' class='biz_btn_checkout btn btn-sm btn-full " +data.mobile.primary.button_color + " font-700 btn-margins rounded-sm mt-3 shadow-xl biz_btn'>Book Now With 1-Click</a></span>";
                }
                str = str+"</div>";
                $('#biz_lbl_buy_slide_show_list').html(str);
                $("#biz_lbl_buy_card").show();
                init_slide_show('#slider_buy');
                bind_service_one_click_buy();
                $(".biz_btn_buy_now_button").click(function() {
                    hide_toast();
                    var obj={};
                    tbl_id=$(this).attr('tbl_id');
                    data_type=$(this).attr('data_type');
                    obj.start_date=$('#biz_tb_date').val();
                    obj.start_time=$('#biz_tb_time').val();
                    if(!obj.start_time){
                        show_toast_error('Please select a time');
                    }else if(!obj.start_date){
                        show_toast_error('Please select a date');
                    }else{
                        $(this).addClass("bg-click");
                        $(this).html("Added To Cart!");
                        cloud_order_cart_add(data_type,tbl_id,obj,1,function(data){
                        });
                        return false;
                    }
                });
            }
        }
    }
    function bind_double_card(data){
        //card_double_data_type
        //card_double_category
        double_category_title='';
        if(data.home.card_double_category=='all'){
            if(data.home.card_double_data_type==DT_EVENT){
                double_category_title='Events';
            }if(data.home.card_double_data_type==DT_SERVICE){
                double_category_title='Services';
            }if(data.home.card_double_data_type==DT_PRODUCT){
                double_category_title='Products';
            }
        }else{
            double_category_title=data.home.card_double_category;
        }
        $('#biz_lbl_double_category').html(double_category_title);
        if(data.card_double_list.length>0){
            bind_double_slide_show(data);
            $("#biz_lbl_double_card").show();
            init_double_slide_show('#slider_double');
        }
        function bind_double_slide_show(data){
            var str='';
            var visible_str='';
            $('#biz_lbl_double_slide_show_list').html('');
            for(var a=0;a<data.card_double_list.length;a++){
                var item = data.card_double_list[a];
                if(data.home.card_double_data_type==DT_PRODUCT){
                    if(String(item.visible_obj.product_visible_id) =='0'){
                        visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.product_status+"</p>";
                    }else{
                        visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.product_status+"</p>";
                    }
                }else if(data.home.card_double_data_type==DT_SERVICE){
                    if(String(item.visible_obj.service_visible_id) =='0'){
                        visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.service_status_short+"</p>";
                    }else{
                        visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.service_status_short+"</p>";
                    }
                }else if(data.home.card_double_data_type==DT_EVENT){
                    if(String(item.visible_obj.event_visible_id) =='0'){
                        visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.event_status_short+"</p>";
                    }else{
                        visible_str = "<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+item.visible_obj.event_status_short+"</p>";
                    }
                }
                if(item.data_type==DT_BLOG_POST){
                    url='blog_post_detail.html?title_url='+item.title_url;
                }else if(item.data_type==DT_PRODUCT){
                    url='product_detail.html?title_url='+item.title_url;
                }else if(item.data_type==DT_EVENT){
                    url='event_detail.html?title_url='+item.title_url;
                }else if(item.data_type==DT_SERVICE){
                    url='service_detail.html?title_url='+item.title_url;
                }
                if(!item.sub_note){
                    item.sub_note='';
                }
                str=str+"<div class='splide__slide'>"+
                    "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
                    "<div class='biz_div_stat_outer'>"+
                    "<span class='font-12 pt-0 m-3'><i class='fa fa-eye color-gray-dark'></i> "+item.view_count +"</span>"+
                    "</div>"+
                    "<h5 class='text-center pt-2 mb-0'>"+item.money_obj.price+"</h5>"+
                    visible_str +
                    "<a href='"+url+"'><h4 class='text-center'>"+item.title+"</h4></a>"+
                    "<p class='text-center ps-3 font-12 pt-0 m-2'>"+
                    truncate_str(item.sub_note,88)+
                    "</p>"+
                    "<p class='mb-4 mt-3 text-center'>"+
                    "<a id='biz_btn_cart3_add_"+item.tbl_id+"' tbl_id='"+item.tbl_id+"'  data_type='"+item.data_type+"' href='#' class='icon me-2 icon-s bg-white border border-gray-light rounded-s biz_btn_double_cart_slide_add'><i class='fa fa-shopping-cart color-black font-12'></i></a>"+
                    "<a href='#' class='icon icon-s bg-white border border-gray-light rounded-s'><i class='fa fa-heart color-red-dark font-12'></i></a>"+
                    "</p>"+
                    "</div>";
                $('#biz_lbl_double_slide_show_list').prepend(str);
                $(".biz_btn_double_cart_slide_add").click(function() {
                    var obj={};
                    obj.tbl_id=$(this).attr('tbl_id');
                    obj.data_type=$(this).attr('data_type');
                    obj.customer_id=get_user().customer_id;
                    $(this).addClass("bg-click");
                    $(this).html("<i class='fa fa-shopping-cart color-red font-12'></i>");
                    cloud_order_cart_add(obj.tbl_id,obj,1,function(data){
                    });
                    return false;
                });
            }
        }
    }
    function set_category_list(data){
        $("#biz_lbl_popular_category_card").show();
        var str='';
        color=0;
        color_str='';
        for(var a=0;a<data.card_category_list.length;a++){
            var url='';
            if(data.card_category_list[a].type==DT_PRODUCT){
                url='product';
            }else if(data.card_category_list[a].type==DT_SERVICE){
                url='service';
            }
            if(data.mobile.primary.button_color=='random'){
                if(color>=color_list.length){
                    color=0;
                }
                color_str=color_list[color];
            }else{
                color_str=data.mobile.primary.button_color;
            }
            str=str+"<div class='col-6'>"+
                "<a href='"+url+"_list.html?category="+data.card_category_list[a].title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style='background-image: url("+data.card_category_list[a].photo_obj.mid_square_url+")' data-card-height='150'>"+
                "<div class='card-bottom'><span class='badge "+color_str+"  p-2 ps-2 rounded-s'>"+data.card_category_list[a].title+" ("+data.card_category_list[a].item_count+")</span></div>"+
                "</div></a>";
            if(data.card_category_list[a].last_item_create.title){
                str=str+"<a href='"+url+"_list.html?category="+data.card_category_list[a].title+"&page_current=1'></a><p class='line-height-s color-theme mb-1'>"+data.card_category_list[a].last_item_create.title+"</p>"+
                    "<p class='mb-0 font-10 pt-1 opacity-60'><i class='fa fa-clock pe-2'></i>"+data.card_category_list[a].last_item_create.date_obj.pretty_create+"</p>";
            }
            str=str+"</div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str = str+"<div class='w-100 mb-3'></div>";
            }
            color=color+1;
        }
        $('#biz_lbl_category_list').html('');
        $('#biz_lbl_category_list').html(str);
    }
}
