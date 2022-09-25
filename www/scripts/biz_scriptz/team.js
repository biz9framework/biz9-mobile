function set_page_team_list(data){
    //primary_app_title
    $('#biz_primary_app_title').html(data.primary.app_title);
    //
    $('#biz_btn_lbl').html(data.team.btn_contact);
    //team_list
    var str='';
    str="<div class='row mb-0'>";
    for(a=0;a<data.team_list.length;a++){
        data.team_list[a].position=data.team_list[a].position?(data.team_list[a].position):'';
        data.team_list[a].bio=data.team_list[a].bio?(data.team_list[a].bio):'';
        str=str+ "<div class='col-6'>"+
            "<div class='bg-theme rounded-m py-3 text-center'>"+
            "<img src='"+data.team_list[a].mid_photo_url+"' class='gradient-green mx-auto rounded-xl' width='100'>"+
            "<h2 class='pt-3'>"+data.team_list[a].title+"</h2>"+
            "<p class='mt-n2 color-blue-dark'>"+data.team_list[a].position+"</p>";

        str=str+"<p class='text-center pb-3'>"+data.team_list[a].bio+"</p></div>";
        str=str+"</div>";
    }
    $('#biz_div_team_list').html(str);
}


