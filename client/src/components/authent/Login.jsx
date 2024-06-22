import React, { useState } from "react";
import { Box, TextField, Button, styled, Typography, Link } from "@mui/material";
import blogimg from "../../assets/blog.png";
import axios from "axios";
import { setUser } from '../../redux/user/userSlice';
import { BASE_URL } from "../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom"; 

const Comp = styled(Box)`
  width: 400px;
  margin: auto;
  background-color: #ebe4ed;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  paddingTop: "55px",
});

const Wrapp = styled(Box)`
  padding: 25px 35px;
  display: flex;
  display: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background-color: #d96ee7;
  border-radius: 7px;
  height: 45px;
  &:hover {
    background-color: #c907e2;
  }
`;

const Signup = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const ForgotPasswordLink = styled(Link)`
  color: #31363F;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: light;
`;

const Login = () => {
  const Navigate = useNavigate();
  const signupInitialValues = {
    name: "",
    username: "",
    email:"",
    password: "",
  };
  const loginInitialValues = {
    username: '',
    password: ''
  };

  const dispatch = useDispatch();

  const [account, setAccount] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");
  const [signup, setSignup] = useState(signupInitialValues);

  const toggle = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  const registration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/signup`, signup, {
        withCredentials: true,
      });
      console.log("Registration successful");
      setSignup(signupInitialValues);
      showError("");
      setTimeout(() => {
        setAccount("login");
      }, 1000);
    } catch (error) {
      console.error("Signup failed. Please try again.");
      showError("Something went wrong! please try again later");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, login, {
        withCredentials: true,
      });
      console.log("login data", response.data.user);
      showError("");
      toast.success("Login successful");

      // Dispatch the setUser action with the user data
      dispatch(setUser(response.data.user));

      console.log("logged in");
      setTimeout(() => {
        Navigate('/');
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Login failed. Please try again.", error);
      showError(error);
    }
  };

  return (
    <Comp>
      <Box>
        <Image src={blogimg} alt="login" />
        {account === "login" ? (
          <Wrapp onChange={onValueChange}>
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
            />

            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <div style={{ marginBottom: "0.5rem" }}>
                <ForgotPasswordLink
                  component={NavLink}
                  to="/email"
                >
                  Forgot Password
                </ForgotPasswordLink>
              </div>
            <LoginButton variant="contained" onClick={loginUser}>Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <Signup onClick={toggle} style={{ marginBottom: 50 }}>
              Create an account
            </Signup>
          </Wrapp>
        ) : (
          <Wrapp onChange={(e) => onInputChange(e)}>
            <TextField variant="standard" name="name" label="Enter Name" />
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              name="email"
              label="Enter email"
            />
            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}
            <Signup  onClick={registration}>Signup</Signup>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggle}>
              Already have an account
            </LoginButton>
          </Wrapp>
        )}
      </Box>
      <ToastContainer />
    </Comp>
  );
};

export default Login;
