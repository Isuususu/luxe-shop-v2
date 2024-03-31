import React, { useState } from "react";

//Icons
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const Reviews = ({ stars, ratings, cardSmall }) => {
  // console.log(stars);
  // console.log(ratings);

  const roundedRating = Math.round(stars * 2) / 2;

  const starsElements = Array.from({ length: 5 }, (_, index) => {
    if (index < roundedRating) {
      return (
        <span key={index} className="reviews-container__star">
          <FaStar
            color="#f27012"
            fontSize={cardSmall ? "1.2rem" : "1.7rem"}
          />
        </span>
      ); // Render an filled star
    } else if (
      index === Math.floor(roundedRating) &&
      Number.isInteger(roundedRating)
    ) {
      return (
        <span key={index} className="reviews-container__star">
          <FaStarHalfAlt
            color="#f27012"
            fontSize={cardSmall ? "1.2rem" : "1.7rem"}
          />
        </span>
      ); // Render a half-filled star
    } else {
      return (
        <span key={index} className="reviews-container__star">
          <FaRegStar
            color="#f27012"
            fontSize={cardSmall ? "1.2rem" : "1.7rem"}
          />
        </span>
      ); // Render an empty star
    }
  });

  return (
    <div className="reviews-container">
      {starsElements}
      <span
        className={`reviews-container__qty ${
          cardSmall === true ? "small-card" : ""
        }`}
      >
        {ratings}
      </span>
    </div>
  );
};

export default Reviews;
