const md5 = require('md5');
const db = require('../db');

module.exports.login = (req, res) => res.render('auth/login');

module.exports.postLogin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = db.get('users').find({email/* email: email*/}).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exist'
            ],
            values: req.body
        });
        return;
    }

    let hashedPassword = md5(password);

    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password!'
            ],
            values: req.body
        });
        return;
    }
    
    res.cookie('userId', user.id);
    res.redirect('/users');
};