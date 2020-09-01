import React from "react";
import PropTypes from "prop-types";

function Search({ onChange, value }) {
  return (
    <div className="ui left icon input">
      <input
        type="text"
        placeholder="Search users..."
        value={value}
        onChange={onChange}
      />
      <i aria-hidden="true" className="users icon"></i>
    </div>
  );
}

Search.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Search;
