const session= require('express-session');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Supply = require('../models/supplier');
const sequelize = require('../util/database');
const Transaction = require('../models/transaction');
const Balance = require('../models/balance');


exports.getOrderlist=(req,res,next) =>
{

  if(typeof(req.session.user) !== 'undefined')
  {
    if(req.session.user.userType === "S")
    {
      Supply.findAll().then(orders =>
        {
            res.render('Supplier/order-list',{
                orders : orders,
                path:"/orders-list",
                pageTitle :  'Order',
               }); 
    
        }).catch(err =>{
          console.log(err);
      });
    
    }
  }
 else {
  res.render('bank/showMessage',{
    pageTitle : 'Message',
    path :'/message',
    message : "You are not authorized"
});
 } 

  

};

exports.getOrderDetails=(req,res,next) =>
{

  if(typeof(req.session.user) !== 'undefined')
  {
    if(req.session.user.userType === "S")
    {
      sequelize.query("select products.title,products.price,orders.qty from products left join orders on orders.productId = products.Id where orders.orderId = '"+req.params.orderId+"'")
      .then( result =>{
          const cartProducts = [];
         if(result.length > 0)
         {
         
                  result[0].forEach(cart => {
                      //console.log(cart.title);
                      if(cart.qty > 0)
                      {
                          details ={
                              title: cart.title,
                              price: cart.price,
                              qty : cart.qty,
                              description : cart. description,
    
                              
                          };
                          cartProducts.push({productData: details});
                      }
             
             
          });
          res.render('Supplier/order-details', {
            path: '/order-details',
            pageTitle: 'Order Details',
            products: cartProducts,
            orderId: req.params.orderId
          });
      
         }
    
      else {
        res.render('Supplier/order-details', {
          path: '/order-details',
          pageTitle: 'Order Details',
          products: cartProducts
        });
      }
          });
    
    }
  }
 else {
  res.render('bank/showMessage',{
    pageTitle : 'Message',
    path :'/message',
    message : "You are not authorized"
});
 } 

 
      
 
  

};



exports.postOrderValidation=(req,res,next) =>
{

 const orderId = req.body.orderId;
 const tranId = req.body.tranId;
 const price = req.body.price;

 Supply.findAll({where : {orderId : orderId, tranId : tranId}}).then( result =>
  {
      //console.log(result[0].dataValues.currentBalance);
      if(result.length >0)
      {
        res.render('bank/validate',{
          pageTitle : 'Validate User',
          path :'/validate',
          orderId : orderId,
          totalPrice : price,
          tranId : tranId
      });
      
          
      }
      else{
          res.render('bank/showMessage',{
              pageTitle : 'Message',
              path :'/message',
              message : "Invalid Transaction Request"
          });
      }
  }).catch( err =>{
      console.log(err);
  });
 
  

};