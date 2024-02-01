import React, { useState, useContext } from "react";
import useData from "./../../hooks/useData";
import "./SingleProduct.css";
import QuantityInput from "./QuantityInput";
import { useParams } from "react-router-dom";
import CartContext from "../Context/CartContext";
import UserContext from "../Context/UserContext";
import config from "../../config.json";

const SingleProduct = () => {
  const user = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const { cart, addtoCart } = useContext(CartContext);

  const { data: product, error, isLoading } = useData(`/products/${id}`);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      <div className="align_center">
        <div className="single_product_thumbnails">
          <>
            {product.images &&
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={`${config.backendURL}/products/${image}`}
                  alt={product.title}
                  onClick={() => setSelectedImage(index)}
                  className={selectedImage === index ? "selected_image" : ""}
                />
              ))}
          </>
        </div>
        <>
          {product.images && (
            <img
              src={`${config.backendURL}/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          )}
        </>
      </div>
      {product.price && (
        <div className="single_product_details">
          <h1 className="single_product_title">{product.title}</h1>
          <p className="single_product_description">{product.description}</p>
          <p className="single_product_price">${product.price.toFixed(2)}</p>

          {user && (
            <>
              <h2 className="quantity_title">Quantity:</h2>
              <div className="align_center quantity_input">
                <QuantityInput
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={product.stock}
                />
              </div>

              <button
                className="search_button add_cart"
                onClick={() => addtoCart(product, quantity)}
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default SingleProduct;
