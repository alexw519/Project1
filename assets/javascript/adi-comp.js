$(document).ready(function() {

  $("#button").on("click", function() {
      event.preventDefault();

      var userName = $("#yourName").val().trim()
      var crushName = $("#yourCrush").val().trim()
      var userAge = $("#yourAge").val().trim()
      var dateCity = $("#dateCity").val().trim()
      var faveFood = $("#faveFood").val().trim()
    console.log(userName);
    console.log(crushName);
    console.log(userAge);
    console.log(dateCity);
    console.log(faveFood);
    
  });
});
