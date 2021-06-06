$(document).ready(function(){
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if ((c.indexOf(name)) == 0) {
            return true;
        }    
    }
    return false;
}
if(getCookie('loggedIn')){
    $('#login_logout').text("Log Out");
}
else{
    $('#login_logout').text("Log In/SignUp");
    $('#profile').attr('href','/login.html');
    $('#manage_events').attr('href','/login.html');
}
$('#login_logout').click(function(){
    if(getCookie('loggedIn')){
        $.ajax('/users/logout',{
            type:'GET',
            dataType:'json',
            success:function(data1,status,xhr){
                if(getCookie('loggedIn')){
                    $('#login_logout').text("Log Out");
                }
                else{
                    $('#login_logout').text("Log In/SignUp");
                }
            },
            error:function(xhr,status,error){
                console.log("Error:"+error);
                console.log("Status:"+status);
            }
        });
        
    }
    else{
        $('#login_logout').attr('href','/login.html');
    }
});
});