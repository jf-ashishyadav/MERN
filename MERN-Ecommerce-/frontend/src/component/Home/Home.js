import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import TourPackage from "./TourPackage.js";
import MetaData from '../layout/MetaData';
import { getProduct } from "../actions/productAction";
// but with redux we can't call directly so import this is also 
import { useSelector, useDispatch } from "react-redux"


const Home = () => {

  const dispatch = useDispatch();
  const { loading, error,packageData, packageCount } = useSelector(
    (state) => state.products
  );


  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])


  return <Fragment>
    {
    loading? (loading) :(
      <Fragment>
      <MetaData title="Home Page Title" />
      <div className="banner">
        <p>Welcome to Unique holiday</p>
        <h1>FIND AMAZING tourPackages BELOW</h1>
  
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
  
  
  
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {
          
          packageData && packageData.map((product,index) => 
            <TourPackage tourPackage={product} key={index}/>
  
          )
          }
        
      </div>
  
    </Fragment >
    )
    }
  </Fragment>

}

export default Home