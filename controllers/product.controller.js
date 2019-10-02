const db = require('../db');

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 1; //n
    let perpage = 8; //x

    let start = (page - 1) * perpage;
    let end = page * perpage;
    res.render('products/index', {
        //products: db.get('products').value().slice(start, end)
        products: db.get('products').drop(start).take(perpage).value()
    });
};