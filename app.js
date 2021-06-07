const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const connectLivereload = require('connect-livereload');
const livereload = require('livereload');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moduleAlias = require('module-alias');
require('dotenv').config();

/* DB connect */
mongoose.connect(
	'mongodb://localhost:27017/blog',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('connected');
	}
);
const app = express();

// view engine setup
app.engine(
	'hbs',
	hbs({
		extname: 'hbs',
		defaultLayout: 'main',
		layoutsDir: __dirname + '/views/layouts/',
		partialsDir: __dirname + '/views/partials/',
		helpers: require(__dirname + '/helpers/handlebars-helpers').helpers
	})
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/* Express Settings */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectLivereload());

/** Aliases */
moduleAlias.addAliases({
	'@root': path.join(__dirname),
	'@models': path.join(__dirname, 'models')
});

/* Live reload */
const liveReloadServer = livereload.createServer({
	// Reload on changes to these file extensions.
	exts: ['hbs', 'css']
});
liveReloadServer.watch(path.join(__dirname, 'views'));
liveReloadServer.watch(path.join(__dirname, 'public'));

/* Routing CLIENT */
const indexRouter = require('@root/routes/client/');
const aboutRouter = require('@root/routes/client/pages/about');
const postRouter = require('@root/routes/client/post/');
const ErrorRouter = require('@root/routes/client/pages/error');

/* ROUTING DASHBOARD */
const dashboardRouter = require('./routes/dashboard/pages/');

// Pages
app.use('/', indexRouter);
app.use('/about', aboutRouter);
// Posts
app.use('/posts', postRouter);
// Dashboard
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use('*', ErrorRouter);
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
