"use client";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/client";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";

import { motion } from "framer-motion";
import { cartSlide } from "../../styles/animations";

import getStripe from "../../lib/getStripe";

const Cart = (props) => {
  const cartRef = useRef();
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    setShowCart,
    showCart,
    decreaseQty,
    increaseQty,
    qty,
    updateCartItemQuantity,
    removeItem,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe_checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    console.log(response);

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
    console.log("Testing stripe");
  };

  return (
    <motion.div
      className={`cart-container ${
        props.mobile === false ? "desktop__cart-container" : ""
      }`}
      ref={cartRef}
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={cartSlide}
    >
      <div className="cart-container__header">
        <h3>Your cart</h3>
        <button
          className="shopping-cart-icon left"
          onClick={() => setShowCart(!showCart)}
        >
          <FaShoppingBag style={{ fontSize: "2.3rem" }} />

          <span className="shopping-cart-icon__qty">
            {totalQuantities}
          </span>
        </button>
      </div>
      <div className="cart-container__products_wrapper">
        {cartItems.length >= 1 ? (
          cartItems.map((item, index) => (
            <div className="cart-container__product" key={item?._id}>
              <img
                src={urlFor(item.image[0])}
                className="cart-container__product__image"
              />
              <div className="cart-container__product__desc">
                <h3 className="cart-container__product__desc__name">
                  {item?.name}
                </h3>
                <p className="cart-container__product__desc__price">
                  £{item?.price}
                </p>
                <div className="cart-container__product__desc__qty">
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, "decrement")
                    }
                    className="cart-container__product__desc__qty__button"
                  >
                    <FaMinusSquare
                      style={{ fontSize: "1.8rem", color: "#f27012" }}
                    />
                  </button>
                  <p className="cart-container__product__desc__qty__value">
                    {item?.quantity}
                  </p>
                  <button
                    onClick={() =>
                      updateCartItemQuantity(item._id, "increment")
                    }
                    className="cart-container__product__desc__qty__button"
                  >
                    <FaPlusSquare
                      style={{ fontSize: "1.8rem", color: "#f27012" }}
                    />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="cart-container__product__delete-btn"
              >
                <RiDeleteBin6Fill
                  style={{ fontSize: "2rem", color: "#333" }}
                />
              </button>
            </div>
          ))
        ) : (
          <div className="cart-container__empty-basket-msg">
            <h2>No items yet</h2>
          </div>
        )}
      </div>
      <div className="cart-container__footer">
        <h3 className="cart-container__footer__total-price">
          Total:{" "}
        </h3>
        <h3>£{totalPrice}</h3>
        <button
          className="cart-container__footer__pay-btn"
          onClick={handleCheckout}
        >
          Proceed to checkout
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
