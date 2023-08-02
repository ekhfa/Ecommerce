import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './ProductPage.css';
import OrderSummaryPage from './OrderSummaryPage';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
 

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
    // Redirect to the order summary page with necessary data
    console.log('Buy Now button clicked');
    navigate(`/order-summary/${id}/${quantity}`);
  };

  
  const handleAddToCart = () => {
    console.log('Add to Cart clicked');
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
          <button className="product-button buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="product-button add-to-cart">Add to Cart</button>
        </div>
      </div>
  </div>
);
}

export default ProductPage;
