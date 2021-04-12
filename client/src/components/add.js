import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

function Add() {

  const [foodText, setFoodText] = useState('')
  const [foodCategory, setFoodCategory] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const onAdd = () => {
    console.log(foodText, foodCategory)

    const newFood = {
        name: foodText.toLowerCase(),
        type: foodCategory
    }

    console.log(newFood)

    axios.post('/api/food/new', newFood)
        .then((res) => {
            console.log(res)
            setSuccessMsg(`${foodText} has been added to ${foodCategory}!`)
            setFoodText('')
        })
        .catch((error) => {
            setSuccessMsg(`${foodText} has already been added!`)
        })
  }

  return (
    <div className="App">
        <h2>Add A New Food</h2>

        <div className="text-area-container">
            <input className="food-text-input" type="text" placeholder="Enter name of food" value={foodText} onChange={e => setFoodText(e.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? onAdd(event) : null}/>
            
            <select className="food-type-dropdown" value={foodCategory} onChange={e => setFoodCategory(e.target.value)}>
                <option value="">Food Type</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
            </select>

            <button className="submit-btn" onClick={onAdd}>Add</button> 
        </div>

        <div className="text-area-container">
            {(successMsg) ?  <div className="success-msg">{successMsg}</div> : null}
        </div>

        <div className="text-area-container">
         <Link className="redirect-link" to="/"><i class="fas fa-home link-icon"></i> Return to home</Link>
        </div>
    </div>
  );
}

export default Add;