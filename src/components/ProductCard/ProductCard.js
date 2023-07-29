import React from "react";
import "./ProductCard.css";

const ProductCard = ({ data }) => {
  const { category, imageUrl, productName, productId } = data;
  return (
    <div className="ProductCard">
      <img src={imageUrl} alt={productName} />
      <h1>{productName}</h1>
      <p>{productId}</p>
      <p>{category}</p>
    </div>
  );
};

export default ProductCard;
