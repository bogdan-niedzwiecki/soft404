import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, createStyles, keyframes, Center } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons";

const bounce = keyframes({
  to: {
    boxShadow: "0px 0px 0px 30px transparent",
  },
});

const useStyles = createStyles(() => ({
  container: {
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
    height: "100vh",
  },

  button: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    animation: `${bounce} 3s infinite cubic-bezier(0.66, 0, 0, 1);`,
    boxShadow: "0px 0px 0px 0px rgb(44, 83, 100)",
  },
}));

export default function LoginForm({ token_id, addUser }) {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (token_id && localStorage.getItem("token_id")) {
      history.push("/feed");
    }
  }, [token_id, history]);

  const successResponse = (response) => {
    setLoading(true);
    addUser(response);
  };

  const failureResponse = (response) => console.error(response);

  return (
    <>
      <Helmet>
        <title>Welcome! | Facepook</title>
        <meta
          name="description"
          content="Facepook is the largest European social network with more than 1 active user. Our goal is to keep old friends, ex-classmates, neighbors and colleagues in touch."
        />
      </Helmet>
      <Center className={classes.container}>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in"
          onSuccess={successResponse}
          onFailure={failureResponse}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          prompt="consent"
          render={(googleLogin) => (
            <Button
              className={classes.button}
              onClick={googleLogin.onClick}
              leftIcon={<IconBrandGoogle size={18} />}
              loading={loading}
              variant="gradient"
              gradient={{ from: "teal", to: "blue", deg: 60 }}
            >
              Sign In With Google
            </Button>
          )}
        />
      </Center>
    </>
  );
}
