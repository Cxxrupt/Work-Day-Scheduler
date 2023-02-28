$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the id of the containing time-block and the user input
    var blockId = $(this).closest(".time-block").attr("id");
    var eventDescription = $(this).siblings(".description").val();

    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(blockId, eventDescription);
  });

  // Apply the past, present, or future class to each time block
  $(".time-block").each(function () {
    // Get the id of the time-block and the current hour
    var blockId = parseInt($(this).attr("id").split("-")[1]);
    var currentHour = dayjs().hour();

    // Compare the time-block id to the current hour and apply the appropriate class
    if (blockId < currentHour) {
      $(this).addClass("past");
    } else if (blockId === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }

    // Get any user input that was saved in localStorage and set the value of the corresponding textarea
    var savedInput = localStorage.getItem($(this).attr("id"));
    if (savedInput) {
      $(this).find(".description").val(savedInput);
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});
