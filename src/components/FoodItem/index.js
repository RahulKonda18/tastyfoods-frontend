/* eslint-disable react/no-unknown-property */
import { FaStar } from "react-icons/fa";
import "./index.css";
import Swal from "sweetalert2";

const FoodItem = (props) => {
  const { details, increment, decrement } = props;
  const { cost, id, imgUrl, name, rating, quantity } = details;

  const onIncrement = () => {
    increment(id);

    Swal.fire({
      toast: true,
      position: "bottom", // Set position to bottom-center
      icon: "success",
      title: `Added ${name} to cart`,
      showConfirmButton: false,
      background: "#2e2e2e", // Dark background
      color: "#ffffff",
      timer: 3000,
    });
  };

  const onDecrement = () => {
    decrement(id);
    Swal.fire({
      toast: true,
      position: "bottom", // Set position to bottom-center
      icon: "error",
      title: `Removed ${name} from cart`,
      showConfirmButton: false,
      timer: 3000,
      background: "#2e2e2e", // Dark background
      color: "#ffffff",
    });
  };

  return (
    <li className="food-item" testid="foodItem">
      <img className="food-image" src={imgUrl} alt="food-item" />
      <div className="food-desc">
        <h1 className="food-name">{name}</h1>
        <p className="food-cost">₹{cost}</p>
        <p className="food-names">
          <FaStar color="#ffa412" />
          {rating}
        </p>
        {quantity === 0 ? (
          <button className="button-add" type="button" onClick={onIncrement}>
            Add
          </button>
        ) : (
          <div className="plus-minus" id={id}>
            <button
              className="pm"
              type="button"
              onClick={onDecrement}
              testid="decrement-count"
            >
              -
            </button>

            <p className="quantity" testid="active-count">
              {quantity}
            </p>
            <button
              className="pm"
              type="button"
              onClick={onIncrement}
              testid="increment-count"
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default FoodItem;
