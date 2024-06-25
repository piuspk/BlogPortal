import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../service/api"; // Adjust the path according to your project structure
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/theme/themeSlice";
import { DarkMode, LightMode } from "@mui/icons-material";

const Component = styled(AppBar)`
  background: #4a1048;
  color: #ffffff;
  position: fixed;
  top: 0;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: space-between;

  & > a,
  & > div {
    color: #ffffff;
    padding: 20px;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: #aaaaaa;
    }
  }

  @media (max-width: 600px) {
    & > a {
      display: none;
    }
    & > div {
      display: flex;
      padding:5px;
      justify-content: flex-end;
      align-items: center;
      position:absolute;
      right:0;
    }
  }
`;


const LoginButton = styled(Button)`
  color: #ffffff;
  border: 1px solid #ffffff;
  margin-left: 10px; /* Adjust margin to reduce the gap between buttons */
  transition: background 0.3s, color 0.3s, border 0.3s;
  &:hover {
    background: #ffffff;
    color: #2c2c2c;
    border: 1px solid #2c2c2c;
  }
`;

const MenuButton = styled(IconButton)`
  color: #ffffff;
  display: none;

  @media (max-width: 600px) {
    display: block;
    position: absolute;
    left: 4px; /* Adjust positioning to align with padding */
    margin-left: 1px;
  }
`;

const DrawerStyled = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: #2c2c2c;
    color: #ffffff;
  }
`;

const Header = ({ isAuthenticated }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    window.open(`${BASE_URL}/api/users/logout`, "_self");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="HOME" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/about"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="ABOUT" />
      </ListItem>
      <ListItem
        button
        component={Link}
        to="/contact"
        onClick={toggleDrawer(false)}
      >
        <ListItemText primary="CONTACT" />
      </ListItem>
      <ListItem button onClick={toggleDrawer(false)}>
        {isAuthenticated ? (
          <LoginButton onClick={handleLogout}>Sign Out</LoginButton>
        ) : (
          <LoginButton onClick={handleLogin}>Log In</LoginButton>
        )}
      </ListItem>
    </List>
  );

  return (
    <Component>
      <Container>
        <MenuButton edge="start" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </MenuButton>
        <DrawerStyled
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {menuItems}
        </DrawerStyled>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
                style={{ color: "#ffffff" }}
              >
               <Avatar src={user.PictureUrl } />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}       
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/profile">{user.email}</MenuItem>
                <MenuItem component={Link} to="/profile">{user.username}</MenuItem>
                <Divider />
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <LoginButton onClick={handleLogin}>Log In</LoginButton>
          )}
        </div>
      </Container>
    </Component>
  );
};

export default Header;
