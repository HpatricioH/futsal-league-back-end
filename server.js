const express = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
dotenv.config();

const { SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 8080;

// Server Routes
const playersRoutes = require('./routes/players');
const teamsRoutes = require('./routes/teams');
const usersRoutes = require('./routes/users');

// Middleware
app.use(express.static(__dirname + './../build'));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Initialize localStrategy middleware
// passportLocalStrategy(passport);
require('./passportLocalStrategy')(passport);

// Routes
app.use('/players', playersRoutes);
app.use('/teams', teamsRoutes);
app.use('/users', usersRoutes);

// Run Server
app.listen(PORT, () => {
  console.log(`🚀 Server Running in port ${PORT}`);
});
