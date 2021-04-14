/* Page for adding food */

import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

function Add() {

  /* Define states for food text, food category and success message */
  const [foodText, setFoodText] = useState('')
  const [foodCategory, setFoodCategory] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const onAdd = () => {
    console.log(foodText, foodCategory)

    const newFood = {
        /*Convert to lower case to standardize data */
        name: foodText.toLowerCase(),
        type: foodCategory
    }

    console.log(newFood)

    axios.post('/api/food/new', newFood)
        .then((res) => {
            console.log(res)
            /* Show success message and reset food text */
            setSuccessMsg(`${foodText} has been added to ${foodCategory}!`)
            setFoodText('')
        })
        .catch((error) => {
            /*If food is already in the database, inform the user */
            setSuccessMsg(`${foodText} has already been added!`)
        })
  }

  return (
    <div className="App">
        <h2>Add A New Food</h2>

        <div className="text-area-container">
            {/*Text input for food name */}
            <input className="food-text-input" type="text" placeholder="Enter name of food" value={foodText} onChange={e => setFoodText(e.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? onAdd(event) : null}/>
            
            {/*Dropdown input for food name */}
            <select className="food-type-dropdown" value={foodCategory} onChange={e => setFoodCategory(e.target.value)}>
                <option value="">Food Type</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
            </select>

            <button className="submit-btn" onClick={onAdd}>Add</button> 
        </div>

        <div className="text-area-container">
            {/* Display success message */}
            {(successMsg) ?  <div className="success-msg">{successMsg}</div> : null}
        </div>

        <div className="text-area-container">
            {/* Link to transition to home page */}
            <Link className="redirect-link" to="/"><i class="fas fa-home link-icon"></i> Return to home</Link>
        </div>
    </div>
  );
}

export default Add;