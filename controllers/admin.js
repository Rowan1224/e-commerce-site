
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct =(req,res,next ) =>
{
   
    //res.send('<form action="/products" method="POST">First name:<br><input type="text" name="firstname" ><input type="submit" value="Submit"></form>');
    //res.sendFile(path.join(rootDir,'views','add-product.html'));

   
    if(typeof(req.session.user) !== 'undefined')
      {
        if(req.session.user.userType === "A")
        {
          res.render('admin/add-product',{
            pageTitle : 'Add New Product',
            path :'/add-product',
            editing : false
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

exports.postAddProduct =(req,res,next ) =>
{
    console.log(req.body);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    Product.create({
        title : title,
        imageUrl : imageUrl,
        description : description,
        price : price
    }).then(result =>{
        console.log(result);
        res.redirect('/');
    }).catch(err =>{
        console.log(err);
    });
  

};
exports.getProducts =(req,res,next) =>
{

  if(typeof(req.session.user) !== 'undefined')
      {
        if(req.session.user.userType === "A")
        {
          Product.findAll().then(products =>{
            res.render('admin/products',{
                prods : products,
                path:"/admin-products",
                pageTitle :  'Admin Products'
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
exports.getEditProduct = (req, res, next) => {


  if(typeof(req.session.user) !== 'undefined')
      {
        if(req.session.user.userType === "A")
        {
          const editMode = req.query.edit;
          if (!editMode) {
            return res.redirect('/');
          }
          const prodId = req.params.productId;
          
            Product.findAll({where :{id : prodId}}).then(products => {
              res.render('admin/add-product', {
                  pageTitle: 'Edit Product',
                  path: '/admin/edit-product',
                  editing: editMode,
                  product: products[0]
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
  
  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
    Product.update({title: updatedTitle,
      price: updatedPrice,
      description: updatedDesc,
      imageUrl: updatedImageUrl},
      {where :{id : prodId}})
     
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/');
      })
      .catch(err => console.log(err));
  };

exports.postDeleteProduct =(req,res,next ) =>
{
  
   const prodId = req.body.productId;
   Product.destroy({where : {id : prodId}}) .then(result => {
    console.log('Deleted PRODUCT!');
    Cart.destroy({where : {productId : prodId}}) .then(result => {


      res.redirect('/');
    }).catch(err => console.log(err));
    
  })
  .catch(err => console.log(err));
   


       


};