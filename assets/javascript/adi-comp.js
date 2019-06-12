$(document).ready(function() {

  $("#button").on("click", function() {
      event.preventDefault();

      var userName = $("#yourName").val().trim()
      var crushName = $("#yourCrush").val().trim()
      var userAge = $("#yourAge").val().trim()
      var userCity = $("#yourCity").val().trim()
      var favoriteFood = $("#favoriteFood").val().trim()
    console.log(userName);
    console.log(crushName);
    console.log(userAge);
    console.log(userCity);
    console.log(favoriteFood);
    $("#yourName").css("color", "red");
  });
});
