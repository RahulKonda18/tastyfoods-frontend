import { useNavigate, Link } from "react-router-dom";
import none from "../Images/NoOrders.png";
import "./index.css";
import { Fragment } from "react";

const OrdersNone = (props) => {
  const history = useNavigate();
  const home = () => {
    history("/");
  };
  return (
    <Fragment>
      <div className="not-found-container">
        <img src={none} alt="empty cart" className="no-orders" />
        <h1 className="not-found-heading">No Order Yet!</h1>
        <p className="not-found-description">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button onClick={home} className="not-found-button" type="button">
            Order Now
          </button>
        </Link>
      </div>
    </Fragment>
  );
};

export default OrdersNone;
