import path from 'path';
import ProductModel from '../models/product.model.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { uploadFile } from '../middlewares/file-upload.middleware.js';

export default class ProductController{
    getProducts(req, res){
        var products = ProductModel.get();

        res.render("products", {products, userEmail : req.session.userEmail});

    //    return res.sendFile(
    //     path.join(path.resolve(), 'src','views', 'products.html'),
    //    );

    }
    getAddProduct(req, res, next){
       return res.render("new-product", {errorMessage : null, userEmail : req.session.userEmail});
    }
    addNewProduct(req, res, next){
        //access data from form
        const {name, desc, price} = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        var products = ProductModel.get();
        return res.render('products', {products, userEmail : req.session.userEmail});    
    }
    getUpdateProductView(req, res, next){
     
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

           // if product exists then return view
        if(productFound){
            res.render('update-product', {product: productFound, errorMessage: null, userEmail : req.session.userEmail});
        }
           //else return errors
        else{
            res.status(401).send('Product not found');
        }
    }

    postUpdateProduct(req, res, next){
          //access data from form
          const {id,name, desc, price} = req.body;
          const imageUrl = 'images/' + req.file.filename;

          ProductModel.update(id,name, desc, price, imageUrl);
          var products = ProductModel.get();
          return res.render('products', {products, userEmail : req.session.userEmail}); 

    }

    deleteProduct(req, res){
        const id = req.params.id;
        
        const productFound = ProductModel.getById(id);
          
        if(!productFound){
            return res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        return res.render('products', {products, userEmail : req.session.userEmail}); 
    }
}