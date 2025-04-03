import React, { useState } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Avatar,
  Modal,
  createStyles,
} from "@mantine/core";
import PostDropdown from "../PostDropdown";

const useStyles = createStyles((theme) => ({
  post: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[1],
    position: "unset"
  },
}));

export default function PostItem({
  _id,
  given_name,
  family_name,
  picture,
  title,
  thumbnail,
  text,
  publish_date,
  isUserPost,
}) {
  const { classes } = useStyles();

  const [postOpened, setPostOpened] = useState(false);

  const transformDate = (publish_date) => {
    const date = new Date(publish_date);
    const DMY = date.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const HM = date.toLocaleString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${DMY} at ${HM}`;
  };

  return (
    <>
      <Card className={classes.post} mb="md" pb={0}>
        <Card.Section p="md" pb="0">
          <Group>
            <Avatar src={picture} radius="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500} >
                {given_name} {family_name}
              </Text>
              <Text color="dimmed" size="xs">
                {transformDate(publish_date)}
              </Text>
            </div>
            {isUserPost && (
              <PostDropdown
                _id={_id}
                title={title}
                text={text}
                thumbnail={thumbnail}
              />
            )}
          </Group>
        </Card.Section>
        <Card.Section
          p="md"
          sx={() => ({
            cursor: "pointer",
          })}
          onClick={() => setPostOpened(true)}
        >
          {title && (
            <Text size="xl" weight={600} lineClamp={3} mb="md">
              {title}
            </Text>
          )}
          {text && (
            <Text lineClamp={5} mb="md">
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </Text>
          )}
          {thumbnail.src && (
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              mb="md"
            />
          )}
        </Card.Section>
      </Card>

      <Modal
        opened={postOpened}
        onClose={() => setPostOpened(false)}
        size="xl"
        centered
        styles={{
          modal: { paddingBottom: "4px !important" },
          title: { flexGrow: 1 },
        }}
        trapFocus={false}
        title={
          <Group>
            <Avatar src={picture} radius="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {given_name} {family_name}
              </Text>
              <Text color="dimmed" size="xs">
                {transformDate(publish_date)}
              </Text>
            </div>
            {isUserPost && (
              <PostDropdown
                _id={_id}
                title={title}
                text={text}
                thumbnail={thumbnail}
              />
            )}
          </Group>
        }
      >
        {title && (
          <Text size="xl" weight={600} lineClamp={3} mb="md">
            {title}
          </Text>
        )}
        {text && (
          <Text lineClamp={5} mb="md">
            <div dangerouslySetInnerHTML={{ __html: text }} />
          </Text>
        )}
        {thumbnail.src && (
          <Image src={thumbnail.src} height={360} alt={thumbnail.alt} mb="md" />
        )}
      </Modal>
    </>
  );
}
