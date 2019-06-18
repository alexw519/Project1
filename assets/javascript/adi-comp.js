$(document).ready(function() 
{
  //Initalizing Variables
  var index=0;
  var userLocation;
  var tempFood;
  var isMatch = true;
  var noValue = "Please Enter A Value";

  //Initalizing Array
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
   showQuestion(questionArray, index)
  }); 

  //Function to show the questions
  function showQuestion(arr, i) {
    event.preventDefault();
    // in the display div will be the question shown
    $("#question").html(arr[i].question);
    // and a dynamic text area
    var userAnswer = $(`<textarea id='useresponse' 
    name='${arr[i].paramerter}' class='materialize-textarea'></textarea>`);
    // in the div with id response
    $("#answer").html(userAnswer);
  }

  //When clicked, go to the next question, or the results screen
  $("#submit").on("click", function() 
  {
    var answer = $('#useresponse').val().trim();

    //If the user hasn't put in a value, it will display a message
    if (answer === "" || answer === noValue)
    {
      event.preventDefault();
      $("#useresponse").val(noValue);
    }

    //If the is a value in the text field
    else
    { 
      //If its is the age question, checks to see if it is a number
      if (index === 4)
      {
        if (isNaN(answer))
        {
          event.preventDefault();
        }

        //If it clears all conditions
        else
        {
          var param = questionArray[index].parameter;
          userResponse[param] = answer;
          index++;
          if (index < questionArray.length ) 
          {
            showQuestion(questionArray, index)
          }
          else 
          {
            loveCalculator();
          }
        }
      }

      //If it's not the age question
      else
      {
        var param = questionArray[index].parameter;
        userResponse[param] = answer;
        index++;
        if (index < questionArray.length ) 
        {
          showQuestion(questionArray, index)
        }
        else 
        {
          loveCalculator();
        }
      }
    }
  })

  //Function To Show The Results Of The Love Calculator API
  function output(){

    var {age} = userResponse;
    percentage = parseFloat(percentage) / 100.0;
    
    //If they are under 21 with a low compatibility score.
    if (percentage < .4 && age < 21){
      $("#chartSubtitle").text("Good things come to those who wait. Why not wait at an ice cream shop nearby?");
      $("#question").hide();
      $("#answer").hide();
      isMatch = false;

    //if they are 21 or older with a low compatibilty score
    } else if (percentage < .4 && age >= 21){
      $("#chartSubtitle").text("Good things come to those who wait. Why not wait at a bar nearby?");
      $("#question").hide();
      $("#answer").hide();
      isMatch = false;

    //If they have a decent copatibility scor
    } else if (.4 <= percentage && percentage <= .7) {
      $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?");
      $("#question").hide();
      $("#answer").hide();
      isMatch = true;

    //If they have a great compatibility score
    } else {
      $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one :)");
      $("#question").hide();
      $("#answer").hide();
      isMatch = true;
    }
  }

  //Calls the love calculator api and get the results
  function loveCalculator() {

    var {name, crushName} = userResponse;
    $(".spinner").show();

    //Calling the love calculator API
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + name + "&sname=" + crushName;
    $.ajax({
        url: proxy+queryURL,
        method: "GET",
        headers: {"X-RapidAPI-Host": "love-calculator.p.rapidapi.com"},
        headers: {"X-RapidAPI-Key": "e6021ca9a5msh5763cf5deefbf36p1059e8jsn2fea555b0671"},

    }).then(function (response) {
        $(".spinner").hide();
        percentage = response.percentage;
        $("#gridParent").show();
        $("#chartTitle").text(name + "'s & " + crushName +"'s Compatibility Score")
        $("#percentage").text("  " + percentage + "%")
        percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
        $(".bar-1").css("width", percentage).addClass("hoverable");
        output();
        displayResults(response.percentage)

    //If it fails, generates a percentage
    }).fail(function(xhr) {
        $(".spinner").hide();
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log(errorMessage);
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

  //Displays the results from the match
  function displayResults(match) {

    console.log(match);

    //If it is a successful match
    // if(match > 40){
      if(isMatch){
      $("#response").hide();
      $("#display").hide();
      $("#submit").hide();
      $("#description").hide();

      //Calls the createMap function and puts it on the screen
      var resultMap = createMap(userResponse.food, userResponse.location);
      $("#map").html(resultMap);
      $("#map").show();
      $("#resetBtn").show();
      
    }

    //It is an unsuccessful match
    else{

      //If the user is under 21
      if(userResponse.age < 21){
        $("#response").hide();
        $("#display").hide();
        $("#submit").hide();
        $("#description").hide();
  
        //Uses the IP address api to suggest local ice cream places
        var localURL = "http://ip-api.com/json/";
        $.ajax({
            url: localURL,
            method: "GET"
        }).then(function(response)
        {
          userLocation = response.city;

          //If the IP API fails
          if (typeof userLocation === "undefined")
            userLocation = userResponse.location;

          //Saves the favorite food in case the user want to risk it  
          tempFood = userResponse.food;
          userResponse.food = "ice cream";

          //Calls the map with the adjusted results
          var resultMap = createMap(userResponse.food, userLocation);
          $("#map").html(resultMap);
          $("#map").show();
          $("#resetBtn").show();
          $("#riskBtn").show();
        })
      }

      //If the user is 21 or order
      else{
        //Uses the IP Address API to suggest local bars
        var localURL = "http://ip-api.com/json/";
        $.ajax({
            url: localURL,
            method: "GET"
        }).then(function(response)
        {
          userLocation = response.city;
          
          //If the IP API fails
          if (typeof userLocation === "undefined")
            userLocation = userResponse.location;
            
          //Saves the favorite food in case the user want to risk it            
          tempFood = userResponse.food;
          userResponse.food = "bar"
          $("#response").hide();
          $("#display").hide();
          $("#submit").hide();
          $("#description").hide();
    
          //Calls the map with the adjusted results
          var resultMap = createMap(userResponse.food, userLocation);
          $("#map").html(resultMap);
          $("#map").show();
          $("#resetBtn").show();
          $("#riskBtn").show();
        })
      }
    }
  }
 
  // hide the submit button
  $("#resetBtn").hide();
  $("#riskBtn").hide();
  $("#submit").hide();
  $("#map").hide();
  // until start button is clicked
  $("#start").click(function(){
    $("#start").hide();
    $("#slideshow").hide();
    $("#submit").show();
  })

  //If the risk button is clicked, displays the results anyway
  $(document).on("click", "#riskBtn", function () {
    event.preventDefault();
    var resultMap = createMap(tempFood, userResponse.location);
    $("#map").html(resultMap);
    $("#map").show();
    $("#riskBtn").hide();
  })

  //Reloaded the page once clicked
  $('#resetBtn').click(function() {
    location.reload();
  });

  function createMap(food, city) {
    var newMap = `<iframe id='maps' width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q="${food}+in+${city}"&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>`;
    return newMap;
  }

  $("#slideshow > div:gt(0)").hide();

  setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
  },  3000);

});