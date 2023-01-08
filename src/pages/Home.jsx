import React from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";

import { fetchPosts } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <Box
      sx={{
        margin: "auto",
        flexDirection: "column",
        maxWidth: "md",
      }}
    >
      {(isPostsLoading ? [...Array(5)] : posts.items)
        .map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:3500${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt.slice(0, 10)}
              isEditable={userData?._id === obj.user._id}
            />
          )
        )
        .reverse()}
    </Box>
  );
};
