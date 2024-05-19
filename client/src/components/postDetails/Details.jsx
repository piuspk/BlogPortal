import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, Edit, ThumbUp, ThumbUpOutlined, ArrowDropDown } from "@mui/icons-material"; // Import ArrowDropDown icon
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Comments from "./comments/Comments";

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

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.2);
  }
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.2);
  }
`;

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Description = styled(Typography)`
  word-break: break-word;
`;

const LikeButton = styled(IconButton)`
  margin-left: 10px;
`;

const DetailView = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likedBy, setLikedBy] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getPostsById/${id}`, {
          withCredentials: true,
        });
        setPost(response.data);
        setLikes(response.data.likes);
        setLiked(response.data.likedBy.includes(user._id));
        setLikedBy(response.data.likedBy || []);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [id, user._id]);

  useEffect(() => {
    fetchUsernames();
  }, [likedBy]);

  const deleteBlog = async () => {
    try {
      await axios.delete(`${BASE_URL}/deletePost/${id}`, {
        withCredentials: true,
      });
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  const toggleLike = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts/toggleLike/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLikes(response.data.likes);
      setLiked(!liked);
      setLikedBy(response.data.likedBy || []);
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Error toggling like");
    }
  };

  const fetchUsernames = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/getUserDetails`, {
        userIds: likedBy,
      });
      const usernames = response.data.map((user) => user.username);
      setUsernames(usernames);
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

  const handleLikeButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Image src={post.picture || url} alt="post" />
      <Box style={{ float: "right" }}>
        {user.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={deleteBlog} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>
      <Author>
        <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>
            Author: <span style={{ fontWeight: 700 }}>{post.username}</span>
          </Typography>
        </Link>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>
      <Box display="flex" alignItems="center">
        <Description>{post.description}</Description>
        <LikeButton onClick={toggleLike} color="primary">
          {liked ? <ThumbUp /> : <ThumbUpOutlined />}
        </LikeButton>
        <Typography>{likes}</Typography>
        <LikeButton onClick={handleLikeButtonClick} color="primary">
          <ArrowDropDown /> {/* Add ArrowDropDown icon */}
        </LikeButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {usernames.length > 0 ? (
            usernames.map((username) => (
              <MenuItem key={username}>{username}</MenuItem>
            ))
          ) : (
            <MenuItem>No likes yet</MenuItem>
          )}
        </Menu>
      </Box>
      <Comments post={post} />
      <ToastContainer />
    </Container>
  );
};

export default DetailView;
