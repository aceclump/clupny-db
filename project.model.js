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
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const Project = function(project) {
  this.id=project.id;
  this.name=project.name;
  this.desc_short=project.desc_short;
  this.purpose=project.purpose;
  this.results=project.results;
  this.picture_paths_prototype=project.picture_paths_prototype;
  this.picture_paths_results=project.picture_paths_results;
  this.picture_primary=project.picture_primary;
  this.tech_ids=project.tech_ids;
}

Project.getById = (id, result) => {
  connection.query(`SELECT * FROM projects WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ id: "not_found" }, null);
  });
}

Project.getAll = result => {
  connection.query("SELECT * FROM projects", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
}



module.exports = Project;
