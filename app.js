const express = require('express');

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');

const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();

// CONNECT DB
mongoose
  .connect('mongodb://localhost/smartedu-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGİNE
const ejs = require('ejs');

app.set('view engine', 'ejs');

// GLOBAL VARİABLE

global.userIn = null;

//MIDDLEWARES

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use(flash());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
//Routes
app.use('*', (req, res, next) => {
  userIn = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
