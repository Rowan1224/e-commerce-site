const session= require('express-session');
const crypto = require('crypto');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const sequelize = require('../util/database');
const Transaction = require('../models/transaction');
const UserOrder = require('../models/order-user');


exports.getIndex =(req,res,next) =>
{
Product.findAll().then(products =>
    {
        res.render('shop/index',{
            prods : products,
            path:"/",
            pageTitle :  'Shop',
           }); 

    }).catch(err =>{
      console.log(err);
  });

  

};
exports.getProducts =(req,res,next) =>
{
    Product.findAll().then(products =>
        {
            res.render('shop/product-list',{
                prods : products,
                path:"/products",             
                pageTitle :  'Shop'
               });

        }).catch(err =>{
          console.log(err);
      });
  

       

 
};

exports.getProduct=(req,res,next) =>
{
    const prodId= req.params.productsId;
    Product.findAll({where :{id : prodId}}).then(products =>{
        res.render('shop/product-details',
       {product:products[0], 
        pageTitle: products[0].title,
        path:'/products'
    });
    }).catch(err =>{
        console.log(err);
    });
};
exports.getCart = (req, res, next) => {

    sequelize.query("select * from products left join carts on products.id = carts.productId")
    .then( result =>{
        const cartProducts = [];
       if(result.length > 0)
       {
               
        if(result[0].length>0 ){
                result[0].forEach(cart => {
                    //console.log(cart.title);
                    if(cart.qty > 0)
                    {
                        details ={
                            title: cart.title,
                            price: cart.price,
                            imageUrl : cart.imageUrl,
                            description : cart. description,

                            
                        };
                        cartProducts.push({ productData: details, qty: cart.qty ,id :cart.productId});
                    }
           
           
        });
       
       }
       res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });

       
    }
    else {
        res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
          });

    }
        });
        
   
    
};
exports.postCart =(req,res,next) =>
{
    const userId = req.session.user.id; // should be updated dynamically
    const qty = 1;
    const prodId = req.body.productId;

    Cart.findAll({where :{ productId: prodId}})
    .then( carts =>{
        if(carts.length === 0)
        {
            Cart.create({
                userId : userId,
                productId : prodId,
                qty : 1
            }).then(result =>{
                console.log(result);
                res.redirect('/cart');
            }).catch(err =>{
                console.log(err);
            });
        }
        else{
            Cart.update({qty: carts[0].qty+1},
                {where :{id : carts[0].id}})
               
                .then(result => {
                  console.log('UPDATED Cart!');
                  res.redirect('/cart');
                })
                .catch(err => console.log(err));
            }
        }

    ).catch(err => console.log(err));

};
exports.postDeleteCart =(req,res,next) =>
{
    const prodId = req.body.productId;
    Cart.destroy({where : {productId : prodId}}) .then(result => {


        res.redirect('/cart');
      }).catch(err => console.log(err));
    

};

exports.postConfirmOrder =(req,res,next) =>
{
    const products =JSON.parse(req.body.products);
    const totalPrice = req.body.totalPrice;
    const orderId = crypto.randomBytes(5).toString('hex'); 
    const userId = req.session.user.id;

    console.log(products);
    products.forEach(product =>{
        Order.create({orderId: orderId, productId : product.id, qty: product.qty}).then( res =>{
            console.log(product.id);
            UserOrder.create({orderId: orderId, userId : userId, price: totalPrice, status: "Pending"}).then( res =>{
                console.log(userId);
              
    
            }).catch(err => console.log(err));
    

        }).catch(err => console.log(err));

    });

    res.render('bank/validate',{
        pageTitle : 'Validate User',
        path :'/validate',
        orderId : orderId,
        totalPrice : totalPrice
    });


    

};

exports.getCheckout =(req,res,next) =>
{
    
    sequelize.query("select * from products left join carts on products.id = carts.productId")
    .then( result =>{
        const cartProducts = [];
        let totalPrice = 0;
       if(result.length > 0)
       {
               
        if(result[0].length>0 ){
                result[0].forEach(cart => {
                    //console.log(cart.title);
                    if(cart.qty > 0)
                    {
                        details ={
                            title: cart.title,
                            price: cart.price,
                            imageUrl : cart.imageUrl,
                            description : cart. description,
                            
                        };
                        cartProducts.push({ productData: details, qty: cart.qty ,id :cart.productId});
                        totalPrice = totalPrice + (cart.price * cart.qty);
                    }
           
           
        });
       
       }
       res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Your Order',
        products: cartProducts,
        totalPrice : totalPrice
      });

       
    }
    else {
        res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Your Order',
            products: cartProducts,
            totalPrice : totalPrice
          });

    }
        });
   

};
exports.getMyOrder =(req,res,next) =>
{
    const userId = req.session.user.id;
    UserOrder.findAll({
        where :{userId : userId}
    }).then(orders =>{
        //console.log((orders));
        
console.log(removeDuplicates(orders, "orderId"));

        res.render('shop/orders',
       {orders: removeDuplicates(orders, "orderId"),
        path:'/orders',
        pageTitle: 'MY Order'
    });
    }).catch(err =>{
        console.log(err);
    });
    

};

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}
