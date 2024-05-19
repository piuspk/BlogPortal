import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from "./components/authent/Login";
import Home from "./components/Home/Home";
import Header from './components/header/Header';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import { BASE_URL } from "./service/api";
import Loader from "./loading";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/create/CreatePost';
import Details from './components/postDetails/Details';
import UpdatePost from './components/create/UpdatePost';
import Email from './components/authent/forgotpassword/email';
import OtpForget from './components/authent/forgotpassword/otpforget';
import NewPassword from './components/authent/forgotpassword/newpassword'
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/login/success`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      console.log("Authentication successful", response);
    } catch (error) {
      console.log("Error during authentication", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/login/success`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      console.log("Authentication successful", response);
    } catch (error) {
      console.log("Error during authentication", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const routes = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/', element: <Home /> },
    { path: '/email', element: <Email /> },
    {
      path: '/otpforget',
                              element: <OtpForget/>,
    },
    {
      path: '/resetpassword',
      element: <NewPassword/>,
    },
    { path: '/contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
    { path: '/about', element: <ProtectedRoute><About /></ProtectedRoute> },
    { path: '/create', element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
    { path: '/details/:id', element: <ProtectedRoute><Details /></ProtectedRoute> },
    { path: '/update/:id', element: <ProtectedRoute><UpdatePost /></ProtectedRoute> },
  ]);

  return (
    <div style={{ marginTop: 114 }}>
      <Header isAuthenticated={isAuthenticated} />
      {routes}
      <ToastContainer />
    </div>
  );
}

export default App;