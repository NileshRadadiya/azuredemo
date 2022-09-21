const connection = require("../config/config");
const { reject } = require("async");


module.exports.loginUser = async (logindata) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * from users WHERE email = ? AND password = ?;`;
        connection.query(
          query,
          [logindata.email, logindata.password],
          function (err, result) {
            if (err) {
              return resolve({
                status: false,
                message: "Error while user login." + err,
                data: [],
              });
            } else {
              if (result && result.length > 0) {
                return resolve({
                  status: true,
                  data: result,
                  message: "success",
                });
              }
              return resolve({
                status: true,
                message: "data not found",
                data: [],
              });
            }
          }
        );

    }, (err) => {
        reject(err);
    })
}