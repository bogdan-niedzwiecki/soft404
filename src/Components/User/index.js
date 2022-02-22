import React from 'react';
import { UnstyledButton, Group, Avatar, Text, createStyles } from '@mantine/core';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

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
            <ChevronRightIcon width={18} height={18} />
          ) : (
            <ChevronLeftIcon width={18} height={18} />
          )}
        </Group>
      </UnstyledButton>
    </div>
  );
}