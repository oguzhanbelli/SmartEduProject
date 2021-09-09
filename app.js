const express = require('express');

const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');

const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();


// CONNECT DB
mongoose.connect('mongodb://localhost/smartedu-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB CONNECTED!");
}).catch((err) =>{
  console.log(err);
});


//TEMPLATE ENGİNE
const ejs = require('ejs');


app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Routes

app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
