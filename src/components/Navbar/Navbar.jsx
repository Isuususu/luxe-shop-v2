import React from "react";
import { useStateContext } from "../../context/StateContext";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

//Icons
import { FaShoppingBag } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

import { IoNotifications } from "react-icons/io5";
import { HiMiniHome } from "react-icons/hi2";
import Cart from "../Cart/Cart";

const Navbar = (props) => {
  const { pathname } = useLocation();

  const showNavbarBottom = pathname.startsWith("/product");

  const {
    showCart,
    setShowCart,
    totalQuantities,
    showMenu,
    setShowMenu,
    user,
    searchBar,
  } = useStateContext();
  return (
    <>
      <button
        className={`shopping-cart-icon ${
          props.mobile === false ? "shopping-cart-icon__desktop" : ""
        }`}
        onClick={() => setShowCart(!showCart)}
      >
        <FaShoppingBag style={{ fontSize: "2.3rem" }} />

        <span className="shopping-cart-icon__qty">
          {totalQuantities}
        </span>
      </button>
      <AnimatePresence mode="wait">
        {showCart && (
          <Cart key={"shopping-cart"} mobile={props.mobile} />
        )}
      </AnimatePresence>

      {!showNavbarBottom ? (
        <div
          className={`navbar-bottom ${
            props.mobile === false ? "desktop__navbar-bottom" : ""
          }`}
        >
          <Link href="/user/user">
            <button className="navbar-bottom__cart-icon">
              <IoNotifications
                style={{ fontSize: "1.7rem", color: "#474747" }}
              />
            </button>
          </Link>

          <Link href="/">
            <button className="navbar-bottom__cart-icon">
              <HiMiniHome
                style={{ fontSize: "2rem", color: "#474747" }}
              />
            </button>
          </Link>
          <button
            className="navbar-bottom__menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <TiThMenu />
          </button>

          <AnimatePresence mode="wait">
            {/* {showMenu && <Menu key={"menu"} />} */}
            {showCart && <Cart key={"shopping-cart"} />}
          </AnimatePresence>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
