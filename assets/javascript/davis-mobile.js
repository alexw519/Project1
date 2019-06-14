var percentage = "";
var spacing = '\xa0\xa0';


var userResponse = {};

var prompt = [
    {
        message: "Enter Your Age",
        type: "number",
        id: "userAge"
    },
    {
        message: "Enter Your Name",
        type: "text",
        id: "userName"
    },
    {
        message: "Enter Crush's Name",
        type: "text",
        id: "crushName"
    },
    {
        message: "Enter Date Location",
        type: "text",
        id: "dateCity"
    },
    {
        message: "Enter Favorite Cuisine",
        type: "text",
        id: "faveFood"
    }

]

var i =0;


function displayPrompt(arr, i) {
    console.log('display promt working');

        // console.log('arr', arr)
    var promptBox = 
        `<div id="ageObject" class="slideLeft">
    ${arr[i].message}
    <input type="${arr[i].type}" name="quantity" id="${arr[i].id}">
    <a class="waves-effect waves-teal btn-flat button-css" id="next-question"><i
            class="medium material-icons">chevron_right</i></a>
    </div>`

    return promptBox
}




var next = true;

var box = $('<div>')

$(".myContainer").append(box);

box.html(displayPrompt(prompt, i)) 





$(document).on("click", "#next-question",function () {
    console.log(i);
    
    if(i <= 3){
        userResponse[prompt[i].id] = $(`#${prompt[i].id}`).val().trim();

        i++;
        var res = displayPrompt(prompt, i);
        box.html(res)
        console.log(userResponse)
    } else if (i=4){
        userResponse[prompt[i].id] = $(`#${prompt[i].id}`).val().trim();
        box.hide();
        loveCalculator();
    }
 
});

 function loveCalculator() {

    var {userName, crushName} = userResponse;

    $(".spinner").show();
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + userName + "&sname=" + crushName;
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
        $("#chartTitle").text(userName + "'s & " + crushName +"'s Compatibility Score")
        $("#percentage").text(spacing + percentage + "%")
        percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
        $(".bar-1").css("width", percentage);
        output();
        placeMap();
    }).fail(function(xhr) {
        $(".spinner").hide();
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log(errorMessage);
        percentage = Math.floor(Math.random() * 91) + 10;
        $("#gridParent").show();
        $("#chartTitle").text(userName + "'s & " + crushName +"'s Compatibility Score")
        $("#percentage").text(spacing + percentage + "%")
        percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}); 
        console.log(percentage);
        $(".bar-1").css("width", percentage);  
        output();
        placeMap();
  })

 }

function output() {
    var {userAge} = userResponse;
    percentage = parseFloat(percentage) / 100.0;
    console.log(percentage);
    if (percentage < .4 && userAge < 21){
    $("#chartSubtitle").text("Good things come to those who wait. Why don’t you hit up an ice cream shop nearby?");
    iceCreamSuggest();
    } else if (percentage < .4 && userAge >= 21){
        $("#chartSubtitle").text("Good things come to those who wait. Why not wait drunk at a bar nearby?");
        barSuggest();
    } else if (.4 <= percentage && percentage <= .7) {
        $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?")
    } else {
        $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one")
    }
}

function placeMap() {
    var {dateCity, faveFood} = userResponse;
$("#googleMap").html("<iframe width='450' height='350' margin: '0 auto' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + faveFood + "+in+" + dateCity + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>");
}

// DAVIS TO CONFIGURE THIS
//Suggests a ice cream parlor based off of current location using Google Maps
function iceCreamSuggest()
{
    var localURL = "http://ip-api.com/json/";
    $.ajax({
        url: localURL,
        method: "GET"
    }).then(function(response)
    {
        callMap("ice cream", response.city);
    })
}
function barSuggest()
{
    var localURL = "http://ip-api.com/json/";
    $.ajax({
        url: localURL,
        method: "GET"
    }).then(function(response)
    {
        callMap("bar", response.city);
    })
}

function callMap()
{
    var {dateCity, faveFood} = userResponse;
    $("#googleMap").html("<iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + faveFood + "+in+" + dateCity + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM&zoom=' allowfullscreen></iframe>");
}