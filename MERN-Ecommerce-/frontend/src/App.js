import './App.css';

import {BrowserRouter, BrowserRouter as Router, Route,Routes} from "react-router-dom";
import WebFont  from 'webfontloader';
import React from 'react';


import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";





function App() {
  React.useEffect(() => {
    WebFont.load({
      families:["Roboto","Arial"]
    })
  }, [])
  
  return (
    
    <Router>
    <Header/>
    {/* <Routes> */}
    {/* <Route extact path="/" component={Home}></Route> */}
    <Home/>
    {/* </Routes> */}
    <Footer/>
    </Router>
   
  );
}

export default App;
