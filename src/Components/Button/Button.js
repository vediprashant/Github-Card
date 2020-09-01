import React from "react";
import PropTypes from "prop-types";

function Button({ onClick, text }) {
  return (
    <button className="ui grey button" onClick={onClick} type="submit">
      <i aria-hidden="true" className="github icon"></i>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
