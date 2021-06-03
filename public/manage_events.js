$(document).ready(function(){
    $.ajax("/users/registeredEvents",
    {
        type:'GET',
        success:function(data1,status,xhr)
        {
            var arr=data1.result
            console.log(arr)
            var todayDate=new Date()
            var todayYear=todayDate.getFullYear()
            var todayMonth=todayDate.getMonth()
            var todayDat=todayDate.getDate()
            var datechanged;
            if(todayDat>0 && todayDat<10)
            {
                datechanged="0"+todayDat
            }
            var mon;
            if(todayMonth>0 && todayMonth<10)
            {
                mon="0"+(todayMonth+1)
            }
            var dateformat=""+todayYear+"-"+mon+"-"+datechanged;
            var cmpDate=new Date(dateformat)
            var cmpTime=cmpDate.getTime()
            var differ;
            var p=0,q=0,r=0;
            for(var i=0;i<arr.length;i++)
            {
                var eventDate=new Date(arr[i].date)
                var endeventDate=new Date(arr[i].end_date)
                var endeventTime=endeventDate.getTime()
                var eventTime=eventDate.getTime()
                console.log(eventTime)
                console.log(cmpTime)
                if(eventTime>cmpTime)
                {
                    differ="#upcoming"
                    p++
                }
                else if(eventTime<=cmpTime && cmpTime<=endeventTime)
                {
                    differ="#OnGoing"
                    q++
                }
                else if(endeventTime<cmpTime){
                    differ="#completed"
                    r++
                }
                var arr_tags=arr[i].tags

                var div="<div id=eventitem class=row>"
                var image=""
                var tags="<div id=desc class=col-sm-8><br>"
                for(var j=0;j<arr_tags.length;j++)
                {
                    tags=tags+"<span class=eventtag>"+arr_tags[j]+"</span>"
                }
                var title="<br><p style=padding-top:10px>"+arr[i].name+"</p>"
                var club="<p>"+arr[i].club+"</p>"
                var desc="<p>"+arr[i].description+"</p></div>"
                var button="<div class=col-sm-2 ><a><button style=background-color:#023E8A;color:#FFFFFF >View More</button></a></div></div>"
                $(differ).append(div+image+tags+title+club+desc+button);
            }
            if(p==0)
            {
                var str="<h6 style='margin-left: 30px;margin-bottom:30px;text-align: center;'>No upcoming Events</h6>"
                $("#upcoming").append(str);
            }
            if(q==0)
            {
                var str="<h6 style='margin-left: 30px;margin-bottom:30px;text-align: center;'>No On-Going Events</h6>"
                $("#OnGoing").append(str);
            }
            if(r==0){
                var str="<h6 style='margin-left: 30px;margin-bottom:30px;text-align: center;'>No completed Events</h6>"
                $("#completed").append(str);
            }
            
        }
    });
});
