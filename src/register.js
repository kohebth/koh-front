const axios = require('axios');
const gw = require('./gateway');

var message;

function handle(req, res) {
    const {email, password, confirmPassword} = req.body;
    if (password === confirmPassword) {
        gw.post('register', {email, password})
            .then(r => gw.get(r.data))
            .then(
                r => {
                    if (r.status === 200) {
                        res.render('register-confirmation')
                    } else {
                        let message = r.data.message
                        res.render('entry', {login, error, message});
                    }
                }
            );
    } else {
        let message = 'Confirmation password is not matched';
        let error = true;
        let login = false;
        res.render('entry', {login, error, message});
    }
}

module.exports = {handle}