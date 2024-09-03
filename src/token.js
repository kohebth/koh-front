const axios = require('axios');
const gw = require('./gateway');

function handle(req, res) {
    const {email, refresh_token} = req.session.user;
    return gw.request('refresh', {email, refresh_token});
}

module.exports = {handle}