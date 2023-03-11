import React from 'react';
import "./Footer.css";

import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";


const Footer = () => {
  return (
    <footer id="footer">
        
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Unique holidays.</h1>
        <p>we are providing best tour package</p>

        <p>Copyrights 2022 &copy; Ashish Yadav</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/ashish">Instagram</a>
        <a href="http://youtube.com/ashishyadav">Youtube</a>
        <a href="http://instagram.com/ashishyadav">Facebook</a>
      </div>
   
    </footer>
  )
}

export default Footer