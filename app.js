const http = require('http');
const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const expressHbs= require('express-handlebars');
const session= require('express-session');
const crypto = require('crypto')
var cookieParser = require('cookie-parser');


const adminRoutes = require('./routes/admin');
const shopRouter = require('./routes/shop');
const bankRouter = require('./routes/bank');
const loginRouter = require('./routes/login');
const supplyRouter = require('./routes/supply');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Balance = require('./models/balance');
const Cart = require('./models/cart');
const Order = require('./models/order');
const Transaction = require('./models/transaction');
const Supplier = require('./models/supplier');
const UserOrder = require('./models/order-user');

//const User = require('./models/user');

const app =express();

app.engine('hbs',expressHbs({
 layoutsDir : 'views/layouts',
 defaultLayout : 'main-layout',
 extname : 'hbs'
}));


app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({secret: "somerandomstuff", 
resave: true,
saveUninitialized: true}));
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });
app.use(adminRoutes);
app.use(shopRouter);
app.use(bankRouter);
app.use(loginRouter);
app.use(supplyRouter);
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.use((req,res,next ) =>
{

    //res.sendFile(path.join(__dirname,'views','404.ejs'));
    res.render('404',{
        pageTitle : 'Page Not Found',
        path :'/404',
        
    });
    

});

// Product.belongsTo(User, {constraints: true, onDelete : 'CASCADE' });
// User.hasMany(Product);

sequelize.sync().then(result =>{

    // User.create({name: "BookBD", email : "s@gmail.com", password : "1697", userType :"S"}).then().catch( err =>{
    //     console.log(err);
    // });
    // Balance.create({userId: 3, secretPin : "1697", currentBalance: 10000}).then().catch( err =>{
    //     console.log(err);
    // });

    app.listen(3000);

}).catch( err =>{
    console.log(err);
});
