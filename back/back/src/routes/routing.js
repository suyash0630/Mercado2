const express=require('express');
const routing = express.Router();
const service = require('../service/user');
const Cart=require("../model/cart")
const User=require("../model/login")
const ViewOrder=require("../model/vieworder");

const Product=require("../model/prod")
//To verify the credentials of user
routing.post('/login', (req,res,next)=>{
    let uEmail= req.body.email;
    let uPass=req.body.password;
    return service.loginUser(uEmail, uPass).then(item => {
        res.json(item);
    }).catch(err => {
        next(err);
    });
});
routing.post('/sellerlogin', (req,res,next)=>{
    let sEmail= req.body.email;
    let sPass=req.body.password;
    return service.sellerLogin(sEmail, sPass).then(item => {
    //    console.log(item,"in routing");
        
        res.json(item);
    }).catch(err => {
        next(err);
    });
});

//to retrive the products based on category from database
routing.get("/products/:category",(req,res,next)=>{
    let pcategory=req.params.category;
    return service.retriveProducts(pcategory).then(product=>{
       // res.statusCode = 200;
        res.json(product);
    }).catch(err=>{
       // err.status = 404;
        next(err);
    })
})
routing.post("/cart",(req,res,next)=>{
    let cart=new Cart(req.body);
   // console.log(cart);
    return service.appendCart(cart).then(()=>{
      //  console.log(product);
      //  console.log(typeof(product)+"check typeof product");
      //  console.log('a');
        res.json({"message" : "added to the cart"} );
    }).catch(err => {
        next(err);});
})
routing.get("/cart/:userId",(req,res,next)=>{
    let userId=req.params.userId;
    // console.log("testcase")
    return service.retriveCart(userId).then(product=>{
        // console.log(product);
        res.json(product);
    }).catch(err=>{
       console.log(err +" in router for get cart");
    
        next(err);})
})
routing.post("/user",(req,res,next)=>{
    let user=new User(req.body);
    return service.appendUser(user).then(data=>{
        
        if(data)
        res.json({"message":"the email Id is registered: "+data});
        else{
            res.json({"message":"Already registerd with this email"});
        }
        
    }).catch(err => {
        next(err);});
})

routing.get("/orderhistory/:userId",(req,res,next)=>{
    let userId = req.params.userId;
    return service.vieworder(userId).then(pastorders=>{
       // console.log("a");
        res.json(pastorders);
    }).catch(err=>{
        next(err);})
})
// adds data to view order and delete from cart
routing.post("/checkout",(req,res,next)=>{
    
   // console.log(order);
 //   console.log("in router");
    let orders = [];
    for(let i=0;i<req.body.length;i++)
    {
        let order =new ViewOrder(req.body[i]);
        orders.push(order);
    //    console.log(order);
    }
    console.log(orders.length);
     
 //   console.log("routing");
    return service.appendvieworder(orders).then(()=>{
  //      console.log("----routier done");
 //       console.log("checked out routing");
        // console.log(product);
        res.json({"message":"booked the product"});
    }).catch(err => {
        next(err);});
    })

routing.get("/search/:prodname",(req,res,next)=>{
    let searchprod=req.params.prodname;
  //  console.log("backend"+searchprod)
    return service.searchProduct(searchprod).then(product=>{
      //  console.log(res.json(product)+"product");
        res.json(product);
    }).catch(err => {
        next(err);
    }); 
})
routing.post("/deletecartdata",(req,res,next)=>{
   let del = req.body;
  return service.deletecartdata(del).then(()=>{
       res.json({"message":"delete successfully"}) ;
    }).catch((err)=>{
        next(err);
    })
})
routing.post("/getsellerquantity",(req,res,next)=>{
    console.log("here aaaaaaaa")
  var sellerdata;  
  sellerdata = req.body;
  console.log(sellerdata);
 return service.getsellerquantity(sellerdata).then(response=>{
        console.log("routinf");
        console.log(response)
        res.json(response) ;
     }).catch((err)=>{
         next(err);
     })
})
module.exports = routing