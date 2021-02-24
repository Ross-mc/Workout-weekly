$(() => {
  const submitExerciseReqHandler = () => {
    const categorySelected = $("#category").val();
    const durationSelected = $("#duration").val();
    $.ajax({
      url: "/api/getVideo",
      data: {
        categorySelected,
        durationSelected
      },
      method: "GET"
    }).then(res => {
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
      const saveBtn = $("<button class ='btn btn-primary' type= 'submit'>");
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


  $("#submitExerciseReq").on("click", submitExerciseReqHandler);

  //dynamic click listeners

  $("body").on("click", "#searchAgain", searchAgainHandler);

  var workoutDatePicker = new Pikaday({ field: $('#workout-date')[0] });
  var eventDatePicker = new Pikaday({ field: $('#event-date')[0] });


});
