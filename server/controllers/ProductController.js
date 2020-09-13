const ProductModel = require('../models/Product');
const helper = require('./ProductControllerHelper');

exports.view = (req, res) => {
    const keyword = req.params.keyword;
    helper.configureHeader(res);
    ProductModel.find({
            product_name: new RegExp(keyword, 'i')
        },
        (err, items) => {
            if (err) {
                res.status(500).send(err);
            } else if (items.length > 0) {
                res
                    .status(200)
                    .send(items);
            } else {
                res.status(200);
                res.send(JSON.parse('{"response" : "No products available."}'));
            }
        });
}

exports.edit = (req, res) => {

    let productUpdate = Object.keys(req.body)[0];
    productUpdate = JSON.parse(productUpdate);
    const productId = req.params.productId;
    helper.configureHeader(res);
    ProductModel.update({
        product_id: productId
    }, productUpdate, (err, numAffectedRows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200)
                .send(JSON.parse('{"response" : "Product has been updated."}'));
        }
    });
}
exports.welcomeRoute = (req, res) => {
    helper.configureHeader(res);
    res.send(JSON.parse('{"response" : "Welcome to Product Management System."}'));
}

exports.nextProductId = (req, res) => {

    helper.configureHeader(res);

    ProductModel.find({}).sort({
        product_id: -1
    }).limit(1).then(products => {
        let maxId = products[0].product_id;
        maxId = parseInt(maxId) + 1;
        res.status(200)
            .send(JSON.parse(`{"productId" : ${maxId}}`));
    });
}

exports.add = (req, res) => {

    let productObject = Object.keys(req.body)[0];
    productObject = JSON.parse(productObject);
    res = helper.configureHeader(res);

    ProductModel.insertMany(productObject, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(JSON.parse('{"response" : "Product has been added."}'));
        }
    });
}