import React, { useState } from "react";
import { Text, Group, Tooltip, ActionIcon, Modal, Button } from "@mantine/core";
import { IconTrashX } from "@tabler/icons";

export default function PostDeleteButton({ _id, deletePost }) {
  const [opened, setOpened] = useState(false);

  const handleDelete = (_id, deletePost) => {
    let formData = new FormData();
    formData.append("post", JSON.stringify({ _id }));
    deletePost(formData);
  };

  return (
    <>
      <Tooltip label="Delete" position="bottom" gutter={10} withArrow>
        <ActionIcon color="red" onClick={() => setOpened(true)}>
          <IconTrashX size={20} />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="md"
        title="Delete confirmation"
        centered
      >
        <Text size="sm">You have selected to delete this post.</Text>
        <Text size="sm">
          If this was the action that you wanted to do, please confirm your
          choice, or cancel and return to the page.
        </Text>
        <Group position="right" mt="xl" pt="md">
          <Button
            leftIcon={<IconTrashX size={16} />}
            variant="filled"
            color="red"
            onClick={() => handleDelete(_id, deletePost)}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}
