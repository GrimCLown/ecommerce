import React, { useState, useContext } from "react";
import UserContext from "./components/Context/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useEffect } from "react";
import { getuser, getJwt } from "./components/services/userServisces";
import setAuthToken from "./components/utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./components/services/cartServices";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./components/Context/CartContext";
import { getOrderAPI } from "./components/services/orderServices";
import OrderContext from "./components/Context/OrderContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getuser();

      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {
      console.log("eror", error);
    }
  }, []);

  const addtoCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );

    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product successfully added");
      })
      .catch((err) => {
        toast.error("Failed to add the product ");
        setCart(cart);
      });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  const updateCart = (type, id) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );
    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    } else if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    }

    setCart(updatedCart);
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider
        value={{ cart, addtoCart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer />
            <Routing />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
