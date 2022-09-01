import React, { useRef, useState } from "react";
import {
  Group,
  createStyles,
  Textarea,
  Avatar,
  Tooltip,
  Button,
  Paper,
  ActionIcon,
  Image,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useNotifications } from "@mantine/notifications";
import { CameraIcon, FileTextIcon, Cross2Icon } from "@radix-ui/react-icons";
import Rte from "../Rte";

const useStyles = createStyles((theme) => ({
  postbox: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    boxShadow: `-16px 0px 0px 16px ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }, 16px 0px 0px 16px ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    } `,
  },

  label: {
    display: "none",
  },

  icon: {
    width: 18,
    height: 18,
  },

  grow: {
    flexGrow: 1,
  },

  cover: {
    maxWidth: 240,
    marginTop: 15,
    position: "relative",
  },

  clearCover: {
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
}));

export default function PostBox({ user, addPost }) {
  const { classes } = useStyles();
  const postbox = useClickOutside(() => !rteOpened && setOpened(false));
  const notifications = useNotifications();

  const fileInput = useRef();

  const [opened, setOpened] = useState(false);
  const [rteOpened, setRteOpened] = useState(false);

  const [text, setText] = useState("");
  const [cover, setCover] = useState({ file: "", src: "", alt: "" });

  const handleCoverChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setCover({ file, src: URL.createObjectURL(file), alt: file.name });
      setOpened(true);
    }
  };

  const clearCover = () => {
    fileInput.current.value = "";
    setCover({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() && !cover.file) {
      notifications.showNotification({
        title: `If you wish to be a writer,`,
        message: "Write",
        color: "red",
      });
      return;
    }

    postFormData("", text, cover);

    setOpened(false);
    setText("");
    setCover({});
  };

  const handleRTESubmit = (post) => {
    const { title, text, cover } = post;
    postFormData(title, text, cover);
    setRteOpened(false);
  };

  const postFormData = (title, text, cover) => {
    let formData = new FormData();
    formData.append("cover", cover.file);
    formData.append("post", JSON.stringify({ title, text }));
    addPost(formData);
  };

  return (
    <Paper className={classes.postbox} mt="md" p="md" ref={postbox}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Group align="top">
          <Avatar
            src={user.picture}
            radius="xl"
            size="sm"
            alt="User avatar"
            mt={8}
          />
          <Textarea
            className={classes.grow}
            variant="unstyled"
            placeholder="What's new ?"
            required
            autosize
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setOpened(true)}
          />
          {!opened && (
            <>
              <Tooltip
                label="Cover"
                position="bottom"
                gutter={10}
                withArrow
                mt={8}
              >
                <ActionIcon onClick={() => fileInput.current.click()}>
                  <CameraIcon className={classes.icon} />
                </ActionIcon>
                <label className={classes.label} ref={fileInput}>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleCoverChange}
                  />
                </label>
              </Tooltip>
              <Tooltip
                label="Article"
                position="bottom"
                gutter={10}
                withArrow
                mt={8}
              >
                <ActionIcon onClick={() => setRteOpened(true)}>
                  <FileTextIcon className={classes.icon} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
        {opened && (
          <>
            {/* <Textarea
              mt="md"
              placeholder="Tell us more..."
              required
              autosize
              value={text}
              onChange={(e) => setText(e.target.value)}
            /> */}
            {cover.file && (
              <div className={classes.cover}>
                <ActionIcon
                  radius="xs"
                  variant="filled"
                  onClick={clearCover}
                  className={classes.clearCover}
                >
                  <Cross2Icon className={classes.icon} />
                </ActionIcon>
                <Image radius="sm" src={cover.src} alt={cover.alt} />
              </div>
            )}
            <Group mt="md">
              <Tooltip label="Cover" position="bottom" gutter={10} withArrow>
                <ActionIcon onClick={() => fileInput.current.click()}>
                  <CameraIcon className={classes.icon} />
                </ActionIcon>
                <label className={classes.label}>
                  <input
                    ref={fileInput}
                    accept="image/*"
                    type="file"
                    onChange={handleCoverChange}
                  />
                </label>
              </Tooltip>
              <Tooltip label="Article" position="bottom" gutter={10} withArrow>
                <ActionIcon onClick={() => setRteOpened(true)}>
                  <FileTextIcon className={classes.icon} />
                </ActionIcon>
              </Tooltip>
              <Button
                type="submit"
                ml="auto"
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
              >
                Post
              </Button>
            </Group>
          </>
        )}
      </form>
      <Rte
        opened={rteOpened}
        onOpen={() => setOpened(false)}
        onClose={() => setRteOpened(false)}
        onSubmit={handleRTESubmit}
      />
    </Paper>
  );
}
