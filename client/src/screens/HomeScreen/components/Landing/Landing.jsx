import React from "react";
import "./Landing.css";
import Button from "../../../../components/Button/Button";

const Landing = () => {
  return (
    <div className="landing-banner">
      <div className="overlay"></div>
      <div className="landing-banner-content-div">
        <div className="landing-banner-content">
          <span className="landing-banner-logo">BEYOND LEARNING</span>
          <span className="landing-banner-text">
            MAKE
            <br />
            MAGIC
            <br />
            REAL
          </span>
        </div>
        <div className="landing-banner-button">
          <Button
            title={"Learn More"}
            extraClasses="landing-btn"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
