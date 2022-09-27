const connection = require("../config/config");

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
              else {
                var insertsql =
                  `INSERT INTO users (email, password) VALUES (?,?);`;
                connection.query(
                  insertsql,
                  [logindata.email, logindata.password],
                  function (err, failresult) {
                    if (err) {
                      return resolve({
                        status: true,
                        message: "data not found",
                        data: [],
                      });
                    } else {
                      let selectquery = `SELECT * from users WHERE email = ? AND password = ?;`;
                      connection.query(selectquery,[logindata.email, logindata.password], function (err, insert_result) {
                        if (err) throw err;
                         if (insert_result && insert_result.length > 0) {
                           return resolve({
                             status: true,
                             data: insert_result,
                             message: "success",
                           });
                         }
                      });
                    }
                  }
                );
              }
             
            }
          }
        );

    }, (err) => {
        reject(err);
    })
}