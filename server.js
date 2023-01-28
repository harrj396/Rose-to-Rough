const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// import sequelize connection
const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
// App level middleware
app.use(session(sess));

// App level middleware to Inform Express.js -- which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// App level middleware -- for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// App level middleware -- for routing
app.use(routes);

app.get('/', (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', {layout : 'index'});
  });

// sync sequelize models to the database, then turn on the server
// Force false so data doesn't get dropped on every sync
sequelize.sync({ force: false }).then
(() => {
  app.listen(PORT, () => console.log
  (`App listening on port ${PORT}!`));
});
