class User{
    constructor(obj){
        this.userId=obj.uEmail;
        this.uCredentials ={
            uEmail:obj.uEmail,
            uPass:obj.uPass
        }
        this.uProfile={
        uName:obj.uName,
       uDOB:obj.uDOB,
        uPhone:obj.uPhone
        }
    }
}
module.exports=User;




