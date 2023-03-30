//9_register
function set_page_register(data){
    hide_footer();
    $('#biz_primary_app_title').html('Register');
    //test
    $('#biz_tb_register_first_name').val(get_id()+'_first_name');
    $('#biz_tb_register_last_name').val(get_id()+'_last_name');
    $('#biz_tb_register_email').val('ceo@bossappz.com');
    $('#biz_tb_register_password').val('1234567');
    //
    load_validate_fields();
    $("#biz_btn_register_update").click(function() {
        var obj={};
        obj.first_name= $('#biz_tb_register_first_name').val();
        obj.last_name= $('#biz_tb_register_last_name').val();
        obj.email= $('#biz_tb_register_email').val();
        obj.password= $('#biz_tb_register_password').val();
        if(!validate_email(obj.email)){
            alert('please enter a valid email.');
        }else if(!obj.password){
            alert('please enter a password');
        }else{
            url = 'admin/update_system';
            cloud_post_url(url,obj, function(data){
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
function set_page_login(data){
    set_page_title('Login');
    hide_cart();
    hide_footer();
    bind_test_data();
    bind_event();
    init_form();
    hide_spinner();
    function bind_test_data(){
        $('#biz_tb_email').val('ceo@bossappz.com');
        $('#biz_tb_password').val('1234567');
    }

    function bind_event(){
        $("#biz_btn").click(function() {
            var obj={};
            obj.email= $('#biz_tb_email').val();
            obj.password= $('#biz_tb_password').val();
            if(!validate_email(obj.email)){
                show_toast_error('please enter a valid email.');
            }else if(!obj.password){
                show_toast_error('please enter a password');
            }else{
                url = 'login_check';
                cloud_get_url(url,obj, function(data){
                    if(data.validation_message){
                        show_toast_error(data.validation_message);
                    }else{
                        set_user(data.user);
                        window.location='/';
                    }
                });
            }
        });
    }

}
//9_logout
function set_page_logout(data){
    del_user();
    window.location='/';
}





//9_forgotpassword
function set_page_forgot_password(data){
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
            cloud_post_url(url,{
                email:email,
            }, function(data){
                alert(data.validation_message);
            });
        }
    });
}

