const collection = require('../utilities/connection');
let user = {}
user.generateSellerId = () => {
    return collection.getProductsCollection().then((model) => {
        return model.distinct("_id").then((ids) => {
            var bId = Math.max(...ids);
            bId=bId + 1;
            return String(bId);
        })
    })
}
user.addProduct=(product)=>{
    return collection.getProductsCollection().then((model)=>{
        return user.generateSellerId().then((id)=>{
            product._id = id;
            return model.create(product).then((data)=>{
              //  console.log(`Successfully inserted item with _id: ${data._id}`)
                return data;
            }).catch(err => console.error(`Failed to insert item: ${err}`))
        })
    })
}
//Verify the user credentials and modify the last logout
user.userLogin = (uEmail, uPass) => {
    return collection.getCollection().then(userColl => {
        return userColl.find({ "uCredentials.uEmail": uEmail }).then(data => {
            if (data.length === 1) {
                if (uPass == data[0]['uCredentials']['uPass']) {
                    return userColl.updateOne({ "uCredentials.uEmail": uEmail }, { $set: { "uProfile.uLastLogin": new Date().toISOString() } }).then(res => {
                        if (res.nModified === 1) {
                            return data
                        }
                    })
                } else {
                    let err = new Error("The password entered is incorrect!!");
                    err.status = 401;
                    throw err;
                }
            } else {
                let err = new Error("You are not registered.Please register to login");
                err.status = 404;
                throw err;
            }
        })
    })
}
user.sellerLogin = (sEmail, sPass) => {
    return collection.getSellerCollection().then(sellerColl => {
        return sellerColl.find({ "sCredentials.sEmail": sEmail }).then(data => {
            if (data.length === 1) {
                if (sPass == data[0]['sCredentials']['sPass']) {
                    return sellerColl.updateOne({ "sCredentials.sEmail": sEmail }, { $set: { "sProfile.sLastLogin": new Date().toISOString() } }).then(res => {
                        if (res.nModified === 1) {
                            return sEmail
                        }
                    })
                } else {
                    let err = new Error("The password entered is incorrect!!");
                    err.status = 401;
                    throw err;
                }
            } else {
                let err = new Error("You are not registered.Please register to login");
                err.status = 404;
                throw err;
            }
        })
    })
}
user.getProducts=(s_Id)=>{
    return collection.getProductsCollection().then(prod => {
        return prod.find({"pSeller.s_Id" : s_Id}).then(data => {
           // console.log(data)
            if (data.length < 0) {
                let err = new Error("No products with that sellerId");
                err.status = 404;
                throw err;
            }
            else {
                return data;
            }
        })
    })
}
user.retriveProducts = (pcategory) => {

    return collection.getProductsCollection().then(prod => {
        console.log("data")
        return prod.find({ "pCategory": pcategory , "pSeller.pQuantity" : { $gt:0 }}).then(data => {
           console.log("data")
            if (data.length < 0) {
                let err = new Error("No products with that category");
                err.status = 404;
                throw err;
            }
            else {
                data.statusCode = 200;
                return data;
            }
        })
    })
}
user.appendCart = (cart) => {
    return collection.getCartCollection().then(prod => {
        //console.log(cart)
        return prod.updateOne({ $and: [{ "s_Id": cart.s_Id }, { "productId": cart.productId }, {"userId": cart.userId}] }, { $inc: { "pQuantity": + cart.pQuantity } }).then((updated) => {
            if(updated.nModified>0)
            {
               // console.log("modified");
                return cart;
            }
            else
            {
                return prod.create(cart).then(data => {
                    // console.log(data);
                    // console.log(`Successfully inserted item with _id: ${data.productId}`)
                     return data;
                 }).catch(err => console.error(`Failed to insert item: ${err}`))
            }
        })
        
    })
}
user.retriveCart = (userId) => {
    return collection.getCartCollection().then(prod => {
        return prod.find({ "userId": userId }).then(data => {
         //   console.log(data);
         //   console.log(data.length);
            if (data.length <= 0) {
                console.log("err in retrive cart");
               return null;
            }
            else {
                return data;
            }
        })
    })
}
user.chkuser = (user1) => {
    console.log()
    return collection.getCollection().then(data => {
        console.log(user1)
        return data.find({"uCredentials.uEmail":user1}).then((res) => {
         //   console.log(res);
         //   console.log(`Successfully inserted user with _id: ${res.userId}`)
            return res;
        }).catch(err => console.error(`Failed to insert item: ${err}`))
    })
}
user.appendUser = (user) => {
    
    return collection.getCollection().then(data => {
        return data.create(user).then((res) => {
         //   console.log(res);
         //   console.log(`Successfully inserted user with _id: ${res.userId}`)
            return res.userId;
        }).catch(err => console.error(`Failed to insert item: ${err}`))
    })
}
user.appendSeller=(seller)=>{
    return collection.getSellerCollection().then(data=>{
        return data.create(seller).then((res)=>{
         //   console.log(`Successfully inserted seller with _id: ${res.s_Id}`)
            return res.s_Id;
        }).catch(err => console.error(`Failed to insert item: ${err}`))
    })
}
user.deletecartdata = (order)=>{
    return collection.getCartCollection().then((cartdata)=>{
      //  console.log(order);
        return cartdata.findOne({ $and: [{"userId":order.userId},{"productId":order.productId},{"s_Id":order.s_Id}]}).then((data)=>{
                if(data==null)
                {
                    return false;
                }
                else
               {
                   return cartdata.deleteOne({ $and: [{"userId":order.userId},{"productId":order.productId},{"s_Id":order.s_Id}]}).then((deleted)=>{
                       if(deleted.n>0)
                       {
                           return true;
                       }
                       else
                       return false;
                   })
               }
        }).catch((err)=>{
            console.log("could not find data");
        })
    }).catch((err)=>{
        console.log("could not cannot to db");
    })
}
user.appendvieworder = (order) => {
    return collection.getCartCollection().then(cartdata => {
      //  console.log(" in model");
        // console.log(order);
        // console.log(order.productId)
    
         return cartdata.findOne({ $and: [{ "userId": order.userId }, { "productId": order.productId }] }).then((details) => {
          //  console.log(details);
         //   console.log("A");
            return cartdata.deleteOne({ $and: [{ "userId": order.userId }, { "productId": order.productId }] }).then((deleteRecord) => {
              //  console.log(deleteRecord);
                if (deleteRecord.deletedCount > 0) {
                    return collection.getProductsCollection().then((product) => {
                        return product.findOne({ $and: [{ "pSeller.s_Id": order.s_Id }, { "_id": order.productId }] }).then((detail) => {
                       //     console.log("detail"+ detail);
                        //    console.log(order.s_Id);
                        //    console.log(order.productId);
                            if(detail!=null){
                            if ( detail.pSeller.pQuantity >= order.pQuantity) {
                                return product.updateOne({ $and: [{ "pSeller.s_Id": order.s_Id }, { "_id": order.productId }] }, { $inc: { "pSeller.pQuantity": -order.pQuantity } }).then((updated) => {
                                 //   console.log(updated);
                                    if (updated.nModified > 0) {
                                        return collection.getvieworderCollection().then(vieworderdata => {

                                            return vieworderdata.updateOne({ $and: [{ "s_Id": order.s_Id }, { "productId": order.productId }, {"userId": order.userId}] }, { $inc: { "pQuantity": + order.pQuantity } }).then((updated) => {
                                               // console.log(updated);
                                                if(updated.nModified>0)
                                                {
                                                  //  console.log("modified");
                                                    return true;
                                                }
                                                else
                                                {
                                                    return vieworderdata.create(order).then((res) => {
                                                    //    console.log(res);
                                                        console.log("successfully updated view orders");
                                                        return res;
                                                    }).catch((err) => {                                               
                                                        console.log("cannot update the view order cart");
                                                    })
                                                }
                                            })
                                        })
                                    }
                                    else {
                                        let err = new Error("could not process your request");
                                        err.status = 407;
                                        console.log(err);
                                        throw err;
                                    }

                                })
                            }
                            else
                            {
                                let err = new Error("quantity left is lesser than you selected");
                                err.status=408;
                                console.log(err);
                                throw err;
                            }
                        }
                            else
                            {
                                let err = new Error("product not in database");
                                err.status=409;
                                console.log(err);
                                throw err;
                            }
                        })
                    })
                }
                else {
                    let err = new Error("could not update delete cart and update view order");
                    err.status = 406;
                    throw err;
                }
            })
        })  
    })
}


user.vieworder = (userId) => {
    return collection.getvieworderCollection().then(order => {
        return order.find({ "userId": userId }).then(data => {
           // console.log(data);
            if (data.length <= 0) {
                let err = new Error(`No Previous orders for that ${userId}`);
                err.status = 404;
                throw err;
            }
            else {
                return data;
            }
        })
        }).catch(err => console.error(`Failed to insert item: ${err}`))
    }

user.getsellerquantity=(pid,sid)=>{
    return collection.getProductsCollection().then(prod=>{
        return prod.findOne( {$and :[{ "pSeller.s_Id": sid} ,{"_id":pid}]}).then(data => {
             console.log(data,"MODEL GET SELLER QUANT")
             if (data.length < 0) {
                 let err = new Error("No products with that category");
                 err.status = 404;
                 throw err;
             }
             else {
                 console.log(pid);
                 
                 return data.pSeller.pQuantity;
             }
         })
    })
}

user.searchProduct=()=>{
    return collection.getProductsCollection().then(data=>{
      //  console.log(data);
        return data.find().then((res)=>{
       //     console.log(res);
       //     console.log(`Successfully returned all the products`);
            return res;
        }).catch(err => console.error(`Failed to fetch products: ${err}`))
    })
}

module.exports = user