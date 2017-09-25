function token_js(token){
    $.getJSON("//ulogin.ru/token.php?host=" +
        encodeURIComponent(location.toString()) + "&token=" + token + "&callback=?",
        function(data){
            data = $.parseJSON(data.toString());

            if(!data.error){
                set_cookie ("user_name", data.first_name, "/");
                set_cookie ("user_surname", data.last_name, "/");
                set_cookie ("user_photo", data.photo, "/");

                alert("Поздравляю " + data.first_name + " вы успешно вошли !");
                checkAuthorizationUser()
            }
        });
}



