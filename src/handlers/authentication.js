'use strict';
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authModel = require("../../models/auth.model");
module.exports.login = async function (context, req) {
     try {
       const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
       if (!errors.isEmpty()) {
          context.res.status(500).json(errors.errors[0].msg);
       }
       var data = req.body;  
       // saveLogin data
       var logindata = {
         email: data.email ? data.email : null, 
         password: data.password ? data.password : null,
       };
       var getNormalLoginData = await authModel.loginUser(logindata);
       if (getNormalLoginData.data && getNormalLoginData.data.length > 0) {
         var result = getNormalLoginData.data[0];
         const secret = "loginJWTTokenBaseVerification";
         const payload = { user: result.email, _id: result.id };
          const token = jwt.sign(payload, secret);
         let smessage = {
           status: true,
           msg: "Login Successfully",
           result: result,
           token: token,
         };
         context.res.status(200).json(smessage);
       }
       let fmessage = {
         status: false,
         msg: "Incorrect email or password!"
       };
       context.res.status(200).json(fmessage);
     } catch (err) {
        let failmessage = {
          status: false,
          msg: "Something went wrong. please try again.",
        };
        context.res.status(500).json(failmessage);
       }
};