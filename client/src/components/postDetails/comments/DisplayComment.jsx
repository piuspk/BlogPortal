import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { BASE_URL } from "../../../service/api";
import { useSelector } from "react-redux";
import axios from "axios";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
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

const DisplayComment = ({ comment, setToggle }) => {
  const user = useSelector((state) => state.user.user);
  console.log("khushi", comment._id);

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
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === user.username && (
          <DeleteIcon onClick={() => removeComment()} />
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default DisplayComment;
