var userAge = "";
var userName = "";
var crushName = "";
var dateCity = "";
var faveFood = "";
var percentage = "";

$("#hide-age").on("click", function () {
    userAge = $("#userAge").val().trim();
    console.log(userAge);
    $("#ageObject").attr("data-visibility", "hidden");
    $("#ageObject").hide();
    $(".hide-me-name").show();
    $('#userNameObject').addClass("slideLeft")
});
$("#hide-user-name").on("click", function () {
    userName = $("#userName").val().trim();
    console.log(userName);
    $("#userNameObject").attr("data-visibility", "hidden");
    $("#userNameObject").hide();
    $(".hide-me-crush").show();
    $("#crushNameObject").addClass("slideLeft")
});
$("#hide-crush-name").on("click", function () {
    crushName = $("#crushName").val().trim();
    console.log(crushName);
    $("#crushNameObject").attr("data-visibility", "hidden");
    $("#crushNameObject").hide();
    $(".hide-me-city").show();
    $("#cityObject").addClass("slideLeft");
});
$("#hide-date-city").on("click", function () {
    dateCity = $("#dateCity").val().trim();
    console.log(dateCity);
    $("#cityObject").attr("data-visibility", "hidden");
    $("#cityObject").hide();
    $(".hide-me-food").show();
    $("#foodObject").addClass("slideLeft");
});
$("#hide-fave-food").on("click", function() {
faveFood = $("#faveFood").val().trim();
console.log(faveFood);
$("#foodObject").hide();
loader();
loveCalculator();
});


function loader() {
    $(".spinner").show();
    setTimeout(function () { 
        $(".spinner").hide();
    }, 5000);
 }

 function loveCalculator() {
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + userName + "&sname=" + crushName;
    $.ajax({
        url: proxy+queryURL,
        method: "GET",
        headers: {"X-RapidAPI-Host": "love-calculator.p.rapidapi.com"},
        headers: {"X-RapidAPI-Key": "e6021ca9a5msh5763cf5deefbf36p1059e8jsn2fea555b0671"},
    }).then(function (response) {
        console.log(response);
        percentage = response.percentage;
        $("#gridParent").show();
        $("#chartTitle").text(userName + "'s & " + crushName +"'s Compatibility Score")
        $("#percentage").text("\xa0"+ percentage + "%")
        percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0});
        $(".bar-1").css("width", percentage);
        output();
    }).fail(function(xhr) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log(errorMessage);
        percentage = Math.floor(Math.random() * 91) + 10;
        $("#gridParent").show();
        $("#chartTitle").text(userName + "'s & " + crushName +"'s Compatibility Score")
        $("#percentage").text("   " + percentage + "%")
        percentage = Number(percentage/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:0}); 
        console.log(percentage);
        $(".bar-1").css("width", percentage);  
        output();
  })

 }

function output() {
    percentage = parseFloat(percentage) / 100.0;
    console.log(percentage);
    if (percentage < .4){
    $("#chartSubtitle").text("Good things come to those who wait. Why don’t you sit this one out at one of the locations below?")
    } else if (.4 <= percentage && percentage <= .7) {
        $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?")
    } else {
        $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one")
    }
}

