import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const imageUrl = `data:image/png;base64,${product.photo}`;
  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      {/* You can add additional information or buttons */}
    </div>
  );
};

export default ProductCard;
