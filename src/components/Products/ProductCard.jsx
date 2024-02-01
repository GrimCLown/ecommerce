import React, { useContext } from "react";
import iphone from "../../assets/iphone.jpg";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";

import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import CartContext from "../Context/CartContext";
import UserContext from "../Context/UserContext";

const ProductCard = ({ product }) => {
  const { addtoCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>

      <div className="product_details">
        <h3 className="product_price">$ {product?.price}</h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" />
              {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>

          {product?.stock > 0 && user && (
            <button
              className="add_to_cart"
              onClick={() => addtoCart(product, 1)}
            >
              <img className="img_pro" src={basket} alt="baskter" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
