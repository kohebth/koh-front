const axios = require('axios');
const https = require('https');
const fs = require('fs');

// const ca = fs.readFileSync('/app/ca.pem');
const agent = new https.Agent({rejectUnauthorized: false});
const host = 'gw.sv-network';
const port = '443';

function post(uri, data) {
    uri = uri.replaceAll(new RegExp('/+', 'g'), '/').replace(new RegExp('^/'), '');
    return axios.post(`https://${host}:${port}/${uri}`, data, { httpsAgent: agent })
        .then(r => {

        })
        .catch(e => console.log("Internal server error", e));
}

function get(requestId) {
    return axios.get(`https://${host}:${port}/request/${requestId}`, { httpsAgent: agent })
        .then(r => r)
        .catch(e => console.log("Internal server error", e));
}

module.exports = {post, get}