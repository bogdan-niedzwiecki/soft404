// import React, { Component, useState } from "react";
// import { Redirect } from "react-router";
// import { BrowserRouter, Route } from "react-router-dom";

// import Header from "./Components/Header/";
// import Footer from "./Components/Footer/";
// import LoginForm from "./Components/LoginForm/";
// import PostsList from "./Components/PostsList/";
// import NewPost from "./Components/NewPost/";
// import Profile from "./Components/Profile";
// import EditProfile from "./Components/Profile/EditProfile";

// class App extends Component {

//   render() {
//     return (
//       <BrowserRouter>
//         <Route path="/" render={() => sessionStorage.getItem("soft404_access_token") ? (<Header />) : (<React.Fragment />)} />
//         <Route exact path="/login" render={() => <LoginForm onSuccessLogin={this.getToken} />} />
//         <Route exact path="/logout" render={() => <Redirect to="/login" />} />
//         <Route exact path="/" render={() => sessionStorage.getItem("soft404_access_token") ? (<PostsList />) : (<Redirect to="/login" />)} />
//         <Route exact path="/create_post" render={() => sessionStorage.getItem("soft404_access_token") ? (<NewPost />) : (<Redirect to="/login" />)} />
//         <Route exact path="/profile" render={() => sessionStorage.getItem("soft404_access_token") ? (<Profile />) : (<Redirect to="/login" />)} />
//         <Route exact path="/edit_profile" render={() => sessionStorage.getItem("soft404_access_token") ? (<EditProfile />) : (<Redirect to="/login" />)} />
//         <Route path="/" render={() => sessionStorage.getItem("soft404_access_token") ? (<Footer />) : (<React.Fragment />)} />
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Burger, Header, MediaQuery, Navbar, ScrollArea, Text, MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useHotkeys, useLocalStorageValue } from '@mantine/hooks';
import ColorSchemeButton from './Components/ColorSchemeButton';
import User from './Components/User';
import MainLink from './Components/MainLink';
import { ReaderIcon, PersonIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';

export default function App() {
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <BrowserRouter>
          <AppShell
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
              <Navbar
                padding="md"
                width={{ sm: 300, lg: 400 }}
                hiddenBreakpoint="sm"
                hidden={!opened}
              >

                <Navbar.Section>
                  <User
                    avatar="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name="Amy Horsefighter"
                    email="ahorsefighter@gmail.com"
                    to="/profile"
                  />
                </Navbar.Section>
                <Navbar.Section
                  grow
                  mt="md"
                  component={ScrollArea}>
                  <MainLink icon={<ReaderIcon />} color="blue" label="Feed" to="/feed" />
                  <MainLink icon={<EnvelopeClosedIcon />} color="lime" label="Messenger" to="/messages" />
                  <MainLink icon={<PersonIcon />} color="violet" label="Friends" to="/friends" />
                </Navbar.Section>

              </Navbar>
            }
            header={
              <Header height={70} padding="md">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                  <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      mr="xl"
                    />
                  </MediaQuery>
                  <Text>Facepook</Text>
                  <ColorSchemeButton />
                </div>
              </Header>
            }
          >
            <Routes>
              <Route path="/profile" element={<Text>profile</Text>} />
              <Route path="/feed" element={<Text>feed</Text>} />
              <Route path="/messages" element={<Text>messages</Text>} />
              <Route path="/friends" element={<Text>friends</Text>} />
            </Routes>

          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider >
  );
}