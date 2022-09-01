import React, { useRef, useState, useEffect } from "react";
import {
  Group,
  createStyles,
  Textarea,
  Tooltip,
  Button,
  ActionIcon,
  Modal,
  Image,
  Text,
  Popover,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { RichTextEditor } from "@mantine/rte";
import { CameraIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./rte.scss";

const useStyles = createStyles(() => ({
  label: {
    display: "none",
  },

  icon: {
    width: 18,
    height: 18,
  },

  formRTE: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
}));

export default function Rte({
  opened,
  onOpen,
  onClose,
  onSubmit,
  title,
  text,
  cover,
}) {
  const notifications = useNotifications();

  const { classes } = useStyles();

  const fileInputRTE = useRef();

  const [titleRTE, setTitleRTE] = useState("");
  const [textRTE, setTextRTE] = useState("");
  const [coverRTE, setCoverRTE] = useState({ file: "", src: "", alt: "" });

  const [popover, setPopover] = useState(false);

  useEffect(() => {
    if (opened) {
      title && setTitleRTE(title);
      text && setTextRTE(text);
      cover && setCoverRTE(cover);
      onOpen();
    }
  }, [opened, onOpen, title, text, cover]);

  const handleCoverRTEChange = (e) => {
    const [file] = e.target.files;
    if (file) {
      setCoverRTE({ file, src: URL.createObjectURL(file), alt: file.name });
    }
  };

  const clearCoverRTE = () => {
    fileInputRTE.current.value = "";
    setCoverRTE({});
  };

  const handleSubmitRTE = (e) => {
    e.preventDefault();

    if (
      !titleRTE &&
      !textRTE.replace(/<[^>]*>?/gm, "").trim() &&
      !coverRTE.src
    ) {
      notifications.showNotification({
        title: `If you wish to be a writer,`,
        message: "Write",
        color: "red",
      });
      return;
    }

    onSubmit({ cover: coverRTE, title: titleRTE, text: textRTE });
    setTitleRTE("");
    setTextRTE("");
    setCoverRTE({});
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="xl"
      title="Here you can write as much as you want"
      styles={{
        modal: {
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <form
        className={classes.formRTE}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitRTE}
      >
        <Textarea
          mb="md"
          autosize
          required
          variant="default"
          placeholder="And not worry about wasting paper"
          value={titleRTE}
          onChange={(e) => setTitleRTE(e.target.value)}
        />
        <RichTextEditor
          value={textRTE}
          onChange={(value) => {
            setTextRTE(
              value
                .replace(/^(<p><br><\/p>)+/, "")
                .replace(/(<p><br><\/p>)+$/, "")
            );
          }}
          classNames={{ root: "rte" }}
        />
        <Group mt="sm" noWrap>
          <Tooltip
            label={cover ? "Change cover" : "Cover"}
            position="bottom"
            gutter={10}
            withArrow
          >
            <ActionIcon onClick={() => fileInputRTE.current.click()}>
              <CameraIcon className={classes.icon} />
            </ActionIcon>
            <label className={classes.label}>
              <input
                ref={fileInputRTE}
                accept="image/*"
                type="file"
                onChange={handleCoverRTEChange}
              />
            </label>
          </Tooltip>
          {coverRTE.src && (
            <>
              <Popover
                position="top"
                placement="center"
                spacing="xs"
                width={320}
                opened={popover}
                onClose={() => setPopover(false)}
                target={
                  <Image
                    onMouseEnter={() => setPopover(true)}
                    onMouseLeave={() => setPopover(false)}
                    radius="sm"
                    width={20}
                    height={20}
                    src={coverRTE.src}
                    alt={coverRTE.alt}
                  />
                }
              >
                <Image radius="sm" src={coverRTE.src} alt={coverRTE.alt} />
              </Popover>
              <Text lineClamp={1} size="xs">
                {coverRTE.alt}
              </Text>
              {/* {!cover && ( */}
              <ActionIcon onClick={clearCoverRTE}>
                <Cross2Icon className={classes.icon} />
              </ActionIcon>
              {/* )} */}
            </>
          )}
          <Button
            type="submit"
            ml="auto"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Publish
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
