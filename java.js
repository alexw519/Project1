// function loveCalculator() {

//     var userName= "Adina";
//     var crushName = "Adina";

//     var queryURL = "https://love-calculator.p.rapidapi.com/getPercentage?fname=" + userName + "&sname=" + crushName;

//     // Creating an AJAX call for the specific movie button being clicked
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         headers: {
//             "X-RapidAPI-Host": "love-calculator.p.rapidapi.com"
//         },
//         headers: {
//             "X-RapidAPI-Key": "e6021ca9a5msh5763cf5deefbf36p1059e8jsn2fea555b0671"
//         },
//     }).then(function (response) {
//         console.log(response);
//         percentage = response.percentage;
//     });

// }
// loveCalculator();
// $("#calculator").html(loveCalculator);


function zomato(){

var queryURL = "https://ZomatoraygorodskijV1.p.rapidapi.com/getAllCategories"
;

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "POST",
        headers: {
            "X-RapidAPI-Host": "ZomatoraygorodskijV1.p.rapidapi.com"
        },
        headers: {
            "X-RapidAPI-Key": "b39deed6b9msha576a4db4b1fba5p1242cajsn59a5df568a5d"
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        send: {
            "apiKey":"c567b29e303a3373864e1cd7e0cf1463"
        },

    }).then(function (response) {
        console.log(result.status, result.headers, result.body);
    });
}
$("#calculator").html(zomato());


