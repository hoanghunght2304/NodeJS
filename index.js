const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const users = [
        {id: 1, name: 'Hung'},
        {id: 2, name: 'Huong'}       
];

app.get('/', (req, res) => res.render('index', {name: 'AAA'}));

app.get('/users', (req, res) => res.render('users/index', {
    users: users
}));

app.get('/users/search', (req, res) => {
    let q = req.query.q;
    let matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 );
    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', (req, res) => res.render('users/create'));

app.post('/users/create', (req, res) => {
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));