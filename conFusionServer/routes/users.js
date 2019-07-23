var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user')
var router = express.Router();
router.use(bodyParser.json());
var passport = require('passport');
var authenticate = require('../authenticate');
var cors = require('./cors');


/* GET users listing. */
//Below code allows admins to get a list of users registered
router.get('/', cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});


router.post('/signup',cors.corsWithOptions, function(req, res, next) {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstName){
        user.firstName = req.body.firstName;
      }
      if(req.body.lastName){
        user.lastName = req.body.lastName;
      }
      user.save((err, user) => {
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req,res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({status: 'Registaration Successful!', success: true})
      });
      });
    }
  })    
});


router.post('/login',cors.corsWithOptions, passport.authenticate('local'), (req, res, next) => {
  var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, token: token, status: 'Login Successful!'})
});

router.get('/logout', (req,res, next) => {
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('You are not logged in');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res,) => {
  if(req.user){
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, token: token, status: 'Login Successful!'})
  }
});

module.exports = router;
