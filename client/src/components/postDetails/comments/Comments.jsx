  import { useState, useEffect } from "react";
  import { Box, TextareaAutosize, Button, styled } from "@mui/material";
  import { useSelector } from "react-redux";
  import { BASE_URL } from "../../../service/api";

  import DisplayComment from "./DisplayComment";
  import axios from "axios";
  import { Person } from "@mui/icons-material";

  const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
  `;

  const Image = styled("img")({
    width: 45,
    height: 45,
    borderRadius: "50%",
    marginLeft:"5px"
  });
  

  const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    background: #10102e; /* Dark background */
    color: #e0e0e0; /* Light text color */
    width: 100%;
    margin: 0 20px;
    border: 1px solid #444444; /* Slightly lighter border */
    padding: 10px;
    resize: vertical; /* Allow vertical resize */
    border-radius: 4px; /* Optional: rounded corners */
    
    &:focus {
      outline: none;
      border-color: #6495ED; /* Optional: change border color on focus */
    }
  `;

  const initialValue = {
    name: "",
    postId: "",
    date: new Date(),
    comments: "",
  };

  const Comments = ({ post }) => {
    console.log("post", post);
    
    const url = "https://static.thenounproject.com/png/12017-200.png";

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/displayComment/${post._id}`,
            {
              withCredentials: true,
            }
          );
          setComments(response.data);
          console.log("comments", comments);
        } catch (error) {
          console.log("Error while fetching comments", error);
        }
      };
      getData();
    }, [toggle, post]);

    const handleChange = (e) => {
      setComment({
        ...comment,
        name: user.username,
        postId: post._id,
        comments: e.target.value,
      });
    };

    const addComment = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/AddNewComment`, comment, {
          withCredentials: true,
        });
        setComment(initialValue);
        setToggle((prev) => !prev);
      } catch (error) {
        console.log("Error while adding comment", error);
      }
    };
    console.log("hello",user);

    return (
      <Box>
        <Container>
         
       
          <Image src={user.PictureUrl} alt="Profile" />
      
          <StyledTextArea
            rowsMin={5}
            placeholder="What's on your mind?"
            onChange={(e) => handleChange(e)}
            value={comment.comments}
          />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{ height: 40 }}
            onClick={(e) => addComment(e)}
          >
            Post
          </Button>
        </Container>
        <Box>
                  {
                      comments && comments.length > 0 && comments.map(comment => (
                          <DisplayComment comment={comment} setToggle={setToggle} />
                      ))
                  }
              </Box>
      </Box>
    );
  };

  export default Comments;
