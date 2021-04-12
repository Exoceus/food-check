import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';


import appetizerImg from "../assets/icons/appetizer.svg"
import mainCourseImg from "../assets/icons/main course.svg"
import dessertImg from "../assets/icons/dessert.svg"
import unknownImg from "../assets/icons/unknown.svg"

function Home() {

  const [foodText, setFoodText] = useState('')
  const [searchResult, setSearchResult] = useState(null)

  const onSearch = () => {
    axios.get('/api/food/find', {
      params: {
          name: foodText.toLowerCase()
      }
      })
      .then(response => {
          if(response.data){
            setSearchResult(response.data.type)
          }

          else{
            setSearchResult('Unknown')
          }
      })

      .catch((error) => {
          console.log(error);
      })
  }

  var search_result_img = <img src={unknownImg} className="food-result-icon" alt="icon"/>

  if(searchResult === 'Appetizer'){
    search_result_img = <img src={appetizerImg} className="food-result-icon" alt="icon"/>
  }

  else if(searchResult === 'Main Course'){
    search_result_img = <img src={mainCourseImg} className="food-result-icon" alt="icon"/>
  }

  else if(searchResult === 'Dessert'){
    search_result_img = <img src={dessertImg} className="food-result-icon" alt="icon"/>
  }

  return (
    <div className="App">
        <h2>Don’t Know What Type of Food It Is?</h2>

        <div className="text-area-container">
            <input className="food-text-input" type="text" 
            placeholder="Enter name of food" 
            value={foodText} 
            onChange={e => setFoodText(e.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? onSearch(event) : null}/>
            <button className="submit-btn" onClick={onSearch}>Find Out</button> 
        </div>
        <div className="text-area-container">
            {(searchResult) ?  <div className="food-result"> {search_result_img} <div className="food-result-text">{searchResult}</div></div> : null}
        </div>

        <div className="text-area-container">
         <Link className="redirect-link" to="/add"><i class="fas fa-plus-square link-icon"></i> Add a new food</Link>
        </div>
    </div>
  );
}

export default Home;