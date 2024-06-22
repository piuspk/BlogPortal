import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../service/api";

const Comp = styled(Box)`
  width: 400px;
   background-color: #ebe4ed;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.4);
`;

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
  color:#474547;
  background-color: #d96ee7;
  border-radius: 7px;
  height: 45px;
  &:hover {
    background-color: #c907e2;
  }
`;

const Text = styled(Typography)`
  text-align: center;
`;

const OtpForget = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState(0);
  const [counter, setCounter] = useState(30);
  const [otpExpired, setOtpExpired] = useState(false);
  const [fiveMinCounter, setFiveMinCounter] = useState(300);

  const setOtpHandler = (event) => {
    setOtp(event.target.value);
  };

  const otpVerificationHandler = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    if (otp === "") {
      toast.error("please enter otp");
    } else {
      try {
        const data = {
          otp,
          email: location.state.email,
        };
        const response = await axios.post(`${BASE_URL}/user/otpverify`, data, {
          withCredentials: true,
        });
        localStorage.setItem("email", response.data.email);
        toast.success("OTP Verification complete");
        setTimeout(() => {
          navigate("/resetpassword");
        }, 1500);
      } catch (error) {
        toast.error("Failed. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const otpResendHandler = async (e) => {
    e.preventDefault();
    setIsResending(true);
    try {
      await axios.post(`${BASE_URL}/user/sendotppassword`, location.state, {
        withCredentials: true,
      });
      toast.success("OTP sent successfully");
      setCounter(30);
      setFiveMinCounter(300);
      setOtpExpired(false);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setOtpExpired(true);
    }
  }, [counter]);

  React.useEffect(() => {
    if (fiveMinCounter > 0) {
      setTimeout(() => setFiveMinCounter(fiveMinCounter - 1), 1000);
    } else {
      setOtpExpired(true);
    }
  }, [fiveMinCounter]);

  return (
    <Comp>
      <Box>
        <Text style ={{color:"black"}} variant="h3">OTP</Text>
        <Text style ={{color:"#474547"}} variant="body1">
          {otpExpired ? (
            "Click on 'Resend OTP' to get a new OTP"
          ) : (
            <>
              OTP sent to your{" "}
              <span style={{ color: "black" }}></span>{" "}
              email
            </>
          )}
        </Text>
        <Wrapp>
          <TextField
            variant="standard"
            name="otp"
            label="Enter OTP"
            onChange={setOtpHandler}
            placeholder="Enter OTP"
          />
          {!otpExpired && (
            <Text style ={{color:"#474547"}}>Time Remaining: {counter}</Text>
          )}
          {(otpExpired || fiveMinCounter === 0) && (
            <Text
              onClick={otpResendHandler}
              style={{ cursor: "pointer", color:"#474547" }}
            >
              {isResending ? "Resending..." : "Resend OTP"}
              {isResending && <div className="spinner"></div>}
            </Text>
          )}
          <LoginButton
            className="btn"
            onClick={otpVerificationHandler}
            disabled={otpExpired && fiveMinCounter === 0}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
            {isVerifying && <div className="spinner"></div>}
          </LoginButton>
        </Wrapp>
      </Box>
      <ToastContainer />
    </Comp>
  );
};

export default OtpForget;
