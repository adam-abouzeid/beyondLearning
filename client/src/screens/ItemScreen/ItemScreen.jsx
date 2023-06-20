import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ItemScreen.css";
import axios from "axios";
import Button from "../../components/Button/Button";
const ItemScreen = () => {
  const { id: itemID } = useParams();
  const [item, setItem] = useState({});
  console.log(item);
  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`/api/items/${itemID}`);
      setItem(data);
    };
    fetchItem();
  }, [itemID]);
  return (
    <div className="itemPage-container">
      <div className="itemPage-image-container">
        <img
          src="https://www.shutterstock.com/image-photo/colorful-shopping-bag-stack-cardboard-600w-1740471485.jpg"
          alt=""
        />
      </div>
      <div className="itemPage-details-container">
        <h1>{item.title}</h1>
        <h3>Category: {item.category}</h3>
        <hr />
        <strong>{item.stock > 0 ? "In Stock" : "Out of stock"}</strong>
        <Button title={"ADD TO BASKET"} />
      </div>
    </div>
  );
};

export default ItemScreen;
