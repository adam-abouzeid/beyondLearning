import "./ProductScreen.css";

import { useState, useEffect } from "react";
import axios from "axios";
const ProductsScreen = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("/api/items");

      setItems(data);
    };
    fetchItems();
  }, []);
  return (
    <div>
      <h1>Products</h1>
      {items.map((item) => (
        <h1>{item.description}</h1>
      ))}
    </div>
  );
};
export default ProductsScreen;
