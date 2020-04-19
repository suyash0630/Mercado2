class Cart {
    constructor(obj) {
        this.productId = obj._id;
        this.pName = obj.pName;
        this.pQuantity = obj.pQuantity;
        this.userId = obj.userId;
        this.image=obj.image;
        this.price=obj.price;
        this.s_Id = obj.pSeller.s_Id;
    }
}

module.exports = Cart;


