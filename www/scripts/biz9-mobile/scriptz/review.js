//hidden
//biz_page_tbl_id
//biz_page_data_type
//biz_page_review_count
//biz_page_rating_avg
//detail
//biz_lbl_list_review
//biz_lbl_review_title
//biz_lbl_rating_count
//biz_lbl_review_star_count
//form
//biz_tb_review_name
//biz_tb_review_comment
//biz_btn_review_add

function bind_review(item){
   //review and review-start
    if(item.review_obj){
        $('#biz_page_review_count').val(item.review_obj.review_list.length);
        $('#biz_page_rating_avg').val(item.review_obj.rating_avg);
        bind_detail_review_count_star_str();
        if(item.review_obj.review_list.length>0){
        $('#biz_lbl_card_list_review').show();
            for(a=0;a<item.review_obj.review_list.length;a++){
                review = item.review_obj.review_list[a];
                $('#biz_lbl_list_review').append(set_review_list_str(review));
                bind_review_delete_event(review.tbl_id);
            }
        }else{
            $('#biz_lbl_card_list_review').hide();
        }
        bind_review_add_event();
        //test start --
        //bind_test();
        function bind_test(){
        //review and review-end
        $("#biz_tb_review_name").val(get_id(999)+'_Full Name');
        $("#biz_tb_review_comment").val(get_id(999)+"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
        }
        //test end --
    }
}
function bind_detail_review_count_star_str(){
    review_count=parseInt($('#biz_page_review_count').val());
    review_avg=parseInt($('#biz_page_rating_avg').val());
    if(isNaN(review_count)){
        review_count=0;
    }
    if(isNaN(review_avg)){
        review_avg=0;
    }
    //detail_count
    $('#biz_lbl_review_title').html('Reviews ('+ review_count + ')');
    if(review_count){
        review_str='reviews';
        if(review_count==1){
            review_str='review';
        }
        $('#biz_lbl_rating_count').html('Based on '+ review_count + ' ' + review_str);
    }else{
        $('#biz_lbl_rating_count').html('No reviews. Be the first to write one.');
    }
    //detail_star
    var str='';
    for(a=0;a<parseInt(review_avg);a++){
        str=str+"<i class='fa fa-star pe-1'></i>";
    }
    if(str){
        str = str + ' ';
    }
    $("#biz_lbl_review_star_count").html(str);
}
function set_review_list_str(review){
    str='';
    review_date = review.date_obj.month_create + " " + review.date_obj.date_create + ", " + review.date_obj.year_create;
    review_time = review.date_obj.time_create;
    review.comment=review.comment?review.comment:'';
    str = str+"<div class='mb-4' id='biz_row_"+review.tbl_id+"'>"+
        "<div class='d-flex'>"+
        "<div class='flex-grow-1'>"+
        "<h1 class='float-start font-40 font-800 mt-1 me-3'>"+review.rating+"</h1>"+
        "<h5 class='font-11 font-500 mb-n1'>out of 5 rating</h5>"+
        "<span>";
    for(b=0;b<parseInt(review.rating);b++){
        str=str+"<i class='fa fa-star color-yellow-dark'></i>";
    }
    str = str+" </span>"+
        "</div>"+
        "<div>"+
        "<h6 class='mb-0 mt-1 text-end'>"+review.name+"</h6>"+
        "<p class='font-10 mb-0 mt-n2 opacity-40 text-end'>"+review_date + "</p>"+
        "<p class='font-8 mb-0 mt-n3 opacity-40 text-end'>"+review_time + "</p>"+
        "</div>"+
        "</div>"+
        "<p class='mt-3'>"
        +review.comment+
        "</p>";
    if(get_user().customer_id==review.customer_id){
        str = str + "<p class='mt-3'>"+
            "<a id='biz_btn_delete_"+review.tbl_id+"' tbl_id='"+review.tbl_id +"' data_type='"+review.data_type +"'  href='#'><i class='admin_edit_img fa fa-trash pe-2'></i></a>"+
            "</p>";
    }
    str=str+ "</div>";

    return str;
}
function get_star_str(count){
    var str='';
    for(var b=0;b<count;b++){
        str=str+ "<i class='fa fa-star color-yellow-dark'></i>";
    }
    return str;
}
function bind_review_delete_event(tbl_id){
    $("#biz_btn_delete_"+tbl_id).click(function(e) {
        e.stopPropagation();
        parent_data_type=$('#biz_page_data_type').val();
        parent_tbl_id=$('#biz_page_tbl_id').val();
        data_type = $(this).attr('data_type');
        tbl_id = $(this).attr('tbl_id');
        if (confirm("Delete?") == true) {
            url = "item/review_delete/"+tbl_id+"/"+parent_data_type+"/"+parent_tbl_id;
            cloud_post_url(url,{},function(data){
                $('#biz_row_'+tbl_id).remove();
                $('#biz_page_review_count').val(data.item.review_obj.review_list.length);
                $('#biz_page_rating_avg').val(data.item.review_obj.rating_avg);
                bind_detail_review_count_star_str();
            });
        }
        return false;
    });
}
function bind_review_add_event(){
    $("#biz_btn_review_add").click(function(e) {
        hide_toast();
        e.stopPropagation();
        obj={};
        obj.parent_data_type=$('#biz_page_data_type').val();
        obj.parent_tbl_id=$('#biz_page_tbl_id').val();
        obj.name=$('#biz_tb_review_name').val();
        obj.rating=$('#biz_sel_review_rating').val();
        obj.comment=$('#biz_tb_review_comment').val();
        obj.customer_id=get_user().customer_id;
        if(!obj.name){
            show_toast_error('Please enter a name');
        }else if(!obj.rating){
            show_toast_error('Please select a rating');
        }else{
            url = "item/review_update/"+obj.parent_data_type+"/"+obj.parent_tbl_id;
            cloud_post_url(url,obj,function(data){
                $('#biz_lbl_card_list_review').show();
                $('#biz_lbl_list_review').prepend(set_review_list_str(data.review));
                $('#biz_page_review_count').val(data.item.review_obj.review_list.length);
                $('#biz_page_rating_avg').val(data.item.review_obj.rating_avg);
                bind_review_delete_event(data.review.tbl_id);
                bind_detail_review_count_star_str();
                $('#biz_tb_review_name').val('');
                $('#biz_tb_review_comment').val('');
            });
        }
        return false;
    });
}
//9_review_list 9_dashboard_review_list
function set_dashboard_review_list(data){
    hide_footer();
    hide_cart();
    bind_page_list_count(data.item_count);
    bind_detail(data);
    bind_list(data.review_list,data.page_current,data.page_count);
    hide_spinner();
    function bind_detail(data){
        set_page_title('Dashboard');
        set_page_sub_title('Reviews');
        set_page_note("(" + data.item_count + " items)");
    }
    function get_review_star_str(count){
        var str='';
        for(a=0;a<parseInt(count);a++){
            str=str+"<i class='fa fa-star pe-1'></i>";
        }
        if(str){
            str = str + ' ';
        }
        return str;
    }
    function bind_list(item_list,page_current,page_count){
        var str='';
        for(var a=0;a<item_list.length;a++){
            item = item_list[a];
            date_str=item.date_obj.month_create+" "+item.date_obj.date_create+ ", "+item.date_obj.year_create +' ' + item.date_obj.time_create;
            str =str+"<div class='card card-style pb-2 mb-2' id='biz_row_"+item.tbl_id+"'>"+
"<a data-bs-toggle='collapse' href='#invoice-"+item.tbl_id+"' aria-expanded='false' aria-controls='invoice-"+item.tbl_id+"' class='mb-2'>"+
"<div class='content mb-0'>"+
"<div class='d-flex mb-n1'>"+
"<div class='align-self-center'>"+
"<h3 class='font-20 font-700'>"+item.name+"</h3>"+
"<p class='font-10 mt-n2'>"+date_str+" - <span id='biz_lbl_order_status_"+item.tbl_id+"'>" + get_review_star_str(item.rating) +"</span></p>"+
"</div>"+
"<div class='ms-auto text-center mt-2'>"+
"<i class='fa fa-plus font-18 color-theme'></i>"+
"</div>"+
"</div>"+
"</div>"+
"</a>"+
"<div class='collapse' id='invoice-"+item.tbl_id+"'>"+
"<div class='row mb-3 m-1'>"+
"<p> "+item.comment+"</p>"+
"</div>"+
"<div class='divider'></div>"+
                "<a href='#' tbl_id='"+item.tbl_id+"' data_type='"+item.data_type+"' data-menu='menu-option-1' class='biz_btn_review_delete btn m-2  ml-3 btn-half btn-l rounded-s font-800 text-uppercase bg-red-dark'>Delete</a>"+
"<a href='#' tbl_id='"+item.parent_tbl_id+"' data_type='"+item.parent_data_type+"' data-menu='menu-option-1' class='biz_btn_review_view btn m-2 btn-half btn-l rounded-s font-800 text-uppercase bg-green-dark'>View</a>"+
"</div>"+
"</div>"+
"</div>";
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
            url='order/order_list/'+page_current;
            cloud_get_url(url,{},function(data){
                bind_list(data.order_list,page_current,data.page_count);
            });
        });
        $(".biz_btn_review_delete").click(function() {
            data_type = $(this).attr('data_type');
            tbl_id = $(this).attr('tbl_id');
            if (confirm("Delete?") == true) {
                cloud_delete(data_type,tbl_id,function(data){
                    $('#biz_row_'+tbl_id).remove();
                    item_count=String(parseInt($('#biz_page_item_list_count').val())-1);
                    bind_page_list_count(item_count);
                    set_page_note("(" + item_count + " items)");
       });
            }
        });
        $(".biz_btn_review_view").click(function() {
            parent_data_type = $(this).attr('data_type');
            parent_tbl_id = $(this).attr('tbl_id');
            var r_url='';
            switch(parent_data_type) {
                case DT_PRODUCT:
                    r_url='product_detail.html'
                    break;
                case DT_SERVICE:
                    r_url='service_detail.html'
                    break;
                case DT_EVENT:
                    r_url='event_detail.html'
                    break;
                case DT_BLOG_POST:
                    r_url='blog_post_detail.html'
                    break;
                case DT_GALLERY:
                    r_url='gallery_detail.html'
                    break;
            }
            cloud_get(parent_data_type,parent_tbl_id,function(data){
                window.location=r_url+'?title_url='+data.title_url;
            });
        });
    }
}
