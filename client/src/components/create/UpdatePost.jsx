import React, { useState, useEffect } from "react";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../service/api";
import { toast } from "react-toastify";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const UpdatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await axios.post(`${BASE_URL}/image/upload`, data, {
            withCredentials: true,
          });
          setPost((prevPost) => ({ ...prevPost, picture: response.data }));
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file");
        }
      }
    };
    getImage();
    setPost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split("=")[1] || "All",
      username: user.username,
    }));
  }, [file]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getPostsById/${id}`, {
          withCredentials: true,
        });
        console.log("Fetched post:", response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [id]);

  const updatePost = async () => {
    console.log("hfhbfhjsbf");
    try {
      await axios.put(`${BASE_URL}/updatePost/${id}`, post, {
        withCredentials: true,
      });
      navigate(`/details/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error saving post");
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={post.title}
        />
        <Button variant="contained" color="primary" onClick={updatePost}>
          Update
        </Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name="description"
        onChange={handleChange}
        value={post.description}
      />
    </Container>
  );
};

export default UpdatePost;

