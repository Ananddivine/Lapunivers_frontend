// src/AdminPanel.js
import React, { useState } from 'react';
import { db } from './firebase';

function AdminPanel() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add product to Firestore
    await db.collection('laptopModels').add({
      name: productName,
      description: productDescription,
      image: productImage,
    });

    // Clear form fields after submission
    setProductName('');
    setProductDescription('');
    setProductImage('');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for product data */}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AdminPanel;
