
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

var uri = '';
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGO_URI
}
else {
  uri = "mongodb+srv://jatinm:user123@cluster0.w81gb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
}

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const foodsRouter = require('./routes/food');

app.use('/api/food/', foodsRouter);


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});