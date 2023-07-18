import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ProductPage.css'; // Import the CSS file

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  console.log("id", id);

  useEffect(() => {
    // Fetch product information from the backend API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/${id}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    //match.params.id
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, rating, reviews, photo, description } = product;

  const handleBuyNow = () => {
    // Add logic for handling the "Buy Now" button click
    console.log('Buy Now clicked');
  };

  const handleAddToCart = () => {
    // Add logic for handling the "Add to Cart" button click
    console.log('Add to Cart clicked');
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <img src={photo} alt={name} className="product-image" />
        <h1 className="product-title">{name}</h1>
        <div className="product-rating">
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9733;</span>
          <span className="star">&#9734;</span>
          <span className="rating-value">{rating}</span>
        </div>
        <div className="product-price">${price}</div>
        <div className="product-reviews">{reviews} reviews</div>
        <p className="product-description">{description}</p>
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
