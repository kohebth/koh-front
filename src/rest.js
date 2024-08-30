const http = require('http');
const axios = require("axios");

const gw = 'https://gw.vps-network'

export function registerUser(email, password) {
    try {
        return axios.post(gw + '/register', {'email': email, 'password': password});
    } catch (e) {
        return "Request failure!";
    }
}