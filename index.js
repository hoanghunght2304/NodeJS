const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({users: []})
  .write();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render('index', {name: 'AAA'}));

app.get('/users', (req, res) => res.render('users/index', {
    users: db.get('users').value()
}));

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 );
    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', (req, res) => res.render('users/create'));

app.get('/users/:id', (req, res) => {
    let id = req.params.id;
    let user = db.get('users').find({ /*id: id */ id }).value();
    res.render('users/view', {
        //user: user
        user
    });
});


app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));