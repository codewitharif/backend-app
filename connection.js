var mysql = require("mysql");
var con = mysql.createConnection({
  host: "https://modeonx.netlify.app/",
  user: "root",
  password: "",
  database: "school",
});

module.exports = con;
