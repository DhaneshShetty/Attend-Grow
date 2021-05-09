$(document).ready(function(){
    var eventsList=[{title:"Event 1",club:"Club 1",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 2",club:"Club 2",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]},{title:"Event 3",club:"Club 3",desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Consectetur nisi, tempor pharetra id viverra. Urna sit porttitor arcu consectetur tincidunt feugiat a risus eleifend.",link:"",image:"",tags:["app","web"]}]
    for(var i=0;i<eventsList.length;i++){
        var div="<div id=eventitem class=row>"
        var image="<img src=home.png class=col-sm-2>"
        var tags="<div id=desc class=col-sm-8><br>"
        for(var j=0;j<eventsList[i].tags.length;j++){
            tags=tags+"<span class=eventtag>"+eventsList[i].tags[j]+"</span>"
        }
        var title="<br><p style=padding-top:10px>"+eventsList[i].title+"</p>"
        var club="<p>"+eventsList[i].club+"</p>"
        var desc="<p>"+eventsList[i].desc+"</p></div>"
        var button="<div class=col-sm-2 ><a><button style=background-color:#023E8A;color:#FFFFFF>View More</button></a></div></div>"
        $("#eventslist").append(div+image+tags+title+club+desc+button)

    }

})