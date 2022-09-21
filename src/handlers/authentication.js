'use strict';
const { validationResult } = require("express-validator");
const authModel = require("../../models/auth.model");
module.exports.login = async function (context, req) {
     try {
       const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
       if (!errors.isEmpty()) {
          context.res.status(500).json(errors.errors[0].msg);
       }
       var data = req.body;
       if (
         !data.email ||
         data.email == "" ||
         !data.password ||
         data.password == ""
       ) {
         context.res.status(500).json("Please Enter proper email and password");
       }
       // saveLogin data
       var logindata = {
         email: data.email ? data.email : null,
         password: data.password ? data.password : null,
       };

       var getNormalLoginData = await authModel.loginUser(logindata);
       if (getNormalLoginData.data && getNormalLoginData.data.length > 0) {
         var result = getNormalLoginData.data[0];
         context.res.status(200).json(result);
       }
       context.res.status(500).json("Incorrect email or password!");
     } catch (err) {
        context.res.status(500).json("Something went wrong. please try again.");
     }
};