import path from 'path';
import ProductModel from '../models/product.model.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { uploadFile } from '../middlewares/file-upload.middleware.js';

export default class ProductController{
    getProducts(req, res){
        let products = ProductModel.get();

        res.render("products", {products:products})

    //    return res.sendFile(
    //     path.join(path.resolve(), 'src','views', 'products.html'),
    //    );

    }
    getAddForm(req, res, next){
       return res.render("new-product", {errorMessage : null});
    }
    addNewProduct(req, res, next){
        //access data from form
        const {name, desc, price} = req.body;
        const imageUrl = 'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        let products = ProductModel.get();
        return res.render('products', {products});    
    }
    getUpdateProductView(req, res, next){
     
        const id = req.params.id;
        const productFound = ProductModel.getById(id);

           // if product exists then return view
        if(productFound){
            res.render('update-product', {product: productFound, errorMessage: null,});
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
          let products = ProductModel.get();
          return res.render('products', {products}); 

    }

    deleteProduct(req, res){
        const id = req.params.id;
        
        const productFound = ProductModel.getById(id);
          
        if(!productFound){
            return res.status(401).send('Product not found');
        }
        ProductModel.delete(id);
        let products = ProductModel.get();
        return res.render('products', {products}); 
    }
}