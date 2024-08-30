function handle(req, res) {
    const {email, password, confirmPassword} = req.body;
    res.render('login-register', {email, password, confirmPassword});
    console.log(email, password, confirmPassword);
    // res.redirect('/confirmation');
}