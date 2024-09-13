import React from 'react'
import './Breadcrum.css'
import Arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='Breadcrum'>
    <h1> Home <img src={Arrow_icon} alt="" /> SHOP <img src={Arrow_icon} alt="" /> {product.category} <img src={Arrow_icon} alt="" /> {product.name} </h1>
    </div>
  )
}

export default Breadcrum;