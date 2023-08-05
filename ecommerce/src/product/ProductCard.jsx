import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const imageUrl = `data:image/png;base64,${product.photo}`;
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
    <div className="product-card">
      <img src={atob(product.photo)} alt={product.photo} className="img" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
    </div>
    </Link>
  );
};

export default ProductCard;