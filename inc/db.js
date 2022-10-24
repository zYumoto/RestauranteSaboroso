const mysql = require('mysql2')


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'userP', //meu usuario criado no mysql para nao confundi 
    database: 'saboroso_pedro', // meu banco
    password: 'password'
});

module.exports = connection;
