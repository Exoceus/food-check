const path = require('path');
const url = require('url');

const router = require('express').Router();

//import 'Food' model to create and manipulate food collection
let Food = require('../models/food');

//GET request to fetch all data
router.get('/all', (req, res) => {
    Food.find()
      .then(food => res.json(food))
      .catch(err => res.status(400).json('Error: ' + err));
});

//GET request to only find one piece of data from query
router.get('/find', (req, res) => {
    console.log(req.query)
    Food.findOne({name: req.query.name})
      .then(food => res.json(food))
      .catch(err => res.status(400).json('Error: ' + err));
});

// POST request for creating new food
router.post('/new', (req, res) => {

    console.log(req.body)

    const newFood = new Food({ name: req.body.name, type: req.body.type });

    if (!req.body.name || !req.body.type) {
      return res.status(400).json({ msg: 'Please enter all fields!' })
    }

    newFood.save()
      .then((food) => res.json("Food Created"))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;