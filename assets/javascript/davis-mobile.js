var userAge = "";
var userName = "";
var crushName = "";
var dateCity = "";
var faveFood = "";

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
    $("#cityObject").attr("data-visibility", "hidden");
    $("#cityObject").hide();
    $(".hide-me-food").show();
    $("#foodObject").addClass("slideLeft");
});