const app = require('express').Router();
const passport = require('passport');
const crypto = require('crypto');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// we will need our sequelize instance from somewhere
const db = require('../db/db');
const User = require('../db/models').User
// we should do this in the same place we've set up express-session
const session = require('express-session');

// configure and create our database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync so that our session table gets created
dbStore.sync();
// plug the store into our session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

// Set secret on deployment server
// Then, on our deployment server, we can set an environment variable called SESSION_SECRET with our real secret!

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

// Need local secrets first of google client ID etc...

// passport.use(
//   new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: '/api/auth/google/callback'
//   },
//   function (token, refreshToken, profile, done) {
//     var info = {
//       name: profile.displayName,
//       email: profile.emails[0].value,
//       photo: profile.photos ? profile.photos[0].value : undefined
//     };
//     User.findOrCreate({
//       where: {googleId: profile.id},
//       defaults: info
//     })
//     .spread(function (user) {
//       done(null, user);
//     })
//     .catch(done);
//   })
// );

// app.get('/google', passport.authenticate('google', { scope: 'email' }));

// app.get('/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/me',
//     failureRedirect: '/login'
//   })
// );

app.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      if (user.password !== user.Model.encryptPassword(req.body.password, user.salt)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

app.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

app.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

//this only works on the enter request
app.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = app;
