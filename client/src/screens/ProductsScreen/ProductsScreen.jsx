import "./ProductScreen.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Meta from "../../components/Meta";
const ProductsScreen = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("/api/products");

      setItems(data.products);
    };
    fetchItems();
  }, []);
  return (
    <div>
      <h1>Products</h1>
      {items?.map((item) => (
        <Link key={item._id} className="item-card" to={`/products/${item._id}`}>
          {item.description}
        </Link>
      ))}
    </div>
  );
};
export default ProductsScreen;
