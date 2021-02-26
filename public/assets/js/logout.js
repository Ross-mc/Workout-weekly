//LOGOUT
$(document).ready(() => {
  const submitLogoutHandler = () => {
    console.log("i've been clicked");

    $.ajax({
      url: "/logout",
      method: "GET",
    }).then((res) => {
      window.location.reload();
    });
  };
  // click listener
  $("#logout-btn").on("click", submitLogoutHandler);
});