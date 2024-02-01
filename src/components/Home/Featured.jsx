import React from "react";
import "./Featured.css";
import ProductCard from "../Products/ProductCard";
import useData from "./../../hooks/useData";

const Featured = () => {
  const { data: products, error } = useData("/products/featured");

  return (
    <section className="featured_products">
      <h2 className="">Featured Products</h2>

      <div className="align_center featured_products_list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Featured;
