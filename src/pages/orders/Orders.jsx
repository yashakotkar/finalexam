import React, { useState } from "react";
import "../page.css";
import { useEffect } from "react";
import { isAuth } from "./../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    New: true,
    Packed: true,
    InTransit: true,
    Delivered: true,
  });
  const [count, setCount] = useState(0);

  const fetchOrders = async () => {
    const { data } = await axios.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"
    );
    setOrders(data);
    setFilteredOrders(data);
    setCount(data.length);
  };

  useEffect(() => {
    isAuth() ? fetchOrders() : navigate("/");
  }, []);

  const handleFilterChange = (e) => {
    const fltrs = filters;
    fltrs[e.target.name] = e.target.checked;
    setFilters(fltrs);
    updateDisplayOrders();
  };

  const updateDisplayOrders = () => {
    const displayOrds = orders.filter((order) => filters[order.orderStatus]);
    setFilteredOrders(displayOrds);
    setCount(displayOrds.length);
  };

  return (
    <main className="page-container page-wrapper">
      <h1 className="page-title">Orders</h1>
      <div className="content">
        <div className="filter-container">
          <h3>Filters</h3>
          <div className="filter-sidebar">
            <p>
              Count:
              <span>{count}</span>
            </p>
            <label className="checkbox">
              <input
                type="checkbox"
                name="New"
                checked={filters["New"]}
                onChange={handleFilterChange}
              />
              New
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="Packed"
                checked={filters["Packed"]}
                onChange={handleFilterChange}
              />
              Packed
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="InTransit"
                checked={filters["InTransit"]}
                onChange={handleFilterChange}
              />
              InTransit
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="Delivered"
                checked={filters["Delivered"]}
                onChange={handleFilterChange}
              />
              Delivered
            </label>
          </div>
        </div>
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              {filteredOrders.map(
                (
                  {
                    id,
                    customerName,
                    orderDate,
                    orderTime,
                    amount,
                    orderStatus,
                  },
                  index
                ) => (
                  <tr key={id + "" + index}>
                    <td className="text-light">
                      <Link
                        to={`/order/${id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {id}
                      </Link>
                    </td>

                    <td className="text-dark">{customerName}</td>
                    <td className="text-dark">
                      {orderDate}
                      <br />
                      <span className="text-light">{orderTime}</span>
                    </td>
                    <td className="text-light">{amount}</td>
                    <td className="text-dark">{orderStatus}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Orders;
