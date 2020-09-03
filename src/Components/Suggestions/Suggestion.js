import React from "react";

export default function Suggestion(props) {
  return (
    <div className="event">
      <div className="label">
        <img src={props.avatar_url} alt="avatar" />
      </div>
      <div className="content">
        <div className="date">{props.login}</div>
        <a>{props.html_url}</a>
        <div className="summary">
          <i
            className="medium link icons"
            title="follow"
            onClick={() => props.onFollowClick(props.login)}
          >
            <i aria-hidden="true" className="github icon"></i>
            <i aria-hidden="true" className="add corner icon"></i>
          </i>
        </div>
      </div>
      <div className="label" title="remove">
        <i
          aria-hidden="true"
          className="close link icon"
          onClick={() => props.onRemoveClick(props.login)}
        ></i>
      </div>
    </div>
  );
}
