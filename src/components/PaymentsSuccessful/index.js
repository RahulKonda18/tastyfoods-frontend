import { useNavigate } from "react-router-dom";
import none from "../Images/PaymentSuccessful.png";
import NavBar from "../NavBar";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { Fragment } from "react";

const PaymentSuccessful = (props) => {
  const history = useNavigate();

  const home = () => {
    history("/");
  };

  const cookie = Cookies.get("jwt_token");
  if (cookie === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <NavBar />
      <div className="not-found-container">
        <img src={none} alt="no orders" className="no-orders" />
        <h1 className="not-found-heading">Payment Successful</h1>
        <p className="not-found-description">
          Thank you for orderingYour payment is successfully completed.
        </p>
        <button onClick={home} className="not-found-button" type="button">
          Go To Home Page
        </button>
      </div>
    </Fragment>
  );
};

export default PaymentSuccessful;
