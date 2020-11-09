var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'public/' });

var indexRouter = require('./routes/index');

var projectsRouter = require('./routes/Project/projects');
var getProjectRouter = require('./routes/Project/getProject');
var addPictureRouter = require('./routes/Project/addPicture');
var deletePictureRouter = require('./routes/Project/deletePicture');
var updateProjectRouter = require('./routes/Project/updateProject');
var addProjectRouter = require('./routes/Project/addProject');
var deleteProjectRouter = require('./routes/Project/deleteProject');

var techsRouter = require('./routes/Tech/techs');
var getTechRouter = require('./routes/Tech/getTech');
var addPictureRouter = require('./routes/Tech/addPicture');
var deletePictureRouter = require('./routes/Tech/deletePicture');
var updateTechRouter = require('./routes/Tech/updateTech');
var addTechRouter = require('./routes/Tech/addPicture');
var deleteTechRouter = require('./routes/Tech/deleteTech');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(upload.any()); 
app.use(express.static('public'));

app.use('/', indexRouter);

app.use('/projects', projectsRouter);
app.use('/project/', getProjectRouter);
app.use('/projectAddPicture', addPictureRouter);
app.use('/projectDeletePicture', deletePictureRouter);
app.use('/updateProject', updateProjectRouter);
app.use('/addProject', addProjectRouter);
app.use('/deleteProject', deleteProjectRouter);

app.use('/techs', techsRouter);
app.use('/tech/', getTechRouter);
app.use('/techAddPicture', addPictureRouter);
app.use('/techDeletePicture', deletePictureRouter);
app.use('/updateTech', updateTechRouter);
app.use('/addTech', addTechRouter);
app.use('/deleteTech', deleteTechRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
