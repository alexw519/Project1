//Variable Declarations
var compatibility = true;
var userName;
var crushName;
var userAge;
var dateCity;
var faveFood;
var result = 0;

//When the submit button is clicked
$("#submitButton").on("click", function()
{
    userName = $("userName").val().trim();
    crushName = $("crushName").val().trim();
    userAge = $("#userAge").val().trim();
    dateCity = $("dateCity").val().trim();
    faveFood = $("faveFood").val().trim();

    //Checking for blank fields before submission
    // if(userName || crushName || dateCity || faveFood || userAge === "")
    if(userName === "" || crushName === "" || dateCity === "" || faveFood === "" || userAge === "")
    {
        //error message
    }

    //Making sure a number is inserted and seeing if the user is 21
    if ( $.isNumeric(age) === false)
    {
        //don't process the rest, see if can make field only accept numbers
    }

    if (userAge >= 21)
        ofAgeSuggestions();
    else
        underAgeSuggestions();
})

//Suggests based on compatibility and if the user is of age
ofAgeSuggestions()
{
    compatibility = compadCheck();
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
underAgeSuggestions()
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
    var city = dateCity;
    //Ajax using google maps to look at resturaunts around the city (uses favefood as search)
    //not sure if we need to use the zomato app because google maps pulls up resturaunts
}

//Suggests a bar based off of location using Google Maps
function barSuggest()
{
    var city = dateCity;
    //ajax using googlemaps to look at bars around the city
}

//Suggests a ice cream parlor based off of location using Google Maps
function iceCreamSuggest()
{
    var city = dateCity;
    //ajax using google maps to look at ice cream places around the city (uses ice cream as search)
}

function compadCheck()
{
    //ajax for love connection api set score equal to percentage
    if (result > 50)
        return true
    else
        return false;
}




