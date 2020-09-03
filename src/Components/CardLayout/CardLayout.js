import React, { useState, useEffect } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import PropTypes from "prop-types";

import "./cardLayout.css";
import "../app.css";
import followUser from "../../utils/followUser";
import checkFollowing from "../../utils/checkFollowing";

/**
 * Component to show the card having details of user
 */
const CardLayout = (props) => {
  const [following, setFollowing] = useState(false);
  const followHandler = async (login) => {
    if (props.html_url !== "https://github.com/sample!") {
      await followUser(login);
    }
    setFollowing(true);
  };

  useEffect(() => {
    const checkFollow = async () => {
      const check = await checkFollowing(props.login);
      if (check) {
        setFollowing(true);
      }
    };
    checkFollow();
  }, []);

  return (
    <div className="card">
      {console.log(props)}
      <Card>
        <Image src={props.avatar_url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {props.login}
            {props.cardPage ? (
              following ? (
                <i className="medium link icons followIcon" title="folowing">
                  <i aria-hidden="true" className="check circle green icon"></i>
                </i>
              ) : (
                <i
                  className="medium link icons followIcon"
                  title="follow"
                  onClick={() => followHandler(props.login)}
                >
                  <i aria-hidden="true" className="github icon"></i>
                  <i aria-hidden="true" className="add corner icon"></i>
                </i>
              )
            ) : null}
          </Card.Header>
          {props.location ? <Card.Meta>{props.location}</Card.Meta> : null}
          {props.bio ? <Card.Description>{props.bio}</Card.Description> : null}
        </Card.Content>
        <Card.Content extra>
          <a href="_blank" className="follow1 abs">
            <Icon name="user" />
            {props.followers} Followers
          </a>
          <a href="_blank" className="follow2">
            <Icon name="user" />
            {props.following} Following
          </a>
        </Card.Content>
        <Card.Content extra>
          <a href="_blank">
            <Icon name="github" />
            {props.html_url}
          </a>
        </Card.Content>
        {props.email ? (
          <Card.Content extra>
            <a href="_blank">
              <Icon name="mail" />
              {props.email}
            </a>
          </Card.Content>
        ) : null}
        {props.blog ? (
          <Card.Content extra>
            <a href="_blank">
              <Icon name="blogger" />
              {props.blog}
            </a>
          </Card.Content>
        ) : null}
      </Card>
    </div>
  );
};
CardLayout.propTypes = {
  /* userData will contain all the details about a given user */
  userData: PropTypes.object,
};

export default CardLayout;
