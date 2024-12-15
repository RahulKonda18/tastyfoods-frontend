import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaStar, FaRupeeSign } from "react-icons/fa";
import { LineWave } from "react-loader-spinner";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { Navigate } from "react-router-dom";
import FoodItem from "../FoodItem";
import "./index.css";

const SpecificRestaurant = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [header, setHeader] = useState({});
  const [foodItems, setFoodItems] = useState([]);
  const { id } = useParams();
  const restaurantId = id.slice(1);

  useEffect(() => {
    const getList = async () => {
      setIsLoading(true);
      const apiUrl = `https://tastyfoods-apis.onrender.com/restaurants-list/${restaurantId}`;
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      const header = {
        costOfTwo: data.cost_for_two,
        cuisine: data.cuisine,
        rating: data.rating,
        reviews: data.reviews_count,
        name: data.name,
        imgUrl: data.image_url,
        location: data.location,
      };
      const foodItems = data.food_items.map((each) => {
        let p = 0;
        const i = JSON.parse(localStorage.getItem("cartData")) || [];
        const v = i.find((e) => e.id === each.id);
        if (v !== undefined) {
          p = v.quantity;
        }
        return {
          cost: each.cost,
          id: each.id,
          imgUrl: each.image_url,
          name: each.name,
          rating: each.rating,
          quantity: p,
        };
      });

      setHeader(header);
      setFoodItems(foodItems);
      setIsLoading(false);
    };

    getList();
  }, [restaurantId]);

  const onIncrement = (id) => {
    const cart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedFoodItems = foodItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        const cartItem = cart.find((each) => each.id === id);
        if (cartItem === undefined) {
          cart.push({ ...updatedItem, imageUrl: updatedItem.imgUrl });
        } else {
          cartItem.quantity += 1;
        }
        return updatedItem;
      }
      return item;
    });

    localStorage.setItem("cartData", JSON.stringify(cart));
    setFoodItems(updatedFoodItems);
  };

  const onDecrement = (id) => {
    let cart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedFoodItems = foodItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        const cartItem = cart.find((each) => each.id === id);
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          cart = cart.filter((each) => each.id !== id);
        }
        localStorage.setItem("cartData", JSON.stringify(cart));
        return updatedItem;
      }
      return item;
    });

    setFoodItems(updatedFoodItems);
  };

  const { costOfTwo, cuisine, rating, reviews, name, imgUrl, location } =
    header;

  const cookie = Cookies.get("jwt_token");
  if (cookie === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      <NavBar active />
      {isLoading ? (
        <div testid="restaurant-details-loader" className="loader-container">
          <LineWave type="ThreeDots" color="orange" height="50" width="50" />
        </div>
      ) : (
        <Fragment>
          <div className="headers">
            <img className="restaurant-img" src={imgUrl} alt="restaurant" />
            <div className="restaurant-details">
              <h1 className="rest-heading">{name}</h1>
              <p className="rests-cuisine">{cuisine}</p>
              <p className="rests-cuisine">{location}</p>
              <div className="rating-and-two">
                <div className="for-twos">
                  <p className="rest-star">
                    <FaStar /> {rating}
                  </p>
                  <p className="rests-cuisine">{reviews}+ Ratings</p>
                </div>
                <div className="for-two">
                  <p className="rest-star">
                    <FaRupeeSign /> {costOfTwo}
                  </p>
                  <p className="rests-cuisine">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <ul className="food-list">
            {foodItems.map((each) => (
              <FoodItem
                key={each.id}
                details={each}
                increment={onIncrement}
                decrement={onDecrement}
              />
            ))}
          </ul>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default SpecificRestaurant;
