function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

$(document).ready(function(){
    var data = getUrlVars();
    var url = '../events/'+data.event_id;
    console.log(url);
    $j.ajax(url,
    {
        type:'GET',
        dataType:'json',
        success: function(data1,status,xhr)
        {
          console.log(data1);
          var img_data = bytesToBase64(data1[0].img.data.data);
          var img_src = "data:" + data1[0].img.contentType + ";base64," + img_data;
          $(".event-image").attr("src", img_src);
          $(".event-description").html(data1[0].description);
          $(".event-title").html(data1[0].name);
          $(".event-tags").children().eq(1).html(data1[0].tags);
          $(".event-time").children().eq(1).html(data1[0].time);
          $(".event-date").children().eq(1).html(data1[0].date);
          $(".event-venue").children().eq(1).html(data1[0].venue);

        },
    });
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
        $j.ajax('/events/checkParticipant',
        {
            type:'POST',
            dataType:'json',
            data:{id:data.event_id},
            success: function(data1,status,xhr)
            {
              if(data1.length!=0){
                $("#register").attr("disabled","disabled");
                $("#register").text("Registered");
              }
            }
        });
    }

    $("#register").click(function(){
        console.log('Clicked')
        $j.ajax('/events/register',{
            type:'POST',
            data:{id:data.event_id},
            dataType:'json',
            success:function(data1,status,xhr){
                $("#register").attr("disabled","disabled");
                $("#register").text("Registered");
            },
            error:function(xhr,status,error){
                if(xhr.status==403){
                    window.location.href='/login.html';
                }
                console.log("Error:"+error);
                console.log("Status:"+status);
            }
        });
    });

});
