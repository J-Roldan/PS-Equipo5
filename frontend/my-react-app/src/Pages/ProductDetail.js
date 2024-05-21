import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
      <div className="col-md-6">
        {product.images.length > 0 && (
            <img 
            src={`http://localhost:3001/${product.images[0].path}`} 
            alt={product.images[0].originalname} 
            style={{ width: "550px", height: "550px" }} // Set fixed width and height
            />
        )}
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{product.name}</h1>
          <p className="lead">Description: {product.description}</p>
          <p>Type: {product.type}</p>
          <p>Material: {product.material}</p>
          <p>Size: {product.size}</p>
          <p>Gender: {product.gender}</p>
          <p>Color: {product.color}</p>
          <p>Brand: {product.brand}</p>
          <p className="h5">Precio: {product.salePrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
