const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/getProducts/', ProductController.view);
router.get('/getProducts/:keyword', ProductController.view);
router.post('/updateProduct/:productId', ProductController.edit);
router.post('/addProduct', ProductController.add);
router.get('/getNextProductId', ProductController.nextProductId);
router.get('/', ProductController.welcomeRoute);

module.exports = router;