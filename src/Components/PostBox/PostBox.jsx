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
  FileButton,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconArticle, IconX, IconPhotoPlus } from "@tabler/icons";
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
  const postbox = useClickOutside(
    () => !text && !cover.src && setOpened(false)
  );

  const [opened, setOpened] = useState(false);
  const [rteOpened, setRteOpened] = useState(false);

  const [text, setText] = useState("");
  const [cover, setCover] = useState({ file: "", src: "", alt: "" });
  const resetRef = useRef(null);

  const handleCoverChange = (file) => {
    setCover({ file, src: URL.createObjectURL(file), alt: file.name });
    setOpened(true);
  };

  const clearCover = () => {
    setCover({});
    resetRef.current?.();
    setOpened(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() && !cover.file) {
      showNotification({
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
              <FileButton
                mt={8}
                resetRef={resetRef}
                onChange={handleCoverChange}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Tooltip
                    label="Cover"
                    position="bottom"
                    gutter={10}
                    withArrow
                    mt={8}
                  >
                    <ActionIcon {...props}>
                      <IconPhotoPlus size={20} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </FileButton>
              <Tooltip
                label="Article"
                position="bottom"
                gutter={10}
                withArrow
                mt={8}
              >
                <ActionIcon onClick={() => setRteOpened(true)} mt={8}>
                  <IconArticle size={20} />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </Group>
        {opened && (
          <>
            {cover.file && (
              <div className={classes.cover}>
                <ActionIcon
                  size="sm"
                  variant="filled"
                  radius="xs"
                  onClick={clearCover}
                  className={classes.clearCover}
                >
                  <IconX size={16} />
                </ActionIcon>
                <Image radius="sm" src={cover.src} alt={cover.alt} />
              </div>
            )}
            <Group mt="md">
              <FileButton
                resetRef={resetRef}
                onChange={handleCoverChange}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Tooltip
                    label="Cover"
                    position="bottom"
                    gutter={10}
                    withArrow
                    mt={8}
                  >
                    <ActionIcon {...props}>
                      <IconPhotoPlus size={20} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </FileButton>
              <Tooltip
                label="Article"
                position="bottom"
                gutter={10}
                withArrow
                mt={8}
              >
                <ActionIcon onClick={() => setRteOpened(true)}>
                  <IconArticle size={20} />
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
