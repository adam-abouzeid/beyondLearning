import Landing from "./components/Landing/Landing";

import "./HomeScreen.css";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Card from "../../components/Card/Card";
import AboutUs from "./components/AboutUs/AboutUs";
import OurTeam from "./components/OurTeam/OurTeam";
import { useParams, Link } from "react-router-dom";
import Paginate from "../../components/Paginate";
import adam from "../../assets/adam.jpg";
import lara from "../../assets/lara.jpg";
import Meta from "../../components/Meta";
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
    position: "Junior Assistant 1",
    image: "https://picsum.photos/200/300",
  },
  {
    name: "Adam",
    position: "Junior Assistant 1",
    image: adam,
  },
  {
    name: "Moustapha",
    position: "Junior Assistant 2",
    image: "https://picsum.photos/200/300",
  },
];
const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="home-container">
      {keyword && <Link to="/">go back</Link>}
      {isLoading && <div className="loading">Loading...</div>}
      {error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          {/* <Landing /> */}
          <Meta title="Home Screen" />
          <div className="products-section">
            {data?.items?.map((product) => (
              <h1
                style={{ color: "red", margin: 20, fontSize: 13 }}
                key={product._id}
              >
                {product.name}
              </h1>
            ))}
          </div>
          {/* <AboutUs /> */}
          {/* <OurTeam team={team} /> */}
          <Paginate
            page={pageNumber}
            pages={data?.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
