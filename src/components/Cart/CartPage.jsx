import { React, useState, useEffect, useContext } from "react";
import "./CartPage.css";
import UserContext from "./../Context/UserContext";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import remove from "../../assets/remove.png";
import setAuthToken from "../utils/setAuthToken";
import { getJwt, getuser } from "./../services/userServisces";
import CartContext from "../Context/CartContext";
import { addToCartAPI } from "./../services/cartServices";
import { toast } from "react-toastify";
import { checkoutAPI } from "../services/orderServices";
import config from "../../config.json";

setAuthToken(getJwt());
const CartPage = () => {
  const [subtotal, setSubtotal] = useState(0);
  const userObj = useContext(UserContext);
  const { cart, addtoCart, removeFromCart, updateCart, setCart } =
    useContext(CartContext);

  console.log("cart", cart);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubtotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order placed successfully");
      })
      .catch(() => {
        toast.error("something went wrong");
        setCart(oldCart);
      });
  };
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img
          src={`${config.backendURL}/profile/${userObj?.profilePic}`}
          alt="user profile"
        />
        <div className="">
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>

      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt=""
                  className=" cart_remove_icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>

      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
