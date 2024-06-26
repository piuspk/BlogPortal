import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { BASE_URL } from "../../../service/api";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

const OuterContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #0d0d30; /* Optional: set a background for the outer container */
  padding: 5px 0; /* Optional: add some padding */
`;

const Component = styled(Box)`
  margin-top: 30px;
  background: #171742;
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
  color: #ffffff; /* Optional: Set the color of the name */
`;

const StyledDate = styled(Typography)`
  font-size: 13px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
  cursor: pointer;
  color: #ffffff; /* Optional: Set the color of the delete icon */
`;

const CommentText = styled(Typography)`
  background: #171742; /* Dark background */
  color: #e0e0e0; /* Light text color */
  padding: 10px;
  border-radius: 4px; /* Optional: rounded corners */
  margin-top: 5px; /* Optional: add some margin between name/date and comment text */
`;

const Image = styled("img")`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px; /* Optional: Add some spacing between the image and name */
`;

const DisplayComment = ({ comment, setToggle }) => {
  // const user = useSelector((state) => state.user.user);
  console.log("comment",comment);
  const [user, setUser] = useState({});

  const removeComment = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/deleteComment/${comment._id}`,
        {
          withCredentials: true,
        }
      );

      setToggle((prev) => !prev);
      console.log("deleting comment successfully!");
    } catch (error) {
      console.log("Error while deleting comment", error);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      console.log("user", comment.userId);
      try {
        const res = await fetch(`${BASE_URL}/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          console.log("userhello", data);
          setUser(data);
        }
      } catch (error) {
        console.log("hello", error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <OuterContainer>
      <Component>
        <Container>
          <Image src={user.PictureUrl} alt="Profile" />
          <Name>{comment.name}</Name>
          <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
          {comment.name === user.username && (
            <DeleteIcon onClick={() => removeComment()} />    
          )}
        </Container>
        <CommentText>{comment.comments}</CommentText>
      </Component>
    </OuterContainer>
  );
};

export default DisplayComment;
