import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../service/api";

const Comp = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);
`;

const ResetButton = styled(Button)`
  text-transform: none;
  background-color: #d96ee7;
  border-radius: 7px;
  width: 50%;
  height: 45px;
  &:hover {
    background-color: #c907e2;
  }
`;

const Typo = styled(Typography)`
  font-size: 14px;
  color: #000;
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
`;

const Wrapp = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div,
  & > button {
    margin-top: 20px;
  }
`;
const Text = styled(Typography)`
  text-align: center;
`;

const NewPassword = () => {
  const email = localStorage.getItem("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const chk = location.state ? location.state.chk : null;
  const navigate = useNavigate();
  const [input, setInput] = useState({
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const reset = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!input.password || !input.confirm_password) {
      toast.error("All fields are required!");
      setIsSubmitting(false);
      return;
    }

    if (input.password !== input.confirm_password) {
      toast.error("Passwords must match!");
      setIsSubmitting(false);
      return;
    }

    const data = { email, password: input.password };

    try {
      await axios.post(`${BASE_URL}/user/newpassword`, data, {
        withCredentials: true,
      });
      toast.success("Password Reset Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error("Password Reset Failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Comp>
      <Box>
        <Text variant="h3">Reset Password</Text>
        <Typo variant="body1">
          Enter your new password and confirm it.
        </Typo>
        <Wrapp component="form" onSubmit={reset}>
          <TextField
            sx={{ width: "100%" }}
            type="password"
            name="password"
            onChange={handleInputChange}
            variant="standard"
            label="Enter new password"
            required
          />
          <TextField
            sx={{ width: "100%" }}
            type="password"
            name="confirm_password"
            onChange={handleInputChange}
            variant="standard"
            label="Confirm new password"
            required
          />
          <ResetButton
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </ResetButton>
        </Wrapp>
      </Box>
      <ToastContainer />
    </Comp>
  );
};

export default NewPassword;
