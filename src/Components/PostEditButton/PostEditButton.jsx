import React, { useState } from "react";
import { createStyles, Tooltip, ActionIcon } from "@mantine/core";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Rte from "../Rte";

const useStyles = createStyles(() => ({
  icon: {
    width: 18,
    height: 18,
  },
}));

export default function PostEditButton({ _id, editPost, title, text, cover }) {
  const { classes } = useStyles();

  const [opened, setOpened] = useState(false);

  const handleSubmit = (post) => {
    const { title, text, cover } = post;
    let formData = new FormData();
    if (cover.file) {
      formData.append("photo", cover.file);
    } else if (!cover.src) {
      formData.append("photo", JSON.stringify({ delete: true }));
    }
    // cover.file && formData.append("photo", cover.file);
    formData.append("post", JSON.stringify({ title, text, _id }));
    editPost(formData);
    setOpened(false);
  };

  return (
    <>
      <Tooltip label="Edit" position="bottom" gutter={10} withArrow>
        <ActionIcon onClick={() => setOpened(true)}>
          <Pencil2Icon className={classes.icon} />
        </ActionIcon>
      </Tooltip>

      <Rte
        opened={opened}
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        onSubmit={handleSubmit}
        title={title}
        text={text}
        cover={cover}
      />
    </>
  );
}
