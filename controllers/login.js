
const Product = require('../models/product');
const user = require('../models/user');

exports.getLogin =(req,res,next ) =>
{
   
    res.render('auth/login',{
    pageTitle : 'Sign In',
    path :'/login',
   
});
};

exports.postLogin =(req,res,next ) =>
{
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);

user.findOne({ where: { name: username } }).then(function (user) {
    if (!user) {
        res.redirect('/login');
    } else if (user.password !== password) {
        res.redirect('/login');
    } else {
        req.session.user = user.dataValues;
        console.log(req.session);
        res.redirect('/');

    }
    console.log(user.password);
});
};

exports.getlogout =(req,res,next ) =>
{
   
  
    req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
};