import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../../components/Home/HomePage";
import ProductsPage from "../../components/Products/ProductsPage";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import CartPage from "../../components/Cart/CartPage";
import MyOrder from "../../components/MyOrder/MyOrder";
import Loginpage from "../../components/Authentication/Loginpage";
import SignUp from "../../components/Authentication/SignUp";
import LogOut from "../Authentication/LogOut";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/products" element={<ProductsPage />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/product/:id" element={<SingleProduct />}></Route>
      <Route path="/login" element={<Loginpage />}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/myorders" element={<MyOrder />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/logout" element={<LogOut />}></Route>
      </Route>
    </Routes>
  );
};

export default Routing;
