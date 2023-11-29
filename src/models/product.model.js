export default class ProductModel {
    
    constructor(_id,_name,_desc,_price,_imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc= _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }

    static get() {
        return products;
    }

    static add(name, desc, price, imageUrl){
        let newProduct = new ProductModel(products.length+1, name, desc, price, imageUrl);
        products.push(newProduct);
    } 
    static update(productObj){
        const index = products.findIndex(
            (p) => p.id == productObj.id);
            products[index] = productObj;

    }
    static delete(id){
        const index = products.findIndex(p => p.id == id);
        products.splice(index, 1);
    }
    
   static getById(id){
    return products.find((p) =>p.id ==id);
   } 
}

var products= [
    new ProductModel(1, 'Product1', 'Description for Product1',19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg'),
    new ProductModel(2, 'Product2', 'Description for Product2',29.99, 'https://m.media-amazon.com/images/I/41mtUoTi8ZL._SY445_SX342_.jpg'),
    new ProductModel(3, 'Product3', 'Description for Product3',39.99, 'https://m.media-amazon.com/images/I/61TkOFwquPL._SY522_.jpg'),
];