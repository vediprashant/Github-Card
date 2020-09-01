import React from "react";
import { Link } from "react-router-dom";

import "../Components/app.css";
import "./notFoundPage.css";

const NotFoundPage = () => (
  <div className="notFound">
    <span>404</span>
    <i className="fas fa-ghost"></i>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFoundPage;
