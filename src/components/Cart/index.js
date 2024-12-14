import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import OrdersNone from "../OrdersNone";
import CartItem from "../CartItem";
import { Fragment } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("cartData")) || [];
    let price = 0;
    b.forEach((each) => {
      price += each.cost * each.quantity;
    });
    const cartItems = b.map((each) => ({
      cost: each.cost,
      quantity: each.quantity,
      id: each.id,
      imageUrl: each.imageUrl,
      name: each.name,
    }));
    setFoodItems(cartItems);
    setTotal(price);
  }, []);

  const onIncrement = (id) => {
    const updatedFoodItems = foodItems.map((each) => {
      if (each.id === id) {
        each.quantity += 1;
      }
      return each;
    });
    localStorage.setItem("cartData", JSON.stringify(updatedFoodItems));
    updateTotal(updatedFoodItems);
    setFoodItems([...updatedFoodItems]);
  };

  const onDecrement = (id) => {
    let updatedFoodItems = foodItems.map((each) => {
      if (each.id === id) {
        each.quantity -= 1;
      }
      return each;
    });
    updatedFoodItems = updatedFoodItems.filter((each) => each.quantity > 0);
    localStorage.setItem("cartData", JSON.stringify(updatedFoodItems));
    updateTotal(updatedFoodItems);
    setFoodItems([...updatedFoodItems]);
  };

  const updateTotal = (items) => {
    let price = 0;
    items.forEach((each) => {
      price += each.cost * each.quantity;
    });
    setTotal(price);
  };

  const gotoPaid = () => {
    navigate("/paid");
  };
  const cookie = Cookies.get("jwt_token");
  if (cookie === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <NavBar active={false} />
      {foodItems.length === 0 ? (
        <OrdersNone />
      ) : (
        <Fragment>
          <div className="small-cart">
            <ul className="lk">
              {foodItems.map((each) => (
                <CartItem
                  increment={onIncrement}
                  decrement={onDecrement}
                  key={each.id}
                  details={each}
                />
              ))}
            </ul>
            <hr className="dashed" />
          </div>
          <div className="tot">
            <h1 className="t">Order Total:</h1>
            <p testid="total-price" className="t">
              ₹{total}
            </p>
          </div>
          <div className="end">
            <button type="button" className="logout-button" onClick={gotoPaid}>
              Place Order
            </button>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Cart;
