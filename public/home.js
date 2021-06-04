$(document).ready(function(){
    var p=0;
    var array=["A","t","t","e","n","d","","&","","G","r","o","w"];
    function animation(k)
    {               
        $("#title_anim").append("<span style='color:#000C66;font-size: 50px;'>"+array[k]+"</span>")            
    }
    setInterval(function(){
        if(p<array.length)
        {
            animation(p);
            p++;
        }
    },130);
    
    
    $.ajax('/events/events?count=3',{
        type:'GET',
        dataType:'json',
        success:function(data1,status,xhr){
            var obj =data1;    
            for(var i=0;i<obj.length;i++){
                var d="<div class=col-sm-3 id=eventitem style='max-height:500px;min-height: max-content;'>"
                var title="<h4 style=color:#6C63FF>"+obj[i].name+"</h4>"
                var club="<p style=color:#000C66>"+obj[i].date+"</p>"
                var desc="<p style='text-overflow:ellipsis;word-wrap: break-word;overflow:hidden;max-height:50px'>"+obj[i].description+"</p>"
                var button="<form action='event.html' method='get'>"
													+	"<input type='hidden' name='event_id' value='" + data1[i]._id + "'>"
													+ "<input type='submit' value='View More' class='eventButton'> </form></div>"
                $("#events").append(d+title+club+desc+button);
            }
            $("#events").append("<div class=col-sm-2 style='align-self:center;' height=100px><a href=events.html><img src='res/undraw_arrow.svg' style='border-radius:500px;border:1px solid #000C66' width=80%></div></div>");
        },
        error:function(xhr,status,error){
            console.log("Error:"+error);
            console.log("Status:"+status);
        }
    })
   
})