// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import laptopModels from './data';
import './more.css'

function ProductDetail() {
  const { id } = useParams();
  const product = laptopModels.find(model => model.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={process.env.PUBLIC_URL + product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.seeMore}</p>
      <img src={process.env.PUBLIC_URL + product.More1} alt={product.name} />
      <img src={process.env.PUBLIC_URL + product.More2} alt={product.name} />
      <img src={process.env.PUBLIC_URL + product.More3} alt={product.name} />
      <img src={process.env.PUBLIC_URL + product.More4} alt={product.name} />
      <img src={process.env.PUBLIC_URL + product.More5} alt={product.name} />

    </div>
  );
}

export default ProductDetail;
