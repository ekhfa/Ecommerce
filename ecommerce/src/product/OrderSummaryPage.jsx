import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummaryPage = () => {
  const [product, setProduct] = useState(null);
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

  const calculateTotalPrice = () => {
    if (product) {
      return product.price * quantity;
    }
    return 0;
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="order-summary-page">
      <div className="order-summary-box">
        <h1 className="order-summary-title">Order Summary</h1>
        {product ? (
          <>
            <p className="order-summary-info">Product Name: {product.name}</p>
            <p className="order-summary-info">Price: ${product.price}</p>
            <div className="order-summary-quantity">
              <span>Quantity: </span>
              <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
            </div>
            <p className="order-summary-price">Total Price: ${calculateTotalPrice()}</p>
            
          </>
        ) : (
          <p>Loading product information...</p>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryPage;
