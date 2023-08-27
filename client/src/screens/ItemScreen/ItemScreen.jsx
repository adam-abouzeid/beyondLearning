import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ItemScreen.css";

import Button from "../../components/Button/Button";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import { addToCart } from "../../slices/cartSlice";
const ItemScreen = () => {
  const { id: itemID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const { data: item, isLoading, error } = useGetProductDetailsQuery(itemID);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...item, qty }));
    navigate("/basket");
  };
  return (
    <div className="itemPage-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="itemPage-image-container">
            <img
              src="https://www.shutterstock.com/image-photo/colorful-shopping-bag-stack-cardboard-600w-1740471485.jpg"
              alt=""
            />
          </div>
          <div className="itemPage-details-container">
            <h1>{item.name}</h1>
            <h3>Category: {item.category}</h3>
            <hr />
            <strong>
              {item.countInStock > 0 ? "In Stock" : "Out of stock"}
            </strong>
            {item.countInStock > 0 && (
              <div className="quantity">
                <label htmlFor="quantity">Quantity</label>
                <select
                  name="quantity"
                  id="quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <Button onClick={addToCartHandler} title={"ADD TO BASKET"} />
          </div>
        </>
      )}
      {error && <div>{error.data.message || error.error}</div>}
    </div>
  );
};

export default ItemScreen;
