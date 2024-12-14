/* eslint-disable react/no-unknown-property */
import { useNavigate, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./index.css";
import { Fragment } from "react";

const HomeRestrauntItem = (props) => {
  const navigate = useNavigate();
  const { data } = props;
  const { id, name, cuisine, imgUrl, rating, ratingColor, reviews } = data;
  const path = `/restaurant/:${id}`;
  const loadRestraunt = () => {
    navigate(`./restaurant/:${id}`);
  };

  return (
    <Fragment>
      <Link to={path} style={{ textDecoration: "none" }}>
        <li
          onClick={loadRestraunt}
          className="restraunt-item-row"
          testid="restaurant-item"
        >
          <div className="image-c">
            <img src={imgUrl} alt="restaurant" className="rest-image" />
          </div>
          <div className="rest-details">
            <h1 className="rest-name">{name}</h1>
            <p className="rest-cuisine">{cuisine}</p>
            <div className="rest-cuisines">
              <FaStar size={20} color={ratingColor} />
              <p className="rest-rating">{rating}</p>
              <h1 className="rest-rating">({reviews} ratings)</h1>
            </div>
          </div>
        </li>
      </Link>
    </Fragment>
  );
};

export default HomeRestrauntItem;
