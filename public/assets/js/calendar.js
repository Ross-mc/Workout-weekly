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
        console.log(res);
    });
  };
  $("#submitExerciseReq").on("click", submitExerciseReqHandler);
});
