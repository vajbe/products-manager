const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/getProducts/', ProductController.view);
router.get('/getProducts/:keyword', ProductController.view);
router.post('/updateProduct/:productId', ProductController.edit);
router.get('/addProduct', ProductController.add);
router.get('/', ProductController.welcomeRoute);

module.exports = router;