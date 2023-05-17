import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <NavLink to="/users">
      <div className="homepage">
        <img
          className="homepage_img"
          src="https://img.freepik.com/free-vector/cartoon-yard-sign_23-2148861631.jpg?w=2000"
          alt="homepage"
        />
      </div>
    </NavLink>
  );
}

export default Home;
