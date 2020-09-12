const ProductModel = require('../models/Product');

exports.view = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    const keyword = req.params.keyword;

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
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    const productUpdate = req.body;
    const productId = req.params.productId;
    console.log(productUpdate);
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
    res.send(JSON.parse('{"response" : "Welcome to Product Management System."}'));
}

exports.add = (req, res) => {
    ProductModel.find({}).sort({
        product_id: -1
    }).limit(1).then(products => {
        const maxId = products[0].product_id;
        const productObject = {
            // product_id: parseInt(maxId)+1,
            // product_name: 'Acer Hashtag V728',
            // selling_price: 500,
            // cost_price: 200,
            // quantity: 10
        };
        insertItem(productObject, req, res);
    });
}

const insertItem = (productObject, req, res) => {
    ProductModel.insertMany(productObject, (err, response) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(JSON.parse('{"response" : "Product has been added."}'));
        }
    });
}