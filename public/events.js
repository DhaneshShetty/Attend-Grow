$(document).ready(function(){
    $.ajax('../events/events',
    {
        type:'GET',
        dataType:'json',
        success: function(data1,status,xhr)
        {
          console.log("Success ajax");
            for(var i=0;i<data1.length;i++){

                var div="<div id='eventitem' class='row'>";
                var img_data = bytesToBase64(data1[i].img.data.data);
								var image="<img class='eventItemImg' src='data:" + data1[i].img.contentType + ";base64," + img_data + "' alt='Event Poster'>";
                var tags="<div id='desc' class='col-sm-8'><br>";
                var arr_strings=data1[i].tags
                var arr=arr_strings.split(',')
                for(var j=0;j<arr.length;j++)
                {
                    tags=tags+"<span class=eventtag>"+arr[j]+"</span>"
                }
                var title="<br><p style=padding-top:10px>"+data1[i].name+"</p>"
                //var club="<p>"+data1[i].name+"</p>"
                var club = "";
                var desc="<p>"+data1[i].description+"</p></div>";
								var button="<form action='event.html' method='get'>"
													+	"<input type='hidden' name='event_id' value='" + data1[i]._id + "'>"
													+ "<input type='submit' value='View More'> </form>"

								$("#eventslist").append(div+image+tags+title+club+desc+button);
            }
        },

    });



});
