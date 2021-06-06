function displayItem(data1){
  var div="<div id='eventitem' class='row'>";
  var img_data = bytesToBase64(data1.img.data.data);
  var image="<img class='eventItemImg col-md-4' src='data:" + data1.img.contentType + ";base64," + img_data + "' alt='Event Poster'>";
  var tags="<div id='desc' class='col-md-8'><br>";
  var arr=data1.tags
  for(var j=0;j<arr.length;j++)
  {
      tags=tags+"<span class=eventtag>"+arr[j]+"</span>"
  }

  var title="<br><p class=eventTitle>"+data1.name+"</p>"
  var club="<p>"+data1.club+"</p>"
  var desc="<p style='overflow:hidden;max-height:50px'>"+data1.description+"</p>";
  var button="<form action='event.html' method='get'>"
            +	"<input type='hidden' name='event_id' value='" + data1._id + "'>"
            + "<input type='submit' class='eventButton' value='View More'> </form></div>"

  $("#eventslist").append(div+image+tags+title+club+desc+button);
}

function searchName(){
  var name = $("#name-input").val();
  nameWords = name.split(" ");
  $.ajax('../events/events',
  {
      type:'GET',
      dataType:'json',
      success: function(data1,status,xhr)
      {
        console.log("Success ajax");
          for(var i=0;i<data1.length;i++){
            for(var j=0; j<nameWords.length; j++){
              var regexWord = new RegExp(nameWords[j].toLowerCase());
              if(regexWord.test(data1[i].name.toLowerCase()) || regexWord.test(data1[i].tags.toString().toLowerCase())){
                displayItem(data1[i]);
                break;
              }
            }

          }
      },
  });

}

function searchDate(){
  startDate = $("#start-date-input").val();
  endDate = $("#end-date-input").val();
  $.ajax('../events/events',
  {
      type:'GET',
      dataType:'json',
      success: function(data1,status,xhr)
      {
        console.log("Success ajax");
          for(var i=0;i<data1.length;i++){
            if(endDate==""){
              if(data1[i].date>=startDate){
                displayItem(data1[i]);
              }
            }
            else if(startDate==""){
              if(data1[i].date<=endDate){
                displayItem(data1[i]);
              }
            }
            else{
              if(data1[i].date<=endDate && data1[i].date>=startDate){
                displayItem(data1[i]);
              }
            }

          }
      },
  });
}

function displayAll(){
  $.ajax('../events/events',
  {
      type:'GET',
      dataType:'json',
      success: function(data1,status,xhr)
      {
        console.log("Success ajax");
          for(var i=0;i<data1.length;i++){
              displayItem(data1[i]);
          }
      },
  });
}


function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

$(document).ready(function(){

  displayAll();

  $('#name-input').keyup(function(event) {
      if (event.which === 13)
      {
          $("#eventslist").empty();
          $("#search-button").html("❌");
          searchName();
      }
  });

    $("#search-button").click(function(){
        if($("#search-button").html()=="🔍"){
          if(!($("#name-input").val()==="")){
            $("#eventslist").empty();
            $("#search-button").html("❌");
            searchName();
          }
        }
      else if($("#search-button").html()=="❌"){
        $("#eventslist").empty();
        $("#search-button").html("🔍");
        displayAll();
      }
    });

    $("#start-date-input").change(function(){
      $("#eventslist").empty();
      searchDate();
    });

    $("#end-date-input").change(function(){
      $("#eventslist").empty();
      searchDate();
    });

});
