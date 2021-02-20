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
        const ytDiv = $("<div class = 'ytDiv embed-responsive embed-responsive-16by9'>");
        const videoEl = $("<iframe class = 'embed-responsive-item' allowfullscreen>");
        videoEl.attr("src", res);
        ytDiv.append(videoEl);
        const saveBtn = $("<button class ='btn btn-primary' type= 'submit'>");
        const searchAgainBtn = $("<button class='btn btn-primary' type='reset' value='Reset'>");
        saveBtn.html("Save Video");
        searchAgainBtn.html("Search Again");
        ytContainer.append(ytDiv, saveBtn, searchAgainBtn);
        $("body").append(ytContainer);
    });
  };
  $("#submitExerciseReq").on("click", submitExerciseReqHandler);
});
