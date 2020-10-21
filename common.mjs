const dbconfig= require("./db.config.js")

export function database(query) {
    let out;
    let mysql = require('mysql');
    let connection = mysql.createConnection({
        host: dbconfig.HOST,
        user: dbconfig.USER,
        password: dbconfig.PASSWORD,
        database: dbconfig.DATABASE
      });

      connection.connect();

      connection.query(query, function (err, rows, fields) {
        if (err) throw err
      
        out={
            fields:fields,
            rows:rows
        }
      })
      
      connection.end()
      return out;
}   

