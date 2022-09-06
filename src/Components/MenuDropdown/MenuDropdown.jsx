import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import {
  Menu,
  Text,
  useMantineColorScheme,
  ThemeIcon,
  Group,
  Modal,
  Button,
} from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconTrash,
  IconLogout,
} from "@tabler/icons";
import { SunIcon, MoonIcon, TrashIcon } from "@radix-ui/react-icons";

export default function MenuDropdown({ deleteUser }) {
  const history = useHistory();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [opened, setOpened] = useState(false);

  const successResponse = ({ deleteAccount = false } = {}) => {
    deleteAccount && deleteUser();
    localStorage.removeItem("token_id");
    history.push("/login");
  };

  const failureResponse = (response) => console.error(response);

  return (
    <>
      <Menu shadow="md" width={200} closeOnItemClick={false}>
        <Menu.Item icon={<IconSettings size={14} />} disabled>
          Settings
        </Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />} disabled>
          Messages
        </Menu.Item>
        <Menu.Item disabled icon={<IconSearch size={14} />}>
          Search
        </Menu.Item>
        <Menu.Item
          onClick={() => toggleColorScheme()}
          icon={
            <ThemeIcon
              variant="outline"
              size={14}
              color={dark ? "yellow" : "blue"}
            >
              {dark ? (
                <SunIcon style={{ width: 10, height: 10 }} />
              ) : (
                <MoonIcon style={{ width: 10, height: 10 }} />
              )}
            </ThemeIcon>
          }
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘J
            </Text>
          }
        >
          {dark ? "Light" : "Dark"} Mode
        </Menu.Item>
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          onLogoutSuccess={successResponse}
          onFailure={failureResponse}
          render={(googleLogout) => (
            <Menu.Item
              onClick={googleLogout.onClick}
              icon={<IconLogout size={14} />}
            >
              Sign out
            </Menu.Item>
          )}
        ></GoogleLogout>
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          onClick={() => setOpened(true)}
          color="red"
          icon={<IconTrash size={14} />}
        >
          Delete my account
        </Menu.Item>
      </Menu>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="md"
        title="Delete confirmation"
        centered
      >
        <Text size="sm">You have selected to delete your account.</Text>
        <Text size="sm">
          If this was the action that you wanted to do, please confirm your
          choice, or cancel and return to the page.
        </Text>
        <Group position="right" mt="xl" pt="md">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onLogoutSuccess={() => successResponse({ deleteAccount: true })}
            onFailure={failureResponse}
            render={(googleLogout) => (
              <Button
                leftIcon={<TrashIcon />}
                variant="filled"
                color="red"
                onClick={googleLogout.onClick}
              >
                Delete
              </Button>
            )}
          ></GoogleLogout>
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}
