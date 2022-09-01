var express = require('express');
var router = express.Router();
const CustomerController = require('../controllers/CustomerController')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const salt = "$2b$10$TrZfpw5.LSTuioX1GCbw8.";
const AuthMiddleware = require('../middlewares/AuthMiddleware')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(!req.session.hit) {
    req.session.hit = 1
  } else {
    req.session.hit++;
  }
  res.render('index', { title: 'Express', hit: req.session.hit });
});

router.get("/hash", function(req,res) {
  const hash = bcrypt.hashSync("admin", salt);
  res.send(hash)
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res, next) {
  delete req.session.user
  res.redirect('login');
});

router.get('/check-loggedin', AuthMiddleware.redirect, function(req, res, next) {
  let user = req.session.user
  res.send(`Halaman User.<br/>Nama user: ${user.firstname}`);
});

router.get('/page1', AuthMiddleware.redirect, function(req, res, next) {
  res.send(`Halaman 1`);
});

router.get('/page2', AuthMiddleware.redirect, function(req, res, next) {
  res.send(`Halaman 2`);
});


// login action
router.post('/login', async function(req, res, next) {
  let input = req.body;
  // cek email login
  const user = await User.findOne({
    where: {
      email: input.email
    }
  });

  if(!user) {
    return res.send("Gagal Login")
  }

  if(!bcrypt.compareSync(input.password, user.password)) {
    return res.send("Password Salah")
  }

  // simpan sessi login
  req.session.user = {
    id : user.id,
    firstname: user.firstName
  }

  res.send("Anda Berhasil Login")

});

router.get('/customer', CustomerController.index)
router.get('/customer/add', CustomerController.add)
router.post('/customer/add', CustomerController.store)
router.get('/customer/edit/:id', CustomerController.edit)
router.post('/customer/edit/:id', CustomerController.update)
router.get('/customer/delete/:id', CustomerController.delete)



module.exports = router
