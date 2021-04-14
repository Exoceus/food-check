//Import Packages
const express = require('express');
const cors = require('cors');
//mongoose is a library that helps connect to the mongodb server and manipulate the database
const mongoose = require('mongoose');
const path = require('path')

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// the uri is the link to connect to the mongodb cloud database. an env key is provided using heroku to maintain security
var uri = '';

if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGO_URI
}
else {
  uri = "mongodb+srv://jatinm:user123@cluster0.w81gb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}

// establish connection with mongodb server using some parameters that allow for creation of search indexes and other commands
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Files for routing. 'Food' route contains all of the data at the moment
const foodsRouter = require('./routes/food');

app.use('/api/food/', foodsRouter);

// if in production, serve the built react ui
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// command to start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});