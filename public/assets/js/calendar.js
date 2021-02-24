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
      const ytContainer = $("<div class = 'container'>");
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
        "<button class='btn btn-primary' type='reset' value='Reset'>"
      );
      saveBtn.html("Save Video");
      searchAgainBtn.html("Search Again");
      ytContainer.append(ytDiv, saveBtn, searchAgainBtn);
      $("body").append(ytContainer);
    });
  };
  $("#submitExerciseReq").on("click", submitExerciseReqHandler);

  var workoutDatePicker = new Pikaday({ field: $('#workout-date')[0] });
  var eventDatePicker = new Pikaday({ field: $('#event-date')[0] });

  // const hours = []
  //       for(let i = 0; i < 24; i++) {
  //         let time = ""
  //         if(i < 10) {
  //           time = `0${i}:00`
  //         }
  //         else {
  //           time = `${i}:00`
  //         }
  //         hours.push(time)
  //       }

  //       $(".day").each((i, elem) => {
  //         hours.forEach(hour => { 
  //           console.log(hour)
  //           const div = $("<div class='hour'>")
  //           const p = $("<p class='time'>")
  //           p.text(hour)
  //           div.append(p)

  //           // console.log()

  //           $(elem).append(div)
  //         })

  //       })
});
