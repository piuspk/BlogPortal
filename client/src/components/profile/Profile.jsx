import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase"; // Adjust the import path as necessary
import { BASE_URL } from "../../service/api"; // Adjust the import path as necessary
import { setUser } from "../../redux/user/userSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = () => {
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [apiError, setApiError] = useState(null); // State to store API error messages
  const { user } = useSelector((state) => state.user);
  const [successMessage, setSuccessMessage] = useState(null); 
  const handleLogout = async () => {
    window.open(`${BASE_URL}/api/users/logout`, "_self");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setImageFileUploadError(null);
        setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageFileUploadError("Image upload failed");
            setImageFileUploadProgress(0);
            setImageFileUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setFormData({ ...formData, PictureUrl: downloadURL });
              setImageFileUploadProgress(0);
              setImageFileUrl(downloadURL);
              setImageFileUploading(false);
            });
          }
        );
      } catch (error) {
        setImageFileUploadError("Image upload failed");
        setImageFileUploadProgress(0);
        setImageFileUploading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null); // Reset API error before making the request
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${user._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      dispatch(setUser(response.data));
      setSuccessMessage("Update successful!");
      setApiError(null);
    } catch (error) {
      setLoading(false);
      setSuccessMessage(null);
      setApiError(
        error.response?.data?.message ||
          "An error occurred while updating the profile"
      ); // Set the error message
    }
  };

  return (
    <Box
      sx={{ maxWidth: "lg", mx: "auto", p: 3, width: "100%", color: "white" }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        fontWeight="fontWeightBold"
        my={7}
      >
        Profile
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <Box
          sx={{
            position: "relative",
            width: 128,
            height: 128,
            cursor: "pointer",
            boxShadow: 1,
            overflow: "hidden",
            borderRadius: "50%",
            mx: "auto",
          }}
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploading && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={8}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
                text: {
                  fill: "#fff", // Color of the percentage text
                },
              }}
            />
          )}
          <Box
            component="img"
            src={imageFileUrl || user.PictureUrl}
            alt="user"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              border: 3,

              transition: "transform 300ms",
              "&:hover": {
                transform: "scale(1.05)",
              },
              opacity: imageFileUploading ? 0.6 : 1,
            }}
          />
        </Box>
        {imageFileUploadError && (
          <Alert
            severity="error"
            sx={{ height: 48, display: "flex", justifyContent: "center" }}
          >
            {imageFileUploadError}
          </Alert>
        )}
        <TextField
          type="text"
          id="username"
          label="Username"
          defaultValue={user.username}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              backgroundColor: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
            },
          }}
        />
        <TextField
          type="email"
          id="email"
          label="Email"
          defaultValue={user.email}
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              backgroundColor: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
            },
          }}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          placeholder="password"
          onChange={handleChange}
          fullWidth
          InputProps={{
            sx: {
              color: "white",
              backgroundColor: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "white",
            },
          }}
        />
        {apiError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {apiError}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={loading || imageFileUploading}
          sx={{
            background: "linear-gradient(to right, purple, blue)",
            color: "white",
            "&:disabled": {
              background: "grey",
            },
          }}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              background: "linear-gradient(to right, purple, pink)",
              color: "white",
            }}
          >
            Create a post
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          color: "red",
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Typography component="span" sx={{ cursor: "pointer" }}>
          Delete Account
        </Typography>
        <Typography
          component="span"
          onClick={handleLogout}
          sx={{ cursor: "pointer" }}
        >
          Sign Out
        </Typography>
      </Box>
    </Box>
  );
};

export default Profile;
