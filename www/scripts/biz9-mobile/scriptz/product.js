//9_event_category_list //9_category_list
function set_page_product_category_list(data){
    set_page_title(data.mobile.primary.app_title);
    bind_slide_show_list(data.category_list);
    bind_category_list(data.category_list,data.page_current,data.page_count);
    bind_popular_list(data.popular_list,data.page_current,data.page_count);
    init_cart();
    hide_spinner();
    function bind_slide_show_list(item_list){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item = item_list[a];
            str=str+"<div class='splide__slide'>"+
                "<div class='card card-style'style='height:320px;background-image: url("+item.photo_obj.mid_url+")' >"+
                "<div class='card-bottom p-3'>"+
                "<p class='color-white opacity-60'>"+
                item.sub_note
                +"</p>"+
                "<a href='product_list.html?category="+item.title+"&page_current=1' class='btn btn-s font-700 text-uppercase rounded-s mb-4 biz_btn'>"+item.title+" (" + item.item_count + " items)</a>"+
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
            item = item_list[a];
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
                "<a href='product_list.html?category="+item.title+"&page_current=1'><div class='card card-style m-0 mb-2 rounded-m' style='background-image: url("+item.photo_obj.mid_url+")' data-card-height='150'>"+
                "<div class='card-bottom'><span class='badge "+color_str+"  p-2 ps-2 rounded-s'>"+item.title+" ("+item.item_count + " items)</span></div>"+
                "</div></a>";
            if(item.last_item_create.title){
                str=str+"<a href='product_list.html?category="+item.title+"&page_current=1'><p class='line-height-s color-theme mb-1'>"+item.last_item_create.title+"</p></a>"+
                    "<p class='mb-0 font-10 pt-1 opacity-60'><i class='fa fa-clock pe-2'></i>"+item.last_item_create.date_obj.pretty_create+"</p>";
            }
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
            item=item_list[a];
            url='product_detail.html?title_url='+item.title_url;
            url_category='product_list.html?category='+item.category+"&page_current=1";
            str=str+"<div class='d-flex mb-3'>"+
                "<div>"+
                "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='70' class='rounded-sm'></a>"+
                "</div>"+
                "<div>"+
                "<a href='"+url+"'><p class='font-12 ps-3 line-height-s color-theme mb-1'><b>"+item.title+"</b></p></a>"+
                "<p class='mb-0 ps-3 font-10 pt-0'>"+item.sub_note +"</p>"+
                "<p class='mb-0 ps-3 font-10 pt-0 opacity-60'>"+item.date_obj.month_create+ "  "+item.date_obj.date_create+ ",    "+item.date_obj.year_create+ " at " +item.date_obj.time_update + " | <a href='#'>"+item.category+"</a></p>"+
                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='mb-0 ps-3 font-10 pt-0'><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "</div>"+
                "<div class='divider mb-3'></div>";
        }
        $("#biz_lbl_popular_list").show();
        $('#biz_lbl_popular_list').html('');
        $('#biz_lbl_popular_list').html(str);
    }
}
//9_product_list 9_list
function set_page_product_list(data){
    set_page_title(data.mobile.primary.app_title);
    $('#biz_page_category').val(data.category);
    set_page_sub_title(data.category);
    set_page_sub_note("(" + data.item_count + " items)");
    bind_list(data.product_list,data.page_current,data.page_count);
    init_cart();
    hide_spinner();
    function bind_list(item_list,page_current,page_count){
        str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            if(String(item.visible_obj.product_visible_id) =='0'){
                visible_str="<p class='font-12 text-center mb-0 font-10 mt-n2 color-red'>"+item.visible_obj.product_status+"</p>";
            }else{
                visible_str="<p class='font-12 text-center mb-0 font-10 mt-n2 color-green-dark'>"+item.visible_obj.product_status+"</p>";
            }
            str=str+"<div class='col-6'>"+
                "<a href='product_detail.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' width='150' class='mx-auto'/></a>"+
                "<div style='text-align:center'>"+
                "<span class='font-10 pt-0 m-2'><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='font-10 pt-0 m-2'><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "<h5 class='text-center pt-2 mb-0'>"+item.money_obj.price+"</h5>"+
                visible_str+
                "<h4 class='text-center font-13 pt-2'>"+item.title+"</h4>"+
                "<p class='text-center font-11 mb-2'>"+
                item.sub_note+
                "</p>"+
                "<p class='mb-4 mt-3 text-center'>"+
                "<a  id='biz_btn_cart_add_"+item.tbl_id+"' tbl_id='"+item.tbl_id+"'  data_type='"+item.data_type+"' href='#' class='icon me-2 icon-s bg-white border border-gray-light rounded-s biz_btn_cart_add'><i class='fa fa-shopping-cart color-black font-12'></i></a>"+
                "<a href='#' class='icon icon-s bg-white border border-gray-light rounded-s'><i class='fa fa-heart color-red-dark font-12'></i></a>"+
                "</p>"+
                "</div>";
            if(a==1||a==3||a==5||a==7||a==9||a==11||a==13||a==15||a==17){
                str=str+"<div class='divider w-100'></div>";
            }
        }
        $('#biz_lbl_list').html('');
        $('#biz_lbl_list').html(str);
        $('#biz_lbl_pager').html(get_pager_ajax(page_current,page_count));
        bind_events();
    }
    function bind_events(){
        $(".biz_btn_cart_add").click(function() {
            var obj={};
            tbl_id=$(this).attr('tbl_id');
            obj.data_type=$(this).attr('data_type');
            obj.customer_id=get_user().customer_id;
            $('#biz_btn_cart_add_'+obj.tbl_id).addClass("bg-click");
            $('#biz_btn_cart_add_'+obj.tbl_id).html("<i class='fa fa-shopping-cart color-red font-12'></i>");
            cloud_order_cart_add(DT_PRODUCT,tbl_id,obj,1,function(data){
            });
        });
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category=$('#biz_page_category').val();
            url='product/product_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.product_list,page_current,data.page_count);
            });
        });
    }
}
//9_detail //9_product_detail
function set_page_product_detail(data){
    bind_page_id(data.product);
    bind_detail(data);
    bind_photo(data);
    bind_photo_list(data.product.photos);
    bind_event();
    bind_review(data.product);
    init_cart();
    init_plugin();
    hide_spinner();
    function  bind_photo(data){
        //photos-start
        var str='';
        if(data.product.photofilename){
            str=str+"<div class='splide__slide'>"+
                "<a data-gallery='gallery-2' title='"+data.product.title+"' href='"+data.product.photo_obj.mid_url+"'>"+
                "<img  data-src='"+data.product.photo_obj.mid_url+"' src='"+data.product.photo_obj.mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
                "</a></div>";
            for(a=0;a<data.product.photos.length;a++){
                str=str+"<div class='splide__slide'>"+
                    "<a data-gallery='gallery-2' title='"+data.product.photos[a].text+"' href='"+data.product.photos[a].photo_obj.album_url+"'>"+
                    "<img src='"+data.product.photos[a].photo_obj.square_mid_url+"' class='mx-auto pb-4' style='width:200px!important;'>"+
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
        $('#biz_lbl_title').html(data.product.title);
        set_page_view_count(data.product.view_count);
        $('#biz_lbl_visible').html(data.product.visible_obj.product_status);
        $('#biz_lbl_card_visible').show();
        $('#biz_lbl_price').html(data.product.money_obj.price);
        $('#biz_lbl_old_price').html(data.product.money_obj.old_price);
        $('#biz_div_left_info').show();
        $('#biz_btn_cart_add').show();
        if(data.product.money_obj.discount && String(data.product.money_obj.discount)!='0%'){
            $('#biz_div_discount').show();
            $('#biz_lbl_discount').html(data.product.money_obj.discount + ' Discount');
        }
        if(data.product.sub_note.length>1){
            $('#biz_lbl_card_description').show();
            $('#biz_lbl_sub_note').html(data.product.sub_note);
        }
        if(data.product.note){
            if(data.product.note.length>5){
                $('#biz_lbl_card_note').show();
                $('#biz_lbl_note').html(data.product.note);
                if($('#biz_lbl_note').html().length<3){
                    $('#biz_lbl_card_note').hide();
                }
            }
        }
        if(data.product.items.length>0){
            $('#biz_lbl_option_list').show();
        for(a=0;a<data.product.items.length;a++){
            str='';
            $('#biz_lbl_optiondiv'+a).show();
            $('#biz_lbl_optiontitle'+a).html(data.product.items[a].title);
            str=str+ "<option value='"+data.product.items[a].tbl_id+"' disabled>"+data.product.items[a].title+"</option>";
            for(b=0;b<data.product.items[a].items.length;b++){
                str=str+ "<option value='"+data.product.items[a].items[b].tbl_id+"'>"+data.product.items[a].items[b].title + " " + get_money(data.product.items[a].items[b].price) +"</option>";
            }
            $('#biz_sel_option'+a).html(str);
        }
        }
        if(data.product.youtube_url){
            $("#biz_lbl_card_youtube").show();
            $("#biz_lbl_youtube_link").attr('src',get_youtube_link(data.product.youtube_url));
        }
        if(data.product.mp3filename){
            $("#biz_lbl_card_mp3").show();
            $("#biz_lbl_mp3_duration").html(data.product.mp3duration);
            $("#biz_page_mp3_url").val(data.product.mp3_url);
        }
        if(data.card_double_list.length>1){
            bind_double_slide_show(data);
            $("#biz_lbl_double_card").show();
            init_double_slide_show('#slider_double');
        }
    }
    function bind_double_slide_show(data){
        var str='';
        $('#biz_lbl_double_category').html(data.product.category);
        $('#biz_lbl_double_slide_show_list').html('');
        for(var a=0;a<data.card_double_list.length;a++){
            var item = data.card_double_list[a];
            visible_str="<p class='color-red-dark font-12 text-center mb-0 font-10 mt-n2'>"+item.visible_obj.product_status_short+"</p>";
            url='product_detail.html?title_url='+item.title_url;
            str=str+"<div class='splide__slide'>"+
                "<a href='"+url+"'><img src='"+item.photo_obj.square_mid_url+"' width='100' class='mx-auto'></a>"+
                "<div class='biz_div_stat_outer'>"+
                "<span class='font-10 pt-0 m-3'><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='font-10 pt-0 m-3'><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "<h5 class='text-center pt-2 mb-0'>"+item.money_obj.price+"</h5>"+
                visible_str +
                "<a href='"+url+"'><h4 class='text-center font-13'>"+item.title+"</h4></a>"+
                "<p class='text-center font-11 mb-2'>"+
                item.sub_note+
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
    function bind_photo_list(item_list){
        if(item_list.length>0){
            var str='';
            for(var a=0;a<item_list.length;a++){
                item = item_list[a];
                item.text = item.text ? item.text:'';
                str=str+"<a data-gallery='gallery-1' href='"+item.photo_obj.album_url+"' title='"+item.text+"'>"+
                    "<img src='"+item.photo_obj.square_mid_url+"' data-src='"+item.photo_obj.album_url+"' class='rounded-m preload-img shadow-l img-fluid' alt=''>"+
                    "<p class=' pt-2' style='text-align:center'>"+ truncate_str(item.text, 50) +"</p>"+
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
            hide_toast();
            $('#biz_btn_cart_add').addClass("bg-click");
            $('#biz_btn_cart_add').html("Added to Cart!");
            option_item_1_tbl_id=$('#biz_sel_option0').val();
            option_item_2_tbl_id=$('#biz_sel_option1').val();
            option_item_3_tbl_id=$('#biz_sel_option2').val();
            option_item_4_tbl_id=$('#biz_sel_option3').val();
            obj={};
            obj.tbl_id=$('#biz_page_tbl_id').val();
            obj.data_type=$('#biz_page_data_type').val();
            obj.customer_id=get_user().customer_id;
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
            cloud_order_cart_add(DT_PRODUCT,obj.tbl_id,obj,1,function(data){
                return false;
            });
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
// 9_product_edit 9_edit 9_dashboard_product_edit
function set_dashboard_product(data){
    hide_footer();
    hide_cart();
    bind_page_id(data.product);
    bind_detail(data);
    bind_event();
    init_tab();
    init_form();
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        init_item_note(data.product.note);
        if(data.product.tbl_id==0){
            set_page_sub_title('Add Product');
            $('#biz_img').hide();
            $('#biz_div_mp3').hide();
        }else{
            set_page_sub_title('Edit Product');
            $('#biz_img').attr('src',data.product.photo_obj.square_mid_url);

        }
        $('#biz_tb_title').val(data.product.title);
        if(data.product.price){
            data.product.price=String(data.product.price).replace('$','');
        }
        if(data.product.old_price){
            data.product.old_price=String(data.product.old_price).replace('$','');
        }
        $('#biz_tb_youtube_url').val(data.product.youtube_url);
        $('#biz_tb_mp3_filename').val(data.product.mp3filename);
        $('#biz_tb_price').val(data.product.price);
        $('#biz_tb_old_price').val(data.product.old_price);
        $('#biz_tb_sub_note').val(data.product.sub_note);
        //visible-start
        var str='';
        for(a=0;a<data.product_visible_option_list.length;a++){
            str=str+ "<option value='"+a+"' selected>"+data.product_visible_option_list[a].text+"</option>";
        }
        $('#biz_sel_visible').html(str);
        $('#biz_sel_visible').val(data.product.visible);
        if(!data.product.visible){
            $('#biz_sel_visible').val(0);
        }
        //visible-end
        var str='';
        for(a=0;a<data.category_list.length;a++){
            str=str+ "<option value='"+data.category_list[a].title+"' selected>"+data.category_list[a].title+"</option>";
        }
        $('#biz_sel_category_list').html(str);
        $('#biz_sel_category_list').val(data.product.category);
    }
    function bind_event(){
        $("#biz_btn_update").click(function() {
            var obj={};
            tbl_id= $('#biz_page_tbl_id').val();
            data_type= $('#biz_page_data_type').val();
            obj.photofilename=$('#biz_page_photofilename').val();
            obj.title=$('#biz_tb_title').val();
            obj.price=$('#biz_tb_price').val();
            obj.old_price=$('#biz_tb_old_price').val();
            obj.category=$('#biz_sel_category_list').val();
            obj.sub_note=$('#biz_tb_sub_note').val();
            obj.youtube_url=$('#biz_tb_youtube_url').val();
            obj.mp3filename=$('#biz_tb_mp3_filename').val();
            obj.visible=$('#biz_sel_visible').val();
            obj.title_url=get_title_url(obj.title);
            obj.note=get_item_note();
           if(!obj.title){
                show_toast_error('Please enter a valid title');
            }else if(!obj.category){
                show_toast_error('Please select a valid category');
            }else{
                cloud_update(data_type,tbl_id,obj, function(data){
                    $('#biz_img').show();
                    $('#biz_page_tbl_id').val(data.tbl_id);
                    $('#biz_div_mp3').show();
                    show_toast_update();
                    return false;
                });
            }
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_product.html?title_url=0';
        });
        //img
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
        //mp3
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
//9_product_list 9_edit_list 9_list 9_dashboard_product_list //9_dashboard //9_dashboard_list //9_edit_list
function set_dashboard_product_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    bind_detail(data);
    bind_list(data.product_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Products');
        set_page_note("(" + data.item_count + " items)");
    }
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(a=0;a<item_list.length;a++){
            item = item_list[a];
            if(String(item.visible_obj.product_visible_id)=='0'){
                visible_str="<span class='color-red-dark'> <i class='fa-sharp fa-solid fa-circle-xmark'></i> </span>";
            }else{
                visible_str="<span class='color-green-dark'><i class='fa-sharp fa-solid fa-circle-check'></i></span>";
            }
            edit_str= "<a class='accordion-btn no-effect collapsed' data-bs-toggle='collapse' data-bs-target='#collapse"+a+"' aria-expanded='false'>"+
                "<i class='fa fa-gear font-14 accordion-icon'></i>"+
                "</a>";
            sub_item_edit_url="dashboard_sub_item_list.html?data_type="+item.data_type+"&tbl_id="+item.tbl_id+"&parent_data_type="+item.data_type+"&parent_tbl_id="+item.tbl_id;
            photo_edit_url="dashboard_photo_list.html?parent_data_type="+item.data_type+"&parent_tbl_id="+item.tbl_id;
            str = str+ "<div class='d-flex mb-3' id='biz_row_"+ item.tbl_id+"'>"+
                "<div>"+
                "<a href='dashboard_product.html?title_url="+item.title_url+"'><img src='"+item.photo_obj.square_mid_url+"' class='rounded-sm' width='70'></a>"+
                "</div>"+
                "<div class='biz_diz_list_title'><a href='dashboard_product.html?title_url="+item.title_url+"'><p class='ps-3 line-height-s color-theme mb-1'><b class='font-11'>"+item.title+"</b></p></a><div>"+
                "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-eye color-blue-dark'></i> "+item.view_count +"</span>"+
                "<span class='mb-0 ps-3 font-11 pt-1 '><i class='fa fa-comment color-brown-dark'></i> "+item.review_count +"</span>"+
                "</div>"+
                "<p class='mb-0 ps-3 font-10  opacity-60'><b>"+item.money_obj.price+"</b> | "  +item.category+" | " + visible_str + " " + edit_str+ " </p>"+
                "<div class='accordion ' id='accordion-"+a+"'>"+
                "<div class=''>"+
                "<div id='collapse"+a+"' class='collapse bg-theme' data-bs-parent='#accordion-"+a+"'>"+
                "<div class='mb-0 ps-3  ' style='float:left;'>"+
                "<div class='biz_diz_list_edit'><a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='product_detail.html?title_url="+item.title_url+"'><i class='admin_edit_img fa fa-eye pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+photo_edit_url+"'><i class='admin_edit_img fa fa-camera pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='#' href='"+sub_item_edit_url+"'><i class='admin_edit_img fa fa-tags pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_copy' href='#'><i class='admin_edit_img fa fa-copy pe-2'></i></a>"+
                "<a tbl_id='"+item.tbl_id +"' data_type='"+item.data_type +"' class='biz_btn_delete' href='#'><i class='admin_edit_img fa fa-trash pe-2'></i></a>"+
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
        $(".biz_link_page").click(function(e) {
            e.stopPropagation();
            $('#biz_lbl_list').html('');
            page_current = $(this).attr('page_current');
            category='all';
            url='product/product_list/'+category +"/"+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.product_list,page_current,data.page_count);
            });
        });
        $("#biz_btn_add").click(function() {
            window.location='dashboard_product.html?title_url=0';
        });
        $(".biz_btn_copy").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Copy?") == true) {
                show_spinner();
                url="item/copy_item/"+data_type+"/"+tbl_id;
                cloud_post_url(url,{},function(data){
                    window.location.reload();
                });
            }
        });
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
        $(".biz_btn_edit_photo").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            camera_photo_select(function(data){
                post_crud_update_item(data_type,tbl_id,{photofilename:data.photofilename},function(data){
                    $('#biz_img_'+tbl_id).attr('src',data.photo_square_thumb_url);
                });
            });
        });
    }
}
function get_product_visible_str(product_visible_id){
    switch(String(product_visible_id)){
        case '0':
            return 'Out of stock';
        case '1':
            return 'Only 1 left';
        case '2':
            return 'Less than 3 left';
        case '3':
            return 'In stock. Ships Immediately';
        default:
            return 'Out of stock';
    }
}
//-- PRODUCT PROCESSING END --

