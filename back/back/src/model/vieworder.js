class ViewOrder {
    constructor(obj) {
        this.productId = obj.productId;
        this.pName = obj.pName;
        this.pQuantity = obj.pQuantity;
        this.userId = obj.userId;
        this.image=obj.image;
        this.price=obj.price;
        this.s_Id =  obj.s_Id;
        this.orderDate = new Date();
    }
}

module.exports = ViewOrder;


