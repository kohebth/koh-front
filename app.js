const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
const auth = require('./src/auth');
const register = require('./src/register')
const login = require('./src/login')

/* Init app */
const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'))
// app.set('css', path.join(__dirname, 'css'))
// app.set('js', path.join(__dirname, 'js'))
// app.set('css/bootstrap', path.join(__dirname, 'node_modules/bootstrap'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    genid: () => crypto.randomBytes(64).toString('hex'),
    secret: 'kl12h4kj1',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: 'strict'
    }
}));
// app.use(auth.handle)

app.get('/', function (req, res) {
    let message = '';
    let error = false;
    let action = 'login';
    if (req.query.action !== undefined) {
        action = req.query.action
    }
    res.render('entry', {error, action, message});
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/');
    });
});

app.get('/index', async (req, res) => {
    let companyFeedData = [
        {
            date: "Jan 20, 2017",
            activities: [
                {
                    time: "12:45",
                    type: "TASK",
                    description: "Teleconference with client was added",
                    company: "Granado Rubio + Lynch"
                },
                {time: "09:22", type: "CONTACT", description: "Andrew Smith was added"}
            ]
        },
        {
            date: "Jan 19, 2017",
            activities: [
                {
                    time: "19:07",
                    type: "ACTIVITY",
                    description: "0h 45m was logged in Research",
                    company: "Davis Wells Fargo"
                },
                {time: "12:56", type: "ACTIVITY", description: "2h 15m was logged in Communicate (reports)"}
            ]
        }
    ];
    res.render("index", {feed: companyFeedData});
});

app.get('/newvps', (req, res, next) => {
    let companyFeedData = [];
    let form = {
        input: [
            {
                id: 'name',
                name: 'name',
                label: 'VPS Name'
            }
        ],
        options: [
            {
                id: 'os',
                name: 'os',
                label: 'OS',
                items: [
                    {
                        value: 1,
                        label: 'Ubuntu 22.04'
                    }
                ]
            },
            {
                id: 'net',
                name: 'net',
                label: 'Network',
                items: [
                    {
                        value: 1,
                        label: 'vps-network'
                    }
                ]
            },
            {
                id: 'mem',
                name: 'mem',
                label: 'Memory Size',
                items: [
                    {
                        value: 256,
                        label: '256MB'
                    },
                    {
                        value: 512,
                        label: '512MB'
                    },
                    {
                        value: 1024,
                        label: '1GB'
                    }
                ]
            },
            {
                id: 'vol',
                name: 'vol',
                label: 'Volume Size',
                items: [
                    {
                        value: 2*1024,
                        label: '2GB'
                    },
                    {
                        value: 4*1024,
                        label: '4GB'
                    }
                ]
            }
        ]
    };
    res.render("index", {feed: companyFeedData, newvps: true, form});
})

app.post('/login', (req, res, next) => {
    let {email} = req.body;
    login.handle(req, res).then(r => {
        let {access_token, refresh_token} = r.data;
        req.session.isAuthenticated = true;
        req.session.user = {email, refresh_token, access_token};
        res.setHeader('Authorization', `Bearer ${access_token}`);
        res.redirect("/");
    }).catch(e => {
        next(e);
    });
});

app.post('/register', (req, res) => register.handle(req, res));

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack
    res.status(500).send(`<h1> 500 </h1><h2> INTERNAL SERVER ERROR </h2>`); // Render an error template
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});