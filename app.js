const express = require('express');

const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');

const app = express();

// CONNECT DB
mongoose.connect()

//TEMPLATE ENGİNE
const ejs = require('ejs');


app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
//Routes

app.use('/', pageRoute);
const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
