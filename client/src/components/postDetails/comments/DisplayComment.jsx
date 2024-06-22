import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { BASE_URL } from "../../../service/api";
import { useSelector } from "react-redux";
import axios from "axios";

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
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const StyledDate = styled(Typography)`
  font-size: 13px;
  color: #878787;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
  cursor: pointer;
`;

const CommentText = styled(Typography)`
  background: #171742; /* Dark background */
  color: #e0e0e0; /* Light text color */
  padding: 10px;
  border-radius: 4px; /* Optional: rounded corners */
`;

const DisplayComment = ({ comment, setToggle }) => {
  const user = useSelector((state) => state.user.user);

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

  return (
    <OuterContainer>
      <Component>
        <Container>
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
