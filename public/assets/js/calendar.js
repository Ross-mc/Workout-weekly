$(() => {
  const submitExerciseReqHandler = () => {
    const categorySelected = $("#category").val();
    const durationSelected = $("#duration").val();
    const dateSelected = $("#workout-date").val();
    if (categorySelected === "default"){
      alert("Please select a category");
      return;
    }
    if (durationSelected === "default"){
      alert("Please select a duration");
      return;
    }
    if (dateSelected === ""){
      alert("Please enter a date")
      return;
    }

    $.ajax({
      url: "/api/getVideo",
      data: {
        categorySelected,
        durationSelected
      },
      method: "GET"
    }).then(res => {
      if (res === "Failed to connect to youtube API"){
        alert(res + "\nPlease try again later");
        return
      }
      const ytContainer = $("<div class = 'container yt'>");
      const ytRow = $("<div class='row'>");
      const ytDiv = $(
        "<div class = 'ytDiv embed-responsive embed-responsive-16by9'>"
      );
      const videoEl = $(
        "<iframe class = 'embed-responsive-item' allowfullscreen>"
      );
      videoEl.attr("src", res);
      ytDiv.append(videoEl);
      const saveBtn = $("<button class ='btn btn-primary' type= 'submit' id='saveVideo'>");
      const searchAgainBtn = $(
        "<button class='btn btn-primary' type='reset' value='Reset' id='searchAgain'>"
      );
      saveBtn.html("Save Video");
      searchAgainBtn.html("Search Again");
      ytRow.append(ytDiv)
      const row2 = $("<div class='row'>");
      row2.append(saveBtn, searchAgainBtn)
      ytContainer.append(ytRow, row2);
      $("body").append(ytContainer);
      ytContainer.fadeIn(400);
    });
  };

  const searchAgainHandler = () => {
    const ytContainer = $(".yt");
    ytContainer.fadeOut(400);
    submitExerciseReqHandler();
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const saveVideoHandler = () => {
    const category = $("#category").val();
    const durationSelected = $("#duration").val();
    const dateSelected = $("#workout-date").val();
    const hourSelected = $("#workout-hour").val();
    const minutesSelected = $("#workout-minutes").val();
    let hourEnd = hourSelected;
    let minutesEnd = minutesSelected;
    if (minutesSelected + durationSelected > 60){
      minutesEnd = minutesSelected + durationSelected - 60;
      hourEnd++
    }
    const arrayOfUrl = window.location.href.split("/");
    const id = parseInt(arrayOfUrl[arrayOfUrl.length -1]);
    const date = formatDate(dateSelected);
    const timeStart = `${date} ${hourSelected}:${minutesSelected}:00`;
    const timeEnd = `${date} ${hourEnd}: ${minutesEnd}:00`;
    const eventName = `${category} Exercise`;
    const eventDesc = "";


    $.ajax({
      url: "/api/createevent",
      data: {
        timeStart,
        timeEnd,
        eventName,
        eventDesc,
        category,
        id
      },
      method: "POST"
    })
  }


  $("#submitExerciseReq").on("click", submitExerciseReqHandler);

  //dynamic click listeners

  $("body").on("click", "#searchAgain", searchAgainHandler);
  $("body").on("click", "#saveVideo", saveVideoHandler);

  var workoutDatePicker = new Pikaday({ field: $('#workout-date')[0] });
  var eventDatePicker = new Pikaday({ field: $('#event-date')[0] });


});
