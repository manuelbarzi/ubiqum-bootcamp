const db = require('./keys').mongoURI;
//const passport = require('./passport')

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use('/cities', require('./routes/cities'))
app.use('/accounts', require('./routes/accounts'))
app.use('/itineraries', require('./routes/itineraries'))
app.use('/google', require('./routes/google-login'))
//passport middleware
//app.use(passport.initialize());
//passport configuration
//require('./passport');

const mongoose = require("mongoose");

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  })
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));
