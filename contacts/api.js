var express = require('express'),
    Bourne = require('bourne'),
    bodyParser = require('body-parser'),

    db = new Bourne('data.json'),
    router = express.Router();

router
    .use(bodyParser.json())
    .route('/contact')
        .get(function (req, res) {
            db.find({userId: parseInt(req.user.id, 10)}, function (err, data) {
                if (err) throw err;
                res.json(data);
            });
        })
        .post(function (req, res) {
            var contact = req.body;
            contact.userId = req.user.id;

            db.insert(contact, function (err, data) {
                if (err) throw err;
                res.json(data);
            });
        });

router
    .param('id', function (req, res, next) {
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        next(); // pour passer la requ�te aux fonctions suivantes
    })
    .route('/contact/:id')
        .get(function (req, res) {
            db.findOne(req.dbQuery, function (err, data) {
                if (err) throw err;
                res.json(data);
            });
        })
        .put(function (req, res) {
            var contact = req.body;
            delete contact.$promise;
            delete contact.$resolved;
            db.update(req.dbQuery, contact, function (err, data) {
                if (err) throw err;
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            db.delete(req.dbQuery, function () {
                res.json(null);
            })
        });

module.exports = router;