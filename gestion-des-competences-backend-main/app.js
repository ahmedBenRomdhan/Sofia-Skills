var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./src/models');
var usersRouter = require('./src/routes/users.routes');
var authRouter = require('./src/routes/auth.routes');
var roleRouter = require('./src/routes/roles.routes');

var departmentRouter = require('./src/routes/department.routes');
var functionRouter = require('./src/routes/function.routes');
var skillEvalRouter = require('./src/routes/skillEvaluation.routes');
var skillsRouter = require('./src/routes/skills.routes');
var categoryRouter = require('./src/routes/category.routes');
var functionSkillRouter = require('./src/routes/functionSkill.routes')

var cors = require("cors");
var dotenv = require("dotenv");
var app = express();

dotenv.config();
const PORT =process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/roles', roleRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/functions', functionRouter);
app.use('/api/skillsEval', skillEvalRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/functionSkill', functionSkillRouter);


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
  res.render('error port');
});



// synchronize data base { alter: true }
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Database synchronized successfully.');
    });
  })
  .catch(error => {
    if (error.name === 'SequelizeDatabaseError' && error.parent && error.parent.code === 'ER_TABLE_EXISTS_ERROR') {
      console.error('Table already exists in the database.');
      // You can choose to handle this specific error case here
    } else {
      console.error('An error occurred during database synchronization:', error);
    }
  });
module.exports = app;
