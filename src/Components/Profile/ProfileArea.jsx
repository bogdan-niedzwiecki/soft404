import React from "react";
import PropTypes from "prop-types";

const ProfileArea = props => {
  return (
    <div>
      <h3>{props.username}</h3>
      <ul>
        <li>Age: {props.age}</li>
        <li>Phone: {props.phone}</li>
        <li>Email address: {props.emailAddress}</li>
      </ul>
    </div>
  );
};

ProfileArea.propTypes = {
  username: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  phone: PropTypes.string.isRequired
};

export default ProfileArea;
