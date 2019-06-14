//Variable Declarations
var compatibility = false;
var userName;
var crushName;
var userAge;
var dateCity;
var faveFood;
var result = 0;

//New Code
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=John&sname=Alice";
// $.ajax({
//     url: queryURL,
//     method: "GET",
//     headers: {"X-RapidAPI-Host": "love-calculator.p.rapidapi.com"},
//     headers: {"X-RapidAPI-Key": "63b007e403msh82e545e4b6ed662p17ad5cjsn9df980f8ea4b"}
// }).then(function(response)
// {
//     console.log(response);
// })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//New Code
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// $("#maps").html("<iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + faveFood + "+in+" + city + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//When the submit button is clicked
$("#submitButton").on("click", function()
{
    event.preventDefault();
    userName = $("#userName").val().trim();
    crushName = $("#crushName").val().trim();
    userAge = $("#userAge").val().trim();
    dateCity = $("#dateCity").val().trim();
    faveFood = $("#faveFood").val().trim();

    //Checking for blank fields before submission
    // if(userName || crushName || dateCity || faveFood || userAge === "")
    if(userName === "" || crushName === "" || dateCity === "" || faveFood === "" || userAge === "")
    {
        alert("You Missed A Few Fields");
        // if(userName === "")
        //     $("#userName").css("border", "red");
        // if(crushName === "")
        //     $("#crushName").css("border", "red");
        // if(dateCity === "")
        //     $("#dateCity").css("border", "red");
        // if(faveFood === "")
        //     $("#faveFood").css("border", "red");
        // if(userAge === "")
        //     $("#userAge").css("border", "red");
        event.preventDefault();
    }
else
{
    //Making sure a number is inserted
    if (isNaN(userAge))
    {
        //error message
        alert("Not A Number");
        event.preventDefault();
        //see if can make field only accept numbers
    }
else
{
    //Branches depending on the age of the user
    if (userAge >= 21)
        ofAgeSuggestions();
    else
        underAgeSuggestions();
}
}
})

//Suggests based on compatibility and if the user is of age
function ofAgeSuggestions()
{
    // compatibility = compadCheck();
    if (!compatibility)
    {
        barSuggest();
        //ask if they would like to see the suggestions anyway (modal if clicked resets the page)
    }
    else
    {
        faveFoodSuggest();
    }
}

//Suggests based on compatibility and if the user is underage
function underAgeSuggestions()
{
    if (!compatibility)
    {
        iceCreamSuggest();
        //ask if they would like to see the suggestions anyway (modal if clicked resets the page)
    }
    else
    {
        faveFoodSuggest();
    }
}

//Suggests a resturaunt based off of location using Google Maps
function faveFoodSuggest()
{
    callMap(faveFood, dateCity);
}

//Suggests a bar based off of current location using Google Maps
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

function compadCheck()
{
    //ajax for love connection api set score equal to percentage
    if (result > 50)
        return true
    else
        return false;
}

function callMap(food, city)
{
    $("#maps").html("<iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + food + "+in+" + city + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM&zoom=' allowfullscreen></iframe>");
}


