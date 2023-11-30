import express from 'express';
import ProductController from './src/controllers/products.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import { validateHeaderValue } from 'http';
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';

const server = express();

server.use(express.static('public'));
server.use(cookieParser());

server.use(session({
    secret: 'secretKey',
    resave:false,
    saveUninitialized: true,
    cookie:{secure: false},
}))

//create an instance of ProductController
const productController = new ProductController();
const usersController = new UserController();

//parse form data
server.use(express.urlencoded({extended:true}));

//setup view engine settings
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(), 'src','views'));

server.use(ejsLayouts);

server.get('/register', usersController.getRegister);

server.get('/login', usersController.getLogin);

server.post('/login', usersController.postLogin);

server.get('/logout', usersController.logout);

server.post('/register', usersController.postRegister);

server.get('/',setLastVisit, auth, productController.getProducts);

server.get('/new',auth, productController.getAddProduct);

server.post('/',auth, uploadFile.single('imageUrl'), validationMiddleware, productController.addNewProduct);

server.get('/update-product/:id',auth, uploadFile.single('imageUrl'),  productController.getUpdateProductView);

server.post('/update-product',auth,uploadFile.single('imageUrl'), productController.postUpdateProduct);

server.post('/delete-product/:id',auth, productController.deleteProduct);

server.use(express.static('src/views'));

server.listen(3400, () =>{
    console.log("Server is listening on port 3400");
});
