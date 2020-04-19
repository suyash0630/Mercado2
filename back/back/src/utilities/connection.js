const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('userCreateIndex', true);
const url = "mongodb://localhost:27017/UsersDB"

const usersSchema = Schema({
    "userId" : {type : String, required : [true, 'userId is required']},
    "uCredentials" : {
        "uEmail" : {type : String, required : [true, 'uMail is required']},
        "uPass"  : {type : String, required : [true, 'uPass is required']}
    },
    "uProfile" : {
        "uName" : {type : String, required : [true, 'uName is required']},
        "uDOB" : {type : Date, required : [true, 'uDOB is required']},
        "uPhone" : {type : Number, required : [true, 'uPhone is required']},
        "uIsSeller" : {type : Boolean, default : false},
        "uDateJoined" : {type : Date, default : new Date().toISOString()},
        "uLastLogin" : {type : Date, default : new Date().toISOString()}
    }
}, {collection : "Users", timestamps: true })
const productSchema=Schema({
   "_id":{type:String,required:[true]},
    "pName":{type:String,required:[true,"product name is required"]},
    "pDescription":{type:String},
    "pRating":{type:Number},
    "pCategory":{type:String,required:[true]},
    "price":{type:Number,required:[true]},
    "color":{type:String,default:"Multi Color"},
    "image":{type:String,default:"https://www.seausvi.com/wp-content/uploads/2018/10/our-products_orig.png"},
    "specification":{type:String},
    "dateFirstAvailable":{type:Date, default : new Date().toISOString()},
    "dateLastAvailable":{type:Date, default : new Date().toISOString()},
    "pSeller":{
        "s_Id":{type:String,required:[true]},
        "pDiscount":{type:Number,required:[true]},
        "pQuantity":{type:Number,required:[true]},
        "pShippingCharges":{type:Number,default:150}
    }

},{collection:"products",timestamps: true })

const cartSchema=Schema({

    "productId":{type:String,required:[true]},
    "pName":{type:String,required:[true,"product name is required"]},
    "pQuantity":{type:Number,required:[true]},
    "userId":{type : String, required : [true, 'userId is required']},
    "image" :{type : String, required : [true]},
    "price":{type : Number, required : [true]},
    "s_Id":{type:String,required:[true]}
    

},{collection:"cart",timestamps: true})

const vieworderSchema=Schema({
    "userId":{ type : String, required : [true, 'userId is required']},
    "pName": { type:String,required:[true,"product name is required"]},
    "pQuantity": {type:Number,required:[true]},
    "s_Id":{type:String,required:[true]},
    "price":{type:Number,required:[true]},
    "image" :{type : String, required : [true]},
    "productId":{type:String,required:[true]},
    "orderDate":{type:String,required:[true]}
},{collection:"vieworders",timestamps: true})

const sellerSchema=Schema({
    "s_Id" : {type : String, required : [true, 's_Id is required']},
    "sCredentials" : {
        "sEmail" : {type : String, required : [true]},
        "sPass"  : {type : String, required : [true]}
    },
    "sProfile" : {
        "sName" : {type : String, required : [true]},
        "sTANNumber" : {type : String, required : [true]},
        "sGSTNumber" : {type : String, required : [true]},
        "sAccountNumber":{type:Number,required:[true]},
        "sPhone":{type:Number,required:[true]},
        "sDateJoined" : {type : Date, default : new Date().toISOString()},
        "sLastLogin" : {type : Date, default : new Date().toISOString()}
    }
}, {collection : "sellers", timestamps: true })

let connection = {}

//Returns model object of "Users" collection
//does the registration of user
connection.getCollection = () => {
    //Establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true}).then( database => {
        return database.model('Users', usersSchema)
    }).catch( () => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}
connection.getSellerCollection=()=>{
    return mongoose.connect(url, {useNewUrlParser: true}).then(database=>{
        return database.model("sellers",sellerSchema)
    }).catch( () => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}
connection.getProductsCollection=()=>{
    return mongoose.connect(url,{useNewUrlParser: true}).then(database=>{
        return database.model("products",productSchema)
    }).catch(()=>{
        let err=new Error("Could not connect to the database");
        err.status=500;
        throw err;
    })
}
connection.getCartCollection=()=>{
    return mongoose.connect(url,{useNewUrlParser: true}).then(database=>{
        return database.model("cart",cartSchema)
    }).catch(()=>{
        let err=new Error("Could not connect to the database");
        err.status=500;
        throw err;
    })
}
connection.getvieworderCollection=()=>{
    return mongoose.connect(url,{useNewUrlParser: true}).then(database=>{
        return database.model("vieworders",vieworderSchema)
    }).catch(()=>{
        let err=new Error("Could not connect to the database");
        err.status=500;
        throw err;
    })
}
module.exports = connection;