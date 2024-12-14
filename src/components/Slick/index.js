import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { LineWave } from "react-loader-spinner";
import "./index.css";

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 700,
  infinite: true,
  dotsClass: "slick-dots",
  autoplay: true,
  autoplaySpeed: 3000,
  adaptiveHeight: true,
};

const Slick = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const jwtToken = Cookies.get("jwt_token");
      const apiUrl = "https://apis.ccbp.in/restaurants-list/offers";
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
      const results = data.offers.map((each) => ({
        id: each.id,
        imageUrl: each.image_url,
      }));
      setData(results);
      setIsLoading(false);
    };

    getImages();
  }, []);

  return !isLoading ? (
    <div className="slider-item">
      <Slider {...settings}>
        {data.map((each) => (
          <img key={each.id} className="item" src={each.imageUrl} alt="offer" />
        ))}
      </Slider>
    </div>
  ) : (
    <div testid="restaurants-offers-loader" className="loader-container">
      <LineWave type="ThreeDots" color="orange" height="50" width="50" />
    </div>
  );
};

export default Slick;
