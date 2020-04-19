var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../src/app");
    });
    afterAll(() => {
        server.close();
    });

    describe("login test suite ", () => {
        let data = {};
        beforeAll((done) => {
            Request.post({
                headers: { 'content-type': 'application/json' },
                url: 'http://localhost:1111/login',
                body: JSON.stringify({
                    email: 'ayush@gmail.com',
                    password: 'Ayush11@11'
                })
            }, (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        })
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Product display on dashboard suite", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1111/products/Electronics", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Product display on dashboard test case 1", () => {
            expect(data.status).toBe(200);
        });
    });
    describe("Product display in cart test suite", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:1111/cart/ayush@gmail.com", (err, res, body) => {
                console.log(res);
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        });
        it("product display in cart test 1", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Order history test suite", () => {
        var data = {}
         beforeAll((done) => {
            Request.get("http://localhost:1111/orderhistory/ayush@gmail.com", (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
             });
        });

        it("order history test 1", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Seller login test suite ", () => {
        let data = {};
        beforeAll((done) => {
            Request.post({
                headers: { 'content-type': 'application/json' },
                url: 'http://localhost:1111/sellerlogin',
                body: JSON.stringify({
                    email: 'John@seller',
                    password: 'Test@1234'
                })
            }, (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        })
        it("Seller login test case 1", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Seller product test suite", () => {
        var data = {}
         beforeAll((done) => {
            Request.get("http://localhost:1111/productSeller/ayush@seller", (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
             });
        });

        it("Seller product test 1", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Search by product name test suite", () => {
        var data = {}
         beforeAll((done) => {
            Request.get("http://localhost:1111/search/Adidas", (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
             });
        });

        it("Search by product test 1", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("user register test suite ", () => {
        let data = {};
        beforeAll((done) => {
            Request.post({
                headers: { 'content-type': 'application/json' },
                url: 'http://localhost:1111/user',
                body: JSON.stringify({
                    username: 'Akarshita Shankar',
                    dob: '07/05/2018',
                    mob:'8197588774',
                    email: 'akarshita@gmail.com',
                    password: 'Akarshita@123'
                })
            }, (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        })
        it("user registration", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("seller register test suite ", () => {
        let data = {};
        beforeAll((done) => {
            Request.post({
                headers: { 'content-type': 'application/json' },
                url: 'http://localhost:1111/seller',
                body: JSON.stringify({
                    sEmail: 'akarshita@seller',
                    sPass:'Test@1234',
                    sName:'Akarshita Shankar',
                    sTANNumber: 'ABCD12345T',
                    sGSTNumber:'81ABCDE1234A8T7',
                    sAccountNumber: '854796521035r',
                    sPhone: '8475965210'
                })
            }, (err, res, body) => {
                console.log("response",res)
                data.status = res.statusCode;
                data.body = body;
                done();
            });
        })
        it("seller registration", () => {
            expect(data.status).toBe(200);
        });
    });

    describe("Search by product name test suite", () => {
        var data = {}
         beforeAll((done) => {
            Request.get("http://localhost:1111/search/Reebok", (err, res, body) => {
                data.status = res.statusCode;
                data.body = body;
                done();
             });
        });

        it("Search by product test 2", () => {
            expect(data.status).toBe(200);
        });
    });

});



