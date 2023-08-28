import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
function App() {
  const loc = useLocation();
  const noHeaderRoutes = ["/login", "/register"];
  return (
    <>
      {!noHeaderRoutes.includes(loc.pathname) && <Header />}
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
