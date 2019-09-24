const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

router.get('/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 );
    res.render('users/index', {
        users: matchedUsers
    });
});

router.get('/create', (req, res) => res.render('users/create'));

router.get('/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ /*id: id */ id }).value();
    res.render('users/view', {
        //user: user
        user
    });
});

router.post('/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;