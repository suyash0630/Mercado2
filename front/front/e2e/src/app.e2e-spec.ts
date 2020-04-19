import { browser, logging, by, element } from 'protractor';

describe('workspace-project App', () => {

  it('should display welcome message', () => {
    browser.get("http://localhost:4200");
    expect(browser.getCurrentUrl()).toContain("dashboard");
    var button = element(by.id("reg"));
    button.click();

  });
  it("should click on login", () => {
    var button = element(by.id("login"));
    button.click();
    expect(browser.getCurrentUrl()).toContain("login");
  })

  it("should not login", () => {
    var email = element(by.id("userEmail"));
    var password = element(by.id("userPassword"));
    var button = element(by.id("signin"));
    // button.click();
    email.sendKeys("testinput@gmail.com");
    password.sendKeys("TestInput@1234");
    var button1 = element(by.id("signup"));
    button1.click();
  });
  it("should register the user", () => {
    var button = element(by.id("reg"));
    button.click();
    var username = element(by.id("username"));
    var dob = element(by.id("dob"));
    var mob = element(by.id("mobileno"));
    var email = element(by.id("emailid"));
    var password = element(by.id("pwd"));
    var btn = element(by.id("register"));

    username.sendKeys("John Smith");
    dob.sendKeys("07/12/2019");
    mob.sendKeys("8452301569");
    email.sendKeys("JohnSmith@gmail.com");
    password.sendKeys("Test@1234");
    btn.click();
    expect(browser.getCurrentUrl()).toContain("login");
  });

  it("should redirect them to login page", () => {
    var button = element(by.id("login"));
    button.click();
    expect(browser.getCurrentUrl()).toContain("login");
  });

  it("should login successfully", () => {
    var password1 = element(by.id("userPassword"));
    var email1 = element(by.id("userEmail"));

    var button1 = element(by.id("signin"));
    email1.sendKeys("JohnSmith@gmail.com");
    password1.sendKeys("Test@1234");
    button1.click();
    expect(browser.getCurrentUrl()).toContain("dashboard");
  });

  it("should select an item", () => {
    var search = element(by.id("searchbar"));
    search.sendKeys("Adidas");
    var button = element(by.id("searchbtn"));
    button.click();
    button.click();
    var button1 = element(by.id("choicetest"));
    button1.click();
    var button2 = element(by.id("addtocart"));
    button2.click();
    browser.refresh();
  });
  it("should select an item", () => {
    var search = element(by.id("searchbar"));
    search.sendKeys("Asus");
    var button = element(by.id("searchbtn"));
    button.click();
    button.click();
    var button1 = element(by.id("choicetest"));
    button1.click();
    var button2 = element(by.id("addtocart"));
    button2.click();
    browser.refresh();
  });
  it("should checkout from cart", () => {
    var button = element(by.id("cart"));
    button.click();
    var btn = element(by.id("checkout"));
    btn.click();
  });

  it('should allow seller login', () => {
    var button = element(by.id("sellerlogin"));
    button.click();
  });

  it("should not allow seller to login", () => {
    var email = element(by.id("sLogin"));
    var password = element(by.id("sPassword"));
    var button = element(by.id("signin"));
    // button.click();
    email.sendKeys("sample@seller");
    password.sendKeys("Sample@12345");
    var button1 = element(by.id("sellerregister"));
    button1.click();
  });

  it("should register the seller", () => {
    var email = element(by.id("sEmail"));
    var password = element(by.id("sPass"));
    var username = element(by.id("sName"));
    var tannumber = element(by.id("sTANNumber"));
    var gstnumber = element(by.id("username"));
    var accno = element(by.id("sAccountNumber"));
    var mob = element(by.id("sPhone"));
    var btn = element(by.id("sellersignup"));

    email.sendKeys("John@seller");
    password.sendKeys("Test@1234");
    username.sendKeys("John Smith");
    tannumber.sendKeys("ABCD12345T");
    gstnumber.sendKeys("12ABCDE1234A1B2");
    accno.sendKeys("12345678910");
    mob.sendKeys("8452301569");
    btn.click();
  });

  it("should allow seller to login", () => {
    var email = element(by.id("sLogin"));
    var password = element(by.id("sPassword"));
    var button = element(by.id("signin"));
    // button.click();
    email.sendKeys("John@seller");
    password.sendKeys("Test@1234");
    var button1 = element(by.id("sellerslogin"));
    button1.click();
  });

  it('should redirect seller to products page', () => {
    expect(browser.getCurrentUrl()).toContain("Seller");
  });

  it("should log out", () => {
    var button = element(by.id("logout"));
    button.click();
  });
});

