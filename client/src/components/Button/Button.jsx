import React from "react";
import "./Button.css";

const Button = ({ title, width, height, extraClasses, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`button flex center 
      } ${extraClasses}`}
      style={{
        width: width,
        height: height,
      }}
    >
      <span> {title} </span>
    </button>
  );
};

export default Button;
