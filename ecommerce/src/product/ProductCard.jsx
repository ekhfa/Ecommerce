import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const imageUrl = `data:image/png;base64,${product.photo}`;
  return (
    <div className="product-card">
        <img src={atob(product.photo)} alt={product.photo} className="img" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      {/* You can add additional information or buttons */}
    </div>
  );
};

export default ProductCard;