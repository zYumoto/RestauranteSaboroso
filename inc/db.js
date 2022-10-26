const mysql = require('mysql2')
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', //meu usuario criado no mysql para nao confundi 
    database: 'VictorSaboroso', // meu banco
    password: 'Carmemenina2004',
    multipleStatements: true
});

module.exports = connection;