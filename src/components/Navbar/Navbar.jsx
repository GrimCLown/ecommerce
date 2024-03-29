import { React, useContext, useState } from "react";
import rocket from "../../assets/rocket.png";
import memo from "../../assets/memo.png";
import lock from "../../assets/locked.png";
import order from "../../assets/package.png";
import idButton from "../../assets/id-button.png";
import star from "../../assets/glowing-star.png";

import LinkWithIcon from "./LinkWithIcon";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import CartContext from "../Context/CartContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/products?search=${search.trim()}`);
    }
  };

  return (
    <nav className="align_center navbar">
      <div className="align_center">
        <h1 className=" navbar_heading">Cartwish</h1>
        <form className="align_center navbar_form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="align_center navbar_links">
        <LinkWithIcon title="Home" link="/" emoji={rocket} />
        <LinkWithIcon title="Products" link="/products" emoji={star} />
        <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
        <NavLink to="/cart" className="align_center">
          Cart <p className="align_center cart_counts">{cart.length}</p>
        </NavLink>
        {!user && (
          <>
            <LinkWithIcon title="LogIn" link="/login" emoji={idButton} />
            <LinkWithIcon title="SignUp" link="/signup" emoji={memo} />
          </>
        )}
        {user && (
          <>
            <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
