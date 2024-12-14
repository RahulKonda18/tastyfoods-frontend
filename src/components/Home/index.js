import NavBar from "../NavBar";
import Slick from "../Slick";
import RestrauntsList from "../RestrauntsList";
import Footer from "../Footer";
import Cookies from "js-cookie";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const cookie = Cookies.get("jwt_token");
  if (cookie === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <NavBar active />
      <Slick />
      <RestrauntsList />
      <Footer />
    </Fragment>
  );
};

export default Home;
