var express = require('express');
var router = express.Router();
const CustomerController = require('../controllers/CustomerController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/customer', CustomerController.index)
router.get('/customer/add', CustomerController.add)
router.post('/customer/add', CustomerController.store)
router.get('/customer/edit/:id', CustomerController.edit)
router.post('/customer/edit/:id', CustomerController.update)
router.get('/customer/delete/:id', CustomerController.delete)



module.exports = router
