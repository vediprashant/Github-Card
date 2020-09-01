import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./cardLayout.css";
import "../app.css";

const CardLayout = (props) => {
  const {
    avatar_url: avatar,
    login: userName,
    location,
    following,
    followers,
    bio,
    html_url: link,
    blog,
    email,
  } = props.userData;
  return (
    <div className="card">
      <Card>
        <Image src={avatar} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{userName}</Card.Header>
          <Card.Meta>{location}</Card.Meta>
          <Card.Description>{bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href="_blank" className="follow1 abs">
            <Icon name="user" />
            {followers} Followers
          </a>
          <a href="_blank" className="follow2">
            <Icon name="user" />
            {following} Following
          </a>
        </Card.Content>
        <Card.Content extra>
          <a href="_blank">
            <Icon name="github" />
            {link}
          </a>
        </Card.Content>
        <Card.Content extra>
          <a href="_blank">
            <Icon name="mail" />
            {email}
          </a>
        </Card.Content>
        <Card.Content extra>
          <a href="_blank">
            <Icon name="blogger" />
            {blog}
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};
CardLayout.propTypes = {
  userData: PropTypes.object,
};

export default CardLayout;
