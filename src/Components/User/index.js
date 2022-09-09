import React from 'react';
import { Link } from 'react-router-dom';
import { UnstyledButton, Group, Avatar, Text, createStyles } from '@mantine/core';
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: 'inherit',
    },
  },
}));

export default function User({ avatar, name, email, to }) {
  const { classes, theme } = useStyles();

  return (
    <div
      style={{
        paddingBottom: theme.spacing.sm,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <UnstyledButton className={classes.user} component={Link} to={to}>
        <Group>
          <Avatar
            src={avatar}
            radius="xl"
          />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {theme.dir === 'ltr' ? (
            <IconChevronRight size={16} />
          ) : (
            <IconChevronLeft size={16} />
          )}
        </Group>
      </UnstyledButton>
    </div>
  );
}