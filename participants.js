$(document).ready(function(){
    var participants=[{name:"Dhanesh",reg_no:"19BCT0158",ph_no:"9999999999",email:"dhanesh@vitstudent.ac.in"},{name:"Dhanesh",reg_no:"19BCT0158",ph_no:"9999999999",email:"dhanesh@vitstudent.ac.in"}]
    var table="<table class=table style=margin:20px;>"
    for(var i=0;i<participants.length;i++){
        var col="<tr><td>"+participants[i].name+"</td>"
        var col1="<td>"+participants[i].email+"</td>"
        var col2="<td>"+participants[i].ph_no+"</td>"
        var col3="<td>"+participants[i].reg_no+"</td></tr>"
        table=table+col+col1+col2+col3;
    }
    var endtable="</table>"
    $("#participantslist").append(table+endtable);
})