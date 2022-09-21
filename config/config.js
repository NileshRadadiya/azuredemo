// database config
const mysql = require("mysql");

var config = {
  port: 3306,
  host: "coral-azure-database.mysql.database.azure.com",
  user: "doral_nilesh@coral-azure-database",
  password: "IJoshi@12345",
  database: "azuredatabase",
};
const conn = new mysql.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
  }
});

module.exports = conn;
