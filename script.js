var workDay = [
  { time: "9:00 am", event: "" },
  { time: "10:00 am", event: "" },
  { time: "11:00 am", event: "" },
  { time: "12:00 pm", event: "" },
  { time: "1:00 pm", event: "" },
  { time: "2:00 pm", event: "" },
  { time: "3:00 pm", event: "" },
  { time: "4:00 pm", event: "" },
  { time: "5:00 pm", event: "" },
];

// Check if events are stored in local storage
var events = JSON.parse(localStorage.getItem("events"));
if (events) {
  workDay.forEach(function (item) {
    item.event = events[item.time] || "";
  });
}

function displayWorkDay() {
  // Loop through the workDay array and create a time block for each hour
  for (var i = 0; i < workDay.length; i++) {
    // Create a row element
    var rowEl = $("<div>").addClass("row");

    // Create an hour element
    var hourEl = $("<div>").addClass("hour col-2").text(workDay[i].time);

    // Create a text area for the event
    var textAreaEl = $("<textarea>")
      .addClass("col-8 description")
      .val(workDay[i].event);

    // Add a class to the text area to indicate whether it's in the past, present, or future
    if (moment(workDay[i].time, "h:mm a").isBefore(moment(), "hour")) {
      textAreaEl.addClass("past");
    } else if (moment(workDay[i].time, "h:mm a").isSame(moment(), "hour")) {
      textAreaEl.addClass("present");
    } else {
      textAreaEl.addClass("future");
    }

    // Create a save button for the time block
    var saveBtnEl = $("<button>")
      .addClass("saveBtn col-2")
      .html("<i class='fas fa-save'></i>");

    // Append the hour element, text area, and save button to the row
    rowEl.append(hourEl, textAreaEl, saveBtnEl);

    // Append the row to the container
    $(".container").append(rowEl);
  }
}

$(document).ready(function () {
  displayWorkDay();

  // Save events to local storage when save button is clicked
  $(".saveBtn").on("click", function () {
    var hour = $(this).siblings(".hour").text().trim();
    var text = $(this).siblings(".description").val().trim();
    workDay.forEach(function (item) {
      if (item.time === hour) {
        item.event = text;
      }
    });
    localStorage.setItem(
      "events",
      JSON.stringify(
        workDay.reduce(function (obj, item) {
          obj[item.time] = item.event;
          return obj;
        }, {})
      )
    );
  });
});
