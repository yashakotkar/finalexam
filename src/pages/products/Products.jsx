import React, { useState } from "react";
import "../page.css";
import { useEffect } from "react";
import { isAuth } from "./../../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    expired: false,
    low_stock: false,
  });
  const [count, setCount] = useState(0);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
    );
    setProducts(data);
    setFilteredProducts(data);
    setCount(data.length);
    console.log(data);
  };

  useEffect(() => {
    isAuth() ? fetchProducts() : navigate("/");
  }, []);

  const handleFilterChange = (e) => {
    const fltrs = filters;
    fltrs[e.target.name] = e.target.checked;
    setFilters(fltrs);
    updateDisplayOrders();
  };

  const updateDisplayOrders = () => {
    if (!filters["expired"] && !filters["low_stock"]) {
      setFilteredProducts(products);
      setCount(products.length);
      return;
    }
    const fltrdProducts = [];
    for (const product of products) {
      let { expiryDate, stock } = product;
      if (filters["expired"] === true && !filters["low_stock"]) {
        const now = new Date();
        expiryDate = new Date(product.expiryDate);
        if (expiryDate < now) fltrdProducts.push(product);
      }
      if (filters["low_stock"] === true && !filters["expired"]) {
        if (!isNaN(Number(stock)) && Number(stock) < 100)
          fltrdProducts.push(product);
      }
      if (filters["expired"] && filters["low_stock"]) {
        const now = new Date();
        expiryDate = new Date(product.expiryDate);
        if (expiryDate < now && !isNaN(Number(stock)) && Number(stock) < 100)
          fltrdProducts.push(product);
      }
    }
    setFilteredProducts(fltrdProducts);
    setCount(fltrdProducts.length);
  };

  return (
    <main className="page-container page-wrapper">
      <h1 className="page-title">Products</h1>
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
                name="expired"
                checked={filters["expired"]}
                onChange={handleFilterChange}
              />
              Expired
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="low_stock"
                checked={filters["low_stock"]}
                onChange={handleFilterChange}
              />
              Low Stock
            </label>
          </div>
        </div>
        <div className="table-container">
          <table>
            <tbody>
              <tr className="TableRow">
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th style={{ minWidth: "100px" }}>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
              {filteredProducts.map(
                (
                  {
                    id,
                    medicineName,
                    medicineBrand,
                    stock,
                    unitPrice,
                    expiryDate,
                  },
                  index
                ) => (
                  <tr key={id + "" + index}>
                    <td className="text-light">
                      <Link
                        to={`/product/${id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {id}
                      </Link>
                    </td>
                    <td className="text-dark">{medicineName}</td>
                    <td className="text-light">{medicineBrand}</td>
                    <td className="text-dark">{expiryDate}</td>
                    <td className="text-light">{unitPrice}</td>
                    <td className="text-light">{stock}</td>
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

export default Products;
