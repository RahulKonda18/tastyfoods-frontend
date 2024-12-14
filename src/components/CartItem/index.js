/* eslint-disable react/no-unknown-property */
// import {FiMinusSquare, FiPlusSquare} from 'react-icons/fi'
import "./index.css";

const CartItem = (props) => {
  const { details, increment, decrement } = props;
  const { name, quantity, cost, imageUrl, id } = details;

  const onIncrement = () => {
    increment(id);
  };

  const onDecrement = () => {
    decrement(id);
  };

  return (
    <li>
      <div testid="cartItem" className="carts">
        <img src={imageUrl} alt="cart-item" className="cart-image" />
        <div className="det">
          <h1 className="heads">{name}</h1>
          <div className="plus-minus">
            <button
              className="pm"
              type="button"
              onClick={onDecrement}
              testid="decrement-quantity"
            >
              -
            </button>
            <h1 testid="item-quantity" className="quantity">
              {quantity}
            </h1>
            <button
              className="pm"
              type="button"
              onClick={onIncrement}
              testid="increment-quantity"
            >
              +
            </button>
          </div>
          <p className="yellow">₹{cost}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
