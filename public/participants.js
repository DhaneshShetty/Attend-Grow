function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
$(document).ready(function(){
    var data = getUrlVars();
    $.ajax("/events/participants",
    {   
        'type':'POST',        
        'data':JSON.stringify({id:data.event_id}),
        'contentType': 'application/json',
        success:function(data1,status,xhr)
        {
            var participants=data1;
            var table="<table class=table style=margin:20px;>"
            for(var i=0;i<participants.length;i++){
                var col="<tr><td>"+participants[i].name+"</td>"
                var col1="<td>"+participants[i].email+"</td>"
                var col3="<td>"+participants[i].regNo+"</td></tr>"
                table=table+col+col1+col3;
            }
            var endtable="</table>"           

        $("#participantslist").append(table+endtable);
        }
    });
});