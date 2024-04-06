const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Define a function to set MIME types
function setCustomHeaders(res, path) {
  if (path.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
}

function setCustomHeaders(res, path) {
  if (path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
}

app.use(session(sess));
// Middleware to set currentUser
app.use((req, res, next) => {
  // Assuming your authentication middleware sets req.user after successful authentication
  if (req.session.user) {
    // Set currentUser in res.locals
    res.locals.currentUser = req.session.user;
  } else {
    // If the user is not logged in, set currentUser to null or an empty object
    res.locals.currentUser = null;
  }
  next();
});

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: setCustomHeaders,
  })
);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
