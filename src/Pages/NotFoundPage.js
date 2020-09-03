import React from "react";
import { Link } from "react-router-dom";

import "../Components/app.css";
import "./notFoundPage.css";

const NotFoundPage = () => (
  <div className="notFound">
    <div className="code">
      <span>Oops! 404</span>
      <i className="fas fa-ghost fa-spin fa-10x fa-fw ghost"></i>
    </div>
    <div className="redirect">
      <Link to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFoundPage;
