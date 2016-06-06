/**
 * Module dependencies.
 */
const
    bodyParser          = require('body-parser'),
    compression         = require('compression'),
    dotenv              = require('dotenv').config(),
    errorHandler        = require('errorhandler'),
    express             = require('express'),
    expressValidator    = require('express-validator'),
    flash               = require('express-flash'),
    logger              = require('morgan'),
    mongoose            = require('mongoose'),
    path                = require('path'),
    session             = require('express-session'),
    swig                = require('swig');

const MongoStore = require('connect-mongo')(session);

/**
 * Create Express server.
 */
const
    app     = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set('views', path.join(__dirname, '/app/views/'));
app.use(express.static(path.join(__dirname, 'pub')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
        autoReconnect: true
    })
}));
app.use(flash());
/**
 * Error Handler.
 */
app.use(errorHandler());


require('./app/Router')(app, path.join(__dirname, 'app/controllers'));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;