import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ listing }) => {
  return (
    <Link to={`/listing/${listing._id}`} style={{ textDecoration: "none" }}>
      <div className="card-wrapper">
        <div className="card-border">
          <div className="card-container flex">
            <div
              className="card-img"
              style={{
                backgroundImage: "url(" + listing.image + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              {listing.stock > 0 && (
                <span className="card-sponsored">SPONSORED</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
