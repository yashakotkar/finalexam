import React, { useState } from "react";
import "../page.css";
import "./Users.css"
import { useEffect } from "react";
import { isAuth } from "./../../utils/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
    );
    setUsers(data);
    setSearchedUsers(data);
  };

  useEffect(() => {
    isAuth() ? fetchUsers() : navigate("/");
  }, []);

  const handleSearchTextOnClick = (e) => {
    e.preventDefault();
    if (searchText.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    } else {
      updateSearchedUsers();
    }
  };
  const updateSearchedUsers = async() => {
    const { data } = await axios.get(
        `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchText}`
      );
      setSearchedUsers(data);
  };

  const handleSearchReset = () => {
    setSearchText("");
    setSearchedUsers(users);
  };
  return (
    <main className="page-container page-wrapper">
      <h1 className="page-title">Users</h1>
      <div className="search-container">
        <form onSubmit={(e) => handleSearchTextOnClick(e)}>
          <input
            style={{  }}
            type="text"
            className="SearchBox"
            placeholder="Search By Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>
        <button
          style={{ marginLeft: "60px" }}
          onClick={handleSearchReset}
        >
          Reset
        </button>
      </div>
      <div className="content table-container">
        <table className="OrderTable">
          <tbody id="users-table">
            <tr className="TableRow">
              <th>ID</th>
              <th>User Avatar</th>
              <th>Full Name</th>
              <th>DoB</th>
              <th>Gender</th>
              <th>Current Location</th>
            </tr>
            {searchedUsers.map(
              (
                {
                  id,
                  profilePic,
                  fullName,
                  gender,
                  dob,
                  currentCity,
                  currentCountry,
                },
                index
              ) => (
                <tr key={id + "" + index}>
                  <td className="text-light">{id}</td>
                  <td className="text-dark">
                    <img src={profilePic} alt="user-profile-pic" />
                  </td>
                  <td className="text-light">{fullName}</td>
                  <td className="text-dark">{`${dob.split("-")[0]} ${
                    dob.split("-")[1]
                  }, ${dob.split("-")[2]}`}</td>
                  <td className="text-light">{gender}</td>
                  <td className="text-light">
                    {currentCity}, {currentCountry}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Users;
