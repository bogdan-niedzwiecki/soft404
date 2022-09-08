import React, { useState } from "react";
import { Tooltip, ActionIcon } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import Rte from "../Rte";

export default function PostEditButton({ _id, editPost, title, text, cover }) {
  const [opened, setOpened] = useState(false);

  const handleSubmit = (post) => {
    const { title, text, cover } = post;
    let formData = new FormData();

    if (cover.file) {
      formData.append("photo", cover.file);
    } else if (!cover.src) {
      formData.append("photo", JSON.stringify({ delete: true }));
    }

    formData.append("post", JSON.stringify({ title, text, _id }));
    editPost(formData);
    setOpened(false);
  };

  return (
    <>
      <Tooltip label="Edit" position="bottom" gutter={10} withArrow>
        <ActionIcon onClick={() => setOpened(true)}>
          <IconEdit size={20} />
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
