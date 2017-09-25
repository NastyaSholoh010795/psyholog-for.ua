function get_cookie ( cookie_name )
{
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

function set_cookie ( name, value, path, domain, secure )
{
    var cookie_string = name + "=" + escape ( value );

    var expires = new Date (new Date().getTime() + 3600 * 60 * 1000);
    cookie_string += "; expires=" + expires.toGMTString();

    if ( path )
        cookie_string += "; path=" + escape ( path );

    if ( domain )
        cookie_string += "; domain=" + escape ( domain );

    if ( secure )
        cookie_string += "; secure";

    document.cookie = cookie_string;
}


function delete_cookie(name) {
    set_cookie(name, "", {
        expires: -1
    })
}