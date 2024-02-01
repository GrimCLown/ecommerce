import React, { useEffect } from "react";

import apiClient from "../../components/utils/api-client.js";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import { useState } from "react";
import useData from "./../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton.jsx";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination.jsx";

const ProductList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const page = search.get("page");
  const searchQuery = search.get("search");

  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category: category,
        page: page,
      },
    },
    [searchQuery, category, page]
  );

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePageClick = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  return (
    <section className="product_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>

          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH </option>

          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH </option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading
          ? skeletons.map((n) => <ProductCardSkeleton key={n} />)
          : data.products &&
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
      {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerpage={8}
          onClick={handlePageClick}
          currentPage={page}
        />
      )}
    </section>
  );
};

export default ProductList;
