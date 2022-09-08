import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import {
  Menu,
  Text,
  useMantineColorScheme,
  Group,
  Modal,
  Button,
  Avatar,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  IconSettings,
  IconSearch,
  IconMessageCircle,
  IconTrashX,
  IconLogout,
  IconChevronDown,
  IconSunLow,
  IconMoon,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  menu: {
    alignSelf: "stretch",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  menuOpened: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export default function MenuDropdown({
  picture,
  family_name,
  given_name,
  deleteUser,
}) {
  const { classes, cx } = useStyles();
  const history = useHistory();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [menuOpened, setMenuOpened] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const successResponse = ({ deleteAccount = false } = {}) => {
    deleteAccount && deleteUser();
    localStorage.removeItem("token_id");
    history.push("/login");
  };

  const failureResponse = (response) => console.error(response);

  return (
    <>
      <Menu
        shadow="md"
        position="bottom-end"
        offset={0}
        width={200}
        closeOnItemClick={false}
        opened={menuOpened}
        onOpen={() => setMenuOpened(true)}
        onClose={() => setMenuOpened(false)}
      >
        <Menu.Target>
          <UnstyledButton
            className={cx(classes.menu, { [classes.menuOpened]: menuOpened })}
            p="sm"
          >
            <Group>
              <Avatar
                size="sm"
                radius="xl"
                src={picture}
                alt={`${given_name} ${family_name}`}
              />
              <IconChevronDown size={16} color="grey" />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={16} />} disabled>
            Settings
          </Menu.Item>
          <Menu.Item icon={<IconMessageCircle size={16} />} disabled>
            Messages
          </Menu.Item>
          <Menu.Item disabled icon={<IconSearch size={16} />}>
            Search
          </Menu.Item>
          <Menu.Item
            onClick={() => toggleColorScheme()}
            icon={
              dark ? (
                <IconSunLow size={16} color="yellow" />
              ) : (
                <IconMoon size={16} color="dodgerblue" />
              )
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
                icon={<IconLogout size={16} color="grey" />}
              >
                Sign out
              </Menu.Item>
            )}
          ></GoogleLogout>
          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            onClick={() => setModalOpened(true)}
            color="red"
            icon={<IconTrashX size={16} />}
          >
            Delete my account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
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
                leftIcon={<IconTrashX size={16} />}
                variant="filled"
                color="red"
                onClick={googleLogout.onClick}
              >
                Delete
              </Button>
            )}
          ></GoogleLogout>
          <Button variant="outline" onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}
