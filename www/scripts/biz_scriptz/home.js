//9_home
function set_page_home(data){
    $('#biz_primary_app_title').html(data.primary.app_title);
    $('.biz_card').hide();
    $('#biz_btn_home_top_text').hide();
    //slide show
    if(data.slideshow.slideshow_visible=='true'){
        $('#single-slider-1').show();
        var str='';
        for(var a=0;a<data.slideshow.photos.length;a++){
            str=str+"<div class='splide__slide center-text'>"+
                "<div data-card-height='250' class='card card-style' style='background-image: url("+data.slideshow.photos[a].mid_photo_url+")'>"+
                "<div class='card-bottom text-center'>"+
                //"<h1 class='font-24 mb-0 font-700 color-white'>Header</h1>"+
                //"<p class='mt-n2 pb-2 color-white font-12 opacity-80'>Sub Note</p></div>"+
                "</div><div class='card-overlay bg-gradient'></div></div></div>";
        }
        $('#biz_slide_show_list').html(str);
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
    }else{
        $('#single-slider-1').remove();
    }
    //slideshow button
    if(data.slideshow.slideshow_button_visible=='true'){
        $('#biz_btn_home_top_text').show();
        $("#biz_btn_home_top_text").attr('class',"btn btn-center-m btn-m rounded-xl "+data.slideshow.slideshow_button_color+" font-700 text-uppercase under-slider-btn mb-4");
        //$('#biz_btn_home_top_text').attr('href',data.slideshow.slideshow_button_link+'.html');
        $("#biz_btn_home_top_text").click(function() {
            location=data.slideshow.slideshow_button_link+'.html';
        });
        if(data.slideshow.slideshow_button_text){
            $('#biz_btn_home_top_text').html(data.slideshow.slideshow_button_text);
        }
    }else{
        $('#biz_btn_home_top_text').remove();
    }
    //welcome section
    //youtube
    if(data.welcome.welcome_type=='youtube'){
        $('#biz_div_card_youtube').show();
        $('#biz_iframe_youtube').attr('src',data.welcome.youtube_link);
        $('#biz_title_youtube').html(data.welcome.youtube_title);
        $('#biz_note_youtube').html(data.welcome.youtube_note);
    }else{
        $('#biz_div_card_youtube').remove();
    }
    //image
    if(data.welcome.welcome_type=='image'){
        $('#biz_div_card_image').show();
        $('#biz_image_title').html(data.welcome.image_title);
        $('#biz_image_sub_note').html(data.welcome.image_sub_note);
        if(data.welcome.photofilename){
            $('#biz_div_card_image').css("background-image", "url('"+ data.welcome.mid_photo_url+"')");
        }
    }else{
        $('#biz_div_card_image').remove();
    }
    //editor
    if(data.welcome.welcome_type=='editor'){
        $('#biz_div_card_editor').show();
        $('#biz_welcome_section_header').html(data.welcome.editor_header);
        $('#biz_welcome_section_note').html(data.welcome.editor_note);
    }else{
        $('#biz_div_card_editor').remove();
    }
    if(data.welcome.welcome_type=='gallery'){
        $('#biz_gallery_title').html(data.welcome.gallery_title);
        $('#biz_gallery_sub_note').html(data.welcome.gallery_sub_note);
        str='';
        for(a=0;a<data.gallery.photos.length;a++){
            if(!data.gallery.photos[a].note){
                data.gallery.photos[a].note='';
            }
            str=str+"<a href='"+data.gallery.photos[a].album_photo_url+"' data-gallery='gallery-1' class='filtr-item filteredOut' title='"+data.gallery.photos[a].note+"' data-category='1' style='opacity: 0; transform: scale(0.5) translate3d(0px, 0px, 0px);backface-visibility: hidden; perspective: 1000px; transform-style: preserve-3d; position: absolute; width: 133px; transition: all 0.5s ease-out 0ms, width 1ms ease 0s; z-index: -1000;'>"+
                "<img src='"+data.gallery.photos[a].mid_photo_url+"' data-src='"+data.gallery.photos[a].album_photo_url+"' class='preload-img rounded-s shadow-m entered loaded' alt='"+data.gallery.photos[a].note+"' data-ll-status='loaded'>"+
                "</a>";
        }
        if(str!=null){
            $('#biz_div_card_gallery').show();
            $('#biz_gallery_list').html(str);
        }
    }else{
        $('#biz_div_card_gallery').remove();
    }
    //feature list
    var str='';
    for(a=0;a<data.home_feature_list.length;a++){
        data.home_feature_list[a].title=data.home_feature_list[a].title?(data.home_feature_list[a].title):'';
        data.home_feature_list[a].sub_note=data.home_feature_list[a].sub_note?(data.home_feature_list[a].sub_note):'';
        if(data.home_feature_list[a].data_type=='product_biz'){
            link = 'product_detail';
        }else{
            link='service_detail';
        }
        str=str+"<div class='splide__slide ps-3'>"+
            "<a href='"+link+".html?title_url="+data.home_feature_list[a].title_url+"'>"+
            "<div data-card-height='250' class='card mx-0 card-style'  style='background-image: url("+data.home_feature_list[a].mid_photo_url+")'>"+
            "<div class='card-bottom mx-3'>"+
            "<h1 class='color-white font-25'>"+data.home_feature_list[a].title+"</h1>"+
            //<!--"<p class='mt-n2 mb-2 color-white opacity-70 font-11'>"+data.home_feature_list[a].sub_note+"</p>"+--!>
            "</div>"+
            "<div class='card-overlay bg-gradient'></div>"+
            "</div>"+
            "</a>"+
            "</div>";
    }
    $('#biz_feature_list').html(str);
    var doubleSlider = document.querySelectorAll('.double-slider');
    if(doubleSlider.length){
        doubleSlider.forEach(function(e){
            var double = new Splide( '#'+e.id, {
                type:'loop',
                autoplay:true,
                interval:4000,
                arrows:false,
                perPage: 2,
            }).mount();
        });
    }
    //comment
    if(data.comment.visible=='true'){
        $('#biz_card_comment_list').show();
        $('#biz_testimonial_header').html(data.comment.header);
        $('#biz_testimonial_sub_note').html(data.comment.sub_note);
        $("#biz_btn_comment_add").attr('class',"btn btn-m btn-full mb-3 rounded-xs text-uppercase font-900 shadow-s "+data.comment.button_color);
        if(data.comment_list.length>0){
            str='';
            str="<div class='splide single-slider slider-no-arrows slider-no-dots' id='single-slider-2'>"+
                "<div class='splide__track'><div class='splide__list'>";
            for(a=0;a<data.comment_list.length;a++){
                data.comment_list[a].name = data.comment_list[a].name?(data.comment_list[a].name):'';
                data.comment_list[a].comment = data.comment_list[a].comment?(data.comment_list[a].comment):'';
                data.comment_list[a].location = data.comment_list[a].location?(data.comment_list[a].location):'';
                str=str+"<div class='splide__slide'>"+
                    "<h2 class='text-center font-200 line-height-xl mb-2 pb-1 mx-5'>"+
                    data.comment_list[a].comment+
                    "</h2>"+
                    "<a href='#' class='d-block text-center font-13 pb-3 font-700'>"+data.comment_list[a].name+"<br/>"+ data.comment_list[a].location+"</a>"+
                    "</div>";
            }
            str=str+"</div></div></div>";
            $('#biz_div_comment_list').html(str);
            //Image Sliders
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
    }
    load_plugins();
}

