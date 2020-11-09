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
  this.description=project.description;
  this.purpose=project.purpose;
  this.results=project.results;
  this.picture_paths_prototype=project.picture_paths_prototype;
  this.picture_paths_results=project.picture_paths_results;
  this.tech_ids=project.tech_ids;
}

Project.makeDbCall = (query, result) => {
  connection.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
}

Project.verbose = (project) => {
  return(
    "id = " + project.id + ", " +
    "name = '" + project.name + "', " +
    "description = '" + project.description + "', " +
    "purpose = '" + project.purpose + "', " +
    "results = '" + project.results + "', " +
    "picture_paths_prototype = '" + project.picture_paths_prototype + "', " +
    "picture_paths_results = '" + project.picture_paths_results + "', " +
    "tech_ids = '" + project.tech_ids + "' "
  )
}

Project.updateProject = (id, project, result) => {
  Project.makeDbCall(
      "UPDATE projects SET " + Project.verbose(project) + 
      "WHERE id = " + id,
      result
    )
}

Project.createProject = (project, result) => {
  Project.makeDbCall("INSERT INTO projects SET " + Project.verbose(project), result)
}

Project.deleteProject = (id, result) => {
  Project.makeDbCall(("DELETE FROM projects WHERE id = " + id), result)
}

Project.getAll = result => {Project.makeDbCall("SELECT * FROM projects", result)}

Project.getProject = (id, result) => {Project.makeDbCall(('SELECT * FROM projects WHERE id = ' + id), result)}


module.exports = Project;
