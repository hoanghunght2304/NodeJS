const express = require('express');
const app = express();

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));