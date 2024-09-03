
const filter = {
    path: [
        '/login',
        '/'
    ],
    to: '/index',
    back: '/'
}

function handle(req, res, next) {
    let isAuthenticated = req.session.isAuthenticated || false;

    if (isAuthenticated === false && !req.path in filter.path) {
        res.redirect(filter.back);
    } else if (isAuthenticated === true && req.path in filter.path) {
        res.redirect(filter.to);
    } else {
        next();
    }
}

module.exports = {handle}