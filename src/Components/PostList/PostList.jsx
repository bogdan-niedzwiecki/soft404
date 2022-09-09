import React from "react";
import PostItem from "../PostItem";
import { Helmet } from "react-helmet";

import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  postlist: {
    listStyleType: "none",
    margin: "15px 0",
    padding: 0,
  },
}));

export default function PostList({ posts }) {
  const { classes } = useStyles();

  return (
    <>
      <Helmet>
        <title>News</title>
      </Helmet>
      {posts?.length ? (
        <ul className={classes.postlist}>
          {posts.map((post) => (
            <li key={post._id}>
              <PostItem
                _id={post._id}
                given_name={post.given_name}
                family_name={post.family_name}
                picture={post.picture}
                publish_date={post.publish_date}
                title={post.title}
                text={post.text}
                thumbnail={post.thumbnail}
                isUserPost={post.isUserPost}
              />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}
