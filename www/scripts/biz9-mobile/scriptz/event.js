//9_event_category_list //9_category_list
function set_page_event_category_list(data){
    set_page_title(data.mobile.primary.app_title);
    bind_slide_show_list(data);
    bind_category_list(data.category_list,data.page_current,data.page_count);
    bind_popular_list(data.popular_list,data.page_current,data.page_count);
    init_cart();
    hide_spinner();
    function bind_slide_show_list(data){
        var str='';
        for(var a=0;a<data.category_list.length;a++){
            str=str+"<div class='splide__slide'>"+
                "<div class='card card-style'style='background-color:transparent; height:320px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+data.category_list[a].last_item_create.photo_obj.mid_url+")' >"+
                "<div class='card-bottom p-1'>"+
                "<a href='event_list.html?category="+data.category_list[a].title+"&page_current=1' class='btn btn-s rounded-s mb-4 biz_btn'><h4>"+data.category_list[a].title+" (" + data.category_list[a].item_count + ")</h4></a>"+
                "</div>"+
                "<div class='card-overlay bg-gradient'></div>"+
                "</div>"+
                "</div>";
        }
        $('#biz_lbl_slideshow_list_top').html('');
        $('#biz_lbl_slideshow_list_top').html(str);
        init_slide_show('#slider_top');
    }
    function bind_category_list(item_list,page_current,page_count){
        var str='';
        color=0;
        for(var a=0;a<item_list.length;a++){
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
            str=str+"<div class='col-6'>"+
                "<a href='event_list.html?category="+item_list[a].title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style='background-color:transparent;height:150px; background-position:center center !important; background-size:contain; background-repeat:no-repeat; background-image: url("+item_list[a].photo_obj.mid_url+")' >"+
                "<div class='card-bottom'><span class='badge "+color_str+" p-2 ps-2 font-12 rounded-s'>"+item_list[a].title+" ("+item_list[a].item_count + ")</span></div>"+
                "</div></a>";
            str=str+"</div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str = str+"<div class='w-100 mb-3'></div>";
            }
        }
        $('#biz_lbl_category_list').html('');
        $('#biz_lbl_category_list').html(str);
    }
    function bind_popular_list(item_list){
        var str='';
        for(var a=0;a<item_list.length;a++){
            url='event_detail.html?title_url='+item_list[a].title_url;
            url_category='event_list.html?category='+item_list[a].category+"&page_current=1";
            value_field=item_list[a].money_obj.price + " | ";
            date_str="<span class=' mb-0 ps-3 font-12 pt-0'></span>";
            if(!item_list[a].sub_note){
                item_list[a].sub_note='';
            }
            str=str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='"+url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='"+url+"'><h4 class='ps-3 line-height-s color-theme mb-1'>"+item_list[a].title+"</h4></a>"+
                "<h7 class='ps-3 line-height-s color-theme mb-1 mt-2'>"+item_list[a].event_obj.start_date+"</h7>"+
                "<p class='mb-0 ps-3 font-12 pt-0'>"+truncate_str(item_list[a].sub_note,250) +"</p>"+
                "<p class='font-12 pt-0 opacity-60'>"+date_str+" " +value_field + " " + "<i class='fa fa-eye color-gray-dark'></i> "+item_list[a].view_count +" | <a href='"+url_category+"'><b>"+item_list[a].category+"</b></a></p>"+
                "</div>"+
                "</div>"+
                "<div class='divider mb-3'></div>";
    }
        $("#biz_lbl_popular_category_full_card").show();
        $("#biz_lbl_popular_list").show();
        $('#biz_lbl_popular_list').html('');
        $('#biz_lbl_popular_list').html(str);
    }
}
//9_event_list 9_list
function set_page_event_list(data){
    set_page_title(data.mobile.primary.app_title);
    $('#biz_page_category').val(data.category);
    set_page_sub_title(data.category);
    set_page_sub_note(data.sub_note);
    bind_list(data.event_list,data.page_current,data.page_count);
    init_cart();
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        str='';
        for(a=0;a<item_list.length;a++){
            if(String(item_list[a].visible_obj.event_visible_id) =='0'){
                visible_str="<p class='font-12 text-center mb-0 font-12 mt-n2 color-red'>"+item_list[a].visible_obj.event_status+"</p>";
            }else{
                visible_str="<p class='font-12 text-center mb-0 font-12 mt-n2 color-green-dark'>"+item_list[a].visible_obj.event_status+"</p>";
            }
            str=str+"<div class='col-6'>"+
                "<a href='event_detail.html?title_url="+item_list[a].title_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' width='150' class='mx-auto '/></a>"+
                "<div style='text-align:center'>"+
                "<span class='font-12 pt-0 m-2'><i class='fa fa-eye color-gray-dark'></i> "+item_list[a].view_count +"</span>"+
                "</div>"+
                "<h2 class='text-center pt-2 mb-0'>"+item_list[a].money_obj.price+"</h2>"+
                visible_str+
                "<h4 class='text-center pt-2'>"+item_list[a].title+"</h4>"+
                "<h6 class='text-center pt-1'>"+item_list[a].event_obj.start_date+"</h6>"+
                "<p class='text-center font-12 mb-2'>"+
                item_list[a].sub_note+
                "</p>"+
                "<p class='mb-4 mt-3 text-center'>"+
                "<a  id='biz_btn_cart_add_"+item_list[a].tbl_id+"' tbl_id='"+item_list[a].tbl_id+"'  data_type='"+item_list[a].data_type+"' href='#' class='icon me-2 icon-s bg-white border border-gray-light rounded-s biz_btn_cart_add'><i class='fa fa-shopping-cart color-black font-12'></i></a>"+
                "<a href='#' class='icon icon-s bg-white border border-gray-light rounded-s'><i class='fa fa-heart color-red-dark font-12'></i></a>"+
                "</p>"+
                "</div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str=str+"<div class='divider w-100'></div>";
            }
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_btn_cart_add").click(function() {
            var obj={};
            tbl_id=$(this).attr('tbl_id');
            obj.data_type=$(this).attr('data_type');
            obj.customer_id=get_user().customer_id;
            $('#biz_btn_cart_add_'+obj.tbl_id).addclass("bg-click");
            $('#biz_btn_cart_add_'+obj.tbl_id).html("<i class='fa fa-shopping-cart color-red font-12'></i>");
            cloud_order_cart_add(DT_PRODUCT,tbl_id,obj,1,function(data){
            });
        });
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category=$('#biz_page_category').val();
            url='event/event_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.event_list,page_current,data.page_count);
            });
        });
    }
}
//9_detail //9_event_detail
function set_page_event_detail(data){
    bind_page_id(data.event);
    bind_detail(data);
    bind_photo(data);
    bind_photo_list(data.event.photos);
    bind_review(data.event);
    bind_event();
    init_cart();
    init_plugin();
    hide_spinner();
    function  bind_photo(data){
        //photos-start
        var str='';
        if(data.event.photofilename){
            str=str+"<div class='splide__slide'>"+
                "<a data-gallery='gallery-2' title='"+data.event.title+"' href='"+data.event.photo_obj.mid_url+"'>"+
                "<img  data-src='"+data.event.photo_obj.mid_url+"' src='"+data.event.photo_obj.mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
                "</a></div>";
            for(a=0;a<data.event.photos.length;a++){
                str=str+"<div class='splide__slide'>"+
                    "<a data-gallery='gallery-2' title='"+data.event.photos[a].text+"' href='"+data.event.photos[a].photo_obj.album_url+"'>"+
                    "<img src='"+data.event.photos[a].photo_obj.square_mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
                    "</a></div>";
            }
            //slide-show-start
            $('#biz_lbl_slideshow_list').html(str);
            init_slide_show('#single-slider-1');
            //slide-show-end
            //photos-end
        }else{
            $('#single-slider-1').hide();
        }
    }
    function bind_detail(data){
        set_page_title(data.mobile.primary.app_title);
        set_page_view_count(data.event.view_count);
        $('#biz_lbl_title').html(data.event.title);
        set_page_view_count(data.event.view_count);
        $('#biz_lbl_visible').html(data.event.visible_obj.event_status);
        $('#biz_lbl_card_visible').show();
        $('#biz_lbl_price').html(data.event.money_obj.price);
        if(data.event.money_obj.old_price && data.event.money_obj.old_price!='$0.00'){
            $('#biz_lbl_old_price').show();
            $('#biz_lbl_old_price').html(data.event.money_obj.old_price);
        }else{
            $('#biz_lbl_old_price').hide();
        }
        $('#biz_lbl_date').html(data.event.event_obj.start_date);
        $('#biz_lbl_time').html(data.event.event_obj.start_time);
        $('#biz_lbl_location').html(data.event.event_obj.location);
        $('#biz_lbl_link_calendar').attr('href',data.event.event_obj.start_google_calendar_url);
        $('#biz_lbl_card_date').show();
        $('#biz_div_left_info').show();
        $('#biz_btn_cart_add').show();
        if(data.event.money_obj.discount && String(data.event.money_obj.discount)!='0%'){
            $('#biz_div_discount').show();
            $('#biz_lbl_discount').html(data.event.money_obj.discount + ' Discount');
        }
        if(data.event.sub_note.length>1){
            $('#biz_lbl_card_description').show();
            $('#biz_lbl_sub_note').html(data.event.sub_note);
        }
         if(data.event.note){
            if(data.event.note.length>233){
                $('#biz_lbl_card_note').show();
                $('#biz_lbl_note').html(data.event.note);
                if($('#biz_lbl_note').html().length<3){
                    $('#biz_lbl_card_note').hide();
                }
            }
        }
       if(data.event.items.length>0){
            //$('#biz_lbl_option_list').show();
            for(a=0;a<data.event.items.length;a++){
                str='';
                $('#biz_lbl_optiondiv'+a).show();
                $('#biz_lbl_optiontitle'+a).html(data.event.items[a].title);
                str=str+ "<option value='"+data.event.items[a].tbl_id+"' disabled>"+data.event.items[a].title+"</option>";
                for(b=0;b<data.event.items[a].items.length;b++){
                    str=str+ "<option value='"+data.event.items[a].items[b].tbl_id+"'>"+data.event.items[a].items[b].title + " " + get_money(data.event.items[a].items[b].price) +"</option>";
                }
                $('#biz_sel_option'+a).html(str);
            }
        }
        //slide-show-youtube-start
        if(data.event.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.event.youtube_url));
        }
        if(data.event.mp3filename){
            $("#biz_lbl_card_mp3").show();
            $("#biz_lbl_mp3_duration").html(data.event.mp3duration);
            $("#biz_page_mp3_url").val(data.event.mp3_url);
            $("#biz_audio_track").attr('src',data.event.mp3_url);
            new Plyr('#biz_audio_track');
        }
        //app store product
        if(data.event.app_store_product=='true'){
            $("#biz_sp_checkout").show();
            $(".biz_btn_checkout").attr('biz_product_id',data.event.app_store_product_id);
            bind_one_click_buy();
        }
        if(data.card_double_list.length>1){
            bind_double_slide_show(data);
            $("#biz_lbl_double_card").show();
            init_double_slide_show('#slider_double');
        }
    }
    function bind_double_slide_show(data){
        var str='';
        $('#biz_lbl_double_category').html(data.event.category);
        $('#biz_lbl_double_slide_show_list').html('');
        for(var a=0;a<data.card_double_list.length;a++){
            if(String(data.card_double_list[a].visible)=='0'){
                    data.card_double_list[a].visible="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+data.card_double_list[a].visible_obj.event_status_short+"</p>";
                }else{
                    data.card_double_list[a].visible="<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+data.card_double_list[a].visible_obj.event_status_short+"</p>";
            }
            url='event_detail.html?title_url='+data.card_double_list[a].title_url;
            str=str+"<div class='splide__slide'>"+
                "<a href='"+url+"'><img src='"+data.card_double_list[a].photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
                "<div class='biz_div_stat_outer'>"+
                "<span class='font-12 pt-0 m-3'><i class='fa fa-eye color-gray-dark'></i> "+data.card_double_list[a].view_count +"</span>"+
                "</div>"+
                "<h5 class='text-center pt-2 mb-0'>"+data.card_double_list[a].money_obj.price+"</h5>"+
                visible_str +
                "<a href='"+url+"'><h4 class='text-center'>"+data.card_double_list[a].title+"</h4></a>"+
                "<p class='text-center font-12 mb-2'>"+
                data.card_double_list[a].sub_note+
                "</p>"+
                "<p class='mb-4 mt-3 text-center'>"+
                "<a id='biz_btn_cart3_add_"+data.card_double_list[a].tbl_id+"' tbl_id='"+data.card_double_list[a].tbl_id+"'  data_type='"+data.card_double_list[a].data_type+"' href='#' class='icon me-2 icon-s bg-white border border-gray-light rounded-s biz_btn_double_cart_slide_add'><i class='fa fa-shopping-cart color-black font-12'></i></a>"+
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
    function bind_photo_list(item_list){
        if(item_list.length>0){
            var str='';
            for(var a=0;a<item_list.length;a++){
                item_list[a].text = item_list[a].text ? item_list[a].text:'';
                str=str+"<a data-gallery='gallery-1' href='"+item_list[a].photo_obj.album_url+"' title='"+item_list[a].text+"'>"+
                    "<img src='"+item_list[a].photo_obj.square_mid_url+"' data-src='"+item_list[a].photo_obj.album_url+"' class='rounded-m preload-img shadow-l img-fluid' alt=''>"+
                    "<p class=' pt-2' style='text-align:center'>"+ truncate_str(item_list[a].text, 50) +"</p>"+
                    "</a>";
            }
            $('#biz_lbl_photo_list').html('');
            $('#biz_lbl_photo_list').html(str);
        }else{
            $('#biz_lbl_card_photo_list').hide();
        }
    }
    function bind_event(){
        //9_cart cart-start cart_add add_cart 9_add_cart-- 9_cart_add
        $("#biz_btn_cart_add").click(function() {
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            obj={};
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.data_type=$('#biz_page_data_type').val();
            obj.customer_id=get_user().customer_id;
            $(this).addClass("bg-click");
            $(this).html("Ticket Added To Cart!");
            if(option_item_1_tbl_id){
                obj.option_item_1_tbl_id=option_item_1_tbl_id;
            }
            if(option_item_2_tbl_id){
                obj.option_item_2_tbl_id=option_item_2_tbl_id;
            }if(option_item_3_tbl_id){
                obj.option_item_3_tbl_id=option_item_3_tbl_id;
            }if(option_item_4_tbl_id){
                obj.option_item_4_tbl_id=option_item_4_tbl_id;
            }
            cloud_order_cart_add(DT_EVENT,obj.tbl_id,obj,1,function(data){
            });
        });
    }
    function bind_double_slide_show(data){
        var str='';
        $('#biz_lbl_double_category').html(data.event.category);
        $('#biz_lbl_double_slide_show_list').html('');
        for(var a=0;a<data.card_double_list.length;a++){
            if(String(data.card_double_list[a].visible_obj.event_visible_id) =='0'){
                visible_str="<p class='color-red-dark font-12 text-center mb-0 font-12 mt-n2'>"+data.card_double_list[a].visible_obj.event_status_short+"</p>";
            }else{
                visible_str="<p class='color-green-dark font-12 text-center mb-0 font-12 mt-n2'>"+data.card_double_list[a].visible_obj.event_status_short+"</p>";
            }
            url='event_detail.html?title_url='+data.card_double_list[a].title_url;
            str=str+"<div class='splide__slide'>"+
                "<a href='"+url+"'><img src='"+data.card_double_list[a].photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
                "<div class='biz_div_stat_outer'>"+
                "<span class='font-12 pt-0 m-3'><i class='fa fa-eye color-gray-dark'></i> "+data.card_double_list[a].view_count +"</span>"+
                "</div>"+
                "<h5 class='text-center pt-2 mb-0'>"+data.card_double_list[a].money_obj.price+"</h5>"+
                visible_str +
                "<a href='"+url+"'><h4 class='text-center'>"+data.card_double_list[a].title+"</h4></a>"+
                "<p class='text-center font-12 m-3'>"+
                data.card_double_list[a].sub_note+
                "</p>"+
                "<p class='mb-4 mt-3 text-center'>"+
                "<a id='biz_btn_cart3_add_"+data.card_double_list[a].tbl_id+"' tbl_id='"+data.card_double_list[a].tbl_id+"'  data_type='"+data.card_double_list[a].data_type+"' href='#' class='icon me-2 icon-s bg-white border border-gray-light rounded-s biz_btn_double_cart_slide_add'><i class='fa fa-shopping-cart color-black font-12'></i></a>"+
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
//9_event_list 9_edit_list 9_list 9_dashboard_event_list //9_dashboard
function set_dashboard_event_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    bind_event_list_detail(data);
    bind_list(data.event_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_event_list_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Events');
    }
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(a=0;a<item_list.length;a++){
            visible_str='';
            if(String(item_list[a].visible_obj.event_visible_id)=='0'){
                visible_str="| <span> <i class='fa-sharp fa-solid fa-circle-xmark color-red-dark'></i> </span>";
            }else{
                visible_str="| <span><i class='fa-sharp fa-solid fa-circle-check color-green-dark'></i></span>";
            }
            app_store_str='';
            if(item_list[a].app_store_product=='true'){
                app_store_str="| <span> <i class='fa-sharp fa-solid fa-credit-card color-gray-dark'></i> </span>";
            }
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon a-gear'></i>"+
                "</a>";
            sub_item_edit_url="dashboard_sub_item_list.html?data_type="+item_list[a].data_type+"&tbl_id="+item_list[a].tbl_id+"&parent_data_type="+item_list[a].data_type+"&parent_tbl_id="+item_list[a].tbl_id;
            photo_edit_url="dashboard_photo_list.html?parent_data_type="+item_list[a].data_type+"&parent_tbl_id="+item_list[a].tbl_id;
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item_list[a].tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_event.html?title_url="+item_list[a].title_url+"'><img src='"+item_list[a].photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_div_list_title'><a href='dashboard_event.html?title_url="+item_list[a].title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-14'>"+item_list[a].title+"</b></p></a><div>"+
                "<span class='mb-0 ps-3 font-12 pt-1'><i class='fa fa-eye color-gray-dark'></i> "+item_list[a].view_count +"</span>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-12  opacity-60'><b>"+item_list[a].money_obj.price+"</b> | "  +item_list[a].category+ " " + app_store_str + " " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  'style='float:left;'>"+
                "<div class='biz_div_list_edit'><a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='#' href='event_detail.html?title_url="+item_list[a].title_url+"'><i class='admin_edit_img fa fa-eye pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='#' href='"+sub_item_edit_url+"'><i class='admin_edit_img fa fa-tags pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2 a-gear'></i></a>"+
                "<a tbl_id='"+item_list[a].tbl_id +"' data_type='"+item_list[a].data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2 a-gear'></i></a>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div>"+
                "</div></div>";
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_link_page").click(function() {
            page_current = $(this).attr('page_current');
            category='all';
            url='event/event_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.event_list,page_current,data.page_count);
            });
        });

        $(".biz_btn_edit_photo").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            camera_photo_select(function(data){
                post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img_'+tbl_id).attr('src',data.photo_square_thumb_url);
                });
            });
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_event.html?title_url=0';
        });
        $(".biz_btn_delete").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Are you sure?") == true) {
                cloud_delete(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
            		set_page_note(set_page_note_remove(parseInt($('#biz_page_item_list_count').val())));
					bind_page_list_count(parseInt($('#biz_page_item_list_count').val()));
               });
            }
        });
        $(".biz_btn_copy").click(function() {
            show_spinner();
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Are you sure?") == true) {
                url="item/copy_item/"+data_type+"/"+tbl_id;
                cloud_post_url(url,{},function(data){
                    window.location.reload();
                });
            }
        });
    }
}
//9_event_detail 9_event_edit 9_edit 9_dashboard_event_edit
function set_dashboard_event(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.event);
    bind_detail(data);
    bind_event();
    init_tab()
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        init_item_note(data.event.note);
        if(data.event.tbl_id==0){
            set_page_sub_title('Add Event');
            $('#biz_img').hide();
            $('#biz_div_mp3').hide();
        }else{
            set_page_sub_title('Edit Event');
            $('#biz_img').attr('src',data.event.photo_obj.square_mid_url);
        }
        $('#biz_tb_title').val(data.event.title);
        $('#biz_tb_sub_note').val(data.event.sub_note);
        $('#biz_tb_website').val(data.event.website);
        $('#biz_tb_meeting_link').val(data.event.meeting_link);
        $('#biz_tb_start_date').val(data.event.start_date);
        $('#biz_tb_start_time').val(data.event.start_time);
        $('#biz_tb_location').val(data.event.location);
        $('#biz_tb_youtube_url').val(data.event.youtube_url);
        $('#biz_tb_mp3_filename').val(data.event.mp3filename);
        //price-start
        if(data.event.price){
            data.event.price=data.event.price.replace('$','');
        }
        if(data.event.old_price){
            data.event.old_price=data.event.old_price.replace('$','');
        }
        $('#biz_tb_price').val(data.event.price);
        $('#biz_tb_old_price').val(data.event.old_price);
        //price-end
        $('#biz_tb_sub_note').val(data.event.sub_note);
        //visible-start
        var str='';
        for(a=0;a<data.event_visible_option_list.length;a++){
            str=str+ "<option value='"+a+"' selected>"+data.event_visible_option_list[a].text+"</option>";
        }
        $('#biz_sel_visible').html(str);
        $('#biz_sel_visible').val(data.event.visible);
        if(!data.event.visible){
            $('#biz_sel_visible').val(0);
        }
        //visible-end
        //category-start
        var str='';
        for(a=0;a<data.category_list.length;a++){
            str=str+ "<option value='"+data.category_list[a].title+"' selected>"+data.category_list[a].title+"</option>";
        }
        $('#biz_sel_category_list').html(str);
        $('#biz_sel_category_list').val(data.event.category);
        //category-end
        //in-app-event-start
        $('#biz_div_app_store_event_id').hide();
        $('#biz_tb_app_store_product_id').val(data.event.app_store_product_id);
        if(data.event.app_store_product=='true'){
            $('#biz_sel_app_store_product').val('true');
            $('#biz_div_app_store_product_id').show();
        }else{
            $('#biz_sel_app_store_product').val('false');
            $('#biz_div_app_store_product_id').hide();
        }
        $('#biz_sel_app_store_product').on('change', function (e) {
             var optionSelected = $(this).find("option:selected");
             var valueSelected  = optionSelected.val();
            $('#biz_div_app_store_product_id').hide();
            if(valueSelected=='true'){
                $('#biz_div_app_store_product_id').show();
            }
        });
        //in-app-product-end
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.title=$('#biz_tb_title').val();
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.price=$('#biz_tb_price').val();
            obj.old_price=$('#biz_tb_old_price').val();
            obj.website=$('#biz_tb_website').val();
            obj.meeting_link=$('#biz_tb_meeting_link').val();
            obj.start_date=$('#biz_tb_start_date').val();
            obj.start_time=$('#biz_tb_start_time').val();
            obj.location=$('#biz_tb_location').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.mp3filename=$('#biz_tb_mp3_filename').val();
            obj.app_store_product=$('#biz_sel_app_store_product').val();
            obj.app_store_product_id=$('#biz_tb_app_store_product_id').val();
            obj.title_url=get_title_url(obj.title);
            obj.note=get_item_note();
           if(!obj.title){
                show_toast_error('Please enter a valid title');
            }else if(!obj.category){
                show_toast_error('Please select a valid category');
            }else{
                cloud_update(data_type,tbl_id,obj, function(data){
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    $('#biz_img').show();
                    $('#biz_div_mp3').show();
                    show_toast_update();
                    return false;
                });
            }
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_event.html?title_url=0';
        });
        $("#biz_img").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            camera_photo_select(function(data){
                cloud_update(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img').attr('src',data.photo_obj.square_mid_url);
                    $('#biz_page_photofilename').val(data.photofilename);
                    return false;
                });
            });
        });
        $("#biz_tb_mp3_filename").click(function() {
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            file_mp3_select(function(data){
                cloud_update(data_type,tbl_id,{mp3filename:data.mp3filename,mp3duration:data.mp3duration},function(data){
                    $("#biz_tb_mp3_filename").val(data.mp3filename);
                    return false;
                });
            });
        });
    }
}

