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



app.delete('/logout', function (req, res) {
    req.session.currentUser = null;
    res.redirect('/');
});