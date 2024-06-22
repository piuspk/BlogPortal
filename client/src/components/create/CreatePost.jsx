import React, { useState, useEffect } from "react";
import {
  styled,
  Box,
  TextareaAutosize,
  Button,
  InputBase,
  FormControl,
  Alert,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../service/api";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase"; // Adjust the import path as necessary
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import the required CSS

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
  align-items: center;
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

const ProgressContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const Ad = styled(Add)`
  cursor: pointer;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.2);
  }
`;

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  console.log("user",user)
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const url = post.picture
    ? post.picture
    : "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        try {
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + "-" + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageUploadError("Image upload failed");
              setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setPost((prevPost) => ({ ...prevPost, picture: downloadURL }));
              });
            }
          );
        } catch (error) {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
          console.log(error);
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

  const savePost = async () => {
    try {
      await axios.post(`${BASE_URL}/posts/create`, post, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
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
          <Ad fontSize="large" color="action" />
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
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={savePost}
            disabled={imageUploadProgress !== null}
          >
            Publish
          </Button>
          {imageUploadProgress !== null && (
            <div style={{ width: 50, height: 50, marginLeft: 10 }}>
              <CircularProgressbar
                value={imageUploadProgress}
                text={`${imageUploadProgress}%`}
                styles={buildStyles({
                  textSize: '30px',
                  pathColor: '#3f51b5',
                  textColor: '#3f51b5',
                })}
              />
            </div>
          )}
        </div>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name="description"
        onChange={handleChange}
      />

      {imageUploadError && (
        <div className="mt-4">
          <Alert severity="error">{imageUploadError}</Alert>
        </div>
      )}
    </Container>
  );
};

export default CreatePost;
