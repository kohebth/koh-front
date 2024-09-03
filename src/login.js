const axios = require('axios');
const gw = require('./gateway');

var message;

function handle(req, res) {
    const {email, password} = req.body;
    return gw.post('login', {email, password})
        .then(r => {
            let requestId = r.data;
            return gw.get(requestId);
        });
}

module.exports = { handle }