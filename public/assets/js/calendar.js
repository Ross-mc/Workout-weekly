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
    const durationSelected = parseInt($("#duration").val());
    const dateSelected = $("#workout-date").val();
    const hourSelected = $("#workout-hour").val();
    const minutesSelected = parseInt($("#workout-minutes").val());
    const yTel = $("iframe");
    const ytUrl = yTel.attr("src");
    let hourEnd = parseInt(hourSelected);
    let minutesEnd = minutesSelected;
    if (minutesSelected + durationSelected > 60){
      minutesEnd = minutesSelected + durationSelected - 60;
      hourEnd++
    } else{
      minutesEnd = minutesSelected + durationSelected;
    }
    if (hourEnd < 10){
      hourEnd = "0" + hourEnd;
    }
    const arrayOfUrl = window.location.href.split("/");
    const id = parseInt(arrayOfUrl[arrayOfUrl.length -1]);
    const date = formatDate(dateSelected);
    const timeStart = `${date} ${hourSelected}:${minutesSelected}:00`;
    const timeEnd = `${date} ${hourEnd}:${minutesEnd}:00`;
    const eventName = `${category}`;
    const eventDesc = ytUrl;
    console.log(timeEnd)


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
    }).then(res => {
      if(res === "Success"){
        alert("Video Successfully Saved to DB");
        window.location.reload();
      } else {
        alert("error connecting to database, please try again later")
      }
    })
  };

  const displayYTModal = (eventTitle, src) => {
    const ytContainer = $("<div class = 'container yt'>");
    const ytRow = $("<div class='row'>");
    const ytTitle = $("<h3>");
    ytTitle.html(eventTitle)
    const ytDiv = $(
      "<div class = 'ytDiv embed-responsive embed-responsive-16by9'>"
    );
    const videoEl = $(
      "<iframe class = 'embed-responsive-item' allowfullscreen>"
    );
    videoEl.attr("src", src);
    ytDiv.append(videoEl);
    ytRow.append(ytTitle, ytDiv);
    const deleteEvent = $(
      "<button class='btn btn-primary 'id='deleteEvent'>"
    );
    deleteEvent.html("Remove event from calendar")
    const closeEvent = $(
      "<button class='btn btn-primary 'id='closeEvent'>"
    );
    closeEvent.html("Close event")
    const row2 = $("<div class='row'>");
    row2.append(deleteEvent, closeEvent)
    ytContainer.append(ytRow, row2);
    $("body").append(ytContainer);
    ytContainer.fadeIn(400);
  };

  const displayApptModal = (eventTitle, eventDescription) => {
    const apptContainer = $("<div class = 'container yt'>");
    const apptRow = $("<div class='row'>");
    const apptDiv = $(
      "<div class = 'apptDiv'>"
    );
    const apptTitle = $("<h3>");
    apptTitle.html(eventTitle)
    const p = $("<p>");
    p.html(eventDescription)
    apptDiv.append(apptTitle, p);
    apptRow.append(apptDiv);
    const deleteEvent = $(
      "<button class='btn btn-primary 'id='deleteEvent'>"
    );
    deleteEvent.html("Remove event from calendar")
    const closeEvent = $(
      "<button class='btn btn-primary 'id='closeEvent'>"
    );
    closeEvent.html("Close event")
    const row2 = $("<div class='row'>");
    row2.append(deleteEvent, closeEvent)
    apptContainer.append(apptRow, row2);
    $("body").append(apptContainer);
    apptContainer.fadeIn(400);
  }

  const eventClickHandler = event => {
    const eventClicked = $(event.currentTarget);
    const eventDescription = eventClicked.attr("data-desc");
    const eventTitle = eventClicked.children(":first")[0].innerText;
    console.log(eventTitle)
    if (eventDescription.startsWith("http")){
      displayYTModal(eventTitle, eventDescription);
    } else{
      displayApptModal(eventTitle, eventDescription);
    }
  };

  const closeEventHandler = () => {
    $(".yt").fadeOut(400, () => {
      $(".yt").remove();
    })
  }


  //click listeners
  $("#submitExerciseReq").on("click", submitExerciseReqHandler);

  //dynamic click listeners

  $("body").on("click", "#searchAgain", searchAgainHandler);
  $("body").on("click", "#saveVideo", saveVideoHandler);
  $("body").on("click", ".event", eventClickHandler);
  $("body").on("click", "#closeEvent", closeEventHandler);

});
