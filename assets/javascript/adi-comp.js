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
  // click on start to see the first question
  $("#start").on("click",function () {
    console.log("clicked")
   showQuestion(questionArray, index)
  }
   ); 

// showing the questions
function showQuestion(arr, i) {
  console.log(i);
  event.preventDefault();
// if the question array is smaller than the index
  // if(i < arr.length) {
// in the display div will be the question shown
    $("#display").html(arr[i].question);
// and a dynamic text area
    var userAnswer = $(`<textarea id='useresponse' 
    name='${arr[i].paramerter}' class='materialize-textarea'></textarea>`);
    // in the div with id response
    $("#response").html(userAnswer);

    // when submit is clicked
  // }
}

$("#submit").on("click", function() {
  // if(index <= questionArray.length){
    var answer = $('#useresponse').val().trim();

    var param = questionArray[index].parameter;
  
    userResponse[param] = answer;
     
    console.log(userResponse);
    index++

    if (index < questionArray.length ) {
      showQuestion(questionArray, index)
    }

  // }
  else {
    loveCalculator();
    // displayResults();
  }

})


function output(){

var {age} = userResponse;
    percentage = parseFloat(percentage) / 100.0;
    console.log(percentage);
    if (percentage < .4 && age < 21){
    $("#chartSubtitle").text("Good things come to those who wait. Why not wait at an ice cream shop nearby?");
    // iceCreamSuggest();
    // $("#resetBtn").append(resetBtn);
    // $("#resultsButton").append(resultsBtn)
    } else if (percentage < .4 && age >= 21){
        $("#chartSubtitle").text("Good things come to those who wait. Why not wait at a bar nearby?");
        // barSuggest();
        // $("#resetBtn").append(resetBtn);
        // $("#resultsButton").append(resultsBtn)
    } else if (.4 <= percentage && percentage <= .7) {
        $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?");
        // placeMap();
        // $("#resetBtn").append(resetBtn);
    } else {
        // placeMap();
        $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one :)");
        // $("#resetBtn").append(resetBtn);
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
      // placeMap();
  }).fail(function(xhr) {
      $(".spinner").hide();
      var errorMessage = xhr.status + ': ' + xhr.statusText
      console.log(errorMessage);
      _percentage = Math.floor(Math.random() * 91) + 10;
      $("#gridParent").show();
      $("#chartTitle").text(name + "'s & " + crushName +"'s Compatibility Score")
      $("#percentage").text("  " + percentage + "%")
      percentage = Number(_percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}); 
      console.log(_percentage);
      $(".bar-1").css("width", percentage).addClass("hoverable");  
      output();
      displayResults(_percentage);
})

}


 function displayResults(match) {

  console.log('match', +match);
  console.log('match tyoe', typeof(+match));

  
  //if good match
  //show restaurants

  //if bad match
  // var match = false
  if(match > 50){
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
    if(userResponse.age < 21){
      $("#response").hide();
      $("#display").hide();
      $("#submit").hide();
      //map with icecream
      userResponse.food = "ice cream"
      var resultMap = createMap(userResponse.food, userResponse.location);
      $("#map").html(resultMap);
      $("#map").show();
      $("#resetBtn").show();
    }
    else{
      userResponse.food = "bar"
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
