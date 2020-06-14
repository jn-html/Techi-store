import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {FaHome} from 'react-icons/fa';

import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Products from './pages/ProductsPage';
import Contact from './pages/ContactPage';
import SingleProduct from './pages/SingleProductPage';
import Default from './pages/Default';

class App extends Component {
  render() {
    return (
      <h1>
        Hello from tech store<FaHome />
      </h1>
    ); 
  }
}



export default App;
