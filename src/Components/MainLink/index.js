import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeIcon, UnstyledButton, Group, Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
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

export default function MainLink({ icon, color, label, to }) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.button} component={Link} to={to}>
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}