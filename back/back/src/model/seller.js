class Seller{
    constructor(obj){
        this.s_Id=obj.sEmail;
        this.sCredentials ={
            sEmail:obj.sEmail,
            sPass:obj.sPass
        }
        this.sProfile={
        sName:obj.sName,
        sTANNumber:obj.sTANNumber,
        sGSTNumber:obj.sGSTNumber,
        sAccountNumber:obj.sAccountNumber,
        sPhone:obj.sPhone
        }
    }
}
module.exports=Seller;


