import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeProvider,
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  createStyles,
  Container,
} from "@mantine/core";
import { useHotkeys, useLocalStorageValue } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import {
  ReaderIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import User from "../User";
import NavLink from "../NavLink";
import PostList from "../PostList";
import PostBox from "../PostBox";
import MenuDropdown from "../MenuDropdown";

const useStyles = createStyles((theme) => ({
  navbar: {
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      left: "calc(50% - 320px)",
      transform: "translateX(-50%)",
    },
  },

  headerContainer: {
    maxWidth: 928,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
}));

export default function Main({ user, addUser }) {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useEffect(() => {
    addUser();
  }, [addUser]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <NotificationsProvider>
          <Container>
            <AppShell
              navbarOffsetBreakpoint="sm"
              fixed
              padding="0"
              navbar={
                <Navbar
                  className={classes.navbar}
                  p="md"
                  width={{ sm: 320 }}
                  hiddenBreakpoint="sm"
                  hidden={!opened}
                >
                  <Navbar.Section>
                    <User
                      avatar={user.picture}
                      name={`${user.given_name} ${user.family_name}`}
                      email={user.email}
                      to="/profile"
                    />
                  </Navbar.Section>
                  <Navbar.Section grow mt="md" component={ScrollArea}>
                    <NavLink
                      icon={<ReaderIcon />}
                      color="blue"
                      label="Feed"
                      to="/feed"
                      onClick={() => setOpened(false)}
                    />
                    <NavLink
                      icon={<PersonIcon />}
                      color="violet"
                      label="Friends"
                      to="/friends"
                      onClick={() => setOpened(false)}
                    />
                    <NavLink
                      icon={<EnvelopeClosedIcon />}
                      color="lime"
                      label="Messenger"
                      to="/messages"
                      onClick={() => setOpened(false)}
                    />
                  </Navbar.Section>
                </Navbar>
              }
              header={
                <Header height={70} p="md">
                  <div className={classes.headerContainer}>
                    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                      <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                      />
                    </MediaQuery>
                    <Text
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                      size="xl"
                      weight={700}
                    >
                      Facepook
                    </Text>
                    <MenuDropdown />
                  </div>
                </Header>
              }
            >
              <Switch>
                <Route
                  exact
                  path="/profile"
                  render={() => <Text>profile</Text>}
                />
                <Route
                  exact
                  path="/feed"
                  render={() => (
                    <>
                      <PostBox />
                      <PostList />
                    </>
                  )}
                />
                <Route
                  exact
                  path="/messages"
                  render={() => <Text>messages</Text>}
                />
                <Route
                  exact
                  path="/friends"
                  render={() => <Text>friends</Text>}
                />
                <Redirect to="/feed" />
              </Switch>
            </AppShell>
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
