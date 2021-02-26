//LOGOUT
$(document).ready(() => {

    // reference to logout form
    const logoutForm = $("form.logout");

    // when the form is submitted, we end the application
    logoutForm.on("submit", event => {
        event.delete();
    })

    // if successful redirects to login page

    
})
const logout = () => {
    const logoutBtn = $("#logout-btn").val();


$.ajax({
    url: "/logout",
    data: {
        logoutBtn
    },
    method: "GET" 
}).then(res => {
    
})
}