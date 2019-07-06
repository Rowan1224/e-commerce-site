const crypto = require('crypto')
const Transaction = require('../models/transaction');
const Balance = require('../models/balance');
const Supplier = require('../models/supplier');
const sequelize = require('../util/database');

exports.postCashIN =(req,res,next ) =>
{
    const Ecommerce = "2";
    console.log(req.body);
    const cashINid = Ecommerce;
    const cashOUTid = req.body.userId;
    const tranId = crypto.randomBytes(5).toString('hex');
    const amount = req.body.amount;
    const orderId = req.body.orderId;
    Transaction.create({
        cashINid : cashINid,
        cashOUTid : cashOUTid,
        tranId : tranId,
        amount : amount
    }).then(result =>{
        //console.log(result);
     sequelize.query('UPDATE balances SET currentBalance = currentBalance - ? where userId = ?',{ replacements: [amount ,cashOUTid]})
     .then( r =>
     {
        sequelize.query('UPDATE balances SET currentBalance = currentBalance + ? where userId = ?',{ replacements: [amount ,Ecommerce]}).then( res =>{

            
            Supplier.create({price: amount, orderId: orderId, tranId: tranId, validation: false});
           
        });
        res.render('bank/showMessage',{
            pageTitle : 'Message',
            path :'/message',
            message : "Success"
        });  
        
     }).catch(err =>{
        res.render('bank/showMessage',{
            pageTitle : 'Message',
            path :'/message',
            message : "Error"
        });
       // res.redirect('/message',{message : "Error"});
        console.log(err);
    });
        }).catch(err =>{
        console.log(err);
    });
};

exports.postCashOUT =(req,res,next ) =>
{
    const Ecommerce = 2;
    console.log(req.body);
    const cashINid = req.body.userId;
    const cashOUTid = Ecommerce;
    const tranId = crypto.randomBytes(5).toString('hex');
    const amount = req.body.amount;
    const orderId = req.body.orderId;
    Transaction.create({
        cashINid : cashINid,
        cashOUTid : cashOUTid,
        tranId : tranId,
        amount : amount
    }).then(result =>{
        //console.log(result);
     sequelize.query('UPDATE balances SET currentBalance = currentBalance - ? where userId = ?',{ replacements: [amount ,cashOUTid]})
     .then( r =>
     {
        sequelize.query('UPDATE balances SET currentBalance = currentBalance + ? where userId = ?',{ replacements: [amount ,cashINid]}).then( res =>{

            //update user status & validation
            //Supplier.create({price: amount, orderId: orderId, tranId: tranId, validation: false});
            sequelize.query('UPDATE suppliers SET validation = true where orderId = ?',{ replacements: [orderId]}).then( res =>{

                //update user status & validation
                //Supplier.create({price: amount, orderId: orderId, tranId: tranId, validation: false});
                sequelize.query('UPDATE UserOrders SET status = ? where orderId = ?',{ replacements: ["Shipped",orderId]}).then( res =>{

                  
                   
                });
               
            });
        });
        res.render('bank/showMessage',{
            pageTitle : 'Message',
            path :'/message',
            message : "Success"
        });  
        
     }).catch(err =>{
        res.render('bank/showMessage',{
            pageTitle : 'Message',
            path :'/message',
            message : "Error"
        });
       // res.redirect('/message',{message : "Error"});
        console.log(err);
    });
        }).catch(err =>{
        console.log(err);
    });
};


exports.getBalance =(req,res,next ) =>
{
    res.render('bank/balance',{
        pageTitle : 'Balance',
        path :'/balance',
       
       
    });

};

exports.postBalance =(req,res,next ) =>
{
    console.log(req.body.userId);
    const userId = req.body.userId;
    const pin = req.body.secretPin;
   
    Balance.findAll({where : {userId : userId, secretPin : pin}}).then( result =>
    {
        //console.log(result[0].dataValues.currentBalance);
        if(result.length >0)
        {
            res.render('bank/showBalance',{
                pageTitle : 'Balance',
                path :'/showBalance',
                id : userId,
                Balance : result[0].dataValues.currentBalance
            });
            
        }
        else{
            res.render('bank/showMessage',{
                pageTitle : 'Message',
                path :'/message',
                message : "Error"
            });
        }
    }).catch( err =>{
        console.log(err);
    });
};

exports.postMessage =(req,res,next ) =>
{
    
    res.render('bank/showMessage',{
        pageTitle : 'Message',
        path :'/message',
        message : req.body.message
    });   
};

exports.postValidate =(req,res,next ) =>
{
    const userId = req.body.userId;
    const pin = req.body.secretPin;
    const orderId = req.body.orderId;
    const totalPrice = req.body.amount;
    Balance.findAll({where : {userId : userId, secretPin : pin}}).then( result =>
    {
        if(result.length >0)
        {
            res.render('bank/cashINOUT',{
                pageTitle : 'Tranaction',
                path :'/cashIN',
                id : userId,
                orderId : orderId,
                totalPrice : totalPrice
            });
            
        }
        else{
            res.render('bank/showMessage',{
                pageTitle : 'Message',
                path :'/message',
                message : "Error"
            });
        }
    }).catch( err =>{
        console.log(err);
    });

};


exports.getValidate =(req,res,next ) =>
{
    res.render('bank/validate',{
        pageTitle : 'Validate User',
        path :'/validate',
        editing : false
    });
};

exports.getCashIN =(req,res,next ) =>
{


};

exports.getCashOUT =(req,res,next ) =>
{
};

exports.postSupplierValidate =(req,res,next ) =>
{
    const userId = req.body.userId;
    const pin = req.body.secretPin;
    const orderId = req.body.orderId;
    const totalPrice = req.body.amount;
    Balance.findAll({where : {userId : userId, secretPin : pin}}).then( result =>
    {
        if(result.length >0)
        {
            res.render('bank/cashINOUT',{
                pageTitle : 'Tranaction',
                path :'/cashOUT',
                id : userId,
                orderId : orderId,
                totalPrice : totalPrice
            });
            
        }
        else{
            res.render('bank/showMessage',{
                pageTitle : 'Message',
                path :'/message',
                message : "Error"
            });
        }
    }).catch( err =>{
        console.log(err);
    });

};