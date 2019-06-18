var percentage = "";
var spacing = '\xa0\xa0';
var userResponse = {};

//Array Of The Different Questions
var prompt = [
    {
        message: "Enter Your Age",
        type: "number",
        id: "userAge"
    },
    {
        message: "Enter Your Location",
        type: "text",
        id: "userLocation"
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
        message: "Enter Date City",
        type: "text",
        id: "dateCity"
    },
    {
        message: "Enter Favorite Cuisine",
        type: "text",
        id: "faveFood"
    }

]
var i = 0;
// displays boxes with questions waiting for userinputs
function displayPrompt(arr, i) {
    var promptBox =
        `<div id="ageObject" class="slideLeft">
    ${arr[i].message}
    <input type="${arr[i].type}" name="quantity" id="${arr[i].id}">
    <a class="waves-effect waves-teal btn-flat button-css" id="next-question"><i
            class="medium material-icons">chevron_right</i></a>
    </div>`

    return promptBox
}
var box = $('<div>')
$(".myContainer").append(box);
box.html(displayPrompt(prompt, i))

//Goes To The Next Question When Clicked
$(document).on("click", "#next-question", function () {
    if ($(`#${prompt[i].id}`).val().trim() == '') {
        $(`#${prompt[i].id}`).addClass("error")

        // remove the class after the animation completes
        setTimeout(function () {
            $(`#${prompt[i].id}`).removeClass("error");
        }, 300);
    } else if (i <= 4) {
        userResponse[prompt[i].id] = $(`#${prompt[i].id}`).val().trim();

        i++;
        var res = displayPrompt(prompt, i);
        box.html(res)
    } else if (i = 5) {
        userResponse[prompt[i].id] = $(`#${prompt[i].id}`).val().trim();
        box.hide();
        loveCalculator();
    }
});

//Function To Call The Love Calculator API
function loveCalculator() {

    var { userName, crushName } = userResponse;

    //Shows The Loading Screen
    $(".spinner").show();
    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + userName + "&sname=" + crushName;
    $.ajax({
        url: proxy + queryURL,
        method: "GET",
        headers: { "X-RapidAPI-Host": "love-calculator.p.rapidapi.com" },
        headers: { "X-RapidAPI-Key": "e6021ca9a5msh5763cf5deefbf36p1059e8jsn2fea555b0671" },
    }).then(function (response) {
        //Displays The Percentage On A Graph And Calls The Map Function
        $(".spinner").hide();
        $(".fallingHearts").hide();
        console.log(response);
        percentage = response.percentage;
        $("#gridParent").show();
        $("#chartTitle").text(userName + "'s & " + crushName + "'s Compatibility Score")
        $("#percentage").text(spacing + percentage + "%")
        percentage = Number(percentage / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
        $(".bar-1").css("width", percentage).addClass("hoverable");
        output();
    }).fail(function (xhr) {
    //If The Call Fails, Generates A Random Number And Displays The Results
        $(".spinner").hide();
        $(".fallingHearts").hide();
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        console.log(errorMessage);
        percentage = Math.floor(Math.random() * 91) + 10;
        $("#gridParent").show();
        $("#chartTitle").text(userName + "'s & " + crushName + "'s Compatibility Score")
        $("#percentage").text(spacing + percentage + "%")
        percentage = Number(percentage / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
        console.log(percentage);
        $(".bar-1").css("width", percentage).addClass("hoverable");
        output();
    })

}

// Outout will run through 4 scenarios based on match percentage
function output() {
    var { userAge } = userResponse;
    percentage = parseFloat(percentage) / 100.0;
    console.log(percentage);
// if user is under 21 and match is less than 40%
    if (percentage < .4 && userAge < 21) {
        $("#chartSubtitle").text("Good things come to those who wait. Why not wait at an ice cream shop nearby?");
        iceCreamSuggest();
        $("#mapBtn").show();
        $("#resetBtn").show();
    }
// if user is over 21 and match is less than 40%
    else if (percentage < .4 && userAge >= 21) {
        $("#chartSubtitle").text("Good things come to those who wait. Why not wait at a bar nearby?");
        barSuggest();
        $("#mapBtn").show();
        $("#resetBtn").show();
    }
    // if match is between 40% and 70%
    else if (.4 <= percentage && percentage <= .7) {
        $("#chartSubtitle").text("Take the next step! How about dinner at one of the restaurants below?");
        placeMap();
        $("#resetBtn").show();
        $(".mapBtns").remove();
    } else {
    // if match is above 70%
        $("#chartSubtitle").text("Bring a ring with you to the restaurant! We have a feeling they might be the one :)");
        placeMap();
        $("#resetBtn").show();
        $(".mapBtns").remove();
    }
}
// generates Google Map based on user inputs
function placeMap() {
    var { dateCity, faveFood } = userResponse;
    $("#googleMap").html("<iframe width='450' height='350' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + faveFood + "+in+" + dateCity + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>");
}

//Suggests a nearby ice cream parlor
function iceCreamSuggest() {
    var { userLocation } = userResponse;
    $("#googleMap").html("<iframe width='450' height='350' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=icecream+in+" + userLocation + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>");
}


//Suggests A Nearby Bar
function barSuggest() {
    var { userLocation } = userResponse;
    $("#googleMap").html("<iframe width='450' height='350' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=bar+in+" + userLocation + "&key=AIzaSyDNR4NPh6CTtgRWlpI-HSMop8makDVAMDM' allowfullscreen></iframe>");

}
// refreshes page
$('#resetBtn').click(function () {
    location.reload();
});
// calls google map with user inputs
$('#mapBtn').click(function () {
    event.preventDefault();
    placeMap();
})