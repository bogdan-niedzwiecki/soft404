import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

class LoginButton extends React.Component {
  render() {
    return (
      <div>
        <Button color="inherit" component={NavLink} to="/login">
          Sign In
        </Button>
      </div>
    );
  }
}

export default LoginButton;
