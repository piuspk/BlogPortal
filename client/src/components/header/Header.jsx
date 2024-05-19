import { AppBar, Toolbar, styled, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../../service/api"; // Adjust the path according to your project structure

const Component = styled(AppBar)`
  background: #2c2c2c;
  color: #ffffff;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  position: relative; // Added this to position the login button
  & > a {
    padding: 20px;
    color: #ffffff;
    text-decoration: none;
  }
`;

const LoginButton = styled(Button)`
  position: absolute;
  right: 20px;
  color: #ffffff;
  border: 1px solid #ffffff;
  &:hover {
    background: #ffffff;
    color: #2c2c2c;
  }
`;

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    window.open(`${BASE_URL}/api/users/logout`, "_self");
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Component>
      <Container>
        <Link to='/'>HOME</Link>
        <Link to='/about'>ABOUT</Link>
        <Link to='/contact'>CONTACT</Link>
        {isAuthenticated ? (
          <LoginButton onClick={handleLogout}>Sign Out</LoginButton>
        ) : (
          <LoginButton onClick={handleLogin}>Log In</LoginButton>
        )}
      </Container>
    </Component>
  );
};

export default Header;
