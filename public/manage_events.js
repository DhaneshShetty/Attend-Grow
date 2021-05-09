$(document).ready(function(){
    var upcomingEvents=[{title:"Event 1",club:"Club 1",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 2",club:"Club 2",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 3",club:"Club 3",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]}]
    for(var i=0;i<upcomingEvents.length;i++){
        var div="<div id=eventitem class=row>"
        var image="<img src=home.png class=col-sm-2>"
        var tags="<div id=desc class=col-sm-8><br>"
        for(var j=0;j<upcomingEvents[i].tags.length;j++){
            tags=tags+"<span class=eventtag>"+upcomingEvents[i].tags[j]+"</span>"
        }
        var title="<br><p style=padding-top:10px>"+upcomingEvents[i].title+"</p>"
        var club="<p>"+upcomingEvents[i].club+"</p>"
        var desc="<p>"+upcomingEvents[i].desc+"</p></div>"
        var button="<div class=col-sm-2 ><a><button style=background-color:#023E8A;color:#FFFFFF>View More</button></a><br><br><a href=participants.html><button style=background-color:#023E8A;color:#FFFFFF>Participants</button></a></div></div>"
        $("#upcoming").append(div+image+tags+title+club+desc+button)
    }
    var completedEvents=[{title:"Event 1",club:"Club 1",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 2",club:"Club 2",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 3",club:"Club 3",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]}]
    for(var i=0;i<completedEvents.length;i++){
        var div="<div id=eventitem class=row>"
        var image="<img src=home.png class=col-sm-2>"
        var tags="<div id=desc class=col-sm-8><br>"
        for(var j=0;j<completedEvents[i].tags.length;j++){
            tags=tags+"<span class=eventtag>"+completedEvents[i].tags[j]+"</span>"
        }
        var title="<br><p style=padding-top:10px>"+completedEvents[i].title+"</p>"
        var club="<p>"+completedEvents[i].club+"</p>"
        var desc="<p>"+completedEvents[i].desc+"</p></div>"
        var button="<div class=col-sm-2 ><a><button style=background-color:#023E8A;color:#FFFFFF>View More</button></a><br><br><a href=participants.html><button style=background-color:#023E8A;color:#FFFFFF>Participants</button></a></div></div>"
        $("#completed").append(div+image+tags+title+club+desc+button)
    }

})