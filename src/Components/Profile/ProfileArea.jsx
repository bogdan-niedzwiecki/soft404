import React from "react";
import PropTypes from "prop-types";

const ProfileArea = props => {
  return (
    <div>
      <h3>{props.username}</h3>
      <ul>
        <li>Email address: {props.emailAddress}</li>
      </ul>
    </div>
  );
};

ProfileArea.propTypes = {
  username: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> postsList
=======
>>>>>>> 2edff0813f9000172cd742dc714fce4b52d8e361
};

export default ProfileArea;
