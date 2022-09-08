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
  FileButton
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { RichTextEditor } from "@mantine/rte";
import { IconX, IconPhotoPlus } from "@tabler/icons";
import "./rte.scss";

const useStyles = createStyles(() => ({
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

  const { classes } = useStyles();

  const [titleRTE, setTitleRTE] = useState("");
  const [textRTE, setTextRTE] = useState("");
  const [popover, setPopover] = useState(false);
  const [coverRTE, setCoverRTE] = useState({ file: "", src: "", alt: "" });
  const resetRef = useRef(null);

  useEffect(() => {
    if (opened) {
      title && setTitleRTE(title);
      text && setTextRTE(text);
      cover && setCoverRTE(cover);
      onOpen();
    }
  }, [opened, onOpen, title, text, cover]);

  const handleCoverRTEChange = (file) => {
    setCoverRTE({ file, src: URL.createObjectURL(file), alt: file.name });
  };

  const clearCoverRTE = () => {
    setCoverRTE({});
    resetRef.current?.();
  };

  const handleSubmitRTE = (e) => {
    e.preventDefault();

    if (
      !titleRTE &&
      !textRTE.replace(/<[^>]*>?/gm, "").trim() &&
      !coverRTE.src
    ) {
      showNotification({
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
          <FileButton

            resetRef={resetRef}
            onChange={handleCoverRTEChange}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Tooltip
                label={cover ? "Change cover" : "Cover"}
                position="bottom"
                gutter={10}
                withArrow
              >
                <ActionIcon {...props}>
                  <IconPhotoPlus size={20} />
                </ActionIcon>
              </Tooltip>
            )}
          </FileButton>
          {coverRTE.src && (
            <>
              <Popover
                position="top"
                placement="center"
                spacing="xs"
                width={320}
                opened={popover}
                onClose={() => setPopover(false)}
              >
                <Popover.Target>
                  <Image
                    onMouseEnter={() => setPopover(true)}
                    onMouseLeave={() => setPopover(false)}
                    radius="sm"
                    width={20}
                    height={20}
                    src={coverRTE.src}
                    alt={coverRTE.alt}
                  />
                </Popover.Target>
                <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                  <Image radius="sm" src={coverRTE.src} alt={coverRTE.alt} />
                </Popover.Dropdown>
              </Popover>
              <Text lineClamp={1} size="xs">
                {coverRTE.alt}
              </Text>
              <ActionIcon onClick={clearCoverRTE}>
                <IconX size={16} />
              </ActionIcon>
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
