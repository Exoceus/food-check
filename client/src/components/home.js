// Home Page (page where one can search the type of food)

import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

//importing imgs/icons
import appetizerImg from "../assets/icons/appetizer.svg"
import mainCourseImg from "../assets/icons/main course.svg"
import dessertImg from "../assets/icons/dessert.svg"
import unknownImg from "../assets/icons/unknown.svg"

function Home() {
  //search box text state
  const [foodText, setFoodText] = useState('')
  //search result state
  const [searchResult, setSearchResult] = useState(null)

  const onSearch = () => {
    //send GET request on search to API with search text as a query
    axios.get('/api/food/find', {
      params: {
          name: foodText.toLowerCase()
      }
      })
      .then(response => {
          if(response.data){
            //update the search result state from API response
            setSearchResult(response.data.type)
          }

          else{
            //if no response if found, set search result to unknown
            setSearchResult('Unknown')
          }
      })

      .catch((error) => {
          console.log(error);
      })
  }

  //if search result is not under one of the following categories, then it is "unknown" and hence a unknown img icon is used
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
            {/*Input field for food search*/}
            <input className="food-text-input" type="text" 
            placeholder="Enter name of food" 
            value={foodText} 
            onChange={e => setFoodText(e.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? onSearch(event) : null}/>
             {/*if user hits 'Enter' or click button, then search*/}

            <button className="submit-btn" onClick={onSearch}>Find Out</button> 
        </div>
        <div className="text-area-container">
            {/*if some search result is present, render the search result image and text*/}
            {(searchResult) ?  <div className="food-result"> {search_result_img} <div className="food-result-text">{searchResult}</div></div> : null}
        </div>

        <div className="text-area-container">
          {/* Link to transition to add new food page*/}
         <Link className="redirect-link" to="/add"><i class="fas fa-plus-square link-icon"></i> Add a new food</Link>
        </div>
    </div>
  );
}

export default Home;