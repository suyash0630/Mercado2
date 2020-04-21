const dbLayer = require('../model/user');

let user = {}

//Verfying the credentials of user
user.loginUser = (uEmail,pass) => {
    return dbLayer.userLogin(uEmail,pass).then( response => {
        return response
    })
}
user.searchProduct=(prodname)=>{
    return dbLayer.searchProduct(prodname).then(response=>{
      //  console.log(response)
        return response;
    })
}

user.getProducts=(s_Id)=>{
    return dbLayer.getProducts(s_Id).then(response =>{
        return response
    })
}
user.retriveProducts = (pcategory)=>{
    return dbLayer.retriveProducts(pcategory).then(response =>{
        return response
    })
}
user.appendCart=(cart)=>{
    return dbLayer.appendCart(cart).then(response=>{
        return response
    })
}
user.retriveCart=(userId)=>{
    return dbLayer.retriveCart(userId).then(response=>{
      //  console.log(response);
     //   console.log("service");
        return response;
    })
}
user.appendUser=(user1)=>{
    return dbLayer.chkuser(user1.userId).then(data =>{
        console.log(user1.userId)
        if(data.length==0){
            console.log(data)
        return dbLayer.appendUser(user1).then(response=>{
            return response;
        })
    }
    else{
        return "Already exists"
    }

    })
   
}
user.appendSeller=(seller)=>{
    return dbLayer.appendSeller(seller).then(response=>{
        return response;
    })
}
user.appendvieworder=(orders)=>{
   // console.log("service appendview order");
   let chain = Promise.resolve();
  // console.log(orders.length);
   for (let i=0; i<orders.length; i++) {
    chain = chain.then(()=>dbLayer.appendvieworder(orders[i]))
 //   console.log(chain);
 //   console.log("Aaa");
 }
 return chain.then(()=>{return true})
}
user.getsellerquantity=(sellerdata)=>{
 
var promises = [];
console.log("in service",typeof sellerdata)
console.log(sellerdata.length);
for(var i = 0; i < sellerdata.length; i++) {
    var pid=sellerdata[i].productId;
    var sid=sellerdata[i].s_Id;
     console.log(pid,sid);
	var promise = dbLayer.getsellerquantity(pid,sid).then(response=>{
        console.log(response,"EWwr");
        return response;
    })
	promises.push(promise);
}
return Promise.all(promises).then((doSomethingAfterAllRequests)=>{
    console.log(promises,"SDfafsadasdasdasdw");
    // console.log(doSomethingAfterAllRequests);
    return doSomethingAfterAllRequests;
});


    // return dbLayer.getsellerquantity(pid,sid).then(response=>{
    //     console.log(response);
    //     return response;
    // })
}

user.vieworder=(userId)=>{
    return dbLayer.vieworder(userId).then(response=>{
        return response;
    })
}

user.deletecartdata=(order)=>{
    return dbLayer.deletecartdata(order).then((response)=>{
        return response;
    })
}
module.exports = user