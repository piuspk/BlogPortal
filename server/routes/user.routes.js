const userController = require('../controllers/user.controller');
const { authenticate } = require("../db/jwt.config");
// console.log("hel")

module.exports = function(app){

    app.post("/user/signup",userController.signup)

    app.post("/user/login",userController.login)
    app.get("/api/users/logout",authenticate, userController.userLogout)
    app.post("/user/sendotppassword", userController.sendotpforforetpassword);
    app.post("/user/otpverify", userController.otpverify);
    app.post("/user/newpassword", userController.changeinfo);
}