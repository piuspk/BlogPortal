import { useEffect, useState } from "react";
import { BASE_URL } from "../../../service/api";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import Post from "./DisplaysPost";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  console.log("category",category)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/get`, {
          params: {
            category: category || '',
          },
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {posts.length ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12} key={post._id}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
         { `No data is available for the ${category} category` }
        </Box>
      )}
    </>
  );
};

export default Posts;
