import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  styled,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  Delete,
  Edit,
  ThumbUp,
  ThumbUpOutlined,
  ArrowDropDown,
} from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../service/api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Comments from "./comments/Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 20px",
  [theme.breakpoints.up("sm")]: {
    margin: "50px auto",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
  marginTop: "-2.5rem",
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

const AuthorContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  align-items: center;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Author = styled(Box)`
  color: #fff;
  margin-left: 20px;
`;

const Description = styled(Typography)`
  word-break: break-word;
  margin-top: 20px;
  margin-left: 20px;
`;

const LikeButton = styled(IconButton)`
  margin-left: 10px;
`;

const LikeContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const CommentsContainer = styled(Box)`
  margin-top: 30px;
`;

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: "10px 0",
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
}));

const DetailView = () => {
  const url =
    "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg";

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
        const post = response.data;
        setPost(post);
        setLikes(post.likes);
        setLiked(post.likedBy.includes(user._id));
        setLikedBy(post.likedBy || []);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchData();
  }, [id, user._id]);

  useEffect(() => {
    if (likedBy.length > 0) {
      fetchUsernames();
    }
  }, [likedBy]);

  const fetchUsernames = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/getUserDetails`, {
        userIds: likedBy,
      });
      const fetchedUsernames = response.data.map((user) => user.username);
      setUsernames(fetchedUsernames);
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

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
      <AuthorContainer>
        <Author>
          <Link
            to={`/?username=${post.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography>
              Author: <span style={{ fontWeight: 700 }}>{post.username}</span>
            </Typography>
          </Link>
        </Author>
        <Box>
          <Typography>{new Date(post.createdDate).toDateString()}</Typography>
          <LikeContainer>
            <LikeButton onClick={toggleLike} color="primary">
              {liked ? <ThumbUp /> : <ThumbUpOutlined />}
            </LikeButton>
            <Typography>{likes}</Typography>
            <LikeButton onClick={handleLikeButtonClick} color="primary">
              <ArrowDropDown />
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
          </LikeContainer>
        </Box>
      </AuthorContainer>
      <Description>{post.description}</Description>
      <CommentsContainer>
        <Comments post={post} />
      </CommentsContainer>
      <ToastContainer />
    </Container>
  );
};

export default DetailView;
