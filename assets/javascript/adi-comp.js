$(document).ready(function() {

// array to hold the questions
  var index=0;
  var questionArray = [
    { question: "Your Name", 
      parameter: "name"},
    { question: "Your Crush's Name", 
      parameter: "crushName"},
    { question: "Where you want to have your date"
    , parameter: "location"},
    { question: "Your favorite type of food"
    , parameter: "food"},
    { question: "Age",
      parameter: "age"}
  ];

  var userResponse = {};
  var userLocation;
  // click on start to see the first question
  $("#start").on("click",function () {
   showQuestion(questionArray, index);
  }
   ); 

// showing the questions
function showQuestion(arr, i) {
  event.preventDefault();
  
// in the display div will be the question shown
    $("#display").html(arr[i].question);
// and a dynamic text area
    var userAnswer = $(`<textarea id='useresponse' 
    name='${arr[i].paramerter}' class='materialize-textarea'></textarea>`);
    // in the div with id response
    $("#response").html(userAnswer);
}

$("#submit").on("click", function() {
    var answer = $('#useresponse').val().trim();

    if (answer === "")
    {
      event.preventDefault();
    }
    else
    {
      var param = questionArray[index].parameter;
  
      userResponse[param] = answer;
     
      index++

      if (index < questionArray.length ) {
        showQuestion(questionArray, index)
      }

      else {
        loveCalculator();
      }
    }
})


function output(){

var {age} = userResponse;
    percentage = parseFloat(percentage) / 100.0;
    console.log(percentage);
    if (percentage < .4 && age < 21){
    $("#chartSubtitle").text("Good things come to those who wait. Why not wait at an ice cream shop nearby?");

    } else if (percentage < .4 && age >= 21){
        $("#chartSubtitle").text("Good things come to those who wait. Why not wait at a bar nearby?");

    } else if (.4 <= percentage && percentage <= .7) {
        $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?");

    } else {
        $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one :)");

    }
}

function loveCalculator() {

  var {name, crushName} = userResponse;

  $(".spinner").show();
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + name + "&sname=" + crushName;
  $.ajax({
      url: proxy+queryURL,
      method: "GET",
      headers: {"X-RapidAPI-Host": "love-calculator.p.rapidapi.com"},
      headers: {"X-RapidAPI-Key": "e6021ca9a5msh5763cf5deefbf36p1059e8jsn2fea555b0671"},
  }).then(function (response) {
      $(".spinner").hide();
      console.log(response);
      percentage = response.percentage;
      $("#gridParent").show();
      $("#chartTitle").text(name + "'s & " + crushName +"'s Compatibility Score")
      $("#percentage").text("  " + percentage + "%")
      percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
      $(".bar-1").css("width", percentage).addClass("hoverable");
      output();
      displayResults(response.percentage)

      
  }).fail(function(xhr) {
      $(".spinner").hide();
      var errorMessage = xhr.status + ': ' + xhr.statusText

      percentage = Math.floor(Math.random() * 91) + 10;
      $("#gridParent").show();
      $("#chartTitle").text(name + "'s & " + crushName +"'s Compatibility Score")
      $("#percentage").text("  " + percentage + "%")
      percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}); 

      $(".bar-1").css("width", percentage).addClass("hoverable");  
      output();
      displayResults(percentage);
})

}


 function displayResults(match) {
 
  //if good match
  if(match >= 40){
    $("#response").hide();
    $("#display").hide();
    $("#submit").hide();
    console.log(userResponse);
    var resultMap = createMap(userResponse.food, userResponse.location);
    $("#map").html(resultMap);
    $("#map").show();
    $("#resetBtn").show();
  }
  else{

    // Gets Their Location To Suggest Nearby Places
    // var localURL = "http://ip-api.com/json/";
    // $.ajax({
    //     url: localURL,
    //     method: "GET"
    // }).then(function(response)
    // {
    //   userResponse.location = response.city;
    // })


    if(userResponse.age < 21){
      $("#response").hide();
      $("#display").hide();
      $("#submit").hide();
      //map with icecream
      
      userResponse.food = "ice cream";
      var resultMap = createMap(userResponse.food, userResponse.location);
      $("#map").html(resultMap);
      $("#map").show();
      $("#resetBtn").show();
    }
    else{
      userResponse.food = "bar";
      $("#response").hide();
      $("#display").hide();
      $("#submit").hide();
      var resultMap = createMap(userResponse.food, userResponse.location);
      $("#map").html(resultMap);
      $("#map").show();
      $("#resetBtn").show();
    }

  }

 }
 


// hide the submit button
$("#resetBtn").hide();
$("#submit").hide();
$("#map").hide();
// until start button is clicked
$("#start").click(function(){
  $("#start").hide();
  $("#exampleSlider").hide();
  $("#submit").show();
})

$('#resetBtn').click(function() {
  location.reload();
});

function createMap(food, city) {
  var newMap = `<iframe id='maps' width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q="${food}+in+${city}"&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>`;


  return newMap;

} 

$(function () {

  /* SET PARAMETERS */
  var change_img_time     = 5000; 
  var transition_speed    = 100;

  var simple_slideshow    = $("#exampleSlider"),
      listItems           = simple_slideshow.children('li'),
      listLen             = listItems.length,
      i                   = 0,

      changeList = function () {

          listItems.eq(i).fadeOut(transition_speed, function () {
              i += 1;
              if (i === listLen) {
                  i = 0;
              }
              listItems.eq(i).fadeIn(transition_speed);
          });

      };

  listItems.not(':first').hide();
  setInterval(changeList, change_img_time);

});


});
