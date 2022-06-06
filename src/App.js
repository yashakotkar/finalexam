import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { isAuth } from "./utils/auth";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Users from './pages/users/Users';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <LoggedInRedirect path="/" exact Component={Login} />
      <PrivateRoute exact path="/orders" Component={Orders} />
      <PrivateRoute exact path="/order/:orderId" Component={Order} />
      <PrivateRoute exact path="/products" Component={Products} />
      <PrivateRoute exact path="/product/:productId" Component={Product} />
      <PrivateRoute exact path="/users" Component={Users} /> */}
        <Route path={"orders"} element={<Orders />} />
        <Route path={"users"} element={<Users />} />
        <Route path={"products"} element={<Products />} />
        <Route
          path="/"
          // element={<Login />}
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
