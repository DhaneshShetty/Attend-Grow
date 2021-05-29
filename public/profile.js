$(document).ready(function(){
    var p=0;
   var array=["W","e","l","c","o","m","e","!"];
   function animation(k)
   {
      
       $("#title_anim").append("<span style='color:#023E8A;font-size: 50px;'>"+array[k]+"</span>")
   
   }
   setInterval(function(){
       if(p<array.length)
       {
           animation(p);
           p++;
       }
   },130);
$.ajax("/users/registeredEvents",
{
type:'GET',
success:function(data1,status,xhr)
{
   var name=" <h6 style='margin-left: 30px;'>"+data1.name+"</h4>"
   $("#NAME").append(name)
   var email=" <h6 style='margin-left: 30px;'>"+data1.email+"</h4>"
   $("#MAIL").append(email)
   var reg_no=" <h6 style='margin-left: 30px;'>"+data1.reg+"</h4>"
   $("#REG").append(reg_no)
   var arr=data1.result
   console.log(arr)
   var todayDate=new Date()
   var todayYear=todayDate.getFullYear()
   var todayMonth=todayDate.getMonth()
   var todayDat=todayDate.getDate()
   var mon;
   if(todayMonth>0 && todayMonth<10)
   {
       mon="0"+(todayMonth+1)
   }
   var dateformat=""+todayYear+"-"+mon+"-"+todayDat;
   var cmpDate=new Date(dateformat)
   var cmpTime=cmpDate.getTime()
   var differ;
   for(var i=0;i<arr.length;i++)
   {
       var eventDate=new Date(arr[i].date)
       var eventTime=eventDate.getTime()
       console.log(eventTime)
       console.log(cmpTime)
       if(eventTime>cmpTime)
       {
           differ="#upcoming"
       }
       else if(eventTime==cmpTime)
       {
           differ="#OnGoing"
       }
       else{
           differ="#completed"
       }
       var tags=arr[i].tags
       var arr_tags=tags.split(",")

       var div="<div id=eventitem class=row>"
       var image=""
       var tags="<div id=desc class=col-sm-8><br>"
       for(var j=0;j<arr_tags.length;j++)
       {
           tags=tags+"<span class=eventtag>"+arr_tags[j]+"</span>"
       }
       var title="<br><p style=padding-top:10px>"+arr[i].name+"</p>"
       var club="<p>"+arr[i].name+"</p>"
       var desc="<p>"+arr[i].description+"</p></div>"
       var button="<div class=col-sm-2 ><a><button style=background-color:#023E8A;color:#FFFFFF >View More</button></a></div></div>"
       $(differ).append(div+image+tags+title+club+desc+button);
   }
   
}
});
});