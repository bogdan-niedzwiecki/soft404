import React, { useState } from "react";
import { Text, Group, Menu, ActionIcon, Modal, Button } from "@mantine/core";
import { IconTrashX, IconDots, IconEdit } from "@tabler/icons";
import Rte from "../Rte";

export default function PostDropdown({
  _id,
  title,
  text,
  thumbnail,
  editPost,
  deletePost,
}) {
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  const handleEdit = (post) => {
    const { title, text, cover } = post;
    let formData = new FormData();

    if (cover.file) {
      formData.append("photo", cover.file);
    } else if (!cover.src) {
      formData.append("photo", JSON.stringify({ delete: true }));
    }

    formData.append("post", JSON.stringify({ title, text, _id }));
    editPost(formData);
    setEditOpened(false);
  };

  const handleDelete = (_id, deletePost) => {
    let formData = new FormData();
    formData.append("post", JSON.stringify({ _id }));
    deletePost(formData);
  };

  return (
    <>
      <Menu shadow="md" position="bottom-end" width={200}>
        <Menu.Target>
          <ActionIcon>
            <IconDots size={20} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={() => setEditOpened(true)}
            icon={<IconEdit size={20} />}
          >
            Edit post
          </Menu.Item>
          <Menu.Item
            onClick={() => setDeleteOpened(true)}
            color="red"
            icon={<IconTrashX size={20} />}
          >
            Delete post
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={deleteOpened}
        onClose={() => setDeleteOpened(false)}
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
          <Button variant="outline" onClick={() => setDeleteOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Rte
        opened={editOpened}
        onOpen={() => setEditOpened(true)}
        onClose={() => setEditOpened(false)}
        onSubmit={handleEdit}
        title={title}
        text={text}
        cover={thumbnail}
      />
    </>
  );
}
