const express = require('express');
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const {newProduct, getProduct, createverify} = require('../controllers/productController');
const router = express.Router();

router.route('/addproduct/manufaturer').post(isAuthenticatedUser,authorizeRoles('Manufacturer'),newProduct);
router.route('/getProduct/:id').get(getProduct);
router.route('/putverify').put(isAuthenticatedUser,createverify);
module.exports = router;