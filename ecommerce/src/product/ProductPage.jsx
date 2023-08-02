import React, { useState, useEffect } from 'react';
import RegistrationAndPaymentSidebar from './RegistrationAndPaymentSidebar';
import { useParams } from "react-router-dom";
import './ProductPage.css';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const { id } = useParams();

  useEffect(() => {
    // Fetch product information from the backend API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, rating, reviews, photo, description, countInStock } = product;
  
  const handleBuyNow = () => {
    setShowSidebar(true);
  };
  
  const handleAddToCart = () => {
    console.log('Add to Cart clicked');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const calculateTotalPrice = () => {
    return product.price * quantity;
  };

 
  return (
    <div className="product-page">
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="price">Price: ${product.price}</div>
        <div className="rating">
          Rating: <span className="star">&#9733;</span> {product.rating}
        </div>
        <div className="reviews">Reviews: {product.reviews}</div>
        <div className="stock">Stock: {product.countInStock}</div>
        <img src={atob(product.photo)} alt={product.name} className="product-image" />
        <div className="button-container">
          <button className="product-button buy-now" onClick={toggleSidebar}>
            Buy Now
          </button>
          <button className="product-button add-to-cart">Add to Cart</button>
        </div>
      </div>

      {showSidebar && (
        <div className="sidebar">
          <h2>Product Summary</h2>
          <p>Name: {product.name}</p>
          <p>Price: ${product.price}</p>
          <label>Quantity: </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <p>Total Price: ${calculateTotalPrice()}</p>
          <button onClick={toggleSidebar}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
