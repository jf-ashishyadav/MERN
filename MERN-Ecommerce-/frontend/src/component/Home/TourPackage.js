import React from 'react';
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom';
const Options = {
    edit:true,
    color:"#000",
    activeColor:"tomato",
    value:2.5
}
const TourPackage = ({tourPackage}) => {
  return (
   <Link className='productCard' to={tourPackage.id}>
<img src={tourPackage.images} alt={tourPackage.name}/>
<p>{tourPackage.name}</p>
<span>{`$ ${tourPackage.price}`}</span>
<div>
    <ReactStars {...Options}/> <span>(10 review)</span> 
</div>
   </Link>
  )
}

export default TourPackage
