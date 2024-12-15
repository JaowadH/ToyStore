import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState(null);

  const toggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const randomIndex = Math.floor(Math.random() * products.length);
      setHighlightedProduct(products[randomIndex]);
    }
  }, [products]);

  console.log(highlightedProduct);

  return (
    <div className="container">
      <div className="featureContainer">
        <div className="banner">
          <h1>Featured Toy</h1>
          <p>View our featured</p>
          <p>toy now!</p>
        </div>
        {highlightedProduct && (
          <div className="productHighlight">
            <img
              src={highlightedProduct.image}
              alt={highlightedProduct.name}
              className="image"
            />
            <div>
              <h2>{highlightedProduct.name}</h2>
              <p>${highlightedProduct.price}</p>
              <p>
                {showFullDescription
                  ? highlightedProduct.description
                  : `${highlightedProduct.description.slice(0, 100)}...`}
                {highlightedProduct.description.length > 100 && (
                  <button onClick={toggleDescription} className="readMoreBtn">
                    {showFullDescription ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              <Link to={`/products/${highlightedProduct.id}`}>
                View Product
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="carousel">
        {products.slice(0, 6).map((product) => (
          <div key={product.id} className="productCard">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="productImage"
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
