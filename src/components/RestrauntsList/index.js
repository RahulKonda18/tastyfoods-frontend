import React, { useState, useEffect, Fragment } from "react";
import Cookies from "js-cookie";
import { MdSort } from "react-icons/md";
import { LineWave } from "react-loader-spinner";
import { TiArrowSortedDown } from "react-icons/ti";
import HomeRestrauntItem from "../HomeRestrauntItem";
import Pagination from "../Pagination";
import "./index.css";

const sortByOptions = [
  {
    id: 0,
    displayText: "Highest",
    value: "Highest",
  },
  {
    id: 2,
    displayText: "Lowest",
    value: "Lowest",
  },
];

const RestrauntsList = () => {
  const [sortBy, setSortBy] = useState(sortByOptions[1].value);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const offset = (activePage - 1) * 9;
      const apiUrl = `https://tastyfoods-apis.onrender.com/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${sortBy}`;
      setIsLoading(true);
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
      const finalData = data.map((each) => ({
        id: each.id,
        name: each.name,
        cuisine: each.cuisine,
        imgUrl: each.image_url,
        rating: each.user_rating,
        ratingColor: each.rating_color,
        reviews: each.total_reviews,
      }));

      setData(finalData);
      setIsLoading(false);
    };

    getData();
  }, [activePage, sortBy]);

  const incrementActivePage = () => {
    setActivePage((prevPage) => (prevPage === 4 ? 4 : prevPage + 1));
  };

  const decrementActivePage = () => {
    setActivePage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const onChangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="restraunts-list-bg">
      <div className="top-section">
        <div className="descriptions">
          <h1 className="pop-heading">Popular Restaurants</h1>
          <p className="pop-desc">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="sort-box">
          <MdSort size={25} color="#475569" />
          <p className="pop-select">Sort By </p>
          <select
            className="pop-selects"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            {sortByOptions.map((each) => (
              <option className="select-item" key={each.id} value={each.value}>
                {each.displayText}
              </option>
            ))}
          </select>
          <TiArrowSortedDown size={25} color="#475569" />
        </div>
      </div>
      <hr className="hr" />
      {isLoading ? (
        <div testid="restaurants-list-loader" className="loader-container">
          <LineWave type="ThreeDots" color="orange" height="50" width="50" />
        </div>
      ) : (
        <Fragment>
          <ul className="results-list">
            {data.map((each) => (
              <HomeRestrauntItem key={each.id} data={each} />
            ))}
          </ul>
          <Pagination
            decrementActivePage={decrementActivePage}
            incrementActivePage={incrementActivePage}
            active={activePage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default RestrauntsList;
