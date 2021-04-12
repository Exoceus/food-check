import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Home from './components/home'
import Add from './components/add'

import Footer from './components/footer'

function App() {

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={Add} />
      <Footer/>
    </Router>
  );
}

export default App;