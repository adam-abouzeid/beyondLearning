import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen.jsx";
import ItemScreen from "./screens/ItemScreen/ItemScreen.jsx";
import ProductScreen from "./screens/ProductsScreen/ProductsScreen.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import BasketScreen from "./screens/BasketScreen/BasketScreen.jsx";
import LoginScreen from "./screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OrderScreen from "./screens/OrderScreen/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen/OrderListScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen/ProductListScreen.jsx";
import ProductEditScreen from "./screens/admin/ProductEditScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import UserEditScreen from "./screens/admin/UserEditScreen.jsx";
import { HelmetProvider } from "react-helmet-async";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route
          path="/search/:keyword/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="/products/:id" element={<ItemScreen />} />
        <Route path="/products" element={<ProductScreen />} />
        <Route path="/basket" element={<BasketScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderListScreen />} />
        <Route path="/admin/productList" element={<ProductListScreen />} />
        <Route
          path="/admin/productList/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/userList" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
