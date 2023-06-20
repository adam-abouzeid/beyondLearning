import Landing from "./components/Landing/Landing";
import { useEffect, useState } from "react";
import "./HomeScreen.css";
import axios from "axios";
import Card from "../../components/Card/Card";
import AboutUs from "./components/AboutUs/AboutUs";
import OurTeam from "./components/OurTeam/OurTeam";
import adam from "../../assets/adam.jpg";
import lara from "../../assets/lara.jpg";
const team = [
  {
    name: "Hammad",
    position: "Big Loompa",
    image:
      "https://media.licdn.com/dms/image/C5103AQFvEIhHiuzCdQ/profile-displayphoto-shrink_200_200/0/1516279887943?e=1692835200&v=beta&t=8Z_kL0-qCxy0YDkViNPFgD7bRG-dxUqcl_F0ShGnqmQ",
  },
  {
    name: "Rayane",
    position: "HR & Operations Manager",
    image:
      "https://media.licdn.com/dms/image/C4D03AQGfMqEK-Owtug/profile-displayphoto-shrink_200_200/0/1517366039735?e=1692835200&v=beta&t=nDcNM7D3RuJfIPi5My_ed7sX-BNM6qgDF4knCjwyW9k",
  },
  {
    name: "Lara",
    position: "Logistics Team Leader",
    image: lara,
  },
  {
    name: "Rawan",
    position: "Senior Assistant 1",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Issam",
    position: "Senior Assistant 2",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Youssef",
    position: "Junior Assistan 1",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Adam",
    position: "Junior Assistan 1",
    image: adam,
  },
  {
    name: "Moustapha",
    position: "Junior Assistan 2",
    image: "https://picsum.photos/200/300",
  },
];
const HomeScreen = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/items");
      setItems(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="home-container">
      <Landing />
      {/* <div className="items">
        {items.map((item) => (
          <Card listing={item} key={item._id} />
        ))}
      </div> */}{" "}
      <AboutUs />
      <OurTeam team={team} />
    </div>
  );
};

export default HomeScreen;
