import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../service/api";

const Comp = styled(Box)`
  width: 400px;
  margin: auto;
   background-color: #ebe4ed;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.4);
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #d96ee7;
  border-radius: 7px;
  width: 50%;
  height: 45px;
  &:hover {
    background-color: #c907e2;
  }
`;

const Text = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
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

const Email = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("Form submitted");

    if (!input.email) {
      toast.error("All fields are required!");
      console.log("Email field is empty");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Sending OTP request");
      await axios.post(`${BASE_URL}/user/sendotppassword`, input, {
        withCredentials: true,
      });
      toast.success("OTP Sent");
      console.log("OTP sent successfully");

      setTimeout(() => {
        navigate("/otpforget", { state: input });
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log("Error sending OTP", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Comp>
      <Box>
        <Text style ={{color:"black"}}variant="h3">Forgot Password</Text>
        <Typo variant="body1">
          Enter your email & we'll send you an OTP for verification.
        </Typo>
        <form onSubmit={handleSubmit}>
          <Wrapp>
            <TextField
              sx={{ width: "100%" }}
              onChange={handleInputChange}
              value={input.email}
              variant="standard"
              name="email"
              label="Enter email"
            />
            <LoginButton type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"}
            </LoginButton>
          </Wrapp>
        </form>
      </Box>
      <ToastContainer />
    </Comp>
  );
};

export default Email;
