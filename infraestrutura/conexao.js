const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agenda_petshop'
});

module.exports = conexao;