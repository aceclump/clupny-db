const mysql = require("mysql");
const dbConfig= require("./db.config.js")

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE
});

// open the MySQL connection

const Tech = function(tech) {
  this.id=tech.id;
  this.name=tech.name;
  this.picture_paths_prototype=tech.picture_path;
}

Tech.makeDbCall = (query, result) => {
  connection.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Tech.verbose = (tech) => {
  return(
    "id = " + tech.id + ", " +
    "name = '" + tech.name + "', " +
    "picture_path = '" + tech.picture_path + "' " 
  )
}

Tech.updateTech = (id, tech, result) => {
  Tech.makeDbCall(
      "UPDATE techs SET " + Tech.verbose(tech) + 
      "WHERE id = " + id,
      result
    )
}

Tech.createTech = (tech, result) => {
  Tech.makeDbCall("INSERT INTO techs SET " + Tech.verbose(tech), result)
}

Tech.deleteTech = (id, result) => {
  Tech.makeDbCall(("DELETE FROM techs WHERE id = " + id), result)
}

Tech.getAll = result => {Tech.makeDbCall("SELECT * FROM techs", result)}

Tech.getTech = (id, result) => {Tech.makeDbCall(('SELECT * FROM techs WHERE id = ' + id), result)}


module.exports = Tech;
