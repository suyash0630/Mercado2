const collection = require('../utilities/connection');
const prod=require("./Product");
const userData = [
    {
        "userId": "U1001",
        "uCredentials": {
            "uEmail": "john@gmail.com",
            "uPass": "John111"
        },
        "uProfile": {
            "uName": "John",
            "uDOB": "2018-06-08",
            "uPhone": 8265839081,
            "uIsSeller": false,
            "uDateJoined": "2018-06-07T04:21:00.760Z",
            "uLastLogin": "2018-06-12T11:30:28.340Z"
        }
    }
]

let create = {}

create.setupDB = () => {
    return collection.getCollection().then(userColl => {
        return userColl.deleteMany().then( () => {
            return userColl.insertMany(userData).then(result => {
                if (result && result.length > 0) return result.length
                else return null
            });
        });
    });
}
create.setupProducts=()=>{
    return collection.getProductsCollection().then(procoll=>{
        return procoll.deleteMany().then(()=>{
            return procoll.insertMany(prod).then(res=>{
                if(res && res.length>0) return res.length
                else return null
            })
        })
    })
}
module.exports = create