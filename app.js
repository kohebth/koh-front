const express = require('express');
const path = require('path');
const axios = require('axios');
const rest = require('./src/rest.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', function (req, res) {
    res.render('login-register');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    res.redirect('/confirmation');
});

app.post('/register', (req, res) => {
    const {email, password, confirmPassword} = req.body;
    // res.render('login-register', {email, password, confirmPassword});
    console.log(email, password, confirmPassword);
    rest.registerUser(email, password);
});

app.get('/confirmation', async (req, res) => {
    res.render('confirmation', {token});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});