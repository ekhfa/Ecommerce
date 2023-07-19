import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ProductPage.css';

const ProductPage = () => {
  const [product, setProduct] = useState(null);

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
    console.log('Buy Now clicked');
  };

  const handleAddToCart = () => {
    console.log('Add to Cart clicked');
  };

 
  return (
    <div className="product-page">
      <div className="product-details">
        <h1 className="product-title">{name}</h1> 
        <p className="product-description">{description}</p> 
        <div className="price">Price: {price}</div> 
        <div className="rating">Rating: {rating}</div> 
        <div className="reviews">Reviews: {reviews}</div> 
        <div className="stock">Stock: {countInStock}</div> 
        <img src={atob(photo)} alt={name} className="product-image" />
        <div className="button-container">
          <button className="product-button buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="product-button add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
  };  

export default ProductPage;
