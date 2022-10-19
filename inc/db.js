const mysql  = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: "Carmemenina2004#"
  });
  
  module.exports = connection;